using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using RAAP.Contracts.Common;
using RAAP.Contracts.Incident;
using RAAP.Database;
using RAAP.Web.API.Helpers.Exceptions;
using RAAP.Web.API.Helpers.Linq;
using WebGrease.Css.Extensions;
using Incident = RAAP.Database.Incident;

namespace RAAP.Web.API.Services
{
    public class IncidentService : ServiceBase
    {
        public IncidentService() : base(null)
        {

        }
        public Contracts.Incident.Incident GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Incidents.FirstOrDefault(a => a.IncidentId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.Incident.Incident> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.Incidents.Count();
                try
                {
                    return new PagedResult<Contracts.Incident.Incident>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            db.Incidents.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<Incident>(pagedQuery.OrderByKey),
                                    pagedQuery.IsDescending)
                                .Skip(pagedQuery.ItemsToSkip)
                                .Take(pagedQuery.PageSize)
                                .Select(x => x.ToContract())
                                .ToArray()
                    };
                }
                catch (Exception exception)
                {
                    throw;
                }
            }
        }

        public Contracts.Incident.Incident Create(Contracts.Incident.CreateIncident createIncident)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.Incidents.Any(a => a.Name == createIncident.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var process = createIncident.ToDataModel(db);
                db.Incidents.Add(process);

                db.SaveChanges();

                return process.ToContract();
            }
        }

        public Contracts.Incident.Incident Update(Contracts.Incident.UpdateIncident updateIncident)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var process = db.Incidents.FirstOrDefault(a => a.IncidentId == updateIncident.IncidentId);
                if (process == null)
                    throw new RAAPNotFoundException("Item not found.");
                process.ApplyUpdate(updateIncident);
                db.SaveChanges();
                return process.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var process = db.Incidents.FirstOrDefault(a => a.IncidentId == id);
                if (process == null)
                    throw new RAAPNotFoundException("Item not found.");
                db.Incidents.Remove(process);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.Incidents.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.IncidentId, Name = a.Name }).ToList();
            }
        }
    }
    public static class IncidentServiceExtensions
    {
        public static Contracts.Incident.Incident ToContract(this Incident dataItem)
        {
            return new Contracts.Incident.Incident
            {
                IncidentId = dataItem.IncidentId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
            };
        }

        public static Incident ToDataModel(this Contracts.Incident.CreateIncident create, RAAPEntities db)
        {
            return new Incident
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this Incident dataItem, Contracts.Incident.UpdateIncident update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}