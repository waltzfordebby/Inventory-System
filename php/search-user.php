<?php
    // Connect to database
    require_once('database-connection.php');

    if(isset($_POST['searchUser'])){

        if(isset($_POST['user'])){
            $user = htmlentities($_POST['user']);
        }
            $search = '%'.$user.'%';
            $sql = 'SELECT * FROM user_accounts WHERE 
            type_of_user LIKE :typeOfUser OR
            first_name LIKE :firstName OR 
            middle_name LIKE :middleName OR 
            last_name LIKE :lastName';
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                'typeOfUser'=>$search,
                'firstName'=>$search,
                'middleName'=>$search,
                'lastName'=>$search,

            ]);
            $users = $stmt->fetchAll();

            echo json_encode($users);   
        
    }
?>