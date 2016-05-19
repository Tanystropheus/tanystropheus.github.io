
/* ********************************************************************************************* */
/* ******************************** fonction d'update d'objet ******************************* */
/* ********************************************************************************************* */

function updateSound(elem){
	myObjExecSqliteSQL("UPDATE Sound SET soundurl='"+ elem.soundurl +"' , languageid='"+ elem.languageid +"' WHERE soundid="+ elem.soundid,
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateElements(elem){
	myObjExecSqliteSQL("UPDATE Elements SET elemurl='"+ elem.elemurl + "' , user='" + elem.user + "' , soundid='" + elem.soundid +  + "' , width='" + elem.width + "' , textid='" + elem.textid + "' , taglst='" + elem.taglst + "' , state='" + elem.state + "' WHERE elemid="+ elem.elemid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibraryLst(elem){
	myObjExecSqliteSQL("UPDATE LibraryLst SET libraryid='"+ elem.libraryid + "' , liblsttitle='" + elem.liblsttitle + "' WHERE librarylstid="+ elem.librarylstid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLibrary(elem){
	myObjExecSqliteSQL("UPDATE Library SET userid='"+ elem.userid + "' , libtitle='"+ elem.libtitle+ "' , lstelemid='" + elem.lstelemid +"' WHERE libraryid="+ elem.libraryid,
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateGlobElemAssociation(elem){
	myObjExecSqliteSQL("UPDATE GlobElemAssociation SET listelemid='"+ elem.listelemid + "' , nbuse='" + elem.nbuse + "' WHERE globelemassoid="+ elem.globelemassoid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateElemAssociation(elem){
	myObjExecSqliteSQL("UPDATE ElemAssociation SET globelemassoid='"+ elem.globelemassoid + "' , userid='" + elem.userid + "' , nbuse='" + elem.nbuse +  + "' , date='" + elem.date + "' WHERE elemassoid="+ elem.elemassoid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateElemStat(elem){
	myObjExecSqliteSQL("UPDATE ElemStat SET userid='"+ elem.userid + "' , nbuse='" + elem.nbuse + "' , elemassoid='" + elem.elemassoid + "' WHERE elemstatid="+ elem.elemstatid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateContext(elem){
	myObjExecSqliteSQL("UPDATE Context SET time='"+ elem.time + "' , places='" + elem.places + "' , activiti='" + elem.activiti +  + "' , interlocutor='" + elem.interlocutor + "' WHERE contextid="+ elem.contextid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateLerningStat(elem){
	myObjExecSqliteSQL("UPDATE LerningStat SET contextid='"+ elem.contextid + "' , elemstatid='" + elem.elemstatid + "' , nbtrue='" + elem.nbtrue + "' WHERE lerningstatid="+ elem.lerningstatid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

function updateUser(elem){
	myObjExecSqliteSQL("UPDATE User SET languageid='"+ elem.languageid + "' , librarylstid='" + elem.librarylstid + "' , login='" + elem.login + "' , backupurl='" + elem.backupurl + "' , password='" + elem.password + "' WHERE userid="+ elem.userid, 
	[], updateSucces() , function(err, err2){alert("elem update fail " + JSON.stringify(err, null, 4) + " "+JSON.stringify(err2, null, 4));});
	return true;
};

