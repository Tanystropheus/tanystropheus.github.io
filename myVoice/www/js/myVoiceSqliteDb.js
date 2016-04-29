window.appData = {
	language: {},
	libLst: {},
	lib: {},
	elem: {},
	sond: {}
};


/* ********************************************************************************************* */
/* ***************************** fonction générique de Callback ******************************** */
/* ********************************************************************************************* */

function onError(e){
	alert("On Error: " + JSON.stringify(e, null, 4));
};

function onSucces(e){
	alert("Succes: " + JSON.stringify(e, null, 4));
};

function insertSucces(){
	//alert("elem inserted");
}

/* ********************************************************************************************* */
/* ************************* fonction D'ouverture de la base de donnée ************************* */
/* ********************************************************************************************* */

function openDb(callback) {
	/*
	 * Fonction as exeuter onDeviceReady pour ouvrir la base de donné et l'ajouter au DOM de l'application
	 * */
	var dbName = "myVoice.db";
	document.db = window.sqlitePlugin.openDatabase(
		{
			name: dbName, 
			//androidDatabaseImplementation: 2,
			//androidLockWorkaround: 1,
			location: 2
		},
		function (msg) {
			if(callback){
				callback();
			}
		},
		function (msg) {
		  alert("error: " + msg);
		}
	);
};

function initDb(callback){
	/*
	 * Fonction as executer aprés l'ouvertuur de la basse de donné pour 
	 * initialiser la basse et créer les tables
	 * */
	try {
		try {
			document.db.executeSql("CREATE TABLE Language (languageid integer primary key, langname text)");
			document.db.executeSql("CREATE TABLE Tag (tagid integer primary key, tagname text)");
			document.db.executeSql("CREATE TABLE TagText (tagtextid integer primary key, languageid integer, tagid integer, tagtext text," +
				" FOREIGN KEY(languageid) REFERENCES Language(languageid), FOREIGN KEY(tagid) REFERENCES Tag(tagid))");
			document.db.executeSql("CREATE TABLE LibraryLst (librarylstid integer primary key, libraryid text," +
				" liblsttitle text)");
			document.db.executeSql("CREATE TABLE Library (libraryid integer primary key, userid integer," +
				" libtitle text, lstelemid text, FOREIGN KEY(userid) REFERENCES User(userid))");
			document.db.executeSql("CREATE TABLE User (userid integer primary key, languageid integer," +
				" librarylstid integer, login text, password text, backupurl text, FOREIGN KEY(languageid) REFERENCES Language(languageid)" + 
				", FOREIGN KEY(librarylstid) REFERENCES LibraryLst(librarylstid))");
			document.db.executeSql("CREATE TABLE GlobElemAssociation (globelemassoid integer primary key," +
				" listelemid integer, nbuse integer)");
			document.db.executeSql("CREATE TABLE ElemAssociation (elemassoid integer primary key," +
				" globelemassoid integer, userid integer, nbuse integer, date date, FOREIGN KEY(userid) REFERENCES User(userid)," +
				" FOREIGN KEY(globelemassoid) REFERENCES GlobElemAssociation(globelemassoid))");
			document.db.executeSql("CREATE TABLE Text (textid integer primary key, languageid text," +
				" text text, FOREIGN KEY(languageid) REFERENCES Language(languageid))");
			document.db.executeSql("CREATE TABLE Elements (elemid integer primary key, elemurl text," +
				" soundid integer, width integer, textid text, FOREIGN KEY(textid) REFERENCES Text(textid), FOREIGN KEY(soundid) REFERENCES Sound(soundid))");
			document.db.executeSql("CREATE TABLE ElemStat (elemstatid integer primary key," +
				" userid integer, nbuse integer, elemassoid integer, FOREIGN KEY(userid) REFERENCES User(userid),"+
				" FOREIGN KEY(elemassoid) REFERENCES ElemAssociation(elemassoid))");
			document.db.executeSql("CREATE TABLE GlobElemStat (globelemstatid integer primary key, nbuse integer," +
				" elemstatid, FOREIGN KEY(elemstatid) REFERENCES ElemStat(elemstatid))");
			document.db.executeSql("CREATE TABLE Sound (soundid integer primary key, soundurl text," +
				" languageid, FOREIGN KEY(languageid) REFERENCES Language(languageid))");
 		} catch(err){
			alert("Error Create Table: " + JSON.stringify(err, null, 4));
		} finally {
			/*
			insertElements( new myVoiceElem(1, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			insertElements( new myVoiceElem(2, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			insertElements( new myVoiceElem(4, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			insertElements( new myVoiceElem(5, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			*/
			insertLanguage(new myVoiceLanguage(1, "Français"));
			insertLanguage(new myVoiceLanguage(2, "Anglais"));
			insertTag(new myVoiceTag(1, "tagtest1"));
			insertTag(new myVoiceTag(2, "tagtest2"));
			insertTagText(new myVoiceTagText(2, "null", 1, 1, "test"));
			insertLibraryLst(new myVoiceLibraryLst(1, "Classeur Utilisation", "2,1,3"));
			insertLibraryLst(new myVoiceLibraryLst(2, "Classeur Aprantisage", "5,4,6"));
			insertLibraryLst(new myVoiceLibraryLst(5, "Classeur Poteries", "5,4,6"));
			//*/
		}
	} catch (err){
		alert("Error:" + JSON.stringify(err, null, 4));
	} finally {
		if (callback){
			callback();
		}
		languageObjectLst = {};
		tagTextObjectLst = {};
		tagTextlibLst = {};
		try {
			selectLanguage("", languageObjectLst, function(objLst){ /* alert("language: " + JSON.stringify(objLst, null, 4));*/ });
			selectTagText("", tagTextObjectLst, function(objLst){ /* alert("tagtext:" + JSON.stringify(objLst, null, 4));*/ });
			selectLibraryLst("", tagTextlibLst, function(objLst){ /* alert("liblst:" + JSON.stringify(objLst, null, 4));*/ alert("AppData: " + JSON.stringify(window.appData, null, 4)); });
		} catch(e){
			allert("Error!! " + JSON.stringify(e, null, 4));
		} finally {
			dropSqliteTable('Language');
			dropSqliteTable('TagText');
			dropSqliteTable('Tag');
			dropSqliteTable('LibraryLst');
		}
	}
};

