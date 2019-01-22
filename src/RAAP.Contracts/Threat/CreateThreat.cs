using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using RAAP.Contracts.Risk;

namespace RAAP.Contracts.Threat
{
    [DataContract]
    public class CreateThreat
    {
        private List<Control.Control> _controls;

        [DataMember]
        public bool Enabled { get; set; }
        [DataMember]
        public int InternalExternal { get; set; }
        [DataMember]
        public int SecuritySafety { get; set; }
        [DataMember]
        public int RiskAssessmentMethod { get; set; }
        [DataMember]
        public bool Confidenciality { get; set; }
        [DataMember]
        public bool Integrity { get; set; }
        [DataMember]
        public bool Availability { get; set; }
        [DataMember]
        public bool Authenticity { get; set; }
        [DataMember]
        public bool AvoidRisk { get; set; }
        [DataMember]
        public bool ShareRisk { get; set; }
        [DataMember]
        public bool ReduceRisk { get; set; }
        [DataMember]
        public bool AcceptRisk { get; set; }
        [DataMember]
        public string RiskUser { get; set; }
        [DataMember]
        public DateTime? RiskDate { get; set; }
        [Required]
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public ThreatCategory.ThreatCategory Category { get; set; }

        private List<Evaluation.Evaluation> _evaluations;

        [DataMember]
        public List<Evaluation.Evaluation> Evaluations
        {
            get { return _evaluations ?? (_evaluations = new List<Evaluation.Evaluation>()); }
            set { _evaluations = value; }
        }

        [DataMember]
        public List<Control.Control> Controls
        {
            get { return _controls ?? (_controls = new List<Control.Control>()); }
            set { _controls = value; }
        }

        private List<Attribute.Attribute> _causes;

        [DataMember]
        public List<Attribute.Attribute> Causes
        {
            get { return _causes ?? (_causes = new List<Attribute.Attribute>()); }
            set { _causes = value; }
        }

        private List<Risk.Risk> _risks;
        [DataMember]
        public List<Risk.Risk> Risks
        {
            get
            {
                return _risks ?? (_risks = new List<Risk.Risk>());
            }
            set { _risks = value; }
        }
    }
}
