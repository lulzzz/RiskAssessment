USE [RAAP]

/****** Object:  Table [dbo].[HtmlComment]    Script Date: 14.06.2015 12:56:38 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

alter table AssetThreat_Control drop constraint PK_AssetThreat_Control;

alter table AssetThreat_Control add [AssetThreatControlId] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_AssetThreat_Control] PRIMARY KEY CLUSTERED 
(
	[AssetThreatControlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY];



CREATE TABLE [dbo].[HtmlComment](
	[HtmlCommentId] [int] NOT NULL,
	[Text] [text] NULL,
	[AssetThreatId] [int] NULL,
	[AssetThreatControlId] [int] NULL,
	[AssetId] [int] NULL,
	[Revision] [int] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_HtmlComment] PRIMARY KEY CLUSTERED 
(
	[HtmlCommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


ALTER TABLE [dbo].[HtmlComment] ADD  CONSTRAINT [DF_HtmlComment_Revision]  DEFAULT ((1)) FOR [Revision]

ALTER TABLE [dbo].[HtmlComment] ADD  CONSTRAINT [DF_HtmlComment_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[HtmlComment] ADD  CONSTRAINT [DF_HtmlComment_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]

ALTER TABLE [dbo].[HtmlComment]  WITH CHECK ADD  CONSTRAINT [FK_HtmlComment_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])

ALTER TABLE [dbo].[HtmlComment] CHECK CONSTRAINT [FK_HtmlComment_Asset]

ALTER TABLE [dbo].[HtmlComment]  WITH CHECK ADD  CONSTRAINT [FK_HtmlComment_Asset_Threat] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])

ALTER TABLE [dbo].[HtmlComment] CHECK CONSTRAINT [FK_HtmlComment_Asset_Threat]

ALTER TABLE [dbo].[HtmlComment]  WITH CHECK ADD  CONSTRAINT [FK_HtmlComment_AssetThreat_Control] FOREIGN KEY([AssetThreatControlId])
REFERENCES [dbo].[AssetThreat_Control] ([AssetThreatControlId])

ALTER TABLE [dbo].[HtmlComment] CHECK CONSTRAINT [FK_HtmlComment_AssetThreat_Control]


