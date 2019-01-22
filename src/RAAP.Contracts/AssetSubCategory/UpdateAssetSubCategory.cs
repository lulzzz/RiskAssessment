using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.AssetSubCategory
{
    [DataContract]
    public class UpdateAssetSubCategory : CreateAssetSubCategory
    {
        [Required]
        [DataMember]
        public int AssetSubCategoryId { get; set; }
    }
}
