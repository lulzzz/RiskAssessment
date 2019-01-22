using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.User
{
    [DataContract]
    public class ProfileImage
    {
        [Required]
        [DataMember]
        public byte[] Image { get; set; }

        [DataMember]
        public string ContentType { get; set; }

    }
}
