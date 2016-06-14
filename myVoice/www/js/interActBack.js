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
	//alert("begin sendToInteract");
	token = getUserToken();
	if(token){
		//~ alert("sendToInteract, have Token");
		var data = {};
		maxElemAssoidSend = parseInt(window.localStorage.getItem("maxElemAssoidSend"), 10);
		alert("maxElemAssoidSend: " + maxElemAssoidSend.toString());
		if(maxElemAssoidSend){
			alert("maxElemAssoidSend: " + maxElemAssoidSend.toString());
			selectElemAssociation("WHERE elemassoid>=" + (maxElemAssoidSend + 1 ).toString(), data, null).then(
				function(cbData){
					if(!isEmpty(cbData)){
						window.localStorage.setItem("maxElemAssoidSend", backEndSend(token, data).toString());
						//~ alert("Data: " + JSON.stringify(cbData, null, 4) + " Token: " + JSON.stringify(token, null, 4));
					}
					backEndSend(token, cbData);
				}
			);
		} else {
			//alert("no last send");
			selectElemAssociation("WHERE elemassoid>=1", data, null).then(function(cbData){
				if(!isEmpty(cbData)){
					window.localStorage.setItem("maxElemAssoidSend", backEndSend(token, data).toString());
					//~ alert("Data: " + JSON.stringify(data, null, 4) + " Token: " + JSON.stringify(token, null, 4));
				}
			});
			//backEndSend(token, data);
		}
	}
	else {
		alert("veuillez vous identifier as Interact s'il vous plais");
	}
}

function backEndSend(token, dataLst){
	alert(JSON.stringify(dataLst, null, 4));
	if(!isEmpty(dataLst)){
		for (var i in dataLst) {
			var data = {"ElemAssociation": dataLst[i]};
			//alert(JSON.stringify(data, null, 4));
			//~ $.ajax({
				//~ type: "POST",
				//~ dataType: "application/json",
				//~ crossDomain: true,
				//~ data:{client_id: getClientId(), client_secret: getClientSecret(), user_token: token},
				//~ url: window.api + "/api/v1/dataset",
				//~ success: function(data) {
					//~ //alert("begin suces: " + JSON.stringify(data, null, 4));
					//~ alert("Envoi des données réusie");
				//~ },
				//~ error: function(data, status, status2) {
					//~ //alert("ERROR: " + data);
					//~ alert("Erreur lors de l'envoi des données: " + JSON.stringify(data, null, 4) + "erreur 2: " + JSON.stringify(status, null, 4) + "erreur 3: " + JSON.stringify(status2, null, 4));
				//~ }
			//~ });
		}
		alert("Ajax request should be done!!");
		return i;
	} else{
		alert("No more Data should be send");
		//return 0;
	}
}
