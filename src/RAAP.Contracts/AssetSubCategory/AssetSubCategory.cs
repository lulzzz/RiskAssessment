using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.AssetSubCategory
{
    [DataContract]
    public class AssetSubCategory : UpdateAssetSubCategory
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; } 
    }
}
