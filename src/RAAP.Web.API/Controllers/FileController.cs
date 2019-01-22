using System;
using System.Configuration;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using RAAP.Web.API.Helpers;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/file")]
    public class FileController : BaseController
    {
        static FileController()
        {
            BaseFilePath = ConfigurationManager.AppSettings["soaFileBasePath"];
        }

        static string BaseFilePath { get; set; }


        [RaapAuthorize]
        [Route("Getfile")]
        public IHttpActionResult GetFile(Guid guid)
        {
            HttpContext.Current.Response.Buffer = true;
            //Get file name and soachapterid from db, create correct FilePath including companyid
            var file = UploadService.GetFile(guid);
            if (file == null)
                return null;
            return new FileActionResult(file.FileName, Path.Combine(BaseFilePath, file.Template ? "000" : CompanyId.ToString(), file.SoaChapterId.ToString()));
        }

        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Delete(Guid id)
        {
            var file = UploadService.GetFile(id);
            if (file == null)
                return BadRequest("File not found");
            var path = Path.Combine(BaseFilePath, file.Template ? "000" : CompanyId.ToString(), file.SoaChapterId.ToString(), file.FileName);

            if (File.Exists(path))
                File.Delete(path);

            UploadService.DeleteFile(file);
            return Ok();
        }

        [RaapAuthorize]
        [Route("Getfiles")]
        public IHttpActionResult GetTemplates()
        {
            return Ok(UploadService.GetFiles());
        }
    }

    public class FileActionResult : IHttpActionResult
    {
        public FileActionResult(string fileName, string filePath)
        {
            this.FileName = fileName;
            this.FilePath = filePath;
        }

        public string FileName { get; set; }

        public string FilePath { get; set; }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            response.Content = new StreamContent(File.OpenRead(Path.Combine(FilePath, FileName)));
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = Uri.EscapeDataString(FileName);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            return Task.FromResult(response);
        }
    }
}
