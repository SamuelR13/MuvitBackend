const info = document.querySelector("#info")

export function suggestions(userData) {
    console.log(userData)
    info.innerHTML = `<div class="contact-form h-100 w-100">
    <form method="post">
        <h3>Drop Us a Message</h3>
       <div class="row">
            <div class="col-md-6 gap-5">
            <div class="form-floating mb-3">
            <input type="text" class="form-control" id="suggestionName" placeholder="Your name">
            <label for="suggestionName">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="suggestionEmail" placeholder="Your email">
            <label for="suggestionEmail">Email</label>
          </div>
          <div class="form-floating mb-3">
          <input type="text" class="form-control" id="suggestionsPhone" placeholder="Your phone number">
          <label for="suggestionsPhone">Phone number</label>
            </div>

            <div class="form-group">
            <button type="button" class="btn btn-outline-warning">Send message</button>
            </div>
            
            </div>
            <div class="col-md-6">
            <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 200px"></textarea>
            <label for="floatingTextarea2">Comments</label>
          </div>
            </div>
        </div>
    </form>
</div>`
}