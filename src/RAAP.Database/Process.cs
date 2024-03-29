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
    
    public partial class Process
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Process()
        {
            this.HtmlComments = new HashSet<HtmlComment>();
            this.Risks = new HashSet<Risk>();
            this.ThreatRisks = new HashSet<ThreatRisk>();
            this.Assets = new HashSet<Asset>();
        }
    
        public int ProcessId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AggregatedStatus { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public int ProcessCategoryId { get; set; }
        public bool Enabled { get; set; }
        public Nullable<int> ResponsibleUserId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<HtmlComment> HtmlComments { get; set; }
        public virtual ProcessCategory ProcessCategory { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Risk> Risks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ThreatRisk> ThreatRisks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asset> Assets { get; set; }
    }
}
