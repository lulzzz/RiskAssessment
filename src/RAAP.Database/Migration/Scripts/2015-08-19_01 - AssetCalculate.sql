alter table Asset add CalculateSubCriticality bit not null default 0, CalculateSubRecovery bit not null default 0;
alter table Asset_Asset add RecoveryCalculateType int not null default 0;