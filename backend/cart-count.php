<?php 
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $response = array();
    $detail = array();
    $response['data'] = (object) [];

    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);

    if($user_id != '' && is_numeric($user_id)) {
        $sql = "SELECT count(*) as cart_count FROM cart where user_id = $user_id";
        $result = mysqli_query($con, $sql);
        $row = mysqli_fetch_array($result);

        $detail['cart_count'] = $row['cart_count'];

        $response['data'] = $detail;
        $response['success'] = true;
        $response['msg'] = "Cart count fetched successfull";
    } else{
        $response['success'] = false;
        $response['msg'] = "UserId is invalid";
    }

    echo json_encode($response);
?>
