<?php
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

	$response = array();

    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);
    $book_id = mysqli_real_escape_string($con, $_POST['book_id']);
    $mode = mysqli_real_escape_string($con, $_POST['mode']);

	if ($user_id != '' && $book_id != '' && $mode != '' && is_numeric($user_id) && is_numeric($book_id)) {
        $sql = "SELECT * FROM cart WHERE user_id = $user_id AND book_id = $book_id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);

        if($numrow == 0) {
            $sql2 = "INSERT INTO cart set user_id = $user_id, book_id = $book_id, qty = 1";
            $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

            if($result2 > 0) {
                $response['success'] = true;
                $response['msg'] = "Book added to cart.";
			} else{
				$response['success'] = false;
				$response['msg'] = "Failed to add, Try again.";
			}
        } else{
            $msg = "";
            if($mode == "ADD") {
                $sql2 = "UPDATE cart set qty = qty + 1 where user_id = $user_id and book_id = $book_id";
                $msg = "Book quantity updated.";
            }else if($mode == "REMOVE") {
                $row = mysqli_fetch_array($result);

                if($row['qty'] <= 1) {
                    $sql2 = "DELETE FROM cart where user_id = $user_id and book_id = $book_id";
                    $msg = "Book removed from cart.";
                }else {
                    $sql2 = "UPDATE cart set qty = qty - 1 where user_id = $user_id and book_id = $book_id";
                    $msg = "Book quantity updated.";
                }
            }
            $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

            if($result2 > 0) {
                $response['success'] = true;
                $response['msg'] = $msg;
			} else{
				$response['success'] = false;
				$response['msg'] = "Failed to update, Try again.";
			}
        }	
    }else {
        $response['success'] = false;
        $response['msg'] = "UserId or BookId or Mode is invalid.";
    }
	echo json_encode($response);
?>