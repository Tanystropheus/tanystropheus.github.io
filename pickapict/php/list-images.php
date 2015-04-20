<?php
$files = array();
$curdir=0;
if($handle = opendir("../data"))
{
	$list=[];
	while(false !== ($file = readdir($handle)))
	{
		if(pathinfo($file, PATHINFO_EXTENSION)=="png")
		{
			$name=str_replace(".png","",$file);
			$list[]=$name;
			$curdir++;
		}
	}
	header('Content-Type: application/json');
	echo json_encode($list);
}
closedir($handle);
?>