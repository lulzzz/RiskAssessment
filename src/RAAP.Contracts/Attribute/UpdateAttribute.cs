using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Attribute
{
    [DataContract]
    public class UpdateAttribute : CreateAttribute
    {
        [Required]
        [DataMember]
        public int AttributeId { get; set; }

    }

}
