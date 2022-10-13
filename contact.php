<?php
  // if( isset($_POST['myname']) && isset($_POST['myemail']) && isset($_POST['mysubject']) && isset($_POST['message'])) {
  //   $userName = $_POST['myname'];
  //   $userEmail = $_POST['myemail'];
  //   $messageSubject = $_POST['mysubject'];
  //   $message = $_POST['message'];
  //   $mysqli = new mysqli("localhost","root","","tcl_data");
  
  //   if ($mysqli -> connect_errno) {
  //     echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  //     exit();
  //   }
    // echo $_POST['abc'];
    // $sql = "SELECT * FROM contacts where 1";
  //   $newlink = "INSERT INTO contacts (`name`, `email`, `subject`, `message`) VALUES ('$userName', '$userEmail', '$messageSubject' , '$message')";
  //   if( mysqli_query($mysqli, $newlink) ) {
  //     echo "\n data saved successfully.";
  //   } else{
  //     echo "ERROR: Could not able to execute. " . mysqli_error($newlink);
  //   }
  //   $mysqli -> close();
  // } else {
  //   echo "No enough query paramteres";
  //   exit();
  // }
  use PHPMailer\PHPMailer\PHPMailer;

require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);

$alert = '';

if(isset($_POST['submit'])){
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  try{
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'ameer.hamza.0912309123@gmail.com'; // Gmail address which you want to use as SMTP server
    $mail->Password = "tricloud09123"; // Gmail address Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = '587';

    $mail->setFrom('ameer.hamza.0912309123@gmail.com'); // Gmail address which you used as SMTP server
    $mail->addAddress('ameer.hamza.0912309123@gmail.com'); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)

    $mail->isHTML(true);
    $mail->Subject = 'Message Received (Contact Page)';
    $mail->Body = "<h3>Name : $name <br>Email: $email <br>Subject: $subject <br>Message : $message</h3>";

    $mail->send();
    $alert = '<div class="alert-success">
                 <span>Message Sent! Thank you for contacting us.</span>
                </div>';
  } catch (Exception $e){
    $alert = '<div class="alert-error">
                <span>'.$e->getMessage().'</span>
              </div>';
  }
}

?>

<!-- INSERT INTO `contacts` (`id`, `name`, `contact`, `message`) VALUES ('1', 'Ameer Hamza', '03335348483', 'Hi, this is Ameer Hamza'); -->