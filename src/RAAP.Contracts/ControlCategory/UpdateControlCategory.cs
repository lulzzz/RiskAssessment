using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.ControlCategory
{
    [DataContract]
    public class UpdateControlCategory : CreateControlCategory
    {
        [Required]
        [DataMember]
        public int ControlCategoryId { get; set; }
    }
}
