// contact form validation //

const form = document.querySelector("form"),
  statusTXT = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
//   statusTXT.style.color = "#0D6EFD";
//   statusTXT.style.display = "block";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.onload = ()=>{
    if (xhr.readyState == 4 && xhr.status == 200) {
    var msg = document.getElementById("alert-box").style.display='block';
    msg.onclick = function(){
        alert(msg.id);
    }
    }else {
      thisForm.querySelector('.error-message').classList.remove('d-block');
       alert('system error occured!!\n please check back later.');
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}

/**
* PHP Email Form Validation - v3.5
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function() {
      // event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      // if( ! action ) {
      //   displayError(thisForm, 'The form action property is not set!')
      //   return;
      // }
      thisForm.querySelector('.loading').classList.add('d-block');
      // thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('#alert-box').classList.remove('d-block');

      let formDatas = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formDatas.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formDatas);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formDatas);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formDatas) {
    fetch(action, {
      method: 'POST',
      body: formDatas,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      return response.text();
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.msg.classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    // thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
