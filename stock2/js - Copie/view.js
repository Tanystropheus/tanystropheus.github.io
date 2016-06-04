/* NOT IMPLEMENTED AND DEBUG FUNCTION*/
var test = "alert(\"test\");";
var open_app = "show_view_app();";
var open_gallery = "show_view_gallery();";
var open_import = "show_view_import();";
var open_library = "alert(\"CLASSEUR\");";
var open_parameter = "alert(\"OUVRE LES PARAMETRES\");";
var open_learning = "alert(\"APPRENTISSAGE\");";

function show_view_app(){
    document.getElementById('header').innerHTML = view_header_user;
    document.getElementById('content').innerHTML = view_content_app;
    document.getElementById('footer').innerHTML = view_footer_app;
    show_libraries_nav(tmp_categorie);
    show_img();
    alert(document.getElementById("img/1.png").id);
    $("#img/1.png").draggable();
}
function show_view_gallery(){
    document.getElementById('header').innerHTML = view_header_admin;
    document.getElementById('content').innerHTML = view_gallery_content;
    document.getElementById('footer').innerHTML = view_gallery_footer;
}
function show_view_import(){
    document.getElementById('header').innerHTML = view_header_admin;
    document.getElementById('content').innerHTML = view_import_content;
    document.getElementById('footer').innerHTML = view_import_footer;
}
function show_view_learning(){
    document.getElementById('header').innerHTML = view_learning_header;
    document.getElementById('content').innerHTML = view_learning_content;
    document.getElementById('footer').innerHTML = view_learning_footer;
}
