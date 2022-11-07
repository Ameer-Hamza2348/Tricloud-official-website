// contact form validation //

const form = document.querySelector("form")
  // statusTXT = form.querySelector(".button-area span")
  ;
form.onsubmit = (e) => {
  e.preventDefault();
  // statusTXT.style.color = "#0D6EFD";
  // statusTXT.style.display = "block";
  let timerInterval
  Swal.fire({
    title: 'Sending Email',
    html: 'please wait...',
    timer: 6000,
    timerProgressBar: false,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('.loading')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  })
  let xhr = new XMLHttpRequest();
  xhr.onprogress = function () {
    console.log(xhr.status);
  };
  xhr.open("POST", "contact.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      //   var msg = document.getElementById("success-alert-box").style.display='block';
      //   msg.onclick = function(){
      //       alert(msg.id);
      // }
      Swal.fire(
        'Email Sent!',
        'Your request was completed!',
        'success'
      )
    } else {
      // form.querySelector('#error-alert-box').classList.add('d-block');
      // alert('system error occured!\n please check back later.');
      Swal.fire(
        'Error!',
        'Check back later',
        'error'
      )
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}