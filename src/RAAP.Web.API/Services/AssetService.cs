using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using RAAP.Contracts.Asset;
using RAAP.Contracts.Common;
using RAAP.Contracts.Control;
using RAAP.Contracts.Evaluation;
using RAAP.Web.API.Helpers;
using RAAP.Database;
using RAAP.Web.API.Helpers.Linq;
using WebGrease.Css.Extensions;
using Asset = RAAP.Database.Asset;
using Risk = RAAP.Database.Risk;
using TimeCost = RAAP.Database.TimeCost;
using Control = RAAP.Database.Control;
using RAAP.Web.API.Helpers.Exceptions;

namespace RAAP.Web.API.Services
{
    public class AssetService : ServiceBase
    {
        public AssetService(UserService userService) : base(userService)
        {

        }

        public Contracts.Asset.Asset GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Assets.Include("Asset_Threat.Threat").Include("Children.Child").FirstOrDefault(a => a.AssetId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract(_userService);
            }
        }

        public Contracts.Asset.ReverseAsset Reverse(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return GetReverseAsset(db.Assets.First(a => a.AssetId == id), null);
            }
        }

        public bool getAvaliableName(string name)
        {
            using (RAAPEntities db = new RAAPEntities())
            {
                List<Asset> assets = db.Assets.ToList();
                for (var i = 0; i < assets.Count(); i++)
                {
                    if (name == assets[i].Name)
                        return true;
                }
                return false;
            }
        }
      
        public string isNameAvaiable(string name)
        {
                var tempName = "";
                var secNema = name;
                while (this.getAvaliableName(secNema)) {
                    tempName = secNema;
                    secNema = tempName + " - Copy";
                }
                return secNema;
        }

        private Contracts.Asset.ReverseAsset GetReverseAsset(Asset asset, string parentName)
        {
            var reverse = new Contracts.Asset.ReverseAsset()
            {
                Name = asset.Name.Length > 25 ? asset.Name.Substring(0, 23) + ".." : asset.Name,
                Parent = parentName,
            };
            foreach (var parent in asset.Parents)
                reverse.Children.Add(GetReverseAsset(parent.Parent, reverse.Name));
            return reverse;
        }

        public PagedResult<Contracts.Asset.Asset> Get(PagedQuery pagedQuery, int category = 0, int[] excludeIds = null)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var itemQuery = db.Assets.Include("Asset_Threat.Threat").Include("Children.Child").AsQueryable();

                if (excludeIds != null && excludeIds.Length > 0)
                    itemQuery = itemQuery.Where(t => !excludeIds.Contains(t.AssetId));
                if (category != 0)
                    itemQuery = itemQuery.Where(a => a.Category == category);

                var totalItems = itemQuery.Count();
                try
                {
                    return new PagedResult<Contracts.Asset.Asset>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            itemQuery
                                .OrderByDirection(LinqHelper.OrderByDataContract<Asset>(pagedQuery.OrderByKey),
                                    pagedQuery.IsDescending)
                                .Skip(pagedQuery.ItemsToSkip)
                                .Take(pagedQuery.PageSize)
                                .Select(x => x.ToContract(_userService))
                                .ToArray()
                    };
                }
                catch (Exception exception)
                {
                    throw;
                }
            }
        }

        public IEnumerable<Contracts.Asset.Asset> GetUnhandledThreats(int probability, int impact, int andOr)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                List<Asset> result;
                if (andOr == 1)
                    result = db.Assets.Include("Asset_Threat.Threat").Where(a => a.Asset_Threat.Any(at => at.ThreatRisks.Any(tr => tr.CalculatedIsoProbability >= probability && tr.CalculatedIsoImpact >= impact))).ToList();
                else
                    result = db.Assets.Include("Asset_Threat.Threat").Where(a => a.Asset_Threat.Any(at => at.ThreatRisks.Any(tr => tr.CalculatedIsoProbability >= probability || tr.CalculatedIsoImpact >= impact))).ToList();
                var dtoResult = result.Select(a => a.ToContract(_userService, false)).ToList();
                //strip result of threats less than values
                foreach (var asset in dtoResult)
                {
                    if (andOr == 1)
                        asset.Threats.Where(t => t.Risks.All(r => r.CalculatedIsoImpact < impact || r.CalculatedIsoProbability < probability)).ToList().ForEach(t => asset.Threats.Remove(t));
                    else
                        asset.Threats.Where(t => t.Risks.All(r => r.CalculatedIsoImpact < impact && r.CalculatedIsoProbability < probability)).ToList().ForEach(t => asset.Threats.Remove(t));
                }
                return dtoResult;
            }
        }

        public Contracts.Asset.Asset Create(Contracts.Asset.CreateAsset createAsset)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.Assets.Any(a => a.Name == createAsset.Name))
                {
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                }
                RiskCalculator.CheckRiskTypes(createAsset, db);
                var asset = createAsset.ToDataModel(db);
                db.Assets.Add(asset);
                AddNewThreats(db, asset, createAsset.Threats);
                AddNewAssets(db, asset, createAsset.Assets);
                RiskCalculator.CalculateRisk(asset);
                db.SaveChanges();
                RecoveryCalculator.CalculateRecovery(asset);
                asset.Parents.Select(a => a.Parent).ForEach(RecoveryCalculator.CalculateRecovery);
                asset.Parents.Select(a => a.Parent).SelectMany(p => p.Parents).Select(a => a.Parent).ForEach(RecoveryCalculator.CalculateRecovery);
                asset.Parents.Select(a => a.Parent).SelectMany(p => p.Parents).Select(a => a.Parent).SelectMany(p => p.Parents).Select(a => a.Parent).ForEach(RecoveryCalculator.CalculateRecovery);
                return asset.ToContract(_userService);
            }
        }

        private static object syncroot = new object();

        public Contracts.Asset.Asset Update(Contracts.Asset.UpdateAsset updateAsset)
        {
            try
            {
                lock (syncroot)
                {
                    using (var db = new RAAPEntities(GetConnectionString()))
                    {
                        var asset =
                            db.Assets.Include("Asset_Threat.Threat")
                                .Include("Children.Child")
                                .FirstOrDefault(a => a.AssetId == updateAsset.AssetId);
                        if (asset == null)
                            throw new RAAPNotFoundException("Item not found.");
                        RiskCalculator.CheckRiskTypes(updateAsset, db);
                        asset.ApplyUpdate(updateAsset, db);
                        RemoveVulnerabilities(asset, updateAsset);
                        AddNewVulnerabilities(asset, updateAsset, db);
                        RemoveThreats(updateAsset, asset, db);
                        UpdateThreats(db, asset, updateAsset);
                        AddNewThreats(db, asset, updateAsset.Threats);
                        RemoveUnusedAssets(asset, updateAsset);
                        UpdateAssets(asset, updateAsset);
                        AddNewAssets(db, asset, updateAsset.Assets);
                        RiskCalculator.CalculateRisk(asset);
                        RecoveryCalculator.CalculateRecovery(asset);
                        asset.Parents.Select(a => a.Parent).ForEach(RecoveryCalculator.CalculateRecovery);
                        asset.Parents.Select(a => a.Parent).SelectMany(p => p.Parents).Select(a => a.Parent).ForEach(RecoveryCalculator.CalculateRecovery);
                        asset.Parents.Select(a => a.Parent).SelectMany(p => p.Parents).Select(a => a.Parent).SelectMany(p => p.Parents).Select(a => a.Parent).ForEach(RecoveryCalculator.CalculateRecovery);
                        db.SaveChanges();
                        return asset.ToContract(_userService);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void AddNewVulnerabilities(Asset asset, UpdateAsset updateAsset, RAAPEntities db)
        {
            updateAsset.Vulnerabilities.Where(v => asset.Vulnerabilities.All(dv => dv.VulnerabilityId != v.VulnerabilityId)).ForEach(v => asset.Vulnerabilities.Add(db.Vulnerabilities.FirstOrDefault(dv => dv.VulnerabilityId == v.VulnerabilityId)));
        }

        private void RemoveVulnerabilities(Asset asset, UpdateAsset updateAsset)
        {
            asset.Vulnerabilities.Where(
                v => updateAsset.Vulnerabilities.All(uv => uv.VulnerabilityId != v.VulnerabilityId))
                .ForEach(v => asset.Vulnerabilities.Remove(v));
        }

        private static void UpdateAssets(Asset asset, UpdateAsset updateAsset)
        {
            if (asset.CalculateSubRecovery)
                asset.Children.ForEach(a => a.RecoveryCalculateType = updateAsset.Assets.First(ua => ua.AssetId == a.ToAssetId).RecoveryCalculateType);
            else
                asset.Children.ForEach(a => a.RecoveryCalculateType = (int)RecoveryCalculateType.None);
        }

        public void Delete(int id)
        {
            try
            {
                using (var db = new RAAPEntities(GetConnectionString()))
                {
                    var asset = db.Assets.FirstOrDefault(a => a.AssetId == id);
                    if (asset == null)
                        throw new RAAPNotFoundException("Item not found.");
                    db.Asset_SoaChapter.RemoveRange(asset.Asset_SoaChapter.ToList());
                    asset.Children.Clear();
                    asset.Parents.Clear();
                    asset.Processes.Clear();
                    db.HtmlComments.RemoveRange(asset.HtmlComments.ToList());
                    db.HtmlComments.RemoveRange(
                        asset.Asset_Threat.SelectMany(t => t.HtmlComments).ToList());
                    db.AssetThreat_Attributes.RemoveRange(asset.Asset_Threat.SelectMany(t => t.AssetThreat_Attributes).ToList());
                    db.HtmlComments.RemoveRange(
                        asset.Asset_Threat.SelectMany(at => at.AssetThreat_Control)
                            .SelectMany(atc => atc.HtmlComments)
                            .ToList());
                    db.BusinessContinuityPlans.RemoveRange(asset.BusinessContinuityPlans.ToList());
                    db.Risks.RemoveRange(asset.Risks.ToList());
                    db.Risks.RemoveRange(asset.Asset_Threat.SelectMany(a => a.Risks).ToList());
                    db.ThreatRisks.RemoveRange(asset.ThreatRisks.ToList());
                    db.ThreatRisks.RemoveRange(asset.Asset_Threat.SelectMany(at => at.ThreatRisks).ToList());
                    db.ControlRisks.RemoveRange(
                        asset.Asset_Threat.SelectMany(at => at.AssetThreat_Control.SelectMany(atc => atc.ControlRisks))
                            .ToList());
                    db.Assets.Remove(asset);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.Assets.Include("Asset_Threat.Threat").Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.AssetId, Name = a.Name }).ToList();
            }
        }

        private static void UpdateThreats(RAAPEntities db, Asset asset, Contracts.Asset.UpdateAsset updateAsset)
        {
            foreach (var assetThreat in asset.Asset_Threat)
            {
                var threatDto = updateAsset.Threats.First(t => t.ThreatId == assetThreat.ThreatId);
                assetThreat.ApplyUpdate(threatDto, db);
                RemoveUnusedControls(assetThreat, threatDto, db);
                UpdateControls(assetThreat, threatDto, db);
                AddNewControls(db, threatDto, assetThreat);

                RemoveUnusedCauses(assetThreat, threatDto, db);
                UpdateCauses(assetThreat, threatDto, db);
                AddNewCauses(db, threatDto, assetThreat);
            }
        }


        private static void UpdateControls(Asset_Threat assetThreat, Contracts.Threat.Threat threatDto, RAAPEntities db)
        {
            assetThreat.AssetThreat_Control.ForEach(c => c.ApplyUpdate(threatDto.Controls.First(dto => dto.ControlId == c.ControlId), db));
        }

        private static void UpdateCauses(Asset_Threat assetThreat, Contracts.Threat.Threat threatDto, RAAPEntities db)
        {
            assetThreat.AssetThreat_Attributes.ForEach(c => c.ApplyUpdate(threatDto.Causes.First(dto => dto.AttributeId == c.AttributeId)));
        }

        private static void RemoveUnusedControls(Asset_Threat assetThreat, Contracts.Threat.Threat threatDto, RAAPEntities db)
        {
            var controldIds = threatDto.Controls.Select(c => c.ControlId);
            var assetThreatControls =
                assetThreat.AssetThreat_Control.Where(c => !controldIds.Contains(c.ControlId)).ToList();
            db.HtmlComments.RemoveRange(assetThreatControls.SelectMany(a => a.HtmlComments).ToList());
            db.AssetThreat_Control.RemoveRange(assetThreatControls);
        }

        private static void RemoveUnusedCauses(Asset_Threat assetThreat, Contracts.Threat.Threat threatDto, RAAPEntities db)
        {
            var attributeIds = threatDto.Causes.Select(c => c.AttributeId);
            var assetThreatAttributes = assetThreat.AssetThreat_Attributes.Where(c => !attributeIds.Contains(c.AttributeId)).ToList();
            db.AssetThreat_Attributes.RemoveRange(assetThreatAttributes);
        }

        private static void RemoveThreats(Contracts.Asset.UpdateAsset updateAsset, Asset asset, RAAPEntities db)
        {
            foreach (
                var assetThreat in
                    asset.Asset_Threat.Where(t => updateAsset.Threats.All(ut => ut.ThreatId != t.ThreatId)).ToList())
            {
                db.Risks.RemoveRange(assetThreat.Risks.ToList());
                db.HtmlComments.RemoveRange(assetThreat.HtmlComments.ToList());
                db.AssetThreat_Attributes.RemoveRange(assetThreat.AssetThreat_Attributes.ToList());
                db.HtmlComments.RemoveRange(assetThreat.AssetThreat_Control.SelectMany(c => c.HtmlComments).ToList());
                db.ThreatRisks.RemoveRange(assetThreat.ThreatRisks.ToList());
                db.Asset_Threat.Remove(assetThreat);
            }
        }

        private static void AddNewThreats(RAAPEntities db, Asset asset, IEnumerable<Contracts.Threat.Threat> threats)
        {
            foreach (var threatDto in threats.Where(t => asset.Asset_Threat.All(ta => ta.ThreatId != t.ThreatId)))
            {
                var assetThreat = threatDto.ToAssetThreatDataModel(db);
                if (threatDto.ThreatId == 0)
                {
                    var threat = threatDto.ToDataModel(db);
                    db.Threats.Add(threat);
                    assetThreat.Threat = threat;
                }
                else if (threatDto.ThreatId > 0 && assetThreat.Threat == null)
                    throw new RAAPConflictException("Something is wrong with your threats! Please check your threats!");
                asset.Asset_Threat.Add(assetThreat);
                AddNewControls(db, threatDto, assetThreat);
                AddNewCauses(db, threatDto, assetThreat);

            }
        }

        private static void AddNewControls(RAAPEntities db, Contracts.Threat.Threat threatDto, Asset_Threat assetThreat)
        {
            var controlIds = new HashSet<int>(assetThreat.AssetThreat_Control.Select(c => c.ControlId));
            foreach (var controlDto in threatDto.Controls.Where(c => !controlIds.Contains(c.ControlId)))
            {
                var assetThreatControl = controlDto.ToAssetThreatControlDataModel(db);
                if (controlDto.ControlId == 0)
                {
                    var control = controlDto.ToDataModel(db);
                    db.Controls.Add(control);
                    assetThreatControl.Control = control;
                }
                else if (controlDto.ControlId > 0 && assetThreatControl.Control == null)
                    throw new RAAPConflictException("Something is wrong with your controls! Please check your controls!");
                assetThreat.AssetThreat_Control.Add(assetThreatControl);
            }
        }

        private static void AddNewCauses(RAAPEntities db, Contracts.Threat.Threat threatDto, Asset_Threat assetThreat)
        {
            var causeIds = new HashSet<int>(assetThreat.AssetThreat_Attributes.Select(c => c.AttributeId));
            foreach (var attributeDto in threatDto.Causes.Where(c => !causeIds.Contains(c.AttributeId)))
            {
                var assetThreatAtribute = attributeDto.ToAssetThreatAttributeDataModel(db);
                if (attributeDto.AttributeId == 0)
                {
                    var attribute = attributeDto.ToDataModel();
                    db.Attributes.Add(attribute);
                    assetThreatAtribute.Attribute = attribute;
                }
                else if (attributeDto.AttributeId > 0 && assetThreatAtribute.Attribute == null)
                    throw new RAAPConflictException("Something is wrong with your causes! Please check your causes!");
                assetThreat.AssetThreat_Attributes.Add(assetThreatAtribute);
            }
        }

        private static void Check(HashSet<int> assetIds, int assetId, RAAPEntities db)
        {
            if (assetIds.Contains(assetId))
            {
                throw new RAAPConflictException("Redundant tree of assets.");
            }
            assetIds.Add(assetId);
            foreach (var childId in db.Asset_Asset.Where(a => a.FromAssetId == assetId).Select(a => a.ToAssetId))
                Check(assetIds, childId, db);
            assetIds.Remove(assetId);
        }


        private static bool IsDepartmentOfRedundancyDepartment(Asset asset, HashSet<int> assetIds)
        {
            var subSet = new HashSet<int>(assetIds);
            var assets = asset.Children.Select(a => a.Child).ToList();
            if (assets.Any(a => subSet.Contains(a.AssetId)))
                return true;
            assets.ForEach(a => subSet.Add(a.AssetId));
            return assets.Any(a => IsDepartmentOfRedundancyDepartment(a, subSet));
        }

        private static void AddNewAssets(RAAPEntities db, Asset asset, IEnumerable<Contracts.Asset.Asset> assets)
        {
            //All we want to add
            //var assetIds = new HashSet<int>(assets.Select(a => a.AssetId));
            ////Already added
            //asset.Children.Select(a => a.Child).ForEach(a => assetIds.Remove(a.AssetId));
            ////Myself
            //assetIds.Add(asset.AssetId);
            //if (IsDepartmentOfRedundancyDepartment(asset, assetIds))
            //    throw new ArgumentException("Recursive assets");

            var assetIds = new HashSet<int>();
            Check(assetIds, asset.AssetId, db);
            assetIds.Add(asset.AssetId);
            assets.Select(a => a.AssetId).ForEach(a => Check(assetIds, a, db));

            foreach (var assetToDependOnDto in assets.Where(c => c.AssetId > 0 && c.AssetId != asset.AssetId))
            {
                var assetToDependOn = db.Assets.FirstOrDefault(c => c.AssetId == assetToDependOnDto.AssetId);
                if (assetToDependOn == null)
                {
                    throw new RAAPConflictException($"Dependant asset with id {assetToDependOn.AssetId} not found.");
                }
                if (!asset.Children.Select(a => a.Child).Contains(assetToDependOn))
                    asset.Children.Add(new Asset_Asset() { Child = assetToDependOn, RecoveryCalculateType = assetToDependOnDto.RecoveryCalculateType });
            }

            foreach (var assetToDependOnDto in assets.Where(t => t.AssetId == 0))
            {
                var assetToDependOn = assetToDependOnDto.ToDataModel(db);
                db.Assets.Add(assetToDependOn);
                asset.Children.Add(new Asset_Asset() { Child = assetToDependOn, RecoveryCalculateType = assetToDependOnDto.RecoveryCalculateType });
            }
        }
        private static void RemoveUnusedAssets(Asset asset, Contracts.Asset.UpdateAsset updateAsset)
        {
            foreach (
                var assetToDependOn in
                    asset.Children.Where(c => updateAsset.Assets.All(uc => uc.AssetId != c.ToAssetId)).ToList())
                asset.Children.Remove(assetToDependOn);
        }
    }
    public static class AssetServiceExtensions
    {
        public static Contracts.Control.Control ToContract(this AssetThreat_Control assetThreatControl, UserService userService)
        {
            return new Contracts.Control.Control()
            {
                Avoid = assetThreatControl.Avoid,
                ControlId = assetThreatControl.ControlId,
                Enabled = assetThreatControl.Enabled,
                CreatedOn = assetThreatControl.CreatedOn,
                UpdatedOn = assetThreatControl.UpdatedOn,
                Deadline = assetThreatControl.Deadline,
                ExecutedDate = assetThreatControl.ExecutedDate,
                Risks = assetThreatControl.ControlRisks.Select(r => r.ToContract()).ToList(),
                InvestmentCost = assetThreatControl.InvestmentCost,
                LegalObligation = assetThreatControl.LegalObligation,
                MaintenanceCost = assetThreatControl.MaintenanceCost,
                ResponsibleUserId = assetThreatControl.ResponsibleUserId,
                ResponsibleUser = assetThreatControl.ResponsibleUserId.HasValue ? userService.GetUserByUserId(assetThreatControl.ResponsibleUserId.Value, false) : null,
                Status = (ControlStatus)assetThreatControl.Status,
                Type = (ControlType)assetThreatControl.Type,
                ValidTo = assetThreatControl.ValidTo,
                Category = assetThreatControl.Control.ControlCategory.ToContract(),
                Description = assetThreatControl.Control.Description,
                Name = assetThreatControl.Control.Name,
                Evaluations = assetThreatControl.HtmlComments.Select(h => h.ToContract(userService)).OrderByDescending(h => h.Revision).ToList(),
                React = assetThreatControl.React,
                Prevent = assetThreatControl.Prevent,
                Detect = assetThreatControl.Detect,
                AlertDate = assetThreatControl.AlertDate,
                AlertUserId = assetThreatControl.AlertUserId,
                AlertUser = assetThreatControl.AlertUserId.HasValue ? userService.GetUserByUserId(assetThreatControl.AlertUserId.Value, false) : null,
            };
        }

        public static Contracts.Asset.Asset ToContract(this Asset dataItem, UserService userService, bool includeChildren = true)
        {
            var assetDto = new Contracts.Asset.Asset()
            {
                Enabled = dataItem.Enabled,
                AssetId = dataItem.AssetId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                SubCategory = dataItem.AssetSubCategory.ToContract(),
                Threats = dataItem.Asset_Threat.Select(t => t.ToContract(userService)).ToList(),
                Assets = includeChildren ? dataItem.Children.Select(a => a.ToContract(userService)).ToList() : new List<Contracts.Asset.Asset>(),
                AggregatedStatus = dataItem.AggregatedStatus,
                Availability = dataItem.Availability,
                Confidenciality = dataItem.Confidenciality,
                DataRecoveryCost = dataItem.DataRecoveryCost,
                DataRecoveryTime = dataItem.DataRecoveryTime,
                Integrity = dataItem.Integrity,
                Authenticity = dataItem.Authenticity,
                IntegrityCheckCost = dataItem.IntegrityCheckCost,
                IntegrityCheckTime = dataItem.IntegrityCheckTime,
                MaxDownCost = dataItem.MaxDownCost,
                MaxDownTime = dataItem.MaxDownTime,
                RequiresBusinessContinuityPlan = dataItem.RequiresBusinessContinuityPlan,
                SystemRecoveryCost = dataItem.SystemRecoveryCost,
                SystemRecoveryTime = dataItem.SystemRecoveryTime,
                Category = (Contracts.Asset.AssetCategory)dataItem.Category,
                Evaluations = dataItem.HtmlComments.Select(c => c.ToContract(userService)).OrderByDescending(h => h.Revision).ToList(),
                BusinessContinuityPlans = dataItem.BusinessContinuityPlans.Select(ToContract).OrderByDescending(h => h.Revision).ToList(),
                Risks = dataItem.ThreatRisks.Select(r => r.ToContract()).ToList(),
                TimeCosts = dataItem.TimeCosts.Select(ToContract).OrderBy(tc => tc.Time).ToList(),
                DueDate = dataItem.DueDate,
                MaintenanceCost = dataItem.MaintenanceCost,
                InvestmentCost = dataItem.InvestmentCost,
                CriticalityCategory = dataItem.CriticalityCategory.ToContract(),
                CalculateSubCriticality = dataItem.CalculateSubCriticality,
                CalculateSubRecovery = dataItem.CalculateSubRecovery,
                CalculatedDataRecoveryCost = dataItem.CalculatedDataRecoveryCost,
                CalculatedDataRecoveryTime = dataItem.CalculatedDataRecoveryTime,
                CalculatedIntegrityCheckCost = dataItem.CalculatedIntegrityCheckCost,
                CalculatedIntegrityCheckTime = dataItem.CalculatedIntegrityCheckTime,
                CalculatedSystemRecoveryCost = dataItem.CalculatedSystemRecoveryCost,
                CalculatedSystemRecoveryTime = dataItem.CalculatedSystemRecoveryTime,
                Vulnerabilities = dataItem.Vulnerabilities.Select(v => v.ToContract()).ToList(),
            };
            return assetDto;
        }

        public static Contracts.Asset.Asset ToContract(this Asset_Asset dataItem, UserService userService)
        {
            var asset = dataItem.Child.ToContract(userService);
            asset.RecoveryCalculateType = dataItem.RecoveryCalculateType;
            return asset;
        }

        public static Contracts.Asset.TimeCost ToContract(this TimeCost timeCost)
        {
            return new Contracts.Asset.TimeCost()
            {
                Time = timeCost.Time,
                Cost = timeCost.Cost,
                TimeCostId = timeCost.TimeCostId
            };
        }

        public static Contracts.Threat.Threat ToContract(this Asset_Threat assetThreat, UserService userService)
        {
            return new Contracts.Threat.Threat
            {
                Enabled = assetThreat.Enabled,
                ThreatId = assetThreat.ThreatId,
                Category = assetThreat.Threat.ThreatCategory.ToContract(),
                CreatedOn = assetThreat.CreatedOn,
                UpdatedOn = assetThreat.UpdatedOn,
                Name = assetThreat.Threat.Name,
                Description = assetThreat.Threat.Description,
                Risks = assetThreat.ThreatRisks.Select(r => r.ToContract()).ToList(),
                AcceptRisk = assetThreat.AcceptRisk,
                Availability = assetThreat.Availability,
                Authenticity = assetThreat.Authenticity,
                Confidenciality = assetThreat.Confidenciality,
                Integrity = assetThreat.Integrity,
                RiskAssessmentMethod = assetThreat.RiskAssessmentMethod,
                ReduceRisk = assetThreat.ReduceRisk,
                AvoidRisk = assetThreat.AvoidRisk,
                ShareRisk = assetThreat.ShareRisk,
                RiskDate = assetThreat.RiskDate,
                RiskUser = assetThreat.RiskUser,
                InternalExternal = assetThreat.Threat.InternalExternal,
                SecuritySafety = assetThreat.Threat.SecuritySafety,
                Controls = assetThreat.AssetThreat_Control.Select(s => s.ToContract(userService)).ToList(),
                Causes = assetThreat.AssetThreat_Attributes.Select(s => s.ToContract()).ToList(),
                Evaluations = assetThreat.HtmlComments.Select(h => h.ToContract(userService)).OrderByDescending(h => h.Revision).ToList(),
            };
        }

        public static AssetThreat_Control ToAssetThreatControlDataModel(this Contracts.Control.Control controlDto, RAAPEntities db)
        {
            var assetThreatControl = new AssetThreat_Control()
            {
                Enabled = controlDto.Enabled,
                Control = db.Controls.FirstOrDefault(c => c.ControlId == controlDto.ControlId),
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                Deadline = controlDto.Deadline,
                ExecutedDate = controlDto.ExecutedDate,
                InvestmentCost = controlDto.InvestmentCost,
                LegalObligation = controlDto.LegalObligation,
                MaintenanceCost = controlDto.MaintenanceCost,
                ResponsibleUserId = controlDto.ResponsibleUserId,
                Status = (int)controlDto.Status,
                Type = (int)controlDto.Type,
                ValidTo = controlDto.ValidTo,
                React = controlDto.React,
                Detect = controlDto.Detect,
                Prevent = controlDto.Prevent,
                AlertUserId = controlDto.AlertUserId,
                AlertDate = controlDto.AlertDate,
                Avoid = controlDto.Avoid
            };
            controlDto.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision).ForEach(
                e => assetThreatControl.HtmlComments.Add(e.ToDataModel(db, assetThreatControl)));
            controlDto.Risks.ForEach(r => assetThreatControl.ControlRisks.Add(r.ToDataModel()));
            return assetThreatControl;
        }
        public static AssetThreat_Attributes ToAssetThreatAttributeDataModel(this Contracts.Attribute.Attribute attributeDto, RAAPEntities db)
        {
            var assetThreatAttribute = new AssetThreat_Attributes()
            {
                Attribute = db.Attributes.FirstOrDefault(c => c.AttributeId == attributeDto.AttributeId),
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                Name = attributeDto.Name,
                Description = attributeDto.Description,
                AttributeTypeId = attributeDto.AttributeTypeId,
                AttributeCategoryId = attributeDto.AttributeCategoryId,
                Comment = attributeDto.Comment,
                MonthTimeframe = (int?)attributeDto.Timeframe.Months,
                DayTimeframe = (int?)attributeDto.Timeframe.Days,
                HourTimeframe = (int?)attributeDto.Timeframe.Hours

            };
            return assetThreatAttribute;
        }

        public static void ApplyUpdate(this AssetThreat_Control assetThreatControl,
            Contracts.Control.Control controlDto, RAAPEntities db)
        {
            assetThreatControl.Avoid = controlDto.Avoid;
            assetThreatControl.Enabled = controlDto.Enabled;
            assetThreatControl.UpdatedOn = DateTime.Now;
            assetThreatControl.Deadline = controlDto.Deadline;
            assetThreatControl.ExecutedDate = controlDto.ExecutedDate;
            assetThreatControl.InvestmentCost = controlDto.InvestmentCost;
            assetThreatControl.LegalObligation = controlDto.LegalObligation;
            assetThreatControl.MaintenanceCost = controlDto.MaintenanceCost;
            assetThreatControl.ResponsibleUserId = controlDto.ResponsibleUserId;
            assetThreatControl.Status = (int)controlDto.Status;
            assetThreatControl.Type = (int)controlDto.Type;
            assetThreatControl.ValidTo = controlDto.ValidTo;
            controlDto.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                .ForEach(e => assetThreatControl.HtmlComments.Add(e.ToDataModel(db, assetThreatControl)));
            assetThreatControl.React = controlDto.React;
            assetThreatControl.Detect = controlDto.Detect;
            assetThreatControl.Prevent = controlDto.Prevent;
            assetThreatControl.AlertUserId = controlDto.AlertUserId;
            assetThreatControl.AlertDate = controlDto.AlertDate;

            //Remove deleted
            assetThreatControl.ControlRisks.Where(r => controlDto.Risks.All(rr => rr.RiskReduceId != r.ControlRiskId)).ForEach(r => assetThreatControl.ControlRisks.Remove(r));
            //Update existing
            controlDto.Risks.Where(r => r.RiskReduceId > 0).ForEach(risk =>
                assetThreatControl.ControlRisks.First(r => r.ControlRiskId == risk.RiskReduceId).UpdateFrom(risk));
            //Add new
            controlDto.Risks.Where(r => r.RiskReduceId <= 0).ForEach(risk => assetThreatControl.ControlRisks.Add(risk.ToDataModel()));
        }

        public static Asset_Threat ToAssetThreatDataModel(this Contracts.Threat.Threat threatDto, RAAPEntities db)
        {
            var assetThreat = new Asset_Threat()
            {
                Enabled = threatDto.Enabled,
                Threat = db.Threats.FirstOrDefault(t => t.ThreatId == threatDto.ThreatId),
                AcceptRisk = threatDto.AcceptRisk,
                Availability = threatDto.Availability,
                Confidenciality = threatDto.Confidenciality,
                Integrity = threatDto.Integrity,
                Authenticity = threatDto.Authenticity,
                RiskAssessmentMethod = threatDto.RiskAssessmentMethod,
                ReduceRisk = threatDto.ReduceRisk,
                ShareRisk = threatDto.ShareRisk,
                AvoidRisk = threatDto.AvoidRisk,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
            threatDto.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text))
                .OrderBy(e => e.Revision)
                .ForEach(e => assetThreat.HtmlComments.Add(e.ToDataModel(db, assetThreat)));
            if (threatDto.AvoidRisk || threatDto.AcceptRisk)
            {
                assetThreat.RiskDate = DateTime.Now;
                assetThreat.RiskUser = HttpContext.Current.User.Identity.GetUserName();
            }
            else
            {
                assetThreat.RiskDate = null;
                assetThreat.RiskUser = null;
            }
            threatDto.Risks.ForEach(r => assetThreat.ThreatRisks.Add(r.ToDataModel()));
            return assetThreat;
        }

        public static HtmlComment ToDataModel(this Contracts.Evaluation.Evaluation evaluation, RAAPEntities db,
            object entity)
        {
            if (entity is Asset_Threat)
                evaluation.Revision =
                    ((Asset_Threat)entity).HtmlComments.Count + 1;
            else if (entity is AssetThreat_Control)
                evaluation.Revision =
                    ((AssetThreat_Control)entity).HtmlComments.Count + 1;
            else if (entity is Asset)
                evaluation.Revision =
                    ((Asset)entity).HtmlComments.Count + 1;
            else if (entity is Process)
                evaluation.Revision =
                    ((Process)entity).HtmlComments.Count + 1;
            else if (entity is Threat)
                evaluation.Revision = ((Threat) entity).HtmlComments.Count + 1;
            else if (entity is Control)
                evaluation.Revision = ((Control) entity).HtmlComments.Count + 1;
            else
                throw new RAAPConflictException("Something wrong with your revisions. Please check your revisions.");
            return new HtmlComment()
            {
                Text = evaluation.Text,
                Revision = evaluation.Revision,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                UserId = int.Parse(HttpContext.Current.User.Identity.GetUserId())
            };
        }

        public static Contracts.BusinessContinuityPlan.BusinessContinuityPlan ToContract(this BusinessContinuityPlan businessContinuityPlan)
        {
            return new Contracts.BusinessContinuityPlan.BusinessContinuityPlan()
            {
                BusinessContinuityPlanId = businessContinuityPlan.BusinessContinuityPlanId,
                Revision = businessContinuityPlan.Revision,
                Text = businessContinuityPlan.Text,
                CreatedOn = businessContinuityPlan.CreatedOn,
            };
        }

        public static BusinessContinuityPlan ToDataModel(this Contracts.BusinessContinuityPlan.BusinessContinuityPlan businessContinuityPlan, RAAPEntities db,
            Asset asset)
        {
            businessContinuityPlan.Revision =
                asset.BusinessContinuityPlans.Count + 1;
            return new BusinessContinuityPlan()
            {
                Text = businessContinuityPlan.Text,
                Revision = businessContinuityPlan.Revision,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static Contracts.Evaluation.Evaluation ToContract(this HtmlComment htmlComment, UserService userService)
        {
            return new Evaluation()
            {
                EvaluationId = htmlComment.HtmlCommentId,
                Revision = htmlComment.Revision,
                Text = htmlComment.Text,
                CreatedOn = htmlComment.CreatedOn,
                User = htmlComment.UserId.HasValue ? userService.GetUserByUserId(htmlComment.UserId.Value, false) : null
            };
        }

        //public static Risk ToDataModel(this Contracts.Risk.Risk riskDto)
        //{
        //    var risk = new Risk();

        //    if (riskDto != null)
        //    {
        //        risk.DamageIsoRisk = riskDto.DamageIsoRisk;
        //        risk.DamageNsRisk = riskDto.DamageNsRisk;
        //        risk.FinancialIsoRisk = riskDto.FinancialIsoRisk;
        //        risk.FinancialNsRisk = riskDto.FinancialNsRisk;
        //        risk.ReputationIsoRisk = riskDto.ReputationIsoRisk;
        //        risk.ReputationNsRisk = riskDto.ReputationNsRisk;
        //    }

        //    risk.RiskParameters.Add(CreateRiskParameter(riskDto ?? new Contracts.Risk.Risk()));
        //    return risk;
        //}

        //private static RiskParameter CreateRiskParameter(Contracts.Risk.Risk riskDto)
        //{
        //    return new RiskParameter()
        //    {
        //        DamageImpact = riskDto.Damage.Impact,
        //        DamageProbability = riskDto.Damage.Probability,
        //        DamageThreat = riskDto.Damage.Threat,
        //        DamageValue = riskDto.Damage.Value,
        //        DamageVulnerability = riskDto.Damage.Vulnerability,
        //        FinancialImpact = riskDto.Financial.Impact,
        //        FinancialProbability = riskDto.Financial.Probability,
        //        FinancialThreat = riskDto.Financial.Threat,
        //        FinancialValue = riskDto.Financial.Value,
        //        FinancialVulnerability = riskDto.Financial.Vulnerability,
        //        ReputationImpact = riskDto.Reputation.Impact,
        //        ReputationProbability = riskDto.Reputation.Probability,
        //        ReputationThreat = riskDto.Reputation.Threat,
        //        ReputationValue = riskDto.Reputation.Value,
        //        ReputationVulnerability = riskDto.Reputation.Vulnerability,
        //    };
        //}

        //public static Contracts.Risk.Risk ToContract(this Risk risk)
        //{
        //    if (risk == null)
        //        return null;
        //    var riskParameters = risk.RiskParameters.FirstOrDefault();
        //    var riskDto = new Contracts.Risk.Risk(risk.DamageIsoRisk, risk.DamageNsRisk, risk.FinancialIsoRisk,
        //        risk.FinancialNsRisk, risk.ReputationIsoRisk, risk.ReputationNsRisk);
        //    if (riskParameters != null)
        //    {
        //        riskDto.Damage = new RiskParameters(riskParameters.DamageImpact, riskParameters.DamageProbability, riskParameters.DamageThreat, riskParameters.DamageValue, riskParameters.DamageVulnerability);
        //        riskDto.Financial = new RiskParameters(riskParameters.FinancialImpact, riskParameters.FinancialProbability, riskParameters.FinancialThreat, riskParameters.FinancialValue, riskParameters.FinancialVulnerability);
        //        riskDto.Reputation = new RiskParameters(riskParameters.ReputationImpact, riskParameters.ReputationProbability, riskParameters.ReputationThreat, riskParameters.ReputationValue, riskParameters.ReputationVulnerability);
        //    }
        //    return riskDto;
        //}

        public static Asset ToDataModel(this Contracts.Asset.CreateAsset create, RAAPEntities db)
        {
            var asset = new Asset
            {
                Enabled = create.Enabled,
                Name = create.Name,
                Description = create.Description,
                AssetSubCategory = db.AssetSubCategories.FirstOrDefault(ac => ac.AssetSubCategoryId == create.SubCategory.AssetSubCategoryId),
                CriticalityCategory = create.CriticalityCategory == null ? null : db.CriticalityCategories.FirstOrDefault(
                        cc => cc.CriticalityCategoryId == create.CriticalityCategory.CriticalityCategoryId),
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                AggregatedStatus = create.AggregatedStatus,
                Availability = create.Availability,
                Confidenciality = create.Confidenciality,
                DataRecoveryCost = create.DataRecoveryCost,
                DataRecoveryTime = create.DataRecoveryTime,
                Integrity = create.Integrity,
                Authenticity = create.Authenticity,
                IntegrityCheckCost = create.IntegrityCheckCost,
                IntegrityCheckTime = create.IntegrityCheckTime,
                MaxDownCost = create.MaxDownCost,
                MaxDownTime = create.MaxDownTime,
                RequiresBusinessContinuityPlan = create.RequiresBusinessContinuityPlan,
                SystemRecoveryCost = create.SystemRecoveryCost,
                SystemRecoveryTime = create.SystemRecoveryTime,
                Category = (int)create.Category,
                DueDate = create.DueDate,
                MaintenanceCost = create.MaintenanceCost,
                InvestmentCost = create.InvestmentCost,
                CalculateSubCriticality = create.CalculateSubCriticality,
                CalculateSubRecovery = create.CalculateSubRecovery,
            };
            create.Vulnerabilities.ForEach(v => asset.Vulnerabilities.Add(db.Vulnerabilities.FirstOrDefault(dv => dv.VulnerabilityId == v.VulnerabilityId)));
            create.Risks.ForEach(r => asset.ThreatRisks.Add(r.ToDataModel()));
            create.Evaluations.Where(e => !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision).ForEach(e => asset.HtmlComments.Add(e.ToDataModel(db, asset)));
            create.BusinessContinuityPlans.Where(e => !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision).ForEach(e => asset.BusinessContinuityPlans.Add(e.ToDataModel(db, asset)));
            create.TimeCosts.ForEach(tc => asset.TimeCosts.Add(tc.ToDataModel()));
            return asset;
        }

        public static TimeCost ToDataModel(this Contracts.Asset.TimeCost timeCost)
        {
            return new TimeCost()
            {
                Cost = timeCost.Cost,
                Time = timeCost.Time,
            };
        }

        public static void ApplyUpdate(this Asset_Threat assetThreat, Contracts.Threat.Threat update, RAAPEntities db)
        {
            assetThreat.Enabled = update.Enabled;
            assetThreat.AcceptRisk = update.AcceptRisk;
            assetThreat.Availability = update.Availability;
            assetThreat.Confidenciality = update.Confidenciality;
            assetThreat.Integrity = update.Integrity;
            assetThreat.Authenticity = update.Authenticity;
            assetThreat.RiskAssessmentMethod = update.RiskAssessmentMethod;
            assetThreat.ReduceRisk = update.ReduceRisk;
            assetThreat.AvoidRisk = update.AvoidRisk;
            assetThreat.ShareRisk = update.ShareRisk;
            assetThreat.UpdatedOn = DateTime.Now;
            update.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision).ForEach(e => assetThreat.HtmlComments.Add(e.ToDataModel(db, assetThreat)));

            //Remove deleted
            assetThreat.ThreatRisks.Where(r => update.Risks.All(rr => rr.RiskId != r.ThreatRiskId)).ForEach(r => assetThreat.ThreatRisks.Remove(r));
            //Update existing
            update.Risks.Where(r => r.RiskId > 0).ForEach(risk =>
                assetThreat.ThreatRisks.First(r => r.ThreatRiskId == risk.RiskId).UpdateFrom(risk));
            //Add new
            update.Risks.Where(r => r.RiskId <= 0).ForEach(risk => assetThreat.ThreatRisks.Add(risk.ToDataModel()));

            if (update.AvoidRisk || update.AcceptRisk)
            {
                assetThreat.RiskDate = DateTime.Now;
                assetThreat.RiskUser = HttpContext.Current.User.Identity.GetUserName();
            }
            else
            {
                assetThreat.RiskDate = null;
                assetThreat.RiskUser = null;
            }
        }

        public static void ApplyUpdate(this Asset dataItem, Contracts.Asset.UpdateAsset update, RAAPEntities db)
        {
            dataItem.Enabled = update.Enabled;
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.AssetSubCategory =
                db.AssetSubCategories.FirstOrDefault(ac => ac.AssetSubCategoryId == update.SubCategory.AssetSubCategoryId);
            if (update.CriticalityCategory == null)
                dataItem.CriticalityCategory = null;
            else
                dataItem.CriticalityCategory =
                    db.CriticalityCategories.FirstOrDefault(
                        cc => cc.CriticalityCategoryId == update.CriticalityCategory.CriticalityCategoryId);
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.AggregatedStatus = update.AggregatedStatus;
            dataItem.Availability = update.Availability;
            dataItem.Authenticity = update.Authenticity;
            dataItem.Confidenciality = update.Confidenciality;
            dataItem.DataRecoveryCost = update.DataRecoveryCost;
            dataItem.DataRecoveryTime = update.DataRecoveryTime;
            dataItem.Integrity = update.Integrity;
            dataItem.IntegrityCheckCost = update.IntegrityCheckCost;
            dataItem.IntegrityCheckTime = update.IntegrityCheckTime;
            dataItem.MaxDownCost = update.MaxDownCost;
            dataItem.MaxDownTime = update.MaxDownTime;
            dataItem.RequiresBusinessContinuityPlan = update.RequiresBusinessContinuityPlan;
            dataItem.SystemRecoveryCost = update.SystemRecoveryCost;
            dataItem.SystemRecoveryTime = update.SystemRecoveryTime;
            dataItem.Category = (int)update.Category;
            update.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                .ForEach(e => dataItem.HtmlComments.Add(e.ToDataModel(db, dataItem)));
            update.BusinessContinuityPlans.Where(e => e.BusinessContinuityPlanId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                .ForEach(e => dataItem.BusinessContinuityPlans.Add(e.ToDataModel(db, dataItem)));

            //Remove deleted
            dataItem.ThreatRisks.Where(r => update.Risks.All(rr => rr.RiskId != r.ThreatRiskId)).ToArray().ForEach(r => dataItem.ThreatRisks.Remove(r));
            //Update existing
            update.Risks.Where(r => r.RiskId > 0).ForEach(risk =>
                dataItem.ThreatRisks.First(r => r.ThreatRiskId == risk.RiskId).UpdateFrom(risk));
            //Add new
            update.Risks.Where(r => r.RiskId <= 0).ForEach(risk => dataItem.ThreatRisks.Add(risk.ToDataModel()));

            dataItem.TimeCosts.Where(tc => update.TimeCosts.All(t => t.TimeCostId != tc.TimeCostId)).ForEach(tc => dataItem.TimeCosts.Remove(tc));
            dataItem.TimeCosts.ForEach(tc => tc.ApplyUpdate(update.TimeCosts.First(t => t.TimeCostId == tc.TimeCostId)));
            update.TimeCosts.Where(tc => tc.TimeCostId == 0).Select(ToDataModel).ForEach(dataItem.TimeCosts.Add);
            dataItem.DueDate = update.DueDate;
            dataItem.MaintenanceCost = update.MaintenanceCost;
            dataItem.InvestmentCost = update.InvestmentCost;
            dataItem.CalculateSubCriticality = update.CalculateSubCriticality;
            dataItem.CalculateSubRecovery = update.CalculateSubRecovery;
        }

        public static void ApplyUpdate(this TimeCost timeCost, Contracts.Asset.TimeCost update)
        {
            timeCost.Time = update.Time;
            timeCost.Cost = update.Cost;
        }
    }
}
