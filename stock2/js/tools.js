var clear_view = "destroy_view();";
function destroy_view(){
    document.getElementById('header').innerHTML = "";
    document.getElementById('content').innerHTML = "";
    document.getElementById('footer').innerHTML = "";
}

var id_name_item = {"img/carre1.png" : 8, "img/carre2.jpg" : 10, "img/carre3.png" : 2, "img/carre4.png" : 1,  "img/carre5.jpg" : 4, "img/carre6.jpg" : 5, "img/carre7.jpg" : 6, "img/carre8.jpg" : 7};
function show_id_name_loop(id,  item)
{
var str = "";
for(var i in item)
{
    str = str + "<li id='tab_"+ item[i] +"' onclick='show_active_tab(\"tab_"+ item[i] +"\");'>" + item[i] + "</li>";
}
 document.getElementById(id).innerHTML = str;
};

function alert_first(nb)
{
    var str = "";
    var name;
    nb = $("#libraries_field").children("li").length;
    for (i = 1; i <= nb; i++)
    {
        str = $("#libraries_field").children("li:nth-child("+ i +")").attr("id");
        name = $("#libraries_field").children("li:nth-child("+ i +")").attr("name");
        console.log(name);
        document.getElementById(str).id = "tmp_tab_" + i;
        name = $("#tmp_tab_" + i).attr("name");
        console.log(name);
    }
    for (i = 1; i <= nb; i++)
    {
        document.getElementById("tmp_tab_"+i).id = "tab_" + i;
         name = $("#libraries_field").children("li:nth-child("+ i +")").attr("name");
        console.log(name);
    }
}

function moove_r(base, id, type){
    var first = "#" + base + "_1";
    var last = "#" + base + "_" + $(id).children(type).length;
    $(last).after($(first));
}

function moove_l(base, id, type){
var first = "#" + base + "_1";
var last = "#" + base + "_" + $(id).children(type).length;
$(first).before($(last));
}


function alert_t(nb)
{
    nb = $("#pictures_field").children("ul").length;
    for (i = 1; i <= nb; i++)
    {
        str = $("#pictures_field").children("ul:nth-child("+ i +")").attr("id");
        console.log(str);
        document.getElementById(str).id = "tmp_col_" + i;
        str = $("#pictures_field").children("ul:nth-child("+ i +")").attr("id");
        console.log(str);
    }
    for (i = 1; i <= nb; i++)
    {
        document.getElementById("tmp_col_"+i).id = "col_" + i;
    }
}

