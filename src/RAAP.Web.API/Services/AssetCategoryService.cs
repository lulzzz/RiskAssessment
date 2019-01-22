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
    public class AssetSubCategoryService : ServiceBase
    {
        public AssetSubCategoryService() : base(null)
        {

        }

        public Contracts.AssetSubCategory.AssetSubCategory GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.AssetSubCategories.FirstOrDefault(a => a.AssetSubCategoryId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found."); ;

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.AssetSubCategory.AssetSubCategory> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.AssetSubCategories.Count();

                return new PagedResult<Contracts.AssetSubCategory.AssetSubCategory>()
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items =
                        db.AssetSubCategories.AsQueryable()
                            .OrderByDirection(LinqHelper.OrderByDataContract<AssetSubCategory>(pagedQuery.OrderByKey),
                                pagedQuery.IsDescending)
                            .Skip(pagedQuery.ItemsToSkip)
                            .Take(pagedQuery.PageSize)
                            .Select(x => x.ToContract())
                            .ToArray()
                };

            }
        }

        public Contracts.AssetSubCategory.AssetSubCategory Create(Contracts.AssetSubCategory.CreateAssetSubCategory createAssetSubCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.AssetSubCategories.Any(a => a.Name == createAssetSubCategory.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var AssetSubCategory = createAssetSubCategory.ToDataModel();
                db.AssetSubCategories.Add(AssetSubCategory);
                db.SaveChanges();

                return AssetSubCategory.ToContract();
            }
        }

        public Contracts.AssetSubCategory.AssetSubCategory Update(Contracts.AssetSubCategory.UpdateAssetSubCategory updateAssetSubCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var AssetSubCategory = db.AssetSubCategories.FirstOrDefault(a => a.AssetSubCategoryId == updateAssetSubCategory.AssetSubCategoryId);
                if (AssetSubCategory == null)
                    throw new RAAPNotFoundException("Item not found.");
                AssetSubCategory.ApplyUpdate(updateAssetSubCategory);
                db.SaveChanges();
                return AssetSubCategory.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var AssetSubCategory = db.AssetSubCategories.FirstOrDefault(a => a.AssetSubCategoryId == id);
                if (AssetSubCategory == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (AssetSubCategory.Assets.Any())
                {
                    var error = "Please remove this category from the following assets: " + Environment.NewLine;
                    error = AssetSubCategory.Assets.Aggregate(error, (current, item) => current + (" - " + item.Name + Environment.NewLine));
                    throw new RAAPConflictException(error);
                }

                db.AssetSubCategories.Remove(AssetSubCategory);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.AssetSubCategories.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.AssetSubCategoryId, Name = a.Name }).ToList();
            }
        }
    }

    public static class AssetSubCategorieserviceExtensions
    {
        public static Contracts.AssetSubCategory.AssetSubCategory ToContract(this AssetSubCategory dataItem)
        {
            return new Contracts.AssetSubCategory.AssetSubCategory
            {
                AssetSubCategoryId = dataItem.AssetSubCategoryId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
            };
        }

        public static AssetSubCategory ToDataModel(this Contracts.AssetSubCategory.CreateAssetSubCategory create)
        {
            return new AssetSubCategory
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this AssetSubCategory dataItem, Contracts.AssetSubCategory.UpdateAssetSubCategory update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}