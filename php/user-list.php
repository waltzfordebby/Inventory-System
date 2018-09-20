<?php
// Connect to database
require_once('database-connection.php');


$sql = 'SELECT * FROM user_accounts ORDER BY user_id ASC';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$userList = $stmt->fetchAll();

echo json_encode($userList);
?>