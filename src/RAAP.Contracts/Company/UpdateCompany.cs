using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Company
{
    [DataContract]
    public class UpdateCompany : CreateCompany
    {
        [Required(ErrorMessage = "CompanyId is required")]
        [DataMember]
        public int CompanyId { get; set; }

    }
}
