using RAAP.Web.API.Helpers.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace RAAP.Web.API.Helpers
{
    public class ExceptionHandlingAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is RAAPNotFoundException)
            {
                //Do logging here for 404
                context.Response = context.Request.CreateResponse(HttpStatusCode.NotFound, new { exceptionMessage = context.Exception.Message });
            }

            if (context.Exception is RAAPConflictException)
            {
                //Do logging here for 409
                var e = context.Exception as RAAPConflictException;
                context.Response = context.Request.CreateResponse(HttpStatusCode.Conflict, e.AdditionalData);
            }
        }
    }
}