use [RAAPMaster]

/****** Object:  Table [dbo].[Companies]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Companies](
	[CompanyId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[DatabaseName] [nvarchar](50) NOT NULL default 'RAAP',
 CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Help]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Help](
	[HelpId] [int] IDENTITY(1,1) NOT NULL,
	[Language] [nvarchar](10) NOT NULL,
	[Slug] [nvarchar](100) NOT NULL,
	[Title] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Help] PRIMARY KEY CLUSTERED 
(
	[HelpId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_SlugLanguage] UNIQUE NONCLUSTERED 
(
	[Language] ASC,
	[Slug] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]


/****** Object:  Table [dbo].[Languages]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Languages](
	[IsoCode] [nvarchar](10) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED 
(
	[IsoCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Migrations]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Migrations](
	[MigrationId] [nvarchar](50) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Migrations] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Roles]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Roles](
	[Role] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[UserRoles]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[UserRoles](
	[UserId] [int] NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[Role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/****** Object:  Table [dbo].[Users]    Script Date: 05.03.2016 21.44.26 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](250) NULL,
	[PasswordHash] [nvarchar](500) NULL,
	[FirstName] [nvarchar](250) NOT NULL,
	[LastName] [nvarchar](250) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL,
	[CompanyId] [int] NOT NULL,
	[Username] [nvarchar](250) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Con_Users_Email] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [Con_Users_Username] UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Help]  WITH CHECK ADD  CONSTRAINT [FK_Help_Languages] FOREIGN KEY([Language])
REFERENCES [dbo].[Languages] ([IsoCode])

ALTER TABLE [dbo].[Help] CHECK CONSTRAINT [FK_Help_Languages]

ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Roles] FOREIGN KEY([Role])
REFERENCES [dbo].[Roles] ([Role])

ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Roles]

ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])

ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Users]

ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Companies] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Companies] ([CompanyId])

ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Companies]


CREATE TABLE [dbo].[SoaChapter](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[Goal] [nvarchar](1000) NULL,
	[Parent] [int] NULL,
	[HowTo] [text] NULL,
	[Info] [text] NULL,
 CONSTRAINT [PK_SoaChapter_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]



ALTER TABLE [dbo].[SoaChapter]  WITH CHECK ADD  CONSTRAINT [FK_SoaChapter_SoaChapter] FOREIGN KEY([Parent])
REFERENCES [dbo].[SoaChapter] ([Id])


ALTER TABLE [dbo].[SoaChapter] CHECK CONSTRAINT [FK_SoaChapter_SoaChapter]





insert into Roles ([Role])
select [Role] from RAAP.dbo.Roles

set identity_insert Companies on;
insert into Companies (CompanyId,Name,CreatedOn,UpdatedOn)
select CompanyId,Name,CreatedOn,UpdatedOn from RAAP.dbo.Companies
set identity_insert Companies off;

set identity_insert Users on;
insert into Users (UserId,Email,PasswordHash,FirstName,LastName,CreatedOn,UpdatedOn,CompanyId,Username)
select UserId,Email,PasswordHash,FirstName,LastName,CreatedOn,UpdatedOn,CompanyId,Username from RAAP.dbo.Users
set identity_insert Users off;

insert into UserRoles (UserId, [Role])
select UserId,[Role] from RAAP.dbo.UserRoles

insert into Migrations (MigrationId,CreatedDate)
select MigrationId,CreatedDate from RAAP.dbo.Migrations

insert into Languages (IsoCode,Name)
select IsoCode,Name from RAAP.dbo.Languages

set identity_insert Help on;
insert into Help (HelpId,[Language],Slug,Title,[Description],CreatedOn,UpdatedOn)
select HelpId,[Language],Slug,Title,[Description],CreatedOn,UpdatedOn from RAAP.dbo.Help
set identity_insert Help off;

set identity_insert SoaChapter on;
insert into SoaChapter (Id,Name,Description,Goal,Parent,HowTo,Info)
select Id,Name,Description,Goal,Parent,HowTo,Info from RAAP.dbo.SoaChapter
set identity_insert SoaChapter off;