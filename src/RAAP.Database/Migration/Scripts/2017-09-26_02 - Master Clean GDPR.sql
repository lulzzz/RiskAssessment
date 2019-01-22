delete sci
from SoaChapter sc join SoaChapterItems sci on sc.Id=sci.SoaChapterId
where sc.SoaType=5

delete sc from SoaChapter sc where sc.SoaType=5