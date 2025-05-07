<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Database credentials
$host = "localhost";
$username = "root";
$password = "";
$dbname = "course_management";

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

// Query to fetch all courses with the additional fields
$sql = "SELECT 
            id, title, category, level, language, timezone, startDate, endDate, 
            description, teacher, image, status, is_modified_on, 
            announcements, assignments, modules, settings, video, tag, price, rating, reviews, 
            categoryType, totalCourses, students, teachertype, link, profession, workrole, 
            doctype, location, role, lessons, completed, total, teacherImage, 
            rubrics, grades, grading_scales
        FROM courses";

$result = $conn->query($sql);

$courses = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = [
            "id" => $row['id'],
            "title" => $row['title'],
            "category" => $row['category'],
            "level" => $row['level'],
            "language" => $row['language'],
            "timezone" => $row['timezone'],
            "startDate" => $row['startDate'],
            "endDate" => $row['endDate'],
            "description" => $row['description'],
            "teacher" => $row['teacher'],
            "image" => $row['image'],
            "status" => $row['status'],
            "isModifiedOn" => $row['is_modified_on'],
            "announcements" => json_decode($row['announcements'], true),
            "assignments" => json_decode($row['assignments'], true),
            "modules" => json_decode($row['modules'], true),
            "settings" => json_decode($row['settings'], true),
            "video" => $row['video'],
            "tag" => $row['tag'],
            "price" => $row['price'],
            "rating" => $row['rating'],
            "reviews" => $row['reviews'],
            "categoryType" => $row['categoryType'],
            "totalCourses" => $row['totalCourses'],
            "students" => $row['students'],
            "teachertype" => $row['teachertype'],
            "link" => $row['link'],
            "profession" => $row['profession'],
            "workrole" => $row['workrole'],
            "doctype" => $row['doctype'],
            "location" => $row['location'],
            "role" => $row['role'],
            "lessons" => $row['lessons'],
            "completed" => $row['completed'],
            "total" => $row['total'],
            "teacherImage" => $row['teacherImage'],
            "rubrics" => json_decode($row['rubrics'], true),
            "grades" => json_decode($row['grades'], true),
            "gradingScales" => json_decode($row['grading_scales'], true)
        ];
    }
    echo json_encode(["success" => true, "data" => $courses]);
} else {
    echo json_encode(["success" => false, "message" => "No courses found"]);
}

$conn->close();
?>
