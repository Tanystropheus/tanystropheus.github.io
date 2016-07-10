/* GRID.JS - Nombre de Fonctions : 4 */
function get_lib(){
    var nb = 1;
    var mg;
    for(var i in window.appData.library){
		if(window.appData.library[i].color) 
			$("#tab_"+nb).css("background-color", window.appData.library[i].color);
        if (nb < 6){
            $("#tab_"+nb).attr("name", window.appData.library[i].libtitle);
            $("#tab_"+nb).append("<h1>" + window.appData.library[i].libtitle + "</h1>");
        }
        else{
            $("#libraries_field_user").append("<li class='tab_menu' id='tab_" + nb + "' name='" + window.appData.library[i].libtitle +
            "' style='width:18%; height:100%;background-color:"+ window.appData.library[i].color +"' onclick='show_active_tab(this, \"user\");'><h1>" + window.appData.library[i].libtitle + "</h1></li>");
        }
        window.libChecbox += "<label for='checkbox_"+window.appData.library[i].libraryid +"' class='ui-hidden-accessible'>checkbox_"+window.appData.library[i].libtitle +"</label><input type='checkbox' name='checkbox_"+window.appData.library[i].libtitle + "' id='checkbox_"+window.appData.library[i].libraryid +"' value='"+window.appData.library[i].libraryid +"' data-mini='true'>";
        nb++;
    }
    mg = Math.floor(jQuery(window).width() * 0.5 / 100);
    $("#libraries_field_user li").css("margin", mg);
    nb = 1;
        for(var i in window.appData.library){
        $("#tab_"+nb).data('categorie', window.appData.library[i]);
        tab_data["#tab_"+nb] = window.appData.library[i];
        nb++;
    }
    $('.tabA_menu').on("click", function(e){
		openLibPopup(e);
		}
	);
};//                             ==>     RECUPERE LES DONNES ASSOCIE A CHAQUE LI DU MENU
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
}//                             ==>     RECUPERE DEPUIS LA CATEGORIE, LES IMAGES, PUIS, LES STOCKENT DANS LIBIMG
function select_grid(library){
    get_img(library);
    var img_text;
    if (localStorage.getItem(library.libtitle)){
        set_img = JSON.parse(localStorage.getItem(library.libtitle));
    }
    else{
        set_img = [];
    for (var i = 0; i < libimg.length; i++){
        for (var id in window.appData.text){
            if (window.appData.text[id].textid === libimg[i].textid)
                img_text = window.appData.text[id].text;
        }
        set_img[i] = "<span id='drop_"+i+"_"+library.libtitle+"' style='height:189px; width:189px;' class='"+library.libtitle+"_drop"+"'>"+
                    "<span id='drag_"+i+"_"+library.libtitle+"' style='height:189px; width:189px' class='"+library.libtitle+"_drag"+"' onclick='tt(this)'>"+
                    "<img style='height:100%; width:100%' src='"+libimg[i].elemurl+"'/><p>"+img_text+
                    "</p></span>"+
                    "</span>";
    }
    localStorage.setItem(library.libtitle, JSON.stringify(set_img));
    }
}//                             ==>     PERMET DE CREER OU DE SELECTIONNER LA BONNE GRILLE D'IMAGE DANS UN ONGLET GRACE AU LOCALSTORAGE
function set_grid(mode, where){
    var h;
    var w;
    var col = 0;
    var row = 0;
    var html_str = "";
    $("#user_galerie").html("<div id='user_gr' style='height:100%;'></div>");
    h = Math.floor($("#"+where+"_galerie").height() * (100 / hgrid_choice - 2) / 100);
    w = Math.floor($("#"+where+"_galerie").width() * (100 / wgrid_choice - 2) / 100);
    for (var irow = 0; irow < set_img.length; irow){
        html_str = "<ul id='col_"+ col +"' style='height:100%; width:" + w + "px;float:left;'></ul>";
        $("#"+where+"_galerie").append(html_str);
        html_str = "";
        for (var i = 0; i < hgrid_choice; i++){
            html_str = html_str + "<li style='height:"+h+"px; width:100%; text-align:center;' id='row_"+ row +"'></li>";
            row++;
            irow++;
        }
        $("#col_"+col).append(html_str);
        col++;
    }
    for (var i  = 0; i < wgrid_choice * hgrid_choice; i++){
        $("#row_"+i).append(set_img[i]);
    }
    for (var i = wgrid_choice; i < $("#user_galerie").children("ul").length; i++){
        $("#col_"+i).css("width", 0);
        $("#col_"+i).css("height", 0);
        $("#col_"+i).css("visibility", "hidden");
    }
    $("#user_galerie").append("<div id='user_gl' style='height:100%;'></div>");
    $("#user_gr").width(Math.floor(jQuery("#user_content").width() - w * (wgrid_choice)) / 2);
    $("#user_gl").width(Math.floor(jQuery("#user_content").width() - w * (wgrid_choice)) / 2);
}//                             ==>     PERMET D'AFFICHER LA GRILLE AVEC LES BONS PARAMETRES

function openLibPopup(elem){
	//~ var elem = $(selected_tab).data("categorie"); //$('#tab_' + selected_tab).data("categorie");
	//~ alert("Elem: " + JSON.stringify(elem));
	//~ alert(JSON.stringify(selected_tab, null, 4));
	//~ alert(JSON.stringify(selected_tab.libraryid, null, 4));
	//~ alert(selected_tab.data("categorie"));
	var htmlPopup =  "<div style='width: 15%; height: 20%;margin-top: 10%;margin-left: 30%;background-color: rgb(205,192,176);'><div>" +
		"<input type='text' name='popup_id' id='popup_id' style='visibility:hidden;'>" +
		"<input type='text' name='titre' id='form_titre' ><input type='text' name='couleur' id='form_couleur' placeholder='Couleur'>\
		<button class='bg_ban' style='margin-top:5%; width:70%; height:70%;' onclick='validateLibPopup()'>Valider</button>\
		<script>" + 
			"$('#form_couleur').spectrum({\
			color: '"+ selected_tab.color +"'\
			});" +
		"</script>\
	</div></div>";
	//~ alert(htmlPopup);
	$("#mode_popup").append(htmlPopup);
	$("#popup_id").attr('value', selected_tab.libraryid);
	$("#form_titre").attr('value', selected_tab.libtitle);
	$("#mode_popup").css("visibility" , "visible");
}

function validateLibPopup(){
	var formid = $('#popup_id').val();
	var formtitre = $('#form_titre').val();
	var formcolor = $('#form_couleur').spectrum("get").toRgbString();
	var elem = $('#tabA_' + formid);
	selected_tab.color = formcolor;
	selected_tab.libtitle = formtitre;
	selected_tab.libraryid = formid;
	window.appData.library[formid].color = formcolor;
	window.appData.library[formid].libtitle = formtitre;
	window.appData.library[formid].libraryid = formid;
	//~ alert('Test Close popup');
	//~ alert(JSON.stringify(window.appData.library[formid], null, 4));
	elem.css("background-color", formcolor);
	updateLibrary(window.appData.library[formid]);
	elem.html("<h1>"+formtitre+"</h1>");
	//~ window.appData.library[i].libtitle = ('#form_titre').val();
	clear_popup();
	mode_admin();
}
