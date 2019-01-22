using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Soa
{
    [DataContract]
    public class SoaLink
    {
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Url { get; set; }
    }
}
