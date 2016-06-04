/* NOT IMPLEMENTED AND DEBUG FUNCTION*/
var test = "alert(\"test\");";
var open_app = "show_view_app();";
var a;
var b;

function show_view_app(){
    document.getElementById('header').innerHTML = view_header_user;
    document.getElementById('content').innerHTML = view_content_app;
    document.getElementById('footer').innerHTML = view_footer_app;
    show_libraries_nav(tmp_categorie);

}