/****** Object:  Table [dbo].[Vulnerabilities]    Script Date: 19.03.2016 21.01.24 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Vulnerabilities](
	[VulnerabilityId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Vulnerability] PRIMARY KEY CLUSTERED 
(
	[VulnerabilityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]




