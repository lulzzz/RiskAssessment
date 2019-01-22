using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Risk
{
    [DataContract]
    public class RiskReduce
    {
        [DataMember]
        public int IsoProbability { get; set; }
        [DataMember]
        public int IsoImpact { get; set; }
        [DataMember]
        public int NsValue { get; set; }
        [DataMember]
        public int NsThreat { get; set; }
        [DataMember]
        public int NsVulnerability { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public int Type { get; set; }
        [DataMember]
        public int RiskReduceId { get; set; }

        public RiskReduce(int isoProbability, int isoImpact, int nsValue, int nsThreat, int nsVulnerability, string name, int type, int id)
        {
            IsoImpact = isoImpact;
            IsoProbability = isoProbability;
            NsValue = nsValue;
            NsThreat = nsThreat;
            NsVulnerability = nsVulnerability;
            Name = name;
            Type = type;
            RiskReduceId = id;
        }
        public RiskReduce()
        {
            IsoImpact = IsoProbability = NsThreat = NsValue = NsVulnerability = 0;
            RiskReduceId = -1;
        }
    }
}
