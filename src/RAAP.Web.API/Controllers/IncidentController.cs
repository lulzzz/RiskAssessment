using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/incident")]
    public class IncidentController : BaseController
    {

        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery)
        {
            var result = IncidentService.Get(pagedQuery);
            return Ok(result);
        }

        // GET: Incident
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = IncidentService.GetSingle(id);
            return Ok(result);
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(IncidentService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Post([FromBody]Contracts.Incident.CreateIncident create)
        {
            IncidentService.Create(create);
            return Ok();
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]Contracts.Incident.UpdateIncident update)
        {
            IncidentService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Delete(int id)
        {
            IncidentService.Delete(id);
            return Ok();
        }
    }
}