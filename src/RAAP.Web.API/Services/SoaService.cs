using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNet.Identity;
using RAAP.Database;
using RAAP.Web.API.Helpers.Linq;
using WebGrease.Css.Extensions;

namespace RAAP.Web.API.Services
{
    public class SoaService : ServiceBase
    {
        public SoaService(UserService userService):base(userService)
        {
            
        }

        public IEnumerable<Contracts.Soa.SoaChapter> Get(int type, string isoCode)
        {
            using (var db = new RAAPMasterEntities())
            {
                try
                {
                    return GetChapters(db, type, isoCode).Values.Where(c => !c.ParentId.HasValue);
                }
                catch (Exception exception)
                {
                    throw;
                }
            }
        }

        public Contracts.Soa.SoaStatistics GetSoaStatistics(int soaType)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                //var relevant = db.SoaSettings.Where(s => s.Relevant).Select(s => s.SoaType).ToList();

                var allImplemented = db.Asset_SoaChapter.Where(a => a.Soa.SoaType == soaType).GroupBy(a => a.AssetId).Where(a => a.All(b => b.Implemented == true));
                var allImplementedIds = allImplemented.Select(a => a.Key).ToList();
                var deadLinePassed = db.Asset_SoaChapter.Where(a => a.Soa.SoaType == soaType).GroupBy(a => a.AssetId).Where(a => a.Any(b => b.Deadline <= DateTime.Now && !b.Implemented));
                var deadLinePassedIds = deadLinePassed.Select(d => d.Key).ToList().Except(allImplementedIds).ToList();
                var inProgress = db.Asset_SoaChapter.Where(a => a.Soa.SoaType == soaType).GroupBy(a => a.AssetId).Where(a => a.Any(b => b.Implemented == true || b.Deadline >= DateTime.Now));
                var inProgressIds = inProgress.Select(i => i.Key).ToList().Except(allImplementedIds).Except(deadLinePassedIds).ToList();
                var total = db.Assets.Where(a => a.Category == 1).OrderBy(a => a.Name).Select(a => new { AssetId = a.AssetId, Name = a.Name }).ToDictionary(i => i.AssetId);
                var notImplemented = total.Keys.Except(allImplementedIds).Except(inProgressIds).Except(deadLinePassedIds).ToList();

