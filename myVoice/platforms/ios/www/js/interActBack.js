function isEmpty(obj) { //http://stackoverflow.com/questions/4994201/is-object-empty
    // null and undefined are "empty"
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}


function sendToInteract(){
	var token;
	var cbFunc = function(cbData){
		var tabData = [];
		if(!isEmpty(cbData)){
			//~ alert("not empty " + Object.keys(cbData).length);
			for (var i = 0; i < cbData.length /*Object.keys(cbData).length*/; i++) {
				//~ alert("cbData: " + JSON.stringify(cbData[i+1], null, 4) + " i: " + i);
				tabData[i] = cbData[i+1];
			}
			//~ alert("Data: " + JSON.stringify(tabData, null, 4) + " Token: " + JSON.stringify(token, null, 4));
			backEndSend(token, tabData);
			//~ window.localStorage.setItem("maxElemAssoidSend", backEndSend(token, tabData).toString());
		}
	};

	token = getUserToken();
	if(token){
		var data = {};
		maxElemAssoidSend = parseInt(window.localStorage.getItem("maxElemAssoidSend"), 10);
		//~ alert("maxElemAssoidSend: " + maxElemAssoidSend.toString());
		if(maxElemAssoidSend){
			selectElemAssociation("WHERE elemassoid>=" + (maxElemAssoidSend + 1 ).toString(), data, null).then(cbFunc);
		} else {
			selectElemAssociation("WHERE elemassoid>=1", data, null).then(cbFunc);
		}
	}
	else {
		alert("veuillez vous identifier as Interact s'il vous plais");
	}
}

function backEndSend(token, data){
	var last;
	alert(JSON.stringify(data, null, 4));
	if(!isEmpty(data)){
		//~ //alert(JSON.stringify(data, null, 4));
		last = data[data.length - 1].elemassoid;
		$.ajax({
			type: "POST",
			//~ dataType: "application/json",
			dataType: "text",
			crossDomain: true,
			data:{client_id: getClientId(), client_secret: getClientSecret(), user_token: token, data: data},
			//~ url: window.api + "/api/v1/data",
			url: "http://requestb.in/zfigx9zf",
			success: function(data) {
				//alert("begin suces: " + JSON.stringify(data, null, 4));
				alert("Envoi des données réusie " + JSON.stringify(data));
				alert("return: " + last);
				return last;
			},
			error: function(data, status, status2, status3) {
				//alert("ERROR: " + data);
				alert("Erreur lors de l'envoi des données: " + JSON.stringify(data, null, 4) + " erreur 2: " + JSON.stringify(status, null, 4) + "erreur 3: " + JSON.stringify(status2, null, 4) + " erreur 4: " + JSON.stringify(status3, null, 4));
			}
		});
		//alert("Ajax request should be done!!");
		//return i;
	} else{
		alert("No more Data should be send");
		//return 0;
	}
}

function backEndGet(){
	token = getUserToken();
	if(token){
		$.ajax({
			type: "GET",
			dataType: "application/json",
			crossDomain: true,
			data:{user_token: token, client_id: getClientId(), client_secret: getClientSecret()},
			url: window.api + "/api/v1/datasets/user_actions",
			success: function(data) {
				//alert("begin suces: " + JSON.stringify(data, null, 4));
				alert("Reception des données réusie " + JSON.stringify(data));
			},
			error: function(data, status, status2){
				//alert("ERROR: " + data);
				alert("Erreur lors de l'envoi des données: " + JSON.stringify(data, null, 4) + "erreur 2: " + JSON.stringify(status, null, 4) + "erreur 3: " + JSON.stringify(status2, null, 4));
			}
		});
	}
}
