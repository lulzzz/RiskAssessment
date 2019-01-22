using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class TimeCost
    {
        [DataMember]
        public int TimeCostId { get; set; }
        [DataMember]
        public int Time { get; set; }
        [DataMember]
        public decimal Cost { get; set; }
    }
}
