
alter table Control add ResponsibleUserId int null;
alter table Process add ResponsibleUserId int null;

alter table Control drop column Responsible;
alter table Process drop column Responsible;

ALTER TABLE dbo.Process ADD CONSTRAINT FK_Process_Users FOREIGN KEY (	ResponsibleUserId) REFERENCES dbo.Users(	UserId	) ON UPDATE  NO ACTION ON DELETE  NO ACTION;
ALTER TABLE dbo.Control ADD CONSTRAINT FK_Control_Users FOREIGN KEY (ResponsibleUserId ) REFERENCES dbo.Users(	UserId	) ON UPDATE  NO ACTION  ON DELETE  NO ACTION;

alter table AssetThreat_Control add ResponsibleUserId int null;
alter table AssetThreat_Control drop column Responsible;
ALTER TABLE dbo.AssetThreat_Control ADD CONSTRAINT FK_AssetThreat_Control_Users FOREIGN KEY (ResponsibleUserId ) REFERENCES dbo.Users(	UserId	) ON UPDATE  NO ACTION  ON DELETE  NO ACTION;