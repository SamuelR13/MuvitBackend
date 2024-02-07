const containerCards = document.querySelector('.cont-cards')
const URL = 'http://localhost:3000'
const URLImg = './img/imgDrivers/customer.jpeg'
document.addEventListener('DOMContentLoaded', showContent)

async function showContent() {
  const response = await fetch(`${URL}/services?_embed=user`)

  const data = await response.json()

 
  if (!data) {
    
    containerCards.innerHTML = `
          <h1 class="d-flex align-items-center"> No services available <h1>
      `
    return

  } else {
    printUsers(data)
  }

}
function printUsers(usuarios) {
 console.log(usuarios);
  usuarios.forEach(element => {
    containerCards.innerHTML += `
  <div class="h-50 card rounded-3" style="width: 18rem;">
    <img src="${URLImg}" class="card-img-top" alt="Customer">
    <div class="card-body">
      <h5 class="card-title">${element.user.nameUser} ${element.user.lastNameUser}</h5>
     
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Distance: ${element.distance} KM</li>
      <li class="list-group-item">Assitants required: ${element.assistants}</li>
      <li class="list-group-item">Payment: ${element.price}</li>
      <li class="list-group-item">Type of service: ${element.type}</li>
    </ul>
    <div class="card-body">
      <button class="btn btn-primary" data-id="${element.id}">Accept offer</a>
      <button class="btn btn-delete ms-1" data-id="${element.id}">Reject offer</a>
    </div>
  </div>
  `
  })
}
containerCards.addEventListener('click', event => {
  if (event.target.classList.contains('btn-delete')) {

    const id = event.target.getAttribute('data-id');
    const card = event.target.parentElement.parentElement
    card.classList.add("d-none")
    console.log(card);
    console.log(id)
    0
  }
})
