

declare cur cursor for 
select c.name from sys.tables t 
join sys.columns col on t.object_id=col.object_id
join sys.default_constraints c on c.parent_object_id=t.object_id and c.parent_column_id=col.column_id
where t.name='Threat' and (col.name like '%value' or col.name like '%threat' or col.name like '%vulnerability')

declare @sql nvarchar(200)

open cur
declare @constraint nvarchar(50)
fetch next from cur into @constraint
while @@FETCH_STATUS=0	
begin
set @sql = 'alter table [Threat] drop constraint ' + QUOTENAME(@constraint);
exec (@sql)
--print @constraint
fetch next from cur into @constraint
end

close cur
deallocate cur


declare cur2 cursor for 
select c.name from sys.tables t 
join sys.columns col on t.object_id=col.object_id
join sys.default_constraints c on c.parent_object_id=t.object_id and c.parent_column_id=col.column_id
where t.name='Asset_Threat' and (col.name like '%value' or col.name like '%threat' or col.name like '%vulnerability')

open cur2
fetch next from cur2 into @constraint
while @@FETCH_STATUS=0	
begin
set @sql = 'alter table [Asset_Threat] drop constraint ' + QUOTENAME(@constraint);
exec (@sql)
--print @constraint
fetch next from cur2 into @constraint
end

close cur2
deallocate cur2

alter table Threat drop column DamageValue;
alter table Threat add DamageValue int not null default 1;
alter table Threat drop column DamageThreat;
alter table Threat add DamageThreat int not null default 1;
alter table Threat drop column DamageVulnerability;
alter table Threat add DamageVulnerability int not null default 1;

alter table Threat drop column FinancialValue;
alter table Threat add FinancialValue int not null default 1;
alter table Threat drop column FinancialThreat;
alter table Threat add FinancialThreat int not null default 1;
alter table Threat drop column FinancialVulnerability;
alter table Threat add FinancialVulnerability int not null default 1;

alter table Threat drop column ReputationValue;
alter table Threat add ReputationValue int not null default 1;
alter table Threat drop column ReputationThreat;
alter table Threat add ReputationThreat int not null default 1;
alter table Threat drop column ReputationVulnerability;
alter table Threat add ReputationVulnerability int not null default 1;

/*Asset_Threat*/

alter table Asset_Threat drop column DamageValue;
alter table Asset_Threat add DamageValue int not null default 1;
alter table Asset_Threat drop column DamageThreat;
alter table Asset_Threat add DamageThreat int not null default 1;
alter table Asset_Threat drop column DamageVulnerability;
alter table Asset_Threat add DamageVulnerability int not null default 1;

alter table Asset_Threat drop column FinancialValue;
alter table Asset_Threat add FinancialValue int not null default 1;
alter table Asset_Threat drop column FinancialThreat;
alter table Asset_Threat add FinancialThreat int not null default 1;
alter table Asset_Threat drop column FinancialVulnerability;
alter table Asset_Threat add FinancialVulnerability int not null default 1;

alter table Asset_Threat drop column ReputationValue;
alter table Asset_Threat add ReputationValue int not null default 1;
alter table Asset_Threat drop column ReputationThreat;
alter table Asset_Threat add ReputationThreat int not null default 1;
alter table Asset_Threat drop column ReputationVulnerability;
alter table Asset_Threat add ReputationVulnerability int not null default 1;


declare cur3 cursor for 
select c.name from sys.tables t 
join sys.columns col on t.object_id=col.object_id
join sys.default_constraints c on c.parent_object_id=t.object_id and c.parent_column_id=col.column_id
where t.name='Control' and col.name in('value','threat','vulnerability','Impact','Probability')

open cur3
fetch next from cur3 into @constraint
while @@FETCH_STATUS=0	
begin
set @sql = 'alter table [Control] drop constraint ' + QUOTENAME(@constraint);
exec (@sql)
--print @constraint
fetch next from cur3 into @constraint
end

close cur3
deallocate cur3

alter table Control drop column Value;
alter table Control drop column Threat;
alter table Control drop column Vulnerability;
alter table Control drop column Probability;
alter table Control drop column Impact;
alter table Control add DamageValue int not null default 0;
alter table Control add DamageThreat int not null default 0;
alter table Control add DamageVulnerability int not null default 0;
alter table Control add DamageImpact int not null default 0;
alter table Control add DamageProbability int not null default 0;

alter table Control add FinancialValue int not null default 0;
alter table Control add FinancialThreat int not null default 0;
alter table Control add FinancialVulnerability int not null default 0;
alter table Control add FinancialImpact int not null default 0;
alter table Control add FinancialProbability int not null default 0;

alter table Control add ReputationValue int not null default 0;
alter table Control add ReputationThreat int not null default 0;
alter table Control add ReputationVulnerability int not null default 0;
alter table Control add ReputationImpact int not null default 0;
alter table Control add ReputationProbability int not null default 0;


declare cur4 cursor for 
select c.name from sys.tables t 
join sys.columns col on t.object_id=col.object_id
join sys.default_constraints c on c.parent_object_id=t.object_id and c.parent_column_id=col.column_id
where t.name='AssetThreat_Control' and col.name in('value','threat','vulnerability','Impact','Probability')

open cur4
fetch next from cur4 into @constraint
while @@FETCH_STATUS=0	
begin
set @sql = 'alter table [AssetThreat_Control] drop constraint ' + QUOTENAME(@constraint);
exec (@sql)
--print @constraint
fetch next from cur4 into @constraint
end

close cur4
deallocate cur4

alter table AssetThreat_Control drop column Value;
alter table AssetThreat_Control drop column Threat;
alter table AssetThreat_Control drop column Vulnerability;
alter table AssetThreat_Control drop column Probability;
alter table AssetThreat_Control drop column Impact;
alter table AssetThreat_Control add DamageValue int not null default 0;
alter table AssetThreat_Control add DamageThreat int not null default 0;
alter table AssetThreat_Control add DamageVulnerability int not null default 0;
alter table AssetThreat_Control add DamageImpact int not null default 0;
alter table AssetThreat_Control add DamageProbability int not null default 0;

alter table AssetThreat_Control add FinancialValue int not null default 0;
alter table AssetThreat_Control add FinancialThreat int not null default 0;
alter table AssetThreat_Control add FinancialVulnerability int not null default 0;
alter table AssetThreat_Control add FinancialImpact int not null default 0;
alter table AssetThreat_Control add FinancialProbability int not null default 0;

alter table AssetThreat_Control add ReputationValue int not null default 0;
alter table AssetThreat_Control add ReputationThreat int not null default 0;
alter table AssetThreat_Control add ReputationVulnerability int not null default 0;
alter table AssetThreat_Control add ReputationImpact int not null default 0;
alter table AssetThreat_Control add ReputationProbability int not null default 0;