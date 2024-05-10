import { preferencesUser } from "./userHome/preferencesUser.js"

const menu = document.querySelector("#menu")
const trips = document.querySelector('#trips')
const payment = document.querySelector('#payment')
const notifications = document.querySelector('#notifications')
const suggestions = document.querySelector('#suggestions')
const chat = document.querySelector('#chat')
const URLbase = "http://localhost:8080/api/v1/user/"
let userData = ""

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    getProfile()
})


menu.addEventListener("click", async (event) => {
    event.preventDefault()
    const divs = {
        preferences: `<div id="preferences" class="h-100 w-100 d-flex  align-items-center">     
        <div class="row w-100">
            <div class="col-8 d-flex flex-column">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="suggestionName" placeholder="Your name" value=${userData.name}>
                    <label for="suggestionName">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="suggestionLastname" placeholder="Your name" value=${userData.lastName}>
                    <label for="suggestionLastname">Lastname</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="userName" placeholder="Your name" value=${userData.rol["nameUser"]}>
                    <label for="userName">User name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="suggestionEmail" placeholder="Your email" value=${userData.email}>
                    <label for="suggestionEmail">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="suggestionsPhone" placeholder="Your phone number" value=${userData.phoneNumber}>
                    <label for="suggestionsPhone">Phone number</label>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="password" placeholder="Your phone number" value=${userData.rol["password"]}>
                        <label for="password">Current Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="newPassword" placeholder="Your phone number">
                        <label for="newPassword">New Password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="newPasswordConfirmation" placeholder="">
                        <label for="newPasswordConfirmation">New Password Confirmation</label>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="form-floating mb-3">
                        <button type="button" class="btn btn-outline-warning">Edit profile</button>
                    </div>
                    <div class="form-floating mb-3">
                        <button type="button" class="btn btn-outline-warning2">DELETE profile</button>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="d-flex flex-column align-items-center">
                    <label class="block">Profile picture</label>
                    <div class="mt-3">
                        <img class="rounded-full" height="200px" width="200px" src="https://placehold.co/200x200" alt="Profile Pictur  e">
                    </div>
                    <div class="relative mt-4">
                        <button type="button" class="btn btn-outline-warning" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Edit</button>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Edit photo</a></li>
                        <li><a class="dropdown-item" href="#">Remove photo</a></li>
                      </ul>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>`,
        trips: `            <div id="trips" class="h-100 w-75 px-2">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"
                    aria-selected="true">In progress</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane"
                    aria-selected="false">History</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                tabindex="0">...</div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                tabindex="0">...</div>
            <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
                tabindex="0">...</div>
        </div>
    </div>` ,
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
    switch (event.target.id){
        case "preferences":
           preferencesUser(userData)
           break
    }
    // info.innerHTML = await divs[event.target.id]
    
})

async function getProfile() {
    const response = await fetch(`${URLbase}7469626a-b9e4-4b3f-be0b-3c9c1686fbba`)
    const user = await response.json()
    userData = await user
    console.log(userData)
}


