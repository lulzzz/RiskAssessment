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
    public class ProcessCategoryService : ServiceBase
    {
        public ProcessCategoryService() : base(null)
        {

        }
        public Contracts.ProcessCategory.ProcessCategory GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.ProcessCategories.FirstOrDefault(a => a.ProcessCategoryId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.ProcessCategory.ProcessCategory> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.ProcessCategories.Count();
                try
                {
                    return new PagedResult<Contracts.ProcessCategory.ProcessCategory>()
                    {
                        CurrentPage = pagedQuery.Page,
                        TotalItems = totalItems,
                        TotalPages = pagedQuery.CalculatePages(totalItems),
                        Items =
                            db.ProcessCategories.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<ProcessCategory>(pagedQuery.OrderByKey),
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

        public Contracts.ProcessCategory.ProcessCategory Create(Contracts.ProcessCategory.CreateProcessCategory createProcessCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.ProcessCategories.Any(a => a.Name == createProcessCategory.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var ProcessCategory = createProcessCategory.ToDataModel();
                db.ProcessCategories.Add(ProcessCategory);
                db.SaveChanges();

                return ProcessCategory.ToContract();
            }
        }

        public Contracts.ProcessCategory.ProcessCategory Update(Contracts.ProcessCategory.UpdateProcessCategory updateProcessCategory)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var ProcessCategory = db.ProcessCategories.FirstOrDefault(a => a.ProcessCategoryId == updateProcessCategory.ProcessCategoryId);
                if (ProcessCategory == null)
                    throw new RAAPNotFoundException("Item not found.");
                ProcessCategory.ApplyUpdate(updateProcessCategory);
                db.SaveChanges();
                return ProcessCategory.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var processCategory = db.ProcessCategories.FirstOrDefault(a => a.ProcessCategoryId == id);
                if (processCategory == null)
                    throw new RAAPNotFoundException("Item not found.");


                if (processCategory.Processes.Any())
                {
                    var error = "Please remove this category from the following business processes: " + Environment.NewLine;
                    error = processCategory.Processes.Aggregate(error, (current, process) => current + (" - " + process.Name + Environment.NewLine));
                    throw new RAAPConflictException(error);
                }

                db.ProcessCategories.Remove(processCategory);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.ProcessCategories.Where(a => a.Name.Contains(query))
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.ProcessCategoryId, Name = a.Name }).ToList();
            }
        }
    }

    public static class ProcessCategorieserviceExtensions
    {
        public static Contracts.ProcessCategory.ProcessCategory ToContract(this ProcessCategory dataItem)
        {
            return new Contracts.ProcessCategory.ProcessCategory
            {
                ProcessCategoryId = dataItem.ProcessCategoryId,
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
            };
        }

        public static ProcessCategory ToDataModel(this Contracts.ProcessCategory.CreateProcessCategory create)
        {
            return new ProcessCategory
            {
                Name = create.Name,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };
        }

        public static void ApplyUpdate(this ProcessCategory dataItem, Contracts.ProcessCategory.UpdateProcessCategory update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
        }

    }
}