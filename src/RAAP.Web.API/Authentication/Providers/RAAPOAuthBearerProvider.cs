using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;

namespace RAAP.Web.API.Authentication.Providers
{
    public class RAAPOAuthBearerProvider : OAuthBearerAuthenticationProvider
    {
        readonly string _cookieName;

        public RAAPOAuthBearerProvider(string cookieCookieName)
        {
            _cookieName = cookieCookieName;
        }

        public override Task RequestToken(OAuthRequestTokenContext context)
        {
            var cookie = context.Request.Cookies[_cookieName];
            if (!string.IsNullOrEmpty(cookie))
                context.Token = cookie;

            return Task.FromResult<object>(null);
        }
    }
}