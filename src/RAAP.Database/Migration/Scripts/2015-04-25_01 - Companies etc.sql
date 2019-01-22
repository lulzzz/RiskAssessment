
CREATE TABLE dbo.Companies
	(
	CompanyId int IDENTITY(1,1) NOT NULL,
	Name nvarchar(250) NOT NULL,
	CreatedOn datetime NOT NULL,
	UpdatedOn datetime NOT NULL
	)  ON [PRIMARY]

ALTER TABLE dbo.Companies ADD CONSTRAINT
	PK_Companies PRIMARY KEY CLUSTERED 
	(
	CompanyId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]



INSERT INTO Companies (Name, CreatedOn, UpdatedOn) VALUES('Kamude AS', GETDATE(), GETDATE());

ALTER TABLE Users ADD CompanyId int null;
