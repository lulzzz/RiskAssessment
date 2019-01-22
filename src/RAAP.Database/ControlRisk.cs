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
    
    public partial class ControlRisk
    {
        public int ControlRiskId { get; set; }
        public Nullable<int> ControlId { get; set; }
        public int Type { get; set; }
        public int IsoProbability { get; set; }
        public int IsoImpact { get; set; }
        public int NsValue { get; set; }
        public int NsThreat { get; set; }
        public int NsVulnerability { get; set; }
        public Nullable<int> AssetThreatControlId { get; set; }
    
        public virtual AssetThreat_Control AssetThreat_Control { get; set; }
        public virtual Control Control { get; set; }
        public virtual RiskType RiskType { get; set; }
    }
}
