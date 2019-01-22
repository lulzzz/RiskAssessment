using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Process
{
    [DataContract]
    public class UpdateProcess : CreateProcess
    {
        [Required]
        [DataMember]
        public int ProcessId { get; set; }
    }
}
