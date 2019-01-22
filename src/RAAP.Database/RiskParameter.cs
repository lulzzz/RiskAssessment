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
    
    public partial class RiskParameter
    {
        public int RiskParameterId { get; set; }
        public int DamageProbability { get; set; }
        public int DamageImpact { get; set; }
        public int ReputationProbability { get; set; }
        public int ReputationImpact { get; set; }
        public int FinancialProbability { get; set; }
        public int FinancialImpact { get; set; }
        public int DamageValue { get; set; }
        public int DamageThreat { get; set; }
        public int DamageVulnerability { get; set; }
        public int FinancialValue { get; set; }
        public int FinancialThreat { get; set; }
        public int FinancialVulnerability { get; set; }
        public int ReputationValue { get; set; }
        public int ReputationThreat { get; set; }
        public int ReputationVulnerability { get; set; }
        public int RiskId { get; set; }
    
        public virtual Risk Risk { get; set; }
    }
}