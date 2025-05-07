<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "course_platform");
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB Connection failed"]));
}

// Fetch only items not marked as deleted
$sql = "SELECT * FROM cart WHERE is_deleted = 0 ORDER BY created_at DESC";
$result = $conn->query($sql);

$courses = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

echo json_encode(["success" => true, "data" => $courses]);
$conn->close();
?>
