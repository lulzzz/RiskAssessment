

declare cur cursor for 
select c.name from sys.tables t 
join sys.columns col on col.object_id=t.object_id
join sys.default_constraints c on c.parent_object_id=col.object_id and c.parent_column_id=col.column_id
where t.name='Asset_Threat' and col.name = 'AcceptRisk' 

declare @sql nvarchar(200)

open cur
declare @constraint nvarchar(50)
fetch next from cur into @constraint
while @@FETCH_STATUS=0	
begin
set @sql = 'alter table [Asset_Threat] drop constraint ' + QUOTENAME(@constraint);
exec (@sql)
fetch next from cur into @constraint
end


alter table Asset_Threat drop column AcceptRisk;

close cur
deallocate cur

alter table Asset_Threat add AcceptRisk bit not null default 0;