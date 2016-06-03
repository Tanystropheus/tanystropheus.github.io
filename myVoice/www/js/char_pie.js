// Create a decahedron shaped path 
console.clear();
var group = new Group();
//group.onMouseDrag = move;



var tab = [];
var nb_part = parseInt(Math.random() * 10 + 2);
var size = 0;

function sort_number(tab_nb)
{
    var tmp;
    for (var i = 0; i < tab_nb.length - 1; i++)
    {
        for (var j = 0; j < tab_nb.length - i; j ++)
        {
            if (tab_nb[j] > tab_nb[j + 1])
            {
                tmp = tab_nb[j];
                tab_nb[j] = tab_nb[j + 1];
                tab_nb[j + 1] = tmp;
            }
        }
    }
}

for(var i = 0; i < nb_part; i++)
{
    tab[i] = parseInt(Math.random() * 100);
    size += tab[i];
}

sort_number(tab);

console.log("nb_part: "+nb_part);
console.log("size: "+size);


var centre = new Point(200, 150);
//group.addChild(centre);
var turning = new Point(0, 100);
var last_pos = new Point(0, 100);
var middle = new Point();
middle.length = last_pos.length;
turning.angle = 0;
last_pos.angle = 0;
var prev_size = 0;
var path = new Path();


for(var i = 0; i < nb_part; i++)
{
    prev_size += tab[i];
    path = new Path();
    path.fillColor = new Color({ hue: Math.random() * 360, saturation: 0.7, brightness:0.8 });
    path.strokeColor = 'black';
    
    turning.angle = (prev_size / size) * 360;
    middle.angle = (last_pos.angle + turning.angle) / 2;
    if (last_pos.angle * turning.angle < 0 || turning.angle <= last_pos.angle)
        middle.angle += 180;
    
    path.add(centre + last_pos);
    path.arcTo(centre + middle, centre + turning);
    path.add(centre);
    group.addChild(path);

//    path.onClick = get_biger;
    
    last_pos.x = turning.x;
    last_pos.y = turning.y;
}

function move(event)
{
    this.position += event.delta;
    centre = group.position;
//    console.log(group.position);
//    console.log(centre);
}

/*
function get_biger()
{
    
    this.segments[0].point = (this.segments[0].point - this.segments[2].point) * 1.1 + this.segments[2].point;
     this.segments[1].point = (this.segments[1].point - this.segments[2].point) * 1.1 + this.segments[2].point;
  console.log  (this.segments[0].point);
//    console.log(Object.name(this.sgments[0]));
}
*/
console.log(path);
    /*
    turning.angle = (prev_size / size) * 360;
    var circle = new Path.Circle(centre + turning, 4);
    circle.fillColor = 'blue';
    */