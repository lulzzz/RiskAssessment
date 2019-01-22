using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/asset")]
    public class AssetController : BaseController
    {
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery,[FromUri] int category = 0, [FromUri] int[] excludeIds = null)
        {
            var result = AssetService.Get(pagedQuery, category, excludeIds);
            return Ok(result);
        }

        // GET: Asset
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = AssetService.GetSingle(id);
            return Ok(result);
        }

        [RaapAuthorize]
        [HttpGet]
        [Route("reverse/{id?}")]
        public IHttpActionResult Reverse(int id)
        {
            var result = AssetService.Reverse(id);
            return Ok(result);
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(AssetService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }

        [HttpGet]
        [RaapAuthorize]
        [Route("isNameAvaiable")]
        public IHttpActionResult isNameAvaiable(string name)
        {
            var result = AssetService.isNameAvaiable(name);
            return Ok(result);
        }
        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Post([FromBody]Contracts.Asset.CreateAsset create)
        {
            var created = AssetService.Create(create);
            return Ok(created);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]Contracts.Asset.UpdateAsset update)
        {
            AssetService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Delete(int id)
        {
            AssetService.Delete(id);
            return Ok();
        }

        [HttpGet]
        [RaapAuthorize]
        [Route("GetUnhandledThreats")]
        public IHttpActionResult GetUnhandledThreats(int probability, int impact, int levelType)
        {
            return Ok(AssetService.GetUnhandledThreats(probability, impact, levelType));
        }
    }
}