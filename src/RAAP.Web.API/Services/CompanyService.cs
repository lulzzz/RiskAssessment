using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.Ajax.Utilities;
using RAAP.Contracts.Common;
using RAAP.Contracts.User;
using RAAP.Database;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Exceptions;
using RAAP.Web.API.Helpers.Linq;

namespace RAAP.Web.API.Services
{
    public class CompanyService : ServiceBase
    {

        public CompanyService(UserService userService) : base(userService)
        {

        }
        public Contracts.Company.Company GetSingle(int id)
        {
            using (var db = new RAAPMasterEntities())
            {
                var item = db.Companies.FirstOrDefault(c => c.CompanyId == id);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return item.ToContract();
            }
        }

        public PagedResult<Contracts.Company.Company> Get(PagedQuery pagedQuery)
        {
            using (var db = new RAAPMasterEntities())
            {
                var totalItems = db.Companies.Count();

                return new PagedResult<Contracts.Company.Company>
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items = db.Companies.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<Company>(pagedQuery.OrderByKey), pagedQuery.IsDescending)
                                .Skip(pagedQuery.ItemsToSkip)
                                .Take(pagedQuery.PageSize)
                                .Select(x => x.ToContract())
                                .ToArray()
                };

            }
        }

        private const string SqlCreateCompany =
            @"backup database RAAP to disk='C:\SQL\Backup\RAAP.bak' with format; restore database {0} from disk='c:\sql\backup\raap.bak' with recovery, move 'RAAP' to 'c:\sql\data\{0}.mdf', move 'RAAP_log' to 'c:\sql\data\{0}.ldf';";

        public Contracts.Company.Company Create(Contracts.Company.CreateCompany create)
        {
            using (var db = new RAAPMasterEntities())
            {
                if (db.Companies.Any(a => a.Name == create.Name))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var company = create.ToDataModel();

                using (var sqlConnection = new SqlConnection(db.Database.Connection.ConnectionString))
                {
                    sqlConnection.Open();

                    var sqlCommand = new SqlCommand(string.Format(SqlCreateCompany, company.DatabaseName), sqlConnection);
                    sqlCommand.ExecuteNonQuery();
                }

                db.Companies.Add(company);
                db.SaveChanges();

                return company.ToContract();
            }
        }

        public Contracts.Company.Company Update(Contracts.Company.UpdateCompany update)
        {
            using (var db = new RAAPMasterEntities())
            {
                var company = db.Companies.FirstOrDefault(c => c.CompanyId == update.CompanyId);
                if (company == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (db.Companies.Any(a => a.Name == update.Name && a.CompanyId != update.CompanyId))
                    throw new RAAPConflictException("Name is already in use, please try another name.");

                company.ApplyUpdate(update);
                db.SaveChanges();

                return company.ToContract();
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPMasterEntities())
            {
                var company = db.Companies.FirstOrDefault(a => a.CompanyId == id);
                if (company == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (company.Users.Any())
                    throw new RAAPConflictException("You must remove connected users before you delete this company");

                db.Companies.Remove(company);
                db.SaveChanges();
            }
        }

        public List<SimpleSearchResult> Search(string query)
        {
            using (var db = new RAAPMasterEntities())
            {
                return db.Companies.Where(a => a.Name.Contains(query))
                         .OrderBy(a => a.Name)
                         .Take(20)
                         .Select(a => new SimpleSearchResult { Id = a.CompanyId, Name = a.Name }).ToList();
            }
        }

        public void UpdateProfileImage(int companyId, byte[] image, string contentType)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dbCompany = db.Companies.FirstOrDefault(u => u.CompanyId == companyId);
                if (dbCompany == null)
                    throw new RAAPNotFoundException("Item not found.");

                dbCompany.ProfileImage = image;
                dbCompany.ProfileImageFiletype = contentType;

                db.SaveChanges();
            }
        }

        public ProfileImage GetProfileImage(int companyId)
        {
            using (var db = new RAAPMasterEntities())
            {
                var item = db.Companies.FirstOrDefault(u => u.CompanyId == companyId);
                if (item == null)
                    throw new RAAPNotFoundException("Item not found.");

                return new ProfileImage
                {
                    ContentType = item.ProfileImageFiletype,
                    Image = item.ProfileImage
                };
            }
        }

        public Contracts.Risk.RiskType CreateRiskType(Contracts.Risk.RiskType riskType)
        {
            if (string.IsNullOrWhiteSpace(riskType.Name))
                throw new RAAPConflictException("Invalid/missing name");
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                if (db.RiskTypes.Any(r => r.Name == riskType.Name.Trim()))
                    throw new RAAPConflictException("Name is already in use, please try another name.");
                var dbRiskType = riskType.ToDataModel();
                db.RiskTypes.Add(dbRiskType);
                foreach (var asset in db.Assets)
                {
                    var threatRisk = new ThreatRisk()
                    {
                        RiskType = dbRiskType,
                    };
                    RiskCalculator.ResetRisk(threatRisk);
                    asset.ThreatRisks.Add(threatRisk);
                }
                foreach (var threat in db.Threats)
                {
                    var threatRisk = new ThreatRisk()
                    {
                        RiskType = dbRiskType,
                    };
                    RiskCalculator.ResetRisk(threatRisk);
                    threat.ThreatRisks.Add(threatRisk);
                }

                foreach (var assetThreat in db.Asset_Threat)
                {
                    var threatRisk = new ThreatRisk()
                    {
                        RiskType = dbRiskType,
                    };
                    RiskCalculator.ResetRisk(threatRisk);
                    assetThreat.ThreatRisks.Add(threatRisk);
                }

                foreach (var control in db.Controls)
                {
                    var controlRisk = new ControlRisk()
                    {
                        RiskType = dbRiskType,
                    };
                    control.ControlRisks.Add(controlRisk);
                }

                foreach (var assetThreatControl in db.AssetThreat_Control)
                {
                    var controlRisk = new ControlRisk()
                    {
                        RiskType = dbRiskType,
                    };
                    assetThreatControl.ControlRisks.Add(controlRisk);
                }

                db.SaveChanges();
                return dbRiskType.ToContract();
            }
        }

        public Contracts.Risk.RiskType GetRiskType(int id)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var item = db.RiskTypes.FirstOrDefault(r => r.RiskTypeId == id);
                return item != null ? item.ToContract() : null;
            }
        }

        public Contracts.Common.PagedResult<Contracts.Risk.RiskType> GetRiskTypes(PagedQuery pagedQuery)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var totalItems = db.RiskTypes.Count();

                return new PagedResult<Contracts.Risk.RiskType>
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items = db.RiskTypes.AsQueryable()
                                .OrderByDirection(LinqHelper.OrderByDataContract<RiskType>(pagedQuery.OrderByKey), pagedQuery.IsDescending)
                                .Skip(pagedQuery.ItemsToSkip)
                                .Take(pagedQuery.PageSize)
                                .Select(x => x.ToContract())
                                .ToArray()
                };
            }
        }

        public void UpdateRiskType(Contracts.Risk.RiskType riskType)
        {
            if (string.IsNullOrWhiteSpace(riskType.Name))
                throw new RAAPConflictException("Invalid/missing name");
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var dbRiskType = db.RiskTypes.FirstOrDefault(r => r.RiskTypeId == riskType.RiskTypeId);
                if (dbRiskType == null)
                    throw new RAAPNotFoundException("Item not found.");
                dbRiskType.Name = riskType.Name;
                dbRiskType.Description = riskType.Description;
                db.SaveChanges();
            }
        }

        public void DeleteRiskType(int riskTypeId)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var dbRiskType = db.RiskTypes.FirstOrDefault(r => r.RiskTypeId == riskTypeId);
                if (dbRiskType == null)
                    throw new RAAPNotFoundException("Item not found.");
                db.ControlRisks.RemoveRange(dbRiskType.ControlRisks.ToList());
                db.ThreatRisks.RemoveRange(dbRiskType.ThreatRisks.ToList());
                db.RiskTypes.Remove(dbRiskType);
                db.SaveChanges();
            }
        }
    }
    public static class CompanyServiceExtensions
    {
        public static Contracts.Risk.RiskType ToContract(this Database.RiskType riskType)
        {
            return new Contracts.Risk.RiskType()
            {
                Name = riskType.Name,
                RiskTypeId = riskType.RiskTypeId,
                Description = riskType.Description
            };
        }

        public static RiskType ToDataModel(this Contracts.Risk.RiskType riskType)
        {
            return new RiskType()
            {
                Name = riskType.Name,
                Description = riskType.Description
            };
        }

        public static Contracts.Company.Company ToContract(this Company dataItem)
        {
            return new Contracts.Company.Company
            {
                CompanyId = dataItem.CompanyId,
                Name = dataItem.Name,
                CreatedOn = dataItem.CreatedOn,
                UpdatedOn = dataItem.UpdatedOn,
                Address1 = dataItem.Address1,
                Address2 = dataItem.Address2,
                Address3 = dataItem.Address3,
                Address4 = dataItem.Address4,
                Phone = dataItem.Phone,
                Email = dataItem.Email,
                OrganizationNumber = dataItem.OrganizationNumber,
                Homepage = dataItem.Homepage,

            };
        }

        public static Company ToDataModel(this Contracts.Company.CreateCompany create)
        {
            return new Company
            {
                Name = create.Name,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                DatabaseName = create.Name.Trim().Replace(" ", ""),
                Address1 = create.Address1,
                Address2 = create.Address2,
                Address3 = create.Address3,
                Address4 = create.Address4,
                Phone = create.Phone,
                Email = create.Email,
                OrganizationNumber = create.OrganizationNumber,
                Homepage = create.Homepage,
            };
        }

        public static void ApplyUpdate(this Company dataItem, Contracts.Company.UpdateCompany update)
        {
            dataItem.Name = update.Name;
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.Address1 = update.Address1;
            dataItem.Address2 = update.Address2;
            dataItem.Address3 = update.Address3;
            dataItem.Address4 = update.Address4;
            dataItem.Phone = update.Phone;
            dataItem.Email = update.Email;
            dataItem.OrganizationNumber = update.OrganizationNumber;
            dataItem.Homepage = update.Homepage;
        }

    }
}