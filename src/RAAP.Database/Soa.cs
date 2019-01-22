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
    
    public partial class Soa
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Soa()
        {
            this.SoaLinks = new HashSet<SoaLink>();
            this.Asset_SoaChapter = new HashSet<Asset_SoaChapter>();
        }
    
        public int SoaId { get; set; }
        public int SoaChapterId { get; set; }
        public bool Relevance { get; set; }
        public bool RiskAssessments { get; set; }
        public bool CurrentControl { get; set; }
        public bool Contractual { get; set; }
        public bool DataProtectionLaw { get; set; }
        public int Compliance { get; set; }
        public Nullable<System.DateTime> ComplianceDate { get; set; }
        public string SourceReference { get; set; }
        public string ControlDescription { get; set; }
        public Nullable<int> ResponsibleUserId { get; set; }
        public Nullable<int> ImplementationUserId { get; set; }
        public Nullable<System.DateTime> ImplementationDate { get; set; }
        public int Reason { get; set; }
        public bool Availability { get; set; }
        public bool Integrity { get; set; }
        public bool Confidenciality { get; set; }
        public bool Authenticity { get; set; }
        public int SoaType { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SoaLink> SoaLinks { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Asset_SoaChapter> Asset_SoaChapter { get; set; }
    }
}
