insert into SoaChapterItems (SoaChapterId, IsoCode, Name, Description, Goal, HowTo, Info)
select Id, 'nb-no',Name, Description, Goal, HowTo,Info
from SoaChapter

--truncate table SoaChapterItems
