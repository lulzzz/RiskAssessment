USE [RAAP]


/****** Object:  Table [dbo].[Risk]    Script Date: 24.06.2015 15:31:22 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Risk](
	[RiskId] [int] IDENTITY(1,1) NOT NULL,
	[DamageIsoRisk] [int] NOT NULL,
	[FinancialIsoRisk] [int] NOT NULL,
	[ReputationIsoRisk] [int] NOT NULL,
	[DamageNsRisk] [int] NOT NULL,
	[FinancialNsRisk] [int] NOT NULL,
	[ReputationNsRisk] [int] NOT NULL,
	[AssetThreatId] [int] NULL,
	[ProcessId] [int] NULL,
	[AssetId] [int] NULL,
 CONSTRAINT [PK_Risk] PRIMARY KEY CLUSTERED 
(
	[RiskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Risk] ADD  CONSTRAINT [DF_Risk_DamageIsoRisk]  DEFAULT ((1)) FOR [DamageIsoRisk]


ALTER TABLE [dbo].[Risk] ADD  CONSTRAINT [DF_Risk_FinancialIsoRisk]  DEFAULT ((1)) FOR [FinancialIsoRisk]


ALTER TABLE [dbo].[Risk] ADD  CONSTRAINT [DF_Risk_ReputationIsoRisk]  DEFAULT ((1)) FOR [ReputationIsoRisk]


ALTER TABLE [dbo].[Risk] ADD  CONSTRAINT [DF_Risk_DamageNsRisk]  DEFAULT ((1)) FOR [DamageNsRisk]


ALTER TABLE [dbo].[Risk] ADD  CONSTRAINT [DF_Risk_FinancialNsRisk]  DEFAULT ((1)) FOR [FinancialNsRisk]


ALTER TABLE [dbo].[Risk] ADD  CONSTRAINT [DF_Risk_ReputationNsRisk]  DEFAULT ((1)) FOR [ReputationNsRisk]


ALTER TABLE [dbo].[Risk]  WITH CHECK ADD  CONSTRAINT [FK_Risk_Asset_Threat] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])


ALTER TABLE [dbo].[Risk] CHECK CONSTRAINT [FK_Risk_Asset_Threat]


ALTER TABLE [dbo].[Risk]  WITH CHECK ADD  CONSTRAINT [FK_Risk_Process] FOREIGN KEY([ProcessId])
REFERENCES [dbo].[Process] ([ProcessId])


ALTER TABLE [dbo].[Risk] CHECK CONSTRAINT [FK_Risk_Process]


ALTER TABLE [dbo].[Risk]  WITH CHECK ADD  CONSTRAINT [FK_Risk_Risk] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[Risk] CHECK CONSTRAINT [FK_Risk_Risk]



