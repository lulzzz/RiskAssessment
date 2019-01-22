using System;
using System.Collections.Generic;
using System.Linq;
using RAAP.Database;
using RAAP.Web.API.Helpers.Exceptions;

namespace RAAP.Web.API.Services
{
    public class HelpService
    {

        public Contracts.Help.HelpEntry Get(int helpId)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dbItem = db.Helps.FirstOrDefault(h => h.HelpId == helpId);
                if (dbItem == null)
                    return null;

                return dbItem.ToContract();
            }
        }

        public Contracts.Help.HelpEntry GetBySlug(string slug, string language)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dbItem = db.Helps.FirstOrDefault(h => h.Slug == slug && h.Language == language);
                if (dbItem == null)
                    return new Contracts.Help.HelpEntry { Slug = slug, Language = language };

                return dbItem.ToContract();
            }
        }

        public Contracts.Help.HelpEntry Create(Contracts.Help.CreateHelpEntry create)
        {
            using (var db = new RAAPMasterEntities())
            {
                if (db.Helps.Any(a => a.Slug == create.Slug && a.Language == create.Language))
                    throw new RAAPConflictException("Slug & language combination is already in use!");

                var help = create.ToDataModel();
                db.Helps.Add(help);
                db.SaveChanges();

                return db.Helps.FirstOrDefault(u => u.HelpId == help.HelpId).ToContract();
            }
        }

        public Contracts.Help.HelpEntry Update(Contracts.Help.UpdateHelpEntry update)
        {
            using (var db = new RAAPMasterEntities())
            {
                var help = db.Helps.FirstOrDefault(u => u.HelpId == update.Id);
                if (help == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (db.Helps.Any(a => a.Slug == update.Slug && a.Language == update.Language && a.HelpId != update.Id))
                    throw new RAAPConflictException("Slug & language combination is already in use!");

                help.ApplyUpdate(update);
                db.SaveChanges();
                return help.ToContract();
            }
        }

        public bool getAvaliableName(string name, string objectType)
        {
            List<string> list = new List<string>();
            using (RAAPEntities db = new RAAPEntities())
            {
                if (objectType == "threat")
                    list = db.Threats.Select(x => x.Name).ToList();
                else if (objectType == "asset")
                    list = db.Assets.Select(x => x.Name).ToList();
                else if (objectType == "process")
                    list = db.Processes.Select(x => x.Name).ToList();
                else if (objectType == "control")
                    list = db.Controls.Select(x => x.Name).ToList();

                for (var i = 0; i < list.Count(); i++)
                {
                    if (name == list[i])
                        return true;
                }
                return false;
            }
        }

        public string isNameAvaiable(string name, string objectType)
        {
            var tempName = "";
            var secNema = name;

            while (this.getAvaliableName(secNema, objectType))
            {
                tempName = secNema;
                secNema = tempName + " - Copy";
            }
            return secNema;
        }
    }

    public static class HelpExtensions
    {
        public static Contracts.Help.HelpEntry ToContract(this Help help)
        {
            return new Contracts.Help.HelpEntry
            {
                Language = help.Language,
                Id = help.HelpId,
                Slug = help.Slug,
                Title = help.Title,
                Description = help.Description,
                CreatedOn = help.CreatedOn,
                UpdatedOn = help.UpdatedOn
            };
        }

        public static Help ToDataModel(this Contracts.Help.CreateHelpEntry create)
        {
            var dataModel = new Help
            {
                Language = create.Language,
                Slug = create.Slug,
                Title = create.Title,
                Description = create.Description,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
            };

            return dataModel;
        }

        public static void ApplyUpdate(this Help dataItem, Contracts.Help.UpdateHelpEntry update)
        {
            dataItem.Language = update.Language;
            dataItem.Slug = update.Slug;
            dataItem.Title = update.Title;
            dataItem.Description = update.Description;
            dataItem.UpdatedOn = DateTime.Now;

        }
    }
}