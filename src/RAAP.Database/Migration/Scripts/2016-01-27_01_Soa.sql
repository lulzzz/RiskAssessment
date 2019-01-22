/****** Object:  Table [dbo].[Soa]    Script Date: 27.01.2016 13.26.38 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Soa](
	[SoaId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[SoaChapterId] [int] NOT NULL,
	[Relevance] [bit] NOT NULL,
	[RiskAssessments] [bit] NOT NULL,
	[CurrentControl] [bit] NOT NULL,
	[Contractual] [bit] NOT NULL,
	[DataProtectionLaw] [bit] NOT NULL,
	[Compliance] [int] NOT NULL,
	[ComplianceDate] [datetime2](7) NULL,
	[SourceReference] [nvarchar](1000) NULL,
	[ControlDescription] [nvarchar](1000) NULL,
	[ResponsibleUserId] [int] NULL,
	[ImplementationUserId] [int] NULL,
	[ImplementationDate] [datetime2](7) NULL,
	[Reason] [int] NOT NULL,
 CONSTRAINT [PK_Soa] PRIMARY KEY CLUSTERED 
(
	[SoaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Soa] ADD  CONSTRAINT [DF_Soa_Relevance]  DEFAULT ((0)) FOR [Relevance]


ALTER TABLE [dbo].[Soa] ADD  CONSTRAINT [DF_Table_1_RA]  DEFAULT ((0)) FOR [RiskAssessments]


ALTER TABLE [dbo].[Soa] ADD  CONSTRAINT [DF_Soa_CurrentControl]  DEFAULT ((0)) FOR [CurrentControl]


ALTER TABLE [dbo].[Soa] ADD  CONSTRAINT [DF_Soa_Contractual]  DEFAULT ((0)) FOR [Contractual]


ALTER TABLE [dbo].[Soa] ADD  CONSTRAINT [DF_Soa_DataProtectionLaw]  DEFAULT ((0)) FOR [DataProtectionLaw]


ALTER TABLE [dbo].[Soa] ADD  CONSTRAINT [DF_Soa_Compliance]  DEFAULT ((1)) FOR [Compliance]


ALTER TABLE [dbo].[Soa]  WITH CHECK ADD  CONSTRAINT [FK_Soa_Implementation] FOREIGN KEY([ImplementationUserId])
REFERENCES [dbo].[Users] ([UserId])


ALTER TABLE [dbo].[Soa] CHECK CONSTRAINT [FK_Soa_Implementation]


ALTER TABLE [dbo].[Soa]  WITH CHECK ADD  CONSTRAINT [FK_Soa_Responsible] FOREIGN KEY([ResponsibleUserId])
REFERENCES [dbo].[Users] ([UserId])


ALTER TABLE [dbo].[Soa] CHECK CONSTRAINT [FK_Soa_Responsible]


ALTER TABLE [dbo].[Soa]  WITH CHECK ADD  CONSTRAINT [FK_Soa_SoaChapter] FOREIGN KEY([SoaChapterId])
REFERENCES [dbo].[SoaChapter] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE


ALTER TABLE [dbo].[Soa] CHECK CONSTRAINT [FK_Soa_SoaChapter]



