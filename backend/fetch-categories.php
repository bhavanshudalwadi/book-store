<?php 
    include 'db.php';

    $response = array();
    $detail = array();
    $response['data'] = array();
    
    $sql = "SELECT * FROM categories";
    $result = mysqli_query($con, $sql);
    $numrow = mysqli_num_rows($result);

    if($numrow > 0) {
        while($row = mysqli_fetch_array($result)) {
            $detail['id'] = (int)$row['id'];
            $detail['name'] = $row['name'];
            // $detail['img'] = $row['img'];
            
            array_push($response['data'], $detail);
        }

        $response['success'] = true;
        $response['msg'] = "Categories fetched successfull";
    } else{
        $response['success'] = false;
        $response['msg'] = "No Categories Found";
    }

    echo json_encode($response);
?>
