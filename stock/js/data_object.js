var image_list = new Array();
var tmp_categorie = {
    "Verbes" : "",
    "Adjectifs" :"", 
    "Aliments" : "",
    "Jouets" : "",
    "Jeux" : "",
    "Activites" : "",
    "Vetements" : "",
    "Animaux" : "",
    "Boissons" : ""
};
var tab_verbes = {
    manger : "img/manger.png",
    boire : "img/boire.png",
    courir: "img/courir.png",
    sauter: "img/sauter.png",
    tourner: "img/tourner.png",
    tirer: "img/tirer.png",
    pousser: "img/pousser.png",
    donner: "img/donner.png",
    chatouiller: "img/chatouiller.png",
    souffler: "img/souffler.png",
    sortir: "img/sortir.png",
    ouvrir: "img/ouvrir.png",
    fermer: "img/fermer.png",
    rouler: "img/rouler.png",
    glisser: "img/glisser.png",
    allumer: "img/allumer.png",
    eteindre: "img/eteindre.png",
};
var tab_aliments = {
  pain: "img/pain.png",
  bonbon: "img/bonbon.png",
  chips: "img/chips.png",
  pates: "img/pates.png",
  patate: "img/patate.png",
  viande: "img/viande.png",
 fromage: "img/fromage.png",
 yaourt: "img/yaourt.png",
 glace: "img/glace.png"
};
var tab_adjectifs = {
    un : "img/un.png",
    deux : "img/deux.png",
    trois: "img/trois.png",
    quatre: "img/quatre.png",
    cinq: "img/cinq.png",
    blanc: "img/blanc.png",
    bleu: "img/bleu.png",
    vert: "img/vert.png",
    rouge: "img/rouge.png",
    jaune: "img/jaune.png",
    noir: "img/noir.png",
    grand: "img/grand.png",
    petit: "img/petit.png"
};
var tab_jouets = {
     bulles: "img/bulles.png",
     toupie: "img/toupie.png",
     voiture: "img/voiture.png",
     garage: "img/garage.png",
     livre: "img/livre.png",
     télé: "img/tv.png", 
     wii: "img/wii.png",
    reine: "img/reine.png",
    piano: "img/piano.png",
    marionnettes: "img/marionette.png",
    feutres: "img/feutres.png",
    peinture: "img/peinture.png"
};
var tab_jeux = {
    ballon: "img/ballon.png",
    balançoire: "img/balancoire.png",
    toboggan: "img/tobogan.png",
    trampoline: "img/trampoline.png",
    velo: "img/velo.png",
    trottinette: "img/trottinette.png", 
    roller: "img/roller.png", 
    raquette: "img/raquette.png",
    football: "img/football.png"
};
var tab_activites = {
    dessin: "img/dessin.png",
    promenade:"img/promenade.png",
    histoire:"img/histoire.png",
    r_tele:"img/r_tv.png"
};
var tab_vetements = {
    casquette:"img/casquette.png",
    chapeau:"img/chapeau.png",
    veste:"img/veste.png",
    impermeable:"img/impermeable.png"
};
var tab_boissons = {
    eau: "img/eau.png",
    jpomme: "img/jpomme.png",
    jorange: "img/jorange.png",
    jraisin: "img/jraisin.png",
    coca: "img/coca.png",
    lait: "img/lait.png",
};
var tab_animaux = {
     chien:"img/chien.png",
     chat:"img/chat.png",
     poisson_rouge:"img/poisson.png"
};
var libraries = {
    "Verbes" : tab_verbes,
    "Adjectifs" :tab_adjectifs,
    "Animaux" :   tab_animaux,
    "Vetements" :  tab_vetements,
    "Boissons" :   tab_boissons,
    "Activites" :   tab_activites,
    "Jeux" :  tab_jeux,
    "Jouets" :   tab_jouets,
    "Aliments" :  tab_aliments
};
function get_image_in_tab(image_list){
    var html_str;
    var number;
    for (var i in libraries)
    {
        console.log(i);
        html_str = new Array();
        number = 0;
            for (var y in libraries[i]){
                 html_str[number] = "<span class='img_frame' id='frame_"+(number++)+"'>"+
                    "<span id='s_"+libraries[i][y]+"'>"+
                    "<img class='img_stat' id='"+libraries[i][y]+"' src='"+libraries[i][y]+"'/>"+
                    "</span>"+
                    "</span>";
            }
           image_list[i] = html_str;
    }
    console.log(image_list[i]);
};
