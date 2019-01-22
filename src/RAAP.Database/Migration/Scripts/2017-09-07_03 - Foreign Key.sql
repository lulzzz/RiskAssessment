
ALTER TABLE [dbo].[Asset_SoaChapter]  WITH CHECK ADD  CONSTRAINT [FK_Asset_SoaChapter_Soa] FOREIGN KEY([SoaId])
REFERENCES [dbo].[Soa] ([SoaId])


ALTER TABLE [dbo].[Asset_SoaChapter] CHECK CONSTRAINT [FK_Asset_SoaChapter_Soa]



