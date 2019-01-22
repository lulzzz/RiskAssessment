using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Soa
{

    [DataContract]
    public class SoaChapter
    {
        private List<SoaFile> _files;
        private List<SoaChapter> _subChapters;
        private List<SoaLink> _links;

        /// <summary>
        /// This is the Soa Chapter
        /// </summary>
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string Goal { get; set; }

        [DataMember]
        public string IsoCode { get; set; }

        [DataMember]
        public List<SoaChapter> SubChapters
        {
            get { return _subChapters ?? (_subChapters = new List<SoaChapter>()); }
            set { _subChapters = value; }
        }

        [DataMember]
        public bool Authenticity { get; set; }

        [DataMember]
        public bool Integrity { get; set; }

        [DataMember]
        public bool Confidenciality { get; set; }

        [DataMember]
        public bool Availability { get; set; }

        [DataMember]
        public DateTime? ComplianceDate { get; set; }
        [DataMember]
        public DateTime? ImplementationDate { get; set; }
        /// <summary>
        /// This is the unique id for this object
        /// </summary>
        [DataMember]
        public int SoaId { get; set; }
        [DataMember]
        public int CompanyId { get; set; }
        [DataMember]
        public int Compliance { get; set; }
        [DataMember]
        public User.User ResponsibleUser { get; set; }
        [DataMember]
        public User.User ImplementationUser { get; set; }
        [DataMember]
        public int Reason { get; set; }
        [DataMember]
        public bool Relevance { get; set; }
        //Source for requirement
        [DataMember]
        public bool RiskAssessments { get; set; }
        [DataMember]
        public bool CurrentControl { get; set; }
        [DataMember]
        public bool Contractual { get; set; }
        [DataMember]
        public bool DataProtectionLaw { get; set; }
        //end
        [DataMember]
        public string SourceReference { get; set; }
        [DataMember]
        public string ControlDescription { get; set; }
        [DataMember]
        public string HowTo { get; set; }
        [DataMember]
        public string Info { get; set; }

        [DataMember]
        public int SoaType { get; set; }

        [DataMember]
        public List<SoaFile> Files
        {
            get { return _files ?? (_files = new List<SoaFile>()); }
            set { _files = value; }
        }

        [DataMember]
        public List<SoaLink> SoaLinks
        {
            get { return _links ?? (_links = new List<SoaLink>()); }
            set { _links = value; }
        }

        public int? ParentId { get; set; }
    }
}
