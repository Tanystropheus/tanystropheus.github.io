/*



	###	Ameliortion sur la trame temporelle	###

		//	il faudrai reglerlesysteme de mois. et D'anne ...
		
		- on va faire un bouton jour, semaine, mois, anne
		- bouton [debut][precedent][suivant][fin]

		Les bouton jour, mois etc 			=>	regleron la fin du curseur
			-ajuste la position de la fin du curseur de DROITE puis le maj, en fonction del'unite voulu.
		Les bouton [suivant] [precedent]	=>	regleron le debut du curseur
			-ajuste la position 

	-on met un genre de call back avec une fonction, ou 

	-un rendu dans un (from, to),  dans un group

	###	Amelioration sur 
*/



function test_time_unite_rendu()
{
	var nb_rep = 10;
	var model = ['a'];//, 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var result = "";
	var incr = 30;

	var from = new Point(view.size.width / 2, incr);
	var to = new Point(view.size.width / 2 + 100, 2 * incr );
	//	pou2r chaque letre
	for (var i in model)
	{
		result = "";
		//	Pour construire chaque repetition
		for (var j = 0; j < nb_rep; j++)
		{
			result += model[i];
		}
		time_unite_rendu(from, to, result);
		from.y += incr;
		to.y += incr
	}
}

function	time_unite_rendu(from, to, text)
{
	//	onfait une marge la plus petite de 5% ou 10px
	//	on ecrit le text: jour, mois

	//	on peu tester la taille en finction des lettre.
	var txt = new PointText();
	txt.position = from ;
	txt.content = text;
	txt.fillColor = 'black';





	var rect = new Path.Rectangle(from, to);
	rect.strokeColor = 'green';


	var txt_from 	= new Point(from.x, from.y - txt.internalBounds.height);
	var txt_to 		= new Point(from.x + txt.internalBounds.width, from.y)
	var rect = new Path.Rectangle(txt_from, txt_to);
	rect.strokeColor = 'black';


	var coefx = (to.x - from.x) / (txt_to.x - txt_from.x);
	var coefy = (to.y - from.y) / (txt_to.y - txt_from.y);
	var min = (coefx < coefy) ? coefx: coefy;

	console.log("coefx: 	"+coefx);
	console.log("coefy: 	"+coefy);
	console.log("min: 		"+min);

	console.log(txt);

	txt.scaling.x *= min;
	txt.scaling.y *= min;


	// console.log("coefx inv:	"+(1 / coefx));
	// console.log("coefy inv:	"+(1 / coefy));
	txt.position.y += txt.internalBounds.height;
	txt.position.x += 


	view.draw();
	//	on re adapte le tout pour rentrer dans le from to




	// // console.log(txt.style);
	// console.log("OUiiiiiiiiiiiiiiiiiiiiiiiiiii");
	// console.log(txt);
	// console.log(txt.handleBounds);
	// console.log(txt.handleBounds.height);
	// console.log(txt.handleBounds.width);
	// console.log(txt.internalBounds);
	// console.log(txt.internalBounds.height);
	// console.log(txt.internalBounds.width);

	// // txt.handleBounds.strokeColor = 'black';



	// var rect = new Path.Rectangle(new Point(from.x, from.y - txt.handleBounds.height), new Point(from.x + txt.handleBounds.width, from.y));
	// rect.strokeColor = 'black';

	// var rect = new Path.Rectangle(new Point(from.x, from.y - txt.internalBounds.height), new Point(from.x + txt.internalBounds.width, from.y));
	// rect.strokeColor = 'black';

	// console.log(txt.style.internalBlounds);
	// console.log(txt.style.internalRoughtBlounds);
	// // console.log(txt.style.bounds.get);
}
