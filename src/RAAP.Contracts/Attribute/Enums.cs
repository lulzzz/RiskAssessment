using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Attribute
{
    [DataContract]
    public class Timeframe
    {
        [DataMember]
        public MonthTimeframe? Months { get; set; }
        [DataMember]
        public DayTimeframe? Days { get; set; }
        [DataMember]
        public HourTimeframe? Hours { get; set; }
    }

    [Flags]
    [DataContract]
    public enum MonthTimeframe
    {
        [DataMember]
        None = 0,
        [DataMember]
        Jan = 1,
        [DataMember]
        Feb = 2,
        [DataMember]
        Mar = 4,
        [DataMember]
        Apr = 8,
        [DataMember]
        May = 16,
        [DataMember]
        Jun = 32,
        [DataMember]
        Jul = 64,
        [DataMember]
        Aug = 128,
        [DataMember]
        Sep = 256,
        [DataMember]
        Oct = 512,
        [DataMember]
        Nov = 1024,
        [DataMember]
        Dec = 2048

    }

    [Flags]
    [DataContract]
    public enum DayTimeframe
    {
        [DataMember]
        None = 0,
        [DataMember]
        Mon = 1,
        [DataMember]
        Tue = 2,
        [DataMember]
        Wed = 4,
        [DataMember]
        Thu = 8,
        [DataMember]
        Fri = 16,
        [DataMember]
        Sat = 32,
        [DataMember]
        Sun = 64,
    }

    [Flags]
    [DataContract]
    public enum HourTimeframe
    {
        [DataMember]
        None = 0,
        [DataMember]
        Morning = 1,
        [DataMember]
        Evening = 2,
        [DataMember]
        Night = 4
    }
}
