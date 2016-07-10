// var groups_line = [];
// var tool_time;
// var group_grid;
// var grp_curseur;

// var	curseur_borne;
// var	curseur_unite;
// var coef_unite = 1;
// var global_unite_time;

// window.onresize = function onResize(event) {
// 	console.log(event);
// }

function histo_line_special_transition(elem_id, curseur_time_interval)
{
	// console.log(view.size);
	var from = new Point(30, view.size.height / 3);
    var to = new Point(view.size.width - 30, view.size.height - 40);

    if (group_grid == undefined)
    {
        group_grid = new Group();
        if (tool_time == undefined)
        {
        	curseur_time(from, to);
        }
    }
    else
    {
    	group_grid.removeChildren();
    	// group_grid = new group();
    }
    // group_grid.removeChildren();

    invert_state(parseInt(elem_id));

    actual_draw_special_transition(curseur_time_interval);
}


function    actual_draw_special_transition(curseur_time_interval)
{

 	var from = new Point(30, view.size.height * 2 / 3);
    var to = new Point(view.size.width - 30, view.size.height - 40);
    var max = 0;
    var nb_line = 10;
    max = define_max();
    //    alert("max:"+max);
    if (group_grid == undefined)
    {
        group_grid = new Group();
    }
    if (group_grid.isEmpty() == false)
    {
        group_grid.removeChildren();
    }
    if (max != 0)
    {
    	//	il faurdra aussi faire une grille adapter
        draw_the_grid(0, max, nb_line, group_grid, from, to);
        for(var x in all_elem)
        {
            draw_line_special_transition(parseInt(x), from, to, max, curseur_time_interval);
        }
    }
}


