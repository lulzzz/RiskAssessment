using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using Microsoft.Ajax.Utilities;
using RAAP.Contracts.Asset;
using RAAP.Contracts.Control;
using RAAP.Contracts.Process;
using RAAP.Contracts.Risk;
using RAAP.Contracts.Threat;
using RAAP.Database;
using RAAP.Web.API.Services;
using WebGrease.Css.Extensions;
using Asset = RAAP.Database.Asset;
using Process = RAAP.Database.Process;
using Risk = RAAP.Contracts.Risk.Risk;

namespace RAAP.Web.API.Helpers
{
    public static class RiskCalculator
    {
        public static void CheckRiskTypes(CreateProcess process, RAAPEntities db)
        {
            db.RiskTypes.ForEach( (Database.RiskType riskType) => 
                {
                    if(!process.Risks.Any(r => r.Type == riskType.RiskTypeId))
                    {
                        process.Risks.Add(new Risk()
                        {
                            Type = riskType.RiskTypeId,
                            Name = riskType.Name,
                        });
                    }
                }
            );
            process.Assets.ForEach(p => CheckRiskTypes(p, db));
        }

        public static void CheckRiskTypes(CreateAsset asset, RAAPEntities db)
        {
            db.RiskTypes.ForEach((Database.RiskType riskType) =>
            {
                if (!asset.Risks.Any(r => r.Type == riskType.RiskTypeId))
                {
                    asset.Risks.Add(new Risk()
                    {
                        Type = riskType.RiskTypeId,
                        Name = riskType.Name,
                    });
                }
            }
            );
            asset.Threats.ForEach(t => CheckRiskTypes(t, db));
        }

        public static void CheckRiskTypes(CreateThreat threat, RAAPEntities db)
        {
            db.RiskTypes.ForEach((Database.RiskType riskType) =>
            {
                if (!threat.Risks.Any(r => r.Type == riskType.RiskTypeId))
                {
                    threat.Risks.Add(new Risk()
                    {
                        Type = riskType.RiskTypeId,
                        Name = riskType.Name,
                    });
                }
            }
            );
            threat.Controls.ForEach(c => CheckRiskTypes(c, db));
        }

        public static void CheckRiskTypes(CreateControl control, RAAPEntities db)
        {
            db.RiskTypes.ForEach((Database.RiskType riskType) =>
            {
                if (!control.Risks.Any(r => r.Type == riskType.RiskTypeId))
                {
                    control.Risks.Add(new RiskReduce()
                    {
                        Type = riskType.RiskTypeId,
                        Name = riskType.Name,
                    });
                }
            }
            );
        }

        public static void CalculateRisk(CreateProcess process)
        {
            process.Risks.ForEach(r => process.Assets.SelectMany(a => a.Risks.Where(rr => rr.Type == r.Type)).ForEach(rr => AddRisk(r, rr)  ));
        }

        public static void AddRisk(Risk parent, Risk child)
        {
            //Calculate highest risk
            //Set highest base and calculated risk
            parent.IsoImpact = Math.Max(parent.IsoImpact, child.IsoImpact);
            parent.IsoProbability = Math.Max(parent.IsoProbability, child.IsoProbability);
            parent.IsoRisk = Math.Max(parent.IsoRisk, child.IsoRisk);

            parent.NsValue = Math.Max(parent.NsValue, child.NsValue);
            parent.NsVulnerability = Math.Max(parent.NsVulnerability, child.NsVulnerability);
            parent.NsThreat = Math.Max(parent.NsThreat, child.NsThreat);
            parent.NsRisk = Math.Max(parent.NsRisk, child.NsRisk);

            parent.CalculatedIsoImpact = Math.Max(parent.CalculatedIsoImpact, child.CalculatedIsoImpact);
            parent.CalculatedIsoProbability = Math.Max(parent.CalculatedIsoProbability, child.CalculatedIsoProbability);
            parent.CalculatedIsoRisk = Math.Max(parent.CalculatedIsoRisk, child.CalculatedIsoRisk);

            parent.CalculatedNsValue = Math.Max(parent.CalculatedNsValue, child.CalculatedNsValue);
            parent.CalculatedNsVulnerability = Math.Max(parent.CalculatedNsVulnerability, child.CalculatedNsVulnerability);
            parent.CalculatedNsThreat = Math.Max(parent.CalculatedNsThreat, child.CalculatedNsThreat);
            parent.CalculatedNsRisk = Math.Max(parent.CalculatedNsRisk, child.CalculatedNsRisk);
        }

