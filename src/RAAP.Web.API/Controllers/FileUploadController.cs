using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using RAAP.Web.API.Helpers;
using System.Net.Http.Headers;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/upload")]
    public class UploadController : BaseController
    {
        static UploadController()
        {
            BaseFilePath = ConfigurationManager.AppSettings["soaFileBasePath"];
        }
        static string BaseFilePath { get; set; }

        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var companyDir = Path.Combine(BaseFilePath, CompanyId.ToString());
            if (!Directory.Exists(companyDir))
                Directory.CreateDirectory(companyDir);

            var provider = new CustomMultipartFormDataStreamProvider(companyDir);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                var soaChapterId = provider.FormData.GetValues("soachapterid")[0];
                var soaType = int.Parse(provider.FormData.GetValues("soaType")[0]);
                var fileName = provider.FileData[0].Headers.ContentDisposition.FileName.Replace("\"", "").Trim();
                var master = bool.Parse(provider.FormData.GetValues("master")[0]);

                if (soaType == 3 && master)
                {
                    var masterCompanyDir = Path.Combine(BaseFilePath, "000");
                    if (!Directory.Exists(masterCompanyDir))
                        Directory.CreateDirectory(masterCompanyDir);
                    File.Move(Path.Combine(companyDir, provider.FileData[0].LocalFileName), Path.Combine(masterCompanyDir, provider.FileData[0].LocalFileName));
                    companyDir = masterCompanyDir;
                }

                var chapterDir = Path.Combine(companyDir, soaChapterId);
                if (!Directory.Exists(chapterDir))
                    Directory.CreateDirectory(chapterDir);

                fileName = Path.Combine(chapterDir, fileName);

                if(File.Exists(fileName))
                    File.Delete(fileName);

                File.Move(Path.Combine(companyDir, provider.FileData[0].LocalFileName), fileName);

                //Update db with filenames
                var file = UploadService.AddFile(Convert.ToInt32(soaChapterId), fileName, soaType == 3 && master);

                return Request.CreateResponse(HttpStatusCode.OK, file);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
    
    //this class has a helper method for getting local file names (instead of hashed names)
    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public CustomMultipartFormDataStreamProvider(string path) : base(path) { }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            return headers.ContentDisposition.FileName.Replace("\"", string.Empty);
        }
    }
}