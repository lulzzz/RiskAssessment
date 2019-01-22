exec sp_rename 'Threat.TransferRisk','ReduceRisk'
exec sp_rename 'Asset_Threat.TransferRisk','ReduceRisk'

alter table Threat add ShareRisk bit not null default 0, AvoidRisk bit not null default 0;
alter table Asset_Threat add ShareRisk bit not null default 0, AvoidRisk bit not null default 0;