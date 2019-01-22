/****** Object:  Table [dbo].[Risk]    Script Date: 13.08.2016 22.29.00 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[RiskType](
	[RiskTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_RiskType] PRIMARY KEY CLUSTERED 
(
	[RiskTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[ControlRisk]  WITH CHECK ADD  CONSTRAINT [FK_ControlRisk_RiskType] FOREIGN KEY([Type])
REFERENCES [dbo].[RiskType] ([RiskTypeId])


ALTER TABLE [dbo].[ControlRisk] CHECK CONSTRAINT [FK_ControlRisk_RiskType]


ALTER TABLE [dbo].[ThreatRisk]  WITH CHECK ADD  CONSTRAINT [FK_ThreatRisk_RiskType] FOREIGN KEY([Type])
REFERENCES [dbo].[RiskType] ([RiskTypeId])


ALTER TABLE [dbo].[ThreatRisk] CHECK CONSTRAINT [FK_ThreatRisk_RiskType]



