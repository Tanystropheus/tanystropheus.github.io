<?php
header('Content-Type: text/cache-manifest');
echo "CACHE MANIFEST\n";
$hashes = "";
$dir = new RecursiveDirectoryIterator(".");
foreach(new RecursiveIteratorIterator($dir) as $file)
{
	if ($file->IsFile() && pathinfo($file, PATHINFO_EXTENSION)!="php" &&
	substr($file->getFilename(), 0, 1) != ".")
	{
		echo $file . "\n";
		$hashes .= md5_file($file);
	}
}
echo "NETWORK:\n*\n";

echo "# Hash: " . md5($hashes) . "\n";
?>