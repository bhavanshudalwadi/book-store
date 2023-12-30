<?php 
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $response = array();
    $detail = array();
    $response['data'] = (object)[];
           
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $password = md5(mysqli_real_escape_string($con, $_POST['password']));

    $sql = "SELECT * FROM users WHERE password = '$password' and email = '$email'";
    $result = mysqli_query($con, $sql);
    $numrow = mysqli_num_rows($result);

    if($numrow > 0) {
        $row = mysqli_fetch_array($result);

        if($row['status'] == 1) {
            $detail['id'] = (int)$row['id'];
            $detail['fname'] = $row['fname'];
            $detail['lname'] = $row['lname'];
            $detail['phone'] = $row['phone'];
            $detail['email'] = $row['email'];
            $detail['gender'] = $row['gender'];
            $detail['dob'] = $row['dob'];
            $detail['role'] = (int)$row['role'];
            $detail['timestamp'] = $row['timestamp'];
    
            $response['data'] = $detail;
            $response['success'] = true;
            $response['msg'] = "Login Successfull"; 
        }else {
            $response['success'] = false;
            $response['msg'] = "Plese check your email for verification";
        }
    } else{
        $response['success'] = false;
        $response['msg'] = "login details are invalid";
    }

    echo json_encode($response);
?>
