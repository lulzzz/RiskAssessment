INSERT INTO [dbo].[AttributeTypes] ([AttributeTypeId] ,[CreatedOn],[UpdatedOn]) VALUES  ('Cause', GETDATE(), GETDATE());
INSERT INTO [dbo].[AttributeTypes] ([AttributeTypeId] ,[CreatedOn],[UpdatedOn]) VALUES  ('OriginOfThreat', GETDATE(), GETDATE());

INSERT INTO [dbo].[AttributeCategories] ([AttributeTypeId] ,[Name] ,[CreatedOn] ,[UpdatedOn]) VALUES ('Cause', 'Default category', GETDATE(), GETDATE());
INSERT INTO [dbo].[AttributeCategories] ([AttributeTypeId] ,[Name] ,[CreatedOn] ,[UpdatedOn]) VALUES ('OriginOfThreat', 'Default category', GETDATE(), GETDATE());

