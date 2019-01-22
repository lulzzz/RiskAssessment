alter table HtmlComment
add ControlId int foreign key(ControlId) references Control(ControlId)