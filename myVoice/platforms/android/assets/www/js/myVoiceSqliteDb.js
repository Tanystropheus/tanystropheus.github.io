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
			//createSqliteTable(tableName, 'id integer primary key, nom text');
		} catch(err){
			alert("Error Create Table: " + JSON.strigify(err));
		} finally {
			insertInSqliteTable(tableName, 'id, nom', "1, 'Homer'");
			insertInSqliteTable(tableName, 'id, nom', "2, 'Marge'");
			insertInSqliteTable(tableName, 'id, nom', "3, 'Bart'");
			insertInSqliteTable(tableName, 'id, nom', "4, 'Lisa'");
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
	}
    
    //getAllTheDataDEBUG(tableName);
};

function myExecSqliteSQL(sql, result, okcb, errcb) {
    //alert(sql);
//    if (okcb){
        document.db.transaction(function(tx) {
             result = tx.executeSql(sql, null, errcb, okcb);
        }, function(){alert("Error transaction init");});
/*    } else if(okcb === null){
        document.db.transaction(function(tx) {
             result = tx.executeSql(sql, null, onError, null);
        }, function(){alert("Error transaction init");});
    }else {
        document.db.transaction(function(tx) {
             result = tx.executeSql(sql, null, onError);
        }, function(){alert("Error transaction init");}); 
    }*/
};

function createSqliteTable(tableName, champ) {
    myExecSqliteSQL('CREATE TABLE IF NOT EXISTS ' + tableName + ' ('+champ+')', function(){alert("table created");}, function(){alert("table creation fail");});
    return true;
};

function dropSqliteTable (tableName) {
    myExecSqliteSQL('DROP TABLE' + tableName, function(){alert("drop table succes");}, function(){alert("Drop table fail");});
    return true;
};

function insertInSqliteTable (tableName, champToModifie, values){
    myExecSqliteSQL("INSERT INTO "+ tableName + " VALUES ("+ values +")", function(){alert("elem inserted");} , function(){alert("elem insertion fail");});
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
    //db = openDb(initDb());
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
        // rs contains our SQLite recordset
        alert("nb rows: " + rs.rows.length);
        for (var i = 0; i < rs.rows.length; i++) {
            alert("Row: -->" + JSON.stringify(rs.rows.item(i))+ "<--");
        }
    };
    selectRecords(render, "SELECT * FROM " + tabName);
};
