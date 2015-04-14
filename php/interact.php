<?php

include $_SERVER['DOCUMENT_ROOT']."interact/php/base.php";

session_start();
error_reporting(E_ALL);
ini_set('display_errors', 'On');

$connection=mysqli_connect($dbhost, $dbuser, $dbpass,$dbname) or die("MySQL Error 1: " . mysql_error());

if(isset($_GET["action"]))
{
	switch($_GET["action"])
	{
		case "save":
			save($_GET);
			break;
		case "load":
			load($_GET);
			break;
		case "remote_address":
			remote_address();
			break;
	}
}

function save($args)
{
	global $connection;
	global $dbname;
	
	$q="INSERT INTO ".$dbname.".KeyValue (myOrigin, myKey, myValue) VALUES('"
		.$args["origin"]."','"
		.$args["key"]."','"
		.$args["value"]."')";
	$result = mysqli_query($connection,$q);

	header('Content-Type: application/json');
	if($result) {
		echo '{"result":"success"}';
	} else {
		echo '{"result":"error"}';
	}
}

function load($args)
{
	global $connection;
	global $dbname;
	$arr=array();
	
	$q="SELECT * FROM ".$dbname.".KeyValue WHERE "
		." myOrigin = '".$args["origin"]."' AND"
		." myKey = '".$args["key"]."'";
	$result = mysqli_query($connection,$q);

	while($row = mysqli_fetch_assoc($result)) {
		$row["myValue"]=json_decode($row["myValue"]);
		array_push($arr,$row);
	}

	header('Content-Type: application/json');
	echo json_encode($arr);

	mysqli_free_result($result);
}
function remote_address()
{
	echo $_SERVER['REMOTE_ADDR'];
}
?>