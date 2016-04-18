/* 
 * The location option is used to select the database subdirectory location (iOS only) with the following choices:
 * 0 (default): Documents - visible to iTunes and backed up by iCloud
 * 1: Library - backed up by iCloud, NOT visible to iTunes
 * 2: Library/LocalDatabase - NOT visible to iTunes and NOT backed up by iCloud
 * 
 * for IOS var sqlitedb = window.sqlitePlugin.openDatabase({name: "my.db", location: 2});
 */

//app = app || {};


function openDb() {
    var dbName = "TMPDataBase2";
    //if (typeof window.sqlitePlugin !== undefined) {
        document.db = window.sqlitePlugin.openDatabase(
            {
                name: dbName, 
                androidDatabaseImplementation: 2,
                androidLockWorkaround: 1,
                location: 2
            },
            function (msg) {
              callback();
            },
            function (msg) {
              alert("error: " + msg);
            }
        );
//    } else {
//        // For debugging in simulator fallback to native SQL Lite
//        db = window.openDatabase(dbName, "1.0", "MyVoice DataBase", 200000);
//    }
};

function initDb(){
    var tableName = 'SimpsonFamily';
    createSqliteTable(tableName, 'id integer primary key, nom text');
    insertInSqliteTable(tableName, 'id, nom', "1,'Homer'");
    insertInSqliteTable(tableName, 'id, nom', "2,'Marge'");
    insertInSqliteTable(tableName, 'id, nom', "3,'Bart'");
    insertInSqliteTable(tableName, 'id, nom', "4,'Lisa'");
//    for (var tmpi = 5; tmpi < 20; tmpi++){
//        insertInSqliteTable(tableName, 'id, nom', tmpi+",'Lisa"+tmpi+"'");
//    }
    
    getAllTheDataDEBUG(tableName);
};

function myExecSqliteSQL(sql, result, okcb) {
    alert(sql);
    if (okcb){
        document.db.transaction(function(tx) {
             result = tx.executeSql(sql);
        }, okcb, onError);
    } else if(okcb === null){
        document.db.transaction(function(tx) {
             result = tx.executeSql(sql, null, onError);
        }, onSucces, null);
    }else {
        document.db.transaction(function(tx) {
             result = tx.executeSql(sql);
        }, onSucces, onError);
    }
};

function createSqliteTable(tableName, champ) {
    myExecSqliteSQL('CREATE TABLE IF NOT EXISTS ' + tableName + ' ('+champ+')');
    return true;
};

function dropSqliteTable (tableName) {
    myExecSqliteSQL('DROP TABLE' + tableName);
    return true;
};

function insertInSqliteTable (tableName, champToModifie, values)
{
    myExecSqliteSQL("INSERT INTO "+ tableName + ' ' + champToModifie +" VALUES ("+ values +")", null);
    return true;
};

function updateInSqliteTable (tableName, setString, condition)
{
    myExecSqliteSQL("UPDATE "+ tableName + "SET " + setString +" WHERE "+ condition);
    return true;
};

function deleteInSqliteTable (db, tableName, condition)
{
    myExecSqliteSQL(db, "DELETE FROM "+ tableName + " WHERE "+ condition);
    return true;
};

function selectRecords(fn, sql, where, by) {
    //db = openDb(initDb());
    try{
        document.db.transaction(function(tx) {
            tx.executeSql(sql, [], fn, onError);
        });
    }catch(e){
        alert("error reading: " + e);
    } finally{
        alert("reading data  ok!!!! --> ^^");
    }
};
function onError(e){
    alert("error reading: " + JSON.stringify(e));
}

function onSucces(e){
    alert("Succes: " + JSON.stringify(e));
}
function getAllTheDataDEBUG(tabName) {
    var render = function(tx, rs) {
        // rs contains our SQLite recordset
        alert("nb rows: " + rs.rows.length);
        for (var i = 0; i < rs.rows.length; i++) {
            alert("Row: -->" + JSON.stringify(rs.rows.item(i))+ "<--");
        }
    };
    selectRecords(render, "SELECT id, nom FROM " + tabName);
}