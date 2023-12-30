<?php
    include 'db.php';

	$response = array();

    $title = mysqli_real_escape_string($con, $_POST['title']);
    $description = mysqli_real_escape_string($con, $_POST['description']);
    $cat_ids = mysqli_real_escape_string($con, $_POST['cat_ids']);
    $mrp = mysqli_real_escape_string($con, $_POST['mrp']);
    $price = mysqli_real_escape_string($con, $_POST['price']);
    $in_stock = mysqli_real_escape_string($con, $_POST['in_stock']);
    $author = mysqli_real_escape_string($con, $_POST['author']);
    $publisher = mysqli_real_escape_string($con, $_POST['publisher']);
    $lang = mysqli_real_escape_string($con, $_POST['lang']);
    $isbn = mysqli_real_escape_string($con, $_POST['isbn']);

	if ($cat_ids != '' && $title != '' && $price != '' && $in_stock != '') {
        $sql2 = "INSERT INTO books set title = '$title', description = '$description', cat_ids = '$cat_ids', mrp = $mrp, price = $price, in_stock = $in_stock, author = '$author', publisher = '$publisher', lang = '$lang', isbn = '$isbn'";
        $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));
        $inserted_id = mysqli_insert_id($con);

        if($result2 > 0) {
            for($i=0; $i<count($_FILES); $i++) {
                $img = $_FILES['img-'.$i+1];
                if($img['size'] > 0) {
                    $ImageName = rand(100, 999) . $img["name"];
                    $ImagePath = "./uploads/" . $ImageName;
                    move_uploaded_file($img["tmp_name"], $ImagePath);
                    
                    $sql3 = "INSERT INTO book_imgs set book_id = '$inserted_id', img = '$ImageName'";
                    $result3 = mysqli_query($con, $sql3) or die(mysqli_error($con));
                }
            }

            $response['success'] = true;
            $response['msg'] = "Book added successful";
        } else{
            $response['success'] = false;
            $response['msg'] = "Failed to add, Try again";
        }
    }else {
        $response['success'] = false;
        $response['msg'] = "Book title, price, In Stock, Categories/Genres can't be empty";
    }
	echo json_encode($response);
?>