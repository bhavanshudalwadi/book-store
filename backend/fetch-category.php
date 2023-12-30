<?php 
    include 'db.php';

    $response = array();
    $detail = array();
    $response['data'] = (object)[];
           
    $id = mysqli_real_escape_string($con, $_GET['id']);

    if($id != '' && is_numeric($id)) {
        $sql = "SELECT * FROM categories WHERE id = $id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);
    
        if($numrow > 0) {
            $row = mysqli_fetch_array($result);
    
            $detail['id'] = (int)$row['id'];
            $detail['name'] = $row['name'];
            $detail['img'] = $row['img'] != null?($backend_url."/uploads/".$row['img']):'';
            
            $response['data'] = $detail;
            $response['success'] = true;
            $response['msg'] = "Category details fetched successful";
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
