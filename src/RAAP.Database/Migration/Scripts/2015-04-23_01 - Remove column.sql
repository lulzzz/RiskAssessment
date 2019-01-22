
declare cur cursor for 
select c.name from sys.tables t 
join sys.default_constraints c on c.parent_object_id=t.object_id
where t.name='Asset' and c.name not like '%created%' and c.name not like '%update%'

declare @sql nvarchar(200)

open cur
declare @constraint nvarchar(50)
fetch next from cur into @constraint
while @@FETCH_STATUS=0	
begin
set @sql = 'alter table [Asset] drop constraint ' + QUOTENAME(@constraint);
exec (@sql)
fetch next from cur into @constraint
end

close cur
deallocate cur

alter table Asset drop column  TransportEncryption, MessageEncryption, DiskEncryption, PersonalData, SensitiveData, HasAuthentication, AuthenticationLevel;

