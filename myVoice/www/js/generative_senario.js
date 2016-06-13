/*
	Generation de phrase:
	evolution temporelle:



		(1)	on prend une phrase existante et on lui r'ajoute une carte alleatoire 
		(2)	on cree un nouveau debut de phrase avec un ellement au hasard
		(3)	on fait evoluer un temp plus ou mois vite.
		(4)	on fait aussi evoluer le nombre de phrase prononcer, et eventuelement leur taille.
		(5)	Faire un generateur a poid miltiple

// */
/*
	l'idee meintenant c'est de definir des position et des poid pour concatener les resultat

	{temps: 1; valeur: 10}
//*/


/*
	value: la valeur autour de la quelle on va generer une valeur
	precision: les chance de se raprocher de cette valeur
	plage la zone potentielle dans la quelle peuv se trouver les valeur (reduire la plage revien donc un peu a augmenter la precison)
*/

// function	generate_coef(value, precision, plage)
// {
// 	// var nb_time = 10;
// 	var result = 0;

// 	for (var i = 0; i < precision; i++)
// 	{
// 		result += (Math.random() - 0.5) * 2 * plage;
// 	}
// 	// result /= precision;
// 	// result += value;
// 	return ((result / precision) + value);
// }

function	defined_coef(nb_time)
{
	// var nb_time = 10;
	var result = 0;

	for (var i = 0; i < nb_time; i++)
	{
		// result += (Math.random());
		tmp = Math.random() * Math.random() + 0.25;
		result += (tmp);
		// result += (tmp * tmp * tmp * tmp);
	}
	result /= nb_time;
	result *= 1;
	// result += value;
	return (result);
}

function	test_coef()
{
	var times = 50;
	var result = [];

	for (var i = 0; i < times; i++)
	{
		// console.log("add result:");
		result[i] = defined_coef(100);
		// console.log(result.length);
	}
	// result.sort();
	return (result);
}


function	max_value_of(values)
{
	max = 1;
	for (var x = 0; x < values.length; x++)
	{
		if (values[x] > max)
		{
			max = values[x];
		}
	}
	return (max);
}

function	draw_point(from, to, values, group)
{

	// var max = max_value_of(values);
	var max = 1;
	var nb_line = 4;
	var nb_point = values.length;
	var	delta_x = (to.x - from.x) / nb_point;
	var delta_y = (to.y - from.x) / max;
	var path = new Path();

	if (group == undefined)
	{
		group = new Group();
	}
	// else if(group.isEmpty() == false)
	// {
	// 	// group.removeChildren();
	// 	// group
	// }
	for (var i = 0; i < nb_point; i++)
	{
		// console.log("i:"+i);
		path.add(new Point(from.x + i * delta_x, to.y - values[i] * delta_y));
	}
	path.strokeColor = 'blue';
	path.strokeWidth = 3;
	view.draw();
	// group.addChildren(path);
}

var group_testouille;

function	mix_all_test()
{
	var values	= test_coef();
	var from	= new Point(30, 30);
	var to		= new Point(view.size.width - 30, view.size.height / 3);
	if (group_testouille == undefined)
	{
		group_testouille = new Group();
	}

	draw_point(from, to, values, group_testouille);
}


	// result.sort(function (a, b)
	// {
	// 	resturn (b - a);
	// });