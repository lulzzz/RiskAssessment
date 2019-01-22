using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using RAAP.Contracts.Common;
using RAAP.Database;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Linq;
using Control = RAAP.Contracts.Control.Control;
using WebGrease.Css.Extensions;
using RAAP.Web.API.Helpers.Exceptions;

namespace RAAP.Web.API.Services
{
    public class ThreatService : ServiceBase
    {
        public ThreatService(UserService userService) : base(userService)
        {

        }

        public Contracts.Threat.Threat GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Threats.FirstOrDefault(a => a.ThreatId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract(_userService);
            }
        }

        public PagedResult<Contracts.Threat.Threat> Get(PagedQuery pagedQuery, int[] excludeIds = null)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var itemQuery = db.Threats.AsQueryable();

                if (excludeIds != null && excludeIds.Length > 0)
                    itemQuery = itemQuery.Where(t => !excludeIds.Contains(t.ThreatId));

                var totalItems = itemQuery.Count();
                try
                {
                    return new PagedResult<Contracts.Threat.Threat>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            itemQuery
                                .OrderByDirection(LinqHelper.OrderByDataContract<Threat>(pagedQuery.OrderByKey),
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

        public Contracts.Threat.Threat Create(Contracts.Threat.CreateThreat createThreat)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.Threats.Any(a => a.Name == createThreat.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                RiskCalculator.CheckRiskTypes(createThreat, db);
                RiskCalculator.CalculateRisk(createThreat);
                var threat = createThreat.ToDataModel(db);
                db.Threats.Add(threat);
                AddControls(db, threat, createThreat.Controls);
                db.SaveChanges();

                return threat.ToContract(_userService);
            }
        }

        public Contracts.Threat.Threat Update(Contracts.Threat.UpdateThreat updateThreat)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var threat = db.Threats.Include("Controls").FirstOrDefault(a => a.ThreatId == updateThreat.ThreatId);
                if (threat == null)
                    throw new RAAPNotFoundException("Item not found.");
                RiskCalculator.CheckRiskTypes(updateThreat, db);
                threat.ApplyUpdate(updateThreat, db);
                RemoveUnusedControls(threat, updateThreat);
                AddControls(db, threat, updateThreat.Controls);
                RiskCalculator.ResetCalculatedRisk(threat);
                RiskCalculator.CalculateRisk(threat);
                db.SaveChanges();
                return threat.ToContract(_userService);
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var threat = db.Threats.FirstOrDefault(a => a.ThreatId == id);
                if (threat == null)
                    throw new RAAPNotFoundException("Item not found.");
                db.ThreatRisks.RemoveRange(threat.ThreatRisks.ToList());
                db.HtmlComments.RemoveRange(threat.HtmlComments.ToList());
                threat.Attributes.Clear();
                db.Threats.Remove(threat);
                db.SaveChanges();
            }
        }

        public List<Contracts.Threat.Threat> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.Threats.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20).ToList()
                        .Select(a => a.ToContract(_userService)).ToList();
            }
        }

        private static void AddControls(RAAPEntities db, Threat threat, IEnumerable<Control> controls)
        {
            foreach (var controlDTO in controls.Where(c => c.ControlId > 0))
            {
                var control = db.Controls.FirstOrDefault(c => c.ControlId == controlDTO.ControlId);
                if (control == null)
                    throw new RAAPConflictException("ControlId");
                if (!threat.Controls.Contains(control))
                    threat.Controls.Add(control);
            }

            foreach (var controlDTO in controls.Where(t => t.ControlId == 0))
            {
                var control = controlDTO.ToDataModel(db);
                db.Controls.Add(control);
                threat.Controls.Add(control);
            }
        }
        private static void RemoveUnusedControls(Threat threat, Contracts.Threat.UpdateThreat updateThreat)
        {
            foreach (
                var control in
                    threat.Controls.Where(c => updateThreat.Controls.All(uc => uc.ControlId != c.ControlId)).ToList())
                threat.Controls.Remove(control);
        }
    }
    public static class ThreatServiceExtensions
    {
        public static ThreatRisk ToDataModel(this Contracts.Risk.Risk risk)
        {
            return new ThreatRisk()
            {
                CalculatedIso = risk.CalculatedIsoRisk,
                CalculatedNs = risk.CalculatedNsRisk,
                IsoImpact = risk.IsoImpact,
                IsoProbability = risk.IsoProbability,
                NsThreat = risk.NsThreat,
                NsValue = risk.NsValue,
                NsVulnerability = risk.NsVulnerability,
                IsoRisk = risk.IsoRisk,
                NsRisk = risk.NsRisk,
                CalculatedIsoImpact = risk.CalculatedIsoImpact,
                CalculatedIsoProbability = risk.CalculatedIsoProbability,
                CalculatedNsThreat = risk.CalculatedNsThreat,
                CalculatedNsValue = risk.CalculatedNsValue,
                CalculatedNsVulnerability = risk.CalculatedNsVulnerability,
                Type = risk.Type,
            };
        }
        public static void UpdateFrom(this ThreatRisk threatRisk, Contracts.Risk.Risk risk)
        {
            threatRisk.CalculatedIso = risk.CalculatedIsoRisk;
            threatRisk.CalculatedNs = risk.CalculatedNsRisk;
            threatRisk.IsoImpact = risk.IsoImpact;
            threatRisk.IsoProbability = risk.IsoProbability;
            threatRisk.NsThreat = risk.NsThreat;
            threatRisk.NsValue = risk.NsValue;
            threatRisk.NsVulnerability = risk.NsVulnerability;
            threatRisk.IsoRisk = risk.IsoRisk;
            threatRisk.NsRisk = risk.NsRisk;
            threatRisk.CalculatedIsoImpact = risk.CalculatedIsoImpact;
            threatRisk.CalculatedIsoProbability = risk.CalculatedIsoProbability;
            threatRisk.CalculatedNsThreat = risk.CalculatedNsThreat;
            threatRisk.CalculatedNsValue = risk.CalculatedNsValue;
            threatRisk.CalculatedNsVulnerability = risk.CalculatedNsVulnerability;
            threatRisk.Type = risk.Type;
        }
        public static Contracts.Risk.Risk ToContract(this ThreatRisk risk)
        {
            return new Contracts.Risk.Risk()
            {
                CalculatedIsoRisk = risk.CalculatedIso,
                CalculatedNsRisk = risk.CalculatedNs,
                IsoImpact = risk.IsoImpact,
                IsoProbability = risk.IsoProbability,
                NsThreat = risk.NsThreat,
                NsValue = risk.NsValue,
                NsVulnerability = risk.NsVulnerability,
                IsoRisk = risk.IsoRisk,
                NsRisk = risk.NsRisk,
                Type = risk.Type,
                Name = risk.RiskType.Name,
                RiskId = risk.ThreatRiskId,
                CalculatedIsoImpact = risk.CalculatedIsoImpact,
                CalculatedIsoProbability = risk.CalculatedIsoProbability,
                CalculatedNsThreat = risk.CalculatedNsThreat,
                CalculatedNsValue = risk.CalculatedNsValue,
                CalculatedNsVulnerability = risk.CalculatedNsVulnerability,
            };
        }
        public static Contracts.Threat.Threat ToContract(this Threat dataItem, UserService userService)
        {
            return new Contracts.Threat.Threat
            {
                Enabled = true,
                ThreatId = dataItem.ThreatId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                Category = dataItem.ThreatCategory.ToContract(),
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                Risks = dataItem.ThreatRisks.Select(tr => tr.ToContract()).ToList(),
                Confidenciality = dataItem.Confidenciality,
                AcceptRisk = dataItem.AcceptRisk,
                Availability = dataItem.Availability,
                Integrity = dataItem.Integrity,
                Authenticity = dataItem.Authenticity,
                InternalExternal = dataItem.InternalExternal,
                RiskAssessmentMethod = dataItem.RiskAssessmentMethod,
                SecuritySafety = dataItem.SecuritySafety,
                ReduceRisk = dataItem.ReduceRisk,
                AvoidRisk = dataItem.AvoidRisk,
                ShareRisk = dataItem.ShareRisk,
                RiskDate = dataItem.RiskDate,
                RiskUser = dataItem.RiskUser,
                Controls = dataItem.Controls.Select(c => c.ToContract(userService)).ToList(),
                Evaluations = dataItem.HtmlComments.Select(h => h.ToContract(userService)).OrderByDescending(h => h.Revision).ToList(),
                Causes = dataItem.Attributes.Select(a => a.ToContract()).ToList()
            };
        }

        public static Threat ToDataModel(this Contracts.Threat.CreateThreat create, RAAPEntities db)
        {
            var threat = new Threat
            {
                Name = create.Name,
                Description = create.Description,
                ThreatCategory = db.ThreatCategories.FirstOrDefault(tc => tc.ThreatCategoryId == create.Category.ThreatCategoryId),
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                Confidenciality = create.Confidenciality,
                AcceptRisk = create.AcceptRisk,
                Availability = create.Availability,
                Integrity = create.Integrity,
                Authenticity = create.Authenticity,
                InternalExternal = create.InternalExternal,
                RiskAssessmentMethod = create.RiskAssessmentMethod,
                SecuritySafety = create.SecuritySafety,
                ReduceRisk = create.ReduceRisk,
                AvoidRisk = create.AvoidRisk,
                ShareRisk = create.ShareRisk,
            };
            if (create.AvoidRisk || create.AcceptRisk)
            {
                threat.RiskDate = DateTime.Now;
                threat.RiskUser = HttpContext.Current.User.Identity.GetUserName();
            }
            create.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                .ForEach(e => threat.HtmlComments.Add(e.ToDataModel(db, threat)));
            create.Risks.ForEach(r => threat.ThreatRisks.Add(r.ToDataModel()));
            threat.Attributes = create.Causes.Select(c => c.ToDataModel()).ToList();
            return threat;
        }

        public static void ApplyUpdate(this Threat dataItem, Contracts.Threat.UpdateThreat update, RAAPEntities db)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.ThreatCategory =
                db.ThreatCategories.FirstOrDefault(tc => tc.ThreatCategoryId == update.Category.ThreatCategoryId);
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.Confidenciality = update.Confidenciality;
            dataItem.AcceptRisk = update.AcceptRisk;
            dataItem.Availability = update.Availability;
            dataItem.Integrity = update.Integrity;
            dataItem.Authenticity = update.Authenticity;
            dataItem.InternalExternal = update.InternalExternal;
            dataItem.RiskAssessmentMethod = update.RiskAssessmentMethod;
            dataItem.SecuritySafety = update.SecuritySafety;
            dataItem.ReduceRisk = update.ReduceRisk;
            dataItem.AvoidRisk = update.AvoidRisk;
            dataItem.ShareRisk = update.ShareRisk;
            update.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                .ForEach(e => dataItem.HtmlComments.Add(e.ToDataModel(db, dataItem)));
            if (update.AvoidRisk || update.AcceptRisk)
            {
                dataItem.RiskDate = DateTime.Now;
                dataItem.RiskUser = HttpContext.Current.User.Identity.GetUserName();
            }
            else
            {
                dataItem.RiskDate = null;
                dataItem.RiskUser = null;
            }
            //Remove deleted+
            var risksToDelete = dataItem.ThreatRisks.Where(r => update.Risks.All(rr => rr.RiskId != r.ThreatRiskId)).ToArray();
            foreach (var risk in risksToDelete)
            {
                dataItem.ThreatRisks.Remove(risk);
            }

            //Update existing
            update.Risks.Where(r => r.RiskId > 0).ForEach(risk =>
                dataItem.ThreatRisks.First(r => r.ThreatRiskId == risk.RiskId).UpdateFrom(risk));
            //Add new
            update.Risks.Where(r => r.RiskId <= 0).ForEach(risk => dataItem.ThreatRisks.Add(risk.ToDataModel()));


            //Remove deleted
            var itemsToRemove = new List<Database.Attribute>();
            dataItem.Attributes.Where(r => update.Causes.All(rr => rr.AttributeId != r.AttributeId)).ForEach(r => itemsToRemove.Add(r));
            itemsToRemove.ForEach(i => dataItem.Attributes.Remove(i));

            //Add new
            update.Causes.Where(r => dataItem.Attributes.All(rr => rr.AttributeId != r.AttributeId)).ForEach(r => dataItem.Attributes.Add(db.Attributes.FirstOrDefault(a => a.AttributeId == r.AttributeId)));


        }
    }
}