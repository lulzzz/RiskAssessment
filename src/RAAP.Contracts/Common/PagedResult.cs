using System.Runtime.Serialization;

namespace RAAP.Contracts.Common
{
    [DataContract]
    public class PagedResult<T> : PagedResultItems
    {
        [DataMember]
        public T[] Items { get; set; }
    }
}
