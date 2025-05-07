<?php
header('Content-Type: application/json');

$host = "localhost";
$username = "root";
$password = ""; // your database password
$database = "course_platform";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["count" => 0, "error" => "Database connection failed"]);
    exit();
}

// Assuming you have a `cart` table with a `deleted` column (0 = not deleted, 1 = deleted)
$sql = "SELECT COUNT(*) as count FROM cart WHERE is_deleted = 0";
$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(["count" => $row['count']]);
} else {
    echo json_encode(["count" => 0]);
}

$conn->close();
?>
