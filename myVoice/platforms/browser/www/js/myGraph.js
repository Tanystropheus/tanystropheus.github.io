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
        if (tab[x] != undefined &&  tab[x][name] < min)
            min = tab[x][name];
    }
        return (min);
}

function get_max(tab, name)
{
    var max = 0;
	for (var x in tab)
	{
        if (tab[x] != undefined && tab[x][name] > max)
            max = tab[x][name];
    }
        return (max);
}


var img;
var group_hist;
var pt_txt;
var group_pie;

function display_img_histo(event)
{
	if (img == undefined)
		img = new Raster();
	if (pt_txt == undefined)
		pt_txt = new PointText();

	img.source = all_elem[this.data]['elemurl'];
	img.position = this.position;
	img.strokeBounds = 'black';
	img.style = {strokeColor: 'black',
    strokeWidth: 5};

	if (img.scaling.x < 0.99)
		img.scale(img.size.width / all_elem[this.data]['width']);
	img.scale(all_elem[this.data]['width'] / img.size.width);
	console.log('ON est laaaa');
	console.log(img);
	img.position.y = this.segments[0].point.y + img.width * img.scaling.y / 2 + 10;
	pt_txt.position.y = img.position.y + img.width * img.scaling.y / 2 + 10;
	pt_txt.position.x = img.position.x;
	pt_txt.content = all_elem[this.data]['taglst'];
}

function draw_histogram(elem_stat)
{
	if (group_hist == undefined)
	{
		group_hist = new Group();
	}
	group_hist.removeChildren();
	// variable de la grille
	var copy = [];
	var max = 0;
	var min = 0;
	var pt_tl = new Point(30, 30);
	var pt_br = new Point(view.size.width - 30, 200);
	var nb_line = 7;
	// varaible de l'histograme
	var column_size = 1;
	var marge = 0;
	var p1 = new Point();
	var p2 = new Point();
	var	coef = 1;

	copy = elem_stat.slice(0, elem_stat.length);
	copy.sort(function(a, b)
		{
//			return 0;
			if (a != undefined && b != undefined)
				return (a['nb_use'] - b['nb_use']);	
			else
				return (0);
		});

	min = copy[0]['nb_use'];
	max = get_max(elem_stat, 'nb_use');
	coef = (max) / (pt_br.y - pt_tl.y);

	draw_the_grid(0, max, nb_line, group_hist, pt_tl, pt_br);

	column_size = (pt_br.x - pt_tl.x) / copy.length;
	marge = column_size / 10;

	p1.x = pt_tl.x + marge;
	p2.x = pt_tl.x + column_size - marge;
	p2.y = pt_br.y;

	for (var x in copy)
	{
		p1.y = pt_br.y - (copy[x]['nb_use'] / coef);
		var column = new Path.Rectangle(p1, p2);
		column.data = copy[x]['elemId'];
		column.fillColor = {hue: (copy[x]['elemId'] / copy.length) * 360, saturation: 0.3, brightness: 0.9, alpha: 0.9};
		column.strokeColor = {hue: (copy[x]['elemId'] / copy.length) * 360, saturation: 0.3, brightness: 0.5};
		column.onMouseDown = display_img_histo;
		p1.x += column_size;
		p2.x += column_size;
		group_hist.addChild(column);
	}
	view.draw();
}




// function draw_char_pie(elem_stat)
// {
// 	var	size = get_sum(elem_stat, 'nb_use');
// 	var curseur = 0;
// 	var centre = new Point(150, 150);
// 	var rayon = 70;
// 	var pt1 = new Point(1, 0);
// 	var mid = new Point(1, 0);
// 	var pt2 = new Point(1, 0);

// 	if (group_pie == undefined)
// 		group_pie = new group();

// 	for (var x in elem_stat)
// 	{
// 		var path = new Path();
// 		pt1.an
// 		// la on va faire tout les truc du machin;
// 	}
// }

// function	draw_line()
// {
// 	// laon reprend un peu le meme system que pour les truc 
// }


// // fonction de tri/organisation des donner





// 	if (img == undefined)
// 		img = new Raster();
// 	if (pt_txt == undefined)
// 		pt_txt = new PointText();

// 	img.source = all_elem[this.data]['elemurl'];
// 	img.position = this.position;
// 	img.strokeBounds = 'black';
// 	img.style = {strokeColor: 'black',
//     strokeWidth: 5};

// 	if (img.scaling.x < 0.99)
// 		img.scale(img.size.width / all_elem[this.data]['width']);
// 	img.scale(all_elem[this.data]['width'] / img.size.width);
// 	console.log('ON est laaaa');
// 	console.log(img);
// 	img.position.y = this.segments[0].point.y + img.width * img.scaling.y / 2 + 10;
// 	pt_txt.position.y = img.position.y + img.width * img.scaling.y / 2 + 10;
// 	pt_txt.position.x = img.position.x;
// 	pt_txt.content = all_elem[this.data]['taglst'];



function get_sum(tab, name)
{
	var size = 0;

	for (x in tab)
	{
		if (tab[x] != undefined)
			size += tab[x][name];
	}
	return (size);
}

