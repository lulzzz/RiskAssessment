delete sa 
--select *
from Soa s 
join Asset_SoaChapter sa on sa.SoaId=s.SoaId
where s.SoaType=5

delete from Soa where SoaType=5