
CREATE TABLE [dbo].[AttributeLinks](
    [AttributeLinkId] [int] IDENTITY(1,1) NOT NULL,
	[ParentAttributeId] [int]  NOT NULL,
	[AttributeId] [int]  NOT NULL
 CONSTRAINT [PK_AttributeLinks] PRIMARY KEY CLUSTERED 
(
	[AttributeLinkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[AttributeLinks]  WITH CHECK ADD  CONSTRAINT [FK_AttributeLinks_Attribute1] FOREIGN KEY([AttributeId])
REFERENCES [dbo].[Attributes] ([AttributeId])

ALTER TABLE [dbo].[AttributeLinks] CHECK CONSTRAINT [FK_AttributeLinks_Attribute1]

ALTER TABLE [dbo].[AttributeLinks]  WITH CHECK ADD  CONSTRAINT [FK_AttributeLinks_Attribute2] FOREIGN KEY([ParentAttributeId])
REFERENCES [dbo].[Attributes] ([AttributeId])

ALTER TABLE [dbo].[AttributeLinks] CHECK CONSTRAINT [FK_AttributeLinks_Attribute2]