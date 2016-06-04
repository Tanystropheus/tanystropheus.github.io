/* USE VAR FOR CALL FUNCTION IN STRING HTML FOR EASY CHANGE */
/* IMPORT VIEW BUTTON */
var show_cam_button = "show_camera_section();";
var show_mic_button = "show_micro_section();";
var hide_cam_button = "hide_camera_section();";
var hide_mic_button = "hide_micro_section();";
var take_picture = "alert(\"PRENDRE UNE PHOTO\");";
var import_picture = "alert(\"IMPORTER UNE PHOTO\");";
var record_sound = "alert(\"ENREGISTRER UN SON\");";
var save_new_picture = "alert(\"TOUT EST OK\");";
function show_camera_section(){
        document.getElementById('section_camera_record').style.visibility = "visible";
        document.getElementById('section_camera_import').style.visibility = "visible";
}
function show_micro_section(){
        document.getElementById('section_micro_record').style.visibility = "visible";
}
function hide_camera_section(){
        document.getElementById('section_camera_record').style.visibility = "hidden";
        document.getElementById('section_camera_import').style.visibility = "hidden";
}
function hide_micro_section(){
        document.getElementById('section_micro_record').style.visibility = "hidden";
}
/* IMPORT VIEW POPUP */
var show_lang_popup = "language_prompt(\"visible\");";
var hide_lang_popup = "language_prompt(\"hidden\");";
function language_prompt(visibility){
    if (visibility === "visible")
        document.getElementById('alert').innerHTML = view_library_prompt;
    else
        document.getElementById('alert').innerHTML = "";
    document.getElementById('popup').style.visibility = visibility;
}
/*HTML CODE FOR CONTENT*/
var view_import_header = "" +
"<div id='header_left' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<button onclick='" + open_app + "'><&nbsp&nbsp&nbsp&nbsp&nbspMA VOIX</button>" +
"</div>" +
"<div id='header_middle' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<img id='select_language' src=# onclick='" + show_lang_popup + "'>" +
"<div style='float:none;'>" +
"<button id='header_import' onclick=" + open_import + ">IMAGES</button>" +
"<button id='header_library' onclick=" + open_library + ">CLASSEURS</button>" +
"<button id='header_learning' onclick=" + open_learning + ">APPRENTISSAGES</button>" +
"</div>" +
"</div>" +
"<div id='header_right' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<button onclick='" + open_gallery + "'>GALERIE</button>" +
"</div>";
var view_import_content = "" +
"<div id='section_camera' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<button id='section_camera_record' onclick='" + take_picture + "'>Prendre une PHOTO</button>" +
"<button id='section_camera_import' onclick='" + import_picture + "'>IMPORTER DEPUIS PHOTO</button>" +
"</div>" +
"<div id='section_image' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<img src=# alt='french' id='pick'onclick='" + test + "'></br><input type='text' name='input' value='Entrez du texte ici'>" +
"</div>" +
"<div id='section_micro' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<button id='section_micro_record' onclick='" + record_sound + "'>Capture Audio</button>" +
"</div>";
var view_import_footer = "" + 
"<div id='footer_camera' onclick='" + hide_mic_button + "'>" +
"<button onclick=" + show_cam_button + ">CAPTURE IMAGE</button>" + 
"</div>" +
"<div id='footer_text' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<button onclick='" + save_new_picture + "'>VALIDER</button><button onclick='" + clear_view + open_import + "'>ANNULER</button>" + 
"</div>" +
"<div id='footer_micro' onclick='" + hide_cam_button + "'>" +
"<button onclick='" + show_mic_button + "'>CAPTURE AUDIO</button>" + 
"</div>";
/*HTML CODE FOR POPUP*/
var view_language_prompt = "" +
"<select id='language_pop'>" +
"<option value='fr'>Français</option>" + 
"</select>" +
"<button onclick='" + hide_lang_popup + "'>CONFIRMER</button>" +
"<button onclick='" + hide_lang_popup + "'>ANNULER</button>";
var view_library_prompt = "" +
"<form>" +
"<fieldset>" +
"<legend>Classeurs</legend>" +
"<select id='librarylst'>" +
"<option value='MA'>Mode Apprentissage</option>" +
"<option value='MU'>Mode Utilisations</option>" +  
"</select>" +
"<button onclick='" + hide_lang_popup + "'>AJOUTER</button>" +
"<button onclick='" + hide_lang_popup + "'>SUPPRIMER</button>" +
"<button onclick='" + hide_lang_popup + "'>RENOMER</button>" +
"</fieldset>" +
"</form>" +
"<form>" +
"<fieldset>" +
"<legend>Catégories</legend>" +
"<select id='library'>" +
"<option value='news'>Nouvelles Images</option>" + 
"</select>" +
"<button onclick='" + hide_lang_popup + "'>AJOUTER</button>" +
"<button onclick='" + hide_lang_popup + "'>SUPPRIMER</button>" +
"<button onclick='" + hide_lang_popup + "'>RENOMER</button>" +
"</fieldset>" +
"</form>";