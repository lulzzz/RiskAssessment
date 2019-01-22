select sc.*,1 as new into #tmp1
from 
SoaChapter sc
where sc.SoaType = 1
select sci.* into #tmp2
from 
SoaChapter sc
join SoaChapterItems sci on sc.Id = sci.SoaChapterId
where sc.SoaType = 1
declare @lastId int
declare @firstId int
select @firstId=min(id) from #tmp1
select @lastId =IDENT_CURRENT('SoaChapter')
update t set t.new=id-@firstId+1+@lastId,t.Parent =Parent-@firstId+1+@lastId from #tmp1 as t
update t set t.soachapterid=t.soachapterid-@firstId+1+@lastId from #tmp2 as t
insert into SoaChapter (SoaType)
	select 5 from #tmp1
update sc set sc.Parent=t.parent
from
#tmp1 t
join SoaChapter sc on t.new=sc.id
insert into SoaChapterItems (SoaChapterId, IsoCode, Name, Description, Goal, HowTo, Info)
select SoaChapterId, IsoCode, Name, Description, Goal, HowTo, Info from #tmp2
drop table #tmp1
drop table #tmp2