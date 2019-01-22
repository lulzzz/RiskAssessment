

/****** Object:  Table [dbo].[Asset_Asset]    Script Date: 04.06.2015 19:47:50 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Asset_Asset](
	[FromAssetId] [int] NOT NULL,
	[ToAssetId] [int] NOT NULL,
 CONSTRAINT [PK_Asset_Asset] PRIMARY KEY CLUSTERED 
(
	[FromAssetId] ASC,
	[ToAssetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Asset_Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Asset_Asset] FOREIGN KEY([FromAssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[Asset_Asset] CHECK CONSTRAINT [FK_Asset_Asset_Asset]


ALTER TABLE [dbo].[Asset_Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Asset_Asset1] FOREIGN KEY([ToAssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[Asset_Asset] CHECK CONSTRAINT [FK_Asset_Asset_Asset1]



