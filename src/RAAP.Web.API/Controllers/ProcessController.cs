using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/process")]
    public class ProcessController : BaseController
    {
        
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery)
        {
            var result = ProcessService.Get(pagedQuery);
            return Ok(result);
        }

        // GET: Process
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = ProcessService.GetSingle(id);
            return Ok(result);
        }

        // Search
        [HttpGet]
        [Authorize(Roles = Helpers.Roles.SystemAdministrator)]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(ProcessService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Post([FromBody]Contracts.Process.CreateProcess create)
        {
            var created = ProcessService.Create(create);
            return Ok(created);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]Contracts.Process.UpdateProcess update)
        {
            ProcessService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Delete(int id)
        {
            ProcessService.Delete(id);
            return Ok();
        }
    }
}