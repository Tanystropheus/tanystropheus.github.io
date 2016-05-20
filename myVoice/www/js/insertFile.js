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

var elem = new myVoiceElem(" ", " ", " ", " ", 1 , " ", " ", " ", "t");

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
	insertText(elem.textelem);
	if (elem.soundid !== undefined) {
		insertSound(elem.soundelem);
	}
	elem = (" ", " ", " ", " ", 1 , " ", " ", " ", "t");
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
  	selectMax("SELECT MAX(elemid) FROM Elements", tmp, function (tmp) {
	  	elem.elemid = tmp + 1;
	  	elem.elemurl = mvFile(imageURI);
	  	elem.width = myImage.width;
	  	alert(JSON.stringify(elem)); });
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

/* ************************************* PICK PHOTO ****************************************** */

function pickPhoto(imageData) {
  var smallImage = document.getElementById('pick');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
  if (smallImage.src !== undefined) {
	  selectMax("SELECT MAX(elemid) FROM Elements", tmp, function (tmp) {
		  elem.elemid = tmp + 1;
		  elem.elemurl = mvFile(smallImage.src);
		  elem.width = smallImage.width;
		  alert(JSON.stringify(elem)); });
	}
	else {
		alert("merci de prendre une photo");
	}
}

function capturePhoto() {
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
			elem.soundelem.soundid = elem.soundid;
			elem.soundelem.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
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
		elem.textid = tmp + 1;
		elem.textelem.textid = elem.textid;
		elem.textelem.text = document.getElementById('name').value;
	});
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
