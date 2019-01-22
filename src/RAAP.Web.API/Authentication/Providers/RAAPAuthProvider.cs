using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using RAAP.Web.API.Services;

namespace RAAP.Web.API.Authentication.Providers
{
    public class RAAPAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task MatchEndpoint(OAuthMatchEndpointContext context)
        {
            if (context.OwinContext.Request.Method == "OPTIONS" && context.IsTokenEndpoint)
            {
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "POST, GET, OPTIONS, PUT, DELETE" });
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "accept, authorization, content-type, access-control-allow-origin" });
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

                context.OwinContext.Response.StatusCode = 200;
                context.RequestCompleted();

                return Task.FromResult<object>(null);
            }

            return base.MatchEndpoint(context);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "POST, GET, OPTIONS, PUT, DELETE" });
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "accept, authorization, content-type, access-control-allow-origin" });
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
           
            context.Validated();

            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            if (!context.OwinContext.Response.Headers.ContainsKey("Access-Control-Allow-Origin"))
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var user = new UserService().GetIdentityUserByLogin(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "Invalid username and/or password!");
                return;
            }

            var identity = ToClaimsIdentity(context.Options.AuthenticationType, user);
      
            var props = new AuthenticationProperties(new Dictionary<string, string> {{ "userName", user.UserName}});
            var ticket = new AuthenticationTicket(identity, props);

            context.Validated(ticket);
        }

        public static ClaimsIdentity ToClaimsIdentity(string authenticationType, IdentityUser user)
        {
            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.Role, "user"));
            claims.Add(new Claim(ClaimTypes.WindowsUserClaim, user.UserName));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));

            claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.RoleId)));
            claims.AddRange(user.Claims.Select(identityUserClaim => new Claim(identityUserClaim.ClaimType, identityUserClaim.ClaimValue)));

            return new ClaimsIdentity(claims, authenticationType);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            return Task.FromResult<object>(null);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}