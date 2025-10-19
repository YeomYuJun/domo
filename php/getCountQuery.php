<?php
error_reporting(0);
ini_set('display_errors', 0);

$servername = "localhost";
$username = "junggisongdomo";
$password = "s2352291";
$dbname = "junggisongdomo";

// 연결
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'DB 연결 실패']);
    exit;
}

$sql = "SELECT COUNT(*) AS count FROM domo WHERE join_year = 2025";
$result = $conn->query($sql);

if(!$result) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => $conn->error]);
    exit;
}

$count = 0;
if ($row = $result->fetch_assoc()) {
    $count = $row['count'];
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['count' => $count]);

$conn->close();
?>
