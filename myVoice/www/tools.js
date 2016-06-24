function defilement_droite(base, id, type){
    var first = "#" + base + "_0";
    var last = $(id).children(type).length - 1;
    last = (last < 0) ? 0 : last;
    last =  "#" + base + "_" + last;
    $(last).after($(first));
}
function defilement_gauche(base, id, type){
    var first = "#" + base + "_0";
    var last = $(id).children(type).length - 1;
    last = (last < 0) ? 0 : last;
    last =  "#" + base + "_" + last;
    $(first).before($(last));
}
function reorganisation_tab(direction)
{
    if (direction === 0)
        defilement_droite('tab', '#libraries_field_user','li');
    else
        defilement_gauche('tab', '#libraries_field_user','li');
    var str = "";
    var name;
    var nb = $("#libraries_field_user").children("li").length;
    for (i = 0; i <= nb - 1; i++)
    {
        str = document.getElementById("libraries_field_user").childNodes[i].id;
        name = $("#"+str).attr("name");
        document.getElementById(str).id = "tmp_tab_" + i;
        name = $("#tmp_tab_" + i).attr("name");
    }
    for (i = 0; i <= nb - 1; i++)
    {
        document.getElementById("tmp_tab_"+i).id = "tab_" + i;
        name = $("#tab_" + i).attr("name");
    }
}
function reorganisation_tab_admin(direction)
{
    if (direction === 0)
        defilement_droite('taba', '#libraries_field_admin','li');
    else
        defilement_gauche('taba', '#libraries_field_admin','li');
    var str = "";
    var name;
    var nb = $("#libraries_field_admin").children("li").length;
    for (i = 0; i <= nb - 1; i++)
    {
        str = document.getElementById("libraries_field_admin").childNodes[i].id;
        name = $("#"+str).attr("name");
        document.getElementById(str).id = "tmp_taba_" + i;
        name = $("#tmp_taba_" + i).attr("name");
    }
    for (i = 0; i <= nb - 1; i++)
    {
        document.getElementById("tmp_taba_"+i).id = "taba_" + i;
        name = $("#taba_" + i).attr("name");
    }
}
function show_libraries_nav(item){
    var html_str_user = ""; /*chaine contenant du code html*/
    var html_str_admin = "<li id='taba_0' name='bdd_images' onclick='show_active_tab(this);'><h1>Galerie</h1></li>"; 
    var nb = 0;
    for(var i in item){
        html_str_user = html_str_user + "<li id='tab_"+ nb +"' name='"+ item[i].libtitle +"' onclick='show_active_tab(this);'><h1>" + item[i].libtitle + "</h1></li>";
        html_str_admin = html_str_admin + "<li id='taba_"+ (nb + 1) +"' name='"+ item[i].libtitle +"' onclick='show_active_tab(this);'><h1>" + item[i].libtitle + "</h1></li>";
        nb++;
    }; /*Pour chaque élément, ajoute un élément nommé dans une liste*/
    document.getElementById("user_header").innerHTML = "<ul id='libraries_field_user'></ul>";
    document.getElementById("libraries_field_user").innerHTML = html_str_user;
    document.getElementById("admin_header").innerHTML = "<ul id='libraries_field_admin'></ul>";
    document.getElementById("libraries_field_admin").innerHTML = html_str_admin;
    for(var i in item){
        $("#tab_"+i).data('categorie', item[i]);
    }
};