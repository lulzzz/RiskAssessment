using System;
using System.Collections.Generic;

namespace RAAP.Web.API.Helpers.Exceptions
{
    public class RAAPConflictException: Exception
    {
        public Dictionary<string, object> AdditionalData { get; set; }
        public RAAPConflictException(): base()
        {
            AdditionalData = new Dictionary<string, object>();
        }

        public RAAPConflictException(string exceptionMessage): base()
        {
            AdditionalData = new Dictionary<string, object>
            {
                { "exceptionMessage", exceptionMessage }
            };
        }
    }
}