using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.XPath;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/company")]
    public class CompanyController : BaseController
    {

        // GET (Many)
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery)
        {
            var result = CompanyService.Get(pagedQuery);

            if (CurrentUser.Roles.All(r => r != Roles.SystemAdministrator))
            {
                result.Items = result.Items.Where(c => c.CompanyId == CurrentUser.CompanyId).ToArray();
                result.CurrentPage = 1;
                result.TotalItems = 1;
                result.TotalPages = 1;
            }

            return Ok(result);
        }

        // GET: 
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            if (IsSystemAdministrator || id == CompanyId)
            {
                var result = CompanyService.GetSingle(id);
                return Ok(result);
            }
            else
                return Unauthorized();
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.Company.CreateCompany create)
        {
            var result = CompanyService.Create(create);

            UploadedImage uploadedImage;

            if (UploadStore.UserImages.TryGetValue(UserId, out uploadedImage) && uploadedImage != null)
            {
                CompanyService.UpdateProfileImage(result.CompanyId, uploadedImage.Image, uploadedImage.ContentType);
                UploadStore.UserImages.TryRemove(UserId, out uploadedImage);
            }

            return Ok(result);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.Company.UpdateCompany update)
        {
            if (IsSystemAdministrator || update.CompanyId == CompanyId)
            {
                CompanyService.Update(update);
                return Ok();
            }
            else
                return Unauthorized();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            CompanyService.Delete(id);
            return Ok();
        }

        // Search
        [HttpGet]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        [Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(CompanyService.Search(query));
            else
                return Ok(new List<SimpleSearchResult>());
        }

        [HttpGet]
        [Route("image")]
        [RaapAuthorize]
        public HttpResponseMessage Image(int companyId)
        {
            var profileImage = CompanyService.GetProfileImage(companyId);
            if (profileImage.Image == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(profileImage.Image)
            };

            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = $"ProfileImageCompany-{companyId}.jpg"
            };

            result.Content.Headers.ContentType = new MediaTypeHeaderValue(profileImage.ContentType);
            return result;
        }

        [Route("profileimage")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public async Task<HttpResponseMessage> PostFormData(int? companyId)
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider();

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                var content = provider.Contents.FirstOrDefault();
                var rawFileData = content.ReadAsStreamAsync().Result;

                if (companyId.GetValueOrDefault() > 0)
                    CompanyService.UpdateProfileImage(companyId.GetValueOrDefault(), ToByteArray(rawFileData),
                        content.Headers.ContentType.ToString());
                else
                {
                    UploadStore.CompanyImages.TryAdd(CompanyId, new UploadedImage
                    {
                        ContentType = content.Headers.ContentType.ToString(),
                        Image = ToByteArray(rawFileData)
                    });
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [ValidateModel]
        [Route("CreateRiskType")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult CreateRiskType(Contracts.Risk.RiskType riskType)
        {
            return Ok(CompanyService.CreateRiskType(riskType));
        }

        [ValidateModel]
        [HttpPut]
        [Route("UpdateRiskType")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult UpdateRiskType(Contracts.Risk.RiskType riskType)
        {
            CompanyService.UpdateRiskType(riskType);
            return Ok();
        }

        [Route("DeleteRiskType/{id?}")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult DeleteRiskType(int id)
        {
            CompanyService.DeleteRiskType(id);
            return Ok();
        }

        [HttpGet]
        [Route("GetRiskType/{id?}")]
        [RaapAuthorize]
        public IHttpActionResult GetRiskType(int id)
        {
            var riskType = CompanyService.GetRiskType(id);
            return Ok(riskType);
        }

        [RaapAuthorize]
        [Route("GetRiskTypes")]
        public IHttpActionResult GetRiskTypes([FromUri]PagedQuery pagedQuery)
        {
            var result = CompanyService.GetRiskTypes(pagedQuery);
            return Ok(result);
        }
    }
}