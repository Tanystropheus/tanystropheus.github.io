/*variable globale*/
var img_histo;
var pt_txt_histo;
var group_hist;



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


function display_img_histo(event)
{
	if (img_histo == undefined)
		img_histo = new Raster();
	if (pt_txt_histo == undefined)
		pt_txt_histo = new PointText();

	img_histo.source = all_elem[this.data]['elemurl'];
	img_histo.position = this.position;
	img_histo.strokeBounds = 'black';
	img_histo.style = {strokeColor: 'black',
    strokeWidth: 5};

	if (img_histo.scaling.x < 0.99)
		img_histo.scale(img_histo.size.width / all_elem[this.data]['width']);
	img_histo.scale(all_elem[this.data]['width'] / img_histo.size.width);
	// console.log('ON est laaaa');
	// console.log(img_histo);
	img_histo.position.y = this.segments[0].point.y + img_histo.width * img_histo.scaling.y / 2 + 10;
	pt_txt_histo.position.y = img_histo.position.y + img_histo.width * img_histo.scaling.y / 2 + 10;
	pt_txt_histo.position.x = img_histo.position.x;
	pt_txt_histo.content = all_elem[this.data]['taglst'];
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
