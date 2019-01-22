
CREATE TABLE [dbo].[AssetThreat_Attributes](
    [AssetThreatAttributeId] [int] IDENTITY(1,1) NOT NULL,
	[AttributeId] [int]  NOT NULL,
	[AssetThreatId] [int]  NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[AttributeTypeId] [nvarchar](20) NOT NULL,
	[AttributeCategoryId] [int] NOT NULL,
	[Comment] [nvarchar](1000) NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[MonthTimeframe] [int] NULL,
	[DayTimeframe] [int] NULL,
	[HourTimeframe] [int] NULL,
 CONSTRAINT [PK_AssetThreat_Attributes] PRIMARY KEY CLUSTERED 
(
	[AssetThreatAttributeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[AssetThreat_Attributes]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Attributes_AttributeCategories] FOREIGN KEY([AttributeCategoryId])
REFERENCES [dbo].[AttributeCategories] ([AttributeCategoryId])


ALTER TABLE [dbo].[AssetThreat_Attributes] CHECK CONSTRAINT [FK_AssetThreat_Attributes_AttributeCategories]


ALTER TABLE [dbo].[AssetThreat_Attributes]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Attributes_AttributeTypes] FOREIGN KEY([AttributeTypeId])
REFERENCES [dbo].[AttributeTypes] ([AttributeTypeId])


ALTER TABLE [dbo].[AssetThreat_Attributes] CHECK CONSTRAINT [FK_AssetThreat_Attributes_AttributeTypes]





ALTER TABLE [dbo].[AssetThreat_Attributes]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Attributes_AttributeId] FOREIGN KEY([AttributeId])
REFERENCES [dbo].[Attributes] ([AttributeId])


ALTER TABLE [dbo].[AssetThreat_Attributes] CHECK CONSTRAINT [FK_AssetThreat_Attributes_AttributeId]




ALTER TABLE [dbo].[AssetThreat_Attributes]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Attributes_AssetThreatId] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])


ALTER TABLE [dbo].[AssetThreat_Attributes] CHECK CONSTRAINT [FK_AssetThreat_Attributes_AssetThreatId]