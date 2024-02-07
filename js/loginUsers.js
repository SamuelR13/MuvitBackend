//Selects
const emailLogin = document.getElementById('emailLogin')
const passwordLogin = document.getElementById('passwordLogin')
const check = document.getElementById('checkBox')
const URL = `http://localhost:3000/users`
const URLData = 'http://localhost:3000/services'
const formLogin = document.getElementById('formLogin')

//Events
document.addEventListener('DOMContentLoaded', event => {
    event.preventDefault()
})

formLogin.addEventListener('submit', event => {
    event.preventDefault()
    loginUsers()
})

//Functions

async function loginUsers() {
    const response = await fetch(`${URL}?emailUser=${emailLogin.value}`)
    const data = await response.json()
    console.log(data)
    if (!data.length) {
        console.log('no hay emails')
        showAlert()
        return
    }

    if (data[0].passUser === passwordLogin.value) {
        const serviceInfo = localStorage.getItem('confirmService')
        console.log(data[0].type)
        if (data[0].type === 'User') {
            console.log('Usuario')
            await fetch(URLData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...JSON.parse(serviceInfo),
                    userId: data[0].id,
                }),
            })
            window.location.href = 'index.html'
        } else if (data[0].type === 'Driver') {
            console.log('Driver')
            window.location.href = 'driverHome.html'
        }

        console.log('entré')
        localStorage.setItem('isLoginUser', JSON.stringify(data[0]))
    } else {
        console.log('falló')
        showAlert()
        return
    }
}

function showAlert() {
    Swal.fire({
        title: `Credentials do not match`,
        text: 'Try again.',
        icon: 'error',
        toast: 'true',
        timer: 1500,
        showconfirmButton: false,
        position: 'center',
        confirmButtonText: 'Close',
        confirmButtonColor: '#FF0000',
    })
}
