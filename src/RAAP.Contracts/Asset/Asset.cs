using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class Asset : UpdateAsset
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }
        //This property is only used in link between asset and sub-asset
        [DataMember]
        public int RecoveryCalculateType { get; set; }
        [DataMember]
        public decimal? CalculatedDataRecoveryCost { get; set; }
        [DataMember]
        public int? CalculatedDataRecoveryTime { get; set; }
        [DataMember]
        public decimal? CalculatedIntegrityCheckCost { get; set; }
        [DataMember]
        public int? CalculatedIntegrityCheckTime { get; set; }
        [DataMember]
        public decimal? CalculatedSystemRecoveryCost { get; set; }
        [DataMember]
        public int? CalculatedSystemRecoveryTime { get; set; }
    }
}
