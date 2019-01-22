alter table Control add AlertUserId int;
ALTER TABLE [dbo].[Control]  WITH CHECK ADD  CONSTRAINT [FK_Control_Users1] FOREIGN KEY([AlertUserId])
REFERENCES [dbo].[Users] ([UserId])
ALTER TABLE [dbo].[Control] CHECK CONSTRAINT [FK_Control_Users1]

alter table AssetThreat_Control add AlertUserId int;
ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Users1] FOREIGN KEY([AlertUserId])
REFERENCES [dbo].[Users] ([UserId])
ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Users1]