<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$host = "localhost";
$username = "root"; // your DB username
$password = ""; // your DB password
$dbname = "course_platform"; // database name

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $stmt = $conn->prepare("INSERT INTO course_details (title, category, tag, price, rating, reviews, lessons, teacher, teacherImage, image, purchaseDate, video, categoryType, description, totalCourses, students, teachertype, link, profession, workrole, doctype) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");

    $stmt->bind_param("sssddiisssssssissssss",
    $data['title'], 
    $data['category'], 
    $data['tag'], 
    $data['price'], 
    $data['rating'], 
    $data['reviews'], 
    $data['lessons'], 
    $data['teacher'], 
    $data['teacherImage'], 
    $data['image'], 
    $data['purchaseDate'], 
    $data['video'], 
    $data['categoryType'], 
    $data['description'], 
    $data['totalCourses'], 
    $data['students'], 
    $data['teachertype'], 
    $data['link'], 
    $data['profession'], 
    $data['workrole'], 
    $data['doctype']
);


    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Data inserted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Insertion failed"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}

$conn->close();
?>
