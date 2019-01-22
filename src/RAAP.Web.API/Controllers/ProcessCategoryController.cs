using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/processcategory")]
    public class ProcessCategoryController : BaseController
    {
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery)
        {
            var result = ProcessCategoryService.Get(pagedQuery);
            return Ok(result);
        }

        // GET: ProcessCategory
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = ProcessCategoryService.GetSingle(id);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.ProcessCategory.CreateProcessCategory create)
        {
            ProcessCategoryService.Create(create);
            return Ok();
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.ProcessCategory.UpdateProcessCategory update)
        {
            ProcessCategoryService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            ProcessCategoryService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(ProcessCategoryService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }
    }
}