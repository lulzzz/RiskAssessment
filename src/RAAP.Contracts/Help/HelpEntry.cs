using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Help
{
    [DataContract]
    public class HelpEntry : UpdateHelpEntry
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }
    }
}
