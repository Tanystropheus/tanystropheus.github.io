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

function selectLanguage(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["languageid"]] = new myVoiceLanguage();
			window.appData.language[rs.rows.item(i)["languageid"]] = new myVoiceLanguage();
			for (var propName in rs.rows.item(i)) {
				window.appData.language[rs.rows.item(i)["languageid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["languageid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
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

function selectTag(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			var objname = "" + rs.rows.item(i)["languageid"] + "-" + rs.rows.item(i)["tagid"];
			//alert("objname: " + objname);
			objectLst[objname] = new myVoiceTag();
			//window.appData.tag[rs.rows.item(i)["tagid"]] = new myVoiceTag();
			for (var propName in rs.rows.item(i)) {
				//window.appData.tag[rs.rows.item(i)["tagid"]][propName] = rs.rows.item(i)[propName];
				objectLst[objname][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			//alert("time for tag cb");
			cb(objectLst);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {if (render(tx, rs)) {return resolve(objectLst);} else {alert("rejected"); return reject("error in callback");}}, "SELECT * FROM Tag " + sql + " ORDER by tagid");
	}, function(){alert("Select fail");});
};

function selectTagText(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["tagtextid"]] = new myVoiceTagText();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["tagtextid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM TagText " + sql + " ORDER by tagTextid");
	}, function(){alert("Select fail");});
};

function selectLibraryLst(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["librarylstid"]] = new myVoiceLibraryLst();
			//window.appData.libLst[rs.rows.item(i)["librarylstid"]] = new myVoiceLibraryLst();
			for (var propName in rs.rows.item(i)) {
				//window.appData.libLst[rs.rows.item(i)["librarylstid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["librarylstid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		//window.appData.libLst = objectLst;
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM LibraryLst " + sql + " ORDER by libraryLstid");
	}, function(){alert("Select fail");});
};

function selectLibrary(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			//alert(JSON.stringify(rs.rows, null, 4));
			objectLst[rs.rows.item(i)["libraryid"]] = new myVoiceLibrary();
			//window.appData.lib[rs.rows.item(i)["libraryid"]][propName] = new myVoiceLibrary();
			for (var propName in rs.rows.item(i)) {
				//window.appData.lib[rs.rows.item(i)["libraryid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["libraryid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		//window.appData.lib = objectLst;
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM Library " + sql + " ORDER by libraryid");
	}, function(){alert("Select fail");});
};

function selectUser(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["userid"]] = new myVoiceLibrary();
			//window.appData.user[rs.rows.item(i)["userid"]] = new myVoiceLibrary();
			for (var propName in rs.rows.item(i)) {
				//window.appData.user[rs.rows.item(i)["userid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["userid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM User " + sql + " ORDER by userid");
	}, function(){alert("Select fail");});
};

function selectGlobElemAssociation(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["globelemassoid"]] = new myVoiceGlobElemAssociation();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["globelemassoid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM GlobElemAssociation " + sql + " ORDER by globelemassoid");
	}, function(){alert("Select fail");});
};

function selectElemAssociation(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["elemassoid"]] = new myVoiceElemAssociation();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["elemassoid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM ElemAssociation " + sql + " ORDER by elemassoid");
	}, function(){alert("Select fail");});
};

function selectText(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["textid"]] = new myVoiceText();
			for (var propName in rs.rows.item(i)) {
				//window.appData.language[rs.rows.item(i)["textid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["textid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM Text " + sql + " ORDER by textid");
	}, function(){alert("Select fail");});
};

function selectElements(sql, objectLst, cb){
	var render = function(tx, rs) {
		//alert("debut render len: " + rs.rows.length);
		for (var i = 0; i < rs.rows.length; i++) {
			var objname = "" + rs.rows.item(i)["user"]+ "_" + rs.rows.item(i)["elemid"];
			//alert("objname: " + objname);
			objectLst[objname] = new myVoiceElem();
			for (var propName in rs.rows.item(i)) {
				objectLst[objname][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM Elements " + sql + " ORDER by elemid");
	}, function(){alert("Select fail");});
};

function selectElemSetings(sql, objectLst, cb){
	var render = function(tx, rs) {
		tmpObjectLst = {};
		for (var i = 0; i < rs.rows.length; i++) {
			var objname = rs.rows.item(i)["elemsetingsid"];
			if(objectLst[objname] === undefined || (objectLst[objname]['lastchange'] < rs.rows.item(i)['lastchange'])){
				objectLst[objname] = new myVoiceElem();
				for (var propName in rs.rows.item(i)) {
					objectLst[objname][propName] = rs.rows.item(i)[propName];
				}
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM ElemSetings " + sql + " ORDER by elemsetingsid");
	}, function(){alert("Select fail");});
};

function selectElemStat(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["elemstatid"]] = new myVoiceElemStat();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["elemstatid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM ElemStat " + sql + " ORDER by elemStatid");
	}, function(){alert("Select fail");});
};

function selectGlobElemStat(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["globelemstatid"]] = new myVoiceGlobElemStat();
			for (var propName in rs.rows.item(i)) {
				objectLst[rs.rows.item(i)["globelemstatid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM GlobElemStat " + sql + " ORDER by globElemStatid");
	}, function(){alert("Select fail");});
};

function selectSound(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["soundid"]] = new myVoiceSound();
			//window.appData.sound[rs.rows.item(i)["soundid"]][propName] = new myVoiceSound();
			for (var propName in rs.rows.item(i)) {
				//window.appData.sound[rs.rows.item(i)["soundid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["soundid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM Sound " + sql + " ORDER by soundid");
	}, function(){alert("Select fail");});
};

function selectContext(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["contextid"]] = new myVoiceContext();
			window.appData.sound[rs.rows.item(i)["contextid"]][propName] = new myVoiceContext();
			for (var propName in rs.rows.item(i)) {
				window.appData.sound[rs.rows.item(i)["contextid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["contextid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM Context " + sql + " ORDER by contextid");
	}, function(){alert("Select fail");});
};

function selectLerningStat(sql, objectLst, cb){
	var render = function(tx, rs) {
		for (var i = 0; i < rs.rows.length; i++) {
			objectLst[rs.rows.item(i)["lerningstatid"]] = new myVoiceLerningStat;
			window.appData.sound[rs.rows.item(i)["lerningstatid"]][propName] = new myVoiceLerningStat;
			for (var propName in rs.rows.item(i)) {
				window.appData.sound[rs.rows.item(i)["lerningstatid"]][propName] = rs.rows.item(i)[propName];
				objectLst[rs.rows.item(i)["lerningstatid"]][propName] = rs.rows.item(i)[propName];
			}
		}
		if (typeof(cb) == Function){
			setTimeout(function () {
				if (cb){
					cb(objectLst);
				}
			}, 1);
		}
		return true;
	};
	if(sql == undefined) sql = "";
	return new Promise(function(resolve, reject){
		selectRecords(function(tx, rs) {if (render(tx, rs)) {resolve(objectLst);} else {alert("rejected");reject("error in callback");}}, "SELECT * FROM LerningStat " + sql + " ORDER by lerningstatid");
	}, function(){alert("Select fail");});
};
