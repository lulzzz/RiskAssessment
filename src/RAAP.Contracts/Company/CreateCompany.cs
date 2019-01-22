using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Company
{
    [DataContract]
    public class CreateCompany
    {
        [RegularExpression(@"^.{5,}$", ErrorMessage = "Company name must be 5 chars or more")]
        [Required(ErrorMessage = "Company name is required!")]
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Address1 { get; set; }
        [DataMember]
        public string Address2 { get; set; }
        [DataMember]
        public string Address3 { get; set; }
        [DataMember]
        public string Address4 { get; set; }

        [DataMember]
        public string Phone { get; set; }
        [DataMember]
        public string OrganizationNumber { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Homepage { get; set; }

    }
}
