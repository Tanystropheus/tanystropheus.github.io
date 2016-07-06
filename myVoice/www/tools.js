var data = {};

function reorganisation_tab(direction){
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
        $("#"+tmp[all].id).data('categorie', data["#"+tmp[all].id]);
        n++;
        if (n === 6){
            $("#libraries_field_user").append(str[1]);
            n++;
        }
    }
}
function show_active_tab(id, who){
    var id_tab = who === "user" ? "#tab_" : "#taba_";
    selected_tab = $("#"+id.getAttribute("id")).data("categorie");
    nb = $("#libraries_field_"+who).children("li").length;
    for (i = 1; i <= nb; i++)
    {
        if (selected_tab.libtitle === $(id_tab+i).attr("name")){
            $(id_tab+i).css("background-color", active_tab_color);
            $(id_tab+i+" h1").css("color", selected_tab_color);
        }
        else{
            $(id_tab+i).css("background-color", selected_tab_color);
            $(id_tab+i+" h1").css("color", active_tab_color);
        }
    }
    select_grid(selected_tab);
    set_grid(1,"user");
};
function get_lib(){
    var nb = 1;
    var mg;
    for(var i in window.appData.library){
        if (nb < 6){
            $("#tab_"+nb).attr("name", window.appData.library[i].libtitle);
            $("#tab_"+nb).append("<h1>" + window.appData.library[i].libtitle + "</h1>");
        }
        else{
            $("#libraries_field_user").append("<li class='tab_menu' id='tab_" + nb + "' name='" + window.appData.library[i].libtitle + "' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'><h1>" + window.appData.library[i].libtitle + "</h1></li>");
        }
        nb++;
    }
    mg = Math.floor(jQuery(window).width() * 0.5 / 100);
    $("#libraries_field_user li").css("margin", mg);
    nb = 1;
        for(var i in window.appData.library){
        $("#tab_"+nb).data('categorie', window.appData.library[i]);
        data["#tab_"+nb] = window.appData.library[i];
        nb++;
    }
};

function get_img(lib){
    libimg = [];
    var i = 0;
    for (var id in window.appData.libElem){
        if (window.appData.libElem[id].libraryid === lib.libraryid){
            libimg[i] = window.appData.libElem[id].elemid;
            i++;
        }       
    }
    i = 0;
    for (var id in window.appData.elements){
        if (window.appData.elements[id].elemid === libimg[i]){
            libimg[i] = window.appData.elements[id];
            i++;
        }
    }
}