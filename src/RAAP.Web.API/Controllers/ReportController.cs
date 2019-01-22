using System.Web.Http;
using RAAP.Web.API.Helpers;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/report")]
    public class ReportController : BaseController
    {

        // GET: Asset
        [RaapAuthorize]
        [HttpGet]
        [Route("GetDashboardReport")]
        public IHttpActionResult GetDashboardReport()
        {
            var result = ReportService.GetDashboardReport();
            return Ok(result);
        }
        
    }
}