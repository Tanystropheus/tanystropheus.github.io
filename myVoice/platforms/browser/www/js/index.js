

document.addEventListener("deviceready",onDeviceReady,false);


    function onDeviceReady() {
        //app.receivedEvent('deviceready');
		alert("test0");
		openDb();
        initDb();
		alert("test0.1");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
    }
