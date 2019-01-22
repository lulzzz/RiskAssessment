using System.Runtime.Serialization;

namespace RAAP.Contracts.Common
{
    [DataContract]
    public class PagedResultItems
    {
        [DataMember]
        public int CurrentPage { get; set; }

        [DataMember]
        public int TotalPages { get; set; }

        [DataMember]
        public int TotalItems { get; set; }
    }
}
