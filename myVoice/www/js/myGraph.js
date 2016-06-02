/*
    cree une grille:
    	il faut le min et le max
    	on defini un nombre de ligne a tracer

    cree une ligne
    cree des point qui donne l'info du truc

*/

//*

function draw_the_grid(min, max, nb_line, group, pt_tl, pt_br)
{
    var size_data = max - min;
    var delta_val = size_data / nb_line;
    var coef = (pt_br.y - pt_tl.y) / (max - min);

    var y = 0.0;
    while (y <= size_data + 1)
    {
        console.log("y:"+y);
        var text = new PointText(new Point(0, pt_br.y));
        var path = new Path;
        var p1 = new Point();
        var p2 = new Point();

        p1.x = pt_tl.x;
        p1.y =  pt_br.y - (y * coef);

        p2.x = pt_br.x;
        p2.y =  pt_br.y - (y * coef);



        path.add(p1);
        path.add(p2);
        path.strokeColor = 'black';

        text.content = parseInt(y + min);
        text.position = new Point(pt_tl.x - 15, pt_br.y - (y * coef));
        text.fillColor = 'grey';
        group.addChild(text);
        group.addChild(path);
        y += delta_val;
        console.log(p1);
        console.log(p2);
 //       view.draw();
 //       console.log(path.segments[1]);
    }
    view.draw();
}

function get_minmax(tab, name)
{
    var min = tab[0][name];
    var max = tab[0][name];
	for (var x in tab)
	{
        if (tab[x][name] > max)
            max = tab[x][name];
        if (tab[x][name] < min)
            min = tab[x][name];
    }
        return ([min, max]);
}

function get_min(tab, name)
{
    var min = tab[0][name];
	for (var x in tab)
	{
        if (tab[x][name] < min)
            min = tab[x][name];
    }
        return (min);
}

function get_max(tab, name)
{
    var max = tab[0][name];
	for (var x in tab)
	{
        if (tab[x][name] > max)
            max = tab[x][name];
    }
        return (max);
}



function draw_histogram(elem_stat)
{
	// grid parameter

	var group = new Group();
	var copy = [];
	var max = 0;
	var min = 0;
	var pt_tl = new Point(30, 30);
	var pt_br = new Point(view.size.width - 30, 200);
	var nb_line = 7;
	// histograme parameter
	var column_size = 1;
	var marge = 0;
	var p1 = new Point();
	var p2 = new Point();
	var	coef = 1;

	copy = elem_stat.slice(0, elem_stat.length);
	copy.sort(function(a, b)
		{
			if (a != undefined && b != undefined)
			{
				return (a['nb_use'] - b['nb_use']);	
			}
			else
			{
				return (0);
			}
		});

//	console.log(elem_stat);
	// console.log(elem_stat.length);
	// console.log(copy.length);
	// for(var x in copy)
	// {
	// 	console.log("x:"+x);
	// 	console.log(copy[x]);
	// 	console.log(elem_stat[x]);
	// }
	min = copy[0]['nb_use'];
	max = copy[copy.length - 2]['nb_use'];
	coef = (max) / (pt_br.y - pt_tl.y);

	draw_the_grid(0, max, nb_line, group, pt_tl, pt_br);

	column_size = (pt_br.x - pt_tl.x) / copy.length;
	marge = column_size / 20;

	p1.x = pt_tl.x + marge;
	p2.x = pt_tl.x + column_size - marge;
	p2.y = pt_br.y;

	console.log("min:"+min);
	console.log("max:"+max);
	console.log("coef:"+min);
	console.log("pt_tl");
	console.log(pt_tl);
	console.log("pt_br");
	console.log(pt_br);
	console.log("column_size"+column_size);
	console.log("marge"+marge);

	for (var x in copy)
	{
		p1.y = pt_br.y - (copy[x]['nb_use'] / coef);
		var column = new Path.Rectangle(p1, p2);
		column.fillColor = 'black';
		p1.x += column_size;
		p2.x += column_size;
		group.addChild(column);
	}
	view.draw();
//	console.log(view);
}


//*

//*

function sort_elem(tab, x_name, y_name)
{

	// console.log("{===\n\n\n");
	// console.log(tab[0]);
	// console.log("\n\n\n}");

	//*
	var tmp;
	var min = tab[0][y_name];
	var max = tab[0][y_name];

	for (var x = 0; x < tab.lenght; x++)
	{
		if (tab[0][y_name] > max)
			 max = tab[0][y_name];
		else if (tab[0][y_name] < min)
			min = tab[0][y_name];

		for (var y = 0; y < tab.lenght - 1; y++)
		{
			if (tab[y][x_name] > tab[y + 1][x_name])
			{
				tmp = tab[y];
				tab[y] = tab[y + 1];
				tab[y + 1] = tmp;
			}
		}
	}
	//*/
	return ([min, max]);
}

// full ou oas
// tab, valu;
//tab {time, value, text}
function draw_line(tab, x_name, y_name)
{
	// il faut qu'il soit trier par time croissant sur x_name;
	var path = new Path();
	var dim = sort_elem(tab, x_name);


	for (var x in tab)
	{
		path.add(new Point(tab[x].item(x_name), tab[x].item(y_name)));
	}
		path.strokeColor = 'black';
	console.log(dim)
	view.draw();
	// on trace la ligne interactive avec un tableau en entrer et des chifre et du texte ou autre;
}

//function 

/*
function draw_pie_char(tab)
{

}


function draw_histograme()
{

}
*/