// contact form validation //

const form = document.querySelector("form");

form.onsubmit = (e) => {
  e.preventDefault();
  let timerInterval
  Swal.fire({
    title: 'Sending Message',
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
      Swal.fire(
        'Message Sent!',
        'Your request was completed!',
        'success'
      )
    } else {
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