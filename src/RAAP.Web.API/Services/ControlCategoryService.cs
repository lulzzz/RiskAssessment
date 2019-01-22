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
    public class ControlCategoryService : ServiceBase
    {
        public ControlCategoryService() : base(null)
        {

        }
        public Contracts.ControlCategory.ControlCategory GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.ControlCategories.FirstOrDefault(a => a.ControlCategoryId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.ControlCategory.ControlCategory> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.ControlCategories.Count();
                try
                {
                    return new PagedResult<Contracts.ControlCategory.ControlCategory>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            db.ControlCategories.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<ControlCategory>(pagedQuery.OrderByKey),
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

        public Contracts.ControlCategory.ControlCategory Create(Contracts.ControlCategory.CreateControlCategory createControlCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.ControlCategories.Any(a => a.Name == createControlCategory.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var ControlCategory = createControlCategory.ToDataModel();
                db.ControlCategories.Add(ControlCategory);
                db.SaveChanges();

                return ControlCategory.ToContract();
            }
        }

        public Contracts.ControlCategory.ControlCategory Update(Contracts.ControlCategory.UpdateControlCategory updateControlCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var ControlCategory = db.ControlCategories.FirstOrDefault(a => a.ControlCategoryId == updateControlCategory.ControlCategoryId);
                if (ControlCategory == null)
                    throw new RAAPNotFoundException("Item not found.");
                ControlCategory.ApplyUpdate(updateControlCategory);
                db.SaveChanges();
                return ControlCategory.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var ControlCategory = db.ControlCategories.FirstOrDefault(a => a.ControlCategoryId == id);
                if (ControlCategory == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (ControlCategory.Controls.Any())
                {
                    var error = "Please remove this category from the following controls: " + Environment.NewLine;
                    error = ControlCategory.Controls.Aggregate(error, (current, item) => current + (" - " + item.Name + Environment.NewLine));
                    throw new RAAPConflictException(error);
                }

                db.ControlCategories.Remove(ControlCategory);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.ControlCategories.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.ControlCategoryId, Name = a.Name }).ToList();
            }
        }
    }

    public static class ControlCategorieserviceExtensions
    {
        public static Contracts.ControlCategory.ControlCategory ToContract(this ControlCategory dataItem)
        {
            return new Contracts.ControlCategory.ControlCategory
            {
                ControlCategoryId = dataItem.ControlCategoryId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
            };
        }

        public static ControlCategory ToDataModel(this Contracts.ControlCategory.CreateControlCategory create)
        {
            return new ControlCategory
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this ControlCategory dataItem, Contracts.ControlCategory.UpdateControlCategory update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}