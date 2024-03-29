update sc set Parent=parent.SoaChapterId
--select sci.Name, parent.Name
from SoaChapter sc
join SoaChapterItems sci on sc.Id=sci.SoaChapterId
join SoaChapterItems parent on  SUBSTRING(sci.name,1, len(sci.Name)- CHARINDEX('.', REVERSE(sci.name)))=parent.name
join SoaChapter parentChapter on parent.SoaChapterId=parentChapter.Id
where sc.SoaType=4 and sci.IsoCode='nb-no' and parent.IsoCode='nb-no' and parentChapter.SoaType=4