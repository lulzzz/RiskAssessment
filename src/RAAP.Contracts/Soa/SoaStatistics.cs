using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Soa
{
    [DataContract]
    public class SoaStatistics
    {
        [DataMember]
        public List<SoaStatisticsItem> Implemented { get; set; }
        [DataMember]
        public List<SoaStatisticsItem> NotImplemented { get; set; }
        [DataMember]
        public List<SoaStatisticsItem> InProgress { get; set; }
        [DataMember]
        public List<SoaStatisticsItem> DeadlinePassed { get; set; }
        [DataMember]
        public List<SoaStatisticsItem> AssetNames { get; set; }
        [DataMember]
        public int SoaType { get; set; }
    }

    [DataContract]
    public class SoaStatisticsItem
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
    }
}