/* ********************************************************************************************* */
/* ************************** fonction de requetes la base de donnée *************************** */
/* ********************************************************************************************* */

function myExecSqliteSQL(sql, okcb, errcb) {
	/*
	 * Fonction generique executant les requetes as la base de donnée
	 * sql est la requete écrite en SQL as executer 
	 * okcb est la fonction de callback en cas de sucés
	 * errcb est la fonction de callback en cas d'erreur
	 * */
	document.db.transaction(function(tx) {
		 tx.executeSql(sql, null, okcb, errcb);
	}, function(){alert("Error transaction init");});
};

function myObjExecSqliteSQL(sql, values, okcb, errcb) {
	/*
	 * Fonction generique executant les requetes as la base de donnée
	 * sql est la requete écrite en SQL as executer 
	 * values est la variable contenent les valeurs as remplacer dans la requette (Pour les requetes préparer)
	 * okcb est la fonction de callback en cas de sucés
	 * errcb est la fonction de callback en cas d'erreur
	 * */
	//alert("sql: " + sql + " Values: " + JSON.stringify(values, null, 4));
	document.db.transaction(function(tx) {
		 tx.executeSql(sql, values, okcb, errcb);
	}, function(e){alert("Error transaction init " + JSON.stringify(e, null, 4));});
};

/* ********************************************************************************************* */
/* ***************** fonction générique de relation avec la base de donnée ***********************/
/* ********************************************************************************************* */

function createSqliteTable(tableName, champ) {
	myExecSqliteSQL('CREATE TABLE IF NOT EXISTS ' + tableName + ' ('+champ+')', function(){alert("table "+ tableName +" created");}, function(){alert("table "+ tableName +" creation fail");});
	return true;
};

function dropSqliteTable (tableName) {
	myExecSqliteSQL('DROP TABLE ' + tableName, function(){/*alert("drop " + tableName + " table succes");*/}, function(){alert("Drop table "+ tableName +" fail");});
	return true;
};

