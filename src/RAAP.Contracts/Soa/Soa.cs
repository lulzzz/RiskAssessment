using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Soa
{
    [DataContract]
    public class Soa
    {
        [DataMember]
        public bool Enabled { get; set; }
        [DataMember]
        public List<SoaChapter> SoaChapters { get; set; }
    }
}
