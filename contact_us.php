<?php
// Database configuration
$db_hostname = "127.0.0.1";
$db_username = "root";
$db_password = "";
$db_name = "tour";

// Create a connection to the database
$conn = mysqli_connect($db_hostname, $db_username, $db_password, $db_name);

// Check if the connection was successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = mysqli_real_escape_string($conn, trim($_POST['name']));
    $email = mysqli_real_escape_string($conn, trim($_POST['email']));
    $phone = mysqli_real_escape_string($conn, trim($_POST['phone']));
    $subject = mysqli_real_escape_string($conn, trim($_POST['subject']));
    $message = mysqli_real_escape_string($conn, trim($_POST['message']));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: thank_you.html");
        exit();
    }

    // Validate phone number (assuming it should be numeric and 10 digits long)
    if (!preg_match('/^[0-9]{10}$/', $phone)) {
        header("Location: thank_you.html");
        exit();
    }

    // Prepare and execute the SQL query
    $sql = "INSERT INTO contact (Name, Email, Phone, Subject, Message) VALUES (?, ?, ?, ?, ?)";

    // Use prepared statements to prevent SQL injection
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, 'sssss', $name, $email, $phone, $subject, $message);

    if (mysqli_stmt_execute($stmt)) {
        header("Location: thank_you.html");
        exit();
    } else {
        echo "Error: " . mysqli_stmt_error($stmt);
    }

    // Close the statement and database connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    // Not a POST request
    header("Location: thank_you.html");
    exit();
}
?>
