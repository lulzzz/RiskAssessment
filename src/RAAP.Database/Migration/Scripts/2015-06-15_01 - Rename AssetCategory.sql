exec sp_rename 'RAAP.dbo.AssetCategory', 'AssetSubCategory';
exec sp_rename 'RAAP.dbo.AssetSubCategory.AssetCategoryId', 'AssetSubCategoryId','COLUMN';
alter table AssetSubCategory drop column FilterValue;
alter table Asset add Category int not null default 1;