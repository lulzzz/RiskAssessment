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
    
    public partial class Incident
    {
        public int IncidentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public Nullable<int> ControlId { get; set; }
        public Nullable<int> AssetId { get; set; }
    
        public virtual Asset Asset { get; set; }
        public virtual Control Control { get; set; }
    }
}
