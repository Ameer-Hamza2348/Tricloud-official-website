<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';

$mail = new PHPMailer();

$responseObj = new stdClass();

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  try {
    //Save to DB
    $mysqli = new mysqli("localhost", "root", "", "tcl_data");

    if ($mysqli->connect_errno) {
      echo "Failed to connect to MySQL: " . $mysqli->connect_error;
      exit();
    }

    $sql = "INSERT INTO contacts (`name`, `email`, `subject`, `message`) VALUES ('$name', '$email', '$subject' , '$message')";

    if (mysqli_query($mysqli, $sql)) {
      // echo "\n data saved successfully.";
    } else {
      echo "ERROR: Could not able to execute. " . mysqli_error($sqli);
    }
    $mysqli->close();

    //Send Email
    $mail->isSMTP();
    $mail->Host = 'smtp.mailtrap.io';
    $mail->SMTPAuth = true;
    $mail->Port = 2525;
    $mail->Username = '2e70b1f28be818';
    $mail->Password = '8e0f46261930da';

    $mail->setFrom($email); // address which you used as SMTP server
    $mail->addAddress('US@mail.com'); // Email address where you want to receive emails

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = "<h3>Name : $name <br><br>Email: $email <br><br>Subject: $subject <br><br>Message : $message</h3>";

    $response = $mail->send();

    $responseObj->success = "Email has been sent";
    // $responseObj->age = 30;
    // $responseObj->city = "New York";

    // $myJSON = json_encode($responseObj);
    // echo $myJSON;

    if ($response) {
      $responseObj->$response = $response;
      echo json_encode($responseObj);
    } else {
      echo json_encode($mail->getSMTPInstance()->getError($alert));
    }
  } catch (Exception $e) {
    echo $e->getMessage();
  }
} else {
  $responseObj = new stdClass();
  // $responseObj->error = "Not enough query parameters.";
  echo mysqli_connect_error();
  echo json_encode($responseObj);
  // exit();
}