using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Threat
{
    [DataContract]
    public class UpdateThreat : CreateThreat
    {
        [Required]
        [DataMember]
        public int ThreatId { get; set; }
    }
}
