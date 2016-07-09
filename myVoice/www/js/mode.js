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
    mg = (jQuery("#user_voice").width() - (voice_choice * 205)) / 2 - 1;
    for (var i = 0; i < voice_choice + 2; i++){
        if (i === 0)
            html_str = html_str + "<span style='width:" + mg + "px; height:205px;' onclick='" +(pass_C)+ "'></span>";
        else if (i === voice_choice + 2 - 1)
            html_str = html_str + "<span style='width:" + mg + "px; height:205px;' onclick='" +(pass_D)+ "'></span>";
        else {
            html_str = html_str + "<span id='voice_drop_"+ (i -1) +"' class='voice_drop' style='width:205px; height:205px;'><span id='voice_drag_"+ (i -1) +"' class='voice_drag' style='width:189px; height:189px; border:0px solid black' onclick='$(this).html(\"\")'></span></span>";
        }
    }
    html_str = html_str + "</div>";
    $("#user_voice").append(html_str);
    $(".voice_drop span").droppable({drop:dd});
    get_lib();
}
function mode_admin(){
    var html_str = "<div id='te' style='width:100%;'>";
    var mg;
    document.getElementById("mode_admin").innerHTML = "";
    $("#mode_admin").append("<div class='bg_ban' id='admin_top' style='width:100%;'></div><div class='bg_top' id='admin_header' style='width:100%;'></div><div id='admin_content' style='width:100%;'></div>");
    $("#admin_top").css("height", "12%");
    $("#admin_header").css("height", "8%");
    $("#admin_content").css("height", "80%");
    $("#admin_content").append("<div class='bg_top' id='admin_galerie' style='width:100%;'></div><div class='bg_bot' id='admin_voice' style='width:100%; text-align:center'></div>");
    $("#admin_galerie").height(jQuery("#admin_content").height() - 80);
    $("#admin_voice").height(80);
    $("#admin_header").append("<ul id='libraries_field_admin'><li style='width:9%; height:100%;'><h1>!</h1></li><li style='width:1.5%; height:100%;'><h1><</h1></li><li style='width:1.5%; height:100%;'><h1>></h1></li><li style='width:9%; height:100%;'><h1>+</h1></li></ul>");
    mg = Math.floor(jQuery(window).width() * 0.5 / 100);
    $("#libraries_field_admin li").css("margin", mg);
    voice_max = Math.floor(jQuery("#admin_voice").width() / 205) - 1;
    mg = (jQuery("#admin_voice").width() - (voice_max * 205)) / 2 - 1;
    for (var i = 0; i < voice_max + 2; i++){
        if (i === 0)
            html_str = html_str + "<span style='width:" + mg + "px; height:80px;'><button class='bg_bot'class='bg_bot' style='width:100%; height:50%;' onclick='voicen(); alert(voice_choice); mode_user();'>+</button><button class='bg_ban'class='bg_bot' style='width:100%; height:50%;' onclick='" +(voice_choice--)+ "; mode_user();'>-</button></span>";
        else if (i === voice_max + 2 - 1)
            html_str = html_str + "<span style='width:" + mg + "px; height:80px;'></span>";
        else {
            html_str = html_str + "<span style='width:205px; height:80px;'><span id='voice_selec_"+ (i -1) +"' style='width:90%; height:90%; border: 1px solid black;'></span></span>";
        }
    }
    html_str = html_str + "</div>";
    $("#admin_voice").append(html_str);
    document.getElementById("admin_top").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button class='bg_ban'class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"photo\")"+ "'>NOUVELLES IMAGES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"statistique\")"+ "'>STATISTIQUES</button></span><span style='display: inline-block;width:25%; height:100%;'><input type='text' id='bg_color_top' /><input type='text' id='bg_color_bot' /></span>";
    $("#bg_color_top").spectrum({});
    $("#bg_color_bot").spectrum({});
    $('#bg_color_top').on('change',function(e){$(".bg_top").css("background-color", $("#bg_color_top").spectrum("get").toRgbString());});
    $('#bg_color_bot').on('change',function(e){$(".bg_bot").css("background-color", $("#bg_color_bot").spectrum("get").toRgbString());});
}
function mode_photo(){
    document.getElementById("mode_photo").innerHTML = "";
    $("#mode_photo").append("<div class='bg_ban' id='photo_top' style='width:100%;'></div><div class='bg_top' id='photo_header' style='width:100%;'></div><div class='bg_top' id='photo_content' style='width:100%;'></div>");
    $("#photo_top").css("height", "12%");
    $("#photo_header").css("height", "8%");
    $("#photo_content").css("height", "80%");
    $("#photo_content").append("<div style='width:28%; height:100%;'><div id='photo_grid_A' style='width:100%; height:80%;'></div><div id='photo_grid_B' style='width:100%; height:20%;'></div></div><div style='width:44%; height:100%;'><div id='photo_grid_C' style='width:100%; height:80%;'></div><div id='photo_grid_D' style='width:100%; height:20%;'></div></div><div style='width:28%; height:100%;'><div id='photo_grid_E' style='width:100%; height:80%;'></div><div id='photo_grid_F' style='width:100%; height:20%;'></div></div>");
    $("#photo_grid_B").append("<div><img src='croix.png' /></div>");
    $("#photo_grid_F").append("<div><img src='ok.png' onclick='insertBdd();'/></div>");
    $("#photo_grid_C").append("<div><img src='capture.png' onclick='popup_import()'/></div>");
    $("#photo_grid_E").append("<div><img src='sound.png' onclick='captureAudio()' /></div>");
    $("#photo_grid_D").append("<input type='text' id='name' style='width:100%; height:40%;'><button type='submit' onclick='createName()' style='width:100%; height:40%;'>");
    $("#photo_header").append("<ul id='libraries_field_photo'><li style='width:9%; height:100%;'><h1>!</h1></li><li style='width:1.5%; height:100%;'><h1><</h1></li><li style='width:1.5%; height:100%;'><h1>></h1></li><li style='width:9%; height:100%;'><h1>+</h1></li></ul>");
    document.getElementById("photo_top").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"admin\")"+ "'>GALERIE</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"statistique\")"+ "'>STATISTIQUES</button></span><span style='display: inline-block;width:25%; height:100%;'></span>";
}
function mode_statistique(){
    document.getElementById("mode_statistique").innerHTML = "";
    $("#mode_statistique").append("<div class='bg_ban' id='statistique_top' style='width:100%;'></div><div class='bg_top' id='statistique_header' style='width:100%;'></div><div id='statistique_content' style='width:100%;'></div>");
    $("#statistique_top").css("height", "12%");
    $("#statistique_content").css("height", "88%");
    $("#statistique_content").append("<div class='bg_top' id='canvas_stat' style='width:100%; height:100%;'></div>");
    document.getElementById("statistique_top").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"admin\")"+ "'>GALERIE</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"photo\")"+ "'>NOUVELLES IMAGES</button></span><span style='display: inline-block;width:25%; height:100%;'></span>";
}
function popup_import(){
    $("#mode_popup").html("");
    $("#mode_popup").css("visibility" , "visible");
    $("#mode_popup").append("<div style='width:100%; height:45%;'><img style='width:25px; height:25px; float:right;' src='Q.png' onclick='clear_popup();'/></div><div id='alert_photo' style='width:100%; height:10%;'></div><div style='width:100%; height:45%;'></div>");
    $("#alert_photo").append("<div style='width:20%; height:100%;'></div><div style='width:20%; height:100%;'><button style='width:100%; height:100%;' onclick='capturePhoto()'>CAPTURE</button></div><div style='width:20%; height:100%;'></div><div style='width:20%; height:100%;'><button style='width:100%; height:100%;' onclick='getPhoto()'>IMPORT</button></div><div style='width:20%; height:100%;'></div>");
}
function voicen(){
    if (voice_choice <= voice_max)
        voice_choice++;
}

function clear_popup(){
    $("#mode_popup").html("");
    $("#mode_popup").css("visibility" , "hidden");
}