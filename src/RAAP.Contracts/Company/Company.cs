using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Company
{
    [DataContract]
    public class Company : UpdateCompany
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }

    }
}
