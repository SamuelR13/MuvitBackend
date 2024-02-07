
const URL = "http://localhost:3002"

const mainMessage = document.querySelector('.align-items-end')
const header = document.querySelector('header')





const container = document.querySelector(".container");


document.addEventListener('DOMContentLoaded', showAccordion())



container.addEventListener('click', event => {

    if (event.target.classList.contains('info-driver')) {
        window.location.href = "drivers.html"
    }
    if (event.target.classList.contains('mechanical-info')) {
      mainMessage.classList.add('d-none')
        header.classList.add('d-none')
        loadInfoMechanical()
    }
    if (event.target.classList.contains('coworkers-info')){
      window.location.href = "coworkers.html"

    }

    if (event.target.classList.contains('skip')) {
        showAccordion()
        mainMessage.classList.remove('d-none')
        header.classList.remove('d-none')
    }
    

    if (event.target.classList.contains('align-items-end')) {
    }
})


//  function loadInfoDriver() {
//   deleteAccordion();

//   container.innerHTML = `
//   <div class="w-50 h-100 d-flex justify-content-center align-items-center">
//   <form class="form-driver" id="form-driver">
//           <div class="mb-3 row mt-2">
//             <div class="col">
//               <label for="name-driver">Your name</label>
//               <input type="text" class="form-control" placeholder="First name" aria-label="" id="name-driver" required>
//             </div>
//             <div class="col">
//               <label for="last-name-driver">Your last name</label>
//               <input type="text" class="form-control" placeholder="Last name" aria-label="" id="last-name-driver" required>
//             </div>
//           </div>
//         <div class="flex-column d-flex gender-check">
//           <label for="">Gender</label>
//           <div class="btn-group " role="group" aria-label="Basic radio toggle button group" id="gender">
//             <input type="radio" class="btn-check" name="btnradio" id="male" autocomplete="off" checked>
//             <label class="btn btn-outline-primary" for="male">Male</label>

//             <input type="radio" class="btn-check" name="btnradio" id="female" autocomplete="off">
//             <label class="btn btn-outline-primary" for="female">Female</label>

//             <input type="radio" class="btn-check" name="btnradio" id="another" autocomplete="off">
//             <label class="btn btn-outline-primary" for="another">Another</label>
//           </div>
//           </div>
//       <label for="documentation">Your kind of documentation</label>
//       <select class="form-select" aria-label="Default select example" id="documentation" required>
//           <option selected>Select your type of ID</option>
//           <option value="cedula">Cédula</option>
//           <option value="pasaport">Pasaport</option>
//           <option value="registro-civil">Registro civil</option>

//       </select>
//       <div class="col">
//           <label for="num-documentation">Your ID</label>
//           <input type="text" id="num-documentation" class="form-control" placeholder="Your ID" aria-label="num-documentation"
//               disabled required>
//       </div>
//       <div class="mb-3">
//           <label for="phone-number">Phone Number</label>
//           <input type="tel" class="form-control" id="phone-number" placeholder="+57 301 000 000" required>
//       </div>
//       <div class="mb-3">
//           <label for="email-driver" class="form-label">Email address</label>
//           <input type="email" class="form-control" id="email-driver" aria-describedby="emailHelp" required>
//           <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
//       </div>
//       <div class="mb-3">
//           <label for="password-driver" class="form-label">Password</label>
//           <input type="password" class="form-control password" id="password-driver" required>
//       </div>
//       <div class="mb-3">
//           <label for="confirm-password" class="form-label">Confirm your password</label>
//           <input type="password" class="form-control confirm-password" id="confirm-password-driver" required>
//       </div>
//       <div class="d-flex gap-5 justify-content-center ">
// <button class="btn btn-secondary skip"> Skip </button>

// <button type="submit"  class="btn btn-success done" > Done </button>

// </div>
//   </form>
// </div>


//     `;



//     const formDriver = document.getElementById("form-driver")
    
//     const typeDocumentationDriver = document.getElementById("documentation");
//     const documentationDriver = document.getElementById("num-documentation");
    



//     formDriver.addEventListener("submit", (event)=>{

//     event.preventDefault()

//     addInfo(typeDocumentationDriver, documentationDriver)
// })
// typeDocumentationDriver.addEventListener("change", function () {
//     // Verifica si el valor seleccionado en el menú desplegable no es "Select your kind of ID"
//      if (typeDocumentationDriver.value !== "Select your kind of ID") {
//         // Habilita el campo de entrada
//         documentationDriver.disabled = false;
//     } else {
//         // Deshabilita el campo de entrada si la opción seleccionada es "Select your kind of ID"
//         documentationDriver.disabled = true;
//     }
// });

