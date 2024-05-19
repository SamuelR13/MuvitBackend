import { myWallet } from "./driverHome/myWallet.js"
import { notifications } from "./driverHome/notifications.js"
import { preferenceDriver } from "./driverHome/preferenceDriver.js"
import { suggestions } from "./driverHome/suggestions.js"
import { trips } from "./driverHome/tripsDriver.js"

const menu = document.querySelector("#menu")
const URLbase = "http://localhost:8080/api/v1/driver/"
const driverPhoto = document.querySelector("#driverPhoto")
const name = document.querySelector("#name")
const username = document.querySelector("#username")
let driverDataGlobal = ""


document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault()
  const driverData = await getProfile()
  driverDataGlobal = driverData
  name.innerHTML = `${driverData.name} ${driverData.lastName}`
  username.innerHTML = `${driverData.rol["nameUser"]}`
  driverPhoto.setAttribute("src", `${driverData.rol["userPhoto"]}`)
  trips(driverDataGlobal)
})


menu.addEventListener("click", async (event) => {
  event.preventDefault()

  if (event.target.id == "undefined") pass
  switch (event.target.id) {
    case "home":
      showAlertHome()
      break;
    case "preferences":
      preferenceDriver(driverDataGlobal)
      break
    case "trips":
      trips(driverDataGlobal)
      break
    case "myWallet":
      myWallet(driverDataGlobal)
      break
    case "notifications":
      notifications(driverDataGlobal)
      break
    case "suggestions":
      suggestions(driverDataGlobal)
      break
  }
  // info.innerHTML = await divs[event.target.id]
})

async function getProfile() {
  const response = await fetch(`${URLbase}effdd194-3d89-495f-8f61-ca8c37df2369`)
  const driver = await response.json()
  const driverData = await driver
  return driverData
}

function showAlertHome() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure you want to exit to the main menu?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
    }
  });
}

