//	Variable globale:
var img;
var pt_txt;
var group_pie;

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


//	console.log('the point:')
	for(var i = 0; i < nb_part; i++)
	{
		if (elem_stat[i] != undefined)
		{
		    path = new Path();
		    path.fillColor = new Color({ hue: i / nb_part * 360, saturation: 0.7, brightness:0.8 });
		    path.strokeColor = new Color({ hue: i / nb_part * 360, saturation: 0.7, brightness:0.1 });

			curseur += elem_stat[i]['nb_use'];
			pt_new.angle = (curseur / size) * 360;
			mid.angle = (pt_new.angle + pt_last.angle) / 2;
		    if (pt_last.angle * pt_new.angle < 0 || pt_new.angle <= pt_last.angle)
		    {
		        mid.angle += 180;
		    }

		    p1.x = pt_last.x + centre.x;
		    p1.y = pt_last.y + centre.y;
//		    console.log(typeof(p1));
			path.add(p1);

			p2.x = centre.x + mid.x
			p2.y = centre.y + mid.y
			p3.x = centre.x + pt_new.x;
			p3.y = centre.y + pt_new.y;
			// console.log(typeof(p2));
			// console.log(typeof(p3));
			path.arcTo(p2, p3);
			path.add(centre);

			path.closed = true;
			path.onMouseDown = display_img_pie;
			path.data = elem_stat[i]['elemId'];

		    pt_last.x = pt_new.x;
		    pt_last.y = pt_new.y;
		}
	}
	//*/
	view.draw();

}