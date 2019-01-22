using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/attributecategory")]
    public class AttributeCategoryController : BaseController
    {
     
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery, [FromUri]string attributeTypeId)
        {
            var result = AttributeCategoryService.Get(pagedQuery, attributeTypeId);
            return Ok(result);
        }

        // GET: SubCategory
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = AttributeCategoryService.GetSingle(id);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.AttributeCategory.CreateAttributeCategory create)
        {
            AttributeCategoryService.Create(create);
            return Ok();
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.AttributeCategory.UpdateAttributeCategory update)
        {
            AttributeCategoryService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            AttributeCategoryService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query, string attributeTypeId)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(AttributeCategoryService.Search(query, attributeTypeId));
            else
                return Ok(new List<SimpleSearchResult>());
        }
    }
}