function insertInSqliteTable (tableName, values){
	myExecSqliteSQL("INSERT INTO "+ tableName + " VALUES ("+ values +")", function(){/*alert("inserted");*/} , function(){alert("insertion fail");});
	return true;
};

function updateInSqliteTable (tableName, setString, condition){
	myExecSqliteSQL("UPDATE "+ tableName + "SET " + setString +" WHERE "+ condition, function(){alert("elem update succes");}, function(){alert("elem update fail");});
	return true;
};

function deleteInSqliteTable (db, tableName, condition){
	myExecSqliteSQL(db, "DELETE FROM "+ tableName + " WHERE "+ condition, function(){alert("elem deleted");}, function(){alert("elem deletion fail");});
	return true;
};

function selectRecords(fn, sql) {
	try{
		document.db.transaction(function(tx) {
			tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection ( " + sql +" ): " + JSON.stringify(e, null, 4));});
		});
	}catch(e){
		alert("error reading: " + JSON.stringify(e, null, 4));
	}
};

/* ********************************************************************************************* */
/* ************************************* fonction de Debug ************************************* */
/* ********************************************************************************************* */

function getAllTheDataDEBUG(tabName) {
	var render = function(tx, rs) {
		var text = "Content of "+ tabName +": --> \n" ;
		for (var i = 0; i < rs.rows.length; i++) {
			text = text + JSON.stringify(rs.rows.item(i), null, 4) + "\n";
		}
		text = text + "<--\n";
		alert(text);
	};
	selectRecords(render, "SELECT * FROM " + tabName);
};

/* ********************************************************************************************* */
/* ******************************** fonction d'insertion d'objet ******************************* */
/* ********************************************************************************************* */

