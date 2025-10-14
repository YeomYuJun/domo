<?php
$servername = "localhost";
$username = "junggisongdomo";
$password = "s2352291";
$dbname = "junggisongdomo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("DB 연결 실패: " . $conn->connect_error);
}

$sql = "SELECT * FROM domo";
$result = $conn->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($data);

$conn->close();
?>

