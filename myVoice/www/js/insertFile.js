/* ********************************************************************************************* */
/* ************************************* VARIABLE GLOBAL *************************************** */
/* ********************************************************************************************* */

var pictureSource;
//~ var destinationType;
var entry;
var file;
var fileTransfer;
var tmp = {};

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SQL ***************************************** */
/* ********************************************************************************************* */

function selectMax(sql1, sql2, objectLst, cb){
	var render = function(tx, rs) {
		return selectParser(objectLst, sql1, rs, cb);
	};
	return new Promise(function(resolve, reject){
		return selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT MAX " + sql1 + " FROM " + sql2);
	}, function(){alert("Select fail");});
}


function insertBdd(){
	//~ alert("insert Bdd: window.newElem:" + JSON.stringify(window.newElem, null, 4));

	if(window.newElem && window.newElem.elemid && createName()){
		insertText(window.newTexte);
		if (window.newSon && window.newSon.soundid) {
			insertSound(window.newSon);
			window.newElem.soundid = window.newSon.soundid;
		}
		window.newElem.textid = window.newTexte.textid;
		insertElements(window.newElem);
		window.newElem = undefined;
		document.getElementById('selectedForImport').src = 'app/img/capture.png';
		return true;
	}
	window.newElem = undefined;
	document.getElementById('selectedForImport').src = 'app/img/capture.png';
	return false;
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function selectPhoto(imageURI) {
  window.newElem = new myVoiceElem(null, null, null, "t" );
  var myImage = document.getElementById('selectedForImport');
  var success;
	if(myImage){
		myImage.width =  500;
		myImage.src = imageURI;
	}
  if (imageURI) {
		mvFile(imageURI).then(
			function(success) {
				var count = 0;
				for( i in window.appData.elements)
					count++;
				window.newElem.elemurl = success.path;
				window.newElem.elemid = ++count;
				myImage.src = success.path;
				//~ alert("success: " + JSON.stringify(success, null,4));
				window.newElem.width = 189;
				//~ alert(JSON.stringify(window.newElem));
			}
		);
	}
	else {
		alert("merci de choisir une photo");
		return false;
	}
}

function getPhoto() {
	navigator.camera.getPicture(selectPhoto, fail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
}

/* ************************************* PICK PHOTO ****************************************** */

function pickPhoto(imageData) {
  window.newElem = new myVoiceElem(null, null, null, "t" );
  var smallImage = document.getElementById('selectedForImport');
  var success;

  if(!smallImage)
	smallImage = {};

  smallImage.src = "data:image/jpeg;base64," + imageData;

  if (imageData) {
	  mvFile(smallImage.src).then(
		function(success) {
			var count = 0;
			for( i in window.appData.elements)
				count++;
			window.newElem.elemurl = success.path;
			window.newElem.elemid = ++count;
			myImage.src = success.path;
			window.newElem.width = 189;
		}
	);
	//~ alert("success: " + JSON.stringify(window.newFile, null, 4));
	}
	else {
		alert("merci de prendre une photo");
		return false;
	}
	return false;
}

function capturePhoto() {
	navigator.camera.getPicture(pickPhoto, fail, { quality: 50,
	destinationType: window.destinationType.DATA_URL });
}

function myCapturePhoto(){
	alert("myCapturePhoto()");
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SONS **************************************** */
/* ********************************************************************************************* */

function captureSuccess(mediaFiles) {
	var promis;
	window.newSon =  new myVoiceSound(null, "1");

	if (mediaFiles[0].fullPath !== undefined) {
		promis = selectMax("(soundid)","Sound", tmp);
		captureSuccess2(mediaFiles);
		//~ promis.then(function(){
			//~ captureSuccess2(mediaFiles);},
			//~ function(){
				//~ alert("PROBLEME BASE DE DONNEE");
				//~ });
	}
}
function captureSuccess2(mediaFiles) {
	var count = 0;
	for( i in window.appData.sound)
		count++;

	window.newSon.soundid = ++count;
	mvFile("file://" + mediaFiles[0].fullPath)
		.then(
		function(success) {
			window.newSon.soundurl = window.newFile.path;
			alert(window.newFile.path);
			alert(JSON.stringify(elem));
		}
	);
}
function captureAudio() {
	navigator.device.capture.captureAudio(captureSuccess, failSound);
}


/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function createName() {
	window.newTexte = new myVoiceText(null, "1");
	var promis;
	var count = 0;
	window.newTexte.text = $('#newPicName').val();
	if (!window.newTexte.text)
		return false;
	for( i in window.appData.text)
		count++;
	window.newTexte.textid = ++count;
	return true;
}

/* ********************************************************************************************* */
/* ******************************* MANIPULATION FICHIER **************************************** */
/* ********************************************************************************************* */

function onRequestFileSystemSuccess(fileSystem) {
	entry = fileSystem.root;
	entry.getDirectory("DataBank", {create: true, exclusive: false}, win, fail);
}

function mvFile(source) {
	var count = 0;
	for( i in window.appData.sound)
		count++;
	return new Promise(function(fulfill, reject) {
		fileTransfer = new FileTransfer();
			var t = source.substring(source.lastIndexOf("."));
			destination = encodeURI(entry.toURL() + "DataBank/" + (++count) + t);
			fileTransfer.download(
				source,
				destination,
				function() {win(destination); fulfill({ path: destination });},
				function(msg) {fail(msg); reject({message: msg});},
				false,
				{ headers: { "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==" }
			});
	});
}

/* ********************************************************************************************* */
/* ************************************* CALLBACK ********************************************** */
/* ********************************************************************************************* */

function win(file) {
	//~ alert("GOOD");
	clear_popup();
	window.newFile = file;
	return file;
}

function fail(message) {
  alert('Failed because: ' + JSON.stringify(message));
}
function failSound(){
	alert("si vous souhaitez ajouter une bande son merci de l'enregistrer");
}

function lepape() {

	var lol1, lol2, lol3;
var lol4 = {};
var lol5= {};
var lol6 = {};

	lol1 = selectElements("", lol4);
	lol1.then(function (){
		alert(JSON.stringify(lol4));
		lol2 = selectText("", lol5);
		lol2.then(function (){
			alert(JSON.stringify(lol5));
			lol3 = selectSound("", lol6);
			lol3.then(function (){
				alert(JSON.stringify(lol6));
			});
		});
	});
}
