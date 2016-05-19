
/* ********************************************************************************************* */
/* ***************************** fonction générique de Callback ******************************** */
/* ********************************************************************************************* */

function onError(e){
	alert("On Error: " + JSON.stringify(e, null, 4));
};

function onSucces(e){
	alert("Succes: " + JSON.stringify(e, null, 4));
};

function insertSucces(resolve){
	//alert("elem inserted");
	if(typeof(resolve) == Function) resolve("ok");
}

function updateSucces(){
	//alert("elem updated");
}
/* ********************************************************************************************* */
/* ************************* fonction D'ouverture de la base de donnée ************************* */
/* ********************************************************************************************* */

function openDb(okcb, failcb) {
	var dbName = "myVoice";
	var promese = new Promise(function(resolve, reject){
		document.db = window.sqlitePlugin.openDatabase(
			{
				name: dbName,
				key: 'your-password-here',
				iosDatabaseLocation: 'Library/LocalDatabase'
				//androidDatabaseImplementation: 2,
				//androidLockWorkaround: 1,
				//location: 2
			}, 
			function(value){
				if(resolve) return resolve(value);
			},
			function(err){
				if(reject) return reject(err);
			}
		);
	});
	return promese.then(
		function(msg){
			if(typeof(okcb) == Function) okcb(msg);
		},
		function(err){
			if(typeof(failcb) == Function) failcb(err);
			//alert("Error in opening DB: " + JSON.stringify(err, null, 4) /*+ ", trying to open in browser"*/);
			throw(err);
		}
	);
};

