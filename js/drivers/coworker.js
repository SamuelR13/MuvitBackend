const container = document.querySelector(".container-form");
const form = document.querySelector(".quantity-co-workers");
const title = document.querySelector(".container-form")
const selectWorkers = document.querySelector("#coworkers");
const tbody = document.querySelector(".container")
container.addEventListener("click", (event)=>{
    if (event.target.classList.contains('skip')) {
    window.location.href = "../html/unputRegDriver.html"
}
});
form.addEventListener("submit", (event)=>{
  if(selectWorkers.value != ''){
event.preventDefault()
    form.classList.add("d-none")
    title.classList.add("d-none")
    createInfo()
    console.log(selectWorkers);
  } 
   // tbody.innerHTML = selectWorkers.value
})

function createInfo(){
  tbody.classList.add("row")
    for (let iterador = 1; iterador <= parseInt(selectWorkers.value); iterador++) {
        tbody.innerHTML +=
        `
        <div class=" d-flex align-items-center justify-content-center">
        <div class=" w-25 h-50">
            <h5 class="mt-5"> Coworker ${iterador} </h5>

            <form class="form-coworker mb-5 w-100 h-75" id="form-coworker">
                <div class="mb-3 row mt-2">
                    <div class="col">
                        <label for="name-coworker">Name</label>
                        <input type="text" class="form-control" placeholder="First name" aria-label=""
                            id="name-coworker" required>
                    </div>
                    <div class="col">
                        <label for="last-name-coworker">Last name</label>
                        <input type="text" class="form-control" placeholder="Last name" aria-label=""
                            id="last-name-coworker" required>
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
                <label for="documentation">Type of documentation</label>
                <select class="form-select" aria-label="Default select example" id="documentation" required>
                    <option selected>Select your type of ID</option>
                    <option value="cedula">Cédula</option>
                    <option value="pasaport">Pasaport</option>
                    <option value="registro-civil">Registro civil</option>

                </select>
                <div class="col">
                    <label for="num-documentation">number ID</label>
                    <input type="text" id="num-documentation" class="form-control" placeholder="Your ID"
                        aria-label="num-documentation" disabled required>
                </div>
            </form>

        </div>
    </div>
        `
      }
      container.innerHTML += `
      <div class="d-flex gap-5 justify-content-center flex-column">
      <button type="button" class="btn btn-secondary skip w-25 h-20"> Skip </button>
      <button type="submit"  class="btn btn-success done w-25 h-20" > Done </button>
      </div>`        
}