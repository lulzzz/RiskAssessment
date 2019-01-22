
alter table Threat drop column Risk;
alter table Asset drop column Risk;

alter table Threat add Probability int not null default 3, Impact int not null default 3;