        public static void AddRisk(RAAP.Database.ThreatRisk parent, RAAP.Database.ThreatRisk child)
        {
            //Calculate highets risk
            //Set highest base and calculated risk
            parent.IsoImpact = Math.Max(parent.IsoImpact, child.IsoImpact);
            parent.IsoProbability = Math.Max(parent.IsoProbability, child.IsoProbability);
            parent.IsoRisk = parent.IsoImpact * parent.IsoProbability; //Math.Max(parent.IsoRisk, child.IsoRisk);

            parent.NsValue = Math.Max(parent.NsValue, child.NsValue);
            parent.NsVulnerability = Math.Max(parent.NsVulnerability, child.NsVulnerability);
            parent.NsThreat = Math.Max(parent.NsThreat, child.NsThreat);
            parent.NsRisk = parent.NsThreat * parent.NsVulnerability * parent.NsValue;//Math.Max(parent.NsRisk, child.NsRisk);

            
            parent.CalculatedIsoImpact = Math.Max(parent.CalculatedIsoImpact, child.CalculatedIsoImpact);
            parent.CalculatedIsoProbability = Math.Max(parent.CalculatedIsoProbability, child.CalculatedIsoProbability);
            parent.CalculatedIso = parent.CalculatedIsoImpact * parent.CalculatedIsoProbability; //Math.Max(parent.CalculatedIso, child.CalculatedIso);

            parent.CalculatedNsValue = Math.Max(parent.CalculatedNsValue, child.CalculatedNsValue);
            parent.CalculatedNsVulnerability = Math.Max(parent.CalculatedNsVulnerability, child.CalculatedNsVulnerability);
            parent.CalculatedNsThreat = Math.Max(parent.CalculatedNsThreat, child.CalculatedNsThreat);
            parent.CalculatedNs = parent.CalculatedNsValue * parent.CalculatedNsVulnerability * parent.CalculatedNsThreat; //Math.Max(parent.CalculatedNs, child.CalculatedNs);
        }

        internal static void ResetCalculatedRisk(Database.Threat threat)
        {
            threat.ThreatRisks.ForEach(ResetCalculatedRisk);
        }

        public static void ReduceRisk(Risk parent, RiskReduce child)
        {
            parent.CalculatedIsoProbability = Math.Max(1, (int)Math.Round(parent.CalculatedIsoProbability * (1f - (double)child.IsoProbability / 100f)));
            parent.CalculatedIsoImpact = Math.Max(1, (int)Math.Round(parent.CalculatedIsoImpact * (1f - (double)child.IsoImpact / 100f)));
            parent.CalculatedNsValue = Math.Max(1, (int)Math.Round(parent.CalculatedNsValue * (1f - (double)child.NsValue / 100f)));
            parent.CalculatedNsThreat = Math.Max(1, (int)Math.Round(parent.CalculatedNsThreat * (1f - (double)child.NsThreat / 100f)));
            parent.CalculatedNsVulnerability = Math.Max(1, (int)Math.Round(parent.CalculatedNsVulnerability * (1f - (double)child.NsVulnerability / 100f)));

            parent.CalculatedIsoRisk = parent.CalculatedIsoImpact * parent.CalculatedIsoProbability;
            parent.CalculatedNsRisk = parent.CalculatedNsValue * parent.CalculatedNsThreat * parent.CalculatedNsVulnerability;
        }

        public static void ReduceRisk(Database.ThreatRisk parent, Database.ControlRisk child)
        {
            parent.CalculatedIsoProbability = Math.Max(1, (int)Math.Round(parent.CalculatedIsoProbability * (1f - (double)child.IsoProbability / 100f)));
            parent.CalculatedIsoImpact = Math.Max(1, (int)Math.Round(parent.CalculatedIsoImpact * (1f - (double)child.IsoImpact / 100f)));
            parent.CalculatedNsValue = Math.Max(1, (int)Math.Round(parent.CalculatedNsValue * (1f - (double)child.NsValue / 100f)));
            parent.CalculatedNsThreat = Math.Max(1, (int)Math.Round(parent.CalculatedNsThreat * (1f - (double)child.NsThreat / 100f)));
            parent.CalculatedNsVulnerability = Math.Max(1, (int)Math.Round(parent.CalculatedNsVulnerability * (1f - (double)child.NsVulnerability / 100f)));

            parent.CalculatedIso = parent.CalculatedIsoImpact * parent.CalculatedIsoProbability;
            parent.CalculatedNs = parent.CalculatedNsValue * parent.CalculatedNsThreat * parent.CalculatedNsVulnerability;
        }

