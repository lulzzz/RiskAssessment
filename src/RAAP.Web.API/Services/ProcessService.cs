using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.UI;
using RAAP.Contracts.Common;
using RAAP.Database;
using RAAP.Web.API.Helpers.Linq;
using WebGrease.Css.Extensions;
using Threat = RAAP.Contracts.Threat.Threat;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Exceptions;

namespace RAAP.Web.API.Services
{
    public class ProcessService : ServiceBase
    {
        public ProcessService(UserService userService) : base(userService)
        {

        }
        public Contracts.Process.Process GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Processes.FirstOrDefault(a => a.ProcessId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract(_userService);
            }
        }

        public PagedResult<Contracts.Process.Process> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.Processes.Count();
                try
                {
                    return new PagedResult<Contracts.Process.Process>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            db.Processes.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<Process>(pagedQuery.OrderByKey),
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

        public Contracts.Process.Process Create(Contracts.Process.CreateProcess createProcess)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.Processes.Any(a => a.Name == createProcess.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");

                if (createProcess.Category == null)
                    throw new RAAPConflictException("Category is not selected.");
                RiskCalculator.CheckRiskTypes(createProcess, db);
                var process = createProcess.ToDataModel(db);
                AddAssets(db, process, createProcess.Assets);
                db.Processes.Add(process);
                RiskCalculator.CalculateRisk(process);
                db.SaveChanges();

                return process.ToContract(_userService);
            }
        }

        public Contracts.Process.Process Update(Contracts.Process.UpdateProcess updateProcess)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var process = db.Processes.FirstOrDefault(a => a.ProcessId == updateProcess.ProcessId);
                if (process == null)
                    throw new RAAPNotFoundException("Item not found.");
                RiskCalculator.CheckRiskTypes(updateProcess, db);
                process.ApplyUpdate(updateProcess, db);
                RemoveUnusedAssets(process, updateProcess);
                AddAssets(db, process, updateProcess.Assets);
                RiskCalculator.CalculateRisk(process);
                db.SaveChanges();
                return process.ToContract(_userService);
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var process = db.Processes.FirstOrDefault(a => a.ProcessId == id);
                if (process == null)
                    throw new RAAPNotFoundException("Item not found.");
                db.HtmlComments.RemoveRange(process.HtmlComments.ToList());
                db.ThreatRisks.RemoveRange(process.ThreatRisks.ToList());
                db.Risks.RemoveRange(process.Risks.ToList());
                process.Assets.Clear();
                db.Processes.Remove(process);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.Processes.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.ProcessId, Name = a.Name }).ToList();
            }
        }

        private void AddAssets(RAAPEntities db, Process process, IEnumerable<Contracts.Asset.Asset> assets)
        {
            foreach (var assetToDependOnDTO in assets.Where(c => c.AssetId > 0))
            {
                var assetToDependOn = db.Assets.FirstOrDefault(c => c.AssetId == assetToDependOnDTO.AssetId);
                if (assetToDependOn == null)
                    throw new RAAPConflictException("AssetId");
                if (!process.Assets.Contains(assetToDependOn))
                    process.Assets.Add(assetToDependOn);
            }

            foreach (var assetToDependOnDTO in assets.Where(t => t.AssetId == 0))
            {
                var assetToDependOn = assetToDependOnDTO.ToDataModel(db);
                db.Assets.Add(assetToDependOn);
                process.Assets.Add(assetToDependOn);
            }
        }

        private static void RemoveUnusedAssets(Process process, Contracts.Process.UpdateProcess updateProcess)
        {
            foreach (var assetToDependOn in process.Assets.Where(c => updateProcess.Assets.All(uc => uc.AssetId != c.AssetId)).ToList())
                process.Assets.Remove(assetToDependOn);
        }


    }
    public static class ProcessServiceExtensions
    {
        public static Contracts.Process.Process ToContract(this Process dataItem, UserService userService)
        {
            return new Contracts.Process.Process
            {
                Enabled = dataItem.Enabled,
                ProcessId = dataItem.ProcessId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                Category = dataItem.ProcessCategory.ToContract(),
                Assets = dataItem.Assets.Select(a => a.ToContract(userService)).ToList(),
                Evaluations = dataItem.HtmlComments.Select(h => h.ToContract(userService)).OrderByDescending(h => h.Revision).ToList(),
                Risks = dataItem.ThreatRisks.Select(r => r.ToContract()).ToList(),
                ResponsibleUserId = dataItem.ResponsibleUserId,
                ResponsibleUser = dataItem.ResponsibleUserId.HasValue ? userService.GetUserByUserId(dataItem.ResponsibleUserId.Value, false) : null
            };
        }

        public static Process ToDataModel(this Contracts.Process.CreateProcess create, RAAPEntities db)
        {
            var process = new Process
            {
                Enabled = create.Enabled,
                Name = create.Name,
                Description = create.Description,
                ProcessCategory = db.ProcessCategories.FirstOrDefault(c => c.ProcessCategoryId == create.Category.ProcessCategoryId),
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                ResponsibleUserId = create.ResponsibleUserId ?? null,
            };
            create.Evaluations.Where(e => !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision).ForEach(e => process.HtmlComments.Add(e.ToDataModel(db, process)));
            create.Risks.ForEach(r => process.ThreatRisks.Add(r.ToDataModel()));
            return process;
        }

        public static void ApplyUpdate(this Process dataItem, Contracts.Process.UpdateProcess update, RAAPEntities db)
        {
            dataItem.Enabled = update.Enabled;
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.ProcessCategoryId = update.Category.ProcessCategoryId;
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.ResponsibleUserId = update.ResponsibleUserId;
            update.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision).ForEach(e => dataItem.HtmlComments.Add(e.ToDataModel(db, dataItem)));
            //Remove deleted
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
        }

    }
}
