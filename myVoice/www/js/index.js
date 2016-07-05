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
//~ dbName = "TMPDataBase";

var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
		window.appData = {
			interfaces_setings: {},
			language: {},
			libraryLst: {},
			library: {},
			libelem: {},
			user: {},
			elemAssociation: {},
			text: {},
			elements: {},
			elemStat: {},
			sound: {}
		};
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		window.localStorage.setItem("waitInternetCo", 0);
		//~ app.receivedEvent('deviceready');
		//alert("Device Ready");
		//~ console.log = function(val){alert(val)};
		window.open = cordova.InAppBrowser.open;
		if (!window.localStorage.getItem("Interfaces_Setings")){
			window.appData.interfaces_setings = {
				backgroundColor: "",
				writingpolice: "",
				writingsize: 15,
				writinglogo: "URL",
				writingcolor: "",
				sendIntervalUnit: 1000, // 1 => ms, 1000 => s, 60000 => min, 3600000 => h 
				sendInterval: 10, // 1 => 1 * sendIntervalUnit, 60 => 60 * sendIntervalUnit ....
				tabPos: 1,
				speakAreaPos: 1,
				speakAreaColor: "",
				nbColumn: 3,
				random: 1,
				manual: 0,
				DD: 0,
				click: 1,
				sound: 0,
				tabnav: {
					slide: 0,
					click: 1
				},
				butonColor: "",
				language: 0
			};
			window.localStorage.setItem("Interfaces_Setings", JSON.stringify(window.appData.interfaces_setings));
		} else {
			window.appData.interfaces_setings = JSON.parse(window.localStorage.getItem("Interfaces_Setings"));
		}
		return openDb().then(function(){
			if(!window.localStorage.getItem("notFirstStart")){
				//~ alert("First start");
				return initDb(function(objLst){
					//~ genSetingForm(document.getElementById("setingArea"));
					alert("appData: " + JSON.stringify(window.appData, null, 4));
					window.localStorage.setItem("notFirstStart", 1 );
					setInterval(function(){
							checkConnection(function(){alert("replace callback by sending data");})
						},
						window.appData.interfaces_setings.sendInterval * window.appData.interfaces_setings.sendIntervalUnit);
				});
			} else {
				alert("not First Start");
				return initialSelect().then(function(){
					alert("appData:" + JSON.stringify(window.appData, null, 4));
					genSetingForm(document.getElementById("setingArea"));
					genTab(window.appData.library, document.getElementById("ongletNav"), window.appData.text);
					setInterval(function(){
							checkConnection(function(){alert("replace callback by sending data");})
						},
						window.appData.interfaces_setings.sendInterval * window.appData.interfaces_setings.sendIntervalUnit);
				});
			}
		}, function(err, err2){
			alert("openDb Fail: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
		});
	},

	receivedEvent: function(id) {
		//~ var parentElement = document.getElementById(id);
		//~ var listeningElement = parentElement.querySelector('.listening');
		//~ var receivedElement = parentElement.querySelector('.received');
		//~ listeningElement.setAttribute('style', 'display:none;');
		//~ receivedElement.setAttribute('style', 'display:block;');

		//~ console.log('Received Event: ' + id);
	},

	onError: function(error) {
		//alert('Error: ' + error);
	}
};

app.initialize();
