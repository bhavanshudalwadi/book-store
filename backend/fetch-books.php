<?php 
    include 'db.php';

    $response = array();
    $detail = array();
    $response['data'] = array();
    
    $sql = "SELECT * FROM books";
    $result = mysqli_query($con, $sql);
    $numrow = mysqli_num_rows($result);

    if($numrow > 0) {
        while($row = mysqli_fetch_array($result)) {
            
            $detail['id'] = (int)$row['id'];
            $detail['title'] = $row['title'];
            $detail['description'] = $row['description'];
            $detail['cat_ids'] = $row['cat_ids'];
            $detail['mrp'] = (float)$row['mrp'];
            $detail['price'] = (float)$row['price'];
            $detail['in_stock'] = (int)$row['in_stock'];
            $detail['author'] = $row['author'];
            $detail['publisher'] = $row['publisher'];
            $detail['lang'] = $row['lang'];
            $detail['isbn'] = $row['isbn'];
            $detail['active_status'] = (int)$row['active_status'];

            $sql2 = "SELECT * FROM book_imgs where id = ".$row['id'];
            $result2 = mysqli_query($con, $sql2);
            $numrow2 = mysqli_num_rows($result2);

            $detail['img'] = '';
            if($numrow2 > 0) {
                $row2 = mysqli_fetch_array($result2);
                $detail['img'] = $backend_url."/uploads/".$row2['img'];
            }
            
            array_push($response['data'], $detail);
        }

        $response['success'] = true;
        $response['msg'] = "Books fetched successfull";
    } else{
        $response['success'] = false;
        $response['msg'] = "No Books Found";
    }

    echo json_encode($response);
?>
