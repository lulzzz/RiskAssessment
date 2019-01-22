using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using RAAP.Contracts.Common;
using RAAP.Contracts.Control;
using RAAP.Contracts.Risk;
using RAAP.Database;
using RAAP.Web.API.Helpers.Linq;
using WebGrease.Css.Extensions;
using Control = RAAP.Database.Control;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Exceptions;

namespace RAAP.Web.API.Services
{
    public class ControlService : ServiceBase
    {
        public ControlService(UserService userService) : base(userService)
        {

        }

        public Contracts.Control.Control GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Controls.FirstOrDefault(a => a.ControlId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract(_userService);
            }
        }

        public PagedResult<Contracts.Control.Control> Get(PagedQuery pagedQuery, int[] excludeIds = null)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                try
                {
                    var itemQuery = db.Controls.AsQueryable();
                    if (excludeIds != null && excludeIds.Length > 0)
                        itemQuery = itemQuery.Where(t => !excludeIds.Contains(t.ControlId));
                    var totalItems = itemQuery.Count();
                    return new PagedResult<Contracts.Control.Control>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            itemQuery
                                .OrderByDirection(LinqHelper.OrderByDataContract<Control>(pagedQuery.OrderByKey),
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

        public Contracts.Control.Control Create(Contracts.Control.CreateControl createControl)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.Controls.Any(a => a.Name == createControl.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                RiskCalculator.CheckRiskTypes(createControl, db);
                var process = createControl.ToDataModel(db);
                db.Controls.Add(process);

                db.SaveChanges();

                return process.ToContract(_userService);
            }
        }

        public Contracts.Control.Control Update(Contracts.Control.UpdateControl updateControl)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var process = db.Controls.FirstOrDefault(a => a.ControlId == updateControl.ControlId);
                if (process == null)
                    throw new RAAPNotFoundException("Item not found.");
                RiskCalculator.CheckRiskTypes(updateControl, db);
                process.ApplyUpdate(updateControl, db);
                db.SaveChanges();
                return process.ToContract(_userService);
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var process = db.Controls.FirstOrDefault(a => a.ControlId == id);
                if (process == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (process.ControlRisks.Any())
                    db.ControlRisks.RemoveRange(process.ControlRisks);

                db.HtmlComments.RemoveRange(process.HtmlComments.ToList());
                db.Controls.Remove(process);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.Controls.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.ControlId, Name = a.Name }).ToList();
            }
        }
    }
    public static class ControlServiceExtensions
    {
        public static ControlRisk ToDataModel(this Contracts.Risk.RiskReduce risk)
        {
            return new ControlRisk()
            {
                IsoImpact = risk.IsoImpact,
                IsoProbability = risk.IsoProbability,
                NsThreat = risk.NsThreat,
                NsValue = risk.NsValue,
                NsVulnerability = risk.NsVulnerability,
                Type = risk.Type,
            };
        }
        public static void UpdateFrom(this ControlRisk threatRisk, Contracts.Risk.RiskReduce risk)
        {
            threatRisk.IsoImpact = risk.IsoImpact;
            threatRisk.IsoProbability = risk.IsoProbability;
            threatRisk.NsThreat = risk.NsThreat;
            threatRisk.NsValue = risk.NsValue;
            threatRisk.NsVulnerability = risk.NsVulnerability;
            threatRisk.Type = risk.Type;
        }
        public static Contracts.Risk.RiskReduce ToContract(this ControlRisk risk)
        {
            return new Contracts.Risk.RiskReduce()
            {
                IsoImpact = risk.IsoImpact,
                IsoProbability = risk.IsoProbability,
                NsThreat = risk.NsThreat,
                NsValue = risk.NsValue,
                NsVulnerability = risk.NsVulnerability,
                Type = risk.Type,
                Name = risk.RiskType.Name,
                RiskReduceId = risk.ControlRiskId
            };
        }
        public static Contracts.Control.Control ToContract(this Control dataItem, UserService userService)
        {
            return new Contracts.Control.Control
            {
                Avoid = dataItem.Avoid,
                Enabled = true,
                ControlId = dataItem.ControlId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                ExecutedDate = dataItem.ExecutedDate,
                Deadline = dataItem.Deadline,
                InvestmentCost = dataItem.InvestmentCost,
                LegalObligation = dataItem.LegalObligation,
                MaintenanceCost = dataItem.MaintenanceCost,
                ResponsibleUserId = dataItem.ResponsibleUserId,
                Status = (ControlStatus)dataItem.Status,
                Type = (ControlType)dataItem.Type,
                ValidTo = dataItem.ValidTo,
                Category = dataItem.ControlCategory.ToContract(),
                ResponsibleUser = dataItem.ResponsibleUserId.HasValue ? userService.GetUserByUserId(dataItem.ResponsibleUserId.Value, false) : null,
                Detect = dataItem.Detect,
                Prevent = dataItem.Prevent,
                React = dataItem.React,
                AlertDate = dataItem.AlertDate,
                AlertUserId = dataItem.AlertUserId,
                AlertUser = dataItem.AlertUserId.HasValue ? userService.GetUserByUserId(dataItem.AlertUserId.Value, false) : null,
                Risks = dataItem.ControlRisks.Select(r => r.ToContract()).ToList(),
                Evaluations = dataItem.HtmlComments.Select(h=>h.ToContract(userService)).OrderByDescending(h=>h.Revision).ToList()
            };
        }

        public static Control ToDataModel(this Contracts.Control.CreateControl create, RAAPEntities db)
        {
            var control = new Control
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                ExecutedDate = create.ExecutedDate,
                Deadline = create.Deadline,
                InvestmentCost = create.InvestmentCost,
                LegalObligation = create.LegalObligation,
                MaintenanceCost = create.MaintenanceCost,
                ResponsibleUserId = create.ResponsibleUserId,
                Status = (int)create.Status,
                Type = (int)create.Type,
                ValidTo = create.ValidTo,
                ControlCategory = (create.Category != null ? db.ControlCategories.FirstOrDefault(cc => cc.ControlCategoryId == create.Category.ControlCategoryId) : null),
                React = create.React,
                Detect = create.Detect,
                Prevent = create.Prevent,
                AlertUserId = create.AlertUserId,
                AlertDate = create.AlertDate,
                Avoid = create.Avoid
            };
            create.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                .ForEach(e => control.HtmlComments.Add(e.ToDataModel(db, control)));
            create.Risks.ForEach(r => control.ControlRisks.Add(r.ToDataModel()));
            return control;
        }

        public static void ApplyUpdate(this Control dataItem, Contracts.Control.UpdateControl update, RAAPEntities db)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.ExecutedDate = update.ExecutedDate;
            dataItem.Deadline = update.Deadline;
            dataItem.InvestmentCost = update.InvestmentCost;
            dataItem.LegalObligation = update.LegalObligation;
            dataItem.MaintenanceCost = update.MaintenanceCost;
            dataItem.ResponsibleUserId = update.ResponsibleUserId;
            dataItem.Status = (int)update.Status;
            dataItem.Type = (int)update.Type;
            dataItem.ValidTo = update.ValidTo;
            dataItem.ControlCategory =
                db.ControlCategories.FirstOrDefault(c => c.ControlCategoryId == update.Category.ControlCategoryId);
            dataItem.React = update.React;
            dataItem.Detect = update.Detect;
            dataItem.Avoid = update.Avoid;
            dataItem.Prevent = update.Prevent;
            dataItem.AlertUserId = update.AlertUserId;
            dataItem.AlertDate = update.AlertDate;
            update.Evaluations.Where(e => e.EvaluationId == 0 && !string.IsNullOrEmpty(e.Text)).OrderBy(e => e.Revision)
                  .ForEach(e => dataItem.HtmlComments.Add(e.ToDataModel(db, dataItem)));
            //Remove deleted
            var itemsForDelete = dataItem.ControlRisks.Where(r => update.Risks.All(rr => rr.RiskReduceId != r.ControlRiskId)).ToList();
            itemsForDelete.ForEach(r => dataItem.ControlRisks.Remove(r));
            //Update existing
            update.Risks.Where(r => r.RiskReduceId > 0).ForEach(risk =>
                dataItem.ControlRisks.First(r => r.ControlRiskId == risk.RiskReduceId).UpdateFrom(risk));
            //Add new
            update.Risks.Where(r => r.RiskReduceId <= 0).ForEach(risk => dataItem.ControlRisks.Add(risk.ToDataModel()));
        }

    }
}