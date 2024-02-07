// ----------------------------VARIABLES GLOBALES---------------
let lenguaje = 'English'
let contador = 0
let assistant = []
let maxAssistant = {
    S: 1,
    M: 3,
    XL: 5,
}
let multiplicator = {
    S: 1,
    M: 1.5,
    XL: 2.5,
}
let serviceDetails = {
    type: 'Basic',
    size: 'S',
    assistants: 0,
    distance: 0,
    price: 0,
}

const URLData = 'http://localhost:3000/services'
const URLbase = `http://localhost:3000/users`
// --------------------------SELECTORES------------------------

const dropdownMenu = document.querySelector('#dropdown-menu')
const textToChange = document.querySelectorAll('[data-section]')
const dropdownList = document.querySelector('#dropdown-list')
const userBtn = document.querySelector('#user-btn')
const driverBtn = document.querySelector('#driver-btn')
const mainDriverArea = document.querySelector('#main-driver-area')
const mainuserArea = document.querySelector('#main-user-area')
const signUpBtn = document.querySelector('.signup-btn')
const menosA = document.querySelector('#menos')
const masA = document.querySelector('#mas')
const assis = document.querySelector('#assis-info')
const assis1 = document.querySelector('#assis-info1')
const assis2 = document.querySelector('#assis-info2')
const carousel = document.querySelector('.carousel')
const assitNum = document.querySelector('#assit-num')
const pricesBtn = document.querySelector('#prices-btn')
const mainUserArea2 = document.querySelector('#main-user-area2')
const mainUserArea3 = document.querySelector('#main-user-area3')
const backBtn = document.querySelector('#back')
const saveBtn = document.querySelector('#save')
const cancelService = document.querySelector('#cancel-service')
const muvit = document.querySelector('#muvit')
const btnLogReg = document.querySelector('#btnLogReg')
const serviceSpecification = document.querySelector("#specifications")
// ---------------------------EVENTOS--------------------------

// Verificamos cada que se recarga el INDEX si el usuario se encuetra logueado
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("HOla putas");
    event.preventDefault()
    getProfile()
    serviceConfirm()
    
})
//Escuchamos cuando el carrusel principal termina la animacion para cambiar el valor del Size y actualizamos algunas variables importantes
carousel.addEventListener('slid.bs.carousel', event => {
    const carouselBtn = document.querySelector('.carousel-inner .active')
    const size = document.querySelector('#show-size')
    size.innerHTML = `${carouselBtn.getAttribute('data-id')}`
    serviceDetails.size = carouselBtn.getAttribute('data-id')
    contador = 0
    assitNum.innerHTML = `${contador}`
})
//Escuchamos el boton que confirma el servicio, guardamos los datos del servicioo en el local storage y verificamos si se encuentra logueado
muvit.addEventListener('click', () => {
    localStorage.setItem('confirmService', JSON.stringify(serviceDetails))
    if (!localStorage.getItem('isLoginUser')) {
        window.location.href = 'login.html'
    } else {
        window.location.href = 'userHome.html'
    }
})
//Boton de cancelar reinicia la pagina INDEX
cancelService.addEventListener('click', () => {
    location.reload()
})
// -----------------------------BOTONES DE CARRUSEL------------------
//Mostramos y escondemos las paginas cada que el usuario interactua con los botones de avanzar o retroceser
pricesBtn.addEventListener('click', () => {
    mainuserArea.classList.toggle('d-none')
    mainUserArea2.classList.toggle('d-none')
})
backBtn.addEventListener('click', () => {
    mainuserArea.classList.toggle('d-none')
    mainUserArea2.classList.toggle('d-none')
})
saveBtn.addEventListener('click', () => {
    mainUserArea2.classList.toggle('d-none')
    mainUserArea3.classList.toggle('d-none')
    console.log(serviceDetails)
    printServiceDetail()
})
// -------------------------------------------------------------------------
//Nos lleva al registro
signUpBtn.addEventListener('click', () => {
    window.location.replace('userRegister.html')
})
// --------------------------BOTONES DE ASISTENTES------------------
//Aumenta o disminuye la cantidad de asistentes
menosA.addEventListener('click', () => {
    const size = document
        .querySelector('.carousel-inner .active')
        .getAttribute('data-id')
    menos(size)
})
masA.addEventListener('click', () => {
    const size = document
        .querySelector('.carousel-inner .active')
        .getAttribute('data-id')
    mas(size)
})
// -----------------------------------------------------------------------
//Nos muestra los lenguajes disponibles
dropdownMenu.addEventListener('click', event => {
    const dataLanguage =
        event.target.parentElement.parentElement.getAttribute('data-lenguage')
    console.log(dataLanguage)
    lenguaje = dataLanguage
    changeLanguage(dataLanguage)
})
//---------------------BOTONES TIPO DE USUARIO------------------------
//Muestra la seccion segun el tipo de usuario
userBtn.addEventListener('click', event => {
    event.preventDefault()
    console.log('user')
    mainDriverArea.classList.toggle('d-none')
    mainuserArea.classList.toggle('d-none')
})
driverBtn.addEventListener('click', event => {
    event.preventDefault()
    console.log('driver')
    mainDriverArea.classList.toggle('d-none')
    mainuserArea.classList.toggle('d-none')
})
//----------------------------FUNCIONES------------------------



