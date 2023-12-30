<?php
    include 'db.php';

	$response = array();

    $id = mysqli_real_escape_string($con, $_POST['id']);
    $name = mysqli_real_escape_string($con, $_POST['name']);
    if(isset($_FILES['img'])) {
        $img = $_FILES['img'];
    }

	if ($name != '' && $id != '' && is_numeric($id)) {
        $sql = "SELECT * FROM categories WHERE name = '$name' and id != $id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);

        if($numrow == 0) {
            $para = '';
            if(isset($img) && $img['size'] > 0) {
                $ImageName = rand(100, 999) . $img["name"];
                $ImagePath = "./uploads/" . $ImageName;
                move_uploaded_file($img["tmp_name"], $ImagePath);
                
                $para .= ", img = '$ImageName'";
            }

            $sql2 = "UPDATE categories SET name = '$name' $para WHERE id = $id";
            $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

            if($result2 > 0) {
                $response['success'] = true;
                $response['msg'] = "Category updated successful";
			} else{
				$response['success'] = false;
				$response['msg'] = "Failed to update, Try again";
			}
        } else{
            $response['success'] = false;
			$response['msg'] = "Your Entered category is already exist";
        }	
    }else {
        $response['success'] = false;
        $response['msg'] = "Category name can't be empty";
    }
	echo json_encode($response);
?>