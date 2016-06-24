var pass_A = "pass_admin(\"A\");";
var pass_B = "pass_admin(\"B\");";
var pass_C = "pass_admin(\"C\");";
var pass_D = "pass_admin(\"D\");";
var pass = {
    "A":0,
    "B":0,
    "C":0,
    "D":0
};
function pass_admin(code){
   pass[code] = pass[code] + 1;
   if (code === "A"){
       if (pass[code] === 3){
           pass["A"] = 0;
           pass["B"] = 0;
           pass["C"] = 0;
           pass["D"] = 0;
           alert("clear");
       }
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
    document.getElementById("mode_user").innerHTML = "";
    $("#mode_user").append("<div id='user_left' style='width:4%; height:100%;'></div><div id='user_middle' style='width:92%; height:100%;'></div><div id='user_right' style='width:4%; height:100%;'></div>");
    $("#user_left").append("<div id='pass_A' class='cheader' style='width:100%; height:8%;' onclick='" +(pass_A)+ "'></div><div class='ccontent' style='width:100%; height:72%;'></div><div id='pass_C' class='cfooter' style='width:100%; height:20%;' onclick='" +(pass_C)+ "'></div>");
    $("#user_middle").append("<div id='user_header' class='cheader' style='width:100%; height:8%;'></div><div id='user_content' class='ccontent' style='width:100%; height:72%;'></div><div id='user_footer' class='cfooter' style='width:100%; height:20%;'></div>");
    $("#user_right").append("<div id='pass_B' class='cheader' style='width:100%; height:8%;' onclick='" +(pass_B)+ "'></div><div class='ccontent' style='width:100%; height:72%;'></div><div id='pass_D' class='cfooter' style='width:100%; height:20%;' onclick='" +(pass_D)+ ";"+"'></div>");
}
function mode_admin(){
    document.getElementById("mode_admin").innerHTML = "";
    $("#mode_admin").append("<div id='admin_left' style='width:4%; height:100%;'></div><div id='admin_middle' style='width:92%; height:100%;'></div><div id='admin_right' style='width:4%; height:100%;'></div>");
    $("#admin_left").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
    $("#admin_middle").append("<div id='admin_top' class='cheader' style='width:100%; height:10%;'></div><div id='admin_header' class='cheader' style='width:100%; height:10%;'></div><div id='admin_content' class='ccontent' style='width:100%; height:72%;'></div><div id='admin_footer' class='cfooter' style='width:100%; height:8%;'></div>");
    $("#admin_right").append("<div class='cheader' style='width:100%; height:10%;'></div><div class='cheader' style='width:100%; height:10%;'></div><div class='ccontent' style='width:100%; height:72%;'></div><div class='cfooter' style='width:100%; height:8%;'></div>");
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