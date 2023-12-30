<?php 
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $response = array();
    $detail = array();
    $response['data'] = (object)[];
           
    $id = mysqli_real_escape_string($con, $_POST['id']);

    if($id != '' && is_numeric($id)) {
        $sql = "SELECT * FROM users WHERE id = $id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);
    
        if($numrow > 0) {
            $row = mysqli_fetch_array($result);
    
            $detail['id'] = (int)$row['id'];
            $detail['fname'] = $row['fname'];
            $detail['lname'] = $row['lname'];
            $detail['phone'] = $row['phone'];
            $detail['email'] = $row['email'];
            $detail['gender'] = (int)$row['gender'];
            $detail['dob'] = $row['dob'];
    
            $response['data'] = $detail;
            $response['success'] = true;
            $response['msg'] = "Profile details fetched successful";
        } else{
            $response['success'] = false;
            $response['msg'] = "Id is invalid";
        }
    }else {
        $response['success'] = false;
        $response['msg'] = "Id is invalid";
    }

    echo json_encode($response);
?>
