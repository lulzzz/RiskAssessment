using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using RAAP.Contracts.Risk;

namespace RAAP.Contracts.Control
{
    [DataContract]
    public class CreateControl
    {
        [DataMember] public DateTime? ExecutedDate;
        [DataMember] public bool Enabled { get; set; }

        [DataMember]
        public bool Detect { get; set; }
        [DataMember]
        public bool Prevent { get; set; }
        [DataMember]
        public bool Avoid { get; set; }
        [DataMember]
        public bool React { get; set; }

        [DataMember] public DateTime? ValidTo;

        [DataMember] public DateTime? Deadline;

        [DataMember] public ControlStatus Status;

        [DataMember] public ControlType Type;

        private List<RiskReduce> _risks;
        [DataMember] public List<RiskReduce> Risks
        {
            get
            {
                return _risks ?? (_risks = new List<RiskReduce>());
            }
            set
            {
                _risks = value;
            }
        }

        [DataMember] public bool LegalObligation;

        [DataMember] public decimal? InvestmentCost;

        [DataMember] public decimal? MaintenanceCost;

        [Required]
        [DataMember] public string Name;

        [DataMember] public string Description;

        [DataMember] public int? ResponsibleUserId;

        private List<Evaluation.Evaluation> _evaluations;
        [DataMember] public int? AlertUserId;

        [DataMember] public DateTime? AlertDate;

        [DataMember]
        public List<Evaluation.Evaluation> Evaluations
        {
            get { return _evaluations ?? (_evaluations = new List<Evaluation.Evaluation>()); }
            set { _evaluations = value; }
        }

        [DataMember] public ControlCategory.ControlCategory Category { get; set; }
    }
}
