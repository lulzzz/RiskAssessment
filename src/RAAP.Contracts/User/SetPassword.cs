using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class SetPassword
    {
        [Required]
        [DataMember]
        public int UserId { get; set; }

        [Required]
        [DataMember]
        public string Password { get; set; }

    }
}
