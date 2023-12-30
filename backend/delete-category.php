<?php 
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $response = array();
    $detail = array();
           
    $id = mysqli_real_escape_string($con, $_POST['id']);

    if($id != '' && is_numeric($id)) {
        $sql = "SELECT * FROM categories WHERE id = $id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);
    
        if($numrow > 0) {
            $sql2 = "DELETE FROM categories WHERE id = $id";
            $result2 = mysqli_query($con, $sql2);
    
            $response['success'] = true;
            $response['msg'] = "Category deleted successful";
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
