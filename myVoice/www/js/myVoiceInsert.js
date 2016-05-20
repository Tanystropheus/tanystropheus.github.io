
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
 * 
 * Voici un exemple d'utilisation de chaqu'une de ses fonctions:
 * 
 * insertLanguage(new myVoiceLanguage(1, "Français"));
 * insertLanguage(new myVoiceLanguage(2, "Anglais"));
 * insertTag(new myVoiceTag(1, 1, "pomme"));
 * insertTag(new myVoiceTag(1, 2, "appel"));
 * insertLibraryLst(new myVoiceLibraryLst(1, "Classeur Utilisation", "2,1,3"));
 * insertLibraryLst(new myVoiceLibraryLst(2, "Classeur Aprantisage", "5,4,6"));
 * insertLibraryLst(new myVoiceLibraryLst(5, "Classeur Poteries", "5,4,6"));
 * insertLibrary(new myVoiceLibrary(1, 0, "onglet1", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
 * insertLibrary(new myVoiceLibrary(2, 0, "onglet2", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
 * insertLibrary(new myVoiceLibrary(3, 0, "onglet3", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
 * insertLibrary(new myVoiceLibrary(4, 0, "onglet4", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
 * insertLibrary(new myVoiceLibrary(5, 0, "onglet5", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
 * insertLibrary(new myVoiceLibrary(6, 0, "onglet6", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
 * insertUser(new myVoiceUser("1,2,3", 0, 1, "login", "backendPass", "backupUrl", window.localStorage.getItem("Interfaces_Setings")));
 * insertGlobElemAssociation(new myVoiceGlobElemAssociation(0, "1,3,5", 0));
 * insertGlobElemAssociation(new myVoiceGlobElemAssociation(1, "3,5", 0));
 * insertElemAssociation(new myVoiceElemAssociation(1, 0, 0, 1, Date.now()));
 * insertText(new myVoiceText("test", 1, 1));
 * insertSound(new myVoiceSound("soundurl", 1, 1));
 * insertElements( new myVoiceElem(1, "img/logo.png", 10, 1, 1, 1, "1_1,languageid_tagid", 0));
 * insertElements( new myVoiceElem(2, "img/logo.png", 10, 1, 1, 1, "2_1,languageid_tagid", 0));
 * insertElements( new myVoiceElem(4, "img/logo.png", 10, 1, 1, 1, "1_1,languageid_tagid", 0));
 * insertElements( new myVoiceElem(5, "img/logo.png", 10, 1, 1, 1, "1_1,languageid_tagid", 0));
 * insertElemStat(new myVoiceElemStat(0, 0, "1,2,3, elemid_userid", 0, 1));
 * insertGlobElemStat(new myVoiceGlobElemStat(0, 0, 0));
 * updateSound(new myVoiceSound("soundurlUPDATED", 1, 1));
 * 
 * */
function insertLanguage(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Language (languageid, langname ) VALUES ( ?, ?)",
	[elem.languageid, elem.langname], okfunc, failfunc);
	return true;
};

function insertTag(elem, okfunc, failfunc){
	myObjExecSqliteSQL("INSERT INTO Tag (tagid, languageid, tagtext) VALUES ( ?, ?, ?)",
	[elem.tagid, elem.languageid, elem.tagtext], okfunc, failfunc);
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
	myObjExecSqliteSQL("INSERT INTO User (userid, languageid, librarylstid, login, password, backupurl, interfacesetings) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
	[elem.userid, elem.languageid, elem.librarylstid, elem.login, elem.password, elem.backupurl, elem.interfacesetings], okfunc, failfunc);
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
	myObjExecSqliteSQL("INSERT INTO Text (textid, languageid, text) VALUES ( ?, ?, ?)",
	[elem.textid, elem.languageid, elem.text], okfunc, failfunc);
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
