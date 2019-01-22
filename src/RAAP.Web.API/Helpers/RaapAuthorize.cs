using System.Web.Http;

namespace RAAP.Web.API.Helpers
{
    public class RaapAuthorize : AuthorizeAttribute
    {
        public RaapAuthorize(params string[] roles)
        {
            Roles = string.Join(",", roles);
        }
    }
}