function insertLanguage(elem){
	myObjExecSqliteSQL("INSERT INTO Language (languageid, langname ) VALUES ( ?, ?)", [elem.languageid , elem.langname], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertTag(elem){
	myObjExecSqliteSQL("INSERT INTO Tag (tagid, tagname ) VALUES ( ?, ?)", [elem.tagid , elem.tagname], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertTagText(elem){
	myObjExecSqliteSQL("INSERT INTO TagText (tagtextid, languageid, tagid, tagtext) VALUES ( ?, ?, ?, ?)", [elem.tagtextid , elem.languageid, elem.tagelem.tagid, elem.tagtext], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertLibraryLst(elem){
	myObjExecSqliteSQL("INSERT INTO LibraryLst (librarylstid, libraryid, liblsttitle ) VALUES ( ?, ?, ?)", [elem.librarylstid , elem.libraryid, elem.liblsttitle], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertLibrary(elem){
	myObjExecSqliteSQL("INSERT INTO Library (libraryid, userid, libtitle, lstelemid ) VALUES ( ?, ?, ?, ?)", [elem.libraryid , elem.userid, elem.libtitle, elem.lstelemid], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertUser(elem){
	myObjExecSqliteSQL("INSERT INTO User (userid, languageid, librarylstid, login, password, backupurl ) VALUES ( ?, ?, ?, ?, ?, ?)", [elem.userid, elem.languageid, elem.librarylstid, elem.login, elem.password, elem.backupurl], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertGlobElemAssociation(elem){
	myObjExecSqliteSQL("INSERT INTO GlobElemAssociation (globelemassoid, listelemid, nbuse) VALUES ( ?, ?, ?)", [elem.globelemassoid, elem.listelemid, elem.nbuse], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertElemAssociation(elem){
	myObjExecSqliteSQL("INSERT INTO ElemAssociation (elemassoid, globelemassoid, userid, nbuse, date) VALUES ( ?, ?, ?, ?, ?)", [elem.elemassoid, elem.globelemassoid, elem.userid, elem.nbuse, elem.date], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertText(elem){
	myObjExecSqliteSQL("INSERT INTO Text (textid, languageid, text) VALUES ( ?, ?, ?)", [elem.textid, elem.languageid, elem.text], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertElements(elem){
	myObjExecSqliteSQL("INSERT INTO Elements (elemid , elemurl , soundid, width) VALUES ( ?, ?, ?, ?)", [elem.elemid , elem.elemurl , elem.soundelem.soundid, elem.width], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertElemStat(elem){
	myObjExecSqliteSQL("INSERT INTO ElemStat (elemstatid , userid , nbuse, elemassoid) VALUES ( ?, ?, ?, ?)", [elem.elemstatid , elem.userid , elem.nbuse, elem.elemassoid], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertGlobElemStat(elem){
	myObjExecSqliteSQL("INSERT INTO GlobElemStat (globelemstatid , nbuse , elemstatid) VALUES ( ?, ?, ?, ?)", [elem.globelemstatid , elem.nbuse , elem.elemstatid], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertSound(elem){
	myObjExecSqliteSQL("INSERT INTO Sound (soundid , soundurl , languageid) VALUES ( ?, ?, ?, ?)", [elem.soundid , elem.soundurl , elem.languageid], insertSucces() , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

/* ********************************************************************************************* */
/* ******************************** fonction de selection d'objet ******************************* */
/* ********************************************************************************************* */

/* 
 * Voici un exemple de leur fonctionement avec la fonction selectLanguage
 * sql est la variable contenant le filtre écris en SQL
 * objectLst est la liste d'object ou seront enregistrer chaque object selectioner dans la base de données
 * cb est une fonction de callback
 * pour selectioner tout le contenu de la table Language et stoquer dans un objject languageLst:
 * 		selectLanguage("", languageLst, callback);
 * pour selectioner le contenu filtrer de la table Language et stoquer dans un objject languageLst:
 * 		selectLanguage("WHERE champ=value", languageLst, callback);
 * 	champ et value étant as adapter au circonstances.
 * */

function selectLanguage(sql, objectLst, cb){ // sql form : WHERE languageid=1 and languagename='Français'
	alert("begin language select: "+ sql);
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["languageid"]] = new myVoiceLanguage();
			window.appData.language[rs.rows.item(i)["languageid"]] = new myVoiceLanguage();
			for (var propName in rs.rows.item(i)) {
				window.appData.language[rs.rows.item(i)["languageid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["languageid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Language " + sql + " ORDER by languageid");
	} else {
		selectRecords(render, "SELECT * FROM Language ORDER by languageid");
	}
};

function selectTag(sql, objectLst, cb){ // sql form : WHERE tagid=1 and tagname='Français'
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["tagid"]] = new myVoiceTag();
			window.appData.tag[rs.rows.item(i)["tagid"]] = new myVoiceTag();
			for (var propName in rs.rows.item(i)) {
				window.appData.tag[rs.rows.item(i)["tagid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["tagid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			//alert("time for tag cb");
			cb(objectLst);
		}
	};

	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Tag " + sql + " ORDER by tagid");
	} else {
		selectRecords(render, "SELECT * FROM Tag ORDER by tagid");
	}
};

function selectTagText(sql, objectLst, cb){ // sql form : WHERE tagTextid=1 and tagTextname='Français'
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["tagtextid"]] = new myVoiceTagText();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["tagtextid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			//alert("time for tagtext cb");
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM TagText " + sql + " ORDER by tagTextid");
	} else {
		selectRecords(render, "SELECT * FROM TagText ORDER by tagTextid");
	}
};

function selectLibraryLst(sql, objectLst, cb){ // sql form : WHERE libraryLstid=1 and libraryLstname='Français'
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["librarylstid"]] = new myVoiceLibraryLst();
			window.appData.libLst[rs.rows.item(i)["librarylstid"]] = new myVoiceLibraryLst();
			for (var propName in rs.rows.item(i)) {
				window.appData.libLst[rs.rows.item(i)["librarylstid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["librarylstid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM LibraryLst " + sql + " ORDER by libraryLstid");
	} else {
		selectRecords(render, "SELECT * FROM LibraryLst ORDER by libraryLstid");
	}
};

function selectLibrary(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["libraryid"]] = new myVoiceLibrary();
			window.appData.lib[rs.rows.item(i)["libraryid"]][propName] = new myVoiceLibrary();
			for (var propName in rs.rows.item(i)) {
				window.appData.lib[rs.rows.item(i)["libraryid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["libraryid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Library " + sql + " ORDER by libraryid");
	} else {
		selectRecords(render, "SELECT * FROM Library  ORDER by libraryid");
	}
};

function selectUser(sql, objectLst, cb){ // sql form : WHERE userid=1 and username='Français'
	var render = function(tx, rs) {
		objectLst[rs.rows.item(i)["userid"]] = new myVoiceLibrary();
		window.appData.user[rs.rows.item(i)["userid"]] = new myVoiceLibrary();
		for (var propName in rs.rows.item(i)) {
			window.appData.user[rs.rows.item(i)["userid"]][propName] = rs.rows.item(i)[propName];
			objectLst[rs.rows.item(i)["userid"]][propName] = rs.rows.item(i)[propName];
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM User " + sql + " ORDER by userid");
	} else {
		selectRecords(render, "SELECT * FROM User ORDER by userid");
	}
};

function selectGlobElemAssociation(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["globelemassosid"]] = new myVoiceGlobElemAssociation();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["globelemassosid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM GlobElemAssociation " + sql + " ORDER by globElemAssociationid");
	} else {
		selectRecords(render, "SELECT * FROM GlobElemAssociation ORDER by globElemAssociationid");
	}
};

function selectElemAssociation(sql, objectLst, cb){ // sql form : WHERE elemAssociationid=1 and elemAssociationname='Français'
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["elemassosid"]] = new myVoiceElemAssociation();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["elemassosid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM ElemAssociation " + sql + " ORDER by elemAssociationid");
	} else {
		selectRecords(render, "SELECT * FROM ElemAssociation ORDER by elemAssociationid");
	}
};

function selectText(sql, objectLst, cb){ // sql form : WHERE textid=1 and textname='Français'
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["textid"]] = new myVoiceText();
			for (var propName in rs.rows.item(i)) {
				window.appData.language[rs.rows.item(i)["textid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["textid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Text " + sql + " ORDER by textid");
	} else {
		selectRecords(render, "SELECT * FROM Text ORDER by textid");
	}
};

function selectElements(sql, objectLst, cb){ // sql form : WHERE elementsid=1 and elementsname='Français'
	//elementsObjectLst = {};
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["elemid"]] = new myVoiceElements();
			window.appData.elem[rs.rows.item(i)["elemid"]][propName] = new myVoiceElements();
			for (var propName in rs.rows.item(i)) {
				window.appData.elem[rs.rows.item(i)["elemid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["elemid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Elements " + sql + " ORDER by elementsid");
	} else {
		selectRecords(render, "SELECT * FROM Elements ORDER by elementsid");
	}
};

function selectElemStat(sql, objectLst, cb){ // sql form : WHERE elemStatid=1 and elemStatname='Français'
	//elemStatObjectLst = {};
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["elemstatid"]] = new myVoiceElemStat();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["elemstatid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM ElemStat " + sql + " ORDER by elemStatid");
	} else {
		selectRecords(render, "SELECT * FROM ElemStat ORDER by elemStatid");
	}
};

function selectGlobElemStat(sql, objectLst, cb){ // sql form : WHERE globElemStatid=1
	//globElemStatObjectLst = {};
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["globelemstatid"]] = new myVoiceGlobElemStat();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["globelemstatid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM GlobElemStat " + sql + " ORDER by globElemStatid");
	} else {
		selectRecords(render, "SELECT * FROM GlobElemStat ORDER by globElemStatid");
	}
};

function selectSound(sql, objectLst, cb){ // sql form : WHERE soundid=1
	//soundObjectLst = {};
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["soundid"]] = new myVoiceSound();
			window.appData.sound[rs.rows.item(i)["soundid"]][propName] = new myVoiceSound();
			for (var propName in rs.rows.item(i)) {
				window.appData.sound[rs.rows.item(i)["soundid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["soundid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof cb !== undefined){
			cb(objectLst);
		}
	};
	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Sound " + sql + " ORDER by soundid");
	} else {
		selectRecords(render, "SELECT * FROM Sound ORDER by soundid");
	}
};
