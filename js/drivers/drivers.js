const URL = "http://localhost:3000/users";

const formDriver = document.getElementById("form-driver");

const container = document.querySelector(".container");
const nameDriver = document.getElementById("name-driver");
const lastnameDriver = document.getElementById("last-name-driver");
const genderDriver = document.getElementById("gender");
const typeDocumentationDriver = document.getElementById("documentation");
const documentationDriver = document.getElementById("num-documentation");
const phoneNumberDriver = document.getElementById("phone-number");
const emailDriver = document.getElementById("email-driver");
const passwordDriver = document.getElementById("password-driver");
const confirmPasswordDriver = document.getElementById(
  "confirm-password-driver"
);

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("skip")) {
    window.location.href = "unputRegDriver.html";
  }
});
formDriver.addEventListener("submit", (event) => {
  event.preventDefault();

  addInfo();
});
typeDocumentationDriver.addEventListener("change", function () {
  // Verifica si el valor seleccionado en el menú desplegable no es "Select your kind of ID"
  if (typeDocumentationDriver.value !== "Select your kind of ID") {
    // Habilita el campo de entrada
    documentationDriver.disabled = false;
  } else {
    // Deshabilita el campo de entrada si la opción seleccionada es "Select your kind of ID"
    documentationDriver.disabled = true;
  }
});

async function addInfo() {
  //1. La contraseñas tienen que ser iguales

  const { validated, message } = validatePassword();
  //2. Contraseña segura
  console.log(validated, message);

  if (!validated) {
    showAlert(message);
    return;
  }

  const { validated: validatedSegurity, message: messageError } =
    validatePasswordSegurity();

  if (!validatedSegurity) {
    showAlert(messageError);
    return;
  }

  //3. No existe una cuenta con este correo

  if (await validateEmail()) {
    showAlert("El email ya se encuentra registrado.");
    return;
  }
  try {
    const obj = {
      nameUser: nameDriver.value,
      lastName: lastnameDriver.value,
      gender: genderDriver.value,
      typeDoc: typeDocumentationDriver.value,
      numDoc: documentationDriver.value,
      numberUser: phoneNumberDriver.value,
      emailUser: emailDriver.value,
      passUser: passwordDriver.value,
      type: "Driver",
    };
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    window.location.href = "unputRegDriver.html";
  } catch (error) {
    showAlert(error);
  }
}

function validatePasswordSegurity() {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  //El metodo test permite evaluar una cadena de texto a partir de una expresión regular
  if (regex.test(passwordDriver.value)) {
    return { validated: true };
  }

  return {
    validated: false,
    message:
      "La contraseña debe tener mayusculas, minusculas, un caracater especial y un rango de 8 a 15 caracateres",
  };
}
async function validateEmail() {
  const response = await fetch(`${URL}?email=${emailDriver.value}`);

  const data = await response.json();

  return data.length;
}

function validatePassword() {
  if (passwordDriver.value != confirmPasswordDriver.value) {
    return { validated: false, message: "Las contraseñas no coinciden" };
  }

  return { validated: true };
}

function showAlert(message) {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    toast: "true",
    timer: 4000,
    showConfirmButton: false,
    position: "bottom-right",
    confirmButtonText: "Aceptar",
  });
}
