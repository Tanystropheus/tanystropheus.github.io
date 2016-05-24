function myVoiceContext(time, places, activiti, interlocutor) {
	this.contextid = null;
	this.time = time;
	this.places = places;
	this.activiti = activiti;
	this.interlocutor = interlocutor;
};

function myVoiceElemAssociation(elemlst, date, learning) {
	this.elemassoid = null;
	this.elemlst = elemlst;
	this.date = date;
	this.learning = learning;
};

function myVoiceSetings(width, writing, sound, lastchange) {
	this.setingsid = null;
	this.writing = writing;
	this.sound = sound;
	this.lastchange = lastchange;
};

function myVoiceElem(elemurl, soundid, textid, state) {
	this.elemid = null;
	this.elemurl = elemUrl;
	this.soundid = soundId;
	this.textid = textId;
	this.state = state;
};

function myVoiceLanguage(langname) {
	this.languageid = null;
	this.langname = langname;
};

function myVoiceLerningStat(contextid, elemassoid, good) {
	this.lerningstatid = null;
	this.contextid = contextid;
	this.elemassoid = elemassoid;
	this.good = good;
};

function myVoiceLibrary(libTitle, lstelemid) {
	this.libraryid = null;
	this.libtitle = libTitle;
};

function myVoiceLibraryLst(liblsttitle, userlog) {
	this.librarylstid = null;
	this.liblsttitle = liblsttitle;
	this.userlog = userlog;
};

function myVoiceSound(soundUrl, languageId) {
	this.soundid = null;
	this.languageid = languageId;
	this.soundurl = soundUrl;
};

function myVoiceElemSetings(setingsid, elemid) {
	this.elemsetingsid = null;
	this.setingsid = setingsid;
	this.elemid = elemid;
};

function myVoiceLibElem(libraryid, elemid) {
	this.libelemid = null;
	this.libraryid = libraryid;
	this.elemid = elemid;
};

function myVoiceLibLink(libraryid, librarylstid) {
	this.liblinkid = null;
	this.libraryid = libraryid;
	this.librarylstid = librarylstid;
};

function myVoiceText(text, languageId) {
	this.textid = null;
	this.languageid = languageId;
	this.text = text;
};

function myVoiceUser(librarylstid, languageid, login, password, backupurl, setings) {
	this.languageid = languageid;
	this.userid = null;
	this.librarylstid = librarylstid;
	this.interfacesetings = setings;
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

function myVoiceInterfaceSetings(){
	this.backgroundColor = "";
	this.writingpolice = "";
	this.writingsize = 15;
	this.writinglogo = "URL";
	this.writingcolor = "";
	this.tabPos = 1;
	this.speakAreaPos = 1;
	this.speakAreaColor = "";
	this.nbColumn = 3;
	this.random = 1;
	this.manual = 0;
	this.DD = 0;
	this.click = 1;
	this.sound = 0;
	this.tabnav = {
		slide : 0,
		click : 1,
	};
	this.butonColor = "";
	this.language = 0;
	this.lastchange = Date.now();
}

function myVoiceElemSetings(){
	this.elemsetingsid = null; // ID should be the same as the Element Primary key: user_elemid
	this.width = 10;
	this.writing = {
		police: "",
		policecolor: "",
		size: 15,
		color: "",
		place: 0
	};
	this.sound = 0;
	this.lastchange = Date.now();
}
