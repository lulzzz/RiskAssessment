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
    
    public partial class Asset_Asset
    {
        public int FromAssetId { get; set; }
        public int ToAssetId { get; set; }
        public int RecoveryCalculateType { get; set; }
    
        public virtual Asset Parent { get; set; }
        public virtual Asset Child { get; set; }
    }
}
