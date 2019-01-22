/****** Object:  Table [dbo].[Asset_SoaChapter]    Script Date: 19.06.2017 20.31.50 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Asset_SoaChapter](
	[AssetId] [int] NOT NULL,
	[SoaChapterId] [int] NOT NULL,
	[Implemented] [bit] NOT NULL,
 CONSTRAINT [PK_Asset_SoaChapter] PRIMARY KEY CLUSTERED 
(
	[AssetId] ASC,
	[SoaChapterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Asset_SoaChapter] ADD  CONSTRAINT [DF_Asset_SoaChapter_Implemented]  DEFAULT ((0)) FOR [Implemented]


ALTER TABLE [dbo].[Asset_SoaChapter]  WITH CHECK ADD  CONSTRAINT [FK_Asset_SoaChapter_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Asset_SoaChapter] CHECK CONSTRAINT [FK_Asset_SoaChapter_Asset]



