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
	var sql = "where elemid =" + id;
	selectElement(sql , tmp);
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
  mvFile(imageURI);
  tmp.width = myImage.width;
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
  mvFile(smallImage.src);
  tmp.width = smallImage.width;

}

function capturePhoto() {
  navigator.camera.getPicture(pickPhoto, fail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SONS **************************************** */
/* ********************************************************************************************* */

function captureSuccess(mediaFiles) {
	tmp.soundelem.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
}

function captureAudio() {
	navigator.device.capture.captureAudio(captureSuccess, fail);
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function modifyName() {
	tmp.textelem.text = document.getElementById('name').value;
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
