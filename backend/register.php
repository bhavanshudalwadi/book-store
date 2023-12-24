<?php
    require_once __DIR__ . '/vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    include 'db.php';
	
    $_POST = json_decode(file_get_contents('php://input'), true);

	$response = array();

    $fname = mysqli_real_escape_string($con, $_POST['fname']);
    $lname =  mysqli_real_escape_string($con, $_POST['lname']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $phone = mysqli_real_escape_string($con, $_POST['phone']);
    $password = mysqli_real_escape_string($con, $_POST['password']);
    $gender = mysqli_real_escape_string($con, $_POST['gender']);
    $dob = mysqli_real_escape_string($con, $_POST['dob']);

	if ($fname != '' && $lname != '' && $email != '' && $password != '') {
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($con, $sql);
        $numrow = mysqli_num_rows($result);

        if($numrow == 0) {
            $sql2 = "INSERT INTO set fname = '$fname', lname = '$lname', email = '$email', phone = '$phone', password = '".md5($password)."', gender = '$gender', dob = '$dob'";
            $result2 = mysqli_query($con, $sql2) or die(mysqli_error($con));
            $inserted_id = mysqli_insert_id($con);

            if($result2 > 0) {
                $mail = new PHPMailer(true);
    
                try {
                    $mail->SMTPDebug = 2;									
                    $mail->isSMTP();										
                    $mail->Host	 = 'smtp.gmail.com';				
                    $mail->SMTPAuth = true;							
                    $mail->Username = 'bhavanshu.programer@gmail.com';				
                    $mail->Password = 'ompb hlaz gbgd fnfp';			
                    $mail->SMTPSecure = 'tls';							
                    $mail->Port	 = 587;
            
                    $mail->setFrom('bhavanshu.programer@gmail.com', 'Online Book Store Managment System');
                    $mail->addAddress($email, $fname." ".$lname);
                    
                    $mail->isHTML(true);								
                    $mail->Subject = "Email Verification";
                    $mail->Body = "<!DOCTYPE html>
                    <html lang='en'>
                    <head>
                        <meta charset='UTF-8'>
                        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    </head>
                    <body>
                        <center>
                            <h2>Hello, $fname</h2>
                            <h3>Welcome to Online Book Store Managment System</h3>
                            <h4>Click on below link for varification</h4>
                            <a href='http://localhost/book-store/backend/email-verfification.php?id=$inserted_id&uid=".md5($email)."'>http://localhost/book-store/backend/email-verfification.php?id=$inserted_id&uid=".md5($email)."</a>
                            <p>If link is failed to open in browser, try to copy and paste link in browser.</p>
                        </center>
                    </body>
                    </html>";
    
                    $mail->AltBody = 'Not Suported';
                    $mail->send();

                    $response['success'] = true;
                    $response['msg'] = "Check your email for verification";
                } catch (Exception $e) {
                    $response['success'] = false;
                    $response['msg'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
			} else{
				$response['success'] = false;
				$response['msg'] = "Failed to register, Try again";
			}
        } else{
            $response['success'] = false;
			$response['msg'] = "Email Already Registered";
        }	
    }else {
        $response['success'] = false;
        $response['msg'] = "fname, lname, email and password can't be empty";
    }
	echo json_encode($response);
?>