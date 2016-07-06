// ACCES MODE PARENT
var pass = {
    "A":0,
    "B":0,
    "C":0,
    "D":0
};
// NOM DE LA CATEGORIE ACTIVE
var selected_tab = "";
// TABLEAU CONTENANT LES IMAGES DE LA CATEGORIE ACTIVE
var libimg;
// TAILLE DES IMAGES EN PIXEL
var img_size = 205;
// TABLEAU DES IMAGES AFFICHEES ; LIBELEM
var set_img;
// NOMBRE DE LIGNES D'IMAGES MAXIMUM POUR L'ECRAN
var hgrid_max;
// NOMBRE DE COLONNES D'IMAGES MAXIMUM POUR L'ECRAN
var wgrid_max;
// NOMBRE D'IMAGES MAXIMUM POUR L'ECRAN DANS LA VOIX
var voice_max;
// NOMBRE DE LIGNES D'IMAGES CHOISI PAR LES PARENTS
var hgrid_choice = 2;
// NOMBRE DE COLONNES D'IMAGES CHOISI PAR LES PARENTS
var wgrid_choice = 2;
// COULEURS
var selected_tab_color = "rgb(251,240,165)";
var active_tab_color = "rgb(132,100,46)";