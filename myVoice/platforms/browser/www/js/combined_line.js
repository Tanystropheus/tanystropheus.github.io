/*
-activer ou deactiver les element.
-definir le max.
-dessiner la grille.
-dessiner les element activer.
*/

/*
var all_elem = [];
var all_phrase = [];
var all_elem_stat = [];
var all_phrase_stat = [];
var groups_line = [];
var group_grid;
 var glob_max;


*/
var glob_line_max;

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

//	fonction qui recupere une plage de temps et une unite de temps
//pour un element
function	fill_the_value(elem_id)
{
	var tab_value = [];
	var time_interval = get_time_interval();
	var time_unite = get_time_unite();
	var lst_time = get_lst_time(elem_id);

	var tab_length = parseInt((time_interval.end - time_interval.begin) / time_unite);
			console.info("tab_length:"+tab_length);
	var next_time = time_interval.begin + time_unite;
	var x;


	x = find
	for(var i = 0; i < tab_length; i++)
	{
		tab_value[i] = 0;
		// console.log("diff:"+lst_time[x]+" < "+next_time+" = "+ (lst_time[x] < next_time) + " ("+(next_time - lst_time[x])+")");
		while(lst_time[x] < next_time && lst_time[x] < time_interval.end)
		{
			// alert("____INCREMENT____");
			tab_value[i]++;
//			x++;
		}
		next_time += time_unite;
	}

//	tab_value = [10, 967, 98, 6 ,9, 7, 987 ,0, 0, 9 ,76, 76, 87];
	return (tab_value);
}


function	define_glob_line_max()
{
	var max = 0;
	var	tab = [];
	var tmp = 0.001;

console.log("DEFINE GLOBAL NAX:");
	for (var x in all_elem)
	{
		if (groups_line[x] != undefined && groups_line[x].data == true)
		{
			console.log("entries:"+x);
			tab = fill_the_value(x);
			console.log(tab);
			tmp = get_max_nb(fill_the_value(x));
			console.log("Max:"+tmp);
			if (tmp > max)
			{
				max = tmp;
			}
		}
	}
	console.log("THE MAAAAAX:"+max);
	glob_line_max = max;
}

function	draw_grid_4_line()
{
	var	from = new Point(30, 30);
	var to = new Point(view.size.width - 30, view.size.height / 3);

	define_glob_line_max();
	if (group_grid == undefined)
	{
		group_grid = new Group();
	}
	else if (group_grid.isEmpty() == false)
	{
		group_grid.remove();
	}
//	draw_the_grid(0, glob_line_max, 10, group_grid, from, to);
//	glob_line_max;
	// for(var x in all_elem)
	// {
	// 	draw_active_line(x, from, to, glob_line_max);
	// }
}


function	draw_active_line(elem_id, from, to, max)
{
	var tab_value = fill_the_value(elem_id);
	var max_val = max;//get_max_nb(tab_value);
	var delta_x = (to.x - from.x) / tab_value.length;
	var delta_y = (to.y - from.y) / max_val;

	if (groups_line[elem_id] != undefined && groups_line[elem_id].data == true)
	{
		if (groups_line[elem_id].isEmpty() == false)
		{
			groups_line[elem_id].remove();
		}
		tab_value = fill_the_value(elem_id);
		var path = new Path();
	    path.strokeColor = new Color({ hue: (elem_id / all_elem.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
	    path.strokeWidth = 3;

		for (var x in tab_value)
		{
			path.add(new Point(from.x + (x * delta_x), to.y - delta_y * tab_value[x]));
		}
		path.smooth();
		groups_line[elem_id].addChild(path);
	}
	view.draw();
}

function	invert_state(elem_id)
{
	if (groups_line[elem_id] == undefined)
	{
		groups_line[elem_id] = new Path();
		groups_line[elem_id].data = true;
		console.warn("elem:"+elem_id+" is now ON");
	}
	else if (groups_line[elem_id].data == true)
	{
		groups_line[elem_id].remove();
		groups_line[elem_id].data = false;
		console.warn("elem:"+elem_id+" is now OFF");
	}
	else
	{
		groups_line[elem_id].remove();
		groups_line[elem_id] = new Path();
		groups_line[elem_id].data = true;
		console.warn("elem:"+elem_id+" is now ON");
	}
}
