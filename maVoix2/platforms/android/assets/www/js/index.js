alert("lol");
var pictureSource;
var destinationType;
function ids () {
	this.n = '';
	this.s = '';
	this.i = '';
};
var nom = new ids;

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function createName() {
	nom.n = document.getElementById('name').value;
	alert("create");
	alert(nom.n);
	alert("finish");
}
function captureSuccess(mediaFiles) {
	var i, len;
	for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		alert(mediaFiles[i].fullPath);
		nom.s = mvFile("file://" + mediaFiles[i].fullPath);
		alert(nom.s)
	}
}
function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('pick');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
  nom.i = mvImage(smallImage.src);
  alert("apres mv");
  alert(nom.s);
}

function onPhotoURISuccess(imageURI) {
  var myImage = document.getElementById('select');
  myImage.style.display = 'block';
  myImage.src = imageURI;


  alert(myImage.src);
  nom.i = mvFile(myImage.src);
//	  crfile(imageURI);
  alert("apres mv");
  alert(nom.i);
}
function captureAudio() {
	// Launch device audio recording application,
	// allowing user to capture up to 2 audio clips
	navigator.device.capture.captureAudio(captureSuccess, fail, {limit: 1});
}

function capturePhoto() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
	destinationType: destinationType.DATA_URL });
}

function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 10,
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

function mvFile(file/*,le path du dossier databank*/) {

	var fileTransfer = new FileTransfer();
	alert("avanr t");
	alert(nom.n);

	var t = file.substring(file.lastIndexOf("."));
// mettre dans le file path le path de databank et le nom du fichier !!!!!
alert("avanr filePath");

  var filePath = encodeURI("/Users/vicius/test/" + nom.n + t);
  alert(filePath);
	alert("avant transfert");
	fileTransfer.download(
		file,
		filePath,
		win,
		fail,
		false,
		{
			headers: {
				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
	alert("apres transfert");
	return filePath;
}

function fail(error) {
	alert("An error has occurred: Code = " + error.code);
	alert("upload error source " + error.source);
	alert("upload error target " + error.target);
}

function win(file) {
	alert("GOOD");
}

function onFail(message) {
  alert('Failed because: ' + JSON.stringify(message));
}
