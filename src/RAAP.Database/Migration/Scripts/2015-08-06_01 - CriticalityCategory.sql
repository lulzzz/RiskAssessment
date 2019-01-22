USE [RAAP]


/****** Object:  Table [dbo].[CriticalityCategory]    Script Date: 06.08.2015 14.41.12 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON

alter table Asset add CriticalityCategoryId int null;

CREATE TABLE [dbo].[CriticalityCategory](
	[CriticalityCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_CriticalityCategory_CreatedOn]  DEFAULT (getdate()),
	[UpdatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_CriticalityCategory_UpdatedOn]  DEFAULT (getdate()),
 CONSTRAINT [PK_CriticalityCategory] PRIMARY KEY CLUSTERED 
(
	[CriticalityCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY];

ALTER TABLE [dbo].[Asset]  WITH CHECK ADD  CONSTRAINT [FK_Asset_CriticalityCategory] FOREIGN KEY([CriticalityCategoryId])
REFERENCES [dbo].[CriticalityCategory] ([CriticalityCategoryId])
ON UPDATE CASCADE
ON DELETE CASCADE;