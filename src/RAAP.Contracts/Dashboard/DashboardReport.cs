using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Dashboard
{
    [DataContract]
    public class DashboardReport
    {
        [DataMember]
        public DateTime GeneratedDate { get; set; }

        [DataMember]
        public ICollection<string> AssetsByCategoryLabels { get; set; }

        [DataMember]
        public ICollection<int> AssetsByCategoryData { get; set; }

        [DataMember]
        public ICollection<string> ProcessesByCategoryLabels { get; set; }

        [DataMember]
        public ICollection<int> ProcessesByCategoryData { get; set; }

        [DataMember]
        public ICollection<string> ThreatsByCategoryLabels { get; set; }

        [DataMember]
        public ICollection<int> ThreatsByCategoryData { get; set; }
    }
}
