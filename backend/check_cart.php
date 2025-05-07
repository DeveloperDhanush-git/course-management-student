<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost", "root", "", "course_platform");

$data = json_decode(file_get_contents("php://input"));

$product_id = $data->product_id;
$user_id = $data->user_id; // assuming user_id is passed for identifying the user

$sql = "SELECT * FROM cart WHERE product_id = '$product_id' AND user_id = '$user_id'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Product already in the cart
    echo json_encode(["isInCart" => true]);
} else {
    // Product not in the cart
    echo json_encode(["isInCart" => false]);
}

$conn->close();
?>
