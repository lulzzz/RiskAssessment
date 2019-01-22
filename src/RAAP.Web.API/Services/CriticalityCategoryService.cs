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
    public class CriticalityCategoryService : ServiceBase
    {
        public CriticalityCategoryService() : base(null)
        {

        }
        public Contracts.CriticalityCategory.CriticalityCategory GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.CriticalityCategories.FirstOrDefault(a => a.CriticalityCategoryId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.CriticalityCategory.CriticalityCategory> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.CriticalityCategories.Count();
                try
                {
                    return new PagedResult<Contracts.CriticalityCategory.CriticalityCategory>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            db.CriticalityCategories.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<CriticalityCategory>(pagedQuery.OrderByKey),
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

        public Contracts.CriticalityCategory.CriticalityCategory Create(Contracts.CriticalityCategory.CreateCriticalityCategory createCriticalityCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.CriticalityCategories.Any(a => a.Name == createCriticalityCategory.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var CriticalityCategory = createCriticalityCategory.ToDataModel();
                db.CriticalityCategories.Add(CriticalityCategory);
                db.SaveChanges();

                return CriticalityCategory.ToContract();
            }
        }

        public Contracts.CriticalityCategory.CriticalityCategory Update(Contracts.CriticalityCategory.UpdateCriticalityCategory updateCriticalityCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var CriticalityCategory = db.CriticalityCategories.FirstOrDefault(a => a.CriticalityCategoryId == updateCriticalityCategory.CriticalityCategoryId);
                if (CriticalityCategory == null)
                    throw new RAAPNotFoundException("Item not found.");
                CriticalityCategory.ApplyUpdate(updateCriticalityCategory);
                db.SaveChanges();
                return CriticalityCategory.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var CriticalityCategory = db.CriticalityCategories.FirstOrDefault(a => a.CriticalityCategoryId == id);
                if (CriticalityCategory == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (CriticalityCategory.Assets.Any())
                {
                    var error = "Please remove this category from the following assets: " + Environment.NewLine;
                    error = CriticalityCategory.Assets.Aggregate(error, (current, item) => current + (" - " + item.Name + Environment.NewLine));
                    throw new RAAPConflictException(error);
                }

                db.CriticalityCategories.Remove(CriticalityCategory);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.CriticalityCategories.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.CriticalityCategoryId, Name = a.Name }).ToList();
            }
        }
    }

    public static class CriticalityCategorieserviceExtensions
    {
        public static Contracts.CriticalityCategory.CriticalityCategory ToContract(this CriticalityCategory dataItem)
        {
            if (dataItem == null)
                return null;
            return new Contracts.CriticalityCategory.CriticalityCategory
            {
                CriticalityCategoryId = dataItem.CriticalityCategoryId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
            };
        }

        public static CriticalityCategory ToDataModel(this Contracts.CriticalityCategory.CreateCriticalityCategory create)
        {
            return new CriticalityCategory
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this CriticalityCategory dataItem, Contracts.CriticalityCategory.UpdateCriticalityCategory update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}