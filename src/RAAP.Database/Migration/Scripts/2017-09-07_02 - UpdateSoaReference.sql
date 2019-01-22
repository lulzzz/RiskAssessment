--select *
update asoa
set asoa.SoaId=s.SoaId
from 
Asset_SoaChapter asoa
join 
soa s
on asoa.SoaId=s.SoaChapterId