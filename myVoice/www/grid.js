function select_grid(library){
    get_img(library);
    var img_text;
    set_img = new Array();
    for (var i = 0; i < libimg.length; i++){
        for (var id in window.appData.text){
            if (window.appData.text[id].textid === libimg[i].textid)
                img_text = window.appData.text[id].text;
        }
        set_img[i] = "<span style='height:189px; width:189px; margin:5%; ' class='"+library.libtitle+"_frame"+"'>"+
                    "<span style='height:189px; width:189px' class='"+library.libtitle+"_frame"+"'>"+
                    "<img style='height:100%; width:100%' src='"+libimg[i].elemurl+"'/><p>"+ img_text +
                    "</p></span>"+
                    "</span>";
    }
    localStorage.setItem(library.libtitle, set_img);
}
function set_grid(mode, where){
    var h;
    var w;
    var nb_img;
    var col = 0;
    var row = 0;
    var html_str = "";
    document.getElementById("user_galerie").innerHTML = "";
    switch (mode){
        case 1:
            nb_img = 2;
            h = $("#"+where+"_galerie").height() * 48 /  100;
            w = $("#"+where+"_galerie").width() * 23 / 100;           
            break;
        case 2:
            nb_img = 3;
            h = $("#"+where+"_galerie").height() * 32 / 100;
            w = $("#"+where+"_galerie").width() * 15 / 100;  
            break;
        default:
            nb_img = 1;
            h = $("#"+where+"_galerie").height() * 98 / 100;
            w = $("#"+where+"_galerie").width() * 48 / 100;
            break;
    }
    for (var irow = 0; irow < set_img.length; irow){
        html_str = "<ul id='col_"+ col +"' style='height:100%; width:" + w + "px;float:left;'></ul>";
        $("#"+where+"_galerie").append(html_str);
        html_str = "";
        for (var i = 0; i < nb_img; i++){
            html_str = html_str + "<li style='height:"+h+"px; width:100%; text-align:center;' id='row_"+ row +"'></li>";
            row++;
            irow++;
        }
        $("#col_"+col).append(html_str);
        col++;
    }
    for (var all in set_img){
        $("#row_"+all).append(set_img[all]);
    }
}