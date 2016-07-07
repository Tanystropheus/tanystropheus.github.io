//window.api = "https://pasteur-oauth2.herokuapp.com";
window.api =  "https://api.nova.interact.objectivemoon.io/docs";
window.loginapi = "https://arya.interact.objectivemoon.io";
//~ window.api = "http://requestb.in/1bcca031";

function getClientId(){
	return "571a53401e4886f36bc9b2dc3b9b22b4536e5ab51f22767eea9f7f365a849315";
}

function getClientSecret(){
	return "8c3ffc75868965db692bea0a70790b3085c253b680c61f91d8de4b3a93e4c0a9";
}

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str){
		return this.indexOf(str) == 0;
	};
}

function oauthClientToken(){
	//~ alert("begin oauth");
	//~ window.open('interactlogin.html' ,'_self', 'location=no');
	/*
	$.ajax({ 
		type: "POST",
		dataType: "application/json",
		Access-Control-Allow-Origin: '*',  
		Access-Control-Allow-Methods: 'GET, PUT, POST, DELETE, OPTIONS',
		Access-Control-Allow-Headers: 'Content-Type, Content-Range, Content-Disposition, Content-Description',
		//~ dataType: "text",
		//~ url: 'http://requestb.in/185uo1r1',
		url: window.api + '/auth/interact_oauth/authorize',
		crossDomain: true,
		data: {auth: {client_id: getClientId(), client_secret: getClientSecret()}, url: window.api + '/auth/interact_oauth/authorize'},
		success: function(data)
		{
			alert(JSON.stringify(data, null, 4));
			//var newWindow = window.open("", '_blank', 'location=no');
			//newWindow.document.write(data);
			// data = PDF binary
			// I want to do something with this
		},error: function(data, data2) { alert("error: " + JSON.stringify(data, null, 4) + "error2: " + JSON.stringify(data2, null, 4)); }
	});
	* */
	var ref = window.open(window.loginapi + '/users/sign_in?client_id=' + getClientId(), '_blank', 'location=no');
	ref.addEventListener('loadstart', function(e) {
		var url = e.url;
		var code = /\?code=(.+)$/.exec(url)[1];
		var error = /\?error=(.+)$/.exec(url);
		if (code || error) {
			ref.close();
		}
//~ 
		if (code) {
			//alert("code: " + JSON.stringify(code, null, 4));
			alert("OK: code=> " + code);
			interActLogin(code);
		} else if (error) {
			//The user denied access to the app
			deferred.reject({
				error: error[1]
			});
			alert(JSON.stringify(error[1], null, 4));
		}
	});
	ref.addEventListener('loaderror', function(e) {alert(JSON.stringify(e, null, 4));
		var url = e.url;
		var code = /\?code=(.+)$/.exec(url)[1];
		var error = /\?error=(.+)$/.exec(url);
		if (code || error) {
			ref.close();
		}
		if (code) {
			alert("err: code=> " + code);
			interActLogin(code);
		} else if (error) {
			//The user denied access to the app
			deferred.reject({
				error: error[1]
			});
			alert(JSON.stringify(error[1], null, 4));
		}
	});
};

function interActLogin(authorization_code){
	//~ alert("begin interActLogin!! code: " + authorization_code);
	$.ajax({
		type: "POST",
		dataType: "text",
		crossDomain: true,
		data:{auth:{client_id: getClientId(), client_secret: getClientSecret(), code: authorization_code}, url: window.loginapi + "/auth/interact_oauth/access_token"},//grant_type: "authorization_code", code: authorization_code},
		url: window.loginapi + "/auth/interact_oauth/access_token",
		//~ url: "http://requestb.in/zfigx9zf", 
		success: function(data) {
			data = JSON.parse(data);
			alert("begin suces: " + JSON.stringify(data, null, 4));
			//data = JSON.parse(data, null, 4);
			if (data.uid) window.localStorage.setItem("uid", data.uid);
			if (data.token) setUserToken(data.token);
			alert("Connexion réusie token: " + data.token + " uid: " + data.uid);
		},
		error: function(data, status, status2) {
			//alert("ERROR: " + data);
			alert("Connexion échouer: " + JSON.stringify(data, null, 4) + "erreur 2: " + JSON.stringify(status, null, 4) + "erreur 3: " + JSON.stringify(status2, null, 4));
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

//~ function test(){
	//~ authorization_code = "autorization1";
	//~ $.ajax({
		//~ type: "GET",
		//~ dataType: "jsonp",
		//~ crossDomain: true,
		//~ data:{client_id: getClientId(), client_secret: getClientSecret(), grant_type: "authorization_code", code: authorization_code},
		//~ url: window.api,// + "/auth/interact_oauth/access_token",
		//~ success: function(data) {
			//~ window.localStorage.setItem("uid", data.uid);
			//~ setUserToken(data.token);
			//~ alert("Connexion réusie");
		//~ },
		//~ error: function(data, status) {
			//~ console.log("ERROR: " + data);
			//~ alert("Connexion échouer: " + JSON.stringify(data, null, 4));
		//~ }
	//~ });
//~ }

function getUserToken(){
	var user_token = window.localStorage.getItem("userToken");
	if (user_token)	return user_token;
	//~ else alert("You are not Login in interact");
	//~ return window.localStorage.getItem("userToken");
}

function setUserToken(token){
	return window.localStorage.setItem("userToken", token);
}
