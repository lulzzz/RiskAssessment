using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/control")]
    public class ControlController : BaseController
    {
        
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery, [FromUri] int[] excludeIds)
        {
            var result = ControlService.Get(pagedQuery, excludeIds);
            return Ok(result);
        }

        // GET: Control
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = ControlService.GetSingle(id);
            return Ok(result);
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(ControlService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Post([FromBody]Contracts.Control.CreateControl create)
        {
            var created = ControlService.Create(create);
            return Ok(created);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]Contracts.Control.UpdateControl update)
        {
            ControlService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Delete(int id)
        {
            ControlService.Delete(id);
            return Ok();
        }
    }
}