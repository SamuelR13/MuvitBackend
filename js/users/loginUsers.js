//Selects
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const check = document.getElementById("checkBox");
const URL = `http://localhost:8080/api/v1/user`;
const URLData = "http://localhost:8080/api/v1/service";
const formLogin = document.getElementById("formLogin");

//Events
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
});

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  loginUsers();
});

//Functions

async function loginUsers() {
  const response = await fetch(`${URL}/email/${emailLogin.value}`);
  const data = await response.json();
  console.log(data);
  if (data.status == 500) {
    console.log("no hay emails");
    showAlertEmail();
    return;
  }

  if (data.rol["password"] === passwordLogin.value) {
    const serviceInfo = localStorage.getItem("confirmService");
    if (data.rol["rolEnum"] === "User") {
      console.log("Usuario");
      //   await fetch(URLData, {
      //       method: 'POST',
      //       headers: {
      //           'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //           ...JSON.parse(serviceInfo),
      //           userId: data[0].id,
      //       }),
      //   })
      //   window.location.href = "../index.html";
    } else if (data.rol["rolEnum"] === "Driver") {
      console.log("Driver");
      // window.location.href = '../html/driverHome.html'
    }
    console.log("entré");
    localStorage.setItem("isLoginUser", JSON.stringify(data));
    if(localStorage.getItem("confirmService")){
      window.location.href = "payment.html"
    }else{
      window.location.href = "../index.html"
    }
  } else {
    console.log("falló");
    showAlertPass();
    return;
  }
}

function showAlertEmail() {
  Swal.fire({
    title: "Error!",
    text: "Email dont found",
    icon: "error",
    toast: "true",
    timer: 4000,
    showconfirmButton: false,
    position: "center",
    confirmButtonText: "Close",
    confirmButtonColor: "#FF0000",
  });
}
function showAlertPass() {
  Swal.fire({
    title: "Error!",
    text: "Wrong Pass",
    icon: "error",
    toast: "true",
    timer: 4000,
    showconfirmButton: false,
    position: "center",
    confirmButtonText: "Close",
    confirmButtonColor: "#FF0000",
  });
}
