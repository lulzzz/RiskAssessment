USE [RAAP]

alter table AssetThreat_Control drop constraint [FK_AssetThreat_Control_Asset_Threat];
alter table AssetThreat_Control drop constraint [FK_AssetThreat_Control_Control];

ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Asset_Threat] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Asset_Threat];

ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Control] FOREIGN KEY([ControlId])
REFERENCES [dbo].[Control] ([ControlId])
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Control];


