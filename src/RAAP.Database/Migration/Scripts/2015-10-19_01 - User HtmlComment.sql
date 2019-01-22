alter table HtmlComment add UserId int;
ALTER TABLE [dbo].[HtmlComment]  WITH CHECK ADD  CONSTRAINT [FK_HtmlComment_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
ALTER TABLE [dbo].[HtmlComment] CHECK CONSTRAINT [FK_HtmlComment_Users]

