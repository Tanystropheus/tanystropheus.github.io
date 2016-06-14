
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
		window.db = window.sqlitePlugin.openDatabase(
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
	//~ alert("initial insert");
	insertSql = genInitSql();
	var insertPromises = [];
	for (var sqlReq in insertSql){
		insertPromises.push(new Promise(function(){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( insertSql[sqlReq], null, function(res){
				//alert(insertSql[sqlReq] + " finish succes");
				resolve(res);
			}, function(err, err2){
				alert(insertSql[sqlReq] + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));
	}
	return Promise.all(insertSql).then(
		function(val){
			//~ alert("Insert initial data ok");
		},
		function(err){
			alert("Insert initial data Fail!!: " + JSON.stringify(err, null, 4));
		}
	);
}

function initialSelect(){
	//~ alert("initial select");
	//~ selectElemAssociation("", window.appData.elemAssociation, null).then(function(){alert("testPromises")});
	var selectPromises = [
		selectLanguage( "" , window.appData.language, null),
		selectLibraryLst("", window.appData.libraryLst, null),
		selectLibrary("", window.appData.library, null),
		selectText("", window.appData.text, null),
		selectElements("", window.appData.elements, null),
		selectSound("", window.appData.sound, null),
		selectElemAssociation("", window.appData.elemAssociation, null)
	];
	//~ alert("initial select after tab");

	var selectPromiseALL = Promise.all(selectPromises).then(function(value){
		alert("Prout");
		//~ alert("begin of selectPromiseALL " + JSON.stringify(value, null, 4));
		//resolve(true);
	}, function(err1, err2){
		alert("Prout2");
		alert("Error selectPromiseALL!! " + JSON.stringify(err1, null, 4) + "\n" + JSON.stringify(err2, null, 4));
	}).catch(function(err1, err2){alert("Error Catch1!!!! " + JSON.stringify(err1, null, 4) + "\n" + JSON.stringify(err2, null, 4));});
	//~ alert("end initiialSelect");
	return selectPromiseALL; //Promise.resolve(selectPromiseALL);
}

function initDb(callback){
	/*
	 * Fonction as executer aprés l'ouvertuur de la basse de donné pour 
	 * initialiser la basse et créer les tables
	 * */
	createTableSql = [
	"DROP TABLE IF EXISTS Context",
	"DROP TABLE IF EXISTS ElemAssociation",
	"DROP TABLE IF EXISTS Setings",
	"DROP TABLE IF EXISTS Elements",
	"DROP TABLE IF EXISTS Language",
	"DROP TABLE IF EXISTS LerningStat",
	"DROP TABLE IF EXISTS Library",
	"DROP TABLE IF EXISTS LibraryLst",
	"DROP TABLE IF EXISTS Sound",
	"DROP TABLE IF EXISTS Text",
	"DROP TABLE IF EXISTS ElemSetings",
	"DROP TABLE IF EXISTS LibElem",
	"DROP TABLE IF EXISTS LibLink",
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
	for (var sqlReq in createTableSql){
		createTablePromises.push(new Promise(function(){
			//~ alert("sql: " + createTableSql[sqlReq]);
			window.db.executeSql( createTableSql[sqlReq], null, function(res){
				resolve(res);
			},
			function(err){
				reject(err);
			});
		}));
	}

	if(sqlReq = createTableSql.length){
		//~ alert("test100");
		return Promise.all(createTableSql).then(
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
			//~ alert("test");
			if (callback){
				callback();
			}
			//~ var tableLst = [ "Language", "Tag", "LibraryLst", "Library", "User", "GlobElemAssociation", "ElemAssociation", "Text", "Elements", "ElemStat", "GlobElemStat", "Sound", "LerningStat", "Context"];
			//~ alert("DROP Des tables!");
			//~ for(var table in tableLst){
				//~ dropSqliteTable(tableLst[table]);
			//~ }
		}).catch(function(){alert("Caca bordel de merde!!!!!!!");});
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
		window.db.transaction(function(tx) {
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
                window.db.transaction(function(tx) {
                        tx.executeSql(sql, values, okcb, errcb);
               }, function(){alert("Error transaction init");});
       });

	//~ return new Promise(function(resolve, reject){
		//~ alert("sql: " + createTableSql[sqlReq]);
		//~ window.db.transaction(function(tx) {
			 //~ tx.executeSql(sql, values, function(val){alert("ok");resolve(val); okcb(val);}, function(err){reject(err); errcb(val);});
		//~ }, function(err1, err2){alert("Error transaction init: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));});
	//~ }, function(err){alert("Error myObjExecSqliteSQL Create promise: " + JSON.stringify(err, null, 4));});
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

	//~ alert("Begin Selection ( " + sql +" )");
	var selectRecPromise = new Promise(function(){
		window.db.transaction(function(tx) {
			return tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection ( " + sql +" ): " + JSON.stringify(e, null, 4));});
		});
	}, function(err){alert("error reading: " + JSON.stringify(err, null, 4));});
	//~ alert("selectRecPromise: " + JSON.stringify(selectRecPromise.then(), null, 4));
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
