// contact form validation //

const form = document.querySelector("form")
  // statusTXT = form.querySelector(".button-area span")
;
form.onsubmit = (e)=>{
  e.preventDefault();
  // statusTXT.style.color = "#0D6EFD";
  // statusTXT.style.display = "block";
  form.querySelector('.loading').classList.add('d-block');
  setTimeout(function(){
    form.querySelector('.loading').classList.remove('d-block');
  },4000)
  let xhr = new XMLHttpRequest();
  xhr.onprogress = function () {
    console.log(xhr.status);
  };
  xhr.open("POST", "contact.php", true);
  xhr.onload = ()=>{
    if (xhr.readyState == 4 && xhr.status == 200) {
    var msg = document.getElementById("success-alert-box").style.display='block';
    msg.onclick = function(){
        alert(msg.id);
  }
 }else {
      form.querySelector('#error-alert-box').classList.add('d-block');
      // alert('system error occured!\n please check back later.');
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}