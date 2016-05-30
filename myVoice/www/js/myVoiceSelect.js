/* ********************************************************************************************* */
/* ******************************** fonction de selection d'objet ******************************* */
/* ********************************************************************************************* */

/* 
 * Voici un exemple de leur fonctionement avec la fonction selectLanguage
 * sql est la variable contenant le filtre écris en SQL
 * objectLst est la liste d'object ou seront enregistrer chaque object selectioner dans la base de données
 * cb est une fonction de callback
 * pour selectioner tout le contenu de la table Language et stoquer dans un objject languageLst:
 * 		selectLanguage("", languageLst, callback);
 * pour selectioner le contenu filtrer de la table Language et stoquer dans un objject languageLst:
 * 		selectLanguage("WHERE champ=value", languageLst, callback);
 * 	champ et value étant as adapter au circonstances.
 * vous pouvez attendre la fin de la requette de la maniére suivante:
 * 		selectLanguage("WHERE champ=value", languageLst, callback).then(function(){alert("Fonction on succes");}, function(){alert("Fonction on error");});
 * */

function selectParser(objectLst, id, rs, cb){
	switch (id) {
		case "contextid":
			myObject = myVoiceContext;
		case "elemassoid":
			myObject = myVoiceElemAssociation;
		case "setingsid":
			myObject = myVoiceSetings;
		case "elemid":
			myObject = myVoiceElem;
		case "languageid":
			myObject = myVoiceLanguage;
		case "lerningstatid":
			myObject = myVoiceLerningStat;
		case "libraryid":
			myObject = myVoiceLibrary;
		case "librarylstid":
			myObject = myVoiceLibraryLst;
		case "soundid":
			myObject = myVoiceSound;
		case "elemsetingsid":
			myObject = myVoiceElemSetings;
		case "libelemid":
			myObject = myVoiceLibElem;
		case "liblinkid":
			myObject = myVoiceLibLink;
		case "textid":
			myObject = myVoiceText;
		default :
			myObject = Object;
	}
	try{
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)[id]] = new myVoiceLanguage();
			//window.appData.language[rs.rows.item(i)[id]] = new myVoiceLanguage();
			for (var propName in rs.rows.item(i)) {
				//window.appData.language[rs.rows.item(i)[id]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)[id]][propName] = rs.rows.item(i)[propName];
			}
		}
	} catch (e) {
		alert(JSON.stringify(e, null, 4));
		return false;
	} finally {
		if (typeof(cb) == Function){
			cb(objectLst);
		}
		return true;
	}
}

function selectContext(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "contextid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Context " + sql + " ORDER by contextid");
	}, function(){alert("Select fail");});
};

function selectElemAssociation(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "elemassoidid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM ElemAssociation " + sql + " ORDER by elemassoid");
	}, function(){alert("Select fail");});
};

function selectSetings(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "setingsid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Setings " + sql + " ORDER by setingsid");
	}, function(){alert("Select fail");});
};

function selectElements(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "elementsid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Elements " + sql + " ORDER by elemid");
	}, function(){alert("Select fail");});
};

function selectLanguage(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "languageid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Language " + sql + " ORDER by languageid");
	}, function(){alert("Select fail");});
};

function selectLerningStat(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "lerningstatid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM LerningStat " + sql + " ORDER by lerningstatid");
	}, function(){alert("Select fail");});
};

function selectLibrary(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "libraryid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Library " + sql + " ORDER by libraryid");
	}, function(){alert("Select fail");});
};

function selectLibraryLst(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "librarylstid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM LibraryLst " + sql + " ORDER by librarylstid");
	}, function(){alert("Select fail");});
};

function selectSound(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "soundid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Sound " + sql + " ORDER by soundid");
	}, function(){alert("Select fail");});
};

function selectElemSetings(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "elemsetingsid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM ElemSetings " + sql + " ORDER by elemsetingsid");
	}, function(){alert("Select fail");});
};

function selectLibElem(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "libelemid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM LibElem " + sql + " ORDER by libelemid");
	}, function(){alert("Select fail");});
};

function selectLibLink(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "liblinkid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM LibLink " + sql + " ORDER by liblinkid");
	}, function(){alert("Select fail");});
};

function selectText(sql, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, "textid", rs, cb);
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT * FROM Text " + sql + " ORDER by textid");
	}, function(){alert("Select fail");});
};
