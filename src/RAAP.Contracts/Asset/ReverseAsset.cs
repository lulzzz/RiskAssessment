using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class ReverseAsset
    {
        [DataMember]
        public string Name { get; set; }
        private List<ReverseAsset> _children = new List<ReverseAsset>();
        [DataMember]
        public List<ReverseAsset> Children { get { return _children; }  set { _children = value; } }
        [DataMember]
        public string Parent { get; set; }
    }
}
