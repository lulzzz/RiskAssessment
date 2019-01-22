using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Attribute
{
    [DataContract]
    public class CreateAttribute
    {
        [Required]
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public string Comment { get; set; }

        [Required]
        [DataMember]
        public string AttributeTypeId { get; set; }

        [Required]
        [DataMember]
        public int AttributeCategoryId { get; set; }

        [DataMember]
        public Timeframe Timeframe { get; set; }

        [DataMember]
        public List<Attribute> ChildAttributes { get; set; }

        [DataMember]
        public int? Source { get; set; }
    }

}
