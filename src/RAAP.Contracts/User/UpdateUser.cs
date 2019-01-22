using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class UpdateUser : CommonUser
    {
        [Required]
        [DataMember]
        public int UserId { get; set; }

    }
}
