
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


// function	draw_active_line(elem_id, from, to, max)
// {
// 	var tab_value = fill_the_value(elem_id);
// 	var max_val = max;//get_max_nb(tab_value);
// 	var delta_x = (to.x - from.x) / tab_value.length;
// 	var delta_y = (to.y - from.y) / max_val;

// 	if (groups_line[elem_id] != undefined && groups_line[elem_id].data == true)
// 	{
// 		if (groups_line[elem_id].isEmpty() == false)
// 		{
// 			groups_line[elem_id].remove();
// 		}
// 		tab_value = fill_the_value(elem_id);
// 		var path = new Path();
// 	    path.strokeColor = new Color({ hue: (elem_id / all_elem.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
// 	    path.strokeWidth = 3;

// 		for (var x in tab_value)
// 		{
// 			path.add(new Point(from.x + (x * delta_x), to.y - delta_y * tab_value[x]));
// 		}
// 		path.smooth();
// 		groups_line[elem_id].addChild(path);
// 	}
// 	view.draw();
// }




// function    how_is_active()
// {
// 	 console.log("HEllo!\n");
// 	for(var x in all_elem)
// 	{
// 		if (groups_line[x] != undefined && groups_line[x].data == true)
// 		{
// 			console.log("line :x:"+(x % 5)+"	y:"+parseInt(x / 4)+" is active");
// 		}
// 	}
// }


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
	conteur++;console.log("get time intervsl >> ich bin da:"+conteur+" "+this.name);

	var time = "";
	var date = document.getElementById("date_begin");
	var clock = document.getElementById("time_begin");
	var time_begin = 0;
	var time_end = 0;
	var swap;

	time = date.value + " " + clock.value;
//	alert("{"+time+"}");
	if (time == " ")
	{
		time = "2016-06-06";
	}
	time_begin = Date.parse(time);

	date = document.getElementById("date_end");
	clock = document.getElementById("time_end");
	time = date.value + " " + clock.value;
//	alert("{"+time+"}");
	if (time == " ")
	{
		time = "2016-06-10";
	}
	time_end = Date.parse(time);
	// if (time_begin == undefined || time_end == undefined )
	// {
	// 	alert("Erreur de selecion de la date");
	// }
	if (time_begin == time_end)
	{
		alert("difference de temps null")
	}
	if (time_end < time_begin)
	{
		swap = time_end;
		time_end = time_begin;
		time_begin = swap;
	}
//	alert(typeof(time_begin));
//	alert(time_begin);
//	alert("begin:"+time_begin+"\nend:"+time_end);
	return ({begin:time_begin, end:time_end});
}

function	get_time_unite()
{
	conteur++;console.log("get time untie >> ich bin da:"+conteur+" "+this.name);

	var time = "";
	var date = document.getElementById("inter_date_begin");
	var clock = document.getElementById("inter_time_begin");
	var time_begin = 0;
	var time_end = 0;
	var swap;

	time = date.value + " " + clock.value;
	if (time == " ")
	{
		time = "2016-06-06 00:00";
	}
	time_begin = Date.parse(time);


	date = document.getElementById("inter_date_end");
	clock = document.getElementById("inter_time_end");
	time = date.value + " " + clock.value;
	if (time == " ")
	{
		time = "2016-06-06 12:00";
	}
	time_end = Date.parse(time);


	if (time_end < time_begin)
	{
		swap = time_end;
		time_end = time_begin;
		time_begin = swap;
	}
	// if (time_begin == undefined || time_end == undefined)
	// {
	// 	return(129600000);
	// }
	return (time_end - time_begin);
}

function	get_lst_time(elem_id)
{
	var	lst_time = [];
	var lst_phrase;

	lst_phrase = all_elem_stat[elem_id].lst_senstenceId;

	for (var x in lst_phrase)
	{
		lst_time[lst_time.length] = all_phrase[lst_phrase[x]].time;
	}
	lst_time.sort();
	return (lst_time);
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

// function	is_include(lst_time, time_interval, time_unite)
// {
// 	if (lst_time[0] <= time_interval.begin && lst_time[lst_time.length - 1] >= time_interval.end && lst_time[lst_time.length - 1] - lst_time[0] >= time_unite)
// 	{
// 		alert("It is include");
// 	}
// 	else
// 	{
// 		alert("It is NOT include");
// 		if (!(lst_time[lst_time.length - 1] <= time_interval.begin))
// 		{
// 			alert("last term befor");
// 		}
// 		if(!(lst_time[0] >= time_interval.end))
// 		{
// 			alert("first term after");
// 		}
// 		if ((lst_time[lst_time.length - 1] - lst_time[0] < time_unite))
// 		{
// 			alert("interval too long");
// 		}
// 	}
// }


function	get_max_nb(tab_value)
{
	// conteur++;console.log("gwet max >> ich bin da:"+conteur);

	var max = 0;

	for(var x = 0; x < all_elem.length; x++)
	{
		if (tab_value[x] >= max)
		{
			max = tab_value[x];
		}
	}
	return (max);
}

function	fill_the_value(elem_id)
{

}

function fill_me_the_val(elem_id)
{
	var tab_value = [];
	var time_interval = get_time_interval();

	var time_unite = get_time_unite();
	var lst_time = get_lst_time(elem_id);



	var tab_length = parseInt((time_interval.end - time_interval.begin) / time_unite);
	console.info("tab_length:"+tab_length);
	var next_time = time_interval.begin + time_unite;
	var x =find_begin(tab_value, time_interval.begin);



	for(var i = 0; i < tab_length; i++)
	{
		tab_value[i] = 0;
		while(lst_time[x] < next_time && lst_time[x] < time_interval.end)
		{
			tab_value[i]++;
			x++;
		}
		next_time += time_unite;
	}

	return (tab_value);
}

var conteur = 0;
console.log("myLine.js est incclu");



function    invert_state(elem_id)
{
    if (groups_line[elem_id] == undefined)
    {
        groups_line[elem_id] = new Group();
        groups_line[elem_id].data = true;
    }
    else
    {
        groups_line[elem_id].remove();
        view.draw();
        groups_line[elem_id] = undefined;
    }
}

function	define_max()
{
	var maximum = 0;
	var tmp = 0;
	var tab_value = [];

	for(var x in all_elem)
	{
		if (groups_line[x] != undefined)
		{
			tab_value = fill_me_the_val(x);
			tmp = get_max_nb(tab_value);
			if (tmp > maximum)
			{
				maximum = tmp;
			}
		}
	}
	return (maximum);
}

function	draw_line(elem_id, from, to, max)
{
	if (groups_line[elem_id] != undefined)
	{
		if (groups_line[elem_id].isEmpty() == false)
		{
			groups_line[elem_id].removeChildren();
		}
	 	var tab_value = fill_me_the_val(elem_id);

	 	var max_val = max;//get_max_nb(tab_value);
		var delta_x = (to.x - from.x) / tab_value.length;
		var delta_y = (to.y - from.y) / max_val;
		var path = new Path();
	    path.strokeColor = new Color({ hue: (elem_id / all_elem.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
	    path.strokeWidth = 3;

		for (var x in tab_value)
		{
			path.add(new Point(from.x + x * delta_x, to.y - delta_y * tab_value[x]));
		}
//		path.smooth();
		groups_line[elem_id].addChild(path);
		view.draw();
	}
}

