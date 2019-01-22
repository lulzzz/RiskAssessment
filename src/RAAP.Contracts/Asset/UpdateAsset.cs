using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class UpdateAsset : CreateAsset
    {
        [Required]
        [DataMember]
        public int AssetId { get; set; }
    }
}
