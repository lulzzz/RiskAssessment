/****** Object:  Table [dbo].[ThreatRisk]    Script Date: 07.08.2016 13.57.39 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[ControlRisk](
	[ControlRiskId] [int] IDENTITY(1,1) NOT NULL,
	[ControlId] [int] NOT NULL,
	[Type] [int] NOT NULL,
	[IsoProbability] [int] NOT NULL,
	[IsoImpact] [int] NOT NULL,
	[NsValue] [int] NOT NULL,
	[NsThreat] [int] NOT NULL,
	[NsVulnerability] [int] NOT NULL,
 CONSTRAINT [PK_ControlRisk] PRIMARY KEY CLUSTERED 
(
	[ControlRiskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[ControlRisk]  WITH CHECK ADD  CONSTRAINT [FK_ControlRisk_Control] FOREIGN KEY([ControlId])
REFERENCES [dbo].[Control] ([ControlId])


ALTER TABLE [dbo].[ControlRisk] CHECK CONSTRAINT [FK_ControlRisk_Control]



