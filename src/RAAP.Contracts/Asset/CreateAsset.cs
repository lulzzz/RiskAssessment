using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Asset
{
    [DataContract]
    public class CreateAsset
    {
        private List<Threat.Threat> _threats;
        private List<Asset> _assets;

        [DataMember]
        public bool Enabled { get; set; }
        [DataMember]
        public int? SystemRecoveryTime { get; set; }
        [DataMember]
        public int? DataRecoveryTime { get; set; }
        [DataMember]
        public int? IntegrityCheckTime { get; set; }
        [DataMember]
        public int? MaxDownTime { get; set; }
        [DataMember]
        public int Confidenciality { get; set; }
        [DataMember]
        public int Integrity { get; set; }
        [DataMember]
        public int Availability { get; set; }
        [DataMember]
        public int Authenticity { get; set; }
        [DataMember]
        public bool RequiresBusinessContinuityPlan { get; set; }
        [DataMember]
        public decimal? SystemRecoveryCost { get; set; }
        [DataMember]
        public decimal? DataRecoveryCost { get; set; }
        [DataMember]
        public decimal? IntegrityCheckCost { get; set; }
        [DataMember]
        public decimal? MaxDownCost { get; set; }
        [Required]
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string AggregatedStatus { get; set; }

        [DataMember]
        public AssetSubCategory.AssetSubCategory SubCategory { get; set; }

        [DataMember]
        public AssetCategory Category { get; set; }

        [DataMember]
        public List<Threat.Threat> Threats
        {
            get { return _threats ?? (_threats = new List<Threat.Threat>()); }
            set { _threats = value; }
        }

        [DataMember]
        public List<Vulnerability.Vulnerability> Vulnerabilities
        {
            get { return _vulnerabilities ?? (_vulnerabilities = new List<Vulnerability.Vulnerability>()); }
            set { _vulnerabilities = value; }
        }

        [DataMember]
        public CriticalityCategory.CriticalityCategory CriticalityCategory { get; set; }

        private List<Evaluation.Evaluation> _evaluations;
        private List<TimeCost> _timeCosts;
        private List<BusinessContinuityPlan.BusinessContinuityPlan> _businessContinuityPlan;
        private List<Vulnerability.Vulnerability> _vulnerabilities;

        [DataMember]
        public List<Evaluation.Evaluation> Evaluations
        {
            get { return _evaluations ?? (_evaluations = new List<Evaluation.Evaluation>()); }
            set { _evaluations = value; }
        }

        [DataMember]
        public List<BusinessContinuityPlan.BusinessContinuityPlan> BusinessContinuityPlans
        {
            get { return _businessContinuityPlan ?? (_businessContinuityPlan = new List<BusinessContinuityPlan.BusinessContinuityPlan>()); }
            set { _businessContinuityPlan = value; }
        }

        [DataMember]
        public List<Asset> Assets
        {
            get { return _assets ?? (_assets = new List<Asset>()); }
            set { _assets = value; }
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
        [DataMember]
        public List<TimeCost> TimeCosts
        {
            get { return _timeCosts ?? (_timeCosts = new List<TimeCost>()); }
            set { _timeCosts = value; }
        }

        [DataMember]
        public DateTime? DueDate { get; set; }

        [DataMember]
        public decimal? MaintenanceCost { get; set; }
        [DataMember]
        public decimal? InvestmentCost { get; set; }

        [DataMember]
        public bool CalculateSubCriticality { get; set; }
        [DataMember]
        public bool CalculateSubRecovery { get; set; }
    }
}
