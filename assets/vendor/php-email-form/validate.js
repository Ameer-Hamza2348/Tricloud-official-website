// contact form validation //

const form = document.querySelector("form");

form.onsubmit = (e) => {
  e.preventDefault();
  let timerInterval
  Swal.fire({
    title: 'Sending Message',
    html: 'please wait...',
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: 60000,
    timerProgressBar: false,
    showCancelButton: true,
    cancelButtonColor: '#ff0000',
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    },
    customClass: {
      actions: 'vertical-buttons',
      cancelButton: 'top-margin'
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: 'Unable to send your message',
        text: 'your stopped the sending porcess!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        icon: 'warning'
      });
      xhr.abort();     
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
        Swal.fire({
          title: responseObject['message'],
          text: 'We will get back to you as soon as possible!',
          confirmButtonColor: '#28D3C0',
          allowOutsideClick: false,
          allowEscapeKey: false,
          iconColor: '#28d353',
          icon: 'success'
        })
      } else if (responseObject['status'] == 300) {
        Swal.fire({
          title: responseObject['message'],
          text: 'NOt enough parameters!',
          allowOutsideClick: false,
          allowEscapeKey: false,
          icon: 'info'
        })
      } else if (responseObject['status'] == 304) {
        Swal.fire({
          title: responseObject['message'],
          text: 'your request was unable to complete!',
          allowOutsideClick: false,
          allowEscapeKey: false,
          icon: 'error'
        })
      } else {
        Swal.fire({
          title: responseObject['message'],
          text: 'Connection Error!',
          allowOutsideClick: false,
          allowEscapeKey: false,
          icon: 'warning'
        })
      }
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}