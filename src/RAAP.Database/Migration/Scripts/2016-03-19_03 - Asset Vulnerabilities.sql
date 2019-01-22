/****** Object:  Table [dbo].[Asset_Vulnerability]    Script Date: 19.03.2016 22.32.14 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Asset_Vulnerability](
	[AssetId] [int] NOT NULL,
	[VulnerabilityId] [int] NOT NULL,
 CONSTRAINT [PK_Asset_Vulnerability] PRIMARY KEY CLUSTERED 
(
	[AssetId] ASC,
	[VulnerabilityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Asset_Vulnerability]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Vulnerability_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Asset_Vulnerability] CHECK CONSTRAINT [FK_Asset_Vulnerability_Asset]


ALTER TABLE [dbo].[Asset_Vulnerability]  WITH CHECK ADD  CONSTRAINT [FK_Asset_Vulnerability_Vulnerabilities] FOREIGN KEY([VulnerabilityId])
REFERENCES [dbo].[Vulnerabilities] ([VulnerabilityId])


ALTER TABLE [dbo].[Asset_Vulnerability] CHECK CONSTRAINT [FK_Asset_Vulnerability_Vulnerabilities]



