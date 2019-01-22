using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Policy;
using RAAP.Contracts.Attribute;
using RAAP.Contracts.Common;
using RAAP.Database;
using RAAP.Web.API.Helpers.Exceptions;
using RAAP.Web.API.Helpers.Linq;
using Attribute = RAAP.Contracts.Attribute.Attribute;

namespace RAAP.Web.API.Services
{
    public class AttributeService : ServiceBase
    {
        public AttributeService() : base(null)
        {

        }

        public Contracts.Attribute.Attribute GetSingle(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Attributes.FirstOrDefault(a => a.AttributeId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.Attribute.Attribute> Get(PagedQuery pagedQuery, string attributeTypeId, int[] excludeIds = null)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var query = db.Attributes.Where(a => a.AttributeTypeId == attributeTypeId);
                if (excludeIds != null && excludeIds.Length > 0)
                    query = query.Where(t => !excludeIds.Contains(t.AttributeId));

                var totalItems = query.Count();

                return new PagedResult<Contracts.Attribute.Attribute>()
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items =
                        query
                            .OrderByDirection(LinqHelper.OrderByDataContract<Database.Attribute>(pagedQuery.OrderByKey),
                                pagedQuery.IsDescending)
                            .Skip(pagedQuery.ItemsToSkip)
                            .Take(pagedQuery.PageSize)
                            .Select(x => x.ToContract())
                            .ToArray()
                };

            }
        }


