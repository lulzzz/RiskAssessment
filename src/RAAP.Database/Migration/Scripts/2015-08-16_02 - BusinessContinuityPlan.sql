USE [RAAP]


/****** Object:  Table [dbo].[BusinessContinuityPlan]    Script Date: 16.08.2015 22.10.49 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[BusinessContinuityPlan](
	[BusinessContinuityPlanId] [int] IDENTITY(1,1) NOT NULL,
	[Text] [text] NULL,
	[AssetId] [int] NULL,
	[Revision] [int] NOT NULL CONSTRAINT [DF_BusinessContinuityPlan_Revision]  DEFAULT ((1)),
	[CreatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_BusinessContinuityPlan_CreatedOn]  DEFAULT (getdate()),
	[UpdatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_BusinessContinuityPlan_UpdatedOn]  DEFAULT (getdate()),
	[ProcessId] [int] NULL,
 CONSTRAINT [PK_BusinessContinuityPlan] PRIMARY KEY CLUSTERED 
(
	[BusinessContinuityPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



ALTER TABLE [dbo].[BusinessContinuityPlan]  WITH CHECK ADD  CONSTRAINT [FK_BusinessContinuityPlan_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[BusinessContinuityPlan] CHECK CONSTRAINT [FK_BusinessContinuityPlan_Asset]


