const info = document.querySelector("#info")

export function myWallet(driverData) {
    console.log(driverData)
    info.innerHTML = `<div id="payment" class="h-100 w-75">
    <span id="card-header">My Wallet</span>
    <div class="card mt-5 mb-5">
            <form>
                <div class="row row-1 m-3">
                    <div class="col-2"><img class="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png"/></div>
                    <div class="col-7">
                        <input type="text" placeholder="**** **** **** 3193">
                    </div>
                </div>
                <div class="row row-1 m-3">
                    <div class="col-2"><img  class="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png"/></div>
                        <div class="col-7">
                            <input type="text" placeholder="**** **** **** 4296">
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-success">ADD Card</button>
                </div>
                <div class="position-relative start-99">
                    <button type="button" class="btn btn-primary">Deposit</button>
                </div>
                <div class="position-relative start-101">
                    <button type="button" class="btn btn-danger">REMOVE</button>
                </div>
            </form   
    </div>`
}