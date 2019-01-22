using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace RAAP.Web.API.Services
{
    public abstract class ServiceBase
    {
        protected UserService _userService;

        public ServiceBase(UserService userService)
        {
            _userService = userService;
        }

        protected string GetConnectionString()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["RAAPEntities"].ConnectionString;
            if (HttpContext.Current != null && HttpContext.Current.User != null)
            {
                var user = (ClaimsIdentity) HttpContext.Current.User.Identity;
                return user.IsAuthenticated
                    ? connectionString.Replace("initial catalog=RAAP",
                        "initial catalog = " + user.Claims.First(c => c.Type == ClaimTypes.System).Value)
                    : connectionString;
            }
            else
                return connectionString;
        }

        protected int CompanyId
        {
            get
            {
                var user = (ClaimsIdentity)HttpContext.Current.User.Identity;
                var companyClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.PrimaryGroupSid);
                return companyClaim != null ? Convert.ToInt32(companyClaim.Value) : -1;
            }
        }
    }
}