function initialInsert(){
	//alert("initial insert");
	return new Promise(function(resolve, reject){
		try{
			insertLanguage(new myVoiceLanguage(1, "Français"));
			insertLanguage(new myVoiceLanguage(2, "Anglais"));
			insertTag(new myVoiceTag(1, 1, "pomme"));
			insertTag(new myVoiceTag(1, 2, "appel"));
			insertLibraryLst(new myVoiceLibraryLst(1, "Classeur Utilisation", "2,1,3"));
			insertLibraryLst(new myVoiceLibraryLst(2, "Classeur Aprantisage", "5,4,6"));
			insertLibraryLst(new myVoiceLibraryLst(5, "Classeur Poteries", "5,4,6"));
			insertLibrary(new myVoiceLibrary(1, 0, "onglet1", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
			insertLibrary(new myVoiceLibrary(2, 0, "onglet2", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
			insertLibrary(new myVoiceLibrary(3, 0, "onglet3", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
			insertLibrary(new myVoiceLibrary(4, 0, "onglet4", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
			insertLibrary(new myVoiceLibrary(5, 0, "onglet5", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
			insertLibrary(new myVoiceLibrary(6, 0, "onglet6", "1_1,2_1,1_2,1_3,1_4,1_5,userid_elemid"));
			insertUser(new myVoiceUser("1,2,3", 0, 1, "login", "backendPass", "backupUrl", window.localStorage.getItem("Interfaces_Setings")));
			insertGlobElemAssociation(new myVoiceGlobElemAssociation(0, "1,3,5", 0));
			insertGlobElemAssociation(new myVoiceGlobElemAssociation(1, "3,5", 0));
			insertElemAssociation(new myVoiceElemAssociation(1, 0, 0, 1, Date.now()));
			insertText(new myVoiceText("test", 1, 1));
			insertSound(new myVoiceSound("soundurl", 1, 1));
			insertElements( new myVoiceElem(1, "img/logo.png", 10, 1, 1, 1, "1_1,languageid_tagid", 0));
			insertElements( new myVoiceElem(2, "img/logo.png", 10, 1, 1, 1, "2_1,languageid_tagid", 0));
			insertElements( new myVoiceElem(4, "img/logo.png", 10, 1, 1, 1, "1_1,languageid_tagid", 0));
			insertElements( new myVoiceElem(5, "img/logo.png", 10, 1, 1, 1, "1_1,languageid_tagid", 0));
			insertElemStat(new myVoiceElemStat(0, 0, "1,2,3, elemid_userid", 0, 1));
			insertGlobElemStat(new myVoiceGlobElemStat(0, 0, 0));
			updateSound(new myVoiceSound("soundurlUPDATED", 1, 1));
		} catch(err1){
			alert("Error Populate Table: " + JSON.stringify(err1, null, 4));
		} finally{
			//alert("end Initial Insert");
			resolve();
			//alert("End initial insert func");
		}
	}, function(){alert("promis Insert fail");});
}

function initialSelect(){
	//alert(JSON.stringify(selectLanguage("", window.appData.language, function(objLst){ /* alert("language: " + JSON.stringify(objLst, null, 4)); resolve(objLst); */ })));
	var selectPromises = [
		selectLanguage( undefined , window.appData.language, function(objLst){ resolve(objLst);}),
		selectTag("", window.appData.tag , function(objLst){ resolve(objLst);}),
		selectLibraryLst("", window.appData.libraryLst, function(objLst){ resolve(objLst);}),
		selectLibrary("", window.appData.library, function(objLst){ resolve(objLst);}),
		selectUser("", window.appData.user, function(objLst){ resolve(objLst);}),
		selectGlobElemAssociation("", window.appData.globElemAssociation, function(objLst){ resolve(objLst);}),
		selectElemAssociation("", window.appData.elemAssociation, function(objLst){ resolve(objLst);}),
		selectText("", window.appData.text, function(objLst){ resolve(objLst);}),
		selectElements("", window.appData.elements, function(objLst){ resolve(objLst);}),
		selectElemStat("", window.appData.elemStat, function(objLst){ resolve(objLst);}),
		selectGlobElemStat("", window.appData.globElemStat, function(objLst){ resolve(objLst);}),
		selectSound("", window.appData.sound, function(objLst){ resolve(objLst);})
	];

	var selectPromiseALL =  Promise.all(selectPromises).then(function(value){
		//alert("begin of selectPromiseALL " + JSON.stringify(value, null, 4));
	}, function(err1, err2){
		alert("Error selectPromiseALL!! " + JSON.stringify(err1, null, 4) + "\n" + JSON.stringify(err2, null, 4));
	}).catch(function(err1, err2){alert("Error Catch1!!!! " + JSON.stringify(err1, null, 4) + "\n" + JSON.stringify(err2, null, 4));});
	//alert("end initiialSelect");
	return selectPromiseALL; //Promise.resolve(selectPromiseALL);
}

function initDb(callback){
	/*
	 * Fonction as executer aprés l'ouvertuur de la basse de donné pour 
	 * initialiser la basse et créer les tables
	 * */
	createTableSql = [
	"DROP TABLE IF EXISTS Context",
	"CREATE TABLE Context (contextid integer primary key,  time date, places text, activiti text, interlocutor text)",
	"DROP TABLE IF EXISTS ElemAssociation",
	"CREATE TABLE ElemAssociation (elemassoid integer primary key, globelemassoid integer, userid integer, nbuse integer, date date, FOREIGN KEY(userid) REFERENCES User(userid), FOREIGN KEY(globelemassoid) REFERENCES GlobElemAssociation(globelemassoid))",
	"DROP TABLE IF EXISTS ElemSetings",
	"CREATE TABLE ElemSetings (elemsetingsid integer primary key, width integer, writing text, sound integer, lastchange date, FOREIGN KEY(languageid) REFERENCES Language(languageid))",
	"DROP TABLE IF EXISTS ElemStat",
	"CREATE TABLE ElemStat (elemstatid integer primary key,  userid integer, nbuse integer, elemassoid integer, FOREIGN KEY(userid) REFERENCES User(userid), FOREIGN KEY(elemassoid) REFERENCES ElemAssociation(elemassoid))",
	"DROP TABLE IF EXISTS Elements",
	"CREATE TABLE Elements (elemid integer, user integer, elemurl text, soundid integer, width integer, textid integer, state integer, taglst text, FOREIGN KEY(textid) REFERENCES Text(textid), FOREIGN KEY(soundid) REFERENCES Sound(soundid), CONSTRAINT PK_elements PRIMARY KEY (elemid, user))",
	"DROP TABLE IF EXISTS GlobElemAssociation",
	"CREATE TABLE GlobElemAssociation (globelemassoid integer primary key, listelemid integer, nbuse integer)",
	"DROP TABLE IF EXISTS GlobElemStat",
	"CREATE TABLE GlobElemStat (globelemstatid integer primary key, nbuse integer,  elemstatid, FOREIGN KEY(elemstatid) REFERENCES ElemStat(elemstatid))",
	"DROP TABLE IF EXISTS Language",
	"CREATE TABLE Language (languageid integer primary key, langname text)",
	"DROP TABLE IF EXISTS LerningStat",
	"CREATE TABLE LerningStat (lerningstatid integer primary key,  contextid integer, elemstatid integer, nbtrue, FOREIGN KEY(contextid) REFERENCES Context(contextid), FOREIGN KEY(elemstatid) REFERENCES ElemStat(elemstatid))",
	"DROP TABLE IF EXISTS Library",
	"CREATE TABLE Library (libraryid integer primary key, userid integer, libtitle text, lstelemid text, FOREIGN KEY(userid) REFERENCES User(userid))",
	"DROP TABLE IF EXISTS LibraryLst",
	"CREATE TABLE LibraryLst (librarylstid integer primary key, libraryid text, liblsttitle text)",
	"DROP TABLE IF EXISTS Sound",
	"CREATE TABLE Sound (soundid integer primary key, soundurl text,  languageid, FOREIGN KEY(languageid) REFERENCES Language(languageid))",
	"DROP TABLE IF EXISTS Tag",
	"CREATE TABLE Tag (tagid integer, languageid integer, tagtext text, FOREIGN KEY(languageid) REFERENCES Language(languageid), CONSTRAINT PK_tag PRIMARY KEY (tagid, languageid))",
	"DROP TABLE IF EXISTS Text",
	"CREATE TABLE Text (textid integer primary key, languageid text, text text, FOREIGN KEY(languageid) REFERENCES Language(languageid))",
	"DROP TABLE IF EXISTS User",
	"CREATE TABLE User (userid integer primary key, languageid integer, librarylstid text, login text, password text, backupurl text, interfacesetings text, FOREIGN KEY(languageid) REFERENCES Language(languageid), FOREIGN KEY(librarylstid) REFERENCES LibraryLst(librarylstid))"
	];

	var createTablePromises = [];
	var initPromise;
	//alert("1");
	for (var sqlReq in createTableSql){
		createTablePromises.push(new Promise(function(){
			//alert("sql: " + createTableSql[sqlReq]);
			document.db.executeSql( createTableSql[sqlReq], null, function(res){
				//alert(createTableSql[sqlReq] + " finish");
				resolve(res);
			});
		}));
	}

	if(sqlReq = createTableSql.length){
		//alert("test100");
		initPromise = Promise.all(createTableSql).then(
			initialInsert,
			function(err){
				alert("Error Create Table: " + JSON.stringify(err, null, 4));
			}
		).then(
			initialSelect,
			function(err1, err2){
				alert("Error select!! " + JSON.stringify(err1, null, 4) + "\n" + JSON.stringify(err2, null, 4));
			}
		).then(function(){
			if (callback){
				callback();
			}
			var tableLst = [ "Language", "Tag", "LibraryLst", "Library", "User", "GlobElemAssociation", "ElemAssociation", "Text", "Elements", "ElemStat", "GlobElemStat", "Sound", "LerningStat", "Context"];
			alert("DROP Des tables!");
			for(var table in tableLst){
				dropSqliteTable(tableLst[table]);
			}
		});
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
	return new Promise(function(){
		//alert("sql: " + createTableSql[sqlReq]);
		document.db.transaction(function(tx) {
			 tx.executeSql(sql, null, okcb, errcb);
		}, function(){alert("Error transaction init");});
	});
};

function myObjExecSqliteSQL(sql, values, okcb, errcb) {
	/*
	 * Fonction generique executant les requetes as la base de donnée
	 * sql est la requete écrite en SQL as executer 
	 * values est la variable contenent les valeurs as remplacer dans la requette (Pour les requetes préparer)
	 * okcb est la fonction de callback en cas de sucés
	 * errcb est la fonction de callback en cas d'erreur
	 * */
	return new Promise(function(){
		//alert("sql: " + createTableSql[sqlReq]);
		document.db.transaction(function(tx) {
			 tx.executeSql(sql, values, okcb, errcb);
		}, function(){alert("Error transaction init");});
	});
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

	var selectRecPromise = new Promise(function(){
		document.db.transaction(function(tx) {
			return tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection ( " + sql +" ): " + JSON.stringify(e, null, 4));});
		});
	}, function(err){alert("error reading: " + JSON.stringify(err, null, 4));});
	//alert("selectRecPromise: " + JSON.stringify(selectRecPromise.then(), null, 4));
	return selectRecPromise.then(alert, alert);
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
