<?php
// Connect to database
require_once('database-connection.php');

// Confirm if the create user data is being sent
if(isset($_POST['sendDatas'])){

    // Variable for type of user
    if(isset($_POST['userId'])){
        $userId = $_POST['userId'];
    }

    // Variable for first name
    if(isset($_POST['firstName'])){
        $firstName = $_POST['firstName'];
    }

    // Variable for middle name
    if(isset($_POST['middleName'])){
        $middleName = $_POST['middleName'];
    }

    // Variable for last name
    if(isset($_POST['lastName'])){
        $lastName = $_POST['lastName'];
    }

    // Variable for sex
    if(isset($_POST['sex'])){
        $sex = $_POST['sex'];
    }

    // Variable for birthday
    if(isset($_POST['birthday'])){
        $birthday = $_POST['birthday'];
    }

    echo $userId;
}

?>