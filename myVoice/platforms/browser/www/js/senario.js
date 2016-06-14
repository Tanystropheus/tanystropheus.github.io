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

function	Stat_tab(tab)
{
	this.min 				= get_the_min(tab);
	this.max 				= get_the_max(tab);
	this.moyenne 			= get_moyenne(tab);
	this.median 			= get_median(tab);
	this.ecart_type 		= get_eccart_type(tab);
}

// function	Stat_tab()
// {
// 	this.min 				= 0;
// 	this.max 				= 0;
// 	this.moyenne 			= 0;
// 	this.median 			= 0;
// 	this.ecart_type 		= 0;
// }

// function	Activite()

function	Activite()
{
	this.time_wakeup 	= 6  * hour_tik;// 7h30
	this.time_asleep 	= 20 * hour_tik;// 22h00
	this.time_interval 	= 2  * hour_tik;// 2h
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



//	DEFINITION DU DEBUT ET DE LA FIN DE LA JOURNE
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
		result += (Math.random() - 0.5) * plage * 2;
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



function	get_the_min(tab)
{
	var min = tab[0];

	for (var i = 0; i < tab.length; i++)
	{
		if (tab[i] < min)
		{
			min = tab[i];
		}
	}
	return (min);
}

function	get_the_max(tab)
{
	var max = tab[0];

	for (var i = 0; i < tab.length; i++)
	{
		if (tab[i] > max)
		{
			max = tab[i];
		}
	}
	return (max);
}

function	get_moyenne(tab)
{
	var sum = 0;

	for (var x = 0; x < tab.length; x++)
	{
		sum += tab[x];
	}
	return (sum / tab.length);
}

function	get_median(tab)
{
	var cpy = tab.concat([]);


	// console.log("cpy befor:");
	// console.log(cpy);

	cpy.sort();

	// console.log("cpy after:");
	// console.log(cpy);

	var x = (Math.ceil(tab.length / 2));
	// console.log("length:"+tab.length+"	median indice:"+x);
	return (cpy[x]);

	// for (var x = 0; x < cpy.length; x++)
	// {
	// 	cpy[x] = 0;
	// }
	// console.log("cpy:");
	// console.log(cpy);
	// console.log("tab:");
	// console.log(tab);
}

function	get_eccart_type(tab)
{
	var moyenne = get_moyenne(tab);
	var eccart_quadra = 0;
	var eccart_type = 0;

	for (var x = 0; x < tab.length; x++)
	{
		eccart_quadra += (tab[x] - moyenne) * (tab[x] - moyenne);
	}
	eccart_quadra /= tab.length;
	eccart_type = Math.sqrt(eccart_quadra);
	return (eccart_type);
}

// function	get_all_for_tab(tab)
// {
	
// 		ici on defini toute les valeur et on les affiche
	
// }


function	gen_table()
{
	var nb_test			= 100000;
	var value 			= 1;
	var precision 		= 10;
	var plage 			= 1;

	var tab 			= [];
	// console.log("BEGIN");
	//	initialisation du tableau
	for (var x = 0; x < nb_test; x++)
	{
		tab[x] = generate_coef(value, precision, plage);
	}


	var min 			= get_the_min(tab);
	var max 			= get_the_max(tab);
	var moyenne 		= get_moyenne(tab);
	var median 			= get_median(tab);
	var ecart_type 		= get_eccart_type(tab);
}

function	gen_table(nb_test, value, precision, plage)
{
	// var nb_test			= 99;
	// var value 			= 1;
	// var precision 		= 10;
	// var plage 			= 1;

	var tab 			= [];
	// console.log("BEGIN");
	//	initialisation du tableau
	for (var x = 0; x < nb_test; x++)
	{
		tab[x] = generate_coef(value, precision, plage);
	}

	return (tab);
	// return ({min: min; max:max;moyenne:moyenne;median:median;ecart_type:ecart_type});
}

	// var min 			= get_the_min(tab);
	// var max 			= get_the_max(tab);
	// var moyenne 		= get_moyenne(tab);
	// var median 			= get_median(tab);
	// var ecart_type 		= get_eccart_type(tab);
	// console.log("min:		"+min+"\nmax:		"+max+"\nmoyenne:	"+moyenne+"\nmedian:		"+median+"\necart_type:	"+ecart_type);

function	test_aleatoir()
{
	//	parametre de generation:
	// console.clear();

	var tab_stat		=[];
	var nb_test			= 1000;
	var tab 			= [];

	// var info 			= new Stat_tab(tab);

	for (var x = 0; x < nb_test; x++)
	{
		tab = gen_table(100,0, 30, 0.5);

		tab_stat[x] = new Stat_tab(tab);
	}
	return (tab_stat);


//	console.log(info);


	/*
		ici on les defini pour un lancer, puis pour plusieur lancer. Et on fait des graphique.
	*/
}

	var group_senar;

function	draw_tabl_stat(tab_stat)
{
	var from	= new Point(30, 30);
	var to		= new Point(view.size.width - 30, view.size.height / 3);

	var tab_min = [];
	var tab_max = [];
	var tab_median = [];
	var tab_moyenne = [];
	var tab_ecartype = [];
	var nb_line = 2;
	var max = 1;
	var min = -1;

	if (group_senar == undefined)
	{
		group_senar = new Group();
	}
	if (group_senar.isEmpty() == false)
	{
		group_senar.removeChildren();
		// delete group_senar;
		// group_senar = new Group();
	}

	draw_the_grid(min, max, nb_line, group_senar, from, to);

	for (var x in tab_stat)
	{
		tab_min[x] = tab_stat[x].min + (max - min) / 2;
		tab_max[x] = tab_stat[x].max + (max - min) / 2;
		tab_moyenne[x] = tab_stat[x].moyenne + (max - min) / 2;
		tab_median[x] = tab_stat[x].median + (max - min) / 2;
		tab_ecartype[x] = tab_stat[x].ecart_type + (max - min) / 2;
		// get_tab(){};
	}

	// console.warn(tab_min);
	// console.warn(tab_max);
	// console.warn(tab_moyenne);
	// console.warn(tab_median);
	// console.warn(tab_ecartype);

	draw_line_param(from, to, tab_min, group_senar, 'red', max, min);
	draw_line_param(from, to, tab_max, group_senar, 'blue', max, min);
	draw_line_param(from, to, tab_moyenne, group_senar, 'purple', max, min);
	// draw_line_param(from, to, tab_median, group_senar, 'black', max, min);
	draw_line_param(from, to, tab_ecartype, group_senar, 'grey', max, min);
	//	etc.
}

function	draw_line_param(from, to, values, group, color, max, min)
{
	var nb_line = 2;
	var nb_point = values.length;
	var	delta_x = (to.x - from.x) / nb_point;
	var delta_y = (to.y - from.x) / (max - min);
	var path = new Path();

	for (var i = 0; i < nb_point; i++)
	{
		path.add(new Point(from.x + i * delta_x, to.y - values[i] * delta_y));
	}
	path.strokeColor = color;
	path.strokeWidth = 3;
	view.draw();
	group.addChild(path);
}