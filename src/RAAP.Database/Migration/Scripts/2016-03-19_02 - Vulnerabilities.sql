/****** Object:  Table [dbo].[VulnerabilityCatalogs]    Script Date: 19.03.2016 22.14.14 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[VulnerabilityCatalogs](
	[VulnerabilityCatalogId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_VulnerabilityCatalogs] PRIMARY KEY CLUSTERED 
(
	[VulnerabilityCatalogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



/****** Object:  Table [dbo].[Vulnerabilities]    Script Date: 19.03.2016 22.14.18 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Vulnerabilities](
	[VulnerabilityId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
	[VulnerabilityCatalogId] [int] NOT NULL,
 CONSTRAINT [PK_Vulnerabilities] PRIMARY KEY CLUSTERED 
(
	[VulnerabilityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Vulnerabilities]  WITH CHECK ADD  CONSTRAINT [FK_Vulnerabilities_VulnerabilityCatalogs] FOREIGN KEY([VulnerabilityCatalogId])
REFERENCES [dbo].[VulnerabilityCatalogs] ([VulnerabilityCatalogId])


ALTER TABLE [dbo].[Vulnerabilities] CHECK CONSTRAINT [FK_Vulnerabilities_VulnerabilityCatalogs]



