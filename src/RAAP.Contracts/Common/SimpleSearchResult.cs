using System.Runtime.Serialization;

namespace RAAP.Contracts.Common
{
    [DataContract]
    public class SimpleSearchResult
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }
    }
}
