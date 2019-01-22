using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class User : UpdateUser
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }

        [DataMember]
        public string CompanyName { get; set; }

    }
}
