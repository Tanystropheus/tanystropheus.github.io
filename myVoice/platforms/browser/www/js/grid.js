function draw_the_grid(min, max, nb_line, group, pt_tl, pt_br)
{
    var size_data = max - min;
    var delta_val = size_data / nb_line;
    var coef = (pt_br.y - pt_tl.y) / (max - min);

    var y = 0.0;
    while (y <= size_data)
    {
        // console.log("y:"+y);
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

       	var test = (pt_br.y - (y * coef));
  //       if (test < 31)
  //       {
  //       	console.log("==========================================");
  //       	console.log("y:"+test);
  //       	console.log("max:"+max);
  //       	console.log(pt_br);
  //       	console.log("==========================================");

		// }

        y += delta_val;
        // console.log(p1);
        // console.log(p2);
 //       view.draw();
 //       console.log(path.segments[1]);
    }
    view.draw();
}