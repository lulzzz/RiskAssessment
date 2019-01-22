using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using RAAP.Web.API.Services;
using System.Web.Http;
using System;
using System.IO;
using System.Web.Mvc;
using RAAP.Web.API.Helpers;

namespace RAAP.Web.API.Controllers
{
    public class BaseController : ApiController
    {
        public static byte[] ToByteArray(Stream input)
        {
            var buffer = new byte[16 * 1024];
            using (var ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        public BaseController()
        {
            UserService = new UserService();
            CompanyService = new CompanyService(UserService);
            ProcessService = new ProcessService(UserService);
            HelpService = new HelpService();
            ControlService = new ControlService(UserService);
            SoaService = new SoaService(UserService);
            ThreatService = new ThreatService(UserService);
            AssetService = new AssetService(UserService);
            VulnerabilityService = new VulnerabilityService(UserService);
            UploadService = new UploadService(UserService);
            ReportService = new ReportService(UserService);
        }

        protected readonly ControlService ControlService;
        protected readonly UserService UserService;
        protected readonly CompanyService CompanyService;
        protected readonly ProcessService ProcessService;
        protected readonly HelpService HelpService;
        protected readonly SoaService SoaService;
        protected readonly ThreatService ThreatService;
        protected readonly AssetService AssetService;
        protected readonly VulnerabilityService VulnerabilityService;
        protected readonly UploadService UploadService;
        protected readonly ProcessCategoryService ProcessCategoryService = new ProcessCategoryService();
        protected readonly AssetSubCategoryService AssetSubCategoryService = new AssetSubCategoryService();
        protected readonly ControlCategoryService ControlCategoryService = new ControlCategoryService();
        protected readonly CriticalityCategoryService CriticalityCategoryService = new CriticalityCategoryService();
        protected readonly ThreatCategoryService ThreatCategoryService = new ThreatCategoryService();
        protected readonly IncidentService IncidentService = new IncidentService();
        protected readonly AttributeCategoryService AttributeCategoryService = new AttributeCategoryService();
        protected readonly AttributeService AttributeService = new AttributeService();
        protected readonly ReportService ReportService;
        protected IAuthenticationManager Authentication => Request.GetOwinContext().Authentication;

        protected int UserId => int.Parse(Authentication.User.Identity.GetUserId());

        private bool? _isSystemAdministrator;
        protected bool IsSystemAdministrator => _isSystemAdministrator.HasValue ? _isSystemAdministrator.Value : (_isSystemAdministrator = CurrentUser.Roles.Any(r => r == Roles.SystemAdministrator)).Value;

        private Contracts.User.User _currentUser;
        public Contracts.User.User CurrentUser => _currentUser ?? (_currentUser = UserService.GetUserByUserId(UserId));

        protected int CompanyId
        {
            get
            {
                var user = (ClaimsIdentity)Authentication.User.Identity;
                var companyClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.PrimaryGroupSid);
                return companyClaim != null ? Convert.ToInt32(companyClaim.Value) : -1;
            }
        }
    }
}
