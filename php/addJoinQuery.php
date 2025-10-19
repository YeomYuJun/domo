<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');

// POST 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'POST 요청만 허용됩니다']);
    exit;
}

// JSON 데이터 파싱
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 필수 데이터 검증
if (!isset($data['name']) || !isset($data['phone']) || !isset($data['role'])) {
    echo json_encode(['success' => false, 'error' => '필수 데이터가 누락되었습니다']);
    exit;
}

$name = trim($data['name']);
$phone = trim($data['phone']);
$role = trim($data['role']);
$join_year = isset($data['join_year']) ? intval($data['join_year']) : 2025;
$payment_yn = isset($data['payment_yn']) ? trim($data['payment_yn']) : 'N';

// 데이터베이스 연결
$servername = "localhost";
$username = "junggisongdomo";
$password = "s2352291";
$dbname = "junggisongdomo";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'DB 연결 실패']);
    exit;
}

// UTF-8 설정
$conn->set_charset("utf8");

// 중복 체크 (같은 이름과 전화번호가 이미 있는지 확인)
$check_sql = "SELECT COUNT(*) as cnt FROM domo WHERE name = ? AND phone = ? AND join_year = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("ssi", $name, $phone, $join_year);
$check_stmt->execute();
$check_result = $check_stmt->get_result();
$check_row = $check_result->fetch_assoc();

if ($check_row['cnt'] > 0) {
    echo json_encode(['success' => false, 'error' => '이미 신청하신 정보입니다']);
    $check_stmt->close();
    $conn->close();
    exit;
}
$check_stmt->close();

// INSERT 쿼리 준비
$sql = "INSERT INTO domo (name, phone, role, join_year, payment_yn) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'error' => '쿼리 준비 실패: ' . $conn->error]);
    $conn->close();
    exit;
}

$stmt->bind_param("sssis", $name, $phone, $role, $join_year, $payment_yn);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => '신청이 완료되었습니다', 'insert_id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'error' => '데이터 삽입 실패: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
