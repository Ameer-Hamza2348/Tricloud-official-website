<?php
error_reporting(E_ERROR | E_PARSE);

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
  $userMessage = $_POST['message'];

  try {
    //Save to DB
    $mysqli = new mysqli("localhost", "root", "", "tcl_data");

    if ($mysqli->connect_errno) {
      $responseObj->status = 400;
      $responseObj->message = "No connection could be made because the target machine actively refused it.";
      echo json_encode($responseObj);
      exit();
    }

    $sql = "INSERT INTO contacts (`name`, `email`, `subject`, `message`) VALUES ('$name', '$email', '$subject', '$userMessage')";

    if (mysqli_query($mysqli, $sql)) {
    } else {
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
    $mail->addAddress('US@example.com'); // Email address where you want to receive emails

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = "<h3>Name : $name <br><br>Email: $email <br><br>Subject: $subject <br><br>Message : $userMessage</h3>";

    $response = $mail->send();

    $postArray = array(
      "Name" => $_POST['name'],
      "Email" => $_POST['email'],
      "Subject" => $_POST['subject'],
      "Message" => $_POST['message']
    );

    if ($response) {
      $responseObj->status = 200;
      $responseObj->message = "Email has been sent!";
      echo json_encode($responseObj);
    } else {
      $responseObj->status = 304;
      $responseObj->message = $mail->getSMTPInstance()->getError();
      echo json_encode($responseObj);
    }
  } catch (Exception $e) {
  }
} else {
  $responseObj->status = 300;
  $responseObj->message = "Not enough query parameters.";
  echo json_encode($responseObj);
}
