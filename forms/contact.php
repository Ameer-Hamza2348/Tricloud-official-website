<?php
  $userName = $_GET['myname'];
  $userEmail = $_GET['myemail'];
  $messageSubject = $_GET['mysubject'];
  $message = $_GET['message'];
  
  if(){
  }

  $mysqli = new mysqli("localhost","root","","tcl_data");

  if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
  }
  // echo $_GET['abc'];
  // $sql = "SELECT * FROM contacts where 1";
  $newlink = "INSERT INTO contacts (`name`, `email`, `subject`, `message`) VALUES ('$userName', '$userEmail', '$messageSubject' , '$message')";
  if(mysqli_query($mysqli, $newlink)){
    echo "\n data saved successfully.";
} else{
    echo "ERROR: Could not able to execute. " . mysqli_error($newlink);
}
  $mysqli -> close();
?>

<!-- INSERT INTO `contacts` (`id`, `name`, `contact`, `message`) VALUES ('1', 'Ameer Hamza', '03335348483', 'Hi, this is Ameer Hamza'); -->