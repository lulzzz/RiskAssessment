
/****** Object:  Table [dbo].[SoaSettings]    Script Date: 05.09.2017 14:19:19 ******/
SET ANSI_NULLS ON


SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[SoaSettings](
	[SoaType] [int] NOT NULL,
	[Relevant] [bit] NOT NULL,
 CONSTRAINT [PK_SoaSettings] PRIMARY KEY CLUSTERED 
(
	[SoaType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[SoaSettings] ADD  CONSTRAINT [DF_SoaSettings_Relevant]  DEFAULT ((1)) FOR [Relevant]



