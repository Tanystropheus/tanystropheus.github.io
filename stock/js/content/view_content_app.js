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
    if(tmp_categorie[selected_tab] === ""){
     show_img(selected_tab);
    }
    else{
      document.getElementById("pictures_field").innerHTML =  "";
      document.getElementById("pictures_field").innerHTML = tmp_categorie[selected_tab];
    };
        $(".img_frame span").draggable({helper: "clone", cursorAt: { top:50, left:100 }});
        $(".img_frame").droppable({
  drop: function(event, ui) {
  var draggableId = ui.draggable.children("img").attr("id");
  var droppableId = $(this).attr("id");
  var c = document.getElementById(droppableId).id;
  var d = document.getElementById(draggableId).parentElement.parentElement.id;
  a = document.getElementById(droppableId).childNodes[0];
  b = document.getElementById(draggableId).parentElement;
  document.getElementById(c).innerHTML = "";
  document.getElementById(c).appendChild(b);
  document.getElementById(d).innerHTML = "";
  document.getElementById(d).appendChild(a);
  tmp_categorie[selected_tab] = document.getElementById("pictures_field").innerHTML;
  }
});
};
        
/* VALIDATE FUNCTION */
function show_libraries_nav(item)
{
var html_str = ""; /*chaine contenant du code html*/
var count = 0; /*s'assure que l'indexation des éléments soit croissant et sans saut*/
for(var i in item){
    html_str = html_str + "<li id='tab_"+ (++count) +"' name='"+ i +"' onclick='show_active_tab(this);'><h1>" + i + "</h1></li>";
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