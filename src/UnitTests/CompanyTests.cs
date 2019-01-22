using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RAAP.Contracts.Company;
using RAAP.Database;
using RAAP.Web.API.Services;

namespace UnitTests
{
    [TestClass]
    public class CompanyTests
    {
        [TestInitialize]
        public void Init()
        {
            
        }

        [TestMethod]
        public void CreateCompany()
        {
            var userService = new UserService();
            var companyService = new CompanyService(userService);
            var company = companyService.Create(
                new CreateCompany()
                {
                    Name = "TestCompany"
                }
                );

            //Cleanup
            companyService.Delete(company.CompanyId);
            using (var db = new RAAPMasterEntities())
            {
                using (var sqlConnection = new SqlConnection(db.Database.Connection.ConnectionString))
                {
                    sqlConnection.Open();
                    var sqlCommand = new SqlCommand("drop database TestCompany", sqlConnection);
                    sqlCommand.ExecuteNonQuery();
                }
            }
        }
    }
}
