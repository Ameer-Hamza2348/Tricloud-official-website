<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// if(!empty($email) && !empty($message)){
//     if(filter_var($email, FILTER_VALIDATE_EMAIL)){
//         $receiver = "ameer.hamza.0912309123@gmail.com";
//         $subject ="Form: $name <$email>";
//         $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message";
//         $sender = "Form: $email";  
//         if(mail($receiver, $subject, $body, $sender)){
             
//         }else{
//             echo "Sorry, Failed to Send the message!!";
//         }
//     }else{
//         echo "Enter a Valid Email Address";
//     }
// }
// else{
// echo "Email and Message field is required";
// }
?>