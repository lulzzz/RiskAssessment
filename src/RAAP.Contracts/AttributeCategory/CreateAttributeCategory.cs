using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.AttributeCategory
{
    [DataContract]
    public class CreateAttributeCategory
    {
        [Required]
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }

        [Required]
        [DataMember]
        public string AttributeTypeId { get; set; }
    }

}
