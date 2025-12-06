<?php
$url = $_GET["url"];

$cmd = "python3 check_connectivity.py " . escapeshellarg($url);

$output = shell_exec($cmd);

echo $output; // Python script already returns JSON
?>
