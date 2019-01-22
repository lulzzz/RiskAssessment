using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.ThreatCategory
{
    [DataContract]
    public class UpdateThreatCategory : CreateThreatCategory
    {
        [Required]
        [DataMember]
        public int ThreatCategoryId { get; set; }
    }
}
