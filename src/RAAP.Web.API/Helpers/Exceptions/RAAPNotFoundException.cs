using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RAAP.Web.API.Helpers.Exceptions
{
    public class RAAPNotFoundException : Exception
    {
        public RAAPNotFoundException(string message): base(message)
        {
        }
    }
}