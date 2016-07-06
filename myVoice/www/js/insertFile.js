/* ********************************************************************************************* */
/* ************************************* FONCTIONS INSERT ************************************** */
/* ********************************************************************************************* */


/* ********************************************************************************************* */
/* ************************************* VARIABLE GLOBAL *************************************** */
/* ********************************************************************************************* */

var pictureSource;
var destinationType;
var entry;
var tmp;

/* ************************************* VARIABLE PRESET *************************************** */

var elem = new myVoiceElem(null, null, null, "t" );
var son =  new myVoiceSound(null, "1");
var texte = new myVoiceText(null, "1");
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
	alert("insert Bdd");
	var promis;
	promis = insertElements(elem);
	promis.then(function (){
		var promis1;
	 	promis1 = insertText(texte);
		promis1.then(function(){
			insertBdd1();
		});
	});
	if (elem.soundid !== undefined) {
		insertSound(son);
	}
	elem = (null, null, null, null, "t");
	son = (null,  null, "1");
	texte = (null, null, "1");
}

function myInsertBdd(){
	alert("myInsertBdd");
}

function insertBdd1() {
	var promis;
	if (elem.soundid !== undefined) {
		promis = insertSound(son);
		promis.then(function (){son = (null,  null, "1");});
	}
	elem = (null, null, null, null, "t");
 	texte = (null, null, "1");
}



/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function selectPhoto(imageURI) {
  var myImage = document.getElementById('select');
  myImage.style.display = 'block';
  myImage.src = imageURI;
  if (myImage !== undefined) {
	  	elem.elemurl = mvFile(imageURI);
	  	elem.width = myImage.width;
	  	alert(JSON.stringify(elem));
	}
	else {
		alert("merci de choisir une photo");
	}
}

function getPhoto(source) {
	navigator.camera.getPicture(selectPhoto, fail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

function myGetPhoto(){
	alert("myGetPhoto()");
}

/* ************************************* PICK PHOTO ****************************************** */

function pickPhoto(imageData) {
  var smallImage = document.getElementById('pick');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
  if (imageData !== undefined) {
		  elem.elemurl = mvFile(smallImage.src);
		  elem.width = smallImage.width;
		  alert(JSON.stringify(elem));
	}
	else {
		alert("merci de prendre une photo");
	}
}

function capturePhoto() {
	navigator.camera.getPicture(pickPhoto, fail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

function myCapturePhoto(){
	alert("myCapturePhoto()");
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SONS **************************************** */
/* ********************************************************************************************* */

function captureSuccess(mediaFiles) {
	var promis;

	if (mediaFiles[0].fullPath !== undefined) {
		promis = selectMax("SELECT MAX(soundid) FROM Sound", tmp);
		promis.then(function(){
			captureSuccess2(tmp);},
			function(){alert("PROBLEME BASE DE DONNEE");});
	}
	else {
		alert("si vous souhaitez ajouter une bande son merci de l'enregistrer");
	}
}
function captureSuccess2(tmp) {
		elem.soundid = tmp + 1;
		son.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
		alert(JSON.stringify(elem));
}
function captureAudio() {
	navigator.device.capture.captureAudio(captureSuccess, fail);
}

function myCaptureAudio(){
	alert("myCaptureAudio()");
}
/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function createName() {
	texte.text = document.getElementById('name').value;
	promis = selectMax("SELECT MAX(textid) FROM Text", tmp);
	promis.then(function (tmp) {elem.textid = tmp + 1;});
}

function myCreateName(){
	alert("myCreateName()");
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

function win(file) {
	alert("GOOD");
}

function fail(message) {
  alert('Failed because: ' + JSON.stringify(message));
}
