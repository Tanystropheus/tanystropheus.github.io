function genCatForm(divCatPos){
	divCatPos = document.createElement("FORM");
	divCatPos.innerHTML = '<label id="CatPosTopLab" for="CatPosTop">En Haut</label><input class="catPos" type="radio" name="CatPos" id="CatPosTop" value="1" />\
		<label id="CatPosBotomLab" for="CatPosBotom">En Bas</label><input class="catPos" type="radio" name="CatPos" id="CatPosBotom" value="2" />\
		<label id="CatPosRightLab" for="CatPosRight">A droite</label><input class="catPos" type="radio" name="CatPos" id="CatPosRight" value="3" />\
		<label id="CatPosLeftLab" for="CatPosLeft">A Gauche</label><input class="catPos" type="radio" name="CatPos" id="CatPosLeft" value="4" />';

	if (window.appData.interfaces_setings.tabPos === "1") document.getElementById("CatPosTop").setAttribute("checked", "on");
	if (window.appData.interfaces_setings.tabPos === "2") document.getElementById("CatPosBotom").setAttribute("checked", "on");
	if (window.appData.interfaces_setings.tabPos === "3") document.getElementById("CatPosRight").setAttribute("checked", "on");
	if (window.appData.interfaces_setings.tabPos === "4") document.getElementById("CatPosLeft").setAttribute("checked", "on");
}

function genColorListener(){
	//~ alert("begin " + JSON.stringify($(".colorTriger")));
	$(".colorTriger").spectrum({});
	//~ alert("ok");
}

function genSetingForm(place){
	//alert(place);
	place.appendChild(document.createTextNode("Selectioner la position des catégories"));
	div = $("<form>");
	div.appendTo(place);

	//~ genCatForm(place, div);
	genColorListener(div);
	//place.appendChild(divCatPos);
	//place.innerHTML = setForm;
	//~ place.appendChild(div);
	return true;
}

//~ function getSetingForm(){
	//~ alert("get seting Form");
	//~ window.appData.interfaces_setings.tabPos = $('input[type=radio][name=CatPos]:checked').attr('value');
	//~ window.localStorage.setItem("Interfaces_Setings", JSON.stringify(window.appData.interfaces_setings));
//~ }

//~ function genLogForm(){
	//~ document.getElementById("loginpage").innerHTML ='<form class="new_user" id="new_user" action="https://pasteur-oauth2.herokuapp.com/users/sign_in" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="i9lG3dql8y0NkzgLPOi7g6jqArxs3Z3/uzyt48JYDjLvA6divqc85kJ+44mCQxmWxQF3o3c7kaWPD77E5fpzsw==" />  <div class="field"><label for="user_email">Email</label><br /><input autofocus="autofocus" type="email" value="" name="user[email]" id="user_email" />  </div>  <div class="field"><label for="user_password">Password</label><br /><input autocomplete="off" type="password" name="user[password]" id="user_password" />  </div><div class="field">  <input name="user[remember_me]" type="hidden" value="0" /><input type="checkbox" value="1" name="user[remember_me]" id="user_remember_me" />  <label for="user_remember_me">Remember me</label></div>  <input type="hidden" name="client_id" id="client_id" value=' + getClientId() + '+ />  <div class="actions"><input type="submit" name="commit" value="Log in" />  </div></form>  <a href="https://pasteur-oauth2.herokuapp.com/users/sign_up?client_id="'+getClientId()+'">Sign up</a><br />  <a href="https://pasteur-oauth2.herokuapp.com/users/password/new">Forgot your password?</a><br />';
//~ }
