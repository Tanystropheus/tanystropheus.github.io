function myVoiceLanguage(languageid, langname) {
	this.languageid = languageid;
	this.langname = langname;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceTag(tagid, tagname) {
	this.tagid = tagid;
	this.tagname = tagname;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceTagText(tagid, tagname, languageId, tagtextid, tagtext) {
	this.tagtextid = tagtextid;
	this.languageid = languageId;
	this.tagtext = tagtext;
	this.tagelem = new myVoiceTag(tagid, tagname);
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceLibraryLst(librarylstid, liblsttitle, libraryid) {
	this.librarylstid = librarylstid;
	this.libraryid = libraryid;  // str contenant les id des lib de l'utilisateur
	this.liblsttitle = liblsttitle;
	this.librarylst = {};
	this.parseIdLst = function(){
		var idlst = str.split(",");
		for(var i in idlst){
			// select lib bi id in strore in libarylst
		} 
	}
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceLibrary(libraryId, userId, libTitle, lstelemid) {
	this.libraryid = libraryId;
	this.userid = userId;
	this.libtitle = libTitle;
	this.lstelemid = lstelemid; // str contenant les id des élément de la library
	this.elemlst = {};
	this.parseIdLst = function(){
		var idlst = str.split(",");
		for(var i in idlst){
			// select elem bi id in strore in elemlst
		} 
	}
	this.updatedb = function(){
		alert("db update func not yet created");
	};

};

function myVoiceUser(librarylstid, userId, languageid, login, password, backupurl) {
	this.languageid = languageid;
	this.userid = userId;
	this.librarylstid = librarylstid;
	this.login = login;
	this.password = password;
	this.backupurl = backupurl;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceGlobElemAssociation(globelemassoid, listelemid) {
	this.globelemassoid = globelemassoid;
	this.listelemid = listelemid;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceElemAssociation(elemassoid, userId, globelemassoid, nbuse, date) {
	this.elemassoid = elemassoid;
	this.userid = userId;
	this.globelemassoid = globelemassoid;
	this.nbuse = nbuse;
	this.date = date;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceElem(elemid, elemUrl, Width, soundUrl, languageId, soundId, text, textId, state) {
	this.elemid = elemid;
	this.elemurl = elemUrl;
	this.soundid = soundId;
	this.soundelem = new myVoiceSound(soundUrl, languageId, soundId);
	this.textid = textId;
	this.textelem = new myVoiceText(text, languageId, textId);
	this.width = Width;
	this.state = state;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceElemStat(elemstatid, userId, elemid, nbuse, elemassoid) {
	this.elemstatid = elemstatid;
	this.userid = userId;
	this.elemid = elemid;
	this.nbuse = nbuse;
	this.elemassoid = elemassoid;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceGlobElemStat(globelemstatid, elemstatid, nbuse) {
	this.elemstatid = elemstatid;
	this.globelemstatid = globelemstatid;
	this.nbuse = nbuse;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceSound(soundUrl, languageId, soundId) {
	this.soundid = soundId;
	this.languageid = languageId;
	this.soundurl = soundUrl;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function myVoiceText(text, languageId, textId) {
	this.soundid = textId;
	this.languageid = languageId;
	this.soundurl = text;
	this.updatedb = function(){
		alert("db update func not yet created");
	};
};

function debugelem(elem) {
	var	htmlText = '</br></br>Object {\n';
	var text = 'Object {\n';
	for (var i in elem) {
		if (i !== 'debug') {
			htmlText += ' [' + i + '] => ' + elem[i] + ' </br>';
			text += '\t[' + i + '] => ' + elem[i] + '\n';
		}
	}
	text = text + '}';
	console.log(text);
	alert(text);
	return htmlText;
};
