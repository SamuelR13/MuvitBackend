const info = document.querySelector("#info")

export function myWallet(driverData) {
    console.log(driverData)
    info.innerHTML = `<div id="payment" class="h-100 w-100">
    <div class="card mt-5 mb-5">
            <form>
                <span id="card-header">My Wallet</span>
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
        </div></div>`
}