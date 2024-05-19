const info = document.querySelector("#info")

export function payment(userData) {

    info.innerHTML = `
            <div id="payment" class="h-100 w-100">
                <div class="w-100 h-100 d-flex gap-3">

                    <div class="mt-2 w-40 h-100 d-flex flex-column">

                        <div class="h-10 d-flex align-items-center mb-3 clamp1 typeColor">Payment Methods</div>

                        <div id="paymentList" class="h-50 w-100 d-flex flex-column gap-2 clamp3">
                            <div id="card1" class="cardPayment h-20 w-100 d-flex align-items-center gap-2">
                                <img  class="pe-none" height="50px" width="50px" src="../assets/img/SVG/mastercard.svg">
                                <div class="pe-none">Mastercard</div>
                                <div class="pe-none">****5612</div>
                            </div>
                            <div id="card2" class="cardPayment h-20 w-100 d-flex align-items-center gap-2">
                                <img  class="pe-none" height="50px" width="50px" src="../assets/img/SVG/visa.svg">
                                <div class="pe-none">Visa</div>
                                <div class="pe-none">****5612</div>
                            </div>
                            <div id="card3" class="cardPayment h-20 w-100 d-flex align-items-center gap-2">
                                <img  class="pe-none" height="50px" width="50px" src="../assets/img/SVG/american-express.svg">
                                <div class="pe-none">American Express</div>
                                <div class="pe-none">****5612</div>
                            </div> 
                        </div>

                        <div id="addPayment" class="d-flex w-100 gap-3 addPaymet">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-plus-circle clamp1"></i>
                            </div>
                            <div class="d-flex flex-column justify-content-between">
                               <div class="clamp1 typeColor ">Add Payment Method</div>
                               <div class="clamp2 text-muted">Debit / Credit Card</div>
                            </div>
                        </div>

                    </div>

                    <div id="paymentInfo" class="w-40 h-100 d-flex align-items-center">    
                    </div>
                </div>
            </div>`
    const paymentMethods = userData.paymentMethods
    const paymentList = document.querySelector("#paymentList")
    paymentList.innerHTML = ""
    console.log(paymentMethods);
    paymentMethods.forEach((payment, index) => {
        let lastNumbers = payment.number.substring(12)
        paymentList.innerHTML += `
        <div id="card${index}" class="cardPayment h-20 w-100 d-flex align-items-center gap-2">
            <img  class="pe-none" height="50px" width="50px" src="../assets/img/SVG/${payment.bank}.svg">
            <div class="pe-none">${payment.bank}</div>
            <div class="pe-none">****${lastNumbers}</div>
        </div>
        `
    });
    const paymentInfo = document.querySelector("#paymentInfo")
    const addPayment = document.querySelector("#addPayment")
    addPayment.addEventListener("click", event => {
        event.preventDefault()
        paymentInfo.innerHTML = ` 
        <div class="w-100 h-80 d-flex flex-column align-items-center mx-3">
            <div class="form-floating mb-2 w-100">
              <input type="text" class="form-control" id="cardName" placeholder="name">
              <label for="cardName">Card name (optional)</label>
            </div>
            <div class="form-floating mb-2 w-100">
              <input type="text" class="form-control" id="cardNumber" placeholder="Password">
              <label for="cardNumber">Number Card</label>
            </div>
            <div class="d-flex w-100 gap-2">
                <div class="form-floating w-50">
                    <input type="text" class="form-control" id="cardExpiry" placeholder="Password">
                    <label for="cardExpiry">Expiration Date</label>
                </div>
                <div class="form-floating w-50">
                    <input type="text" class="form-control" id="cardCVV" placeholder="Password">
                    <label for="cardCVV">CVV</label>
                </div>
            </div>
            <button id="addCard" type="button" class="btn btn-outline-success mt-3">Add Card</button>
         </div>  
        `
        const cardName = document.querySelector("#cardName")
        const cardNumber = document.querySelector("#cardNumber")
        const cardExpiry = document.querySelector("#cardExpiry")
        const cardCVV = document.querySelector("#cardCVV")
        const addCard = document.querySelector("#addCard")
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
    })

    paymentList.addEventListener("click", event => {
        event.preventDefault()
        let card = event.target.id
        let paymentInfoCurrent = userData.paymentMethods[card.substring(4)]
        const lastNumbers = paymentInfoCurrent.number.substring(12)
        paymentInfo.innerHTML = `
        <div class="w-100 h-70 d-flex flex-column align-items-center">
            <div class="visa-card">
                <div class="logoContainer">
                    <img height = "50px" width ="50px" class="svgLogo" src="../assets/img/SVG/${paymentInfoCurrent.bank}.svg">
                </div>
                <div class="number-container">
                  <label class="input-label" for="cardNumber">CARD NUMBER</label>
                  <div class="inputstyle" id="cardNumber">**** **** **** ${lastNumbers}</>
                </div>

                <div class="name-date-cvv-container">
                  <div class="name-wrapper">
                    <label class="input-label" for="holderName">CARD HOLDER</label>
                    <div class="inputstyle">${paymentInfoCurrent.name}</div>
                  </div>

                  <div class="expiry-wrapper">
                    <label class="input-label" for="expiry">VALID THRU</label>
                    <div class="inputstyle" id="expiry">${paymentInfoCurrent.expirationDate}</div>
                  </div>
                  <div class="cvv-wrapper">
                    <label class="input-label" for="cvv">CVV</label>
                    <div class="inputstyle" id="cvv">***</div>
                  </div>
                </div>
            </div>
        </div>
        <button id="removeCard" type="button" class="btn btn-outline-danger clamp2 mt-3">Remove Card</button>        
        `

        const removeCard = document.querySelector("#removeCard")
        removeCard.addEventListener("click", event => {
            showAlertDelete()
            event.preventDefault()
        })

        function showAlertDelete() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteCard()
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your card has been deleted.",
                        timer: 3000,
                        icon: "success"
                    });
                    location.reload()
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your card is safe :)",
                        icon: "error"
                    });
                }
            });
        }
        async function deleteCard() {
            const URLbase = "http://localhost:8080/api/v1/"
            try {
                responseRol = await fetch(`${URLbase}payment/${paymentInfoCurrent.id}`, {
                    method: 'DELETE',
                })
                console.log("eliminado");

            } catch (error) {
                console.log(error)
            }
        }

    })

}