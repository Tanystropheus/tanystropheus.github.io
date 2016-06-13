/*
	Une Seed va etre un point autrour du quel n vagenerer des valeur plus ou mois proche

*/


function	seed()
{
	this.time = 0;
	this.value = 0;
	this.precision = 20;
	this.plage = 3;
	this.nb_point = 15;
}

// function	seed(time)
// {
// 	this.time = time;
// 	this.value = 0;
// 	this.precision = 20;
// 	this.plage = 3;
// 	this.nb_point = 15;
// }

function	Seed(time, value, precision, plage, nb_point)
{
	this.time = time;
	this.value = value;
	this.precision = precision;
	this.plage = plage;
	this.nb_point = nb_point;
}

function	generate_seed(nb_seed);
{
	var teb = [];


	for (var i = 0 ; i < nb_seed; i++)
	{
		tab[i] = new Seed();
	}
}

function	generate_senario()
{
	var seed = 
}

/*

[X]			: 	0.5%

temp total 	: 	1 mois
delta_time 	: 	Math.random * [X] * temp_trestant + ((2 heure) * Math.random * (temp_restan / temp_total + 0.1));

*/

//	une couche qui determine les evenement temporelle et donc aussi le nombre d'evenement sur une sertaine plage de temps;
//	une couche qui determine une phrase pour chaque noeud

//	heure de someille;

//	definition de centre d'interet


//	Senario:
/*
	
	On ne parle que la journe
		-on dor entre 11-6h30 h / jour =>	lever:6-9 h && coucher:22-23h30

	On a un certain nombre de conversation pa jour:
		-au debut 2.

	On on a un ceraint nombre de phrase par conversation
		-au debut 1.

	-activite;
		-heure de lever
		-heure de coucher
		=> temp d'activiter

	-parole:
		-nombre de conversation par jour
			-durer de la conversation
			-nombre de phrase / conversation
			-heure de la conversation:

			-augmenter la durer()
			-augmenter le nombre de phrase()

		-augmenter le nombre de conversation()



	-chance d'augmenter le nombre de phrase potentiell par conversation;
	-chance d'ogmenter le nombre de conversation

	-chance de cree
obj:
	-	conversation

samaine:
	-theme par jour

-peridode d'activiter
-conversation
*/



