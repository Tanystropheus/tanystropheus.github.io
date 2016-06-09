/*
	-De base le curseur ne modifie rien
	-Si il modifie un truc, 
*/
var	curseur_borne;
var	curseur_unite;
var coef_unite = 1;

function	darg_curseur(event)
{
	this.position.x += event.delta.x;
	this.data.line[1].point.x += event.delta.x;
	if (this.position.x < this.data.stop)
	{
		this.position.x = this.data.stop + 5;
		this.data.line[1].point.x = this.data.stop + 5;
	}
	if (this.position.x > view.size.width)
	{
		this.position.x = view.size.width;
		this.data.line[1].point.x = view.size.width;
	}
//	console.log(view);
}

function 	resize()
{
//	alert(this.position.x);
	console.log("mouahaha");
	console.log(this);
	var	delta = this.data.position.x - this.data.init;
//	console.log("delta");
//	console.log(delta);
//	console.log(this.data.init);
	this.position.x = this.data.init;//this.data.init;
	this.data.line[1].point.x = this.data.init;//this.data.init;
}

// function onMouseUp(event)
// {
// 	console.log(event);
// }


// on prend les from to du graphique
function draw_unite_curseur(from, to, group)
{
	// if (group == undefined)
	// 	group = new Group();
	var circle_style = {
		fillColor: new Color({ hue: (60 * 360), saturation: 0.7, brightness:0.8}),
		strokeColor: new Color({ hue: (60 * 360), saturation: 0.7, brightness:0.2}),
    	strokeWidth: 1
    };

   	var line_style = {
	//	fillColor: new Color({ hue: (60 * 360), saturation: 0.7, brightness:0.8 , alpha:0.7}),
		strokeColor: new Color({ hue: (60 * 360), saturation: 0.7, brightness:0.8}),
	   	strokeWidth: 5
    };

   var tool			= new Tool();
//   console.log(tool);


	var path 			= new Path();
	var begin 			= new Point(from.x, to.y + 30);
	var end 			= new Point(to.x / 3, to.y + 30);
	var large			= 7;
	var circle_begin	= new Path.Circle(begin, large);
	var circle_end		= new Path.Circle(end, large);

	tool.data			= circle_end;

	
 tool.onMouseUp = function(event)
{
//	console.log(event);
//	console.log(this.data.resize);
	this.data.resize();
}


	path.style = line_style;
	circle_begin.style = circle_style;
	circle_end.style = circle_style;
//	path.segments[1].point.x += 100;
	circle_end.data.line = path.segments;
	circle_end.data.stop = begin.x;
	circle_end.data.init = parseInt(end.x);
	circle_end.data.name = "curseur";

	circle_end.onMouseDrag = darg_curseur;
	circle_end.onMouseUp = tool.onMouseUp;
	circle_end.data.resize = resize;



	path.add(begin);
	path.add(end);
	// console.log(path.segments);
	// console.log(path.segments[1]);
//	circle_end.data[1].point.x += 100;
//	console.log(circle_end.data[1].point.x);
	// circle_end.data.point.x += 100;
//	path.add(circle_begin);
//	path.add(circle_end);
//	group.removeChildren();


	group.addChild(path);
	group.addChild(circle_begin);
	group.addChild(circle_end);
//	console.log(group);

	view.draw();
}
