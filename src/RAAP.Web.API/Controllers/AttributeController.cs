using System.Collections.Generic;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/attribute")]
    public class AttributeController : BaseController
    {
     
        // GET (Many)
        [RaapAuthorize]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery, [FromUri]string attributeTypeId, [FromUri] int[] excludeIds)
        {
            var result = AttributeService.Get(pagedQuery, attributeTypeId, excludeIds);
            return Ok(result);
        }

        // GET link (Many)
        [RaapAuthorize]
        [Route("Getchilds")]
        public IHttpActionResult GetChilds([FromUri]PagedQuery pagedQuery, [FromUri]int attributeId)
        {
            var result = AttributeService.GetChilds(pagedQuery, attributeId);
            return Ok(result);
        }

        // GET: SubCategory
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = AttributeService.GetSingle(id);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.Attribute.CreateAttribute create)
        {
            AttributeService.Create(create);
            return Ok();
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.Attribute.UpdateAttribute update)
        {
            AttributeService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            AttributeService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize]
        [Route("Search")]
        public IHttpActionResult Search(string query, string attributeTypeId)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(AttributeService.Search(query, attributeTypeId));
            else
                return Ok(new List<SimpleSearchResult>());
        }

        // Add link
        [HttpGet]
        [RaapAuthorize]
        [Route("Addlink")]
        public IHttpActionResult Addlink(int parentAttributeId, int attributeId)
        {
            AttributeService.AddLink(parentAttributeId, attributeId);
            return Ok();
        }

        // REmove link
        [HttpGet]
        [RaapAuthorize]
        [Route("Removelink")]
        public IHttpActionResult Removelink(int parentAttributeId, int attributeId)
        {
            AttributeService.RemoveLink(parentAttributeId, attributeId);
            return Ok();
        }
    }
}