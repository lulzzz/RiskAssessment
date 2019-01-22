//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RAAP.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class ThreatRisk
    {
        public int ThreatRiskId { get; set; }
        public Nullable<int> ThreatId { get; set; }
        public int Type { get; set; }
        public int IsoProbability { get; set; }
        public int IsoImpact { get; set; }
        public int NsValue { get; set; }
        public int NsThreat { get; set; }
        public int NsVulnerability { get; set; }
        public int CalculatedIso { get; set; }
        public int CalculatedNs { get; set; }
        public int IsoRisk { get; set; }
        public int NsRisk { get; set; }
        public Nullable<int> AssetId { get; set; }
        public Nullable<int> AssetThreatId { get; set; }
        public Nullable<int> ProcessId { get; set; }
        public int CalculatedIsoProbability { get; set; }
        public int CalculatedIsoImpact { get; set; }
        public int CalculatedNsValue { get; set; }
        public int CalculatedNsThreat { get; set; }
        public int CalculatedNsVulnerability { get; set; }
    
        public virtual Asset Asset { get; set; }
        public virtual Asset_Threat Asset_Threat { get; set; }
        public virtual Process Process { get; set; }
        public virtual RiskType RiskType { get; set; }
        public virtual Threat Threat { get; set; }
    }
}
