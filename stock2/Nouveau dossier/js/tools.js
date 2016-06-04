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
    str = str + "<li id='menu_"+ item[i] +"'>" + item[i] + "</li>";
}
 document.getElementById(id).innerHTML = str;
};

function alert_first(nb)
{
    var str = "";
    nb = $("#libraries_select").children("li").length;
    for (i = 1; i <= nb; i++)
    {
        str = $("#libraries_select").children("li:nth-child("+ i +")").attr("id");
        console.log(str);
        document.getElementById(str).id = "tmp_menu_" + i;
        str = $("#libraries_select").children("li:nth-child("+ i +")").attr("id");
        console.log(str);
    }
    for (i = 1; i <= nb; i++)
    {
        document.getElementById("tmp_menu_"+i).id = "menu_" + i;
    }
}

function moove_r(){
    $('#menu_6').after($('#menu_1'));
    alert_first();
}

function moove_l(){
$('#menu_1').before($('#menu_6'));
alert_first();
}