using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Help
{
    [DataContract]
    public class UpdateHelpEntry : CreateHelpEntry
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }

    }
}
