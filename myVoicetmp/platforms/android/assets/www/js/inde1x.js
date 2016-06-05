

document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {
        //app.receivedEvent('deviceready');
		openDb();
        initDb();
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
    }
