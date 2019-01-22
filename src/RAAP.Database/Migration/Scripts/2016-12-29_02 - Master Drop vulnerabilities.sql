if exists (select * from sys.tables where name='Vulnerabilities')
begin
drop table Vulnerabilities
end