insert into SoaChapterItems (SoaChapterId,IsoCode, Name, Description, Goal, HowTo, Info)
select SoaChapterId, 'en-us',Name, 'EN: ' + Description, 'EN: ' + Goal, HowTo, Info from SoaChapterItems