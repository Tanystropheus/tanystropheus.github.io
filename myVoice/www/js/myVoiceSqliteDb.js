function openDb(callback) {
    var dbName = "TMPDataBase2";
    //if (typeof window.sqlitePlugin !== undefined) {
        document.db = window.sqlitePlugin.openDatabase(
            {
                name: dbName, 
                //androidDatabaseImplementation: 2,
                //androidLockWorkaround: 1,
                location: 1
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
			document.db.executeSql("CREATE TABLE SimpsonFamily (id integer primary key, nom text)");
			document.db.executeSql("CREATE TABLE Elements (elemid integer primary key, elemurl text, songelem text, width integer)");
   /*this.pictid = pictId,
    this.elemurl = elemUrl,
    this.songelem = songUrl,
    //this.songelem = maVoixSong(songUrl, languageId, songId),
    this.width = Width,
    this.height = Height,*/
		} catch(err){
			alert("Error Create Table: " + JSON.strigify(err));
		} finally {
			insertInSqliteTable(tableName, "1, 'Homer'");
			insertInSqliteTable(tableName, "2, 'Marge'");
			insertInSqliteTable(tableName, "3, 'Bart'");
			insertInSqliteTable(tableName, "4, 'Lisa'");
		//    for (var tmpi = 5; tmpi < 20; tmpi++){
		//        insertInSqliteTable(tableName, 'id, nom', tmpi+",'Lisa"+tmpi+"'");
		//    }
		}
	} catch (err){
		alert("Error:" + JSON.stringify(err));
	} finally {
		if (callback){
			callback();
		}
		try {
			getAllTheDataDEBUG(tableName);
		} catch(e){
			allert("Error!! " + JSON.strigify(e));
		} finally {
			dropSqliteTable(tableName);
			dropSqliteTable('Elements');
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
    myExecSqliteSQL("INSERT INTO "+ tableName + " VALUES ("+ values +")", function(){alert("inserted");} , function(){alert("insertion fail");});
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
		alert(sql);
        document.db.transaction(function(tx) {
            tx.executeSql(sql, [], fn, function(e){alert("Erreur Selection");});
        });
    }catch(e){
        alert("error reading: " + e);
    } finally{
        alert("reading data  ok!!!! --> ^^");
    }
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
        alert("nb rows: " + rs.rows.length);
        for (var i = 0; i < rs.rows.length; i++) {
			text = text + JSON.stringify(rs.rows.item(i)) + "\n";
            //alert("Row: -->" + JSON.stringify(rs.rows.item(i))+ "<--");
            alert(text);
        }
        text = text + "<--\n";
        alert(text);
    };
    selectRecords(render, "SELECT * FROM " + tabName);
};


function myObjExecSqliteSQL(sql, values, okcb, errcb) {
        document.db.transaction(function(tx) {
             tx.executeSql(sql, values, okcb, errcb);
        }, function(){alert("Error transaction init");});
};

function insertElements (elem){
    myObjExecSqliteSQL("INSERT INTO Elements VALUES ( ?, ?, ?)", elem, function(){alert("elem inserted");} , function(){alert("elem insertion fail");});
    return true;
};
