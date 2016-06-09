
	// // variable globale:
    var all_elem = [];
    var all_phrase = [];
    var all_elem_stat = [];
    var all_phrase_stat = [];


/*

*/


//	variableglobale
var groups_line = [];
//var group_grid;
 var glob_max;


function cmp_nb(a, b)
{
	return (a - b);
}



function	get_time_interval()
{

	var time = "";
	var date = document.getElementById("date_begin");
	var clock = document.getElementById("time_begin");
	var time_begin = 0;
	var time_end = 0;
	var swap;

	time = date.value + " " + clock.value;
	if (time == " ")
		time = "2016-06-06";
	time_begin = Date.parse(time);

	date = document.getElementById("date_end");
	clock = document.getElementById("time_end");
	time = date.value + " " + clock.value;
	if (time == " ")
		time = "2016-06-10";
	time_end = Date.parse(time);
	if (time_begin == time_end)
		alert("difference de temps null")
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
	if (time == " ")
		time = "2016-06-06 00:00";
	time_begin = Date.parse(time);


	date = document.getElementById("inter_date_end");
	clock = document.getElementById("inter_time_end");
	time = date.value + " " + clock.value;
	if (time == " ")
		time = "2016-06-06 12:00";
	time_end = Date.parse(time);


	if (time_end < time_begin)
	{
		swap = time_end;
		time_end = time_begin;
		time_begin = swap;
	}
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

	console.log("tab:");
	console.log(tab_val);
	console.log("val_begin:"+val_begin);
	console.log(typeof(tab_val[0]));
	console.log(typeof(val_begin));
	while (tab_val[i] < val_begin)
		i++;
	return (i);
}


function	get_max_nb(tab_value)
{

	var max = 0;

	for(var x = 0; x < all_elem.length; x++)
	{
		if (tab_value[x] >= max)
			max = tab_value[x];
	}
	return (max);
}

function fill_me_the_val(elem_id)
{
	var tab_value = [];
	var time_interval = get_time_interval();
	var time_unite = get_time_unite();
	var lst_time = get_lst_time(elem_id);

	var tab_length = parseInt((time_interval.end - time_interval.begin) / time_unite);
	// console.info("tab_length:"+tab_length);
	var next_time = time_interval.begin + time_unite;
	var x =find_begin(lst_time, time_interval.begin);
	console.log("x:"+x);



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
				maximum = tmp;
		}
	}
	return (maximum);
}

function	draw_line(elem_id, from, to, max)
{
	if (groups_line[elem_id] != undefined)
	{
		if (groups_line[elem_id].isEmpty() == false)
			groups_line[elem_id].removeChildren();
	 	var tab_value = fill_me_the_val(elem_id);

	 	var max_val = max;
		var delta_x = (to.x - from.x) / tab_value.length;
		var delta_y = (to.y - from.y) / max_val;
		var path = new Path();
	    path.strokeColor = new Color({ hue: (elem_id / all_elem.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
	    path.strokeWidth = 3;

		for (var x in tab_value)
			path.add(new Point(from.x + x * delta_x, to.y - delta_y * tab_value[x]));
//		path.smooth();
		groups_line[elem_id].addChild(path);
		view.draw();
	}
	// console.log("END");
}