        /// <summary>
        /// Calculating new risk on a DB Asset. Only use this when an asset has changed and you want to update risks on assets that depends on this.
        /// </summary>
        /// <param name="asset"></param>
        /// <param name="recalculateThreats"></param>
        public static void CalculateRisk(Asset asset, bool recalculateThreats = true)
        {
            //Reset asset and threats
            asset.ThreatRisks.ForEach(RiskCalculator.ResetRisk);
            if (recalculateThreats)
            {
                asset.Asset_Threat.SelectMany(t => t.ThreatRisks).ForEach(RiskCalculator.ResetCalculatedRisk);
                //Apply controls to threats
                asset.Asset_Threat.ForEach(
                    threat =>
                        threat.ThreatRisks.ForEach(
                            threatRisk =>
                                threat.AssetThreat_Control.SelectMany(
                                    control =>
                                        control.ControlRisks.Where(controlRisk => controlRisk.Type == threatRisk.Type))
                                    .ForEach(controlRisk => ReduceRisk(threatRisk, controlRisk))));
            }
            //Apply risks from assets and threats this asset depends on
            asset.ThreatRisks.ForEach(r => asset.Children.SelectMany(a => a.Child.ThreatRisks.Where(rr => rr.Type == r.Type)).ForEach(rr => AddRisk(r, rr)));
            asset.ThreatRisks.ForEach(tr => asset.Asset_Threat.SelectMany(at => at.ThreatRisks.Where(atr => atr.Type == tr.Type)).ForEach(atr => AddRisk(tr, atr)));
            //Calculate new risks on assets that depends on this asset, but don't recalculate threats
            asset.Parents.Select(a => a.Parent).ForEach(a => RiskCalculator.CalculateRisk(a, false));
            //Calculate new risks on processes that depends on this asset
            asset.Processes.ForEach(RiskCalculator.CalculateRisk);
        }

        internal static void CalculateRisk(Database.Threat threat)
        {
            threat.ThreatRisks.ForEach(r => threat.Controls.SelectMany(c => c.ControlRisks.Where(cr => cr.Type == r.Type)).ForEach(ctr => ReduceRisk(r, ctr)));
        }

        public static void CalculateRisk(Process process)
        {
            process.ThreatRisks.ForEach(ResetRisk);
            process.ThreatRisks.ForEach(tr => process.Assets.SelectMany(a => a.ThreatRisks.Where(at => at.Type == tr.Type)).ForEach(atr => AddRisk(tr, atr)));
        }

        private static void CalculateRisk(Risk risk)
        {
            risk.IsoRisk = risk.IsoImpact*risk.IsoProbability;
            risk.NsRisk = risk.NsValue*risk.NsThreat*risk.NsVulnerability;
        }

        public static void CalculateRisk(CreateThreat threat)
        {
            threat.Risks.ForEach(CalculateRisk);
            threat.Risks.ForEach(r => threat.Controls.SelectMany(c => c.Risks.Where(cr => cr.Type == r.Type)).ForEach(ctr => ReduceRisk(r, ctr)));
        }

        public static void ResetCalculatedRisk(Risk risk)
        {
            risk.CalculatedIsoImpact = risk.CalculatedIsoProbability = risk.CalculatedIsoRisk =
                risk.CalculatedNsRisk =
                    risk.CalculatedNsThreat = risk.CalculatedNsValue = risk.CalculatedNsVulnerability = 1;
            risk.IsoRisk = risk.IsoProbability * risk.IsoImpact;
            risk.NsRisk = risk.NsVulnerability * risk.NsThreat * risk.NsValue;
        }

        public static void ResetRisk(Risk risk)
        {
            risk.IsoImpact = risk.IsoProbability = risk.IsoRisk =
                risk.NsRisk =
                    risk.NsThreat = risk.NsValue = risk.NsVulnerability = 1;
            ResetCalculatedRisk(risk);
        }

        public static void ResetCalculatedRisk(Database.ThreatRisk risk)
        {
            risk.CalculatedIsoImpact = risk.IsoImpact;
            risk.CalculatedIsoProbability = risk.IsoProbability;
            risk.CalculatedNsThreat = risk.NsThreat;
            risk.CalculatedNsValue = risk.NsValue;
            risk.CalculatedNsVulnerability = risk.NsVulnerability;
            risk.IsoRisk = risk.IsoProbability*risk.IsoImpact;
            risk.NsRisk = risk.NsVulnerability*risk.NsThreat*risk.NsValue;
            risk.CalculatedIso = risk.IsoRisk;
            risk.CalculatedNs = risk.NsRisk;
        }

        public static void ResetRisk(Database.ThreatRisk risk)
        {
            risk.IsoImpact = risk.IsoProbability = risk.IsoRisk =
                risk.NsRisk =
                    risk.NsThreat = risk.NsValue = risk.NsVulnerability = 1;
            ResetCalculatedRisk(risk);
        }
    }
}