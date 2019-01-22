using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/threat")]
    public class ThreatController : BaseController
    {
        
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery, [FromUri]int[] excludeIds)
        {
            var result = ThreatService.Get(pagedQuery, excludeIds);
            return Ok(result);
        }

        // GET: FinancialThreat
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = ThreatService.GetSingle(id);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Post([FromBody]Contracts.Threat.CreateThreat create)
        {
            var created = ThreatService.Create(create);
            return Ok(created);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]Contracts.Threat.UpdateThreat update)
        {
            ThreatService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Delete(int id)
        {
            ThreatService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(ThreatService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }
    }
}