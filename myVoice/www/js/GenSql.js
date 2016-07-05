function genInitSql(){
	promiseTab = [];
	LanguageName = ["Français"];

	LibraryLstName = ["Utilisation", "Aprentisage"];
	nblibmin = [1, 6];
	nblibmax = [6, 6];

	libName = ["Verbes", "Aliments", "Adjectifs", "Boissons", "Jouets Intérieur", "Jeux Extérieur"];
	libSizemin = [1, 18, 39, 51, 60, 82];
	libSizemax = [17, 38, 50, 59, 81, 90];


	text = ["Manger", "Boire", "Courir", "Sauter", "Tourner", "Tirer", "Pousser", "Donner", "Chatouiller", "Souffler", "Secouer", "Sortir", "Suivre", "Fermer", "Rouler", "Glisser", "Allumer", //"Faire un câlin", "Faire un bisou",
		"Pain", "Gâteau", "Bonbon", "Chips", "Fruits", "Pâtes", "Pomme de terre", "Viande", "Légumes", "Fromage", "Yaourt", "Glace", "Barquette à la fraise,", "Prince", "Finger", "Pomme", "Raisin", "Orange", "Fraise", "Carottes", "Haricots verts",
		"Bleu", "Blanc", "Rouge", "Vert", "Grand", "Petit", "Moyen", "1", "2", "3", "4", "5",
		"eau", "jus de pomme", "jus d'orange", "jus de raisin", "oasis", "coca", "perrier", "lait", "thé",
		"bulles", "toupie", "voiture", "garage", "livre", "télé", "ipad", "wii", "wii sport", "wii dance", "dessins animés", "Cars", "Nemo", "Reine des Neiges", "Dora", "la maison de Mickey", "piano d'enfant", "marionnettes", "gommettes", "feutres", "peinture", "ballon de baudruche",
		"ballon", "balançoire", "toboggan", "trampoline", "vélo", "trottinette", "roller", "raquette", "structure de parc"
		];

	Textsqlreq = "";
	Languagesqlreq = "";
	LibraryLstsqlreq = "";
	Elementssqlreq = "";
	Setingssqlreq = "";
	ElemSetingssqlreq = "";
	Librarysqlreq = "";
	LibElemsqlreq = "";
	LibLinksqlreq = "";
	Soundsqlreq = "";
	sql = "";

	for(var i = 0; i < LibraryLstName.length; i++){
	  //console.log(LibraryLstsqlreq);
		LibraryLstsqlreq += "INSERT INTO LibraryLst (liblsttitle, userlog) VALUES ('" + LibraryLstName[i].replace(new RegExp("'", 'g'), "\'") + "', 'LogUtilisateur1');\n";
		sql = "INSERT INTO LibraryLst (liblsttitle, userlog) VALUES ('" + LibraryLstName[i].replace(new RegExp("'", 'g'), "\'") + "', 'LogUtilisateur1')";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));
	}

	for(var i = 0; i < LanguageName.length; i++){
	  //console.log(LibraryLstsqlreq);
		Languagesqlreq += "INSERT INTO Language (langname) VALUES ('" + LanguageName[i]+ "');\n";
		sql = "INSERT INTO Language (langname) VALUES ('" + LanguageName[i]+ "')";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));
	}

	for(var i = 0; i < libName.length; i++){
		Librarysqlreq += "INSERT INTO Library (libtitle) VALUES (\"" + libName[i] + "\");\n";
		sql = "INSERT INTO Library (libtitle) VALUES (\"" + libName[i] + "\")";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));
		for(var j = 0; j < LibraryLstName.length; j++){
			if(((i+1) >= nblibmin[j]) && ((i+1) <= nblibmax[j])){
				LibLinksqlreq += "INSERT INTO LibLink (libraryid, librarylstid) VALUES (" + (i+1) + ", " + (j+1) + ");\n";
				sql = "INSERT INTO LibLink (libraryid, librarylstid) VALUES (" + (i+1) + ", " + (j+1) + ")";
				promiseTab.push(new Promise(function(resolve, reject){
					//alert("sql: " + insertSql[sqlReq]);
					window.db.executeSql( sql, null, function(res){
						//~ alert(sql + " finish succes");
						return resolve(res);
					}, function(err, err2){
						alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
						return reject(err);
					});
				}));
			}
		}
	}
	LibLinksqlreq += "INSERT INTO ElemAssociation (elemlst, date, learning) VALUES ('1,2,3', " + Date.now().toString() + ", 0);\n";

	for(var i = 0; i < text.length; i++){
		Textsqlreq += "INSERT INTO Text (languageid, text) VALUES ( 1, \"" + text[i] + "\");\n",
		sql = "INSERT INTO Text (languageid, text) VALUES ( 1, \"" + text[i] + "\")";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));

		Elementssqlreq += "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/" + text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase() + ".png', 1, " + (i+1) + ", 0);\n";
		sql = "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/" + text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase() + ".png', 1, " + (i+1) + ", 0)";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));

		Setingssqlreq += "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: null, policecolor: null, size: 15, color: null, place: 0}', 1, 0, 1);\n";
		sql = "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: null, policecolor: null, size: 15, color: null, place: 0}', 1, 0, 1)";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));

		ElemSetingssqlreq += "INSERT INTO ElemSetings (setingsid, elemid) VALUES ("+ (i+1) +", "+ (i+1) + ");\n";
		sql = "INSERT INTO ElemSetings (setingsid, elemid) VALUES ("+ (i+1) +", "+ (i+1) + ")";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));

		Soundsqlreq += "INSERT INTO Sound (soundurl,  languageid) VALUES (\"sound/" + text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase() + ".mp3\", 1);\n";
		sql = "INSERT INTO Sound (soundurl,  languageid) VALUES (\"sound/" + text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase() + ".mp3\", 1)";
		promiseTab.push(new Promise(function(resolve, reject){
			//alert("sql: " + insertSql[sqlReq]);
			window.db.executeSql( sql, null, function(res){
				//~ alert(sql + " finish succes");
				return resolve(res);
			}, function(err, err2){
				alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
				return reject(err);
			});
		}));
		for(var j = 0; j < libName.length; j++){
			if((i+1) >= libSizemin[j] && (i+1) <= libSizemax[j]){
				LibElemsqlreq += "INSERT INTO LibElem (libraryid, elemid) VALUES (" + (j+1) + ", " + (i+1) + ");\n";
				sql = "INSERT INTO LibElem (libraryid, elemid) VALUES (" + (j+1) + ", " + (i+1) + ")";
				promiseTab.push(new Promise(function(resolve, reject){
					//alert("sql: " + insertSql[sqlReq]);
					window.db.executeSql( sql, null, function(res){
						//~ alert(sql + " finish succes");
						return resolve(res);
					}, function(err, err2){
						alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
						return reject(err);
					});
				}));
			}
		}
	}

	sql = "INSERT INTO ElemAssociation (elemlst, date, learning) VALUES ('1,2,3', " + Date.now().toString() + ", 0)";
	promiseTab.push(new Promise(function(resolve, reject){
		//alert("sql: " + insertSql[sqlReq]);
		window.db.executeSql( sql, null, function(res){
			//~ alert(sql + " finish succes " + Date.now().toString() + " res: " + JSON.stringify(res, null, 4));
			return resolve(res);
		}, function(err, err2){
			alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
			reject("Rejected " + err);
		});
	}).catch(function(err){alert("errir ELLEMASSO INSERT: " + JSON.stringify(err, null, 4))}));

	promiseTab = []
	sql = Languagesqlreq + Textsqlreq + Soundsqlreq + LibraryLstsqlreq + Elementssqlreq + Setingssqlreq + ElemSetingssqlreq + Librarysqlreq + LibElemsqlreq + LibLinksqlreq;
	promiseTab.push(new Promise(function(resolve, reject){
		//alert("sql: " + insertSql[sqlReq]);
		//~ alert(sql.replace(new RegExp('\n', 'g'), ''));
		window.db.executeSql( sql.replace(new RegExp('\n', 'g'), ''), null, function(res){
			//~ alert(sql + " finish succes " + Date.now().toString() + " res: " + JSON.stringify(res, null, 4));
			return resolve(res);
		}, function(err, err2){
			alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
			reject("Rejected " + err);
		});
	}).catch(function(err){alert("errir ELLEMASSO INSERT: " + JSON.stringify(err, null, 4))}));

	//console.log(sqlreq);
	var tab;
	//~ tab = sqlreq.split(';\n');
	//~ tab.pop();
	tab = promiseTab;
	//~ alert("tab: " + tab.length);
	return tab;
}