//Enviamos al JSON-server toda la informacion de usuario y guardamos un token en el local storage
async function serviceConfirm() {
    const service = localStorage.getItem("confirmService");
    if (!service) return
    const response = await fetch(`${URLData}?_embed=user`);
    const detailsService = await response.json();
    console.log(detailsService.user.id);


    detailsService.forEach((service)=>{
      serviceSpecification.innerHTML =`
      <p><span>Output:</span> Carrera 80 #79b-31</p>
      <p><span>Arrival:</span> Calle 56 #23A</p>
      <p><span>Service:</span> ${service.type}</p>
      <p><span>Truck Size:</span> ${service.size}</p>
      <p><span>Assistants</span> ${service.assistants}</p>
      <p><span>Distance</span> ${service.distance}</p>
      <p><span>Vehicle plate</span> XFA333A</p>
      <p><span>Price</span> ${service.price}</p>
      `
    })
  }

//Obtenemos el perfil del usuario registrado para que se muestre su informcion en el index
async function getProfile() {
    const user = JSON.parse(localStorage.getItem('isLoginUser'))
    if (!user) return
    console.log(user.emailUser)
    const response = await fetch(`${URLbase}?emailUser=${user.emailUser}`)
    console.log(response)
    const users = await response.json()
    console.log(users)
    users.forEach(user => {
        btnLogReg.innerHTML = `
    <div id="btnLogReg" class="d-flex gap-3">
      <div class="navBtn">
        <a id="logOut" href="userHome.html" class="signup-btn gap-2" data-section="header">
          <i class='bx bxs-user fs-5' style='color:#ffffff'></i>
          <span>${user.nameUser}</span>
        </a>
      </div>
      <div class="navBtn d-flex justify-content-center align-items-center">
        <a class="nav-link1" data-section="header" data-value="login" onclick="logOut()"><i class='bx bx-log-out fs-2' style='color:#5e5c5c'></i></a>
      </div>
    `
    })
    const logOutLink = document.querySelector('.nav-link1[data-value="login"]')
    logOutLink.addEventListener('click', logOut)
}
//Borramos el token del usuario del local storage
function logOut() {
    console.log('clic')
    localStorage.removeItem('isLoginUser')
    window.location.href = '.'
    btnLogReg.innerHTML = `<div class="navBtn">
                            <a class="nav-link" href="login.html" data-section="header" data-value="login">Log In</a>
                          </div>
                          <div class="navBtn">
                            <button class="signup-btn" data-section="header" data-value="signup">
                              Sign Up
                            </button>
                          </div>`
}

//LLamos a las APIS de lenguaje 
async function changeLanguage(language) {
    try {
        const requestJSON = await fetch(`APIS/languages/${language}.json`)
        const respuesta = await requestJSON.json()
        textToChange.forEach(text => {
            const section = text.getAttribute('data-section')
            const value = text.getAttribute('data-value')
            console.log(text)
            console.log(value, section)
            if (section == 'headerImg') {
                text.setAttribute('src', respuesta[section][value])
            } else {
                text.innerHTML = respuesta[section][value]
            }
            if (section == 'headerText') {
                text.parentElement.parentElement.setAttribute(
                    'data-lenguage',
                    respuesta[section][value]
                )
            } else {
                text.innerHTML = respuesta[section][value]
            }
        })
    } catch (error) {
        console.log('Oops!', error)
    }
}
// ------------------------------------ASISTENTES----------------------
//Sumamos asistentes
function mas(size) {
    if (contador <= maxAssistant[size]) {
        contador++
        printAssis(size)
        console.log('Ayudantes:', contador)
        serviceDetails.assistants = contador
    } else {
        return
    }
}
//Restamos assitentes
function menos(size) {
    if (contador >= 1) {
        contador--
        printAssis(size)
        console.log('Ayudantes:', contador)
        serviceDetails.assistants = contador
    } else {
        return
    }
}
//Mostramos la cantidad de asistentes seleccionados
function printAssis(size) {
    let sizePosition = {
        S: assis,
        M: assis1,
        XL: assis2,
    }
    assitNum.innerHTML = `${contador}`
    sizePosition[size].innerHTML = ``
    for (let i = 0; i <= contador - 1; i++) {
        let random = Math.floor(Math.random() * (3 - 1) + 1)
        sizePosition[size].innerHTML += `
        <div id = "assis${contador}" class="h-100 w-12">
          <img height="100%" width="100%" src="img/Trucks/assistant/assistant${random}.png" alt="">
        </div>
        `
    }
}
// ----------------------------------------------------------------------------
//Mostramos los detalles del servicio
function printServiceDetail() {
    const sizeInfo = document.querySelector('#sizeInfo')
    const assistantsInfo = document.querySelector('#assistantsInfo')
    const distanceInfo = document.querySelector('#distanceInfo')
    const priceInfo = document.querySelector('#priceInfo')

    sizeInfo.textContent = serviceDetails.size
    assistantsInfo.textContent = serviceDetails.assistants
    distanceInfo.textContent = `${serviceDetails.distance} KM`
    priceInfo.textContent = `${serviceDetails.price}`
}
// ------------------------------------FUNCIONES DE PRECIO-------------------------------------
//Creamos un formateador que siempre nos convierta un numero en un sistema de divisas, con la separacion decimas y el tipo de moneda
function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency,
    })
    return formatter.format(value)
}

