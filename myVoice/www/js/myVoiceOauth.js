window.api = "https://pasteur-oauth2.herokuapp.com";
//window.api = "http://requestb.in/1mvgbra1";

function getClientId(){
	return "b17595e9d55257fa6cdb6538deaa7f273eb76b8559c1d76524ea0b35d98cb7cd";
}

function getClientSecret(){
	return "dbf84c10b2873a0ee2034b5839faba0a5a0d53233440b46684478f92e8ae8805";
}

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.indexOf(str) == 0;
	};
}

function oauthClientToken(){
	//alert("begin oauth");
	var ref = window.open(window.api + '/auth/interact_oauth/authorize?client_id=' + getClientId() + '&client_secret=' + getClientSecret(), '_self', 'location=yes');
	ref.addEventListener('loadstart', function(e) {
				//~ alert("toto");
				var url = e.url;
				var code = /\?code=(.+)$/.exec(url);
				var error = /\?error=(.+)$/.exec(url);
				if (code || error) {
					ref.close();
				}

				if (code) {
					//~ alert("test");
					alert("code: " + JSON.stringify(code, null, 4));
					interActLogin(code);
				} else if (error) {
					//The user denied access to the app
					deferred.reject({
						error: error[1]
					});
					alert(JSON.stringify(error[1], null, 4));
				}
			});
		//ref.addEventListener('loadstop', function(e) {alert(e);});
		ref.addEventListener('loaderror', function(e) {alert(JSON.stringify(e, null, 4));});
	};

function interActAuthorization(){
	var ref = window.open(window.api + '/auth/interact_oauth/authorize?client_id=' + clientId, '_blank', 'location=no');
	ref.addEventListener('loadstart', function(event) { 
		if((event.url).startsWith("http://")) {
			authorization_code = (event.url).split("code=")[1];
			ref.close();
			interActLogin(authorization_code);
		}
	});
}

function interActLogin(authorization_code){
	alert("begin interActLogin!!");
	alert("authorization_code" + authorization_code);
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		crossDomain: true,
		data:{client_id: getClientId(), client_secret: getClientSecret(), grant_type: "authorization_code", code: authorization_code},
		url: window.api + "/auth/interact_oauth/access_token",
		success: function(data) {
			alert("begin suces");
			if (data.uid) window.localStorage.setItem("uid", data.uid);
			if (data.token) setUserToken(data.token);
			alert("Connexion réusie");
		},
		error: function(data, status) {
			//alert("ERROR: " + data);
			alert("Connexion échouer: " + JSON.stringify(data, null, 4) + JSON.stringify(status, null, 4));
		}
	});
}

function interActLogOut(){
	$.ajax({
		type: "DELETE",
		dataType: "jsonp",
		crossDomain: true,
		data:{token: getUserToken()},
		url: window.api + "/auth/interact_oauth/sign_out_user",
		success: function(a1, a2, a3){
			alert(JSON.stringify(a1, null, 4));
		},
		error: function(data, status) {
			console.log("ERROR: " + data);
		}
	});
}


function test(){
	authorization_code = "autorization1";
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		crossDomain: true,
		data:{client_id: getClientId(), client_secret: getClientSecret(), grant_type: "authorization_code", code: authorization_code},
		url: window.api,// + "/auth/interact_oauth/access_token",
		success: function(data) {
			//~ window.localStorage.setItem("uid", data.uid);
			//~ setUserToken(data.token);
			alert("Connexion réusie");
		},
		error: function(data, status) {
			console.log("ERROR: " + data);
			alert("Connexion échouer: " + JSON.stringify(data, null, 4));
		}
	});
}

function getUserToken(){
	return "test";
	//return window.localStorage.getItem("userToken");
}

function setUserToken(token){
	return window.localStorage.setItem("userToken", token);
}
