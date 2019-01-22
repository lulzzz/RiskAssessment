using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Language
{
    [DataContract]
    public class Language
    {

        [Required]
        [DataMember]
        public string Name { get; set; }

        [Required]
        [DataMember]
        public string IsoCode { get; set; }

    }
}
