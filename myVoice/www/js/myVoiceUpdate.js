function updateContext(elem){
	myObjExecSqliteSQL("UPDATE Context SET time='"+ elem.time + "' , places='" + elem.places + "' , activiti='" + elem.activiti +  + "' , interlocutor='" + elem.interlocutor + "' WHERE contextid="+ elem.contextid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateElemAssociation(elem){
	myObjExecSqliteSQL("UPDATE ElemAssociation SET elemlst='" + elem.elemlst  + "' , date='" + elem.date + "' , learning='" + elem.learning + "' WHERE elemassoid="+ elem.elemassoid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateSetings(elem){
	myObjExecSqliteSQL("UPDATE ElemAssociation SET width='" + elem.width  + "' , writing='" + elem.writing + "' , sound='" + elem.sound + "' , lastchange='" + elem.lastchange + "' , pos='" + elem.pos + "' WHERE setingsid="+ elem.setingsid
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateElements(elem){
	myObjExecSqliteSQL("UPDATE Elements SET elemurl='"+ elem.elemurl + "' , soundid='" + elem.soundid + "' , textid='" + elem.textid + "' , state='" + elem.state + "' WHERE elemid="+ elem.elemid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+ JSON.stringify(err2, null, 4));});
	return true;
};

function updateLanguage(elem){
	myObjExecSqliteSQL("UPDATE Language SET langname='"+ elem.langname + "' WHERE languageid="+ elem.languageid,
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLerningStat(elem){
	myObjExecSqliteSQL("UPDATE LerningStat SET contextid='"+ elem.contextid + "' , elemassoid='" + elem.elemassoid + "' , good='" + elem.good + "' WHERE lerningstatid="+ elem.lerningstatid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibrary(elem){
	myObjExecSqliteSQL("UPDATE Library SET libtitle='"+ elem.libtitle+ "' WHERE libraryid="+ elem.libraryid,
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibraryLst(elem){
	myObjExecSqliteSQL("UPDATE LibraryLst SET userlog='"+ elem.userlog + "' , liblsttitle='" + elem.liblsttitle + "' WHERE librarylstid="+ elem.librarylstid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateSound(elem){
	myObjExecSqliteSQL("UPDATE Sound SET soundurl='"+ elem.soundurl +"' , languageid='"+ elem.languageid +"' WHERE soundid="+ elem.soundid,
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateElemSetings(elem){
	myObjExecSqliteSQL("UPDATE ElemSetings SET setingsid='"+ elem.setingsid + "' , elemid='" + elem.elemid + "' WHERE elemsetingsid="+ elem.elemsetingsid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibElem(elem){
	myObjExecSqliteSQL("UPDATE LibElem SET libraryid='"+ elem.libraryid + "' , elemid='" + elem.elemid + "' WHERE libelemid="+ elem.libelemid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibLink(elem){
	myObjExecSqliteSQL("UPDATE LibLink SET libraryid='"+ elem.libraryid + "' , librarylstid='" + elem.librarylstid + "' WHERE liblinkid="+ elem.liblinkid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibLink(elem){
	myObjExecSqliteSQL("UPDATE Text SET languageid='"+ elem.languageid + "' , text='" + elem.text + "' WHERE textid="+ elem.textid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};



function updateUser(elem){
	myObjExecSqliteSQL("UPDATE User SET languageid='"+ elem.languageid + "' , librarylstid='" + elem.librarylstid + "' , login='" + elem.login + "' , backupurl='" + elem.backupurl + "' , password='" + elem.password + "' WHERE userid="+ elem.userid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

