<?php
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

	$response = array();

    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);
    $book_id = mysqli_real_escape_string($con, $_POST['book_id']);

	if ($user_id != '' && $book_id != '' && is_numeric($user_id) && is_numeric($book_id)) {
        $sql = "DELETE from wishlist WHERE user_id = $user_id AND book_id = $book_id";
        $result = mysqli_query($con, $sql) or die(mysqli_error($con));
        $affected_rows = mysqli_affected_rows($con);

        if($affected_rows == 0) {
            $sql2 = "INSERT INTO wishlist set user_id = $user_id, book_id = $book_id";
            $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

            if($result2 > 0) {
                $response['success'] = true;
                $response['msg'] = "Book added to wishlist.";
			} else{
				$response['success'] = false;
				$response['msg'] = "Failed to add, Try again.";
			}
        } else{
            $response['success'] = true;
			$response['msg'] = "Book removed from wishlist.";
        }	
    }else {
        $response['success'] = false;
        $response['msg'] = "UserId and BookId is invalid.";
    }
	echo json_encode($response);
?>