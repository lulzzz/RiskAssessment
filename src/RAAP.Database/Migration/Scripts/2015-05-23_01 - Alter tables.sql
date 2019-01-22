
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON

IF OBJECT_ID('AssetThreat_Control', 'U') IS NOT NULL
  DROP TABLE AssetThreat_Control; 


drop table Asset_Threat

drop table [Control]

CREATE TABLE [dbo].[Control](
	[ControlId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[Executed] [bit] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
	[ExecutedDate] [datetime2](7) NULL,
	[ValidTo] [datetime2](7) NULL,
	[InvestmentCost] [decimal](18, 2) NULL,
	[MaintenanceCost] [decimal](18, 2) NULL,
	[LegalObligation] [bit] NOT NULL,
	[Responsible] [nvarchar](250) NULL,
	[Status] [int] NOT NULL,
	[Deadline] [datetime2](7) NULL,
	[Type] [int] NOT NULL,
	[Probability] [float] NOT NULL,
	[Impact] [float] NOT NULL,
	[Value] [float] NOT NULL,
	[Vulnerability] [float] NOT NULL,
	[Threat] [float] NOT NULL,
 CONSTRAINT [PK_Control] PRIMARY KEY CLUSTERED 
(
	[ControlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Executed]  DEFAULT ((0)) FOR [Executed]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_LegalObligation]  DEFAULT ((0)) FOR [LegalObligation]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Status]  DEFAULT ((1)) FOR [Status]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Type]  DEFAULT ((1)) FOR [Type]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Consequence]  DEFAULT ((0)) FOR [Probability]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Risk]  DEFAULT ((0)) FOR [Impact]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Value]  DEFAULT ((0)) FOR [Value]


ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Vulnerability]  DEFAULT ((0)) FOR [Vulnerability]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Threat]  DEFAULT ((0)) FOR [Threat]

CREATE TABLE [dbo].[Asset_Threat](
	[AssetThreatId] [int] IDENTITY(1,1) NOT NULL,
	[AssetId] [int] NOT NULL,
	[ThreatId] [int] NOT NULL,
	[Probability] [int] NOT NULL CONSTRAINT [DF__Asset_Thr__Proba__4E88ABD4]  DEFAULT ((3)),
	[Impact] [int] NOT NULL CONSTRAINT [DF__Asset_Thr__Impac__4F7CD00D]  DEFAULT ((3)),
	[CreatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_Asset_Threat_CreatedOn]  DEFAULT (getdate()),
	[UpdatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_Asset_Threat_UpdatedOn]  DEFAULT (getdate()),
 CONSTRAINT [PK_Asset_Threat_1] PRIMARY KEY CLUSTERED 
(
	[AssetThreatId] ASC
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


CREATE TABLE [dbo].[AssetThreat_Control](
	[AssetThreatId] [int] NOT NULL,
	[ControlId] [int] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_AssetThreat_Control] PRIMARY KEY CLUSTERED 
(
	[AssetThreatId] ASC,
	[ControlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[AssetThreat_Control] ADD  CONSTRAINT [DF_AssetThreat_Control_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]


ALTER TABLE [dbo].[AssetThreat_Control] ADD  CONSTRAINT [DF_AssetThreat_Control_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]


ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Asset_Threat] FOREIGN KEY([AssetThreatId])
REFERENCES [dbo].[Asset_Threat] ([AssetThreatId])


ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Asset_Threat]


ALTER TABLE [dbo].[AssetThreat_Control]  WITH CHECK ADD  CONSTRAINT [FK_AssetThreat_Control_Control] FOREIGN KEY([ControlId])
REFERENCES [dbo].[Control] ([ControlId])


ALTER TABLE [dbo].[AssetThreat_Control] CHECK CONSTRAINT [FK_AssetThreat_Control_Control]


CREATE TABLE [dbo].[DowntimeEffect](
	[DowntimeEffectId] [int] IDENTITY(1,1) NOT NULL,
	[AssetId] [int] NOT NULL,
	[Level] [int] NOT NULL,
	[Minutes] [int] NOT NULL,
	[IncomeLoss] [decimal](18, 2) NULL,
	[LossCategory] [nvarchar](50) NULL,
 CONSTRAINT [PK_DowntimeEffect] PRIMARY KEY CLUSTERED 
(
	[DowntimeEffectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[DowntimeEffect]  WITH CHECK ADD  CONSTRAINT [FK_DowntimeEffect_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[DowntimeEffect] CHECK CONSTRAINT [FK_DowntimeEffect_Asset]


alter table Asset add SystemRecoveryTime int null, DataRecoveryTime int null, IntegrityCheckTime int null, MaxDownTime int null, 
SystemRecoveryCost decimal(18,2) null, DataRecoveryCost decimal(18,2) null, IntegrityCheckCost decimal(18,2) null, MaxDownCost decimal(18,2) null;


alter table Asset add RequiresBusinessContinuityPlan bit not null default 0, Confidenciality int not null default 1, Integrity int not null default 1, [Availability] int not null default 1;


alter table Threat add InternalExternal int not null default 1, SecuritySafety int not null default 1, Value int null, Vulnerability int null, [Threat] int null;


alter table Threat add RiskAssessmentMethod int not null default 1;


alter table Threat add AcceptRisk bit not null default 0, Confidenciality bit not null default 0, Integrity bit not null default 0, [Availability] bit not null default 0;


alter table Threat add TransferRisk bit not null default 0;
