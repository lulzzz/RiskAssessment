using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/assetsubcategory")]
    public class AssetSubCategoryController : BaseController
    {
     
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery)
        {
            var result = AssetSubCategoryService.Get(pagedQuery);
            return Ok(result);
        }

        // GET: SubCategory
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = AssetSubCategoryService.GetSingle(id);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.AssetSubCategory.CreateAssetSubCategory create)
        {
            AssetSubCategoryService.Create(create);
            return Ok();
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.AssetSubCategory.UpdateAssetSubCategory update)
        {
            AssetSubCategoryService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            AssetSubCategoryService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(AssetSubCategoryService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }
    }
}