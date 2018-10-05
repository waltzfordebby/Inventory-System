<?php
// Connect to database
require_once('database-connection.php');

// Confirm if the create user data is being sent
if(isset($_POST['sendDatas'])){

      // Variable for type of user
      if(isset($_POST['typeOfUser'])){
        $typeOfUser = $_POST['typeOfUser'];
    }

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

    //Set update status
    $updated = 1;

    // Set update time
    $timeOfUpdate = date("h:i A");

     // Set update date
     $dateOfUpdate = date("M j, Y");
    



  $sql = 'UPDATE user_accounts SET type_of_user = :typeOfUser, first_name = :firstName, middle_name = :middleName, last_name = :lastName, sex = :sex, birthday = :birthday, updated = :updated, time_of_update = :timeOfUpdate, date_of_update = :dateOfUpdate WHERE user_id = :userId';
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['typeOfUser' => $typeOfUser,'firstName' => $firstName,'middleName' => $middleName,'lastName' => $lastName,'sex' => $sex,'birthday' => $birthday,'updated' => $updated,'timeOfUpdate' => $timeOfUpdate,'dateOfUpdate' => $dateOfUpdate,'userId' => $userId]);


}

?>