var show_cam_button = "show_camera_section();";
var show_mic_button = "show_micro_section();";
var hide_cam_button = "hide_camera_section();";
var hide_mic_button = "hide_micro_section();";
var take_picture = "alert(\"PRENDRE UNE PHOTO\");capturePhoto();";
var import_picture = "alert(\"IMPORTER UNE PHOTO\");getPhoto();";
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
/*HTML CODE FOR CONTENT*/
var view_import_content = "" +
"<div id='section_camera' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<button id='section_camera_record' onclick='" + take_picture + "'>Prendre une PHOTO</button>" +
"<button id='section_camera_import' onclick='" + import_picture + "'>IMPORTER DEPUIS PHOTO</button>" +
"</div>" +
"<div id='section_image' onclick='" + hide_cam_button + hide_mic_button + "'>" +
"<img src=# alt='french' id='pick'onclick='" + "'></br><input type='text' name='input' value='Entrez du texte ici'>" +
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
