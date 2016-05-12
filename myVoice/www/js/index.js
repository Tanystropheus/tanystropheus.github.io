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
			//alert("DB: " + JSON.stringify(document.db));
			try{
				initDb(function(objLst){ alert("appData:" + JSON.stringify(appData, null, 4)); });
			}catch(e){
				alert("error init: " + e);
			}
		}
		//createSqliteTable(db, 'SimpsonFamily', 'id integer primary key, nom text');
	},
	receivedEvent: function(id) {
/*		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');*/

		console.log('Received Event: ' + id);
	},

	onError: function(error) {
		alert('Error: ' + error);
	}
};

app.initialize();
