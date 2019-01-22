using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class CreateUser : CommonUser
    {
        [Required]
        [DataMember]
        public string Password { get; set; }

        [Required]
        [DataMember]
        public string PasswordRepeat { get; set; }

    }
}
