const info = document.querySelector("#info")

export function payment(userData) {
    console.log(userData)
    info.innerHTML = `<div id="payment" class="h-100 w-100">
    <div class="card mt-5 mb-5">
            <form>
                <span id="card-header">Saved cards:</span>
                <div class="row row-1">
                    <div class="col-2"><img class="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png"/></div>
                    <div class="col-7">
                        <input type="text" placeholder="**** **** **** 3193">
                    </div>
                    <div class="col-3 d-flex justify-content-center">
                        <a href="#">Remove card</a>
                    </div>
                </div>
                <div class="row row-1">
                    <div class="col-2"><img  class="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png"/></div>
                    <div class="col-7">
                        <input type="text" placeholder="**** **** **** 4296">
                    </div>
                    <div class="col-3 d-flex justify-content-center">
                        <a href="#">Remove card</a>
                    </div>
                </div>
                <span id="card-header">Add new card:</span>
                <div class="row-1">
                    <div class="row row-2">
                        <span id="card-inner">Card holder name</span>
                    </div>
                    <div class="row row-2">
                        <input type="text" placeholder="Bojan Viner">
                    </div>
                </div>
                <div class="row three">
                    <div class="col-7">
                        <div class="row-1">
                            <div class="row row-2">
                                <span id="card-inner">Card number</span>
                            </div>
                            <div class="row row-2">
                                <input type="text" placeholder="5134-5264-4">
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <input type="text" placeholder="Exp. date">
                    </div>
                    <div class="col-2">
                        <input type="text" placeholder="CVV">
                    </div>
                </div>
                <button type="button" class="btn btn-outline-warning">Add Card</button>
                </form>
        </div></div>`
}