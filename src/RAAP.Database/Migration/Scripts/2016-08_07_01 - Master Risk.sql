/****** Object:  Table [dbo].[Risk]    Script Date: 07.08.2016 13.56.58 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[Risk](
	[RiskId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Risk] PRIMARY KEY CLUSTERED 
(
	[RiskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



ALTER TABLE [dbo].[Risk]  WITH CHECK ADD  CONSTRAINT [FK_Risk_Companies] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Companies] ([CompanyId])


ALTER TABLE [dbo].[Risk] CHECK CONSTRAINT [FK_Risk_Companies]



