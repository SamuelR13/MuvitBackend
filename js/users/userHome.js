import { preferencesUser } from "./userHome/preferencesUser.js"
import { trips } from "./userHome/trips.js"

const menu = document.querySelector("#menu")
const URLbase = "http://localhost:8080/api/v1/user/"
const userPhoto = document.querySelector("#userPhoto")
const name = document.querySelector("#name")
const username = document.querySelector("#username")
let userDataGlobal = ""


document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault()
    const userData = await getProfile()
    console.log(userData)
    userDataGlobal = userData
    name.innerHTML = `${userData.name} ${userData.lastName}`
    username.innerHTML = `${userData.rol["nameUser"]}`
    userPhoto.setAttribute("src", `${userData.rol["userPhoto"]}`)
    trips(userDataGlobal)
})


menu.addEventListener("click", async (event) => {
    event.preventDefault()
    const divs = {
        payment: `<div id="payment" class="h-100 w-100">
        <div class="card mt-5 mb-5">
                <form>
                    <span id="card-header">Saved cards:</span>
                    <div class="row row-1">
                        <div class="col-2"><img class="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png"/></div>
                        <div class="col-7">
                            <input type="text" placeholder="**** **** **** 3193">
                        </div>
                        <div class="col-3 d-flex justify-content-center">
                            <a href="#">Remove card</a>
                        </div>
                    </div>
                    <div class="row row-1">
                        <div class="col-2"><img  class="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png"/></div>
                        <div class="col-7">
                            <input type="text" placeholder="**** **** **** 4296">
                        </div>
                        <div class="col-3 d-flex justify-content-center">
                            <a href="#">Remove card</a>
                        </div>
                    </div>
                    <span id="card-header">Add new card:</span>
                    <div class="row-1">
                        <div class="row row-2">
                            <span id="card-inner">Card holder name</span>
                        </div>
                        <div class="row row-2">
                            <input type="text" placeholder="Bojan Viner">
                        </div>
                    </div>
                    <div class="row three">
                        <div class="col-7">
                            <div class="row-1">
                                <div class="row row-2">
                                    <span id="card-inner">Card number</span>
                                </div>
                                <div class="row row-2">
                                    <input type="text" placeholder="5134-5264-4">
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <input type="text" placeholder="Exp. date">
                        </div>
                        <div class="col-2">
                            <input type="text" placeholder="CVV">
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-warning">Add Card</button>
                    </form>
            </div></div>`,
        notifications: `<div id="notifications" class="h-100 w-75 px-2">NOTIFICATRIONS</div>`,
        suggestions: `<div class="contact-form h-100 w-100">
        <form method="post">
            <h3>Drop Us a Message</h3>
           <div class="row">
                <div class="col-md-6 gap-5">
                <div class="form-floating mb-3">
                <input type="text" class="form-control" id="suggestionName" placeholder="Your name">
                <label for="suggestionName">Name</label>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="suggestionEmail" placeholder="Your email">
                <label for="suggestionEmail">Email</label>
              </div>
              <div class="form-floating mb-3">
              <input type="text" class="form-control" id="suggestionsPhone" placeholder="Your phone number">
              <label for="suggestionsPhone">Phone number</label>
                </div>
    
                <div class="form-group">
                <button type="button" class="btn btn-outline-warning">Send message</button>
                </div>
                
                </div>
                <div class="col-md-6">
                <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 200px"></textarea>
                <label for="floatingTextarea2">Comments</label>
              </div>
                </div>
            </div>
        </form>
    </div>`,
        chat: `<div id="chat" class="h-100 w-75 px-2">chat</div>`
    }
    if (event.target.id == "home") window.location.href = '../index.html'
    if (event.target.id == "undefined") pass
    switch (event.target.id) {
        case "preferences":
            preferencesUser(userDataGlobal)
            break
        case "trips":
            trips(userDataGlobal)
            break
    }
    // info.innerHTML = await divs[event.target.id]

})

async function getProfile() {
    const response = await fetch(`${URLbase}ed980e41-19dc-4da4-8570-7646d5892ca0`)
    const user = await response.json()
    const userData = await user
    return userData
}


