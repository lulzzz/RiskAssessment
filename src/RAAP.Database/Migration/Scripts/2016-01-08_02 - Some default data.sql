
INSERT INTO [Languages] ([IsoCode]  ,[Name]) VALUES('en-us','English');
INSERT INTO [Languages] ([IsoCode]  ,[Name]) VALUES('nb-no','Norwegian');

INSERT INTO Help (Language, Slug, Title, Description, CreatedOn, UpdatedOn)
 VALUES ('en-us', 'user/create', 'Create user', 'How to create a user', GETDATE(), GETDATE());