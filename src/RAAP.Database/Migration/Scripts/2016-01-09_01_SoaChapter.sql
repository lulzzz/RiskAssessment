SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[SoaChapter](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[Goal] [nvarchar](1000) NULL,
	[Parent] [int] NULL,
 CONSTRAINT [PK_SoaChapter_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[SoaChapter]  WITH CHECK ADD  CONSTRAINT [FK_SoaChapter_SoaChapter] FOREIGN KEY([Parent])
REFERENCES [dbo].[SoaChapter] ([Id])


ALTER TABLE [dbo].[SoaChapter] CHECK CONSTRAINT [FK_SoaChapter_SoaChapter]



