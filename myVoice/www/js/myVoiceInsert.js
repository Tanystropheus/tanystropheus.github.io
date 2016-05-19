
/* ********************************************************************************************* */
/* ******************************** fonction d'insertion d'objet ******************************* */
/* ********************************************************************************************* */
/* 
 * Pour utiliser ces fonctions, passez leurs en paramettre l'object corespondant et la fonction l'ajoutera as la DB.
 * Par exemple :
 * 		insertLanguage(new myVoiceLanguage(1, "Français")); // permet d'inseret une nouvelle langue dans la DB.
 * Si vous souhaitez attendre la fin de la requette pour executer d'autres requetes cous pouvez vous servire des promises
 * de la maniére suivante:
 * 		var promise = new Promise(function(resolve, reject){
 * 			insertLanguage(new myVoiceLanguage(1, "Français"), function(value){resolve(value)}, function(err){reject(err)});
 * 		}, function(){alert("promis create fail");});
 * 		promise.then(function(){alert("Fonction on succes");}, function(){alert("Fonction on error");});
 * */
function insertLanguage(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Language (languageid, langname ) VALUES ( ?, ?)", [elem.languageid, elem.langname], okfunc, failfunc);
	return true;
};

function insertTag(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Tag (tagid, languageid, tagtext) VALUES ( ?, ?, ?)", [elem.tagid, elem.languageid, elem.tagtext], okfunc, failfunc);
	return true;
};

function insertLibraryLst(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO LibraryLst (librarylstid, libraryid, liblsttitle ) VALUES ( ?, ?, ?)", 
	[elem.librarylstid, elem.libraryid, elem.liblsttitle], okfunc, failfunc);
	return true;
};

function insertLibrary(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Library (libraryid, userid, libtitle, lstelemid ) VALUES ( ?, ?, ?, ?)", 
	[elem.libraryid, elem.userid, elem.libtitle, elem.lstelemid], okfunc, failfunc);
	return true;
};

function insertUser(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO User (userid, languageid, librarylstid, login, password, backupurl, interfacesetings) VALUES ( ?, ?, ?, ?, ?, ?, ?)", [elem.userid, elem.languageid, elem.librarylstid, elem.login, elem.password, elem.backupurl, elem.interfacesetings], okfunc, failfunc);
	return true;
};

function insertGlobElemAssociation(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO GlobElemAssociation (globelemassoid, listelemid, nbuse) VALUES ( ?, ?, ?)", 
	[elem.globelemassoid, elem.listelemid, elem.nbuse], okfunc, failfunc);
	return true;
};

function insertElemAssociation(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO ElemAssociation (elemassoid, globelemassoid, userid, nbuse, date) VALUES ( ?, ?, ?, ?, ?)", 
	[elem.elemassoid, elem.globelemassoid, elem.userid, elem.nbuse, elem.date], okfunc, failfunc);
	return true;
};

function insertText(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Text (textid, languageid, text) VALUES ( ?, ?, ?)", [elem.textid, elem.languageid, elem.text], okfunc, failfunc);
	return true;
};

function insertElements(elem, okfunc, failfunc){
	//alert("elem: " + JSON.stringify(elem, null, 4));
	myObjExecSqliteSQL("INSERT INTO Elements (elemid, elemurl, user, soundid, width, textid, taglst, state) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", 
	[elem.elemid, elem.elemurl, elem.user , elem.soundid, elem.width, elem.textid, elem.taglst, elem.state], okfunc, failfunc);
	return true;
};

function insertElemSetings(elem, okfunc, failfunc){
	//alert("elem: " + JSON.stringify(elem, null, 4));
	myObjExecSqliteSQL("INSERT INTO ElemSetings (elemsetingsid, width, writing,  sound, lastchange) VALUES ( ?, ?, ?, ?, ?)", 
	[elem.elemsetingsid, elem.width, elem.writing,  elem.sound, elem.lastchange], okfunc, failfunc);
	return true;
};

function insertElemStat(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO ElemStat (elemstatid, userid, nbuse, elemassoid) VALUES ( ?, ?, ?, ?)", 
	[elem.elemstatid, elem.userid, elem.nbuse, elem.elemassoid], okfunc, failfunc);
	return true;
};

function insertContext(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Context (contextid, time, places, activiti, interlocutor) VALUES ( ?, ?, ?, ?, ?)", 
	[elem.contextid, elem.time, elem.places, elem.activiti, elem.interlocutor], okfunc, failfunc);
	return true;
};

function insertLerningStat(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO LerningStat (lerningstatid, contextid, elemstatid, nbtrue) VALUES ( ?, ?, ?, ?)", 
	[elem.lerningstatid, elem.contextid, elem.elemstatid, elem.nbtrue], okfunc, failfunc);
	return true;
};

function insertGlobElemStat(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO GlobElemStat (globelemstatid, nbuse, elemstatid) VALUES ( ?, ?, ?)", 
	[elem.globelemstatid, elem.nbuse, elem.elemstatid], okfunc, failfunc);
	return true;
};

function insertSound(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Sound (soundid, soundurl, languageid) VALUES ( ?, ?, ?)", 
	[elem.soundid, elem.soundurl, elem.languageid], okfunc, failfunc);
	return true;
};
