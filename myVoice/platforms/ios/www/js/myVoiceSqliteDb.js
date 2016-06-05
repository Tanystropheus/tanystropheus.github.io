
/* ********************************************************************************************* */
/* ***************************** fonction générique de Callback ******************************** */
/* ********************************************************************************************* */

function onError(e){
	alert("On Error: " + JSON.stringify(e, null, 4));
}

function onSucces(e){
	alert("Succes: " + JSON.stringify(e, null, 4));
}

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
}

function initialInsert(){
	//alert("initial insert");
	//~ insertSql = [
		 "INSERT INTO Language (langname) VALUES('Français')";}
		//~ "INSERT INTO Language (langname) VALUES('Anglais')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Manger')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Boire')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Courir')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Sauter')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Tourner')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Tirer')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Pouser')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Donner')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Chatouiller')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Souffler')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Secouer')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Sortir')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Suvrir')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'Fermer')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'rouler')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'glisser')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'allumer')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, ' faire un câlin')",
		//~ "INSERT INTO Text (languageid, text) VALUES ( 1, 'faire un bisou')",
		//~ "INSERT INTO Sound (soundurl,  languageid) VALUES ('fakeURL1', 1)",
		//~ "INSERT INTO Sound (soundurl,  languageid) VALUES ('fakeURL2', 1)",
		//~ "INSERT INTO Sound (soundurl,  languageid) VALUES ('fakeURL3', 1)",
		//~ "INSERT INTO Sound (soundurl,  languageid) VALUES ('fakeURL4', 1)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 1)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 2)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 3)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 4)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 5)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 6)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 7)",
		//~ "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: '', policecolor: '', size: 15, color: '', place: 0}', 1, 0, 8)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre1.png', 1, 1, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre2.png', 1, 2, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre3.png', 1, 3, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre4.png', 1, 4, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre5.png', 1, 5, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre6.png', 1, 6, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre7.png', 1, 7, 0)",
		//~ "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/carre8.png', 1, 8, 0)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (1, 1)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (2, 2)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (3, 3)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (4, 4)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (5, 5)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (6, 6)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (7, 7)",
		//~ "INSERT INTO ElemSetings (setingsid, elemid) VALUES (8, 8)",
		//~ "INSERT INTO Library (libtitle) VALUES ('onglet1')",
		//~ "INSERT INTO Library (libtitle) VALUES ('onglet2')",
		//~ "INSERT INTO Library (libtitle) VALUES ('onglet3')",
		//~ "INSERT INTO Library (libtitle) VALUES ('onglet4')",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (1, 1)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (1, 2)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (2, 3)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (2, 4)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (3, 5)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (3, 6)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (4, 7)",
		//~ "INSERT INTO LibElem (libraryid, elemid) VALUES (4, 8)",
		//~ "INSERT INTO LibraryLst (liblsttitle, userlog) VALUES ('utilisation', 'LogUtilisateur1')",
		//~ "INSERT INTO LibLink (libraryid, librarylstid) VALUES (1, 1)",
		//~ "INSERT INTO LibLink (libraryid, librarylstid) VALUES (2, 1)",
		//~ "INSERT INTO LibLink (libraryid, librarylstid) VALUES (3, 1)",
		//~ "INSERT INTO LibLink (libraryid, librarylstid) VALUES (4, 1)"
	//~ ];
// 	insertSql = genInitSql();
// 	var insertPromises = [];
// 	for (var sqlReq in insertSql){
// 		insertPromises.push(new Promise(function(){
// 			//alert("sql: " + insertSql[sqlReq]);
// 			document.db.executeSql( insertSql[sqlReq], null, function(res){
// 				//alert(insertSql[sqlReq] + " finish succes");
// 				resolve(res);
// 			}, function(err, err2){
// 				alert(insertSql[sqlReq] + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
// 				return reject(err);
// 			});
// 		}));
// 	}
// 	return Promise.all(insertSql).then(
// 		function(val){
// 			//alert("Insert initial data ok");
// 		},
// 		function(err){
// 			alert("Insert initial data Fail!!: " + JSON.stringify(err, null, 4));
// 		}
// 	);
// }