function price() {
    //Nos sirve para cambiar dinamicamente el tipo de divisa segun el lenguaje de la pagina
    let currency = {
        Español: 'COP',
        English: 'USD',
        Français: 'EUR',
    }
    console.log(lenguaje)
    console.log(currency.lenguaje)
    //Configuramos el precio por kilometro en cada divisa
    const currencyPricesKilo = {
        COP: 30000,
        USD: 7.68,
        EUR: 7.08,
    }
    //Configuramos el precio por asistente en cada divisa
    const currencyPricesAsis = {
        COP: 40000,
        USD: 10.24,
        EUR: 9.44,
    }

    console.log(currencyPricesKilo[currency[lenguaje]])
    //Hacemos la operacion para encontrar el precio p = km*(pkm*mT)+A*PA    (km=distancia,pkm=precio por kilometro,mT=multiplicador de tamaño,A=asistentes,PA=precio por asistente)
    let value =
        serviceDetails.distance *
            (currencyPricesKilo[currency[lenguaje]] *
                multiplicator[serviceDetails.size]) +
        serviceDetails.assistants * currencyPricesAsis[currency[lenguaje]]

    serviceDetails.price = currencyFormatter({
        currency: currency[lenguaje],
        value,
    })
    console.log(serviceDetails.price)
}

// ------------------------------------------------MAP----------------------------
if (!'geolocation' in navigator) {
    console.error('Geolocalización no disponible')
} else {
    navigator.geolocation.getCurrentPosition(
        //Creamos el mapa
        position => {
            console.log(position)
            mapboxgl.accessToken =
                'pk.eyJ1Ijoia3dtZWppYSIsImEiOiJjbGl2eWk4eWwxb3dhM3Bxdm5kNGtpOXRrIn0.RaBQJtXzaW3dBHodhcQg2Q'
            let map = new mapboxgl.Map({
                //Configuramos el mapa segun lo que necesitamos
                container: 'mapa',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 15,
                pitch: 45,
                bearing: -17.6,
            })
            //Introducimos una capa donde se muestran los edificos en 3D
            map.on('load', function () {
                map.addLayer({
                    id: '3d-buildings',
                    source: 'composite',
                    'source-layer': 'building',
                    filter: ['==', 'extrude', 'true'],
                    type: 'fill-extrusion',
                    minzoom: 15,
                    paint: {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': {
                            type: 'identity',
                            property: 'height',
                        },
                        'fill-extrusion-base': {
                            type: 'identity',
                            property: 'min_height',
                        },
                        'fill-extrusion-opacity': 0.6,
                    },
                })
            })
            //Utilizamops MapBoxDirections para poder geocoders y markadores dinamicos con su ruta
            const route = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                profile: 'mapbox/driving-traffic',
                unit: 'metric',
                controls: {
                    instructions: false,
                    profileSwitcher: false,
                },
            })
            //Extraemos la distancia que se recorre segun la ruta dada y se guarda en el objeto principal
            map.addControl(route)
            route.on('route', e => {
                let routes = e.route
                serviceDetails.distance = (
                    routes.map(r => r.distance) / 1000
                ).toFixed(2)
                price()
            })
        },
        error => {
            console.error(error)
        }
    )
}
// --------------------------------------------3DMODELS-----------------------------------------
// Importar las bibliotecas necesarias
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
// Crear la escena, la cámara y el renderizador
const scene = new THREE.Scene()
const scene2 = new THREE.Scene()
const scene3 = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
)
const camera2 = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
)
const camera3 = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const renderer2 = new THREE.WebGLRenderer({ alpha: true })
renderer2.setSize(window.innerWidth, window.innerHeight)
renderer2.shadowMap.enabled = true
renderer2.shadowMap.type = THREE.PCFSoftShadowMap

