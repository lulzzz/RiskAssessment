using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.AssetSubCategory
{
    [DataContract]
    public class CreateAssetSubCategory
    {
        [Required]
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }
    }

}
