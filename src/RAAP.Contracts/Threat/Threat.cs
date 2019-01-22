using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Threat
{
    [DataContract]
    public class Threat : UpdateThreat
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }
        [DataMember]
        public string AssetName { get; set; }
    }
}
