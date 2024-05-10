
const info = document.querySelector("#info")

export function preferencesUser(userData){
    console.log(userData)
    info.innerHTML = `<div id="preferences" class="h-100 w-100 d-flex  align-items-center">     
    <div class="row w-100">
        <div class="col-8 d-flex flex-column">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editName" placeholder="Your name" value=${userData.name}>
                <label for="editName">Name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editLastname" placeholder="Your name" value=${userData.lastName}>
                <label for="editLastname">Lastname</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editUserName" placeholder="Your name" value=${userData.rol["nameUser"]}>
                <label for="editUserName">User name</label>
            </div>
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="editEmail" placeholder="Your email" value=${userData.email}>
                <label for="editEmail">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editPhone" placeholder="Your phone number" value=${userData.phoneNumber}>
                <label for="editPhone">Phone number</label>
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
                    <button type="submit"  id="editButton" class="btn btn-outline-warning">Edit profile</button>
                </div>
                <div class="form-floating mb-3">
                    <button type="submit" id="deleteButton" class="btn btn-outline-warning2">DELETE profile</button>
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
    </div>`
}

const editName = document.querySelector("#editName")
const editLastname = document.querySelector("#editLastname")
const editUserName = document.querySelector("#editUserName")
const editEmail = document.querySelector("#editEmail")
const editPhone = document.querySelector("#editPhone")
const password = document.querySelector("#password")
const newPassword = document.querySelector("#newPassword")
const newPasswordConfirmation = document.querySelector("#newPasswordConfirmation")
const editButton = document.querySelector("#editButton")
const deleteButton = document.querySelector("#deleteButton")

editButton.addEventListener("submit",async (event)=>{
    event.preventDefault()
    if(!newPassword.value){
        try {
            const response = await fetch(`${URLbase}/user/${userData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber: phoneUser.value,
                    email: emailUser.value,
                    name: firstName.value,
                    lastName: lastName.value,
                    rol: parseInt(userData.rol["id_rol"]),
                }),
            })
            const data = await response.json()
            console.log("actualizado");
        } catch (error) {
            console.log(error)
        }
    }
})