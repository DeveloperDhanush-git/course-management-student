<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['product_id']) || !is_numeric($data['product_id'])) {
    echo json_encode(["success" => false, "message" => "Invalid product ID"]);
    exit();
}

$product_id = $data['product_id'];

$conn = new mysqli("localhost", "root", "", "course_platform");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit();
}

$stmt = $conn->prepare("UPDATE cart SET is_deleted = 1 WHERE product_id = ?");
$stmt->bind_param("i", $product_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Item removed from cart."]);
    } else {
        echo json_encode(["success" => false, "message" => "Item not found or already removed."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Error deleting item"]);
}

$stmt->close();
$conn->close();
?>
