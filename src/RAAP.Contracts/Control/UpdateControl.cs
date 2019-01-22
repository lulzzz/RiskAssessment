using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Control
{
    [DataContract]
    public class UpdateControl : CreateControl
    {
        [Required]
        [DataMember]
        public int ControlId { get; set; }
    }
}
