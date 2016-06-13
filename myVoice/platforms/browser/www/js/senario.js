/*
-on genere les plage d'activiter
-on les dessine

-on genere des conversation qui genere des conversation. (l'augmentation pourra etre deffini en fonction de la conplexite de ce qui a ete produit en parole)
-on defini 2/3 regle pour genere une phrase 	
*/


//Variable globale
var tab_discution = [];
var activ;
var hour_tik = 3600000;
var day_tik = 86400000;

var time_wakeup = 0;// 7h30
var time_asleep = 0;// 22h00
var time_interval = 0;// 2h
var time_precision = 0;// 2h

/*
	history		=>	list des phrase qui on ete genere, ranger par image (le truc qui permet un affichage par noeud)
	time 		=>	l'heure moyenne a partire de la quell onfait apparaitre les phrase
	nb_sentence	=>	nombre de phrase par conversation
	time_unite 	=>	temp moyen entre deux phrase.
*/
function	Discussion()
{
	this.history = [];
	this.time;
	this.nb_sentence = 1;
	this.time_unite;
}

function	Activite()
{
	this.time_wakeup = 6 * hour_tik;// 7h30
	this.time_asleep = 20 * hour_tik;// 22h00
	this.time_interval = 2 * hour_tik;// 2h
	this.time_precision = 1;// parametre de generation
}

function	globale_senar_1()
{
	var now = Date.now();
	var tmp_total = 2 * 30 * day_tik;
	var tmp_begin = (now - tmp_total) - ((now - tmp_total) % day_tik);
	var tmp = tmp_begin;
	var calcul1 = 0;
	var calcul2 = 0;
	var date = new Date();

	var hour = 0;
	var min = 0;

	if (activ == undefined)
	{
		activ = new Activite();
	}

	// console.log(test_date);
	// test_date = new Date(tmp_begin);
	// console.log(test_date);


	for (tmp = tmp_begin; tmp < now; tmp = tmp + day_tik)
	{

		// console.log(tmp);
		delete date;
		date = new Date(tmp);
		console.log("day:"+date.getDay());

		calcul1 = generate_coef(activ.time_wakeup, activ.time_precision, activ.time_interval);
		calcul2 = generate_coef(activ.time_asleep, activ.time_precision, activ.time_interval);
		

		delete date;
		date = new Date(calcul1 + tmp);
		hour = date.getHours();
		min = date.getMinutes();
		console.log("mornig:"+hour+":"+min);

		delete date;
		date = new Date(calcul2 + tmp);
		hour = date.getHours();
		min = date.getMinutes();
		console.log("night:"+hour+":"+min);

		delete date;
		date = new Date(calcul2 - calcul1);
		hour = date.getHours();
		min = date.getMinutes();
		console.log("temps total:"+hour+":"+min+"\n\n");



	}

}



function	generate_coef(value, precision, plage)
{
	// var nb_time = 10;
	var result = 0;

	for (var i = 0; i < precision; i++)
	{
		result += (Math.random() - 0.5) * plage;
	}
	result /= precision;
	result += value;
	return (result);
}


// function blala()
// {
// 	var obj = new Discussion();
// 	obj.history[0] = "";
// }

