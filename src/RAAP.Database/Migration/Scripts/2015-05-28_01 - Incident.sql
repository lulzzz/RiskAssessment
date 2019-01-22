
/****** Object:  Table [dbo].[Incident]    Script Date: 28.05.2015 22:31:35 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON
CREATE TABLE [dbo].[Incident](
	[IncidentId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
	[ControlId] [int] NULL,
	[AssetId] [int] NULL,
 CONSTRAINT [PK_Incident] PRIMARY KEY CLUSTERED 
(
	[IncidentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Incident] ADD  CONSTRAINT [DF_Incident_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]


ALTER TABLE [dbo].[Incident] ADD  CONSTRAINT [DF_Incident_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]


ALTER TABLE [dbo].[Incident]  WITH CHECK ADD  CONSTRAINT [FK_Incident_Asset] FOREIGN KEY([AssetId])
REFERENCES [dbo].[Asset] ([AssetId])


ALTER TABLE [dbo].[Incident] CHECK CONSTRAINT [FK_Incident_Asset]


ALTER TABLE [dbo].[Incident]  WITH CHECK ADD  CONSTRAINT [FK_Incident_Control] FOREIGN KEY([ControlId])
REFERENCES [dbo].[Control] ([ControlId])


ALTER TABLE [dbo].[Incident] CHECK CONSTRAINT [FK_Incident_Control]



