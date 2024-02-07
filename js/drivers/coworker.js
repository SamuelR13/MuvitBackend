const container = document.querySelector(".container");
const form = document.querySelector(".quantity-co-workers");
const title = document.querySelector(".container-form")
const selectWorkers = document.querySelector("#coworkers");
const header = document.querySelector("header")
const tbody = document.querySelector("body")
container.addEventListener("click", (event)=>{

    if (event.target.classList.contains('skip')) {
    window.location.href = "unputRegDriver.html"
}
});


form.addEventListener("submit", (event)=>{

    event.preventDefault()
    form.classList.add("d-none")
    header.classList.add("d-none")
    title.classList.add("d-none")
 
    createInfo()
})

function createInfo(){
    for (let iterador = 1; iterador <= parseInt(selectWorkers.value); iterador++) {

        console.log(selectWorkers.value);
        container.innerHTML +=
        `
      
<div class="d-flex w-75 justify-content-center align-items-center flex-column">
        <h5 class="mt-5"> Coworker ${iterador} </h5>
    
        <form class="form-coworker mb-5 d-flex w-100 h-75 flex-column" id="form-coworker">
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
                        <option selected>Select your type of ID</option>
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
                    
        </form>
        
      </div>
      

        `
    
      }

      document.innerHTML += `
      <div class="d-flex gap-5 justify-content-center flex-column">
      <button type="button" class="btn btn-secondary skip w-25 h-20"> Skip </button>
      <button type="submit"  class="btn btn-success done w-25 h-20" > Done </button>
      </div>`
  
        
}

