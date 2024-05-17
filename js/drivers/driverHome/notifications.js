const info = document.querySelector("#info")

export function notifications(driverData) {
    console.log(driverData)
    info.innerHTML = `<div id="notifications" class="h-100 w-75 px-2">NOTIFICATRIONS</div>`
}