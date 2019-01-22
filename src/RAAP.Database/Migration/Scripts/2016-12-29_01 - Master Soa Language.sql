/****** Object:  Table [dbo].[SoaChapterItems]    Script Date: 29.12.2016 18.02.40 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[SoaChapterItems](
	[SoaChapterItemsId] [int] IDENTITY(1,1) NOT NULL,
	[SoaChapterId] [int] NOT NULL,
	[IsoCode] [nvarchar](10) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[Goal] [nvarchar](1000) NULL,
	[HowTo] [text] NULL,
	[Info] [text] NULL,
 CONSTRAINT [PK_SoaChapterItems] PRIMARY KEY CLUSTERED 
(
	[SoaChapterItemsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



ALTER TABLE [dbo].[SoaChapterItems]  WITH CHECK ADD  CONSTRAINT [FK_SoaChapterItems_Languages] FOREIGN KEY([IsoCode])
REFERENCES [dbo].[Languages] ([IsoCode])


ALTER TABLE [dbo].[SoaChapterItems] CHECK CONSTRAINT [FK_SoaChapterItems_Languages]


ALTER TABLE [dbo].[SoaChapterItems]  WITH CHECK ADD  CONSTRAINT [FK_SoaChapterItems_SoaChapter] FOREIGN KEY([SoaChapterId])
REFERENCES [dbo].[SoaChapter] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[SoaChapterItems] CHECK CONSTRAINT [FK_SoaChapterItems_SoaChapter]



