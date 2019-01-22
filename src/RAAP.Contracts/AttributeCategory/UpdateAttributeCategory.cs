using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.AttributeCategory
{
    [DataContract]
    public class UpdateAttributeCategory : CreateAttributeCategory
    {
        [Required]
        [DataMember]
        public int AttributeCategoryId { get; set; }

    }

}
