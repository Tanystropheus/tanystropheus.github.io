/* ********************************************************************************************* */
/* ************************************* FONCTIONS INSERT ************************************** */
/* ********************************************************************************************* */


/* ********************************************************************************************* */
/* ************************************* VARIABLE GLOBAL *************************************** */
/* ********************************************************************************************* */

var pictureSource;
var destinationType;
var entry;
var file;
var fileTransfer;
var tmp = {};

/* ************************************* VARIABLE PRESET *************************************** */

var elem = new myVoiceElem(null, null, null, "t" );
var son =  new myVoiceSound(null, "1");
var texte = new myVoiceText(null, "1");
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
	alert("insert Bdd");
	alert(JSON.stringify(elem));
	alert(JSON.stringify(son));
	alert(JSON.stringify(texte));

	insertText(texte);
	if (elem.soundid !== undefined) {
		insertSound(son);
	}
	insertElements(elem);
	elem = new myVoiceElem(null, null, null, "t" );
	texte = new myVoiceText(null, "1");
	son = new myVoiceSound(null, "1");
}

// var promis;
//
// if (elem.soundid !== undefined) {
// 	insertSound(son).then(function (){son = new myVoiceSound(null, "1");});
// }
// promis = insertText(texte);
// promis.then(function (){
// 	alert("lol");
// 	var promis1;
// 	promis1 = insertElements(elem);
// 	promis1.then(function(){
// 		elem = new myVoiceElem(null, null, null, "t" );
// 		texte = new myVoiceText(null, "1");
// 		alert("tamere");
// 	});
// });


function myInsertBdd(){
	alert("myInsertBdd");
}

// function insertBdd1() {
// 	var promis;
// 	if (elem.soundid !== undefined) {
// 		promis = insertSound(son);
// 		promis.then(function (){son = (null, "1");});
// 	}
// 	elem = (null, null, null, "t");
//  	texte = (null, "1");
// 	alert("tamere");
// }



/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function selectPhoto(imageURI) {
  var myImage = document.getElementById('select');
  myImage.style.display = 'block';
  myImage.width =  250;
  //var myImage;
  myImage.src = imageURI;
  if (imageURI !== undefined) {
	  alert(JSON.stringify(imageURI));
	  	mvFile(imageURI).then(
			function(success) {
				elem.elemurl = success.path;
				alert(success.path);
				elem.width = 189;
				alert(JSON.stringify(elem));
			}
		);
	}
	else {
		alert("merci de choisir une photo");
	}
}

function getPhoto() {
	navigator.camera.getPicture(selectPhoto, fail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
}

function myGetPhoto(){
	alert("myGetPhoto()");
}

/* ************************************* PICK PHOTO ****************************************** */

function pickPhoto(imageData) {
  // var smallImage = document.getElementById('pick');
  // smallImage.style.display = 'block';
  var smallImage;
  smallImage.src = "data:image/jpeg;base64," + imageData;
  if (imageData !== undefined) {
	  mvFile(smallImage.src).then(
		  function(success) {
			  elem.elemurl = success.path;
			  alert(success.path);
			  alert(JSON.stringify(elem));
		  }
	  );
	}
	else {
		alert("merci de prendre une photo");
	}
}

function capturePhoto() {
	alert("nique tamere");
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
		promis = selectMax("(soundid)","Sound", tmp);
		promis.then(function(){
			captureSuccess2(mediaFiles);},
			function(){
				alert("PROBLEME BASE DE DONNEE");
				});
	}
}
function captureSuccess2(mediaFiles) {
	if (tmp["undefined"]["MAX (soundid)"] === "" || tmp["undefined"]["MAX (soundid)"] === null) {
		alert("Capture Succes undef");
		elem.soundid = 1;
	}
	else {
		alert("Capture Succes def");
		elem.soundid = tmp["undefined"]["MAX (soundid)"] + 1;
	}
	mvFile("file://" + mediaFiles[0].fullPath).then(
		function(success) {
			son.soundurl = success.path;
			alert(success.path);
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
	alert(document.getElementById('name'));
	alert("kqwmqwe");
	var promis;
	texte.text = document.getElementById('name').value;
	alert(texte.text);
	selectMax("(textid)","Text", tmp)
	.then(function (tmp) {
		alert("Promise test");
		if (tmp["undefined"]["MAX (textid)"] === null || tmp["undefined"]["MAX (textid)"] === 0) {
			alert("Create undef");
			elem.textid = 1;
		}
		else {
			alert("Create def");
			alert(JSON.stringify(tmp));
			alert(tmp["undefined"]["MAX (textid)"]);
			//alert(tmp.textid);
			elem.textid = tmp["undefined"]["MAX (textid)"] + 1;
		}
	});
}

/* ********************************************************************************************* */
/* ******************************* MANIPULATION FICHIER **************************************** */
/* ********************************************************************************************* */

function onRequestFileSystemSuccess(fileSystem) {
	entry = fileSystem.root;
	entry.getDirectory("DataBank", {create: true, exclusive: false}, win, fail);
}

function mvFile(source) {
	return new Promise(function(fulfill, reject) {
		alert("dansd mv");
		alert(JSON.stringify(source));
		fileTransfer = new FileTransfer();
		selectMax("(elemid)","Elements", tmp).then(function() {
			alert("dansd mv:\n" + JSON.stringify(source));
			var t = source.substring(source.lastIndexOf("."));
			alert("apres t");
			destination = encodeURI(entry.toURL() + "DataBank/" + (tmp["undefined"]["MAX (elemid)"] + 1) + t);
			fileTransfer.download(
				source,
				destination,
				function() { fulfill({ path: destination }); win(); },
				function(msg) { reject({message: msg}); fail(msg); },
				false,
				{ headers: { "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==" }
			});
		});
	});
}

// function mvFile(file123) {
// 	file = file123;
// 	alert("dansd mv");
// 	alert(JSON.stringify(file));
// 	fileTransfer = new FileTransfer();
// 	selectMax("(elemid)","Elements", tmp).then(function (){
// 		alert("dansd mv");
// 		alert(JSON.stringify(file));
// 		var t = file.substring(file.lastIndexOf("."));
// 		alert("apres t");
// 		filePath = encodeURI(entry.toURL() + "DataBank/" + (tmp["undefined"]["MAX (elemid)"] + 1) + t);
// 		fileTransfer.download(file,filePath,win, fail, false, {
// 			headers: {
// 				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
// 			}
// 		});
// 	});
// }
/* ********************************************************************************************* */
/* ************************************* CALLBACK ********************************************** */
/* ********************************************************************************************* */

function win(file) {
	alert("GOOD");
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
