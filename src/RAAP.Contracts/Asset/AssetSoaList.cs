using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class AssetSoaList
    {
        [DataMember]
        public int AssetId { get; set; }
        [DataMember]
        public int SoaType { get; set; }
        [DataMember]
        public List<Contracts.Asset.AssetSoa> AssetSoas { get; set; }
    }
}
