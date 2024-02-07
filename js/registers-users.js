//Selectors`
const URLbase = 'http://localhost:3000'
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const phoneUser = document.querySelector('#phone-number')
const mailUser = document.querySelector('#email-user')
const passwordUser = document.querySelector('#password-user')
const passwordConfirm = document.querySelector('#passCorfirm')
const formReg = document.querySelector('#formReg')
//Events

document.addEventListener('DOMContentLoaded', event => {
    event.preventDefault()
})

formReg.addEventListener('submit', event => {
    event.preventDefault()

    createUsers()
})

//Functions

async function createUsers() {
    const { validate } = validatePass()
    if (!validate) {
        showAlert()
        return
    }

    const valido = await validatePassSafe()
    console.log(valido)
    if (!valido) {
        console.log(valido)
        showAlertSafePass()
        return
    }

    if (await validateEmail()) {
        console.log('Estoy en la condicion')
        showAlertEmail()
        return
    }

    try {
        await fetch(`${URLbase}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                numberUser: phoneUser.value,
                emailUser: mailUser.value,
                passUser: passwordUser.value,
                nameUser: firstName.value,
                lastNameUser: lastName.value,
                type: 'User',
            }),
        })
        const a = document.createElement('a')
        a.href = 'success-register.html'
        a.click()
        window.location.href = 'success-register.html'
    } catch (error) {
        mainAlert(error)
    }

}
function validatePass() {
    if (passwordUser.value != passwordConfirm.value) {
        return {
            validate: false,
        }
    }
    return { validate: true }
}

async function validatePassSafe() {
    const methodPass =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/

    if (methodPass.test(passwordUser.value)) {
        console.log(passwordUser.value)
        return true
    }
    return false
}

async function validateEmail() {
    console.log('entré')
    const response = await fetch(`${URLbase}/users?emailUser=${mailUser.value}`)
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data.length
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
function replacePage() {
    window.location.href = 'success-register.html'
}
