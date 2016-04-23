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
			document.db.executeSql("CREATE TABLE TagText (tagtextid integer primary key, languageid integer, tagid integer," +
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
			alert("Error Create Table: " + JSON.strigify(err));
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
		}
	} catch (err){
		alert("Error:" + JSON.stringify(err));
	} finally {
		if (callback){
			callback();
		}
		languageObjectLst = {};
		try {
			selectLanguage("", languageObjectLst, function(objLst){for(var i in objLst)debugelem(objLst[i])});
			//getAllTheDataDEBUG(tableName);
			//getAllTheDataDEBUG('Language');
			/*getAllTheDataDEBUG('Tag');
			getAllTheDataDEBUG('TagText');
			getAllTheDataDEBUG('LibraryLst');
			getAllTheDataDEBUG('Library');
			getAllTheDataDEBUG('User');
			getAllTheDataDEBUG('ElemAssociation');
			getAllTheDataDEBUG('GlobElemAssociation');
			getAllTheDataDEBUG('ElemStat');
			getAllTheDataDEBUG('GlobElemStat');
			getAllTheDataDEBUG('Elements');
			getAllTheDataDEBUG('Sound');*/

		} catch(e){
			allert("Error!! " + JSON.strigify(e));
		} finally {
//			dropSqliteTable(tableName);
//			dropSqliteTable('Elements');
//			dropSqliteTable('Sound');
			dropSqliteTable('Language');
			//debugelem(languageObjectLst);
			//alert("test languageObjectLst: " + JSON.stringify(languageObjectLst));
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
            tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection ( " + sql +" ): " + JSON.stringify(e));});
        });
    }catch(e){
        alert("error reading: " + e);
    } /*finally{
        alert("reading data  ok!!!! --> ^^");
    }*/
};

function onError(e){
    alert("On Error: " + JSON.stringify(e));
};

function onSucces(e){
    alert("Succes: " + JSON.stringify(e));
};

function getAllTheDataDEBUG(tabName) {
    var render = function(tx, rs) {
		var text = "Content of "+ tabName +": --> \n" ;
        //alert("nb rows: " + rs.rows.length);
        for (var i = 0; i < rs.rows.length; i++) {
			text = text + JSON.stringify(rs.rows.item(i)) + "\n";
            //alert("Row: -->" + JSON.stringify(rs.rows.item(i))+ "<--");
            //alert(text);
        }
        text = text + "<--\n";
        alert(text);
    };
    selectRecords(render, "SELECT * FROM " + tabName);
};


function myObjExecSqliteSQL(sql, values, okcb, errcb) {
        document.db.transaction(function(tx) {
             tx.executeSql(sql, values, okcb, errcb);
        }, function(e){alert("Error transaction init " + JSON.stringify(e));});
};

function insertLanguage(elem){
    myObjExecSqliteSQL("INSERT INTO Language (languageid, langname ) VALUES ( ?, ?)", [elem.languageid , elem.langname], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertTag(elem){
    myObjExecSqliteSQL("INSERT INTO Tag (tagid, tagname ) VALUES ( ?, ?)", [elem.tagid , elem.tagname], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertTagText(elem){
    myObjExecSqliteSQL("INSERT INTO TagText (tagtextid, languageid, tagid ) VALUES ( ?, ?, ?)", [elem.tagtextid , elem.languageid, elem.tagid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertLibraryLst(elem){
    myObjExecSqliteSQL("INSERT INTO LibraryLst (librarylstid, libraryid, liblsttitle ) VALUES ( ?, ?, ?)", [elem.librarylstid , elem.libraryid, elem.liblsttitle], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertLibrary(elem){
    myObjExecSqliteSQL("INSERT INTO Library (libraryid, userid, libtitle, lstelemid ) VALUES ( ?, ?, ?, ?)", [elem.libraryid , elem.userid, elem.libtitle, elem.lstelemid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertUser(elem){
    myObjExecSqliteSQL("INSERT INTO User (userid, languageid, librarylstid, login, password, backupurl ) VALUES ( ?, ?, ?, ?, ?, ?)", [elem.userid, elem.languageid, elem.librarylstid, elem.login, elem.password, elem.backupurl], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertGlobElemAssociation(elem){
    myObjExecSqliteSQL("INSERT INTO GlobElemAssociation (globelemassoid, listelemid, nbuse) VALUES ( ?, ?, ?)", [elem.globelemassoid, elem.listelemid, elem.nbuse], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertElemAssociation(elem){
    myObjExecSqliteSQL("INSERT INTO ElemAssociation (elemassoid, globelemassoid, userid, nbuse, date) VALUES ( ?, ?, ?, ?, ?)", [elem.elemassoid, elem.globelemassoid, elem.userid, elem.nbuse, elem.date], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertText(elem){
    myObjExecSqliteSQL("INSERT INTO Text (textid, languageid, text) VALUES ( ?, ?, ?)", [elem.textid, elem.languageid, elem.text], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertElements(elem){
    myObjExecSqliteSQL("INSERT INTO Elements (elemid , elemurl , soundid, width) VALUES ( ?, ?, ?, ?)", [elem.elemid , elem.elemurl , elem.soundelem.soundid, elem.width], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertElemStat(elem){
    myObjExecSqliteSQL("INSERT INTO ElemStat (elemstatid , userid , nbuse, elemassoid) VALUES ( ?, ?, ?, ?)", [elem.elemstatid , elem.userid , elem.nbuse, elem.elemassoid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertGlobElemStat(elem){
    myObjExecSqliteSQL("INSERT INTO GlobElemStat (globelemstatid , nbuse , elemstatid) VALUES ( ?, ?, ?, ?)", [elem.globelemstatid , elem.nbuse , elem.elemstatid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function insertSound(elem){
    myObjExecSqliteSQL("INSERT INTO Sound (soundid , soundurl , languageid) VALUES ( ?, ?, ?, ?)", [elem.soundid , elem.soundurl , elem.languageid], function(){alert("elem inserted");} , function(err){alert("elem insertion fail " + JSON.stringify(err));}, onSucces, onError);
    return true;
};

function selectLanguage(sql, languageObjectLst, cb){ // sql form : WHERE languageid=1 and languagename='Français'
	//languageObjectLst = {};
    var render = function(tx, rs) {
        for (var i = 0; i < rs.rows.length; i++) {
			languageObjectLst[i] = new myVoiceLanguage();
			for (var propName in rs.rows.item(i)) {
				languageObjectLst[i][propName] = rs.rows.item(i)[propName];
			}
        }
        if (typeof cb !== undefined){
			cb(languageObjectLst);
		}
    };
    if(sql !== undefined){
		selectRecords(render, "SELECT * FROM Language " + sql);
	} else {
		selectRecords(render, "SELECT * FROM Language");
	}
};
