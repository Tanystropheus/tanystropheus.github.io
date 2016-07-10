/* GLOBALE.JS - Nombre de Variables : 17 */
// *** -- VARIABLES SIMPLES -- *** 
var pass = {
    "A":0,
    "B":0,
    "C":0,
    "D":0
};//        = > ACCES AU MODE PARENT
var selected_tab_color = "rgb(251,240,165)";
var active_tab_color = "rgb(132,100,46)";
var img_size = 189;
var hgrid_max;
var wgrid_max;
var voice_max;
var hgrid_choice;
var wgrid_choice;
var voice_choice;
// *** -- VARIABLE DE SIMPLIFICATION POUR LES APPELS DE FONCTIONS -- ***
var pass_A = "pass_admin(\"A\"); reorganisation_tab(1);";
var pass_B = "pass_admin(\"B\"); reorganisation_tab(0);";
var pass_C = "pass_admin(\"C\");";
var pass_D = "pass_admin(\"D\");";
// *** -- VARIABLES DE DONNEES -- ***
var selected_tab = "";
var libimg; //=> CONTIENT LES IMAGES D'UNE SEULE CATEGORIE
var set_img; //=> CONTIENT LES SPAN CONTENANT LE CODE HTML DES IMAGES
var tab_data = {}; //==> CONTIENT LES DONNNEES D'UNE BALISE LI DU MENU DES CATEGORIES
var str_tab_user = "<li class='tab_menu' id='tab_1' name='tab_1' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li>"+
        "<li class='tab_menu' id='tab_2' name='tab_2' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li>"+
        "<li class='tab_menu' id='tab_3' name='tab_3' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li>"+
        "<li class='tab_menu' id='tab_4' name='tab_4' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li>"+
        "<li class='tab_menu' id='tab_5' name='tab_5' style='width:18%; height:100%;' onclick='show_active_tab(this, \"user\");'></li>";
var str_tab_admin = "<li class='tabA_menu' id='tabA_1' name='tabA_1' style='width:18%; height:100%;' onclick='show_active_tab(this, \"admin\");'></li>"+
        "<li class='tabA_menu' id='tabA_2' name='tabA_2' style='width:18%; height:100%;' onclick='show_active_tab(this, \"admin\");'></li>"+
        "<li class='tabA_menu' id='tabA_3' name='tabA_3' style='width:18%; height:100%;' onclick='show_active_tab(this, \"admin\");'></li>"+
        "<li class='tabA_menu' id='tabA_4' name='tabA_4' style='width:18%; height:100%;' onclick='show_active_tab(this, \"admin\");'></li>";