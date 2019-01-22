

/****** Object:  Table [dbo].[Threat_Control]    Script Date: 04.06.2015 14:36:52 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

drop table AssetThreat_Control


CREATE TABLE [dbo].[Threat_Control](
	[ThreatId] [int] NOT NULL,
	[ControlId] [int] NOT NULL,
 CONSTRAINT [PK_Threat_Control] PRIMARY KEY CLUSTERED 
(
	[ThreatId] ASC,
	[ControlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Threat_Control]  WITH CHECK ADD  CONSTRAINT [FK_Threat_Control_Control] FOREIGN KEY([ControlId])
REFERENCES [dbo].[Control] ([ControlId])


ALTER TABLE [dbo].[Threat_Control] CHECK CONSTRAINT [FK_Threat_Control_Control]


ALTER TABLE [dbo].[Threat_Control]  WITH CHECK ADD  CONSTRAINT [FK_Threat_Control_Threat] FOREIGN KEY([ThreatId])
REFERENCES [dbo].[Threat] ([ThreatId])


ALTER TABLE [dbo].[Threat_Control] CHECK CONSTRAINT [FK_Threat_Control_Threat]


