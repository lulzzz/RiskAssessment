INSERT INTO Roles (Role) VALUES('User');
ALTER TABLE Users ADD ProfileImage varbinary(max) null;
ALTER TABLE Users ADD ProfileImageFiletype nvarchar(50) null;
ALTER TABLE Users ADD Title nvarchar(100) null;
ALTER TABLE Users ADD Departmennt nvarchar(100) null;

