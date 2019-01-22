use [RAAP]

ALTER TABLE [dbo].[AssetThreat_Control]  DROP CONSTRAINT [FK_AssetThreat_Control_Users]

ALTER TABLE [dbo].[AssetThreat_Control]  DROP CONSTRAINT [FK_AssetThreat_Control_Users1]

ALTER TABLE [dbo].[Control] DROP CONSTRAINT [FK_Control_Users]

ALTER TABLE [dbo].[Control] DROP CONSTRAINT [FK_Control_Users1]

ALTER TABLE [dbo].HtmlComment DROP CONSTRAINT FK_HtmlComment_Users

ALTER TABLE [dbo].Process DROP CONSTRAINT FK_Process_Users

ALTER TABLE [dbo].[Soa] DROP CONSTRAINT [FK_Soa_Implementation]

ALTER TABLE [dbo].[Soa] DROP CONSTRAINT [FK_Soa_Responsible]

ALTER TABLE [dbo].[Soa] DROP CONSTRAINT FK_Soa_SoaChapter

DROP TABLE Help
DROP TABLE Languages
DROP TABLE UserRoles
DROP TABLE Roles
DROP TABLE Users
DROP TABLE Companies
DROP TABLE Migrations
DROP TABLE SoaChapter