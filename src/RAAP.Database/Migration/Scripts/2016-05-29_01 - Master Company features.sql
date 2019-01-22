
ALTER TABLE Companies ADD ProfileImage varbinary(max) null;
ALTER TABLE Companies ADD ProfileImageFiletype nvarchar(50) null;

ALTER TABLE Companies ADD Address1 nvarchar(250) null;
ALTER TABLE Companies ADD Address2 nvarchar(250) null;
ALTER TABLE Companies ADD Address3 nvarchar(250) null;
ALTER TABLE Companies ADD Address4 nvarchar(250) null;

ALTER TABLE Companies ADD Phone nvarchar(20) null;
ALTER TABLE Companies ADD Email nvarchar(50) null;
ALTER TABLE Companies ADD OrganizationNumber nvarchar(20) null;
ALTER TABLE Companies ADD Homepage nvarchar(250) null;
