using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.BusinessContinuityPlan
{
    [DataContract]
    public class BusinessContinuityPlan
    {
        [DataMember]
        public int BusinessContinuityPlanId { get; set; }

        [DataMember]
        public string Text { get; set; }

        [DataMember]
        public int Revision { get; set; }

        [DataMember]
        public DateTime CreatedOn { get; set; }
    }
}
