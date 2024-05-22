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
const cardName = document.querySelector("#cardName")
const cardNumber = document.querySelector("#cardNumber")
const cardExpiry = document.querySelector("#cardExpiry")
const cardCVV = document.querySelector("#cardCVV")
const addCard = document.querySelector("#addCard")

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


let service = getLocalStorageService()
let user = getLocalStorageUser()
addCard.addEventListener("click", async event => {
  event.preventDefault()
  const URLbase = "http://localhost:8080/api/v1/"
  try {
    let body = {
      expirationDate: cardExpiry.value,
      number: cardNumber.value,
      cvv: cardCVV.value,
      idUser: userData.id
    }
    if (cardName.value != "") {
      body.name = cardName.value
    }
    await fetch(`${URLbase}payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    showAddEdit()
  } catch (error) {
    console.log(error)
  }
  function showAddEdit() {
    Swal.fire({
      position: "top-start'",
      icon: "success",
      title: "Correctly edited, reload the page to see the changes.",
      showConfirmButton: true,
      timer: 3000,
      confirmButtonText: 'Close',
      confirmButtonColor: '#FF0000',
    })
  }

})

service.statusService = "AVAILABLE"
service.user = user.id
service.paymentMethod = "CASH"


service.assistant = "5"
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
  const datetime = document.querySelector("#DateTime").value
  let array = datetime.split(" ")
  const dateArray = array[0].split("/");
  const date = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`
  const time = `${array[1]}:00`
  if (datetime == "") {
    showError()
    return
  }
  console.log(date)
  console.log(time)
  service.time = time
  service.date = date
  console.log(service)
  event.preventDefault()
  const URLbase = "http://localhost:8080/api/v1/"
  await fetch(`${URLbase}service`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  })
  showNewService()
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

function showNewService() {

  Swal.fire({
    position: "top-start'",
    icon: "success",
    title: "New service add!",
    showConfirmButton: true,
    timer: 3000,
    confirmButtonText: 'Close',
    confirmButtonColor: '#FF0000',
  })
  setTimeout(() => {
    window.location.href = "../index.html"
  }, 3000);

}

function showError() {
  Swal.fire({
    position: "top-start'",
    icon: "error",
    title: "Time and Date is required",
    showConfirmButton: true,
    timer: 3000,
    confirmButtonText: 'Close',
    confirmButtonColor: '#FF0000',
  })
}