/*HEADER DES PAGES D'ADMINISTRATIONS*/
/*VARIABLES DU HEADER DES PAGES D'ADMINISTRATIONS*/
var show_language_popup = "language_prompt(\"visible\");";
var hide_language_popup = "language_prompt(\"hidden\");";
var show_library_popup = "library_prompt(\"visible\");";
var hide_library_popup = "library_prompt(\"hidden\");";
/*FONCTION DU HEADER DES PAGES D'ADMINISTRATIONS*/
function language_prompt(visibility){
    if (visibility === "visible")
        document.getElementById('alert').innerHTML = view_language_prompt;
    else
        document.getElementById('alert').innerHTML = "";
    document.getElementById('popup').style.visibility = visibility;
}
function library_prompt(visibility){
    if (visibility === "visible")
        document.getElementById('alert').innerHTML = view_library_prompt;
    else
        document.getElementById('alert').innerHTML = "";
    document.getElementById('popup').style.visibility = visibility;
}
/*HTML*/
/*CODE HTML DU HEADER DES PAGES D'ADMINISTRATIONS*/
var view_header_admin = "" +
"<div id='header_left' onclick='" +/*here all function*/ "'>" +
"<button onclick='" +/*here all function*/ open_app + "'><&nbsp&nbsp&nbsp&nbsp&nbspMA VOIX</button>" +
"</div>" +
"<div id='header_middle' onclick='" +/*here all function*/ "'>" +
"<span id='header_language'><img src=# onclick='" +/*here all function*/ show_language_popup + "'></span>" +
"<div style='float:none;'>" +
"<button id='header_import' onclick=" +/*here all function*/ open_import + ">IMAGES</button>" +
"<button id='header_library' onclick=" +/*here all function*/ show_library_popup + ">CLASSEURS</button>" +
"<button id='header_learning' onclick=" +/*here all function*/ open_learning + ">APPRENTISSAGES</button>" +
"</div>" +
"</div>" +
"<div id='header_right' onclick='" +/*here all function*/ "'>" +
"<button onclick='" +/*here all function*/ open_gallery + "'>GALERIE</button>" +
"</div>";
/*CODE HTML DU POPUP DES LANGUES*/
var view_language_prompt = "" +
"<select id='select_language'>" +
"<option value='fr'>Français</option>" + 
"</select>" +
"<button onclick='" +/*here all function*/ hide_language_popup + "'>CONFIRMER</button>" +
"<button onclick='" +/*here all function*/ hide_language_popup + "'>ANNULER</button>";
/*CODE HTML DU POPUP DES CATEGORIES ET CLASSEURS*/
var view_library_prompt = "" +
"<form>" +
"<fieldset>" +
"<legend>Classeurs</legend>" +
"<select id='select_librarylst'>" +
"<option value='MA'>Mode Apprentissage</option>" +
"<option value='MU'>Mode Utilisations</option>" +  
"</select>" +
"<button onclick='" +/*here all function*/ hide_library_popup + "'>AJOUTER</button>" +
"<button onclick='" +/*here all function*/ hide_library_popup + "'>SUPPRIMER</button>" +
"<button onclick='" +/*here all function*/ hide_library_popup + "'>RENOMER</button>" +
"</fieldset>" +
"</form>" +
"<form>" +
"<fieldset>" +
"<legend>Catégories</legend>" +
"<select id='select_library'>" +
"<option value='news'>Nouvelles Images</option>" + 
"</select>" +
"<button onclick='" +/*here all function*/ hide_library_popup + "'>AJOUTER</button>" +
"<button onclick='" +/*here all function*/ hide_library_popup + "'>SUPPRIMER</button>" +
"<button onclick='" +/*here all function*/ hide_library_popup + "'>RENOMER</button>" +
"</fieldset>" +
"</form>";