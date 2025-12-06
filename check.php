<?php
header("Content-Type: application/json");

if (!isset($_POST["url"])) {
    echo json_encode(["status" => "error", "message" => "No URL received"]);
    exit;
}

$url = $_POST["url"];
$url = escapeshellarg($url);

$cmd = "python3 check_connectivity.py $url 2>&1";
$output = shell_exec($cmd);

echo $output;
?>
