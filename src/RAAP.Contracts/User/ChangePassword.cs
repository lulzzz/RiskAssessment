using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class ChangePassword
    {
        [Required]
        [DataMember]
        public int UserId { get; set; }

        [Required]
        [DataMember]
        public string Password { get; set; }

        [Required]
        [DataMember]
        public string NewPassword { get; set; }

        [Required]
        [DataMember]
        public string NewPasswordRepeat { get; set; }

    }

    [DataContract]
    public class RecoverPassword
    {
        [Required]
        [DataMember]
        public string Username { get; set; }

    }

    [DataContract]
    public class RecoverSetPassword
    {
        [Required(ErrorMessage = "Recover password is required!")]
        [DataMember]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "New password is required!")]
        [DataMember]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "New password repeat is required!")]
        [DataMember]
        public string NewPasswordRepeat { get; set; }

    }
}
