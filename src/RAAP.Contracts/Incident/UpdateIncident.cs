using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Incident
{
    [DataContract]
    public class UpdateIncident : CreateIncident
    {
        [Required]
        [DataMember]
        public int IncidentId { get; set; }
    }
}