                return new RAAP.Contracts.Soa.SoaStatistics()
                {
                    DeadlinePassed = deadLinePassedIds.Select(i => new Contracts.Soa.SoaStatisticsItem() { Id = i, Name = total[i].Name }).ToList(),
                    Implemented = allImplementedIds.Select(i => new Contracts.Soa.SoaStatisticsItem() { Id = i, Name = total[i].Name }).ToList(),
                    NotImplemented = notImplemented.Select(i => new Contracts.Soa.SoaStatisticsItem() { Id = i, Name = total[i].Name }).ToList(),
                    InProgress = inProgressIds.Select(i => new Contracts.Soa.SoaStatisticsItem() { Id = i, Name = total[i].Name }).ToList(),
                    AssetNames = total.Values.Select(t => new Contracts.Soa.SoaStatisticsItem() { Id = t.AssetId, Name = t.Name}).ToList(),
                    SoaType = soaType,
                };
            }
        }

        public Contracts.Soa.SoaStatistics GetAssetSoaStatistics(int assetId, int soaType, string isoCode)
        {
            //Return list of items where deadline is in the past, deadline in the future or not implemented
            using (var master = new RAAPMasterEntities())
            {
                var chapterNames = master.SoaChapters.Where(s => s.SoaType == soaType).Select(s => new { ChapterId = s.Id, Name = s.SoaChapterItems.FirstOrDefault(sci => sci.IsoCode == isoCode).Description }).ToDictionary(s => s.ChapterId);
                using (var db = new RAAPEntities(GetConnectionString()))
                {
                    var notImplemented = db.Asset_SoaChapter.Where(a => a.AssetId == assetId && !a.Implemented && a.Soa.SoaType == soaType).Select(a => new { SoaId = a.SoaId, ChapterId = a.Soa.SoaChapterId, Deadline=a.Deadline }).ToList();
                    var result = new Contracts.Soa.SoaStatistics()
                    {
                        InProgress = notImplemented.Where(n => n.Deadline >= DateTime.Now).Select(n => new Contracts.Soa.SoaStatisticsItem() { Id = n.SoaId, Name = chapterNames[n.ChapterId].Name }).ToList(),
                        DeadlinePassed = notImplemented.Where(n => n.Deadline < DateTime.Now).Select(n => new Contracts.Soa.SoaStatisticsItem() { Id = n.SoaId, Name = chapterNames[n.ChapterId].Name }).ToList(),
                        NotImplemented = notImplemented.Where(n => !n.Deadline.HasValue).Select(n => new Contracts.Soa.SoaStatisticsItem() { Id = n.SoaId, Name = chapterNames[n.ChapterId].Name }).ToList()
                    };
                    return result;
                }
            }
        }
        
        public void Update(List<Contracts.Soa.SoaChapter> chapters)
        {
            var isoCodes = chapters.Select(c => c.IsoCode).Distinct();
            if (isoCodes.Count() > 1)
                throw new ArgumentException("Multiple IsoCodes", "IsoCode");
            var isoCode = isoCodes.First();

            var types = chapters.Select(c => c.SoaType).Distinct();
            if (types.Count() > 1)
                throw new ArgumentException("Multiple SoA types", "SoaType");
            var type = types.First();
            using (var db = new RAAPMasterEntities())
            {
                //Update existing chapters
                //Delete chapters not in db
                var dbChapters = db.SoaChapters.Where(c => c.SoaType == type).ToDictionary(c => c.Id);
                UpdateSoaChapters(chapters, dbChapters, isoCode);
                db.SoaChapters.RemoveRange(dbChapters.Values);
                
                //Add new chapters to db
                AddNewSoaChapters(chapters, null, db, isoCode);

                db.SaveChanges();
            }
        }

        internal IEnumerable<int> GetRelevantSoas()
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return db.SoaSettings.Where(s => s.Relevant).Select(s => s.SoaType).ToList();
            }
        }

        internal void UpdateAssetSoas(List<Contracts.Asset.AssetSoaList> soas)
        {
            if (soas == null || soas.Count() == 0)
                return;
            var assetIds = soas.Select(s => s.AssetId).Distinct();
            if (assetIds.Count() != 1)
                throw new ArgumentException("Incorrect number of asset", "AssetId");
            var assetId = assetIds.First();
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var dbAssetSoas = db.Asset_SoaChapter.Where(a => a.AssetId == assetId).ToDictionary(a => a.SoaId); //Load them into memory
                var assetSoas = soas.SelectMany(a => a.AssetSoas).ToDictionary(a => a.SoaId);
                foreach (var item in assetSoas)
                {
                    if (dbAssetSoas.ContainsKey(item.Key))
                    {
                        UpdateDbAssetSoa(dbAssetSoas[item.Key], item.Value);
                        dbAssetSoas.Remove(item.Key);
                    }
                    else
                        db.Asset_SoaChapter.Add(item.Value.ToDataModel(assetId));
                }
                db.Asset_SoaChapter.RemoveRange(dbAssetSoas.Values);
                db.SaveChanges();
            }
        }

        private void UpdateDbAssetSoa(Asset_SoaChapter asset_SoaChapter, Contracts.Asset.AssetSoa value)
        {
            asset_SoaChapter.Implemented = value.Implemented;
            asset_SoaChapter.ValidTo = value.ValidTo;
            asset_SoaChapter.ExecutedDate = value.ExecutedDate;
            asset_SoaChapter.Deadline = value.Deadline;
            asset_SoaChapter.Comment = value.Comment;
        }

        internal List<Contracts.Asset.AssetSoaList> GetAssetSoas(int assetId, string isoCode)
        {
            using (var master = new RAAPMasterEntities())
            {
                var chapterNames = master.SoaChapters.Where(s => s.SoaType != 2).Select(s => new { ChapterId = s.Id, Name = s.SoaChapterItems.FirstOrDefault(sci => sci.IsoCode == isoCode).Description }).ToDictionary(s => s.ChapterId);
                using (var db = new RAAPEntities(GetConnectionString()))
                {
                    var relevantSoas = db.Soas.Where(s => s.Relevance && s.SoaType != 2).Select(s => new { SoaId = s.SoaId, SoaType = s.SoaType, ChapterId = s.SoaChapterId}).ToDictionary(s => s.SoaId);
                    var registeredSoas = db.Asset_SoaChapter.Where(s => s.AssetId == assetId).ToDictionary(s => s.SoaId);
                    var soas = relevantSoas.Select( r => ConvertToDataContract(registeredSoas.ContainsKey(r.Key) ? registeredSoas[r.Key] : null, r.Key, r.Value.SoaType, chapterNames[r.Value.ChapterId].Name) ).ToLookup(s => s.SoaType);
                    var result = new List<Contracts.Asset.AssetSoaList>();
                    soas.ForEach(i => result.Add(new Contracts.Asset.AssetSoaList() { AssetId = assetId, SoaType = i.Key, AssetSoas = i.ToList() }));
                    return result;
                }
            }
        }

        internal static Contracts.Asset.AssetSoa ConvertToDataContract(Asset_SoaChapter asset_SoaChapter, int soaId, int soaType, string name)
        {
            var assetSoa = new Contracts.Asset.AssetSoa()
            {
                SoaId = soaId,
                SoaType = soaType,
                SoaChapterName = name
            };
            if(asset_SoaChapter != null)
            {
                assetSoa.Implemented = asset_SoaChapter.Implemented;
                assetSoa.ValidTo = asset_SoaChapter.ValidTo;
                assetSoa.ExecutedDate = asset_SoaChapter.ExecutedDate;
                assetSoa.Deadline = asset_SoaChapter.Deadline;
            }
            return assetSoa;
        }

        internal Contracts.Soa.SoaChapter AddTemplate(Contracts.Soa.SoaChapter soa)
        {
            var isoCode = soa.IsoCode;

            if(soa.SoaType == 3)
                using (var db = new RAAPMasterEntities())
                {
                    var chapter = soa.ToDataModel(null, db, isoCode);
                    db.SoaChapters.Add(chapter);
                    db.SaveChanges();
                    return chapter.ToContract(isoCode);
                }
            else
                throw new ArgumentException("Invalid SoaType", "SoaType");
        }

        private void AddNewSoaChapters(List<Contracts.Soa.SoaChapter> chapters, SoaChapter parentChapter, RAAPMasterEntities db, string isoCode)
        {
            foreach (var chapter in chapters)
            {
                SoaChapter dbChapter;
                if (chapter.Id <= 0)
                {
                    dbChapter = chapter.ToDataModel(parentChapter, db, isoCode);
                    db.SoaChapters.Add(dbChapter);
                }
                else
                    dbChapter = db.SoaChapters.FirstOrDefault(c => c.Id == chapter.Id);
                if(chapter.SubChapters != null && chapter.SubChapters.Count>0)
                    AddNewSoaChapters(chapter.SubChapters, dbChapter, db, isoCode);
            }
        }

        private void UpdateSoaChapters(List<Contracts.Soa.SoaChapter> chapters, Dictionary<int, SoaChapter> dbChapters, string isoCode)
        {
            foreach (var chapter in chapters.Where(c => c.Id > 0))
            {
                var dbChapter = dbChapters[chapter.Id];
                dbChapter.UpdateFrom(chapter, isoCode);
                dbChapters.Remove(chapter.Id);
                if(chapter.SubChapters != null && chapter.SubChapters.Count>0)
                    UpdateSoaChapters(chapter.SubChapters, dbChapters, isoCode);
            }
        }

        public Contracts.Soa.Soa GetSoa(int type, string isoCode)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var settings = db.SoaSettings.FirstOrDefault(s => s.SoaType == type);
                bool enabled = true;
                if (settings != null)
                    enabled = settings.Relevant;
                using (var dbMaster = new RAAPMasterEntities())
                {
                    var chapters = GetChapters(dbMaster, type, isoCode);

                    db.Soas.Include("SoaLinks").Where(s => s.SoaType == type).ForEach(s => chapters[s.SoaChapterId].Fill(s, _userService));
                    db.SoaFiles.Where(f => chapters.Keys.Contains(f.SoaChapterId)).ForEach(f => chapters[f.SoaChapterId].Files.Add(new Contracts.Soa.SoaFile( f.FileName, f.SoaChapterId, f.Guid, false)));
                    return new Contracts.Soa.Soa() { Enabled = enabled, SoaChapters = chapters.Values.Where(c => !c.ParentId.HasValue).ToList() };
                }
            }
        }

        private static Dictionary<int, Contracts.Soa.SoaChapter> GetChapters(RAAPMasterEntities dbMaster, int type, string isoCode)
        {
            var chapters =
                dbMaster.SoaChapters.Where(c => c.SoaType == type).OrderBy(s => s.Id).AsEnumerable().Select(s => s.ToContract(isoCode)).ToDictionary(s => s.Id);
            chapters.Values.Where(c => c.ParentId.HasValue).ForEach(c => chapters[c.ParentId.Value].SubChapters.Add(c));
            dbMaster.SoaFiles.Where(f => chapters.Keys.Contains(f.SoaChapterId)).ForEach(f => chapters[f.SoaChapterId].Files.Add(new Contracts.Soa.SoaFile( f.FileName, f.SoaChapterId, f.Guid, true)));
            return chapters;
        }

        public void UpdateSoa(Contracts.Soa.Soa soa)
        {
            var types = soa.SoaChapters.Select(c => c.SoaType).Distinct();
            if (types.Count() > 1)
                throw new ArgumentException("Multiple SoA types", "SoaType");
            var type = types.First();

            var user = (ClaimsIdentity)HttpContext.Current.User.Identity;
            var companyClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.PrimaryGroupSid);
            if (companyClaim != null)
            {
                var companyId = Convert.ToInt32(companyClaim.Value);
                using (var db = new RAAPEntities(GetConnectionString()))
                {
                    //Update settings
                    var settings = db.SoaSettings.FirstOrDefault(s => s.SoaType == type);
                    if (settings == null)
                    {
                        settings = new SoaSetting() { SoaType = type };
                        db.SoaSettings.Add(settings);
                    }
                    settings.Relevant = soa.Enabled;
                    //Update existing
                    //Remove deleted
                    var dbSoas = db.Soas.Where(s => s.SoaType == type).ToDictionary(s => s.SoaId);
                    var soasLevel3 = soa.SoaChapters.SelectMany(s => s.SubChapters).SelectMany(s => s.SubChapters).ToList();
                    UpdateSoas(soasLevel3, dbSoas, db);
                    db.Soas.RemoveRange(dbSoas.Values);
                    soa.SoaChapters.Where(s => s.SoaId > 0).ForEach(s => dbSoas[s.SoaId].UpdateFrom(s, db));
                    //Add new
                    AddNewSoas(soasLevel3, companyId, db);

                    db.SaveChanges();
                }
            }
        }

        private void AddNewSoas(IEnumerable<Contracts.Soa.SoaChapter> soas, int companyId,  RAAPEntities db)
        {
            db.Soas.AddRange(soas.Where(s => s.SoaId <= 0).Select(s => s.ToSoaDataModel()));
        }

        private void UpdateSoas(IEnumerable<Contracts.Soa.SoaChapter> soas, Dictionary<int, Soa> dbSoas, RAAPEntities db)
        {
            foreach (var soa in soas.Where(c => c.SoaId > 0))
            {
                var dbSoa = dbSoas[soa.SoaId];
                dbSoa.UpdateFrom(soa, db);
                dbSoas.Remove(soa.SoaId);
                if (soa.SubChapters != null && soa.SubChapters.Count > 0)
                    UpdateSoas(soa.SubChapters, dbSoas, db);
            }
        }
    }

    public static class SoaServiceExtensions
    {
        public static Contracts.Soa.SoaLink ToContract(this SoaLink soaLink)
        {
            return new Contracts.Soa.SoaLink()
            {
                Name = soaLink.Name??"",
                Url = soaLink.URL??""
            };
        }
        public static SoaChapter ToDataModel(this Contracts.Soa.SoaChapter soaChapter, SoaChapter parentSoaChapter, RAAPMasterEntities db, string isoCode)
        {
            var dbSoaChapter = new SoaChapter()
            {
                ParentChapter = parentSoaChapter,
                SoaType = soaChapter.SoaType,
            };
            var dbSoaChapterItem = new SoaChapterItem()
            {
                Name = soaChapter.Name,
                Description = soaChapter.Description,
                Goal = soaChapter.Goal,
                HowTo = soaChapter.HowTo,
                Info = soaChapter.Info,
                IsoCode = isoCode,
            };
            dbSoaChapter.SoaChapterItems.Add(dbSoaChapterItem);
            //db.SaveChanges(); //<-not optimal, but need to save parent chapters to make recursive linking work... :/
            soaChapter.SubChapters.ForEach(c => c.ToDataModel(dbSoaChapter, db, isoCode));
            return dbSoaChapter;
        }

        public static Soa ToSoaDataModel(this Contracts.Soa.SoaChapter soa)
        {
            return new Soa()
            {
                Compliance = soa.Compliance,
                ComplianceDate = soa.ComplianceDate,
                Contractual = soa.Contractual,
                ControlDescription = soa.ControlDescription,
                CurrentControl = soa.CurrentControl,
                DataProtectionLaw = soa.DataProtectionLaw,
                ImplementationDate = soa.ImplementationDate,
                ImplementationUserId = soa.ImplementationUser?.UserId,
                Reason = (int)soa.Reason,
                Relevance = soa.Relevance,
                ResponsibleUserId = soa.ResponsibleUser?.UserId,
                RiskAssessments = soa.RiskAssessments,
                SoaChapterId = soa.Id,
                SourceReference = soa.SourceReference,
                Authenticity = soa.Integrity,
                Availability = soa.Availability,
                Confidenciality = soa.Confidenciality,
                Integrity = soa.Integrity,
                SoaId = soa.SoaId,
                SoaType = soa.SoaType,
            };
        }

        public static Contracts.Soa.SoaChapter ToContract(this SoaChapter soaChapter, string isoCode)
        {
            var item = soaChapter.SoaChapterItems.First(i => i.IsoCode == isoCode);
            return new Contracts.Soa.SoaChapter()
            {
                ParentId = soaChapter.Parent,
                Id = soaChapter.Id,
                Name = item.Name,
                Description = item.Description,
                Goal = item.Goal,
                HowTo = item.HowTo,
                Info = item.Info,
                SoaType = soaChapter.SoaType,
                IsoCode = isoCode,
                //SubChapters = soaChapter.SubChapters.Select(s => s.ToContract()).ToList()
            };
        }

        public static void Fill(this Contracts.Soa.SoaChapter soaChapter, Soa dbSoa, UserService userService)
        {
            soaChapter.Compliance = dbSoa.Compliance;
            soaChapter.ComplianceDate = dbSoa.ComplianceDate;
            soaChapter.Contractual = dbSoa.Contractual;
            soaChapter.ControlDescription = dbSoa.ControlDescription;
            soaChapter.CurrentControl = dbSoa.CurrentControl;
            soaChapter.DataProtectionLaw = dbSoa.DataProtectionLaw;
            soaChapter.ImplementationDate = dbSoa.ImplementationDate;
            if(dbSoa.ImplementationUserId.HasValue)
                soaChapter.ImplementationUser = userService.GetUserByUserId(dbSoa.ImplementationUserId.Value, false);
            if (dbSoa.ResponsibleUserId.HasValue)
                soaChapter.ResponsibleUser = userService.GetUserByUserId(dbSoa.ResponsibleUserId.Value, false);
            soaChapter.Reason = dbSoa.Reason;
            soaChapter.Relevance = dbSoa.Relevance;
            soaChapter.RiskAssessments = dbSoa.RiskAssessments;
            soaChapter.SourceReference = dbSoa.SourceReference;
            soaChapter.SoaId = dbSoa.SoaId;
            soaChapter.Integrity = dbSoa.Integrity;
            soaChapter.Availability = dbSoa.Availability;
            soaChapter.Authenticity = dbSoa.Authenticity;
            soaChapter.Confidenciality = dbSoa.Confidenciality;
            soaChapter.SoaType = dbSoa.SoaType;
            soaChapter.SoaLinks = dbSoa.SoaLinks.Select(l => l.ToContract()).ToList();
        }

        public static void UpdateFrom(this SoaChapter dbSoaChapter, Contracts.Soa.SoaChapter soaChapter, string isoCode)
        {
            var dbSoaChapterItem = dbSoaChapter.SoaChapterItems.FirstOrDefault(i => i.IsoCode == isoCode);
            if(dbSoaChapterItem == null)
            {
                dbSoaChapterItem = new SoaChapterItem();
                dbSoaChapter.SoaChapterItems.Add(dbSoaChapterItem);
            }
            dbSoaChapterItem.Name = soaChapter.Name;
            dbSoaChapterItem.Description = soaChapter.Description;
            dbSoaChapterItem.Goal = soaChapter.Goal;
            dbSoaChapterItem.HowTo = soaChapter.HowTo;
            dbSoaChapterItem.Info = soaChapter.Info;
        }

        public static void UpdateFrom(this Soa dbSoa, Contracts.Soa.SoaChapter soa, RAAPEntities db)
        {
            dbSoa.Compliance = soa.Compliance;
            dbSoa.ComplianceDate = soa.ComplianceDate;
            dbSoa.Contractual = soa.Contractual;
            dbSoa.ControlDescription = soa.ControlDescription;
            dbSoa.CurrentControl = soa.CurrentControl;
            dbSoa.DataProtectionLaw = soa.DataProtectionLaw;
            dbSoa.ImplementationDate = soa.ImplementationDate;
            dbSoa.ImplementationUserId = soa.ImplementationUser?.UserId;
            dbSoa.ResponsibleUserId = soa.ResponsibleUser?.UserId;
            dbSoa.Reason = (int)soa.Reason;
            dbSoa.Relevance = soa.Relevance;
            dbSoa.RiskAssessments = soa.RiskAssessments;
            dbSoa.SourceReference = soa.SourceReference;
            dbSoa.Confidenciality = soa.Confidenciality;
            dbSoa.Availability = soa.Availability;
            dbSoa.Authenticity = soa.Authenticity;
            dbSoa.Integrity = soa.Integrity;
            db.SoaLinks.RemoveRange(dbSoa.SoaLinks.ToList());
            soa.SoaLinks.ForEach(l => dbSoa.SoaLinks.Add(l.ToDataModel(dbSoa)));
            var errors = dbSoa.SoaLinks.Where(s => s.Soa == null ).ToList();
            if(errors.Count>0)
            {
                string errormsg = "Fuck shit shit!";
            }
        }

        public static SoaLink ToDataModel(this Contracts.Soa.SoaLink soaLink, Soa dbSoa)
        {
            return new SoaLink()
            {
                Name = soaLink.Name,
                URL = soaLink.Url,
                Soa = dbSoa,
            };
        }

        public static Asset_SoaChapter ToDataModel(this Contracts.Asset.AssetSoa assetSoa, int assetId)
        {
            return new Asset_SoaChapter()
            {
                Implemented = assetSoa.Implemented,
                SoaId = assetSoa.SoaId,
                AssetId = assetId,
                ExecutedDate = assetSoa.ExecutedDate,
                ValidTo = assetSoa.ValidTo,
                Deadline = assetSoa.Deadline,
                Comment = assetSoa.Comment
            };
        }

        public static Contracts.Asset.AssetSoa ToContract(this Asset_SoaChapter dbAssetSoa, string name, int soaType)
        {
            return new Contracts.Asset.AssetSoa()
            {
                Implemented = dbAssetSoa.Implemented,
                SoaId = dbAssetSoa.SoaId,
                SoaChapterName = name,
                ValidTo = dbAssetSoa.ValidTo,
                ExecutedDate = dbAssetSoa.ExecutedDate,
                SoaType = soaType,
                Deadline = dbAssetSoa.Deadline,
                Comment = dbAssetSoa.Comment,
            };
        }
    }
}