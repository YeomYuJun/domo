<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');

// POST 데이터 받기
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'ID와 비밀번호를 입력해주세요.']);
    exit;
}

$id = $data['id'];
$rawPw = $data['password']; // 평문 비밀번호

// PHP에서 SHA-256 해싱 처리
$hashedPw = hash('sha256', $rawPw);

// DB 연결
$servername = "localhost";
$username = "junggisongdomo";
$password = "s2352291";
$dbname = "junggisongdomo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB 연결 실패']);
    exit;
}

// UTF-8 설정
$conn->set_charset("utf8");

// admin 테이블에서 조회
$stmt = $conn->prepare("SELECT id FROM admin WHERE id = ? AND password = ?");
$stmt->bind_param("ss", $id, $hashedPw);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // 로그인 성공
    session_start();
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_id'] = $id;
    echo json_encode(['success' => true]);
} else {
    // 로그인 실패
    echo json_encode(['success' => false, 'message' => '잘못된 ID 또는 비밀번호입니다.']);
}

$stmt->close();
$conn->close();
?>
