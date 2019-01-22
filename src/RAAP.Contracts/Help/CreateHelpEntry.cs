using System.Runtime.Serialization;

namespace RAAP.Contracts.Help
{
    [DataContract]
    public class CreateHelpEntry
    {
        [DataMember]
        public string Language { get; set; }
        [DataMember]
        public string Slug { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Description { get; set; }


    }
}
