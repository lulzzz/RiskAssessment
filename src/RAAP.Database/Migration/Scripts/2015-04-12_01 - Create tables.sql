
/****** Object:  Table [dbo].[Asset]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Asset](
	[AssetId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[Category] [nvarchar](50) NULL,
	[AggregatedStatus] [nvarchar](50) NULL,
	[Risk] [int] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_Asset_CreatedOn]  DEFAULT (getdate()),
	[UpdatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_Asset_UpdatedOn]  DEFAULT (getdate()),
 CONSTRAINT [PK_Asset] PRIMARY KEY CLUSTERED 
(
	[AssetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[AssetCategory]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[AssetCategory](
	[AssetCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_AssetCategory] PRIMARY KEY CLUSTERED 
(
	[AssetCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Consequence]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Consequence](
	[ConsequenceId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Consequence] PRIMARY KEY CLUSTERED 
(
	[ConsequenceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Control]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Control](
	[ControlId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[Executed] [bit] NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Control] PRIMARY KEY CLUSTERED 
(
	[ControlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Threat]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Threat](
	[ThreadId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[Risk] [int] NOT NULL,
 CONSTRAINT [PK_Threat] PRIMARY KEY CLUSTERED 
(
	[ThreadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[ThreatCategory]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[ThreatCategory](
	[ThreatCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ThreatCategory] PRIMARY KEY CLUSTERED 
(
	[ThreatCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[ThreatSource]    Script Date: 12.04.2015 21:00:59 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[ThreatSource](
	[ThreatSourceId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[UpdatedOn] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_ThreatSource] PRIMARY KEY CLUSTERED 
(
	[ThreatSourceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[AssetCategory] ADD  CONSTRAINT [DF_AssetCategory_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[AssetCategory] ADD  CONSTRAINT [DF_AssetCategory_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]

ALTER TABLE [dbo].[Consequence] ADD  CONSTRAINT [DF_Consequence_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[Consequence] ADD  CONSTRAINT [DF_Consequence_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_Executed]  DEFAULT ((0)) FOR [Executed]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[Control] ADD  CONSTRAINT [DF_Control_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]

ALTER TABLE [dbo].[ThreatCategory] ADD  CONSTRAINT [DF_ThreatCategory_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[ThreatCategory] ADD  CONSTRAINT [DF_ThreatCategory_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]

ALTER TABLE [dbo].[ThreatSource] ADD  CONSTRAINT [DF_ThreatSource_CreatedOn]  DEFAULT (getdate()) FOR [CreatedOn]

ALTER TABLE [dbo].[ThreatSource] ADD  CONSTRAINT [DF_ThreatSource_UpdatedOn]  DEFAULT (getdate()) FOR [UpdatedOn]

