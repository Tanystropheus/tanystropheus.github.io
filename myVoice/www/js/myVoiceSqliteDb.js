window.appData = {
		libLst: {},
		lib: {},
		elem: {},
		sond: {}
	};

function openDb(callback) {
	var dbName = "myVoice.db";
	//if (typeof window.sqlitePlugin !== undefined) {
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
	/*} else {
		// For debugging in simulator fallback to native SQL Lite
		db = window.openDatabase(dbName, "1.0", "MyVoice DataBase", 200000);
	}*/
};

function initDb(callback){
	try {
		var tableName = 'SimpsonFamily';
		try {
			//document.db.executeSql("CREATE TABLE SimpsonFamily (id integer primary key, nom text)");
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
			/*insertInSqliteTable(tableName, "1, 'Homer'");
			insertInSqliteTable(tableName, "2, 'Marge'");
			insertInSqliteTable(tableName, "3, 'Bart'");
			insertInSqliteTable(tableName, "4, 'Lisa'");*/
			/*insertLanguage({languageid: 1, langname: "Français"});
			insertElements( new myVoiceElem(1, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			insertElements( new myVoiceElem(2, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			insertElements( new myVoiceElem(4, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));
			insertElements( new myVoiceElem(5, "img/logo.png", 10, 10, "soundUrl", 1, 1, "test", 1));*/
			insertLanguage(new myVoiceLanguage(1, "Français"));
			insertLanguage(new myVoiceLanguage(2, "Anglais"));
			insertTag(new myVoiceTag(1, "tagtest1"));
			insertTag(new myVoiceTag(2, "tagtest2"));
			insertTagText(new myVoiceTagText(2, "null", 1, 1, "test"));
			insertLibraryLst(new myVoiceLibraryLst(1, "Classeur Utilisation", "2,1,3"));
			insertLibraryLst(new myVoiceLibraryLst(2, "Classeur Aprantisage", "5,4,6"));
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
			selectLanguage("", languageObjectLst, function(objLst){ alert("language: " + JSON.stringify(objLst, null, 4)); });
			selectTagText("", tagTextObjectLst, function(objLst){ alert("test selection tagtext:" + JSON.stringify(objLst, null, 4)); });
			selectLibraryLst("", tagTextlibLst, function(objLst){ alert("test selection liblst:" + JSON.stringify(objLst, null, 4)); });
			//getAllTheDataDEBUG(tableName);
			//getAllTheDataDEBUG('Language');
			//getAllTheDataDEBUG('Tag');
			//getAllTheDataDEBUG('TagText');
			//getAllTheDataDEBUG('LibraryLst');
			//getAllTheDataDEBUG('Library');
			//getAllTheDataDEBUG('User');
			//getAllTheDataDEBUG('ElemAssociation');
			//getAllTheDataDEBUG('GlobElemAssociation');
			//getAllTheDataDEBUG('ElemStat');
			//getAllTheDataDEBUG('GlobElemStat');
			//getAllTheDataDEBUG('Elements');
			//getAllTheDataDEBUG('Sound');
		} catch(e){
			allert("Error!! " + JSON.stringify(e, null, 4));
		} finally {
//			dropSqliteTable(tableName);
//			dropSqliteTable('Elements');
//			dropSqliteTable('Sound');
			dropSqliteTable('Language');
			dropSqliteTable('TagText');
			dropSqliteTable('Tag');
			dropSqliteTable('LibraryLst');//*/
			//debugelem(languageObjectLst);
			//alert("test languageObjectLst: " + JSON.stringify(languageObjectLst, null, 4));
			//alert("AppData: " + JSON.stringify(window.appData, null, 4));
		}
	}
};

function myExecSqliteSQL(sql, okcb, errcb) {
	document.db.transaction(function(tx) {
		 tx.executeSql(sql, null, okcb, errcb);
	}, function(){alert("Error transaction init");});
};