function display_img_pie(event)
{
	var pos_image = new Point(300, 300);
	// la on afiche une image et un text tout le temps au meme endroi;
	if (img == undefined)
		img = new Raster();
	if (pt_txt == undefined)
		pt_txt = new PointText();



	img.position = pos_image; // la il faudrai definir une place fix en fonction du centre du truc donc le dernier element;
	if (img.scaling.x < 0.99)
		img.scale(img.size.width / all_elem[this.data]['width']);
	img.source = all_elem[this.data]['elemurl'];
	img.scale(all_elem[this.data]['width'] / img.size.width);



	//img.position.y = this.segments[0].point.y + img.width * img.scaling.y / 2 + 10;
	pt_txt.position.y = img.position.y + img.width * img.scaling.y / 2 + 10;
	pt_txt.position.x = img.position.x;
	pt_txt.content = all_elem[this.data]['taglst'];
}

function draw_pie_chart(elem_stat)
{

	/*
var path = new Path();
path.strokeColor = 'black';
path.closed = true;

var firstPoint = new Point(30, 75);
path.add(firstPoint);

// The point through which we will create the arc:
var throughPoint = new Point(40, 40);

// The point at which the arc will end:
var toPoint = new Point(130, 75);

// Draw an arc through 'throughPoint' to 'toPoint'
path.arcTo(throughPoint, toPoint);

// Add a red circle shaped path at the position of 'throughPoint':
var circle = new Path.Circle(throughPoint, 3);
circle.fillColor = 'red';
	//*/


//*
	var	size = get_sum(elem_stat, 'nb_use');
	var curseur = 0;
	var centre = new Point(200, 350);
	var rayon = 70;
	var pt_last = new Point(rayon, 0);
	var mid = new Point(rayon, 0);
	var pt_new = new Point(rayon, 0);
	var nb_part = elem_stat.length;
	var path;
	var p1 = new Point();
	var p2 = new Point();
	var p3 = new Point();

	this.onMouseDown = display_img_pie;

	if (group_pie == undefined)
	{
		group_pie = new Group();
	}
	group_pie.removeChildren();


	pt_new.angle = 20;
	mid.angle = (pt_new.angle + pt_last.angle) / 2;


	console.log('the point:')
    // console.log(p1);
    // console.log(p2);
    // console.log(p3);
    // console.log(centre);

//	path = news Path.Arc(p1, p2, p3);
//	path.add(pt_last);
//	path.Arc(p1, p2, p3);
//	path.add(centre);
	// path.position.x += centre.x;
	// path.position.y += centre.y;
	
	for(var i = 0; i < nb_part; i++)
	{
		if (elem_stat[i] != undefined)
		{
		    path = new Path();
		    path.fillColor = new Color({ hue: i / nb_part * 360, saturation: 0.7, brightness:0.8 });
		    path.strokeColor = new Color({ hue: i / nb_part * 360, saturation: 0.7, brightness:0.1 });

	//		var firstPoint = new Point(30, 75);
			curseur += elem_stat[i]['nb_use'];
			pt_new.angle = (curseur / size) * 360;
			mid.angle = (pt_new.angle + pt_last.angle) / 2;
		    if (pt_last.angle * pt_new.angle < 0 || pt_new.angle <= pt_last.angle)
		    {
		        mid.angle += 180;
		    }

		    //p3 = pt_last + centre;
		    p1.x = pt_last.x + centre.x;
		    p1.y = pt_last.y + centre.y;
		    console.log(typeof(p1));
			path.add(p1);

			// The point through which we will create the arc:
//			var throughPoint = new Point(40, 40);

			// The point at which the arc will end:
//			var toPoint = new Point(130, 75);

			// Draw an arc through 'throughPoint' to 'toPoint'
			//p1 = centre + mid;

			p2.x = centre.x + mid.x
			p2.y = centre.y + mid.y
			p3.x = centre.x + pt_new.x;
			p3.y = centre.y + pt_new.y;
			console.log(typeof(p2));
			console.log(typeof(p3));
			path.arcTo(p2, p3);
			path.add(centre);

			path.closed = true;
			path.onMouseDown = display_img_pie;
			path.data = elem_stat[i]['elemId'];


			// // Add a red circle shaped path at the position of 'throughPoint':
			// var circle = new Path.Circle(throughPoint, 3);
			// circle.fillColor = 'red';
			

			/*
		    curseur += elem_stat[i]['nb_use'];
		    path = new Path();
		    path.closed = true;
		    path.fillColor = 'black';//new Color({ hue: i / nb_part * 360, saturation: 0.7, brightness:0.8 });
		    path.strokeColor = 'red';//new Color({ hue: i / nb_part * 360, saturation: 0.7, brightness:0.1 });
		    
		    pt_new.angle = (curseur / size) * 360;
		    mid.angle = (pt_new.angle + pt_last.angle) / 2;
		    if (pt_last.angle * pt_new.angle < 0 || pt_new.angle <= pt_last.angle)
		    {
		        mid.angle += 180;
		    }
		    
		    p1 = centre + pt_last;
		    p2 = centre + mid;
		    p3 = centre + pt_new;

		    path.add(p1);
		    path.arcTo(p2, p3);
		    path.add(centre);
		    if (elem_stat[i] != undefined)
		   		path.data = elem_stat[i]['elemId'];
		    path.onMouseDown = display_img_pie;
		    group_pie.addChild(path);
		    
		    pt_last.x = pt_new.x;
		    pt_last.y = pt_new.y;
		    */
		    pt_last.x = pt_new.x;
		    pt_last.y = pt_new.y;
		}
	}
	//*/
	view.draw();
	// for (var x in group_pie.children)
	// {
		console.log(group_pie);
	// }
}