// }


 function loadInfoMechanical() {
  deleteAccordion();
  container.innerHTML = `
    <div class="w-50 h-100 d-flex justify-content-center align-items-center">
      <form class="mechanical-info">
        <div class="mb-5">
            <label for="soat">Send a SOAT picture updated</label>
            <input type="file" class="form-control" placeholder="First name" aria-label="First name"
                id="soat">
        </div>
        <div class="mb-5">
            <label for="property-card">Send a property card picture updated</label>
            <input type="file" class="form-control" placeholder="First name" aria-label="First name"
                id="property-card">
        </div>
        <div class="mb-5">
            <label for="rtm">Send a Mechanical and polluting emissions technical inspection certificate
                (RTM) updated</label>
            <input type="file" class="form-control" placeholder="First name" aria-label="First name"
                id="rtm">
        </div>
        <div class="mb-5">
            <label for="rtm">Send your driving licence updated</label>
            <input type="file" class="form-control" placeholder="First name" aria-label="First name"
                id="rtm">
        </div>
        <div class="d-flex gap-5 justify-content-center ">
              <button class="btn btn-secondary skip"> Skip </button>
              <button class="btn btn-success done"> Done </button>
              </div>
      </form>
    </div>`;
}

function loadCoworkersInfo(){
  container.innerHTML = `
    <div class="w-50 h-100 d-flex justify-content-center align-items-center">
                <form class="form-coworker">
                        <div class="mb-3 row mt-2">
                          <div class="col">
                            <label for="name-coworker">Your name</label>
                            <input type="text" class="form-control" placeholder="First name" aria-label="" id="name-coworker" required>
                          </div>
                          <div class="col">
                            <label for="last-name-coworker">Your last name</label>
                            <input type="text" class="form-control" placeholder="Last name" aria-label="" id="last-name-coworker" required>
                          </div>
                        </div>
                      <div class="flex-column d-flex gender-check">
                        <label for="">Gender</label>
                        <div class="btn-group " role="group" aria-label="Basic radio toggle button group" id="gender">
                          <input type="radio" class="btn-check" name="btnradio" id="male" autocomplete="off" checked>
                          <label class="btn btn-outline-primary" for="male">Male</label>

                          <input type="radio" class="btn-check" name="btnradio" id="female" autocomplete="off">
                          <label class="btn btn-outline-primary" for="female">Female</label>

                          <input type="radio" class="btn-check" name="btnradio" id="another" autocomplete="off">
                          <label class="btn btn-outline-primary" for="another">Another</label>
                        </div>
                        </div>
                    <label for="documentation">Your kind of documentation</label>
                    <select class="form-select" aria-label="Default select example" id="documentation" required>
                        <option selected>Select your kind of ID</option>
                        <option value="cedula">Cédula</option>
                        <option value="pasaport">Pasaport</option>
                        <option value="registro-civil">Registro civil</option>

                    </select>
                    <div class="col">
                        <label for="num-documentation">Your ID</label>
                        <input type="text" id="num-documentation" class="form-control" placeholder="Your ID" aria-label="num-documentation"
                            disabled required>
                    </div>
                    <div class="mb-3">
                        <label for="phone-number">Phone Number</label>
                        <input type="tel" class="form-control" id="phone-number" placeholder="+57 301 000 000" required>
                    </div>
                    <div class="mb-3">
                        <label for="email-coworker" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email-coworker" aria-describedby="emailHelp" required>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="password-coworker" class="form-label">Password</label>
                        <input type="password" class="form-control password" id="password-coworker" required>
                    </div>
                    <div class="mb-3">
                        <label for="confirm-password" class="form-label">Confirm your password</label>
                        <input type="password" class="form-control confirm-password" id="confirm-password-coworker" required>
                    </div>
                    <div class="d-flex gap-5 justify-content-center ">
              <button class="btn btn-secondary skip"> Skip </button>

              <button class="btn btn-success done"> Done </button>

              </div>
                </form>
            </div>


    `;
}

 function showAccordion() {
  container.innerHTML = `
    <div class="accordion w-50 h-75"  id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
          Firts step: Tell us about you
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <p>Register your information</p>
          <button class="btn info-driver collapsed " >Register</button>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Second step: Mechanical information
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <p>Register your information</p>
          <button class="btn mechanical-info">Register</button>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Third step: Add your co-workers
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
            <p>Register information about your co-workers</p>
            <button class="btn coworkers-info">Register</button>
        </div>
      </div>
    `;
}
function deleteAccordion() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
