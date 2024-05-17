const info = document.querySelector("#info")

export function notifications(userData) {
    console.log(userData)
    info.innerHTML = `<div id="notifications" class="h-100 w-75 px-2">NOTIFICATRIONS</div>`
}