function set_vue(vue){
    $("#mode_user").css("visibility" , "hidden");
    $("#mode_admin").css("visibility" , "hidden");
    $("#mode_parametre").css("visibility" , "hidden");
    $("#mode_photo").css("visibility" , "hidden");
    $("#mode_statistique").css("visibility" , "hidden");
    $("#mode_popup").css("visibility" , "hidden");
    $("#mode_"+vue).css("visibility" , "visible");
}
function mode_admin(){
    $("#mode_admin").append("<div id='admin_left' style='width:4%; height:100%;'></div><div id='admin_middle' style='width:92%; height:100%;'></div><div id='admin_right' style='width:4%; height:100%;'></div>");
    $("#admin_left").append("<div class='cheader' style='width:100%; height:10%;'>A</div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#admin_middle").append("<div id='admin_top' class='cheader' style='position:relative; width:100%; height:10%;'></div><div id='admin_header' class='cheader' style='width:100%; height:10%;'></div><div id='admin_content' class='ccontent' style='width:100%; height:72%;'></div><div id='admin_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#admin_right").append("<div class='cheader' style='width:100%; height:10%;'>A</div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    document.getElementById("admin_top").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block;width:25%; height:100%;'></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"photo\")"+ "'>NOUVELLES IMAGES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"statistique\")"+ "'>STATISTIQUES</button></span>";
}

function mode_photo(){
    $("#mode_photo").append("<div id='photo_left' style='width:4%; height:100%;'></div><div id='photo_middle' style='width:92%; height:100%;'></div><div id='photo_right' style='width:4%; height:100%;'></div>");
    $("#photo_left").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#photo_middle").append("<div id='photo_header' class='cheader' style='width:100%; height:10%;'></div><div id='photo_content' class='ccontent' style='width:100%; height:82%;'></div><div id='photo_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#photo_right").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    document.getElementById("photo_header").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block;width:25%; height:100%;'></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"admin\")"+ "'>GALERIES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"statistique\")"+ "'>STATISTIQUES</button></span>";    
}

function mode_statistique(){
    $("#mode_statistique").append("<div id='statistique_left' style='width:4%; height:100%;'></div><div id='statistique_middle' style='width:92%; height:100%;'></div><div id='statistique_right' style='width:4%; height:100%;'></div>");
    $("#statistique_left").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#statistique_middle").append("<div id='statistique_header' class='cheader' style='width:100%; height:10%;'></div><div id='statistique_content' class='ccontent' style='width:100%; height:82%;'></div><div id='statistique_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#statistique_right").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    document.getElementById("statistique_header").innerHTML = "<span style='display: inline-block; width:25%; height:100%; text-align:center;'><img style='margin-top:5%; width:70%; height:70%;' src='logo.png' onclick='" +"set_vue(\"user\")"+ "'/></span><span style='display: inline-block;width:25%; height:100%;'></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"admin\")"+ "'>GALERIES</button></span><span style='display: inline-block; width:25%; height:100%; text-align:center;'><button style='margin-top:5%; width:70%; height:70%;' onclick='" +"set_vue(\"photo\")"+ "'>NOUVELLES IMAGES</button></span>";    
}