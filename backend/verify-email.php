<?php
    include 'db.php';

    $response = array();
    $detail = array();
    $response['data'] = (object)[];

    $uid = mysqli_real_escape_string($con, $_GET['uid']);

    $id = substr($uid, 0, 1);
    $email = substr($uid, 1);

    if(strlen($uid) >= 33 && is_numeric($id)) {
        $sql = "SELECT email FROM users WHERE id = $id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);
    
        if($numrow > 0) {
            $row = mysqli_fetch_array($result);
    
            if(md5($row['email']) == $email) {
                $sql2 = "UPDATE users set status = 1 where id = $id and email = '".$row['email']."'";
                $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

                $response['success'] = true;
                $response['msg'] = "Email Verification Successfull :)";
            }else {
                $response['success'] = false;
                $response['msg'] = "Email Verification Failed. email is invalid.";
            }
        } else{
            $response['success'] = false;
            $response['msg'] = "Email Verification Failed. id is invalid.";
        }
    }else {
        $response['success'] = false;
        $response['msg'] = "Email Verification Failed. uid is invalid.";
    }
    
    echo json_encode($response);
?>