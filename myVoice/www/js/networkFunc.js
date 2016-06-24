function onlineEvent(){
	alert("now online");
}

function waitInternetCo(callback){
	setTimeout(function(){
		if(window.localStorage.getItem("waitInternetCo") == 1){
			//~ alert("checking co in progres ...");
			$.ajax({
				type: "GET",
				dataType: "text",
				crossDomain: true,
				url: window.api,
				success: function(data) {
					conected = true;
					window.localStorage.setItem("waitInternetCo", 0);
					if(callback) callback();
					//~ alert("wait InternetCo Finish");
				},
				error: function(data, status, status2) {
					waitInternetCo(callback);
					alert("Cannot acces To internet " + Date.now());
				}
			});
		}
	}, 60000 * 1);
}

function checkConnection(callback){
	if(window.localStorage.getItem("waitInternetCo") == 0){
		if(navigator.network.connection.type == Connection.NONE){
			window.localStorage.setItem("waitInternetCo", 1);
			//~ alert("nocon");
			document.addEventListener("online", function(){window.localStorage.setItem("waitInternetCo", 0);checkConnection(callback)}, false);
		}else{
			$.ajax({
				type: "GET",
				dataType: "text",
				crossDomain: true,
				url: window.api,
				success: function(data) {
					removeEventListener("online", function(){checkConnection(callback)}, false);
					window.localStorage.setItem("waitInternetCo", 0);
					if(callback) callback();
					//~ alert("yescon");
				},
				error: function(data, status, status2){
					window.localStorage.setItem("waitInternetCo", 1);
					waitInternetCo(
						function(){
							removeEventListener("online", function(){
									checkConnection(callback)
							}, false);
							callback();
						}
					);
					alert("Cannot acces To interact waiting changement");
				}
			});
		}
	}
}
