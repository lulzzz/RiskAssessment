using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class AssetSoa
    {
        [DataMember]
        public int SoaId { get; set; }
        [DataMember]
        public string SoaChapterName { get; set; }
        [DataMember]
        public bool Implemented { get; set; }
        [DataMember]
        public int SoaType { get; set; }
        [DataMember]
        public DateTime? ValidTo { get; set; }
        [DataMember]
        public DateTime? ExecutedDate { get; set; }
        [DataMember]
        public DateTime? Deadline { get; set; }
        [DataMember]
        public string Comment { get; set; }
    }
}
