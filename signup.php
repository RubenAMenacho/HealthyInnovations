//Signup.php

<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');


include 'db_connect.php';

$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
// Add more fields as necessary

// Check if user already exists
$checkUser = $conn->prepare("SELECT email FROM users WHERE email = ?");
$checkUser->bind_param("s", $email);
$checkUser->execute();
$checkUser->store_result();
if ($checkUser->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'User already exists.']);
    exit;
}
$checkUser->close();

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $password);
// Add more parameters as necessary
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to create user.']);
}
$stmt->close();
$conn->close();
?>
