const serviceTypeDetails = document.querySelector("#serviceTypeDetails")
const sizeInfo = document.querySelector("#sizeInfo")
const assistantsInfo = document.querySelector("#assistantsInfo")
const distanceInfo = document.querySelector("#distanceInfo")
const priceInfo = document.querySelector("#priceInfo")
const userNameDetails = document.querySelector("#userNameDetails")
const DateTime = document.querySelector("#DateTime")
const cash = document.querySelector("#cash")
const bank = document.querySelector("#bank")
const card = document.querySelector("#card")
const paymentMethodDetail = document.querySelector("#paymentMethodDetail")
const addPayment = document.querySelector("#addPayment")
const checkContainer = document.querySelector("#checkContainer")
const paymentMethodsSelecter = document.querySelector("#paymentMethodsSelecter")

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault()

  paymentMethod = getLocalStorageUser().paymentMethods
  paymentMethod.forEach(payment => {
    let number = (payment.number).substring(12)
    paymentMethodDetail.innerHTML += `
      <option value="nickname">
      <div id="card1" class="cardPayment h-20 w-100 d-flex align-items-center gap-2">
      <div class="pe-none">${payment.name}</div>
      <div class="pe-none">****${number}</div>
      </div>
    </option>
    `
  })
  let user = getLocalStorageUser()
  let service = getLocalStorageService()
  console.log(user)
  console.log(service)

  serviceTypeDetails.innerHTML = service.typeService
  sizeInfo.innerHTML = service.size
  assistantsInfo.innerHTML = service.assistant
  distanceInfo.innerHTML = service.distance
  priceInfo.innerHTML = service.price
  userNameDetails.innerHTML = `${user.name} ${user.lastName}`
})

function getLocalStorageService() {
  const localStorageService = localStorage.getItem("confirmService")
  const service = JSON.parse(localStorageService)
  return service
}
function getLocalStorageUser() {
  const localStorageInfo = localStorage.getItem("isLoginUser")
  const infoUser = JSON.parse(localStorageInfo)
  return infoUser
}



setLocalStorage()

function setLocalStorage() {
  let service = getLocalStorageService()
  let user = getLocalStorageUser()

  service.statusService = "AVAILABLE"
  service.user = user.id
  service.date = "2024-06-14"
  service.time = "06:30:00"
  service.assistant = 5
  let price = parseInt(service.price.substring(1))
  console.log(price)
  service.price = price

  cash.addEventListener("change", () => {
    console.log("cash")
    paymentMethodsSelecter.classList.add("d-none")
    service.paymentMethod = "CASH"
    console.log(service)


  })
  bank.addEventListener("change", () => {
    console.log("bank")
    paymentMethodsSelecter.classList.add("d-none")
    service.paymentMethod = "BANK"
    console.log(service)

  })
  card.addEventListener("change", () => {
    console.log("card")
    paymentMethodsSelecter.classList.remove("d-none")
    service.paymentMethod = "CARD"
    console.log(service)

  })
  console.log(service)
  const muvit = document.querySelector("#muvit")
  muvit.addEventListener("click", async event => {
    event.preventDefault()
    const URLbase = "http://localhost:8080/api/v1/"
    await fetch(`${URLbase}service`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    })
    window.location.href = "../index.html"
  })
}


