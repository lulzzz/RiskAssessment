﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class RAAPMasterEntities : DbContext
    {
        public RAAPMasterEntities()
            : base("name=RAAPMasterEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Help> Helps { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<SoaChapter> SoaChapters { get; set; }
        public virtual DbSet<SoaChapterItem> SoaChapterItems { get; set; }
        public virtual DbSet<SoaFile> SoaFiles { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
