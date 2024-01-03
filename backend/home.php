<?php 
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

    $response = array();
    $detail = array();
    $response['data'] = array();

    if(isset($_POST['user_id'])) {
        $user_id = mysqli_real_escape_string($con, $_POST['user_id']);
    }
    
    // $sql = "SELECT c.*, c.id as cat_id, b.*, b.id as book_id FROM categories c, books b where FIND_IN_SET(c.name, b.cat_ids) > 0";
    $sql = "SELECT * FROM categories";
    $result = mysqli_query($con, $sql);
    $numrow = mysqli_num_rows($result);
    
    if($numrow > 0) {
        while($row = mysqli_fetch_array($result)) {
            $detail['id'] = (int)$row['id'];
            $detail['name'] = $row['name'];
            
            if(isset($user_id)) {
                $sql2 = "SELECT
                            b.*,
                            CASE WHEN w.book_id IS NOT NULL THEN 1 ELSE 0 END AS in_wishlist,
                            CASE WHEN c.book_id IS NOT NULL THEN c.qty ELSE 0 END AS in_cart
                        FROM books b
                        left join wishlist w on w.book_id = b.id and w.user_id = $user_id
                        left join cart c on c.book_id = b.id and c.user_id = $user_id
                        where FIND_IN_SET('".$row['name']."', b.cat_ids) > 0 order by b.id";
            }else {
                $sql2 = "SELECT b.* FROM books b where FIND_IN_SET('".$row['name']."', b.cat_ids) > 0 order by b.id";
            }
            $result2 = mysqli_query($con, $sql2);
            $numrow2 = mysqli_num_rows($result2);
            
            $detail['books'] = [];
            $bookDetails = [];

            if($numrow2 > 0) {
                while($row2 = mysqli_fetch_array($result2)) {
                    $bookDetails['id'] = (int)$row2['id'];
                    $bookDetails['title'] = $row2['title'];
                    $bookDetails['description'] = $row2['description'];
                    $bookDetails['cat_ids'] = $row2['cat_ids'];
                    $bookDetails['mrp'] = (float)$row2['mrp'];
                    $bookDetails['price'] = (float)$row2['price'];
                    $bookDetails['in_stock'] = (int)$row2['in_stock'];
                    $bookDetails['author'] = $row2['author'];
                    $bookDetails['publisher'] = $row2['publisher'];
                    $bookDetails['lang'] = $row2['lang'];
                    $bookDetails['isbn'] = $row2['isbn'];
                    $bookDetails['active_status'] = (int)$row2['active_status'];

                    if(isset($user_id)) {
                        $bookDetails['in_wishlist'] = ($row2['in_wishlist'] == 1)?true:false;
                        $bookDetails['in_cart'] = (int)$row2['in_cart'];
                    }
        
                    $sql3 = "SELECT * FROM book_imgs where id = ".$row2['id'];
                    $result3 = mysqli_query($con, $sql3);
                    $numrow3 = mysqli_num_rows($result3);
        
                    $bookDetails['img'] = '';
                    if($numrow3 > 0) {
                        $row3 = mysqli_fetch_array($result3);
                        $bookDetails['img'] = $backend_url."/uploads/".$row3['img'];
                    }

                    array_push($detail['books'], $bookDetails);
                }

                array_push($response['data'], $detail);
            }
        }

        $response['success'] = true;
        $response['msg'] = "Books fetched successfull";
    } else{
        $response['success'] = false;
        $response['msg'] = "No Books Found";
    }

    echo json_encode($response);
?>