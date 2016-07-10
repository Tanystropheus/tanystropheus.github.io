function reorganisation_tab(direction)
{
    var t = [];
    var tmp = [];
    var n = 0;
    var str = [];
    for(var i = 0; i < $("#libraries_field_user").children("li").length; i++){
        if($("#libraries_field_user").children("li")[i].id !== "pass_A" && $("#libraries_field_user").children("li")[i].id !== "pass_B"){
            t[n] = $("#libraries_field_user").children("li")[i];
            n++;
        }
    }
    str[0] = $("#libraries_field_user").children("li")[0];
    str[1] = $("#libraries_field_user").children("li")[6];
    $(".tab_menu").remove();
    tmp[0] = t[t.length - 1];
    n = 1;
    for (var i = 0; i < t.length - 1; i++){
    tmp[n] = t[i];
       n++;
    }
    $("#libraries_field_user").append(str[0]);
    n = 1;
    for (var all in tmp){
        $("#libraries_field_user").append(tmp[all]);
        $("#"+tmp[all].id).data('categorie', tab_data["#"+tmp[all].id]);
        n++;
        if (n === 6){
            $("#libraries_field_user").append(str[1]);
            n++;
        }
    }
}
function show_active_tab(id, who)
{
    var id_tab = who === "user" ? "#tab_" : "#taba_";
    selected_tab = $("#"+id.getAttribute("id")).data("categorie");
    nb = $("#libraries_field_"+who).children("li").length;
    for (i = 1; i <= nb; i++)
    {
        if (selected_tab.libtitle === $(id_tab+i).attr("name")){
            $(id_tab+i).css("background-color", active_tab_color);
            $(id_tab+i+" h1").css("color", selected_tab_color);
        }
        else
        {
            $(id_tab+i).css("background-color", selected_tab_color);
            $(id_tab+i+" h1").css("color", active_tab_color);
        }
    }
    select_grid(selected_tab);
    set_grid(1,"user");
    for (var i in window.appData.library){
        var name = "."+window.appData.library[i].libtitle+"_drag";
        $(name).draggable({helper: "clone", cursorAt: { top:50, left:100 }});
        var name = "."+window.appData.library[i].libtitle+"_drop";
        $(name+" span").droppable({drop:voice_drop});
    }
};
function voice_drop(event, ui){
    var index_drag = $(ui.draggable).attr("id").substr(5,1);
    var a = $(ui.draggable).attr("id").substr(7);
    var index_drop = $(this).attr("id").substr(5,1);
    var img_drag = $(ui.draggable).html();
    var img_drop = $(this).html();
    var tmp;
    if (a === $(this).attr("id").substr(7)){
    tmp = set_img[index_drag];
    set_img[index_drag] = set_img[index_drop];
    set_img[index_drop] = tmp;
    $(ui.draggable).html("");
    $(this).html("");
    $(ui.draggable).html(img_drop);
    $(this).html(img_drag);
    localStorage.setItem(a, JSON.stringify(set_img));
    }
    else{
      var n = 0;
    var tt = "<img src='"+$(ui.draggable).children("img").attr("src")+"' style='height:189px; width:189px' >";
    for (var i = 0; i < voice_choice; i++){
        if($("#voice_drag_"+i).children("img").attr("src") === $(ui.draggable).children("img").attr("src")){
            n++;
        }
    }
    if (n === 0)
        $(this).html(tt);
    }
}