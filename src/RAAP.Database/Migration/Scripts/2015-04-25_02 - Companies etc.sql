
UPDATE Users SET CompanyId=1;

ALTER TABLE Users ALTER COLUMN CompanyId int not null;


DROP TABLE Snowballs;

ALTER TABLE dbo.Users ADD CONSTRAINT
	FK_Users_Companies FOREIGN KEY
	(
	CompanyId
	) REFERENCES dbo.Companies
	(
	CompanyId
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
