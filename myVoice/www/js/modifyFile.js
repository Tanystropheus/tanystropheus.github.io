/* ********************************************************************************************* */
/* ************************************* FONCTIONS MODIFY ************************************** */
/* ********************************************************************************************* */
var pictureSource;
var destinationType;
var tmp = {};

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SQL ***************************************** */
/* ********************************************************************************************* */

function pre_modify(id) {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	var sql = "where elemid =" + id;
	selectElement(sql, tmp, function(){
		alert(JSON.stringify(tmp));
	});
}

function updateBdd(){
	var tname = Elements;
	var set = "width =" + tmp.width;
	var cond = "elemid =" + tmp.elemid;
	updateInSqliteTable(tname, set, cond);
	tname = Text;
	set = "text =" + tmp.textelem.text;
	cond = "textid =" + tmp.textid;
	updateInSqliteTable(tname, set, cond);
}
/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function selectPhoto(imageURI) {
  var myImage = document.getElementById('select');
  myImage.style.display = 'block';
  myImage.src = imageURI;
  if (myImage.src !== undefined) {
	  mvFile(imageURI);
	  tmp.width = myImage.width;
	  alert(JSON.stringify(tmp));
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
	  mvFile(smallImage.src);
	  tmp.width = smallImage.width;
	  alert(JSON.stringify(tmp));
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
		tmp.soundelem.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
		alert(JSON.stringify(tmp));
	}
	else {
		alert("merci d'enregistrer un son");
	}
}

function captureAudio() {
	navigator.device.capture.captureAudio(captureSuccess, fail);
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function modifyName() {
	if (document.getElementById('name').value !== undefined) {
		tmp.textelem.text = document.getElementById('name').value;
		alert(JSON.stringify(tmp));
	}
	else {
		alert("merci de mettre un text");
	}
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
	});
	alert("move ok");
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
