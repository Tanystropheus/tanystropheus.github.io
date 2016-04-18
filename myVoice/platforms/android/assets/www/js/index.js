/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// dbName = "TMPDataBase";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //alert("Device Ready");
        try{
            openDb();
        }catch(e){
            alert("error ondevice ready: " + e);
        } finally{
            alert("DB: " + JSON.stringify(document.db));
            try{
                initDb();
            }catch(e){
                alert("error init: " + e);
            }
        }
        //createSqliteTable(db, 'SimpsonFamily', 'id integer primary key, nom text');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    onError: function(error) {
        alert('Error: ' + error);
    }
};

//app.openDb = function(callback) {
//    var dbName = "TMPDataBase";
//    app.db = window.sqlitePlugin.openDatabase({name: dbName, 
//            androidDatabaseImplementation: 2,
//            androidLockWorkaround: 1
//        }
//    );
//    callback();
//};
//
//app.initDb = function(){
//    alert("initDB");
//    var tableName = 'SimpsonFamily';
//    app.createSqliteTable(tableName, 'id integer primary key, nom text');
//    app.insertInSqliteTable(tableName, 'id, nom', "1,'Homer'");
//    app.insertInSqliteTable(tableName, 'id, nom', "2,'Marge'");
//    app.insertInSqliteTable(tableName, 'id, nom', "3,'Bart'");
//    app.insertInSqliteTable(tableName, 'id, nom', "4,'Lisa'");
//    for (var tmpi = 5; tmpi < 2000; tmpi++){
//        app.insertInSqliteTable(tableName, 'id, nom', tmpi+",'Lisa"+tmpi+"'");
//    }
//    getAllTheDataDEBUG(tableName);
//};
//
//app.execSqliteSQL = function (sql, result) {
//      app.db.transaction(function(tx) {
//         result = tx.executeSql(sql, [], tx.onSuccess(), tx.onError());
//         tx.onSuccess = function(){
//             alert("Exec: ok");
//         };
//         tx.onError = function(){
//             alert("Exec: FAIL");
//         };
//     });
//};
//
//app.createSqliteTable = function (tableName, champ) {
//    app.execSqliteSQL('CREATE TABLE IF NOT EXISTS ' + tableName + ' ('+champ+')');
//    return true;
//};
//
//app.dropSqliteTable = function (tableName) {
//    app.execSqliteSQL('DROP TABLE' + tableName);
//    return true;
//};
//
//app.insertInSqliteTable = function (tableName, champToModifie, values)
//{
//    app.execSqliteSQL("INSERT INTO "+ tableName + champToModifie +" VALUES ("+ values +")");
//    return true;
//};
//
//app.updateInSqliteTable = function (tableName, setString, condition)
//{
//    app.execSqliteSQL("UPDATE "+ tableName + "SET " + setString +" WHERE "+ condition);
//    return true;
//};
//
//app.deleteInSqliteTable = function (tableName, condition)
//{
//    app.execSqliteSQL("DELETE FROM "+ tableName + " WHERE "+ condition);
//    return true;
//};
//
//app.selectRecords = function(fn, toSelect, tableName, where, by) {
//    if (where !== undefined && by !== undefined){
//        app.db.transaction(function(tx) {
//            tx.executeSql("SELECT "+ toSelect +" FROM " + tableName + "WHERE " + where + " ORDER BY " + by, [], fn, app.onError);
//        });
//    } else if (where !== undefined && by === undefined){
//        app.db.transaction(function(tx) {
//            tx.executeSql("SELECT "+ toSelect +" FROM " + tableName + "WHERE " + where, [], fn, app.onError);
//        });
//    } else if (by !== undefined && where === undefined){
//        app.db.transaction(function(tx) {
//            tx.executeSql("SELECT "+ toSelect +" FROM " + tableName + " ORDER BY " + by, [], fn, app.onError);
//        });
//    }
//    app.db.transaction(function(tx) {
//        tx.executeSql("SELECT "+ toSelect +" FROM " + tableName, [], fn, app.onError);
//    });
//};
//
//app.getAllTheDataDEBUG = function(tabName) {
//    if (app.db === undefined){
//        app.openDb(app.initDb());
//    }
//    var render = function (tx, rs) {
//        // rs contains our SQLite recordset, at this point you can do anything with it
//        // in this case we'll just loop through it and output the results to the console
//        alert("Debut parcour du tableau DB: " + rs.rows.length + " app.db: " + app.db);
//        for (var i = 0; i < rs.rows.length; i++) {
//            console.log(rs.rows.item(i));
//            alert(rs.rows.item(i));
//        }
//    };
//
//    app.selectRecords(render, '*', tabName);
//};

app.initialize();