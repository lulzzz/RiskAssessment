alter table ThreatRisk alter column ThreatId int null;
alter table ThreatRisk add 	[AssetId] [int] NULL,
	[AssetThreatId] [int] NULL;

ALTER TABLE [dbo].[ThreatRisk]  WITH CHECK ADD  CONSTRAINT [FK_ThreatRisk_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[ThreatRisk] CHECK CONSTRAINT [FK_ThreatRisk_Asset]


ALTER TABLE [dbo].[ThreatRisk]  WITH CHECK ADD  CONSTRAINT [FK_ThreatRisk_Asset_Threat] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])


ALTER TABLE [dbo].[ThreatRisk] CHECK CONSTRAINT [FK_ThreatRisk_Asset_Threat]


alter table ControlRisk alter column ControlId int null;

alter table ControlRisk add [AssetThreatControlId] [int] NULL;


ALTER TABLE [dbo].[ControlRisk]  WITH CHECK ADD  CONSTRAINT [FK_ControlRisk_AssetThreat_Control] FOREIGN KEY([AssetThreatControlId])
REFERENCES [dbo].[AssetThreat_Control] ([AssetThreatControlId])


ALTER TABLE [dbo].[ControlRisk] CHECK CONSTRAINT [FK_ControlRisk_AssetThreat_Control]


alter table ThreatRisk add 	[ProcessId] [int] NULL;

ALTER TABLE [dbo].[ThreatRisk]  WITH CHECK ADD  CONSTRAINT [FK_ThreatRisk_Process] FOREIGN KEY([ProcessId])
REFERENCES [dbo].[Process] ([ProcessId])


ALTER TABLE [dbo].[ThreatRisk] CHECK CONSTRAINT [FK_ThreatRisk_Process]
