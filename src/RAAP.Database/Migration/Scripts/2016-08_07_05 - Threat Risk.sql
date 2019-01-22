/****** Object:  Table [dbo].[ThreatRisk]    Script Date: 07.08.2016 14.05.53 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


ALTER TABLE [dbo].[ThreatRisk] add
	[IsoRisk] [int] NOT NULL,
	[NsRisk] [int] NOT NULL;

