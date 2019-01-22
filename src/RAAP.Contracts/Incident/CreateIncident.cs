using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Incident
{
    [DataContract]
    public class CreateIncident
    {
        [DataMember] public DateTime? ExecutedDate;

        [DataMember] public DateTime? ValidTo;

        [DataMember] public DateTime? Deadline;

        [DataMember] public IncidentStatus Status;

        [DataMember] public IncidentType Type;

        [DataMember] public double Probability;

        [DataMember] public double Impact;

        [DataMember] public double Value;

        [DataMember] public double Vulnerability;

        [DataMember] public double Threat;

        [DataMember] public bool Executed;

        [DataMember] public bool LegalObligation;

        [DataMember] public decimal? InvestmentCost;

        [DataMember] public decimal? MaintenanceCost;

        [Required]
        [DataMember] public string Name;

        [DataMember] public string Description;

        [DataMember] public string Responsible;
    }
}
