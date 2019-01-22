
CREATE TABLE dbo.Migrations
	(
	MigrationId nvarchar(50) NOT NULL,
	CreatedDate datetime NOT NULL
	)  ON [PRIMARY]
ALTER TABLE dbo.Migrations ADD CONSTRAINT
	PK_Migrations PRIMARY KEY CLUSTERED 
	(
	MigrationId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-03-18_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-12_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-16_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-17_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-23_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-24_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-24_02',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-25_01',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-25_02',GETDATE());
INSERT INTO Migrations (MigrationId, CreatedDate) VALUES('2015-04-26_01',GETDATE());



