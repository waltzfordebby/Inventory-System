<?php
// Connect to database
require_once('database-connection.php');

if(isset($_POST['deleteUser'])){
    
    if(isset($_POST['userId'])){
        $userId = htmlentities($_POST['userId']);
    }

     $sql = 'DELETE FROM user_accounts WHERE user_id = :userId';
     $stmt = $pdo->prepare($sql);
     $stmt->execute(['userId' => $userId]);
}
?>