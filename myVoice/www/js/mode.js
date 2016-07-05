var pass_A = "pass_admin(\"A\"); reorganisation_tab(1);";
var pass_B = "pass_admin(\"B\"); reorganisation_tab(0);";
var pass_C = "pass_admin(\"C\");";
var pass_D = "pass_admin(\"D\");";
function pass_admin(code){
   pass[code] = pass[code] + 1;
   if (code === "A"){
       if (pass[code] === 3){
           pass["A"] = 0;
           pass["B"] = 0;
           pass["C"] = 0;
           pass["D"] = 0;
           $("#pass_A h1").css("color", "red");
       }
       else
           $("#pass_A h1").css("color", "rgb(132,100,46)");
   }
   if (code === "D") {
       if (pass["A"] === 1 && pass["B"] === 1 && pass["C"] === 1 &&pass["D"] === 1){
           pass["A"] = 0;
           pass["B"] = 0;
           pass["C"] = 0;
           pass["D"] = 0;
           set_vue("admin");
       }
   }
}
function set_vue(vue){
    $("#mode_user").css("visibility" , "hidden");
    $("#mode_admin").css("visibility" , "hidden");
    $("#mode_parametre").css("visibility" , "hidden");
    $("#mode_photo").css("visibility" , "hidden");
    $("#mode_statistique").css("visibility" , "hidden");
    $("#mode_popup").css("visibility" , "hidden");
    $("#mode_"+vue).css("visibility" , "visible");
}
function mode_user(){
    var html_str = "<div id='t' style='width:100%;'>";
    var mg;
    document.getElementById("mode_user").innerHTML = "";
    $("#mode_user").append("<div class='bg_top' id='user_header' style='width:100%;'></div><div id='user_content' style='width:100%;'></div>");
    $("#user_header").css("height", "8%");
    $("#user_content").css("height", "92%");
    $("#user_content").append("<div class='bg_top' id='user_galerie' style='width:100%;'></div><div class='bg_bot' id='user_voice' style='width:100%; text-align:center'></div>");
    $("#user_galerie").height(jQuery("#user_content").height() - 205);
    $("#user_voice").height(205);
    $("#user_header").append("<ul id='libraries_field_user' ><li class='tab_menu' id='pass_A' style='width:1.5%; height:100%;' onclick='" +(pass_A)+ "'><h1><</h1></li><li class='tab_menu' id='tab_1' name='tab_1' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li><li class='tab_menu' id='tab_2' name='tab_2' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li><li class='tab_menu' id='tab_3' name='tab_3' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li><li class='tab_menu' id='tab_4' name='tab_4' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li><li class='tab_menu' id='tab_5' name='tab_5' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li><li class='tab_menu' id='pass_B' style='width:1.5%; height:100%;' onclick='" +(pass_B)+ "'><h1>></h1></li></ul>");
    mg = Math.floor(jQuery(window).width() * 0.5 / 100);
    $("#libraries_field_user li").css("margin", mg);
    voice_max = Math.floor(jQuery("#user_voice").width() / 205) - 1;
    mg = (jQuery("#user_voice").width() - (voice_max * 205)) / 2 - 1;
    for (var i = 0; i < voice_max + 2; i++){
        if (i === 0)
            html_str = html_str + "<span style='width:" + mg + "px; height:205px;' onclick='" +(pass_C)+ "'></span>";
        else if (i === voice_max + 2 - 1)
            html_str = html_str + "<span style='width:" + mg + "px; height:205px;' onclick='" +(pass_D)+ "'></span>";
        else
            html_str = html_str + "<span style='width:205px; height:205px;'></span>";
    }
    html_str = html_str + "</div>";
    $("#user_voice").append(html_str);
    get_lib();
}
function mode_admin(){
    document.getElementById("mode_admin").innerHTML = "";
    $("#mode_admin").append("<div id='admin_left' style='width:4%; height:100%;'></div><div id='admin_middle' style='width:92%; height:100%;'></div><div id='admin_right' style='width:4%; height:100%;'></div>");
    $("#admin_left").append("<div class='ctop' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;' onclick='reorganisation_tab_admin(1);'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#admin_middle").append("<div id='admin_top' class='ctop' style='width:100%; height:10%;'></div><div id='admin_header' class='cheader' style='width:100%; height:10%;'></div><div id='admin_content' class='ccontent' style='width:100%; height:72%;'></div><div id='admin_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#admin_right").append("<div class='ctop' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;' onclick='reorganisation_tab_admin(0);'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    document.getElementById("admin_top").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block;width:25%; height:100%;'></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"photo\")"+ "'>NOUVELLES IMAGES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"statistique\")"+ "'>STATISTIQUES</button></span>";
}
function mode_photo(){
    document.getElementById("mode_photo").innerHTML = "";
    $("#mode_photo").append("<div id='photo_left' style='width:4%; height:100%;'></div><div id='photo_middle' style='width:92%; height:100%;'></div><div id='photo_right' style='width:4%; height:100%;'></div>");
    $("#photo_left").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#photo_middle").append("<div id='photo_header' class='cheader' style='width:100%; height:10%;'></div><div id='photo_content' class='ccontent' style='width:100%; height:82%;'></div><div id='photo_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#photo_right").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    document.getElementById("photo_header").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block;width:25%; height:100%;'></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"admin\")"+ "'>GALERIES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"statistique\")"+ "'>STATISTIQUES</button></span>";    
}
function mode_statistique(){
    document.getElementById("mode_statistique").innerHTML = "";
    $("#mode_statistique").append("<div id='statistique_left' style='width:4%; height:100%;'></div><div id='statistique_middle' style='width:92%; height:100%;'></div><div id='statistique_right' style='width:4%; height:100%;'></div>");
    $("#statistique_left").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#statistique_middle").append("<div id='statistique_header' class='cheader' style='width:100%; height:10%;'></div><div id='statistique_content' class='ccontent' style='width:100%; height:82%;'></div><div id='statistique_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#statistique_right").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    document.getElementById("statistique_header").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block;width:25%; height:100%;'></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"admin\")"+ "'>GALERIES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"photo\")"+ "'>NOUVELLES IMAGES</button></span>";    
}