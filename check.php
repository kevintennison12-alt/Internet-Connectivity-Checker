<?php
$output = shell_exec("python3 internet_connectivity_check.py 2>&1");

if (strpos($output, "successful") !== false) {
    echo json_encode(["status" => "connected"]);
} else {
    echo json_encode(["status" => "disconnected"]);
}
?>
