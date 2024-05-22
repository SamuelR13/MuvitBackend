import { notifications } from "./userHome/notifications.js";
import { payment } from "./userHome/payment.js";
import { preferencesUser } from "./userHome/preferencesUser.js";
import { suggestions } from "./userHome/suggestions.js";
import { trips } from "./userHome/trips.js";

const menu = document.querySelector("#menu");
const URLbase = "http://localhost:8080/api/v1/user/";
const userPhoto = document.querySelector("#userPhoto");
const name = document.querySelector("#name");
const username = document.querySelector("#username");
let userDataGlobal = "";

document.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault();
  const userData = await getProfile();
  console.log(userData);
  userDataGlobal = userData;
  name.innerHTML = `${userData.name} ${userData.lastName}`;
  username.innerHTML = `${userData.rol["nameUser"]}`;
  userPhoto.setAttribute("src", `${userData.rol["userPhoto"]}`);
  trips(userDataGlobal);
});

menu.addEventListener("click", async (event) => {
  event.preventDefault();

  if (event.target.id == "undefined") pass;
  switch (event.target.id) {
    case "home":
      showAlertHome();
      break;
    case "preferences":
      preferencesUser(userDataGlobal);
      break;
    case "trips":
      trips(userDataGlobal);
      break;
    case "payment":
      payment(userDataGlobal);
      break;
    case "notifications":
      notifications(userDataGlobal);
      break;
    case "suggestions":
      suggestions(userDataGlobal);
      break;
  }
  // info.innerHTML = await divs[event.target.id]
});

async function getProfile() {
  let userLocalStorage = JSON.parse(localStorage.getItem("isLoginUser"));
  const response = await fetch(
    `${URLbase}${userLocalStorage.id}`
  );
  const user = await response.json();
  const userData = await user;
  return userData;
}

function showAlertHome() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure you want to exit to the main menu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../index.html";
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    });
}
