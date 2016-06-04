/*DEBUG*/
var tmp_categorie = { "Verbes" : 1, "Animaux" : 2};
var tmp_images = { "img/1.png" : 1, "img/2.png" : 2, "img/3.png" : 1, "img/4.png" : 2,"img/5.png" : 1, "img/6.png" : 2,"img/7.png" : 1, "img/8.png" : 2,"img/9.png" : 1, "img/10.png" : 2,
     "img/11.png" : 1, "img/12.png" : 2, "img/13.png" : 1, "img/14.png" : 2,"img/15.png" : 1, "img/16.png" : 2,"img/17.png" : 1, "img/18.png" : 2,"img/19.png" : 1, "img/20.png" : 2,
 "img/21.png" : 1, "img/22.png" : 2, "img/23.png" : 1, "img/24.png" : 2,"img/25.png" : 1, "img/26.png" : 2};



function show_img()
{
    var nb_img = 0; /*Nombre d'images*/
    var nb_col = 0; /*Nombre de colonnes*/
    var html_str = ""; /*chaine contenant du code html*/
    for (var img in tmp_images){
        if (tmp_images.hasOwnProperty(img))
            nb_img++; /*On compte les images*/
        if (nb_img === 3){
            nb_img = 0; 
            nb_col++;
        } /*Si on a 3 images, on ajoute une colone*/
    }
    if (nb_img !== 0)
        nb_col++; /*On ajoute une colonne si ce n'est pas fait pour les 1 ou 2 dernières images*/
    nb_img = 0;
    if (nb_col < 8)
        nb_col = 8;
    for (var i = 1; i <= nb_col; i++){
         html_str = html_str + "<ul id='col_"+ i +"'><li id='img_"+(++nb_img)+"'><li id='img_"+(++nb_img)+"'></li><li id='img_"+(++nb_img)+"'></li></ul>";
    } /*Pour chaque image, ajoute un élément dans une liste*/
    document.getElementById("pictures_field").innerHTML = html_str; /*Ajoute le code html dans la page*/
    nb_img = 0;
    for (var img in tmp_images){
        if (tmp_images.hasOwnProperty(img))
            document.getElementById("img_"+(++nb_img)).innerHTML = "<span class='img_frame' ondrop='drop(event);' ondragover='allowdrop(event);'><span><img id='"+img+"' src='"+img+"' draggable='true' ondragstart='drag(event);'/></span></span>";       
    } /*Pour chaque image, ajoute l'image à la liste*/
    nb_img++;
    for (var i = nb_img; i <= nb_col*3; i++){
        document.getElementById("img_"+i).innerHTML = "<span class='img_frame' ondrop='drop(event);' ondragover='allowdrop(event);'></span>";
    }
    $(".img_frame span").draggable({helper: "clone"});
}

function add_one(){
    alert($("#voice_image").children("li").children("span").children("img").length);
    if($("#voice_image").children("li").length < 10)
    {
        $("#voice_image").append("<li><span class='img_frame' ondrop='drop(event); add_one();' ondragover='allowdrop(event);'></span></li>");
    }
}

/*TODO*/
var selected_tab = "";
var name_loop = "show_libraries_nav(tmp_categorie);";
var mr = "moove_r(\"tab\", \"#libraries_field\",\"li\"); alert_first();";
var ml = "moove_l(\"tab\", \"#libraries_field\",\"li\"); alert_first();";
var mrp ="moove_r(\"col\", \"#pictures_field\",\"ul\"); alert_t();";
var mlp = "moove_l(\"col\", \"#pictures_field\",\"ul\"); alert_t();";
/*VALIDATE*/
var tab_active = "";
function show_active_tab(id)
{
    selected_tab = id.getAttribute("name");  
    nb = $("#libraries_field").children("li").length;
    for (i = 1; i <= nb; i++)
    {
        if (selected_tab === $("#tab_"+i).attr("name"))
            document.getElementById("tab_"+i).style.backgroundColor = "steelblue";
        else
            document.getElementById("tab_"+i).style.backgroundColor = "darkslateblue";
    }



}
/* VALIDATE FUNCTION */
function show_libraries_nav(item)
{
var html_str = ""; /*chaine contenant du code html*/
var count = 0; /*s'assure que l'indexation des éléments soit croissant et sans saut*/
for(var i in item){
    html_str = html_str + "<li id='tab_"+ (++count) +"' name='"+ i +"' onclick='show_active_tab(this);'>" + i + "</li>";
}; /*Pour chaque élément, ajoute un élément nommé dans une liste*/
 document.getElementById("libraries_field").innerHTML = html_str; /*Ajoute le code html dans la page*/
};
/* VALIDATE HTML */
var view_content_app = "" +
/*CONTENT APP*/
"<div id='content_app'>" +
/*LEFT*/
"<div id='content_left'>" +
"<button id='libraries_left' onclick='" +/*here all function*/ ml +"'><" +
"</button>" +
"<button id='pictures_left' onclick='" +/*here all function*/ mlp +"'><" +
"</button>" +
"</div>" +
/*MIDDLE*/
"<div id='content_middle'>" +
"<ul id='libraries_field'>" +
"</ul>" +
"<span id='pictures_field'>" +
"</span>" +
"</div>" +
/*RIGHT*/
"<div id='content_right'>" +
"<button id='libraries_right' onclick='" +/*here all function*/ mr +"'>>" +
"</button>" +
"<button id='pictures_right' onclick='" +/*here all function*/ mrp +"'>>" +
"</button>" +
"</div>"+
"</div>";