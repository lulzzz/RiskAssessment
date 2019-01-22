USE [RAAP]


/****** Object:  Table [dbo].[RiskParameter]    Script Date: 30.06.2015 13:34:50 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[RiskParameter](
	[RiskParameterId] [int] IDENTITY(1,1) NOT NULL,
	[DamageProbability] [int] NOT NULL,
	[DamageImpact] [int] NOT NULL,
	[ReputationProbability] [int] NOT NULL,
	[ReputationImpact] [int] NOT NULL,
	[FinancialProbability] [int] NOT NULL,
	[FinancialImpact] [int] NOT NULL,
	[DamageValue] [int] NOT NULL,
	[DamageThreat] [int] NOT NULL,
	[DamageVulnerability] [int] NOT NULL,
	[FinancialValue] [int] NOT NULL,
	[FinancialThreat] [int] NOT NULL,
	[FinancialVulnerability] [int] NOT NULL,
	[ReputationValue] [int] NOT NULL,
	[ReputationThreat] [int] NOT NULL,
	[ReputationVulnerability] [int] NOT NULL,
	[RiskId] [int] NOT NULL,
 CONSTRAINT [PK_RiskParameter] PRIMARY KEY CLUSTERED 
(
	[RiskParameterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [DamageProbability]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [DamageImpact]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [ReputationProbability]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [ReputationImpact]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [FinancialProbability]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [FinancialImpact]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [DamageValue]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [DamageThreat]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [DamageVulnerability]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [FinancialValue]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [FinancialThreat]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [FinancialVulnerability]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [ReputationValue]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [ReputationThreat]


ALTER TABLE [dbo].[RiskParameter] ADD  DEFAULT ((1)) FOR [ReputationVulnerability]


ALTER TABLE [dbo].[RiskParameter]  WITH CHECK ADD  CONSTRAINT [FK_RiskParameter_Risk] FOREIGN KEY([RiskId])
REFERENCES [dbo].[Risk] ([RiskId])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[RiskParameter] CHECK CONSTRAINT [FK_RiskParameter_Risk]



