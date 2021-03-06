<?php
// Connect to database
require_once('database-connection.php');

// Confirm if the create user data is being sent
if(isset($_POST['sendDatas'])){
   
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
    $creation_time = date("h:i A");

    //For username and password 
    $getMaxUserId = 'SELECT MAX(user_id) AS maxUserId FROM user_accounts';
    $prepGetMaxUserId = $pdo->prepare($getMaxUserId);
    $prepGetMaxUserId->execute();
    $maxUserId = $prepGetMaxUserId->fetch();

    $userNameNumber =  $maxUserId->maxUserId + 1;

    $typeOfUserUserPass =  preg_replace('/\s+/', '', $typeOfUser);


    $userName = strtolower($typeOfUserUserPass).strtolower($lastName).$userNameNumber;
    $rawPassword = $userName;
    $passWord = md5($userName);

    $sql = 'INSERT INTO user_accounts (type_of_user, first_name, middle_name, last_name, sex, birthday, time_of_creation, date_of_creation,
     username, password,raw_password) 
    VALUES (:type_of_user, :first_name, :middle_name, :last_name, :sex, :birthday, :creation_time, :creation_date,:username,:password,:raw_password)';
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['type_of_user' => $typeOfUser, 'first_name' => $firstName, 'middle_name' => $middleName, 
    'last_name' => $lastName, 'sex' => $sex, 'birthday' => $birthday,
    'creation_time' => $creation_time, 'creation_date' => $creation_date, 'username'=>$userName, 'password'=>$passWord,'raw_password'=>$rawPassword]);
    

}




?>