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
$title = $data->title;
$price = $data->price;
$image = $data->image;
$teacher = $data->teacher;

// Check if the product already exists in the cart and is not deleted
$sql_check = "SELECT COUNT(*) FROM cart WHERE product_id = ? AND is_deleted = 0";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("i", $product_id);
$stmt_check->execute();
$stmt_check->bind_result($existingItemCount);
$stmt_check->fetch();
$stmt_check->close();

if ($existingItemCount > 0) {
    echo json_encode(["success" => false, "message" => "This course is already in the cart."]);
    $conn->close();
    exit();
}

// If not found, proceed to add the product to the cart
$sql = "INSERT INTO cart (product_id, title, price, image, teacher) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $product_id, $title, $price, $image, $teacher);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Item added to cart"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$conn->close();
?>
