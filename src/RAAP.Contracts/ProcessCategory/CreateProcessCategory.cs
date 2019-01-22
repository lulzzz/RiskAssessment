using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.ProcessCategory
{
    [DataContract]
    public class CreateProcessCategory
    {
        [Required]
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }
    }

}
