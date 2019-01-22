using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Attribute
{
    [DataContract]
    public class Attribute : UpdateAttribute
    {

        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }

        [DataMember]
        public string AttributeCategoryName { get; set; }
    }

}
