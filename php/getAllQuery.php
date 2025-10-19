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

// UTF-8 설정
$conn->set_charset("utf8");

$sql = "SELECT * FROM domo";
$result = $conn->query($sql);

if(!$result) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => $conn->error]);
    exit;
}

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);

$conn->close();
?>

