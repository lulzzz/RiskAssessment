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
    
    public partial class Asset
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Asset()
        {
            this.Children = new HashSet<Asset_Asset>();
            this.Parents = new HashSet<Asset_Asset>();
            this.Asset_Threat = new HashSet<Asset_Threat>();
            this.BusinessContinuityPlans = new HashSet<BusinessContinuityPlan>();
            this.DowntimeEffects = new HashSet<DowntimeEffect>();
            this.HtmlComments = new HashSet<HtmlComment>();
            this.Incidents = new HashSet<Incident>();
            this.Risks = new HashSet<Risk>();
            this.ThreatRisks = new HashSet<ThreatRisk>();
            this.TimeCosts = new HashSet<TimeCost>();
            this.Vulnerabilities = new HashSet<Vulnerability>();
            this.Processes = new HashSet<Process>();
            this.Asset_SoaChapter = new HashSet<Asset_SoaChapter>();
        }
    
        public int AssetId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AggregatedStatus { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public int AssetCategoryId { get; set; }
        public Nullable<int> SystemRecoveryTime { get; set; }
        public Nullable<int> DataRecoveryTime { get; set; }
        public Nullable<int> IntegrityCheckTime { get; set; }
        public Nullable<int> MaxDownTime { get; set; }
        public Nullable<decimal> SystemRecoveryCost { get; set; }
        public Nullable<decimal> DataRecoveryCost { get; set; }
        public Nullable<decimal> IntegrityCheckCost { get; set; }
        public Nullable<decimal> MaxDownCost { get; set; }
        public bool RequiresBusinessContinuityPlan { get; set; }
        public int Confidenciality { get; set; }
        public int Integrity { get; set; }
        public int Availability { get; set; }
        public int Category { get; set; }
        public bool Enabled { get; set; }
        public Nullable<decimal> MaintenanceCost { get; set; }
        public Nullable<System.DateTime> DueDate { get; set; }
        public Nullable<decimal> InvestmentCost { get; set; }
        public Nullable<int> CriticalityCategoryId { get; set; }
        public bool CalculateSubCriticality { get; set; }
        public bool CalculateSubRecovery { get; set; }
        public Nullable<decimal> CalculatedDataRecoveryCost { get; set; }
        public Nullable<int> CalculatedDataRecoveryTime { get; set; }
        public Nullable<decimal> CalculatedSystemRecoveryCost { get; set; }
        public Nullable<int> CalculatedSystemRecoveryTime { get; set; }
        public Nullable<decimal> CalculatedIntegrityCheckCost { get; set; }
        public Nullable<int> CalculatedIntegrityCheckTime { get; set; }
        public int Authenticity { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asset_Asset> Children { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asset_Asset> Parents { get; set; }
        public virtual AssetSubCategory AssetSubCategory { get; set; }
        public virtual CriticalityCategory CriticalityCategory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asset_Threat> Asset_Threat { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BusinessContinuityPlan> BusinessContinuityPlans { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DowntimeEffect> DowntimeEffects { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HtmlComment> HtmlComments { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Incident> Incidents { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Risk> Risks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ThreatRisk> ThreatRisks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TimeCost> TimeCosts { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Vulnerability> Vulnerabilities { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Process> Processes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asset_SoaChapter> Asset_SoaChapter { get; set; }
    }
}
