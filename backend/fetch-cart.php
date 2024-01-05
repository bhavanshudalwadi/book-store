<?php 
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $response = array();
    $detail = array();
    $response['data'] = array();
    
    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);

    if(isset($user_id) && $user_id != '' && is_numeric($user_id)) {
        $sql = "SELECT c.*, c.id as cart_id, b.* FROM cart c join books b on b.id = c.book_id where c.user_id = $user_id and c.status = 0";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);

        if($numrow > 0) {
            while($row = mysqli_fetch_array($result)) {

                $detail['qty'] = (int)$row['qty'];
                $detail['book_id'] = (int)$row['book_id'];
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
    
                $sql2 = "SELECT * FROM book_imgs where id = ".$row['book_id'];
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
            $response['msg'] = "Cart details fetched";
        }else {
            $response['success'] = true;
            $response['msg'] = "Your cart is empty";
        }
    } else{
        $response['success'] = false;
        $response['msg'] = "UserId is invalid";
    }

    echo json_encode($response);
?>
