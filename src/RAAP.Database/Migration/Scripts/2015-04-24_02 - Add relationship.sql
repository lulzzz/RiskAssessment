

/****** Object:  Table [dbo].[Asset_Threat]    Script Date: 24.04.2015 15:32:06 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Asset_Threat](
	[AssetId] [int] NOT NULL,
	[ThreatId] [int] NOT NULL,
 CONSTRAINT [PK_Asset_Threat] PRIMARY KEY CLUSTERED 
(
	[AssetId] ASC,
	[ThreatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Asset_Threat]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Threat_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Asset_Threat] CHECK CONSTRAINT [FK_Asset_Threat_Asset]


ALTER TABLE [dbo].[Asset_Threat]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Threat_Threat] FOREIGN KEY([ThreatId])
REFERENCES [dbo].[Threat] ([ThreatId])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Asset_Threat] CHECK CONSTRAINT [FK_Asset_Threat_Threat]



