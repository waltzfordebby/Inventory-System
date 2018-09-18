<?php
require_once('database-connection.php');

// Confirm if the create user data is being sent
if(isset($_POST['sendCreateUserData'])){
   
    // Variable for type of user
    if(isset($_POST['typeOfUser'])){
        $typeOfUser = $_POST['typeOfUser'];
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


    // Set timezone and date
    date_default_timezone_set('Asia/Taipei');

    // Set creation date
    $creation_date = date("M j, Y");
    
    // Set creation time
    $creation_time = date("h:i:s A");

    // echo $typeOfUser.'</br>'
    // .$firstName.'</br>'
    // .$middleName.'</br>'
    // .$lastName.'</br>'
    // .$sex.'</br>'
    // .$birthday.'</br>'
    // .$creation_time.'</br>'
    // .$creation_date.'</br>'
    // ;
    

    
    
    $sql = 'INSERT INTO user_accounts (type_of_user, first_name, middle_name, last_name, sex, birthday, time_of_creation, date_of_creation) 
    VALUES (:type_of_user, :first_name, :middle_name, :last_name, :sex, :birthday, :creation_time, :creation_date)';
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['type_of_user' => $typeOfUser, 'first_name' => $firstName, 'middle_name' => $middleName, 
    'last_name' => $lastName, 'sex' => $sex, 'birthday' => $birthday,
    'creation_time' => $creation_time, 'creation_date' => $creation_date]);
    
    echo 'User is created!';




}




?>