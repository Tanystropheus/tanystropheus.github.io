function genInitSql(){
	LanguageName = ["Français"];

	LibraryLstName = ["Utilisation", "Aprentisage"];
	nblibmin = [1, 6];
	nblibmax = [6, 6];

	libName = ["Verbes", "Aliments", "Adjectifs", "Boissons", "Jouets d'intérieur", "Jeux d'extérieur"];
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

	for(var i = 0; i < LibraryLstName.length; i++){
	  //console.log(LibraryLstsqlreq);
		LibraryLstsqlreq += "INSERT INTO LibraryLst (liblsttitle, userlog) VALUES ('" + LibraryLstName[i].replace(new RegExp("'", 'g'), "\'") + "', 'LogUtilisateur1');\n";
	}

	for(var i = 0; i < LanguageName.length; i++){
	  //console.log(LibraryLstsqlreq);
		Languagesqlreq += "INSERT INTO Language (langname) VALUES ('" + LanguageName[i]+ "');\n";
	}

	for(var i = 0; i < libName.length; i++){
		Librarysqlreq += "INSERT INTO Library (libtitle) VALUES (\"" + libName[i] + "\");\n";
		for(var j = 0; j < LibraryLstName.length; j++){
			if(((i+1) >= nblibmin[j]) && ((i+1) <= nblibmax[j])){
				LibLinksqlreq += "INSERT INTO LibLink (libraryid, librarylstid) VALUES (" + (i+1) + ", " + (j+1) + ");\n";
			}
		}
	}

	for(var i = 0; i < text.length; i++){
		Textsqlreq += "INSERT INTO Text (languageid, text) VALUES ( 1, \"" + text[i] + "\");\n",
		Elementssqlreq += "INSERT INTO Elements (elemurl, soundid, textid, state) VALUES ('img/" + text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase() + ".png', 1, " + (i+1) + ", 0);\n";
		Setingssqlreq += "INSERT INTO Setings (width, writing, sound, lastchange, pos) VALUES (50, '{police: null, policecolor: null, size: 15, color: null, place: 0}', 1, 0, 1);\n";
		ElemSetingssqlreq += "INSERT INTO ElemSetings (setingsid, elemid) VALUES ("+ (i+1) +", "+ (i+1) + ");\n";
		Soundsqlreq += "INSERT INTO Sound (soundurl,  languageid) VALUES (\"sound/" + text[i].replace(new RegExp(' ', 'g'), '').replace(new RegExp("'", 'g'), '').toLowerCase() + ".mp3\", 1);\n";
		for(var j = 0; j < libName.length; j++){
			if((i+1) >= libSizemin[j] && (i+1) <= libSizemax[j]){
				LibElemsqlreq += "INSERT INTO LibElem (libraryid, elemid) VALUES (" + (j+1) + ", " + (i+1) + ");\n";
			}
		}
	}

	sqlreq = Languagesqlreq + Textsqlreq + Soundsqlreq + LibraryLstsqlreq + Elementssqlreq + Setingssqlreq + ElemSetingssqlreq + Librarysqlreq + LibElemsqlreq + LibLinksqlreq;
	console.log(sqlreq);
	var tab;
	tab = sqlreq.split(';\n');
	tab.pop();
	//~ for(i = 0; i < tab.length; i++){
		//~ console.log(tab[i]);
	//~ }
	return tab;
}
