
CREATE TABLE [dbo].[Roles](
	[Role] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


INSERT INTO [dbo].[Roles] ([Role]) VALUES ('Administrator');
INSERT INTO [dbo].[Roles] ([Role]) VALUES ('SystemAdministrator');

CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](250) NULL,
	[PasswordHash] [nvarchar](500) NULL,
	[FirstName] [nvarchar](250) NOT NULL,
	[LastName] [nvarchar](250) NOT NULL,
	[CreatedOn] [datetime] NOT NULL,
	[UpdatedOn] [datetime] NOT NULL
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


INSERT INTO [dbo].[Users]
           ([Email]
           ,[PasswordHash]
           ,[CreatedOn]
           ,[UpdatedOn]
           ,[FirstName]
           ,[LastName])
     VALUES
           ('admin@test.no',  'ClpvNTSxJs6fnDnYOjaTFjGlIwDp6YfaAhPwlF6GchE5YI0u1W5hjAUaUFxuOqsTR/lk0tfiVA0/AvvafcTOKL6UUNlHWOtYjNh8c1EUQk4Uo7TxGo+P+HL/rM2eBlH6eJrirK01PKY2RGNVr1jxmw9S4XBD4OOWTywICAUozVeirQ63uUjoR9t5dqV4nn2tVuhYZRyAAPBuzr2Y104eXJU5nb4ispr8NVND1VVf9Fi1St3+9d2ufba5K37RPDFGEu/anlm0Pl3Z5dQ1zcay1LcUrypbkt6vNzTJVI89/0z9NyxKPeFijlFsZjAdSq13YuhzRFUE6h7pfYhyyvEDDQ==', 
		    '2015-01-23 13:52:49.267',   GETDATE(),  'RAAP', 'Administrator');



CREATE TABLE [dbo].[UserRoles](
	[UserId] [int] NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_UserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[Role] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Roles] FOREIGN KEY([Role])
REFERENCES [dbo].[Roles] ([Role])


ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Roles]


ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])


ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Users]



INSERT INTO [dbo].[UserRoles]
           ([UserId]
           ,[Role])
     VALUES
           (1, 'SystemAdministrator');



CREATE TABLE dbo.Snowballs
	(
	SnowballId int NOT NULL IDENTITY (1, 1),
	Name nvarchar(100) NOT NULL,
	Weight int NOT NULL,
	CreatedOn datetime NOT NULL,
	UpdatedOn datetime NOT NULL
	)  ON [PRIMARY]

ALTER TABLE dbo.Snowballs ADD CONSTRAINT
	PK_Snowballs PRIMARY KEY CLUSTERED 
	(
	SnowballId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]



INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Red snowball', 25, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Yellow snowball', 830, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Big red snowball', 210, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Green snowball', 310, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Wet snowball', 120, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Very large snowball', 11, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Smelted snowball', 200, GETDATE(), GETDATE());
INSERT INTO [dbo].[Snowballs] ([Name],[Weight] ,[CreatedOn] ,[UpdatedOn])  VALUES ('Heavy snowball', 1000, GETDATE(), GETDATE());