function initialSelect(){
	//alert(JSON.stringify(selectLanguage("", window.appData.language, function(objLst){ /* alert("language: " + JSON.stringify(objLst, null, 4)); resolve(objLst); */ })));
	//alert(JSON.stringify(window.appData.elements));
	var selectPromises = [
		selectLanguage( "" , window.appData.language, function(objLst){ resolve(objLst);}),
		selectLibraryLst("", window.appData.libraryLst, function(objLst){ resolve(objLst);}),
		selectLibrary("", window.appData.library, function(objLst){ resolve(objLst);}),
		selectElemAssociation("", window.appData.elemAssociation, function(objLst){ resolve(objLst);}),
		selectText("", window.appData.text, function(objLst){ resolve(objLst);}),
		selectElements("", window.appData.elements, function(objLst){ resolve(objLst);}),
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
	// "DROP TABLE IF EXISTS Context",
	// "DROP TABLE IF EXISTS ElemAssociation",
	// "DROP TABLE IF EXISTS ElemSetings",
	// "DROP TABLE IF EXISTS Elements",
	// "DROP TABLE IF EXISTS Language",
	// "DROP TABLE IF EXISTS LerningStat",
	// "DROP TABLE IF EXISTS Library",
	// "DROP TABLE IF EXISTS LibraryLst",
	// "DROP TABLE IF EXISTS Sound",
	// "DROP TABLE IF EXISTS Text",
	"CREATE TABLE Context (contextid integer primary key AUTOINCREMENT,  time date, places text, activiti text, interlocutor text)",
	"CREATE TABLE ElemAssociation (elemassoid integer primary key AUTOINCREMENT, elemlst text, date date, learning integer)",
	"CREATE TABLE Setings (setingsid integer primary key AUTOINCREMENT, width integer, writing text, sound integer, lastchange date, pos integer)",
	"CREATE TABLE Elements (elemid integer primary key AUTOINCREMENT, elemurl text, soundid integer, textid integer, state integer, FOREIGN KEY(textid) REFERENCES Text(textid), FOREIGN KEY(soundid) REFERENCES Sound(soundid))",
	"CREATE TABLE Language (languageid integer primary key AUTOINCREMENT, langname text)",
	"CREATE TABLE LerningStat (lerningstatid integer primary key AUTOINCREMENT, contextid integer, elemassoid integer, good integer, FOREIGN KEY(contextid) REFERENCES Context(contextid), FOREIGN KEY(elemassoid) REFERENCES ElemAssociation(elemassoid))",
	"CREATE TABLE Library (libraryid integer primary key AUTOINCREMENT, libtitle text)",
	"CREATE TABLE LibraryLst (librarylstid integer primary key AUTOINCREMENT, liblsttitle text, userlog text)",
	"CREATE TABLE Sound (soundid integer primary key AUTOINCREMENT, soundurl text,  languageid, FOREIGN KEY(languageid) REFERENCES Language(languageid))",
	"CREATE TABLE ElemSetings (elemsetingsid integer primary key AUTOINCREMENT, setingsid integer, elemid integer,  FOREIGN KEY(setingsid) REFERENCES Setings(setingsid),  FOREIGN KEY(elemid) REFERENCES Elements(elemid))",
	"CREATE TABLE LibElem (libelemid integer primary key AUTOINCREMENT, libraryid integer, elemid integer,  FOREIGN KEY(libraryid) REFERENCES Library(libraryid),  FOREIGN KEY(elemid) REFERENCES Elements(elemid))",
	"CREATE TABLE LibLink (liblinkid integer primary key AUTOINCREMENT, libraryid integer, librarylstid integer,  FOREIGN KEY(libraryid) REFERENCES Library(libraryid), FOREIGN KEY(librarylstid) REFERENCES LibraryLst(librarylstid))",
	"CREATE TABLE Text (textid integer primary key AUTOINCREMENT, languageid integer, text text, FOREIGN KEY(languageid) REFERENCES Language(languageid))"
	//~ "CREATE TABLE User (userid integer primary key AUTOINCREMENT, languageid integer, librarylstid text, interfacesetings text, FOREIGN KEY(languageid) REFERENCES Language(languageid), FOREIGN KEY(librarylstid) REFERENCES LibraryLst(librarylstid))"
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
			},
			function(err){
				reject(err);
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
			//~ var tableLst = [ "Language", "Tag", "LibraryLst", "Library", "User", "GlobElemAssociation", "ElemAssociation", "Text", "Elements", "ElemStat", "GlobElemStat", "Sound", "LerningStat", "Context"];
			//~ alert("DROP Des tables!");
			//~ for(var table in tableLst){
				//~ dropSqliteTable(tableLst[table]);
			//~ }
		});
	}
}

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
}

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

	//~ return new Promise(function(resolve, reject){
		//~ alert("sql: " + createTableSql[sqlReq]);
		//~ document.db.transaction(function(tx) {
			 //~ tx.executeSql(sql, values, function(val){alert("ok");resolve(val); okcb(val);}, function(err){reject(err); errcb(val);});
		//~ }, function(err1, err2){alert("Error transaction init: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));});
	//~ }, function(err){alert("Error myObjExecSqliteSQL Create promise: " + JSON.stringify(err, null, 4));});
}

/* ********************************************************************************************* */
/* ***************** fonction générique de relation avec la base de donnée ***********************/
/* ********************************************************************************************* */

function createSqliteTable(tableName, champ) {
	myExecSqliteSQL('CREATE TABLE IF NOT EXISTS ' + tableName + ' ('+champ+')', function(){alert("table "+ tableName +" created");}, function(){alert("table "+ tableName +" creation fail");});
	return true;
}

function dropSqliteTable (tableName) {
	myExecSqliteSQL('DROP TABLE ' + tableName, function(){/*alert("drop " + tableName + " table succes");*/}, function(){alert("Drop table "+ tableName +" fail");});
	return true;
}

function insertInSqliteTable (tableName, values){
	myExecSqliteSQL("INSERT INTO "+ tableName + " VALUES ("+ values +")", function(){/*alert("inserted");*/} , function(){alert("insertion fail");});
	return true;
}

function updateInSqliteTable (tableName, setString, condition){
	myExecSqliteSQL("UPDATE "+ tableName + "SET " + setString +" WHERE "+ condition, function(){alert("elem update succes");}, function(){alert("elem update fail");});
	return true;
}

function deleteInSqliteTable (db, tableName, condition){
	myExecSqliteSQL(db, "DELETE FROM "+ tableName + " WHERE "+ condition, function(){alert("elem deleted");}, function(){alert("elem deletion fail");});
	return true;
}

function selectRecords(fn, sql) {

	//alert("Begin Selection ( " + sql +" )");
	var selectRecPromise = new Promise(function(){
		document.db.transaction(function(tx) {
			return tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection ( " + sql +" ): " + JSON.stringify(e, null, 4));});
		});
	}, function(err){alert("error reading: " + JSON.stringify(err, null, 4));});
	//alert("selectRecPromise: " + JSON.stringify(selectRecPromise.then(), null, 4));
	return selectRecPromise.then(alert, alert);
}

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
}
