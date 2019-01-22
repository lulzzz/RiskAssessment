using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class CommonUser
    {
        [Required]
        [DataMember]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [DataMember]
        public string Username { get; set; }
        [Required]
        [DataMember]
        public string FirstName { get; set; }

        [Required]
        [DataMember]
        public string LastName { get; set; }

        [Required]
        [DataMember]
        public int CompanyId { get; set; }

        [DataMember]
        public string[] Roles { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public string Phone { get; set; }

        [DataMember]
        public string Department { get; set; }

        public string DisplayName
        {
            get { return FirstName + " " + LastName; }
        }
    }
}
