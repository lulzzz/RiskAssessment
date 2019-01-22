
alter table Asset drop column Category;

declare @sql nvarchar(300)
declare @catid nvarchar(300)
select top 1 @catid = AssetCategoryId from AssetCategory
set @sql = 'alter table Asset ADD [AssetCategoryId] [int] NOT NULL CONSTRAINT [DF_Asset_AssetCategoryId]  DEFAULT ((' + @catid + '))';
exec (@sql)



ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_AssetCategory] FOREIGN KEY([AssetCategoryId])
REFERENCES [dbo].[AssetCategory] ([AssetCategoryId])


ALTER TABLE [dbo].[Asset] CHECK CONSTRAINT [FK_Asset_AssetCategory]


alter table Threat drop column Category;



select top 1 @catid = ThreatCategoryId from ThreatCategory
set @sql = 'alter table Threat ADD [ThreatCategoryId] [int] NOT NULL DEFAULT (('+ @catid + '))';
exec (@sql)




ALTER TABLE [dbo].[Threat]  WITH CHECK ADD  CONSTRAINT [FK_Threat_ThreatCategory] FOREIGN KEY([ThreatCategoryId])
REFERENCES [dbo].[ThreatCategory] ([ThreatCategoryId])


ALTER TABLE [dbo].[Threat] CHECK CONSTRAINT [FK_Threat_ThreatCategory]

