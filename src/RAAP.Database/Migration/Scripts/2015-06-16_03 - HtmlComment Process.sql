alter table HtmlComment add ProcessId int null;

ALTER TABLE [dbo].[HtmlComment]  WITH CHECK ADD  CONSTRAINT [FK_HtmlComment_Process] FOREIGN KEY([ProcessId])
REFERENCES [dbo].[Process] ([ProcessId])

ALTER TABLE [dbo].[HtmlComment] CHECK CONSTRAINT [FK_HtmlComment_Process]
