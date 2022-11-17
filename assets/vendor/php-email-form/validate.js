// contact form validation //

const form = document.querySelector("form");

form.onsubmit = (e) => {
  e.preventDefault();
  let timerInterval
  Swal.fire({
    title: 'Sending Message',
    html: 'please wait...',
    timer: 60000,
    timerProgressBar: false,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  })
  let xhr = new XMLHttpRequest();
  xhr.onprogress = function () {
    console.log("STATUS of xhr: ", xhr.status);
  };
  xhr.open("POST", "contact.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let responseObject = JSON.parse(xhr.response)
      if (responseObject['status'] == 200) {
        Swal.fire(
          responseObject['message'],
          'We will get back to you as soon as possible!',
          'success'
        )
      } else if (responseObject['status'] == 300) {
        Swal.fire(
          responseObject['message'],
          'NOt enough parameters!',
          'info'
        )
      } else if (responseObject['status'] == 304) {
        Swal.fire(
          responseObject['message'],
          'Your request was unable to complete!',
          'error'
        )
      } else {
        Swal.fire(
          responseObject['message'],
          'Connection Error!',
          'warning'
        )
      }
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}