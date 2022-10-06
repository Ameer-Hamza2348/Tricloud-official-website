// contact form validation //


 const form = document.querySelector("form"),
 statusTXT = form.querySelector(".button-area span");

 form.onsubmit = (e) => {
  e.preventDefault();
  statusTXT.style.color = "#0D6EFD";
  statusTXT.style.display = "block";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = () => {
   if(xhr.readyState == 4 && xhr.status == 200){
    let response = xhr.response;
    if(response.indexOf("Email and Message field is required") != -1 || response.indexOf("Enter a Valid Email Address") || response.indexOf("Sorry, Failed to Send the message!!")){
      statusTXT.style.color = "red";
    }else{
      form.reset();
      setTimeout(()=>{

      }, 3000);
    }
    statusTXT.innerText = response;
   }                                               
  }
  let formData = new FormData(form);
  xhr.send(formData);
}