const renderer3 = new THREE.WebGLRenderer({ alpha: true })
renderer3.setSize(window.innerWidth, window.innerHeight)
renderer3.shadowMap.enabled = true
renderer3.shadowMap.type = THREE.PCFSoftShadowMap

// Crear un div para el renderizador en tu HTML
const div = document.createElement('div')
div.id = 'modelo' // Asignar el ID para el selector de consulta
div.style.width = '200' // Asignar el ID para el selector de consulta
div.style.height = '200' // Asignar el ID para el selector de consulta
div.classList.add(
    'h-100',
    'w-100',
    'd-flex',
    'justify-content-center',
    'align-items-center'
)
document.querySelector('#model').appendChild(div) // Agregar el div al cuerpo
// Adjuntar el renderizador al div
div.appendChild(renderer.domElement)

const div2 = document.createElement('div')
div2.id = 'modelo2' // Asignar el ID para el selector de consulta
div2.classList.add(
    'h-100',
    'w-100',
    'd-flex',
    'justify-content-center',
    'align-items-center'
)
document.querySelector('#model2').appendChild(div2) // Agregar el div al cuerpo
// Adjuntar el renderizador al div
div2.appendChild(renderer2.domElement)

const div3 = document.createElement('div')
div3.id = 'modelo3' // Asignar el ID para el selector de consulta
div3.classList.add(
    'h-100',
    'w-100',
    'd-flex',
    'justify-content-center',
    'align-items-center'
)
document.querySelector('#model3').appendChild(div3) // Agregar el div al cuerpo
// Adjuntar el renderizador al div
div3.appendChild(renderer3.domElement)

// Cargar el modelo GLTF
const loader = new GLTFLoader()
loader.load(
    `model/sizeS.gltf`,
    gltf => {
        const object3D = gltf.scene
        scene.add(object3D)
        gltf.scene.scale.set(110, 110, 110) // Multiplica el tamaño original por 110 en cada eje
        gltf.scene.position.set(0, -50, 0) // Posicionar el modelo en x: 0, y: -50, z: 0
    },
    xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% cargado')
    },
    error => {
        console.error(error)
    }
)
const loader2 = new GLTFLoader()
loader2.load(
    `model/sizeM.gltf`,
    gltf => {
        const object3D2 = gltf.scene
        scene2.add(object3D2)
        gltf.scene.scale.set(100, 100, 100) // Multiplica el tamaño original por 100 en cada eje
        gltf.scene.position.set(0, -60, 0) // Posicionar el modelo en x: 0, y: -60, z: 0
    },
    xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% cargado')
    },
    error => {
        console.error(error)
    }
)
const loader3 = new GLTFLoader()
loader3.load(
    `model/sizeXL.gltf`,
    gltf => {
        const object3D3 = gltf.scene
        scene3.add(object3D3)
        gltf.scene.scale.set(60, 60, 60) // Multiplica el tamaño original por 60 en cada eje
        gltf.scene.position.set(0, 0, 0) // Posicionar el modelo en x: 0, y: 0, z: 0
    },
    xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% cargado')
    },
    error => {
        console.error(error)
    }
)

// Agregar luces de ambientacion
const ambientLight = new THREE.AmbientLight(0x333333, 4.5)
scene.add(ambientLight)
const ambientLight2 = new THREE.AmbientLight(0x333333, 4.5)
scene2.add(ambientLight2)
const ambientLight3 = new THREE.AmbientLight(0x333333, 4.5)
scene3.add(ambientLight3)

camera.position.set(0, 200, 0)
camera2.position.set(0, 200, 0)
camera3.position.set(0, 200, 0)

// Función para animar la cámara
function animateCamera() {
    const radius = 600 // Radio de la órbita
    const speed = 0.0004 // Velocidad de rotación

    camera.position.x = radius * Math.sin(performance.now() * speed)
    camera.position.z = radius * Math.cos(performance.now() * speed)
    camera.lookAt(scene.position) // Actualizar el punto de enfoque

    camera2.position.x = radius * Math.sin(performance.now() * speed)
    camera2.position.z = radius * Math.cos(performance.now() * speed)
    camera2.lookAt(scene2.position) // Actualizar el punto de enfoque

    camera3.position.x = radius * Math.sin(performance.now() * speed)
    camera3.position.z = radius * Math.cos(performance.now() * speed)
    camera3.lookAt(scene3.position) // Actualizar el punto de enfoque
}

// Renderizar la escena (modificado para incluir la animación)
function animate() {
    requestAnimationFrame(animate)
    animateCamera() // Llamar a la función de animación de cámara
    renderer.render(scene, camera)
    renderer2.render(scene2, camera2)
    renderer3.render(scene3, camera3)
}

animate() // Iniciar la animación




