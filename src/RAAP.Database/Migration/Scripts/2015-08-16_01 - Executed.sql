
IF EXISTS(SELECT * FROM sys.columns 
			WHERE Name = N'Executed' AND Object_ID = Object_ID(N'Control'))
BEGIN
	ALTER TABLE Control DROP CONSTRAINT DF_Control_Executed;
	alter table Control drop column Executed;
END