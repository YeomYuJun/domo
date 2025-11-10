<?php
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');

// POST 데이터 받기
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['phone']) || !isset($data['join_year']) || !isset($data['payment_yn'])) {
    echo json_encode(['success' => false, 'message' => '필수 파라미터가 누락되었습니다.']);
    exit;
}

$name = $data['name'];
$phone = $data['phone'];
$join_year = $data['join_year'];
$payment_yn = $data['payment_yn'];

// payment_yn 값 검증 (Y 또는 N만 허용)
if ($payment_yn !== 'Y' && $payment_yn !== 'N') {
    echo json_encode(['success' => false, 'message' => 'payment_yn은 Y 또는 N만 가능합니다.']);
    exit;
}

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

// 해당 레코드가 존재하는지 확인
$checkSql = "SELECT COUNT(*) as cnt FROM domo WHERE name = ? AND phone = ? AND join_year = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("sss", $name, $phone, $join_year);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
$checkRow = $checkResult->fetch_assoc();

if ($checkRow['cnt'] == 0) {
    echo json_encode(['success' => false, 'message' => '해당하는 데이터를 찾을 수 없습니다.']);
    $checkStmt->close();
    $conn->close();
    exit;
}

$checkStmt->close();

// payment_yn 업데이트
$updateSql = "UPDATE domo SET payment_yn = ? WHERE name = ? AND phone = ? AND join_year = ?";
$updateStmt = $conn->prepare($updateSql);
$updateStmt->bind_param("ssss", $payment_yn, $name, $phone, $join_year);

if ($updateStmt->execute()) {
    if ($updateStmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'payment_yn이 성공적으로 업데이트되었습니다.']);
    } else {
        echo json_encode(['success' => true, 'message' => '변경사항이 없습니다. (이미 동일한 값)']);
    }
} else {
    echo json_encode(['success' => false, 'message' => '업데이트 실패: ' . $updateStmt->error]);
}

$updateStmt->close();
$conn->close();
?>