        public PagedResult<Contracts.Attribute.Attribute> GetChilds(PagedQuery pagedQuery, int parentAttributeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var query = db.AttributeLinks.Where(al => al.ParentAttributeId == parentAttributeId).Select(al => al.Attribute);

                var totalItems = query.Count();

                return new PagedResult<Contracts.Attribute.Attribute>()
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items =
                        query
                            .OrderByDirection(LinqHelper.OrderByDataContract<Database.Attribute>(pagedQuery.OrderByKey),
                                pagedQuery.IsDescending)
                            .Skip(pagedQuery.ItemsToSkip)
                            .Take(pagedQuery.PageSize)
                            .Select(x => x.ToContract())
                            .ToArray()
                };

            }
        }


        public static void AddNewChildAttributes(RAAPEntities db, Database.Attribute attribute, Attribute[] childAttributes)
        {
            if (childAttributes == null) return;

            var existingAttributeIds = attribute.AttributeLinks1.Select(al => al.AttributeId).ToArray();
            var missingAttributes = childAttributes.Where(a => !existingAttributeIds.Contains(a.AttributeId));
            foreach (var attributeToAdd in missingAttributes)
            {
                var existAsParentLink = db.AttributeLinks.Any(al => al.ParentAttributeId == attributeToAdd.AttributeId || (al.ParentAttributeId == attribute.AttributeId && al.AttributeId == attributeToAdd.AttributeId));
                if (existAsParentLink) return; // dont allow this to prevent recursive links

                db.AttributeLinks.Add(new AttributeLink
                {
                    ParentAttributeId = attribute.AttributeId,
                    AttributeId = attributeToAdd.AttributeId
                });

            }

        }
        public static void RemoveChildAttributes(RAAPEntities db, Database.Attribute attribute, Attribute[] childAttributes)
        {
            if (childAttributes == null)
                childAttributes = new Attribute[0];

            var validAttributeIds = childAttributes.Select(al => al.AttributeId).ToArray();
            var missingAttributeLinks = attribute.AttributeLinks1.Where(al => !validAttributeIds.Contains(al.AttributeId)).ToArray();

            db.AttributeLinks.RemoveRange(missingAttributeLinks);



        }

        public void AddLink(int parentAttributeId, int attributeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var exists = db.AttributeLinks.Any(al => al.ParentAttributeId == parentAttributeId && al.AttributeId == attributeId);
                if (exists) return;

                db.AttributeLinks.Add(new AttributeLink { AttributeId = attributeId, ParentAttributeId = parentAttributeId });
                db.SaveChanges();
            }
        }

        public void RemoveLink(int parentAttributeId, int attributeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var link = db.AttributeLinks.FirstOrDefault(al => al.ParentAttributeId == parentAttributeId && al.AttributeId == attributeId);
                if (link == null) return;

                db.AttributeLinks.Remove(link);
                db.SaveChanges();
            }
        }

        public Contracts.Attribute.Attribute Create(CreateAttribute create)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = create.ToDataModel();
                AddNewChildAttributes(db, item, create.ChildAttributes.ToArray());
                db.Attributes.Add(item);
                db.SaveChanges();

                return new Attribute();
            }
        }

        public Contracts.Attribute.Attribute Update(UpdateAttribute update)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Attributes.FirstOrDefault(a => a.AttributeId == update.AttributeId);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");
                item.ApplyUpdate(update);
                RemoveChildAttributes(db, item, update.ChildAttributes.ToArray());
                AddNewChildAttributes(db, item, update.ChildAttributes.ToArray());
                db.SaveChanges();

                return new Attribute();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.Attributes.FirstOrDefault(a => a.AttributeId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (item.AttributeLinks.Any())
                {
                    var errorMessage = "Please remove the usage of this item on the following causes:" + Environment.NewLine;
                    errorMessage = item.AttributeLinks.Aggregate(errorMessage, (current, subItem) => current + (" - " + subItem.Attribute1.Name + Environment.NewLine));
                    throw new RAAPConflictException(errorMessage);
                }

                if (item.Threats.Any())
                {
                    var errorMessage = "Please remove the usage of this item on the following threats:" + Environment.NewLine;
                    errorMessage = item.Threats.Aggregate(errorMessage, (current, subItem) => current + (" - " + subItem.Name + Environment.NewLine));
                    throw new RAAPConflictException(errorMessage);
                }


                db.AttributeLinks.RemoveRange(item.AttributeLinks1.ToList());
                db.Attributes.Remove(item);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query, string attributeTypeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                return
                    db.Attributes.Where(a => a.Name.Contains(query) && a.AttributeTypeId == attributeTypeId)
                        .OrderBy(a => a.Name)
                        .Take(20)
                        .Select(a => new SimpleSearchResult() { Id = a.AttributeId, Name = a.Name }).ToList();
            }
        }
    }

    public static class AttributeServiceExtensions
    {
        public static Contracts.Attribute.Attribute ToContract(this Database.Attribute dataItem, bool isFirstLevel = true)
        {

            return new Contracts.Attribute.Attribute
            {
                AttributeCategoryId = dataItem.AttributeCategoryId,
                AttributeCategoryName = dataItem.AttributeCategory != null ? dataItem.AttributeCategory.Name : "",
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                AttributeTypeId = dataItem.AttributeTypeId,
                AttributeId = dataItem.AttributeId,
                Comment = dataItem.Comment,
                Source = dataItem.Source,
                ChildAttributes = isFirstLevel ? dataItem.AttributeLinks1.Select(al => al.Attribute.ToContract(false)).ToList() : new List<Attribute>(),
                Timeframe = new Timeframe
                {
                    Months = dataItem.MonthTimeframe != null ? (MonthTimeframe)dataItem.MonthTimeframe : MonthTimeframe.None,
                    Days = dataItem.DayTimeframe != null ? (DayTimeframe)dataItem.DayTimeframe : DayTimeframe.None,
                    Hours = dataItem.HourTimeframe != null ? (HourTimeframe)dataItem.HourTimeframe : HourTimeframe.None
                }
            };
        }

        public static Contracts.Attribute.Attribute ToContract(this Database.AssetThreat_Attributes dataItem, bool isFirstLevel = true)
        {
            return new Contracts.Attribute.Attribute
            {
                AttributeCategoryId = dataItem.AttributeCategoryId,
                AttributeCategoryName = dataItem.AttributeCategory != null ? dataItem.AttributeCategory.Name : "",
                Name = dataItem.Name,
                Description = dataItem.Description,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                AttributeTypeId = dataItem.AttributeTypeId,
                AttributeId = dataItem.AttributeId,
                Comment = dataItem.Comment,
                Source = dataItem.Source,
                ChildAttributes = isFirstLevel ? dataItem.Attribute.AttributeLinks1.Select(al => al.Attribute.ToContract(false)).ToList() : new List<Attribute>(),
                Timeframe = new Timeframe
                {
                    Months = dataItem.MonthTimeframe != null ? (MonthTimeframe)dataItem.MonthTimeframe : MonthTimeframe.None,
                    Days = dataItem.DayTimeframe != null ? (DayTimeframe)dataItem.DayTimeframe : DayTimeframe.None,
                    Hours = dataItem.HourTimeframe != null ? (HourTimeframe)dataItem.HourTimeframe : HourTimeframe.None
                }
            };
        }

        public static Database.Attribute ToDataModel(this CreateAttribute create)
        {
            return new Database.Attribute
            {
                Name = create.Name,
                Description = create.Description,
                AttributeTypeId = create.AttributeTypeId,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                AttributeCategoryId = create.AttributeCategoryId,
                Comment = create.Comment,
                MonthTimeframe = (int?)create.Timeframe.Months,
                DayTimeframe = (int?)create.Timeframe.Days,
                HourTimeframe = (int?)create.Timeframe.Hours,
                Source = create.Source
            };
        }



        public static void ApplyUpdate(this Database.Attribute dataItem, Contracts.Attribute.UpdateAttribute update)
        {
            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.Comment = update.Comment;
            dataItem.AttributeCategoryId = update.AttributeCategoryId;
            dataItem.MonthTimeframe = (int?)update.Timeframe.Months;
            dataItem.DayTimeframe = (int?)update.Timeframe.Days;
            dataItem.HourTimeframe = (int?)update.Timeframe.Hours;
            dataItem.Source = update.Source;
        }

        public static void ApplyUpdate(this Database.AssetThreat_Attributes dataItem, Contracts.Attribute.Attribute update)
        {

            dataItem.Name = update.Name;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.Comment = update.Comment;
            dataItem.AttributeCategoryId = update.AttributeCategoryId;
            dataItem.MonthTimeframe = (int?)update.Timeframe.Months;
            dataItem.DayTimeframe = (int?)update.Timeframe.Days;
            dataItem.HourTimeframe = (int?)update.Timeframe.Hours;
            dataItem.Source = update.Source;
        }


    }
}