using System.Web.Http;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/help")]
    public class HelpController : BaseController
    {

        // GET (ID)
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = HelpService.Get(id);
            return Ok(result);
        }

        // GET (ID)
        [RaapAuthorize]
        [Route("GetBySlug")]
        public IHttpActionResult GetBySlug(string slug, string language)
        {
            var result = HelpService.GetBySlug(slug, language);
            return Ok(result);
        }

        //GET(isNameAvaiable)
        [HttpGet]
        [RaapAuthorize]
        [Route("isNameAvaiable")]
        public IHttpActionResult isNameAvaiable(string name, string objectType)
        {
            var result = HelpService.isNameAvaiable(name, objectType);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Post([FromBody]Contracts.Help.CreateHelpEntry create)
        {
            var result = HelpService.Create(create);
            return Ok(result);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]Contracts.Help.UpdateHelpEntry update)
        {
            var result = HelpService.Update(update);
            return Ok(result);
        }




    }
}