<?php 
    include 'db.php';

    $response = array();
    $detail = array();
    $response['data'] = (object)[];

    $id = mysqli_real_escape_string($con, $_GET['id']);
    $uid = mysqli_real_escape_string($con, $_GET['uid']);

    $sql = "SELECT email FROM users WHERE id = $id";
    $result = mysqli_query($con, $sql);
    $numrow = mysqli_num_rows($result);

    if($numrow > 0) {
        $row = mysqli_fetch_array($result);

        if(md5($row['email']) == $uid) {
            
        }else {
            
        }
    } else{
        
    }

    echo json_encode($response);
?>
