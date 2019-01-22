


CREATE TABLE [dbo].[AttributeTypes](
	[AttributeTypeId] [nvarchar](20) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_AttributeTypes] PRIMARY KEY CLUSTERED 
(
	[AttributeTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[AttributeCategories](
	[AttributeCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[AttributeTypeId] [nvarchar](20) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_ThreatAttributeCategories] PRIMARY KEY CLUSTERED 
(
	[AttributeCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[AttributeCategories]  WITH CHECK ADD  CONSTRAINT [FK_AttributeCategories_AttributeTypes] FOREIGN KEY([AttributeTypeId])
REFERENCES [dbo].[AttributeTypes] ([AttributeTypeId])

ALTER TABLE [dbo].[AttributeCategories] CHECK CONSTRAINT [FK_AttributeCategories_AttributeTypes]

CREATE TABLE [dbo].[Attributes](
	[AttributeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[AttributeTypeId] [nvarchar](20) NOT NULL,
	[AttributeCategoryId] [int] NOT NULL,
	[Comment] [nvarchar](1000) NULL,
 CONSTRAINT [PK_Attributes] PRIMARY KEY CLUSTERED 
(
	[AttributeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Attributes]  WITH CHECK ADD  CONSTRAINT [FK_Attributes_AttributeCategories] FOREIGN KEY([AttributeCategoryId])
REFERENCES [dbo].[AttributeCategories] ([AttributeCategoryId])

ALTER TABLE [dbo].[Attributes] CHECK CONSTRAINT [FK_Attributes_AttributeCategories]

ALTER TABLE [dbo].[Attributes]  WITH CHECK ADD  CONSTRAINT [FK_Attributes_AttributeTypes] FOREIGN KEY([AttributeTypeId])
REFERENCES [dbo].[AttributeTypes] ([AttributeTypeId])

ALTER TABLE [dbo].[Attributes] CHECK CONSTRAINT [FK_Attributes_AttributeTypes]


CREATE TABLE [dbo].[Threat_Attributes](
	[ThreatId] [int] NOT NULL,
	[AttributeId] [int] NOT NULL,
 CONSTRAINT [PK_Threat_Attributes] PRIMARY KEY CLUSTERED 
(
	[ThreatId] ASC,
	[AttributeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Threat_Attributes]  WITH CHECK ADD  CONSTRAINT [FK_Threat_Attributes_Attributes] FOREIGN KEY([AttributeId])
REFERENCES [dbo].[Attributes] ([AttributeId])


ALTER TABLE [dbo].[Threat_Attributes] CHECK CONSTRAINT [FK_Threat_Attributes_Attributes]


ALTER TABLE [dbo].[Threat_Attributes]  WITH CHECK ADD  CONSTRAINT [FK_Threat_Attributes_Threat] FOREIGN KEY([ThreatId])
REFERENCES [dbo].[Threat] ([ThreatId])


ALTER TABLE [dbo].[Threat_Attributes] CHECK CONSTRAINT [FK_Threat_Attributes_Threat]