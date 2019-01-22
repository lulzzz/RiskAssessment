using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RAAP.Contracts.Common;
using RAAP.Database;
using RAAP.Web.API.Helpers.Exceptions;
using RAAP.Web.API.Helpers.Linq;

namespace RAAP.Web.API.Services
{
    public class ThreatCategoryService : ServiceBase
    {
        public ThreatCategoryService() : base(null)
        {

        }
        public Contracts.ThreatCategory.ThreatCategory GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.ThreatCategories.FirstOrDefault(a => a.ThreatCategoryId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.ThreatCategory.ThreatCategory> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.ThreatCategories.Count();
                try
                {
                    return new PagedResult<Contracts.ThreatCategory.ThreatCategory>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            db.ThreatCategories.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<ThreatCategory>(pagedQuery.OrderByKey),
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

        public Contracts.ThreatCategory.ThreatCategory Create(Contracts.ThreatCategory.CreateThreatCategory createThreatCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.ThreatCategories.Any(a => a.Name == createThreatCategory.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var threatCategory = createThreatCategory.ToDataModel();
                db.ThreatCategories.Add(threatCategory);
                db.SaveChanges();

                return threatCategory.ToContract();
            }
        }

        public Contracts.ThreatCategory.ThreatCategory Update(Contracts.ThreatCategory.UpdateThreatCategory updateThreatCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var threatCategory = db.ThreatCategories.FirstOrDefault(a => a.ThreatCategoryId == updateThreatCategory.ThreatCategoryId);
                if (threatCategory == null)
                    throw new RAAPNotFoundException("Item not found.");
                threatCategory.ApplyUpdate(updateThreatCategory);
                db.SaveChanges();
                return threatCategory.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var threatCategory = db.ThreatCategories.FirstOrDefault(a => a.ThreatCategoryId == id);
                if (threatCategory == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (threatCategory.Threats.Any())
                {
                    var error = "Please remove this category from the following threats: " + Environment.NewLine;
                    error = threatCategory.Threats.Aggregate(error, (current, item) => current + (" - " + item.Name + Environment.NewLine));
                    throw new RAAPConflictException(error);
                }

                db.ThreatCategories.Remove(threatCategory);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.ThreatCategories.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.ThreatCategoryId, Name = a.Name }).ToList();
            }
        }
    }

    public static class ThreatCategorieserviceExtensions
    {
        public static Contracts.ThreatCategory.ThreatCategory ToContract(this ThreatCategory dataItem)
        {
            return new Contracts.ThreatCategory.ThreatCategory
            {
                ThreatCategoryId = dataItem.ThreatCategoryId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
            };
        }

        public static ThreatCategory ToDataModel(this Contracts.ThreatCategory.CreateThreatCategory create)
        {
            return new ThreatCategory
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this ThreatCategory dataItem, Contracts.ThreatCategory.UpdateThreatCategory update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}