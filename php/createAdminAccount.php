<?php
// domo4321의 SHA-256 해시값 계산 (PHP에서 해싱)
$rawPassword = 'domo4321';
$hashedPassword = hash('sha256', $rawPassword);

echo "<h2>관리자 계정 설정</h2>";
echo "<p><strong>평문 비밀번호:</strong> " . $rawPassword . "</p>";
echo "<p><strong>SHA-256 해시:</strong> " . $hashedPassword . "</p><hr>";

// DB 연결
$servername = "localhost";
$username = "junggisongdomo";
$password = "s2352291";
$dbname = "junggisongdomo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("DB 연결 실패: " . $conn->connect_error);
}

$conn->set_charset("utf8");

// admin 테이블 생성 (없으면)
$createTableSql = "CREATE TABLE IF NOT EXISTS admin (
    id VARCHAR(50) PRIMARY KEY,
    password VARCHAR(64) NOT NULL
)";

if ($conn->query($createTableSql)) {
    echo "<p style='color:green;'>✓ admin 테이블 확인/생성 완료</p>";
} else {
    echo "<p style='color:red;'>✗ 테이블 생성 실패: " . $conn->error . "</p>";
}

// 기존 데이터 확인
$checkSql = "SELECT * FROM admin WHERE id = 'domo'";
$result = $conn->query($checkSql);

if ($result->num_rows > 0) {
    // 이미 존재하면 업데이트
    $updateSql = "UPDATE admin SET password = ? WHERE id = 'domo'";
    $stmt = $conn->prepare($updateSql);
    $stmt->bind_param("s", $hashedPassword);

    if ($stmt->execute()) {
        echo "<p style='color:green;'>✓ 관리자 계정 업데이트 완료</p>";
    } else {
        echo "<p style='color:red;'>✗ 업데이트 실패: " . $stmt->error . "</p>";
    }
    $stmt->close();
} else {
    // 없으면 삽입
    $insertSql = "INSERT INTO admin (id, password) VALUES (?, ?)";
    $stmt = $conn->prepare($insertSql);
    $adminId = 'domo';
    $stmt->bind_param("ss", $adminId, $hashedPassword);

    if ($stmt->execute()) {
        echo "<p style='color:green;'>✓ 관리자 계정 생성 완료</p>";
    } else {
        echo "<p style='color:red;'>✗ 생성 실패: " . $stmt->error . "</p>";
    }
    $stmt->close();
}

// 저장된 데이터 확인
echo "<hr><h3>저장된 관리자 정보</h3>";
$verifySql = "SELECT id, password FROM admin WHERE id = 'domo'";
$verifyResult = $conn->query($verifySql);

if ($verifyResult->num_rows > 0) {
    $row = $verifyResult->fetch_assoc();
    echo "<p><strong>ID:</strong> " . $row['id'] . "</p>";
    echo "<p><strong>Password (해시):</strong> " . $row['password'] . "</p>";
    echo "<hr><p style='color:blue;'><strong>로그인 정보:</strong><br>ID: domo<br>Password: domo4321</p>";
} else {
    echo "<p style='color:red;'>저장된 데이터가 없습니다.</p>";
}

$conn->close();
?>
