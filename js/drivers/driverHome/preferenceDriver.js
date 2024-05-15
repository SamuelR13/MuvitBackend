
const info = document.querySelector("#info")

export function preferenceDriver(driverData) {
    console.log(driverData)
    info.innerHTML = `<div id="preferences" class="h-100 w-100 d-flex  align-items-center">     
    <div class="row w-100">
        <div class="col-8 d-flex flex-column">
            <div class="d-flex my-3 gap-3">
                <div class="form-floating mb-1 w-50">
                    <input type="text" class="form-control" id="editName" placeholder="Your name" value=${driverData.name}>
                    <label for="editName">Name</label>
                </div>
                <div class="form-floating mb-1 w-50">
                    <input type="text" class="form-control" id="editLastname" placeholder="Your name" value=${driverData.lastName}>
                    <label for="editLastname">Lastname</label>
                </div>
            </div>
            <div class="d-flex my-3 gap-3">
                <div class="form-floating mb-1 w-50">
                    <input type="text" class="form-control" id="editUserName" placeholder="Your name" value=${driverData.rol["nameUser"]}>
                    <label for="editUserName">User name</label>
                </div>
                <div class="form-floating mb-1 w-50">
                    <input type="email" class="form-control" id="editEmail" placeholder="Your email" value=${driverData.email}>
                    <label for="editEmail">Email</label>
                </div>
            </div>
            <div class="d-flex my-3 gap-3">
                <div class="mb-1 w-50">
                    <select class="form-select mb-4" aria-label="Default select example">
                        <option selected>Cédula Ciudadanía</option>
                        <option value="Passport">Passport</option>
                        <option value="Cedula_Extranjera">Cédula Extranjera</option>
                    </select>
                </div>
                <div class="form-floating mb-1 w-50">
                    <input type="text" class="form-control" id="driverDni" placeholder="Your DNI" value=${driverData.dni}>
                    <label for="driverDni">DNI</label>
                </div>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="editPhone" placeholder="Your phone number" value=${driverData.phoneNumber}>
                <label for="editPhone">Phone number</label>
            </div>
            <div class="d-flex justify-content-between mb-1">
                <div class="form-floating mb-1">
                    <input type="password" class="form-control" id="password" placeholder="Your phone number" value=${driverData.rol["password"]}>
                    <label for="password">Current Password</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="password" class="form-control" id="newPassword" placeholder="Your phone number">
                    <label for="newPassword">New Password</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="password" class="form-control" id="newPasswordConfirmation" placeholder="">
                    <label for="newPasswordConfirmation">New Password Confirmation</label>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="form-floating mb-1">
                    <button  id="editButton" class="btn btn-outline-warning">Edit profile</button>
                </div>
                <div class="form-floating mb-1">
                    <button  id="deleteButton" class="btn btn-outline-warning2">DELETE profile</button>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="d-flex flex-column align-items-center">
                <label class="block">Profile picture</label>
                <div class="mt-3">
                    <img id="userPhotoEdit" class="rounded-full" height="200px" width="200px" src=${driverData.rol["userPhoto"]} alt="Profile Picture">
                </div>
                <div class="relative mt-4">
                    <button type="button" class="btn btn-outline-warning" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Edit</button>
                    <ul class="dropdown-menu">
                    <li><a id="editPhoto" class="dropdown-item" href="#">Edit photo</a></li>
                    <li><a class="dropdown-item" href="#">Remove photo</a></li>
                  </ul>
                
                </div>
            </div>
        </div>
    </div>
    </div>`

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
    let currentPassword = password.value
    const editPhoto = document.querySelector("#editPhoto")
    const userPhotoEdit = document.querySelector("#userPhotoEdit")
    let urlPhoto = driverData.rol["userPhoto"]

    var myWidget = cloudinary.createUploadWidget({
        cloudName: 'dis8xzifs',
        uploadPreset: 'default'
    }, (error, result) => {
        if (!error && result && result.event === "success") {
            console.log('Done! Here is the image info: ', result.info);
            urlPhoto = result.info["secure_url"]
            userPhotoEdit.setAttribute("src", `${urlPhoto}`)
            editPhoto.setAttribute("src", `${urlPhoto}`)
            console.log(urlPhoto)
        }
    }


    )
    editPhoto.addEventListener("click", () => {
        myWidget.open()
    })
    editButton.addEventListener("click", async (event) => {
        const URLbase = "http://localhost:8080/api/v1/"
        event.preventDefault()
        if (newPassword.value != null && password != newPassword) {
            const { validate } = validatePass()
            if (!validate) {
                showAlert()
                return
            }

            const valido = validatePassSafe()
            console.log(valido)
            if (!valido) {
                console.log(valido)
                showAlertSafePass()
                return
            }
            currentPassword = newPassword
        }
        try {
            const response = await fetch(`${URLbase}driver/${driverData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phoneNumber: editPhone.value,
                    email: editEmail.value,
                    name: editName.value,
                    lastName: editLastname.value,
                    DNI_TYPE: null,
                    rol: parseInt(driverData.rol["id_rol"]),
                }),
            })
            const responseRol = await fetch(`${URLbase}rol/${driverData.rol["id_rol"]}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nameUser: `${editUserName.value}`,
                    password: `${currentPassword.value}`,
                    rolEnum: "Driver",
                    userPhoto: `${urlPhoto}`
                }),
            })
            const data = await response.json()
            const dataRol = await responseRol.json()
            console.log("actualizado");
            showAlertEdit()
        } catch (error) {
            console.log(error)
        }


    })

    deleteButton.addEventListener("click", event => {
        showAlertDelete()
    })

    function showAlertEdit() {
        Swal.fire({
            position: "top-start'",
            icon: "success",
            title: "Correctly edited, reload the page to see the changes.",
            showConfirmButton: true,
            timer: 3000,
            confirmButtonText: 'Close',
            confirmButtonColor: '#FF0000',
        })
    }
    async function deleteUser() {
        const URLbase = "http://localhost:8080/api/v1/"
        try {
            responseRol = await fetch(`${URLbase}user/${driverData.id}`, {
                method: 'DELETE',
            })
            console.log("eliminado");

        } catch (error) {
            console.log(error)
        }
    }
    function showAlertDelete() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser()
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your profile has been deleted.",
                    timer: 3000,
                    icon: "success"
                });
                window.location.href = 'index.html'
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your profile is safe :)",
                    icon: "error"
                });
            }
        });
    }

    function validatePass() {
        if (newPassword.value != newPasswordConfirmation.value) {
            return {
                validate: false,
            }
        }
        return { validate: true }
    }

    function validatePassSafe() {
        const methodPass =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/

        if (methodPass.test(newPassword.value)) {
            console.log(newPassword.value)
            return true
        }
        return false
    }

    function showAlertSafePass() {
        Swal.fire({
            title: `Password isn't safe...`,
            text: 'The password is not secure. It must have at least one uppercase and lowercase letter, a special character, numbers, and a minimum range of 8 characters.',
            icon: 'error',
            toast: 'true',
            timer: 10000,
            showconfirmButton: false,
            position: 'center',
            confirmButtonText: 'Close',
            confirmButtonColor: '#FF0000',
        })
    }

    function showAlertEmail() {
        Swal.fire({
            title: `There are similar email...`,
            text: 'choose it!',
            icon: 'error',
            toast: 'true',
            timer: 10000,
            showconfirmButton: false,
            position: 'center',
            confirmButtonText: 'Close',
            confirmButtonColor: '#FF0000',
        })
    }

    function mainAlert() {
        Swal.fire({
            title: 'Error!',
            text: 'Algo salió mal',
            icon: 'error',
            toast: 'true',
            timer: 4000,
            showconfirmButton: false,
            position: 'center',
            confirmButtonText: 'Close',
            confirmButtonColor: '#FF0000',
        })
    }

    function showAlert() {
        Swal.fire({
            title: 'Oops...!',
            text: 'Passwords do not match!',
            icon: 'error',
            toast: 'true',
            timer: 4000,
            showconfirmButton: false,
            position: 'center',
            confirmButtonText: 'Close',
            confirmButtonColor: '#FF0000',
        })
    }




}

