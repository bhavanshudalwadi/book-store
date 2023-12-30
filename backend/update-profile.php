<?php
    include 'db.php';

    $_POST = json_decode(file_get_contents('php://input'), true);

	$response = array();

    $id = mysqli_real_escape_string($con, $_POST['id']);
    $fname = mysqli_real_escape_string($con, $_POST['fname']);
    $lname =  mysqli_real_escape_string($con, $_POST['lname']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $phone = mysqli_real_escape_string($con, $_POST['phone']);
    $gender = mysqli_real_escape_string($con, $_POST['gender']);
    $dob = mysqli_real_escape_string($con, $_POST['dob']);

	if ($fname != '' && $lname != '' && $email != '' && is_numeric($id) && is_numeric($gender)) {
        $sql = "SELECT * FROM users WHERE email = '$email' and id != $id";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);

        if($numrow == 0) {
            $sql2 = "UPDATE users set fname = '$fname', lname = '$lname', email = '$email', phone = '$phone', gender = $gender, dob = '$dob' where id = $id";
            $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

            if($result2 > 0) {
                $response['success'] = true;
                $response['msg'] = "Profile details updated successful";
			} else{
				$response['success'] = false;
				$response['msg'] = "Failed to update, Try again";
			}
        } else{
            $response['success'] = false;
			$response['msg'] = "Your Entered email is already exist";
        }	
    }else {
        $response['success'] = false;
        $response['msg'] = "fname, lname, email can't be empty";
    }
	echo json_encode($response);
?>