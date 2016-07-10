



function my_stat()
{


	var tabs_height = 50;
	var from		= new Point(30, 30);
	var to			= new Point(view.size.width - 30 , view.size.height - 30 - tabs_height - 30);

	var from_curs	= new Point(30,  view.size.height - 30 - tabs_height);
	var to_curs		= new Point(view.size.width - 30 , view.size.height - 30);		
	var test = new Histograme(from, to);
	
	the_tabs	= [new Usage_history(from, to), test];

	var tab_title = ["time line", "total use", "Camembert"];

	var tabs = new Tabs(the_tabs, tab_title, from_curs, to_curs);


	view.draw();
}


