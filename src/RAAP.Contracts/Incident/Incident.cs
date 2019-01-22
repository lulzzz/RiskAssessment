using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Incident
{
    [DataContract]
    public class Incident : UpdateIncident
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }
    }
}
