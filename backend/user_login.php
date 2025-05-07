<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$database = "user_login";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$action = $_GET['action'] ?? '';

if ($action == "register") {
    $fullName = $data['fullName'] ?? '';
    $mobileNumber = $data['mobileNumber'] ?? '';
    $otp = $data['otp'] ?? '';

    if (!$fullName || !$mobileNumber || !$otp) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO users (fullName, mobileNumber, otp) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $fullName, $mobileNumber, $otp);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registration successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "User already exists"]);
    }

    $stmt->close();
}

// In your api.php, modify the login response to return all needed user data
elseif ($action == "login") {
    $mobileNumber = $data['mobileNumber'] ?? '';
    $otp = $data['otp'] ?? '';

    if (!$mobileNumber || !$otp) {
        echo json_encode(["status" => "error", "message" => "Mobile number and OTP required"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE mobileNumber = ? AND otp = ? AND is_delete = 0");
    $stmt->bind_param("ss", $mobileNumber, $otp);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        // Store all user data in session
        session_start();
        $_SESSION['user'] = $user;
        
        echo json_encode([
            "status" => "success", 
            "message" => "Login successful",
            "user" => $user // Return complete user data
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
    $stmt->close();
}

elseif ($action == "update") {
    $mobileNumber = $data['mobileNumber'] ?? '';
    $fullName = $data['fullName'] ?? '';
    $otp = $data['otp'] ?? '';

    if (!$mobileNumber) {
        echo json_encode(["status" => "error", "message" => "Mobile number is required"]);
        exit;
    }

    // First check if user exists
    $checkStmt = $conn->prepare("SELECT * FROM users WHERE mobileNumber = ? AND is_delete = 0");
    $checkStmt->bind_param("s", $mobileNumber);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit;
    }

    // Build the update query dynamically based on provided fields
    $updateFields = [];
    $params = [];
    $types = '';
    
    if (!empty($fullName)) {
        $updateFields[] = "fullName = ?";
        $params[] = $fullName;
        $types .= 's';
    }
    
    if (!empty($otp)) {
        $updateFields[] = "otp = ?";
        $params[] = $otp;
        $types .= 's';
    }
    
    if (empty($updateFields)) {
        echo json_encode(["status" => "error", "message" => "No fields to update"]);
        exit;
    }
    
    $updateFields[] = "modifiedOn = NOW()";
    $types .= 's'; // For mobileNumber parameter
    
    $query = "UPDATE users SET " . implode(", ", $updateFields) . " WHERE mobileNumber = ?";
    $params[] = $mobileNumber;
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    
    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success", 
            "message" => "User updated successfully",
            "updatedFields" => array_keys($data) // Return which fields were updated
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Update failed"]);
    }

    $stmt->close();
    $checkStmt->close();
}

elseif ($action == "delete") {
    $mobileNumber = $data['mobileNumber'] ?? '';

    if (!$mobileNumber) {
        echo json_encode(["status" => "error", "message" => "Mobile number required"]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE users SET is_delete = 1 WHERE mobileNumber = ?");
    $stmt->bind_param("s", $mobileNumber);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Delete failed"]);
    }

    $stmt->close();
}

elseif ($action == "get_users") {
    $mobileNumber = $data['mobileNumber'] ?? null;
    
    if ($mobileNumber) {
        $stmt = $conn->prepare("SELECT fullName, mobileNumber FROM users WHERE mobileNumber = ? AND is_delete = 0 AND is_active = 1");
        $stmt->bind_param("s", $mobileNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        if ($user) {
            echo json_encode(["status" => "success", "data" => $user]);
        } else {
            echo json_encode(["status" => "error", "message" => "User not found"]);
        }
        
        $stmt->close();
    } else {
        $result = $conn->query("SELECT fullName, mobileNumber FROM users WHERE is_delete = 0 AND is_active = 1");
        $users = [];

        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }

        echo json_encode(["status" => "success", "data" => $users]);
    }
}

else {
    echo json_encode(["status" => "error", "message" => "Invalid action"]);
}

$conn->close();
?>

