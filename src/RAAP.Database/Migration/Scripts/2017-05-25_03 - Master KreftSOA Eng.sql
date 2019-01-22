insert into SoaChapterItems (SoaChapterId, IsoCode, Name, Description, Goal, HowTo, Info)
select sci.SoaChapterId,'en-us',sci.Name,sci.Description,sci.Goal,sci.HowTo,sci.Info from SoaChapter sc
join SoaChapterItems sci on sc.Id=sci.SoaChapterId
where sc.SoaType=4