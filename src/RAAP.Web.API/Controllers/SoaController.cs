using System.Collections.Generic;
using System.Web.Http;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/soa")]
    public class SoaController : BaseController
    {

        // GET (Many)
        [RaapAuthorize]
        [Route("{id}/{isoCode}")]
        public IHttpActionResult Get(int id, string isoCode)
        {
            var result = SoaService.Get(id, isoCode);
            return Ok(result);
        }

        // PUT (Update)
        [ValidateModel]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult Put([FromBody]List<Contracts.Soa.SoaChapter> chapters)
        {
            SoaService.Update(chapters);
            return Ok();
        }

        [RaapAuthorize]
        [Route("GetSoa/{id?}/{isoCode?}")]
        public IHttpActionResult GetSoa(int id, string isoCode)
        {
            var result = SoaService.GetSoa(id, isoCode);
            return Ok(result);
        }

        [Route("GetRelevantSoas")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult GetRelevantSoas()
        {
            var result = SoaService.GetRelevantSoas();
            return Ok(result);
        }

        [Route("UpdateSoa")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator, Roles.User)]
        public IHttpActionResult UpdateSoa([FromBody]Contracts.Soa.Soa soa)
        {
            SoaService.UpdateSoa(soa);
            return Ok();
        }

        [Route("AddTemplate")]
        [RaapAuthorize(Roles.SystemAdministrator)]
        public IHttpActionResult AddTemplate([FromBody]Contracts.Soa.SoaChapter soa)
        {
            var result = SoaService.AddTemplate(soa);
            return Ok(result);
        }

        [Route("GetAssetSoas/{id?}/{isoCode?}")]
        [RaapAuthorize(Roles.SystemAdministrator, Roles.Administrator, Roles.User)]
        public IHttpActionResult GetAssetSoas(int id, string isoCode)
        {
            var result = SoaService.GetAssetSoas(id, isoCode);
            return Ok(result);
        }

        [Route("UpdateAssetSoas")]
        [RaapAuthorize(Roles.Administrator, Roles.SystemAdministrator)]
        public IHttpActionResult UpdateAssetSoas([FromBody]List<Contracts.Asset.AssetSoaList> soas)
        {
            SoaService.UpdateAssetSoas(soas);
            return Ok();
        }

        [Route("GetSoaStatistics/{soaType?}")]
        [RaapAuthorize(Roles.SystemAdministrator, Roles.Administrator, Roles.User)]
        public IHttpActionResult GetSoaStatistics(int soaType)
        {
            var result = SoaService.GetSoaStatistics(soaType);
            return Ok(result);
        }

        [Route("GetAssetSoaStatistics/{assetId?}/{soaType?}/{isoCode?}")]
        [RaapAuthorize(Roles.SystemAdministrator, Roles.Administrator, Roles.User)]
        public IHttpActionResult GetAssetSoaStatistics(int assetId, int soaType, string isoCode)
        {
            var result = SoaService.GetAssetSoaStatistics(assetId, soaType, isoCode);
            return Ok(result);
        }
    }
}