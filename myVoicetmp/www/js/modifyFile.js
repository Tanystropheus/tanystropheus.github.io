/* ********************************************************************************************* */
/* ************************************* FONCTIONS MODIFY ************************************** */
/* ********************************************************************************************* */

var tmpelem = new myVoiceElements();
var tmpson = new myVoiceSound();
var tmptexte = new myVoiceText();
tmp = {};
/* ********************************************************************************************* */
/* ************************************* FONCTIONS SQL ***************************************** */
/* ********************************************************************************************* */

function pre_modify(id) {
	var sql = "where elemid =" + id;
	selectElements(sql, tmp, function(){
		alert(JSON.stringify(tmp[id]));
	});
	tmpelem = tmp[id];
	if (tmp[id].soundid !== undefined) {
		sql = "where soundid =" + tmpelem.soundid;
		selectSound(sql, tmp, function(){
			alert(JSON.stringify(tmp[tmpelem.soundid]));
		});
		tmpson = tmp[tmpelem.soundid];
	}
	tmpson = tmp[tmpelem.soundid];
	sql = "where textid =" + tmpelem.textid;
	selectText(sql, tmp, function(){
		alert(JSON.stringify(tmp[tmpelem.textid]));
	});
	tmptexte = tmp[tmpelem.textid];
}

function updateBdd(){
	updateInSqliteTable("Elements", "elemurl =" + tmpelem.elemurl, "elemid =" + tmpelem.elemid);
	updateInSqliteTable("Text", "text =" + tmptexte.text, "elemid =" + tmpelem.textid);
	if (tmpelem.soundid !== undefined)
		updateInSqliteTable("Sound", "soundurl =" + tmpson.soundurl, "elemid =" + tmpelem.soundid);
}
/* ********************************************************************************************* */
/* ************************************* FONCTIONS IMAGES ************************************** */
/* ********************************************************************************************* */


/* ************************************* SELECT PHOTO ****************************************** */

function m_selectPhoto(imageURI) {

  if (imageURI !== undefined) {
	  tmpelem.elemurl = mvFile(imageURI);
	  alert(JSON.stringify(tmpelem));
  }
  else {
	 alert("merci de choisir une photo");
  }
}

function m_getPhoto(source) {
  navigator.camera.getPicture(selectPhoto, fail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: pictureSource.PHOTOLIBRARY });
}

/* ************************************* PICK PHOTO ****************************************** */

function m_pickPhoto(imageData) {

  if (imageData !== undefined) {
	  tmpelem.elemurl = mvFile("data:image/jpeg;base64," + imageData);
	  alert(JSON.stringify(tmpelem.elemurl));
  }
  else {
	  alert("merci de prendre une photo");
  }
}

function m_capturePhoto() {
  navigator.camera.getPicture(m_pickPhoto, fail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS SONS **************************************** */
/* ********************************************************************************************* */

function m_captureSuccess(mediaFiles) {
	if (mediaFiles[0].fullPath !== undefined) {
		tmpson.soundurl = mvFile("file://" + mediaFiles[0].fullPath);
		alert(JSON.stringify(tmp));
	}
	else {
		alert("merci d'enregistrer un son");
	}
}

function m_captureAudio() {
	navigator.device.capture.captureAudio(m_captureSuccess, fail);
}

/* ********************************************************************************************* */
/* ************************************* FONCTIONS TEXT **************************************** */
/* ********************************************************************************************* */

function modifyName() {
	if (document.getElementById('name').value !== undefined) {
		tmptexte.text = document.getElementById('name').value;
		alert(JSON.stringify(tmp));
	}
	else {
		alert("merci de mettre un text");
	}
}
