<?php
// Connect to database
require_once('database-connection.php');

if(isset($_POST['getUser'])){
    $sql = 'SELECT * FROM user_accounts ORDER BY user_id ASC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $userList = $stmt->fetchAll();

    echo json_encode($userList);   
}
?>