function createSqliteTable(tableName, champ) {
	myExecSqliteSQL('CREATE TABLE IF NOT EXISTS ' + tableName + ' ('+champ+')', function(){alert("table "+ tableName +" created");}, function(){alert("table "+ tableName +" creation fail");});
	return true;
};

function dropSqliteTable (tableName) {
	myExecSqliteSQL('DROP TABLE ' + tableName, function(){alert("drop " + tableName + " table succes");}, function(){alert("Drop table "+ tableName +" fail");});
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

function selectRecords(fn, sql, where, by) {
	try{
		//alert(sql);
		document.db.transaction(function(tx) {
			tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection ( " + sql +" ): " + JSON.stringify(e, null, 4));});
		});
	}catch(e){
		alert("error reading: " + JSON.stringify(e, null, 4));
	} /*finally{
		alert("reading data  ok!!!! --> ^^");
	}*/
};

function onError(e){
	alert("On Error: " + JSON.stringify(e, null, 4));
};

function onSucces(e){
	alert("Succes: " + JSON.stringify(e, null, 4));
};

function getAllTheDataDEBUG(tabName) {
	var render = function(tx, rs) {
		var text = "Content of "+ tabName +": --> \n" ;
		//alert("nb rows: " + rs.rows.length);
		for (var i = 0; i < rs.rows.length; i++) {
			text = text + JSON.stringify(rs.rows.item(i), null, 4) + "\n";
			//alert("Row: -->" + JSON.stringify(rs.rows.item(i), null, 4)+ "<--");
			//alert(text);
		}
		text = text + "<--\n";
		alert(text);
	};
	selectRecords(render, "SELECT * FROM " + tabName);
};


function myObjExecSqliteSQL(sql, values, okcb, errcb) {
	alert("sql: " + sql + " Values: " + JSON.stringify(values, null, 4));
	document.db.transaction(function(tx) {
		 tx.executeSql(sql, values, okcb, errcb);
	}, function(e){alert("Error transaction init " + JSON.stringify(e, null, 4));});
};

function insertLanguage(elem){
	myObjExecSqliteSQL("INSERT INTO Language (languageid, langname ) VALUES ( ?, ?)", [elem.languageid , elem.langname], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertTag(elem){
	myObjExecSqliteSQL("INSERT INTO Tag (tagid, tagname ) VALUES ( ?, ?)", [elem.tagid , elem.tagname], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertTagText(elem){
	//debugelem(elem);
	myObjExecSqliteSQL("INSERT INTO TagText (tagtextid, languageid, tagid, tagtext) VALUES ( ?, ?, ?, ?)", [elem.tagtextid , elem.languageid, elem.tagelem.tagid, elem.tagtext], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertLibraryLst(elem){
	myObjExecSqliteSQL("INSERT INTO LibraryLst (librarylstid, libraryid, liblsttitle ) VALUES ( ?, ?, ?)", [elem.librarylstid , elem.libraryid, elem.liblsttitle], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertLibrary(elem){
	myObjExecSqliteSQL("INSERT INTO Library (libraryid, userid, libtitle, lstelemid ) VALUES ( ?, ?, ?, ?)", [elem.libraryid , elem.userid, elem.libtitle, elem.lstelemid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertUser(elem){
	myObjExecSqliteSQL("INSERT INTO User (userid, languageid, librarylstid, login, password, backupurl ) VALUES ( ?, ?, ?, ?, ?, ?)", [elem.userid, elem.languageid, elem.librarylstid, elem.login, elem.password, elem.backupurl], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertGlobElemAssociation(elem){
	myObjExecSqliteSQL("INSERT INTO GlobElemAssociation (globelemassoid, listelemid, nbuse) VALUES ( ?, ?, ?)", [elem.globelemassoid, elem.listelemid, elem.nbuse], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertElemAssociation(elem){
	myObjExecSqliteSQL("INSERT INTO ElemAssociation (elemassoid, globelemassoid, userid, nbuse, date) VALUES ( ?, ?, ?, ?, ?)", [elem.elemassoid, elem.globelemassoid, elem.userid, elem.nbuse, elem.date], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertText(elem){
	myObjExecSqliteSQL("INSERT INTO Text (textid, languageid, text) VALUES ( ?, ?, ?)", [elem.textid, elem.languageid, elem.text], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertElements(elem){
	myObjExecSqliteSQL("INSERT INTO Elements (elemid , elemurl , soundid, width) VALUES ( ?, ?, ?, ?)", [elem.elemid , elem.elemurl , elem.soundelem.soundid, elem.width], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertElemStat(elem){
	myObjExecSqliteSQL("INSERT INTO ElemStat (elemstatid , userid , nbuse, elemassoid) VALUES ( ?, ?, ?, ?)", [elem.elemstatid , elem.userid , elem.nbuse, elem.elemassoid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertGlobElemStat(elem){
	myObjExecSqliteSQL("INSERT INTO GlobElemStat (globelemstatid , nbuse , elemstatid) VALUES ( ?, ?, ?, ?)", [elem.globelemstatid , elem.nbuse , elem.elemstatid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function insertSound(elem){
	myObjExecSqliteSQL("INSERT INTO Sound (soundid , soundurl , languageid) VALUES ( ?, ?, ?, ?)", [elem.soundid , elem.soundurl , elem.languageid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err, null, 4));}, onSucces, onError);
	return true;
};

function selectLanguage(sql, objectLst, cb){ // sql form : WHERE languageid=1 and languagename='Français'
	var render = function(tx, rs) {
		//alert("begin traitment of selected elem");
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["languageid"]] = new myVoiceLanguage();
			window.appData.language[rs.rows.item(i)["languageid"]] = new myVoiceLanguage();
			//alert("first for loop");
			for (var propName in rs.rows.item(i)) {
				window.appData.language[rs.rows.item(i)["languageid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["languageid"]][propName] = rs.rows.item(i)[propName];
				//alert("second for loop");
			}
		}
		if (typeof cb !== undefined){
			//alert("befor cb");
			//debugelem(window.appData);
			cb(objectLst);
		}
	};

	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Language " + sql + " ORDER by languageid");
	} else {
		selectRecords(render, "SELECT * FROM Language ORDER by languageid");
	}
};

function selectTag(sql, objectLst, cb, cbarg){ // sql form : WHERE tagid=1 and tagname='Français'
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
			cb(objectLst, cbarg);
		}
	};

	if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Tag " + sql + " ORDER by tagid");
	} else {
		selectRecords(render, "SELECT * FROM Tag ORDER by tagid");
	}
};

function selectTagText(sql, objectLst, cb, cbarg){ // sql form : WHERE tagTextid=1 and tagTextname='Français'
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["tagtextid"]] = new myVoiceTagText();
			for (var propName in rs.rows.item(i)) {
				if (propName == "tagid"){
					selectTag("WHERE "+ propName + " = " + rs.rows.item(i)[propName], {}, function(tagLst, objToWrite){
						objToWrite["tagelem"] = tagLst[0];
					}, objectLst[rs.rows.item(i)["tagtextid"]]);
				} else {
					objectLst[rs.rows.item(i)["tagtextid"]][propName] = rs.rows.item(i)[propName];
				}
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
			objectLst[rs.rows.item(i)["liblstid"]] = new myVoiceLibraryLst();
			window.appData.libLst[rs.rows.item(i)["liblstid"]] = new myVoiceLibraryLst();
			for (var propName in rs.rows.item(i)) {
				window.appData.libLst[rs.rows.item(i)["liblstid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["liblstid"]][propName] = rs.rows.item(i)[propName];
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
			objectLst[rs.rows.item(i)["libid"]] = new myVoiceLibrary();
			window.appData.lib[rs.rows.item(i)["libid"]][propName] = new myVoiceLibrary();
			for (var propName in rs.rows.item(i)) {
				window.appData.lib[rs.rows.item(i)["libid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["libid"]][propName] = rs.rows.item(i)[propName];
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
