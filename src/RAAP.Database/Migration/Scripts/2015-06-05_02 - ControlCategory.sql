

/****** Object:  Table [dbo].[ControlCategory]    Script Date: 05.06.2015 22:22:25 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


CREATE TABLE [dbo].[ControlCategory](
	[ControlCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Description] [nvarchar](250) NULL,
	[CreatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_ControlCategory_CreatedOn]  DEFAULT (getdate()),
	[UpdatedOn] [datetime2](7) NOT NULL CONSTRAINT [DF_ControlCategory_UpdatedOn]  DEFAULT (getdate()),
 CONSTRAINT [PK_ControlCategory] PRIMARY KEY CLUSTERED 
(
	[ControlCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]



insert into ControlCategory (Name, [Description]) values ('Default','Default category')


alter table Control add [ControlCategoryId] [int] NOT NULL default 1


ALTER TABLE [dbo].[Control]  WITH CHECK ADD  CONSTRAINT [FK_Control_ControlCategory] FOREIGN KEY([ControlCategoryId])
REFERENCES [dbo].[ControlCategory] ([ControlCategoryId])


ALTER TABLE [dbo].[Control] CHECK CONSTRAINT [FK_Control_ControlCategory]


