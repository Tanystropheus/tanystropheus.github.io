function genInitSql(){
	promiseTab = [];
	LanguageName = ["Français"];

	LibraryLstName = ["Utilisation", "Aprentisage"];
	nblibmin = [1, 9];
	nblibmax = [9, 9];

	libName = ["Activites", "Adjectifs", "Aliments", "Animaux", "Boissons", "Jeux d'exterieurs", "Jouets d'interieur", "Verbes", "Vetements"];
	//libName = ["Verbes", "Aliments", "Adjectifs", "Boissons", "Jouets d'intérieur", "Jeux d'extérieur"];
	libSizemin = [1, 9, 27, 49, 52, 59, 75, 92, 121];
	libSizemax = [8, 26, 48, 51, 58, 69, 91, 120, 131];

	text = [
		"chanter", "écouter de la musique", "galipette", "ordinateur portable", "dessin", "football", "lire1", "se promener2",
		"0", "2", "4", "6", "8", "blanc", " jaune", "noir", "rouge", "1", "3", "5", "7", "9", "bleu", "moyen", "orange", "vert",
		"abricot", "croissant", "gâteaux", "œufs à la poêle", " paquet de chips", "viande", "banane", "fraise", " glace", "orange", "pomme de terre", "yaourt", "bonbon", "fromage", "kiwi", " pain", "pomme", "chocolat", "fruits", " légumes", "paquet de biscuits", "rondelle d'orange",
		"chat", "chien", "poisson",
		"Coca-Cola", "eau", "jus de pomme", "jus de raisin", "jus d'orange", "lait au cacao", "lait",
		"balançoire", "balançoire", "ballon", "patins", "toboggan", "trampoline", "trampoline", " vélo", "parc", "raquette", "trottinette",
		"avion", "camion de pompiers", "dessins animés", "gommettes", "marionettes", "toupies", "ballon", "camions", "dinosaures", "jouer le piano", "peinture", "voiture", "bulles de savon", "bulles de savon", "console", "feutres", " livre", "peinture rupestre", "cubes empilables", "garage", "marionettes", " télévision",
		"allumer", "allumer", "boire", "chatouiller", "chatouiller", "courir", "courir", "donner", "donner", "donner un bisou", "donner un bisou", "éteindre", "éteindre", "fermer", "fermer", "glisser", "manger", "ouvrir", "ouvrir", "pousser", "rouler", "sauter", "sauter", "sortir", "sortir", "souffler", "tirer", "tirer", "tourner",
		"casquette", "chapeau", "chaussure", "chaussure de sport", "chaussures", "chaussures", "écharpe", "imperméable", "veste", "veste", 
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
		Librarysqlreq += "INSERT INTO Library (libtitle, color) VALUES (\"" + libName[i] + "\", \"#ccccb3\");\n";
		sql = "INSERT INTO Library (libtitle, color) VALUES (\"" + libName[i] + "\", \"#ccccb3\")";
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
		sql = "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/" + (i + 1)/*text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase()*/ + ".png', 1, " + (i+1) + ", 0)";
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

	//~ promiseTab = []
	//~ sql = Languagesqlreq + Textsqlreq + Soundsqlreq + LibraryLstsqlreq + Elementssqlreq + Setingssqlreq + ElemSetingssqlreq + Librarysqlreq + LibElemsqlreq + LibLinksqlreq;
	//~ //console.log(sql.replace(new RegExp('\n', 'g'), ''));
	//~ promiseTab.push(new Promise(function(resolve, reject){
		//~ //alert("sql: " + insertSql[sqlReq]);
		//alert(sql.replace(new RegExp('\n', 'g'), ''));
		//~ window.db.executeSql( sql.replace(new RegExp('\n', 'g'), ''), null, function(res){
			//alert(sql + " finish succes " + Date.now().toString() + " res: " + JSON.stringify(res, null, 4));
			//~ return resolve(res);
		//~ }, function(err, err2){
			//~ alert(JSON.stringify(sql, null, 4) + " finish Error: " + JSON.stringify(err, null, 4) + JSON.stringify(err2, null, 4));
			//~ reject("Rejected " + err);
		//~ });
	//~ }).catch(function(err){alert("errir ELLEMASSO INSERT: " + JSON.stringify(err, null, 4))}));

	//console.log(sqlreq);
	var tab;
	//~ tab = sqlreq.split(';\n');
	//~ tab.pop();
	tab = promiseTab;
	//~ alert("tab: " + tab.length);
	return tab;
}