function	draw_line_special_transition(elem_id, from, to, max, curseur_time_interval)
{
	if (groups_line[elem_id] != undefined)
	{
		if (groups_line[elem_id].isEmpty() == false)
			groups_line[elem_id].removeChildren();
	 	var tab_value = fill_me_the_val_special_transition(elem_id, curseur_time_interval);



	 	var max_val = max;
		var delta_x = (to.x - from.x) / (tab_value.length - 1);
		var delta_y = (to.y - from.y) / max_val;
		var path = new Path();
	    path.strokeColor = new Color({ hue: (elem_id / all_elem.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
	    path.strokeWidth = 4;

		for (var x = 0; x < tab_value.length; x++)
			path.add(new Point(from.x + (x) * delta_x, to.y - delta_y * tab_value[x]));
		// path.smooth();
	//	path.simplify;
		groups_line[elem_id].addChild(path);
		view.draw();
	}
	// console.log("END");
}


function fill_me_the_val_special_transition(elem_id, curseur_time_interval)
{
	var tab_value = [];
	console.log(curseur_time_interval);
	var time_interval = curseur_time_interval.get_time_interval();
	var time_unite = get_time_unite();// si non on peu metre que le resu.ta est defini en fonciton d'une variable globale
	var lst_time = get_lst_time(elem_id);


	// console.log(lst_time);
	
	// print_time(lst_time);


	if (global_unite_time != undefined)
	{
		time_unite = global_unite_time;

	}
	// console.log("time_unite"+time_unite);

	var tab_length = Math.ceil((time_interval.end - time_interval.begin) / time_unite);
	// console.info("tab_length:"+tab_length);
	var next_time = time_interval.begin + time_unite;
	var x =find_begin(lst_time, time_interval.begin);
	// console.log("x:"+x);


	for(var i = 0; i < tab_length + 1; i++)
	{
		tab_value[i] = 0;
		while(lst_time[x] < next_time && lst_time[x] <= time_interval.end)
		{
			tab_value[i]++;
			x++;
		}
		next_time += time_unite;
	}
	tab_value[tab_length] = tab_value[tab_length - 1];

//	Pour lisser lesvaleur
	// for (var i = 0; i < 5; i++)
	// {
	// 	for (var x = 1; x < tab_value.length - 1; x++)
	//  	{
	//  		tab_value[x] = (tab_value[x - 1] + 0 * tab_value[x] + tab_value[x + 1]) / 2;
	//  		//path.add(new Point(from.x + (x) * delta_x, to.y - delta_y * tab_value[x]));
	//  	}
	//  	tab_value[tab_value.length - 1] = (tab_value[tab_value.length - 2]);
	//  }

	return (tab_value);
}

function histo_line(elem_id)
{
	// console.log(view.size);
	var from = new Point(30, view.size.height / 3);
    var to = new Point(view.size.width - 30, view.size.height - 40);

    if (group_grid == undefined)
    {
        group_grid = new Group();
        if (tool_time == undefined)
        {
        	curseur_time(from, to);
        }
    }
    else
    {
    	group_grid.removeChildren();
    	// group_grid = new group();
    }
    // group_grid.removeChildren();

    invert_state(parseInt(elem_id));

    actual_draw();
}




function	get_time_interval()
{
	var time_begin = Date.now() - 86400000 * 95;
	var time_end = Date.now() + 86400000;
	return ({begin:time_begin, end:time_end});
}

function	get_time_unite()
{
	return (1000 * 60 * 60);
}

function	get_lst_time(elem_id)
{
	var	lst_time = [];
	var lst_phrase;
	elem_id = parseInt(elem_id);

	lst_phrase = all_elem_stat[elem_id]['lst_senstenceId'];

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
		i++;
	// console.error("begin:"+i);
	// time_to_console(tab_val[i]);

	return (i);
}


function	get_max_nb(tab_value)
{

	var max = 0.001;

	for(var x = 0; x < tab_value.length; x++)
	{
		if (tab_value[x] >= max)
			max = tab_value[x];
	}
	return (max);
}

function 	print_time(lst_time)
{
	for (var x = 0; x < lst_time.length; x++)
	{
		time_to_console(lst_time[x]);
	}
}

function fill_me_the_val(elem_id)
{
	var tab_value = [];
	var time_interval = get_time_interval();
	var time_unite = get_time_unite();// si non on peu metre que le resu.ta est defini en fonciton d'une variable globale
	var lst_time = get_lst_time(elem_id);


	// console.log(lst_time);
	
	// print_time(lst_time);


	if (global_unite_time != undefined)
	{
		time_unite = global_unite_time;

	}
	// console.log("time_unite"+time_unite);

	var tab_length = Math.ceil((time_interval.end - time_interval.begin) / time_unite);
	// console.info("tab_length:"+tab_length);
	var next_time = time_interval.begin + time_unite;
	var x =find_begin(lst_time, time_interval.begin);
	// console.log("x:"+x);


	for(var i = 0; i < tab_length + 1; i++)
	{
		tab_value[i] = 0;
		while(lst_time[x] < next_time && lst_time[x] <= time_interval.end)
		{
			tab_value[i]++;
			x++;
		}
		next_time += time_unite;
	}
	tab_value[tab_length] = tab_value[tab_length - 1];

//	Pour lisser lesvaleur
	// for (var i = 0; i < 5; i++)
	// {
	// 	for (var x = 1; x < tab_value.length - 1; x++)
	//  	{
	//  		tab_value[x] = (tab_value[x - 1] + 0 * tab_value[x] + tab_value[x + 1]) / 2;
	//  		//path.add(new Point(from.x + (x) * delta_x, to.y - delta_y * tab_value[x]));
	//  	}
	//  	tab_value[tab_value.length - 1] = (tab_value[tab_value.length - 2]);
	//  }

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
	var maximum = 0.0001;
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


//	la fonction dessine, mais elle pourrait maitre a jour un path
function	draw_line(elem_id, from, to, max)
{
	if (groups_line[elem_id] != undefined)
	{
		if (groups_line[elem_id].isEmpty() == false)
			groups_line[elem_id].removeChildren();
	 	var tab_value = fill_me_the_val(elem_id);



	 	var max_val = max;
		var delta_x = (to.x - from.x) / (tab_value.length - 1);
		var delta_y = (to.y - from.y) / max_val;
		var path = new Path();
	    path.strokeColor = new Color({ hue: (elem_id / all_elem.length * 360), saturation: 0.7, brightness:0.8 , alpha:0.7});
	    path.strokeWidth = 4;

		for (var x = 0; x < tab_value.length; x++)
			path.add(new Point(from.x + (x) * delta_x, to.y - delta_y * tab_value[x]));
		// path.smooth();
		path.simplify;
		groups_line[elem_id].addChild(path);
		view.draw();
	}
	// console.log("END");
}



//			CURSEUR
function curseur_time(from, to)
{
    // console.log(all_elem_stat);
    //
    if (tool_time == undefined)
    {
        tool_time = new Tool();
    }

    tool_time.onMouseUp = function(event) {
        actual_draw();
    }

    if (grp_curseur == undefined)
    {
        grp_curseur = new Group();
    }
    draw_unite_curseur(from, to, grp_curseur);

}

function	darg_curseur(event)
{
	// console.warn("Coucou, c'est moi");
	var delta = this.data.to.x - this.data.from.x;
	var position = event.point.x - this.data.from.x;
	var get_time = get_unite_time_curseur;
	// var	unit;


	this.position.x = event.point.x;
	this.data.line[1].point.x = event.point.x;

	// coreciton au borne
	if (this.position.x < this.data.stop_begin)
	{
		this.position.x = this.data.stop_begin ;
		this.data.line[1].point.x = this.data.stop_begin;
	}
	if (this.position.x > this.data.stop_end)
	{
		this.position.x = this.data.stop_end;
		this.data.line[1].point.x = this.data.stop_end;
	}
	// unit = get_time(event, this);// ici on met sur une variale globale
	global_unite_time = get_time(event, this);
    
   // test();

    actual_draw();




	// definition du coefissiant en fontion de la position;

//	console.log(view);
}

function    actual_draw()
{

 	var from = new Point(30, view.size.height * 2 / 3);
    var to = new Point(view.size.width - 30, view.size.height - 40);
    var max = 0;
    var nb_line = 10;
    max = define_max();
    //    alert("max:"+max);
    if (group_grid == undefined)
    {
        group_grid = new Group();
    }
    if (group_grid.isEmpty() == false)
    {
        group_grid.removeChildren();
    }
    if (max != 0)
    {
    	//	il faurdra aussi faire une grille adapter
        draw_the_grid(0, max, nb_line, group_grid, from, to);
        for(var x in all_elem)
        {
            draw_line(parseInt(x), from, to, max);
        }
    }
}

// on prend les from to du graphique
function draw_unite_curseur(from, to, group)
{
	var hue = 60;
	var circle_style = {
		fillColor: new Color({ hue: (hue * 360), saturation: 0.7, brightness:0.8}),
		strokeColor: new Color({ hue: (hue * 360), saturation: 0.7, brightness:0.2}),
    	strokeWidth: 1
    };

   	var line_style = {
		strokeColor: new Color({ hue: (hue * 360), saturation: 0.7, brightness:0.8}),
	   	strokeWidth: 5
    };

    var inter_style = {
		strokeColor: new Color({ hue: (hue * 360), saturation: 0.7, brightness:0.8}),
		strokeWidth: 3,
		strokeCap : 'round'
    };

	var path 			= new Path();
	var begin 			= new Point(from.x, to.y + 30);
	var end 			= new Point(((to.x - from.x)) * 1 / 4 + from.x, to.y + 30);
	var large			= 7;
	var circle_begin	= new Path.Circle(begin, large);
	var circle_end		= new Path.Circle(end, large);

//	position clef
	// var minute			= new Path();
	var heure			= new Path();
	var jour			= new Path();
	var semaine			= new Path();
	var all				= new Path();

// (to.x - from.x) + to.x

	// minute.add(new Point(((to.x - from.x))  * 0 / 4 + from.x, to.y + 30 - 3));
	// minute.add(new Point(((to.x - from.x)) * 0 / 4 + from.x, to.y + 30 + 3));
	// minute.style = inter_style;

	heure.add(new Point(((to.x - from.x)) * 1 / 4 + from.x, to.y + 30 - 3));
	heure.add(new Point(((to.x - from.x)) * 1 / 4 + from.x, to.y + 30 + 3));
	heure.style = inter_style;

	jour.add(new Point(((to.x - from.x)) * 2 / 4 + from.x, to.y + 30 - 3));
	jour.add(new Point(((to.x - from.x)) * 2 / 4 + from.x, to.y + 30 + 3));
	jour.style = inter_style;

	semaine.add(new Point(((to.x - from.x)) * 3 / 4 + from.x, to.y + 30 - 3));
	semaine.add(new Point(((to.x - from.x)) * 3 / 4 + from.x, to.y + 30 + 3));
	semaine.style = inter_style;

	all.add(new Point(((to.x - from.x)) * 4 / 4 + from.x, to.y + 30 - 3));
	all.add(new Point(((to.x - from.x)) * 4 / 4 + from.x, to.y + 30 + 3));
	all.style = inter_style;


	path.style = line_style;
	circle_begin.style = circle_style;
	circle_end.style = circle_style;
	circle_end.data.line = path.segments;
	circle_end.data.from = from;
	circle_end.data.to = to;
	circle_end.data.stop_begin = begin.x;
	circle_end.data.stop_end = to.x;
	circle_end.data.init = parseInt(end.x);
	circle_end.data.name = "curseur";
	circle_end.onMouseDrag = darg_curseur;

	path.add(begin);
	path.add(end);


	// group.addChild(minute);
	group.addChild(heure);
	group.addChild(jour);
	group.addChild(semaine);
	group.addChild(all);
	group.addChild(path);

	group.addChild(circle_begin);
	group.addChild(circle_end);
//	console.log(group);

	view.draw();
}


function	get_unite_time_curseur(event, obj)
{
		var delta = obj.data.to.x - obj.data.from.x;
		var marge = 25;
		var position = event.point.x - obj.data.from.x;// - obj.data.from.x;
		var	interval = get_time_interval();
		var limit = [600000, 3600000 * 3, 86400000, 604800000, interval.end - interval.begin]//new Key_time();
		var delta_interval = 0;
		var delta_val = 0; 
		var coef = 1;
		var delta_result = 0;
		var result;
		for (var i = 0; i < 5; i++)
		{

			// detection de proximiter des point intermediares
			if (((position - marge) / delta) <= (i / 4) && ((position + marge) / delta) >= (i / 4))
			{
				// console.log("position:"+i);
				obj.position.x = obj.data.from.x + i * delta / 4;
				obj.data.line[1].point.x = obj.data.from.x + i * delta / 4;

			}
			//definition du coef
			if (i < 4)
			{
				delta_interval = (obj.data.from.x + (i + 1) * delta / 4) - ((obj.data.from.x + i * delta / 4));
				delta_val = obj.position.x - (obj.data.from.x + i * delta / 4);
				if (delta_val >= 0 && (delta_val / delta_interval) < 1)
				{
					delta_result = limit[i + 1] - limit[i]; 
					// console.log(limit.item);
					coef = (delta_val / delta_interval) ;
					// console.log("coef:"+coef);
					result = delta_result * coef + limit[i];
					// console.log("coef:"+coef+"	result:"+result);

				}
			}
		}

		if (result == undefined)
		{
			result = limit[4];
			// console.error("On a pas pu trouver de position pour:"+obj.position.x+" sur :");
		}
		return result;
}
