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
    
    public partial class SoaChapterItem
    {
        public int SoaChapterItemsId { get; set; }
        public int SoaChapterId { get; set; }
        public string IsoCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Goal { get; set; }
        public string HowTo { get; set; }
        public string Info { get; set; }
    
        public virtual Language Language { get; set; }
        public virtual SoaChapter SoaChapter { get; set; }
    }
}
