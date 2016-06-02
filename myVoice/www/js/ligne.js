    -r-ri-i



// Define a random point in the view, which we will be moving
// the text item towards.

var destination = Point.random() * view.size;


var    tab_text = [
    "Bonjour",
    "red",
    "notre",
    "maman",
    "boire",
    "jouer",
    "cache cache",
    "Ton pere",
    "mouahahaha",
    "bigoudi",
];

    var tab_couleur =[
    '#0000FF',
    '#6600FF',
    '#FF00FF',
    '#CC3300',
    '#CC6699',
    '#3399FF',
    '#FF0099',
    '#333300',
    '#FFFF33',
    '#006633',
];

//*
// Create a centered text item at the center of the view:
var text = new PointText({
    point: view.center,
    justification: 'center',
    fontSize: 30,
    fillColor: 'black'
});

init_circle();

function enter(event) {
    destination.x = this.position.x;
    destination.y = this.position.y + this.length / (3.14 * 2) + 20;
    text.content = this.text;
}

function onFrame(event) {
    var vector = destination - text.position;
    text.position += vector / 10;
}


    
function    init_circle()
{
    the_path = new Path();
    var nb_point = 30;
   
    var size_circle = 5;
//console.log(view.size);
    for(var i = 0; i < nb_point - 1; i++)
    {
        var y = Math.random() * 200 + 50;
        var circle = new Path.Circle(new Point((i + 1) * (view.size.width / (nb_point + 2)), y), size_circle);
        
        circle.data = i;
        the_path.add(new Point((i + 1) * (view.size.width / (nb_point + 2)), y));
        circle.text = tab_text[circle.id % 10];
        circle.colore = tab_couleur[circle.id % 10];
        circle.fillColor = circle.colore;
        //circle.onClick = enter;
        circle.onMouseDrag = function(event)
        {
            var segment = the_path.segments[this.data];
            this.position.y += event.delta.y;
            console.log(segment + "__" + event.data);
            the_path.segments[this.data].point.y += event.delta.y;
            the_path.smooth();
 //           the_path.segments[i].y += event.delta.y;
  //          the_path.segments[i].remove();
        };
   }
 //  alert(the_path);
   the_path.strokeColor = 'black';
   the_path.smooth();
}
//*/
/*
    L'utilisation d'une image
  
*/