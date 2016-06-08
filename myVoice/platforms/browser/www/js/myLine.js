
	// a partir de elem stat il faut recuerer les phrase. puis les date.
	// - definir les date dedebut et de fin de visualisation		DONE
	// - definir un intervalde temps ou un nombre de point			DONE
	// - recuerer toutes les date (et les trier)					DONE
	// - remplir les plage de temps	(genre histo/)				DONE
	// - afficher
	// 	/effacer lacourbe										DONE
	//  	/rafriachir lacourbe et la grille

	// // variable globale:
    var all_elem = [];
    var all_phrase = [];
    var all_elem_stat = [];
    var all_phrase_stat = [];


/*

*/
function    how_is_active()
{
	 console.log("HEllo!\n");
	for(var x in all_elem)
	{
		if (groups_line[x] != undefined && groups_line[x].data == true)
		{
			console.log("line :x:"+(x % 5)+"	y:"+parseInt(x / 4)+" is active");
		}
	}
}


// function	line_data()
// {
// 	this.val = 0;
// 	this.
// }

//	variableglobale
var groups_line = [];
var group_grid;
 var glob_max;


function cmp_nb(a, b)
{
	return (a - b);
}

// function f1(elem_id)
// {
// 	// console.error("Arthung!!!");
// 	get_lst_time(elem_id);
// }


function	get_time_interval()
{
	var time = "";
	var date = document.getElementById("date_begin");
	var clock = document.getElementById("time_begin");
	var time_begin = 0;
	var time_end = 0;
	var swap;

	time = date.value + " " + clock.value;
	time_begin = Date.parse(time);

	date = document.getElementById("date_end");
	clock = document.getElementById("time_end");
	time = date.value + " " + clock.value;
	time_end = Date.parse(time);
	if (time_begin == undefined || time_end == undefined )
	{
		alert("Erreur de selecion de la date");
	}
	else if (time_begin == time_end)
	{
		alert("difference de temps null")
	}
	if (time_end < time_begin)
	{
		swap = time_end;
		time_end = time_begin;
		time_begin = swap;
	}
	return ({begin:time_begin, end:time_end});
}

function	get_time_unite()
{
	var time = "";
	var date = document.getElementById("inter_date_begin");
	var clock = document.getElementById("inter_time_begin");
	var time_begin = 0;
	var time_end = 0;
	var swap;

	time = date.value + " " + clock.value;
	time_begin = Date.parse(time);

	date = document.getElementById("inter_date_end");
	clock = document.getElementById("inter_time_end");
	time = date.value + " " + clock.value;
	time_end = Date.parse(time);
	if (time_begin == undefined || time_end == undefined )
	{
		alert("Erreur de selecion de la date");
	}
	else if (time_begin == time_end)
	{
		alert("difference de temps null")
	}
	if (time_end < time_begin)
	{
		swap = time_end;
		time_end = time_begin;
		time_begin = swap;
	}
	return (time_end - time_begin);
}

function	find_begin(tab_val, val_begin)
{
	var i = 0;

	while (tab_val[i] < val_begin)
	{
		i++;
	}
	return (i);
}

// function	is_sort(lst_time)
// {
// 	var is_sorted = true;
// 	console.info("length tab:"+lst_time.length);
// 	for (var x = 0; x < lst_time.length - 1; x++)
// 	{
// 		if (lst_time[x] > lst_time[x + 1])
// 		{
// 			is_sorted = false;
// 			alert("not sorted");
// 		}
// 	}
// 	if (is_sorted)
// 	{
// 		alert("sorted");
// 	}
// }

function	is_include(lst_time, time_interval, time_unite)
{
	if (lst_time[0] <= time_interval.begin && lst_time[lst_time.length - 1] >= time_interval.end && lst_time[lst_time.length - 1] - lst_time[0] >= time_unite)
	{
		alert("It is include");
	}
	else
	{
		alert("It is NOT include");
		if (!(lst_time[lst_time.length - 1] <= time_interval.begin))
		{
			alert("last term befor");
		}
		if(!(lst_time[0] >= time_interval.end))
		{
			alert("first term after");
		}
		if ((lst_time[lst_time.length - 1] - lst_time[0] < time_unite))
		{
			alert("interval too long");
		}
	}
}


function	get_max_nb(tab_value)
{
	var max = 0;

	// typeof(tab_value);
	// typeof(tab_value.length);
	// console.info("tab_length");
	// console.log(tab_value.length);
	for(var x = 0; x < tab_value.length; x++)
	{
		// console.log("tab_value["+x+"]:");
		// console.log(tab_value[x]);
		// console.log("max:");
		// console.log(max);
		if (tab_value[x] >= max)
		{
			max = tab_value[x];
		}
	}
	return (max);
}

// function	actual_grid()
// {

// }

function	draw_line(elem_id, from, to)
{
	// console.log(elem_id);
	// console.log(from);
	// console.log(to);
	var tab_value = fill_the_value(elem_id);
	var max_val = get_max_nb(tab_value);
	var delta_x = (to.x - from.x) / tab_value.length;
	var delta_y = (to.y - from.y) / max_val;
			// alert("1");
// console.log("mouahahahahahah");
// console.log("tab_value:"+tab_value);
// console.log("max_val:"+max_val);
// console.log("delta_x:"+delta_x);
// console.log("delta_y:"+delta_y);


	if (groups_line[elem_id] == undefined)
	{
		groups_line[elem_id] = new Group();
			// alert("3");

	}
	else if (!(groups_line[elem_id].isEmpty()))
	{
//		typeof(groups_line[elem_id]);
		groups_line[elem_id].remove();
		// if (groups_line[elem_id].isEmpty())
		// {
		// //	groups_line[elem_id] = new Group();
		// 	 // alert("Yoloswag");
		// }
	}
	if (groups_line[elem_id].isEmpty())
	{
		//	ici on dessine la grille
		// et on l'ajoute au groupe... en fait oui maisnon 
		var path = new Path();
	//	path.fillColor = new Color({ hue: (elem_id / all_elem_stat.length * 360), saturation: 0.7, brightness:0.8 });
	    path.strokeColor = new Color({ hue: (elem_id / all_elem_stat.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
	    path.strokeWidth = 3;

	    // console.log(tab_value);
		for (var x in tab_value)
		{
			// console.log(new Point(from.x + x * delta_x, to.y - delta_y * tab_value[x]));
			path.add(new Point(from.x + x * delta_x, to.y - delta_y * tab_value[x]));
		// on fait tout letruc de voili voilou
		// on le remplis
		}
		path.smooth();
		// console.log(path);
		groups_line[elem_id].addChild(path);
//		groups_line[elem_id].addChild(group_grid);
			// alert("4");


	}
	view.draw();


}

