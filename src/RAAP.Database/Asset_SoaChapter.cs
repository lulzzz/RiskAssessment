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
    
    public partial class Asset_SoaChapter
    {
        public int AssetId { get; set; }
        public bool Implemented { get; set; }
        public Nullable<System.DateTime> ExecutedDate { get; set; }
        public Nullable<System.DateTime> ValidTo { get; set; }
        public Nullable<System.DateTime> Deadline { get; set; }
        public string Comment { get; set; }
        public int SoaId { get; set; }
    
        public virtual Asset Asset { get; set; }
        public virtual Soa Soa { get; set; }
    }
}
