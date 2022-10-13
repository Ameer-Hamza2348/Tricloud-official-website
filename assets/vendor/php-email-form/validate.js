// contact form validation //

// const form = document.querySelector("form"),
//   statusTXT = form.querySelector(".button-area span");

// form.onsubmit = (e)=>{
//   e.preventDefault();
//   statusTXT.style.color = "#0D6EFD";
//   statusTXT.style.display = "block";
//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", "contact.php", true);
//   xhr.onload = ()=>{
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       let response = xhr.response;
//       console.log(response);
//     }
//   }
//   let formData = new FormData(form);
//   xhr.send(formData);
// }