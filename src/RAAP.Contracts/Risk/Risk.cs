using System;
using System.Data.Common;
using System.Runtime.Serialization;
using RAAP.Contracts.Threat;

namespace RAAP.Contracts.Risk
{
    [DataContract]
    public class Risk
    {
        [DataMember]
        public int CalculatedIsoRisk { get; set; }
        [DataMember]
        public int CalculatedNsRisk { get; set; }
        [DataMember]
        public int IsoRisk { get; set; }
        [DataMember]
        public int NsRisk { get; set; }
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
        public int CalculatedIsoProbability { get; set; }
        [DataMember]
        public int CalculatedIsoImpact { get; set; }
        [DataMember]
        public int CalculatedNsValue { get; set; }
        [DataMember]
        public int CalculatedNsThreat { get; set; }
        [DataMember]
        public int CalculatedNsVulnerability { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public int Type { get; set; }
        [DataMember]
        public int RiskId { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is Risk)
            {
                var risk = (Risk)obj;
                return risk.Type == Type &&
                       risk.CalculatedIsoImpact == CalculatedIsoImpact &&
                       risk.CalculatedIsoProbability == CalculatedIsoProbability &&
                       risk.CalculatedIsoRisk == CalculatedIsoRisk &&
                       risk.CalculatedNsRisk == CalculatedNsRisk &&
                       risk.CalculatedNsThreat == CalculatedNsThreat &&
                       risk.CalculatedNsValue == CalculatedNsValue &&
                       risk.CalculatedNsVulnerability == CalculatedNsVulnerability &&
                       risk.IsoImpact == IsoImpact &&
                       risk.IsoProbability == IsoProbability &&
                       risk.IsoRisk == IsoRisk &&
                       risk.NsRisk == NsRisk &&
                       risk.NsThreat == NsThreat &&
                       risk.NsValue == NsValue &&
                       risk.NsVulnerability == NsVulnerability;
            }
            else
                return base.Equals(obj);
        }

        public Risk()
        {
            CalculatedIsoRisk = CalculatedNsRisk = IsoRisk = NsRisk = IsoImpact = IsoProbability = NsThreat = NsValue = NsVulnerability = 1;
            RiskId = -1;
        }

        public Risk(int isoProbability, int isoImpact, int nsValue, int nsThreat, int nsVulnerability, int isoRisk, int nsRisk, int calculatedIsoRisk, int calculatedNsRisk, int type, string name, int riskId)
        {
            RiskId = riskId;
            Name = name;
            Type = type;
            IsoProbability = isoProbability;
            IsoImpact = isoImpact;
            NsValue = nsValue;
            NsThreat = nsThreat;
            NsVulnerability = nsVulnerability;
            CalculatedIsoRisk = calculatedIsoRisk;
            CalculatedNsRisk = calculatedNsRisk;
            IsoRisk = isoRisk;
            NsRisk = nsRisk;
        }
    }
}
