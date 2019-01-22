EXEC sp_rename 'Threat.Probability', 'DamageProbability', 'COLUMN';
EXEC sp_rename 'Threat.Impact', 'DamageImpact', 'COLUMN';
EXEC sp_rename 'Threat.Value', 'DamageValue', 'COLUMN';
EXEC sp_rename 'Threat.Threat', 'DamageThreat', 'COLUMN';
EXEC sp_rename 'Threat.Vulnerability', 'DamageVulnerability', 'COLUMN';

alter table Threat add ReputationProbability int not null default 1, ReputationImpact int not null default 1, ReputationValue int null , ReputationVulnerability int null ;
alter table Threat add FinancialProbability int not null default 1, FinancialImpact int not null default 1, FinancialValue int null , FinancialVulnerability int null ;

EXEC sp_rename 'Asset_Threat.Probability', 'DamageProbability', 'COLUMN';
EXEC sp_rename 'Asset_Threat.Impact', 'DamageImpact', 'COLUMN';
EXEC sp_rename 'Asset_Threat.Value', 'DamageValue', 'COLUMN';
EXEC sp_rename 'Asset_Threat.Threat', 'DamageThreat', 'COLUMN';
EXEC sp_rename 'Asset_Threat.Vulnerability', 'DamageVulnerability', 'COLUMN';

alter table Asset_Threat add ReputationProbability int not null default 1, ReputationImpact int not null default 1, ReputationValue int null, ReputationVulnerability int null ;
alter table Asset_Threat add FinancialProbability int not null default 1, FinancialImpact int not null default 1, FinancialValue int null, FinancialVulnerability int null ;

alter table Threat add FinancialThreat int null, ReputationThreat int null ;
alter table Asset_Threat add FinancialThreat int null, ReputationThreat int null ;
