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

    var y = 0;
    while (y <= size_data + delta_val + 1)
    {
        console.log("y:"+y);
        var text = new PointText(new Point(0, pt_br.y));
        var path = new Path;
        var p1 = new Point();
        var p2 = new Point();

        p1.x = pt_tl.x;
        p1.y =  pt_br.y - (y);

        p2.x = pt_br.x;
        p2.y =  pt_br.y - y;



        path.add(p1);
        path.add(p2);
        path.strokeColor = 'black';

        text.content = parseInt(y + min);
        text.position = new Point(pt_tl.x - 15, pt_br.y - (y));
        text.fillColor = 'grey';
        group.addChild(text);
        group.addChild(path);
        y += delta_val;
                console.log(p1);
        console.log(p2);
            view.draw();
 //       console.log(path.segments[1]);
    }
    view.draw();
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

function sort_elem(tab, x_name)
{
	var tmp;

	for (var x = 0; x < tab.lenght; x++)
	{
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

/*
function draw_pie_char(tab)
{

}


function draw_histograme()
{

}
*/