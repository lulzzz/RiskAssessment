using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Process
{
    [DataContract]
    public class CreateProcess
    {
        private List<Asset.Asset> _assets;

        [Required]
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public bool Enabled { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public ProcessCategory.ProcessCategory Category { get; set; }

        private List<Evaluation.Evaluation> _evaluations;

        [DataMember]
        public int? ResponsibleUserId { get; set; }

        [DataMember]
        public List<Evaluation.Evaluation> Evaluations
        {
            get { return _evaluations ?? (_evaluations = new List<Evaluation.Evaluation>()); }
            set { _evaluations = value; }
        }

        [DataMember]
        public List<Asset.Asset> Assets
        {
            get { return _assets ?? (_assets = new List<Asset.Asset>()); }
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
    }
}
