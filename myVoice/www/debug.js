function set_img_debug(){
    set_img = new Array();
    var test = "the test";
    for (var i = 0; i < 33; i++){
        set_img[i] = "<span class='" + test + "_frame"+"'>"+
        "<span class='"+ test +"_frame"+"'>"+
        "<img src='"+ "white.png" +"'/><p>"+ test +
        "</p></span>"+
        "</span>";
    }
    return set_img;
}