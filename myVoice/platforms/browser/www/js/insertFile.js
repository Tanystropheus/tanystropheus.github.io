/* ********************************************************************************************* */
/* ************************************* VARIABLE GLOBAL *************************************** */
/* ********************************************************************************************* */
alert("test-1");

var pictureSource = navigator.camera.PictureSourceType;
alert(navigator);
alert(pictureSource);
var destinationType = navigator.camera.DestinationType;
var entry;
var tmp;

/* ************************************* VARIABLE PRESET *************************************** */

var elem = new myVoiceElem(" ", " ", " ", " ", 1 , " ", " ", " ", "t");

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SQL ***************************************** */
/* ********************************************************************************************* */

function selectMax(sql, tmp, cb){
	var render = function(tx, rs) {
		alert("dans Select Max");
		if (rs.insertId !== undefined) {
			tmp = rs.insertId;
		}
		else {
			tmp = 0;
		}
		alert(tmp);
		if (typeof cb !== undefined){
			cb(tmp);
		}
	};
	selectRecords(render, sql);
}

function insertBdd(){
	alert("Fonction insert");
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function selectPhoto(imageURI) {
	alert("dans capture image");
  var myImage = document.getElementById('select');
  myImage.style.display = 'block';
  myImage.src = imageURI;
  selectMax("SELECT MAX(elemid) FROM Elements", tmp, function (tmp) {
	  elem.elemid = tmp + 1;
	  elem.elemurl = mvImage(smallImage.src);
	  elem.width = smallImage.width;
  });
}

function getPhoto(source) {
	alert("avant capture image");
  navigator.camera.getPicture(selectPhoto, fail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

/* ************************************* PICK PHOTO ****************************************** */

function pickPhoto(imageData) {
	alert("dans capture image");
  var smallImage = document.getElementById('pick');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
  selectMax("SELECT MAX(elemid) FROM Elements", tmp, function (tmp) {
	  elem.elemid = tmp + 1;
	  elem.elemurl = mvImage(smallImage.src);
	  elem.width = smallImage.width;
  });
}

function capturePhoto() {
	alert("avant capture image prendre");

  navigator.camera.getPicture(pickPhoto, fail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SONS **************************************** */
/* ********************************************************************************************* */

function captureSuccess(mediaFiles) {
	alert("dans capture audio");
	selectMax("SELECT MAX(soundid) FROM Sound", tmp, function (tmp) {
		elem.soundid = tmp + 1;
		elem.soundelem.soundid = elem.soundid;
		elem.soundelem.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
	});
}

function captureAudio() {
	alert("avant capture son");
	navigator.device.capture.captureAudio(captureSuccess, fail);
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function createName() {
	alert("dans create text");
	selectMax("SELECT MAX(textid) FROM Text", tmp, function (tmp) {
		alert(JSON.stringify(elem));
		alert(tmp + 1);
		elem.textid = tmp + 1;
		alert(elem.textid);
		alert("avanf textelem");
		elem.textelem.textid = elem.textid;
		alert("valeur text id ..");
		alert(elem.textelem.textid);
		elem.textelem.text = document.getElementById('name').value;
		alert("apres documet name");
		alert(elem.textelem.text);

	});
}

/* ********************************************************************************************* */
/* ******************************* MANIPULATION FICHIER **************************************** */
/* ********************************************************************************************* */

function onRequestFileSystemSuccess(fileSystem) {
	alert("test1");
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
