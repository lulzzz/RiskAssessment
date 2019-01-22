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
    
    public partial class AssetThreat_Control
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AssetThreat_Control()
        {
            this.ControlRisks = new HashSet<ControlRisk>();
            this.HtmlComments = new HashSet<HtmlComment>();
        }
    
        public int AssetThreatId { get; set; }
        public int ControlId { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public Nullable<System.DateTime> ExecutedDate { get; set; }
        public Nullable<System.DateTime> ValidTo { get; set; }
        public Nullable<System.DateTime> Deadline { get; set; }
        public int Status { get; set; }
        public int Type { get; set; }
        public bool LegalObligation { get; set; }
        public Nullable<decimal> InvestmentCost { get; set; }
        public Nullable<decimal> MaintenanceCost { get; set; }
        public int AssetThreatControlId { get; set; }
        public bool Enabled { get; set; }
        public int DamageValue { get; set; }
        public int DamageThreat { get; set; }
        public int DamageVulnerability { get; set; }
        public int DamageImpact { get; set; }
        public int DamageProbability { get; set; }
        public int FinancialValue { get; set; }
        public int FinancialThreat { get; set; }
        public int FinancialVulnerability { get; set; }
        public int FinancialImpact { get; set; }
        public int FinancialProbability { get; set; }
        public int ReputationValue { get; set; }
        public int ReputationThreat { get; set; }
        public int ReputationVulnerability { get; set; }
        public int ReputationImpact { get; set; }
        public int ReputationProbability { get; set; }
        public Nullable<int> ResponsibleUserId { get; set; }
        public bool Detect { get; set; }
        public bool Prevent { get; set; }
        public bool React { get; set; }
        public Nullable<System.DateTime> AlertDate { get; set; }
        public Nullable<int> AlertUserId { get; set; }
        public bool Avoid { get; set; }
    
        public virtual Asset_Threat Asset_Threat { get; set; }
        public virtual Control Control { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ControlRisk> ControlRisks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HtmlComment> HtmlComments { get; set; }
    }
}