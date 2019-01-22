using System;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;
using RAAP.Web.API.Authentication.Providers;
using System.Net;
using RAAP.Web.API.Services;

[assembly: OwinStartup(typeof(RAAP.Web.API.Startup))]
namespace RAAP.Web.API
{
    public class Startup
    {
        public static OAuthBearerAuthenticationOptions OAuthBearerOptions { get; private set; }
        public static OAuthAuthorizationServerOptions OAuthServerOptions { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();


            //GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings =
            //    new JsonSerializerSettings
            //    {
            //        DateFormatHandling = DateFormatHandling.IsoDateFormat,
            //        DateTimeZoneHandling = DateTimeZoneHandling.Utc,
            //        Culture = CultureInfo.GetCultureInfo("en-US")
            //    };

            ConfigureOAuth(app);
            Register(config);

            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);

            var processService = new ProcessService(new UserService());
            processService.Get(new Contracts.Common.PagedQuery());
        }

        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Filters.Add(new Helpers.ExceptionHandlingAttribute());
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            // enable external cookies
            app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);

            OAuthBearerOptions = new OAuthBearerAuthenticationOptions
            {
                Provider = new RAAPOAuthBearerProvider("raap")
            };

            OAuthServerOptions = new OAuthAuthorizationServerOptions
            {

                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(1),
                Provider = new RAAPAuthProvider(), 
                ApplicationCanDisplayErrors = true,

            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(OAuthBearerOptions);

        }
    }

}