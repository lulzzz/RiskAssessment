
/****** Object:  Table [dbo].[Process_Asset]    Script Date: 28.05.2015 22:30:45 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Process_Asset](
	[ProcessId] [int] NOT NULL,
	[AssetId] [int] NOT NULL,
 CONSTRAINT [PK_Process_Asset] PRIMARY KEY CLUSTERED 
(
	[ProcessId] ASC,
	[AssetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Process_Asset]  WITH CHECK ADD  CONSTRAINT [FK_Process_Asset_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[Process_Asset] CHECK CONSTRAINT [FK_Process_Asset_Asset]


ALTER TABLE [dbo].[Process_Asset]  WITH CHECK ADD  CONSTRAINT [FK_Process_Asset_Process] FOREIGN KEY([ProcessId])
REFERENCES [dbo].[Process] ([ProcessId])


ALTER TABLE [dbo].[Process_Asset] CHECK CONSTRAINT [FK_Process_Asset_Process]



