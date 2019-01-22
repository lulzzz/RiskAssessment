using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using RAAP.Contracts.Common;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;
using System.Security;

namespace RAAP.Web.API.Controllers
{
    [System.Web.Http.RoutePrefix("api/user")]
    public class UserController : BaseController
    {
        // GET (Many)
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Get([FromUri]PagedQuery pagedQuery, int companyId)
        {
            if ( IsSystemAdministrator || companyId == CompanyId)
            {
                var result = UserService.Get(pagedQuery, companyId);
                return Ok(result);
            }
            else
                return Unauthorized();
        }

        // GET: 
        [RaapAuthorize]
        public IHttpActionResult Get(int id)
        {
            var result = UserService.GetUserByUserId(id);
            if (CurrentUser.Roles.Any(r => r == Roles.SystemAdministrator || r == Roles.Administrator))
                return Ok(result);

            if (result.UserId == CurrentUser.UserId)
                return Ok(result);

            return Unauthorized();
        }
        [HttpGet]
        [Route("IsUsernameAvailable")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult IsUsernameAvailable(string username)
        {
            var result = UserService.IsUsernameAvailable(username);
            return Ok(result);
        }

        [HttpGet]
        [Route("IsEmailAvailable")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult IsEmailAvailable(string email)
        {
            var result = UserService.IsEmailAvailable(email);
            return Ok(result);
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Post([FromBody]Contracts.User.CreateUser create)
        {
            //FIXME! Don't allow Admins to create users at another company
            var result = UserService.Create(create);

            UploadedImage uploadedImage;

            if (UploadStore.UserImages.TryGetValue(UserId, out uploadedImage) && uploadedImage != null)
            {
                UserService.UpdateProfileImage(result.UserId, uploadedImage.Image, uploadedImage.ContentType);
                UploadStore.UserImages.TryRemove(UserId, out uploadedImage);
            }

            return Ok(result);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Put([FromBody]Contracts.User.UpdateUser update)
        {
            //FIXME! Don't allow Admins to update users of another company
            UserService.Update(update);
            return Ok();
        }

        // DELETE (Delete)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult Delete(int id)
        {
            //FIXME! Don't allow Admins to delete users at another company
            UserService.Delete(id);
            return Ok();
        }

        // GET (Search)
        [System.Web.Http.HttpGet]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        [System.Web.Http.Route("Search")]
        public IHttpActionResult Search(string query)
        {
            if (!string.IsNullOrEmpty(query) && query.Length > 1)
                return Ok(UserService.Search(query, CompanyId));
            return Ok(new List<SimpleSearchResult>());
        }

        // POST (SetPassword)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        [System.Web.Http.Route("SetPassword")]
        public IHttpActionResult SetPassword([FromBody]Contracts.User.SetPassword setPassword)
        {
            //FIXME! Don't allow Admins to update users at another company
            UserService.SetPassword(setPassword);
            return Ok();
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("image")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public HttpResponseMessage Image(int userId)
        {
            //FIXME! Don't allow Admins to update users at another company
            var profileImage = UserService.GetProfileImage(userId);
            if (profileImage.Image == null)
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(profileImage.Image)
            };

            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = $"ProfileImage-{userId}.jpg"
            };

            result.Content.Headers.ContentType = new MediaTypeHeaderValue(profileImage.ContentType);
            return result;
           }

        [System.Web.Http.Route("profileimage")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public async Task<HttpResponseMessage> PostFormData(int? userId)
        {
            //FIXME! Don't allow Admins to update users at another company
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider(); 

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                var content = provider.Contents.FirstOrDefault();
                var rawFileData = content.ReadAsStreamAsync().Result;

                if (userId.GetValueOrDefault() > 0)
                    UserService.UpdateProfileImage(userId.GetValueOrDefault(), ToByteArray(rawFileData),
                        content.Headers.ContentType.ToString());
                else
                {
                    UploadStore.UserImages.TryAdd(UserId, new UploadedImage
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

        // GET (GetAvailableLanguages)
        [System.Web.Http.HttpGet]
        [RaapAuthorize]
        [System.Web.Http.Route("GetAvailableLanguages")]
        public IHttpActionResult GetAvailableLanguages()
        {
            return Ok(UserService.GetAvailableLanguages());
        }



    }


}