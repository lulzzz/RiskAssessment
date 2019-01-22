using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Evaluation
{
    [DataContract]
    public class Evaluation
    {
        [DataMember]
        public int EvaluationId { get; set; }
        [DataMember]
        public string Text { get; set; }
        [DataMember]
        public int Revision { get; set; }
        [DataMember]
        public DateTime CreatedOn { get; set; }
        [DataMember]
        public User.User User { get; set; }
    }
}
