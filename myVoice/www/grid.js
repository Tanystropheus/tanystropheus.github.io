function select_grid(library){
    get_img(library);
    var img_text;
    set_img = [];
    for (var i = 0; i < libimg.length; i++){
        for (var id in window.appData.text){
            if (window.appData.text[id].textid === libimg[i].textid)
                img_text = window.appData.text[id].text;
        }
        set_img[i] = "<span style='height:189px; width:189px;' class='"+library.libtitle+"_frame"+"'>"+
                    "<span style='height:189px; width:189px' class='"+library.libtitle+"_frame"+"'>"+
                    "<img style='height:100%; width:100%' src='"+libimg[i].elemurl+"'/><p>"+img_text+
                    "</p></span>"+
                    "</span>";
    }
    localStorage.setItem(library.libtitle, set_img);
}
function set_grid(mode, where){
    var h;
    var w;
    var col = 0;
    var row = 0;
    var html_str = "";
    document.getElementById("user_galerie").innerHTML = "<div id='user_gr' style='height:100%;'></div>";
    h = Math.floor($("#"+where+"_galerie").height() * (100 / hgrid_choice - 2) / 100);
    w = Math.floor($("#"+where+"_galerie").width() * (100 / wgrid_choice - 2) / 100);
    for (var irow = 0; irow < set_img.length; irow){
        html_str = "<ul id='col_"+col+"' style='height:100%; width:"+w+"px;float:left;'></ul>";
        $("#"+where+"_galerie").append(html_str);
        html_str = "";
        for (var i = 0; i < hgrid_choice; i++){
            html_str = html_str + "<li style='height:"+h+"px; width:100%; text-align:center;' id='row_"+row+"'></li>";
            row++;
            irow++;
        }
        $("#col_"+col).append(html_str);
        col++;
    }
    for (var i  = 0; i < wgrid_choice * hgrid_choice; i++){
        $("#row_"+i).append(set_img[i]);
    }
    $("#user_galerie").append("<div id='user_gl' style='height:100%;'></div>");
    $("#user_gr").width(Math.floor(jQuery("#user_content").width() - w * (wgrid_choice)) / 2);
    $("#user_gl").width(Math.floor(jQuery("#user_content").width() - w * (wgrid_choice)) / 2);
}