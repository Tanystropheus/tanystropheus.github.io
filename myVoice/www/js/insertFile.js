/* ********************************************************************************************* */
/* ************************************* FONCTIONS INSERT ************************************** */
/* ********************************************************************************************* */


/* ********************************************************************************************* */
/* ************************************* VARIABLE GLOBAL *************************************** */
/* ********************************************************************************************* */

var entry;
var tmp;

/* ************************************* VARIABLE PRESET *************************************** */

var elem = new myVoiceElem(" ", " ", " ", "t" );
var son =  new myVoiceSound(" ", "1");
var texte = new myVoiceText(" ", "1");
/* ********************************************************************************************* */
/* ************************************* FONCTIONS SQL ***************************************** */
/* ********************************************************************************************* */

function selectMax(sql, tmp, cb){
	var render = function(tx, rs) {
		if (rs.insertId !== undefined) {
			tmp = rs.insertId;
		}
		else {
			tmp = 0;
		}
		if (typeof cb !== undefined){
			cb(tmp);
		}
	};
	selectRecords(render, sql);
}

function insertBdd(){
	insertElements(elem);
	insertText(texte);
	if (elem.soundid !== undefined) {
		insertSound(son);
	}
	elem = (" ", " ", " ", " ", "t");
	son = (" ",  " ", "1");
	texte = (" ", " ", "1");
}


/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function selectPhoto(imageURI) {
	alert("dans select");
  if (imageURI !== undefined) {
	  	elem.elemurl = mvFile(imageURI);
	  	alert(JSON.stringify(elem));
	}
	else {
		alert("merci de choisir une photo");
	}
}
function getPhoto() {
	alert("debut get");
  navigator.camera.getPicture(selectPhoto, fail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: pictureSource.PHOTOLIBRARY });

}

/* ************************************* PICK PHOTO ****************************************** */

function pickPhoto(imageData) {
	alert("je pete les plombs");
	if (imageData !== undefined) {
		  elem.elemurl = mvFile("data:image/jpeg;base64," + imageData);
		  alert(JSON.stringify(elem)); }
	else {
		alert("merci de prendre une photo"); }
}

function capturePhoto() {
    alert("lololool");
  navigator.camera.getPicture(pickPhoto, fail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SONS **************************************** */
/* ********************************************************************************************* */

function captureSuccess(mediaFiles) {
	if (mediaFiles[0].fullPath !== undefined) {
		selectMax("SELECT MAX(soundid) FROM Sound", tmp, function (tmp) {
			elem.soundid = tmp + 1;
			son.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
			alert(JSON.stringify(elem)); });
	}
	else {
		alert("si vous souhaitez ajouter une bande son merci de l'enregistrer");
	}
}

function captureAudio() {
	navigator.device.capture.captureAudio(captureSuccess, fail);
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function createName() {
	selectMax("SELECT MAX(textid) FROM Text", tmp, function (tmp) {
		elem.textid = tmp + 1; } );
	texte.text = document.getElementById('name').value;
}

/* ********************************************************************************************* */
/* ******************************* MANIPULATION FICHIER **************************************** */
/* ********************************************************************************************* */

function onRequestFileSystemSuccess(fileSystem) {
	entry = fileSystem.root;
	entry.getDirectory("DataBank", {create: true, exclusive: false}, win, fail);
}

function mvFile(file) {
	var fileTransfer = new FileTransfer();
	var t = file.substring(file.lastIndexOf("."));
	var filePath = encodeURI(entry.toURL() + "DataBank/" + elem.elemid + t);
	fileTransfer.download(file,filePath, win, fail, false, {
		headers: {
			"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
		}
	} );
	return filePath;
}

/* ********************************************************************************************* */
/* ************************************* CALLBACK ********************************************** */
/* ********************************************************************************************* */

function win() {
	alert("GOOD");
}

function fail(message) {
  alert('Failed because: ' + JSON.stringify(message));
}
