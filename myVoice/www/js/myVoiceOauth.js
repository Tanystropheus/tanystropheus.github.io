//~ window.api = "https://api.nova.interact.objectivemoon.io";
window.api = "http://requestb.in/1mvgbra1";

function getClientId(){
	return "my_client_id";
}

function getClientSecret(){
	return "my_client_secret";
}


if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}

function oauthClientToken(){
	var ref = window.open('https://api.nova.interact.objectivemoon.io/auth/interact_oauth/authorize?client_id=' + clientId + '&client_secret=' + client_secret, '_blank', 'location=no');
	ref.addEventListener('loadstart', function(event) { 
		if((event.url).startsWith("use.html")) {
			clientToken = (event.url).split("code=")[1];
			ref.close();
		}
	});
}

function interActAuthorization(){
	var ref = window.open('https://api.nova.interact.objectivemoon.io/auth/interact_oauth/authorize?client_id=' + clientId, '_blank', 'location=no');
	ref.addEventListener('loadstart', function(event) { 
		if((event.url).startsWith("fille:///")) {
			authorization_code = (event.url).split("code=")[1];
			ref.close();
			interActLogin(authorization_code);
		}
	});
}

function interActLogin(authorization_code){
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		crossDomain: true,
		data:{client_id: getClientId(), client_secret: getClientSecret(), grant_type: "authorization_code", code: authorization_code},
		url: window.api,// + "/auth/interact_oauth/access_token",
		success: function(data) {
			if (data.uid) window.localStorage.setItem("uid", data.uid);
			if (data.token) setUserToken(data.token);
			alert("Connexion réusie");
		},
		error: function(data, status) {
			console.log("ERROR: " + data);
			alert("Connexion échouer: " + JSON.stringify(data, null, 4) + JSON.stringify(status, null, 4));
		}
	});
}

function interActLogOut(){
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		crossDomain: true,
		data:{token: getUserToken()},
		url: window.api, //+ "/auth/interact_oauth/sign_out_user",
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
