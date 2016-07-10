/* USE.JS - Nombre de Fonctions : 5 */
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
   if (code === "D"){
       if (pass["A"] === 1 && pass["B"] === 1 && pass["C"] === 1 &&pass["D"] === 1){
           pass["A"] = 0;
           pass["B"] = 0;
           pass["C"] = 0;
           pass["D"] = 0;
           set_vue("admin");
       }
   }
}//                             ==>     PERMET D'OUVRIR LE MODE ADMIN
function set_vue(vue){
    $("#mode_user").css("visibility" , "hidden");
    $("#mode_admin").css("visibility" , "hidden");
    $("#mode_photo").css("visibility" , "hidden");
    $("#mode_statistique").css("visibility" , "hidden");
    $("#mode_"+vue).css("visibility" , "visible");
}//                             ==>     PERMET D'AFFICHER UNE VUE ET DE CACHER TOUTES LES AUTRES
function show_popup(visibility, html_str){
    if (visibility === "visible")
		{
			alert("alert: " + JSON.stringify($("#alert"), null, 4));
        $("#alert").html(html_str);
		}
    else
        $("#alert").html("");
    $("#mode_popup").css("visibility", visibility);
}//                             ==>     AFFICHE UN POPUP
function clear_popup(){
    $("#mode_popup").html("");
    $("#mode_popup").css("visibility" , "hidden");
}//                             ==>     EFFACE LE POPUP ACTIF
function voiceMoreLess(what){    
    if (what === 0){
        if (voice_choice <= voice_max)
            voice_choice++;        
    }
    else{
        if (voice_choice >= 2)
            voice_choice--;  
    }
    voiceSelect();
}//                             ==>     PERMET D'AUGMENTER OU DE DIMINUER LE NOMBRE D'IMAGE DANS LA BANDE DE PAROLE
function voiceSelect(){
    for (var i = 1; i < $("#te").children("span").length - 1; i++){
       if (i <= voice_choice)
        $("#voice_select_"+(i-1)+" img").attr("src", "app/img/yes.png");
       else
        $("#voice_select_"+(i-1)+" img").attr("src", "app/img/no.png");
    } 
}//                             ==>     PERMET D'AFFICHER LE NOMBRE D'IMAGE DE LA BANDE DE PAROLE
