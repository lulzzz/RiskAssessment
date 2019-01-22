using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.AttributeCategory
{
    [DataContract]
    public class AttributeCategory : UpdateAttributeCategory
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }

    }

}
