using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.CriticalityCategory
{
    [DataContract]
    public class UpdateCriticalityCategory : CreateCriticalityCategory
    {
        [Required]
        [DataMember]
        public int CriticalityCategoryId { get; set; }
    }
}
