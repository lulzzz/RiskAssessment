
alter table Asset_Threat ADD Probability int not null default 3, Impact int not null default 3, UpdatedOn datetime2 not null default getdate(),CreatedOn datetime2 not null default getdate();

alter table [Control] ADD ExecutedDate datetime2 null;



/****** Object:  Table [dbo].[ProcessCategory]    Script Date: 27.04.2015 08:06:40 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[ProcessCategory](
	[ProcessCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ProcessCategory] PRIMARY KEY CLUSTERED 
(
	[ProcessCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[ProcessCategory] ADD  CONSTRAINT [DF_ProcessCategory_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]


ALTER TABLE [dbo].[ProcessCategory] ADD  CONSTRAINT [DF_ProcessCategory_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]




/****** Object:  Table [dbo].[Process]    Script Date: 27.04.2015 08:06:20 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Process](
	[ProcessId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[AggregatedStatus] [nvarchar](50) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
	[ProcessCategoryId] [int] NOT NULL,
 CONSTRAINT [PK_Process] PRIMARY KEY CLUSTERED 
(
	[ProcessId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Process] ADD  CONSTRAINT [DF_Process_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]


ALTER TABLE [dbo].[Process] ADD  CONSTRAINT [DF_Process_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]


ALTER TABLE [dbo].[Process]  WITH CHECK ADD  CONSTRAINT [FK_Process_ProcessCategory] FOREIGN KEY([ProcessCategoryId])
REFERENCES [dbo].[ProcessCategory] ([ProcessCategoryId])


ALTER TABLE [dbo].[Process] CHECK CONSTRAINT [FK_Process_ProcessCategory]



