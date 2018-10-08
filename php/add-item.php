<?php
// Connect to database
require_once('database-connection.php');

// Confirm if the create user data is being sent
if(isset($_POST['addItem'])){
   
    // Variable for code
    if(isset($_POST['code'])){
        $code = $_POST['code'];
    }


    // Variable for date of purchase
    if(isset($_POST['dateofpurchase'])){
        $dateOfPurchase = $_POST['dateofpurchase'];
    }

    // Variable for article
    if(isset($_POST['article'])){
        $article = $_POST['article'];
    }

    // Variable for description
    if(isset($_POST['description'])){
        $description = $_POST['description'];
    }

    // Variable for property number
    if(isset($_POST['propertynumber'])){
        $propertyNumber = $_POST['propertynumber'];
    }

     // Variable for property number
     if(isset($_POST['unitofmeasure'])){
        $unitOfMeasure = $_POST['unitofmeasure'];
    }

     // Variable for property number
     if(isset($_POST['remarks'])){
        $remarks = $_POST['remarks'];
    }


    // Set timezone and date
    date_default_timezone_set('Asia/Taipei');

    // Set creation time
    $creation_time = date("h:i A");

    // Set creation date
    $creation_date = date("M j, Y");
    


    

    $sql = 'INSERT INTO items (code, date_of_purchase, article, description, property_number, unit_of_measure,
     remarks, time_of_creation,date_of_creation) 
    VALUES (:code, :date_of_purchase, :article, :description, :property_number, :unit_of_measure, :remarks,:time_of_creation,:date_of_creation)';
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['code' => $code, 'date_of_purchase' => $dateOfPurchase, 
    'article' => $article, 'description' => $description, 'property_number' => $propertyNumber,
    'unit_of_measure' => $unitOfMeasure, 'remarks' => $remarks, 'time_of_creation'=>$creation_time, 'date_of_creation'=>$creation_date]);
    

}




?>