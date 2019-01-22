using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/threatcategory")]
    public class ThreatCategoryController : BaseController
    {
        
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery)
        {
            var result = ThreatCategoryService.Get(pagedQuery);
            return Ok(result);
        }

        // GET: SubCategory
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = ThreatCategoryService.GetSingle(id);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.ThreatCategory.CreateThreatCategory create)
        {
            ThreatCategoryService.Create(create);
            return Ok();
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.ThreatCategory.UpdateThreatCategory update)
        {
            ThreatCategoryService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            ThreatCategoryService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(ThreatCategoryService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }
    }
}