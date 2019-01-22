using System.Web.Http;
using RAAP.Web.API.Helpers;
using RAAP.Web.API.Helpers.Validation;
using System.Security;
using System;

namespace RAAP.Web.API.Controllers
{
    [RoutePrefix("api/account")]
    public class AccountController : BaseController
    {
        [Route("Ping")]
        [AllowAnonymous]
        [HttpGet]
        public IHttpActionResult Ping()
        {
            // warm up database
            ProcessService.Get(new Contracts.Common.PagedQuery());
            return Ok();
        }

        [RaapAuthorize]
        [Route("GetMyDetails")]
        public Contracts.User.User GetMyDetails()
        {
            var user = UserService.GetUserByUserId(UserId);
            return user;
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize]
        public IHttpActionResult Put([FromBody]Contracts.User.UpdateUser updateUser)
        {
            CheckIfCorrectUser(updateUser.UserId);
            UserService.Update(updateUser);
            return Ok();
        }

        // POST (Create)
        [ValidateModel]
        [RaapAuthorize]
        [Route("ChangePassword")]
        public IHttpActionResult ChangePassword([FromBody]Contracts.User.ChangePassword changePassword)
        {
            CheckIfCorrectUser(changePassword.UserId);
            UserService.ChangePassword(changePassword);
            return Ok();
        }

        // POST (Create)
        [ValidateModel]
        [Route("RecoverPassword")]
        public IHttpActionResult RecoverPassword([FromBody]Contracts.User.RecoverPassword recoverPassword)
        {
            UserService.RecoverPassword(recoverPassword.Username);
            return Ok();
        }

        // POST (Create)
        [HttpPost]
        [ValidateModel]
        [Route("SetNewPassword")]
        public IHttpActionResult SetNewPassword([FromBody]Contracts.User.RecoverSetPassword recoverSetPassword)
        {
            UserService.SetNewPassword(recoverSetPassword.Id, recoverSetPassword.NewPassword, recoverSetPassword.NewPasswordRepeat);
            return Ok();
        }

        private void CheckIfCorrectUser(int userId)
        {
            if (userId != UserId)
                throw new SecurityException("You are trying to access another user!");
        }
    }
}
