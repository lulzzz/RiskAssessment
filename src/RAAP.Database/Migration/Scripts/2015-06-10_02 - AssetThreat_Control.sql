USE [RAAP]


/****** Object:  Table [dbo].[AssetThreat_Control]    Script Date: 10.06.2015 11:51:47 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[AssetThreat_Control](
	[AssetThreatId] [int] NOT NULL,
	[ControlId] [int] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
	[ExecutedDate] [datetime2](7) NULL,
	[ValidTo] [datetime2](7) NULL,
	[Deadline] [datetime2](7) NULL,
	[Status] [int] NOT NULL,
	[Type] [int] NOT NULL,
	[Probability] [float] NOT NULL,
	[Impact] [float] NOT NULL,
	[Value] [float] NOT NULL,
	[Vulnerability] [float] NOT NULL,
	[Threat] [float] NOT NULL,
	[LegalObligation] [bit] NOT NULL,
	[InvestmentCost] [decimal](18, 0) NULL,
	[MaintenanceCost] [decimal](18, 0) NULL,
	[Responsible] [nvarchar](250) NULL,
 CONSTRAINT [PK_AssetThreat_Control] PRIMARY KEY CLUSTERED 
(
	[AssetThreatId] ASC,
	[ControlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT (getdate()) FOR [CreatedOn]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT (getdate()) FOR [UpdatedOn]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((1)) FOR [Status]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((1)) FOR [Type]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((10)) FOR [Probability]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((10)) FOR [Impact]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((10)) FOR [Value]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((10)) FOR [Vulnerability]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((10)) FOR [Threat]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  DEFAULT ((0)) FOR [LegalObligation]


ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Asset_Threat] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])


ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Asset_Threat]


ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Control] FOREIGN KEY([ControlId])
REFERENCES [dbo].[Control] ([ControlId])


ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Control]
