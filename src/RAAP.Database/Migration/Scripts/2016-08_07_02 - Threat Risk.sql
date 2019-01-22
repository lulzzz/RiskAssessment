/****** Object:  Table [dbo].[ThreatRisk]    Script Date: 07.08.2016 13.57.39 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[ThreatRisk](
	[ThreatRiskId] [int] IDENTITY(1,1) NOT NULL,
	[ThreatId] [int] NOT NULL,
	[Type] [int] NOT NULL,
	[IsoProbability] [int] NOT NULL,
	[IsoImpact] [int] NOT NULL,
	[NsValue] [int] NOT NULL,
	[NsThreat] [int] NOT NULL,
	[NsVulnerability] [int] NOT NULL,
 CONSTRAINT [PK_Threat_Risk] PRIMARY KEY CLUSTERED 
(
	[ThreatRiskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[ThreatRisk]  WITH CHECK ADD  CONSTRAINT [FK_Threat_Risk_Threat] FOREIGN KEY([ThreatId])
REFERENCES [dbo].[Threat] ([ThreatId])


ALTER TABLE [dbo].[ThreatRisk] CHECK CONSTRAINT [FK_Threat_Risk_Threat]



