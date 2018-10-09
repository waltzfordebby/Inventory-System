<?php
// Connect to database
require_once('database-connection.php');

if(isset($_POST['getItems'])){
    $sql = 'SELECT * FROM items ORDER BY itemId ASC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $itemList = $stmt->fetchAll();

    echo json_encode($itemList);   
}
?>