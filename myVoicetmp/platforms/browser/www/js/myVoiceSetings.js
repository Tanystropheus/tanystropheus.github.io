function genCatForm(place){
	var t, top, botom, right, left, divCatPos;
	divCatPos = document.createElement("FORM");
	divCatPos.innerHTML = '<label id="CatPosTopLab" for="CatPosTop">En Haut</label><input class="catPos" type="radio" name="CatPos" id="CatPosTop" value="1" />\
		<label id="CatPosBotomLab" for="CatPosBotom">En Bas</label><input class="catPos" type="radio" name="CatPos" id="CatPosBotom" value="2" />\
		<label id="CatPosRightLab" for="CatPosRight">A droite</label><input class="catPos" type="radio" name="CatPos" id="CatPosRight" value="3" />\
		<label id="CatPosLeftLab" for="CatPosLeft">A Gauche</label><input class="catPos" type="radio" name="CatPos" id="CatPosLeft" value="4" />';
	place.appendChild(divCatPos);

	if (window.appData.interfaces_setings.tabPos === "1") document.getElementById("CatPosTop").setAttribute("checked", "on");
	if (window.appData.interfaces_setings.tabPos === "2") document.getElementById("CatPosBotom").setAttribute("checked", "on");
	if (window.appData.interfaces_setings.tabPos === "3") document.getElementById("CatPosRight").setAttribute("checked", "on");
	if (window.appData.interfaces_setings.tabPos === "4") document.getElementById("CatPosLeft").setAttribute("checked", "on");
}

function genCatColorForm(){
	function render(tx, rx){
		var text = "";
		for (var i = 0; i < rs.rows.length; i++) {
			text += '<label id="'+ liblsttitle + 'ColorLab" for="'+ liblsttitle +'Color">'+ liblsttitle +'</label><input id="'+ liblsttitle +'Color"/>'
		}
	};
	selectRecords(function(tx, rs) {
			if (render(tx, rs)) {
				return resolve(objectLst);
			} else {
				alert("rejected");
				reject("error in callback");
			}
		}, "SELECT liblsttitle FROM LibraryLst " + sql + " ORDER by librarylstid");
}

function genSetingForm(place){
	//alert(place);
	place.appendChild(document.createTextNode("Selectioner la position des catégories"));
	genCatForm(place);
	//place.appendChild(divCatPos);
	//place.innerHTML = setForm;
	return true;
}

function getSetingForm(){
	alert("get seting Form");
	window.appData.interfaces_setings.tabPos = $('input[type=radio][name=CatPos]:checked').attr('value');
	window.localStorage.setItem("Interfaces_Setings", JSON.stringify(window.appData.interfaces_setings));
}
