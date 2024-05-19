const info = document.querySelector("#info")

export function payment(userData) {
    console.log(userData)
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

                        <div class="d-flex w-100 gap-3 addPaymet">
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
                        </div>    
                    </div>
                </div>
            </div>`


    const paymentList = document.querySelector("#paymentList")
    const paymentInfo = document.querySelector("#paymentInfo")
    paymentList.addEventListener("click", event => {
        event.preventDefault()
        let card = event.target
        console.log(card);
        paymentInfo.innerHTML = `
        <div class="w-100 h-70 d-flex flex-column align-items-center">
            <div class="visa-card">
                <div class="logoContainer">
                    <img class="svgLogo" src="../assets/img/SVG/mastercard.svg">
                </div>
                <div class="number-container">
                  <label class="input-label" for="cardNumber">CARD NUMBER</label>
                  <div class="inputstyle" id="cardNumber">**** **** **** 1234</>
                </div>

                <div class="name-date-cvv-container">
                  <div class="name-wrapper">
                    <label class="input-label" for="holderName">CARD HOLDER</label>
                    <div class="inputstyle">Andrea Velez</div>
                  </div>

                  <div class="expiry-wrapper">
                    <label class="input-label" for="expiry">VALID THRU</label>
                    <div class="inputstyle" id="expiry">06/26</div>
                  </div>
                  <div class="cvv-wrapper">
                    <label class="input-label" for="cvv">CVV</label>
                    <div class="inputstyle" id="cvv">***</div>
                  </div>
                </div>
            </div>
        </div>
        <button id="cancel_service" type="button" class="btn btn-outline-danger clamp2 mt-3">Remove Card</button>        
        `
    })
}