alter table HtmlComment add ThreatId int null;
ALTER TABLE [dbo].[HtmlComment]  WITH CHECK ADD  CONSTRAINT [FK_HtmlComment_Threat] FOREIGN KEY([ThreatId])
REFERENCES [dbo].[Threat] ([ThreatId]);
ALTER TABLE [dbo].[HtmlComment] CHECK CONSTRAINT [FK_HtmlComment_Threat];