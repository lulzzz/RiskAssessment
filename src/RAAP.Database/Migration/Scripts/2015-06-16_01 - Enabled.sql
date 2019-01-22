alter table Asset add Enabled bit not null default 1;
alter table Asset_Threat add Enabled bit not null default 1;
alter table AssetThreat_Control add Enabled bit not null default 1;
alter table Process add Enabled bit not null default 1;