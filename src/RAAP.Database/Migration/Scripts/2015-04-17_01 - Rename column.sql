
EXEC sp_rename 'Threat.ThreadId', 'ThreatId', 'COLUMN';

alter table Threat add CreatedOn datetime2 not null default getdate(), UpdatedOn datetime2 not null default getdate();

alter table Threat add Category nvarchar(50) null;
