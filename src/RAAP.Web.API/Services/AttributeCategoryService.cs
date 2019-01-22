using System;
using System.Collections.Generic;
using System.Linq;
using RAAP.Contracts.Common;
using RAAP.Database;
using RAAP.Web.API.Helpers.Exceptions;
using RAAP.Web.API.Helpers.Linq;

namespace RAAP.Web.API.Services
{
    public class AttributeCategoryService : ServiceBase
    {
        public AttributeCategoryService() : base(null)
        {

        }

        public Contracts.AttributeCategory.AttributeCategory GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.AttributeCategories.FirstOrDefault(a => a.AttributeCategoryId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.AttributeCategory.AttributeCategory> Get(PagedQuery pagedQuery, string attributeTypeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var query = db.AttributeCategories.Where(a => a.AttributeTypeId == attributeTypeId);

                var totalItems = query.Count();

                return new PagedResult<Contracts.AttributeCategory.AttributeCategory>()
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items =
                        query
                            .OrderByDirection(LinqHelper.OrderByDataContract<AttributeCategory>(pagedQuery.OrderByKey),
                                pagedQuery.IsDescending)
                            .Skip(pagedQuery.ItemsToSkip)
                            .Take(pagedQuery.PageSize)
                            .Select(x => x.ToContract())
                            .ToArray()
                };

            }
        }

        public Contracts.AttributeCategory.AttributeCategory Create(Contracts.AttributeCategory.CreateAttributeCategory create)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var category = create.ToDataModel();
                db.AttributeCategories.Add(category);
                db.SaveChanges();

                return category.ToContract();
            }
        }

        public Contracts.AttributeCategory.AttributeCategory Update(Contracts.AttributeCategory.UpdateAttributeCategory update)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var category = db.AttributeCategories.FirstOrDefault(a => a.AttributeCategoryId == update.AttributeCategoryId);
                if (category == null)
                    throw new RAAPNotFoundException("Item not found.");
                category.ApplyUpdate(update);
                db.SaveChanges();

                return category.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var category = db.AttributeCategories.FirstOrDefault(a => a.AttributeCategoryId == id);
                if (category == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (category.Attributes.Any())
                {
                    var error = "Please remove this category from the following items:" + Environment.NewLine;
                    error = category.Attributes.Aggregate(error, (current, item) => current + (" - " + item.Name + " (" + item.AttributeTypeId + ")" + Environment.NewLine));
                    throw new RAAPConflictException(error);
                }

                db.AttributeCategories.Remove(category);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query, string attributeTypeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.AttributeCategories.Where(a => a.Name.Contains(query) && a.AttributeTypeId == attributeTypeId)
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.AttributeCategoryId, Name = a.Name }).ToList();
            }
        }
    }

    public static class AttributeCategoryServiceExtensions
    {
        public static Contracts.AttributeCategory.AttributeCategory ToContract(this AttributeCategory dataItem)
        {
            return new Contracts.AttributeCategory.AttributeCategory
            {
                AttributeCategoryId = dataItem.AttributeCategoryId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                AttributeTypeId = dataItem.AttributeTypeId
            };
        }

        public static AttributeCategory ToDataModel(this Contracts.AttributeCategory.CreateAttributeCategory create)
        {
            return new AttributeCategory
            {
                Name = create.Name,
                Description = create.Description,
                AttributeTypeId = create.AttributeTypeId,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this AttributeCategory dataItem, Contracts.AttributeCategory.UpdateAttributeCategory update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}