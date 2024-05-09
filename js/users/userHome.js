
const menu = document.querySelector("#menu")
const info = document.querySelector("#info")
const preferences = document.querySelector('#preferences')
const trips = document.querySelector('#trips')
const payment = document.querySelector('#payment')
const notifications = document.querySelector('#notifications')
const suggestions = document.querySelector('#suggestions')
const chat = document.querySelector('#chat')

const divs = {
    preferences: `<div id="preferences" class="h-100 w-100">
    <div class="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 shadow-md rounded-lg">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                <input type="text" id="name" name="name" value="Samuel Rodriguez" class="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 sm:text-sm">
            </div>
            <div>
            <label for="lastname" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Lastname</label>
            <input type="text" id="lastname" name="lastname" value="Samuel Rodriguez" class="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 sm:text-sm">
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <input type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 sm:text-sm">
        </div>
        <div>
        <label for="phoneNumber" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">phoneNumber</label>
        <input type="phoneNumber" id="phoneNumber" name="phoneNumber" class="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 sm:text-sm">
        <button id="updateBtn" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Update All</button>
        </div>
    </div>

    <div class="space-y-4">
        <div class="flex flex-col items-center">
            <label class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Profile picture</label>
            <div class="mt-1">
                <img class="w-32 h-32 rounded-full" src="https://placehold.co/128x128" alt="Profile Pictur  e">
            </div>
            <div class="relative mt-2">
                <button id="editBtn" class="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">Edit</button>
                <div id="editDropdown" class="absolute hidden bg-white dark:bg-zinc-800 shadow-md dark:shadow-md rounded-md mt-2">
                    <button class="block w-full px-4 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700">Edit Photo</button>
                    <button class="block w-full px-4 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700">Remove Photo</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

    </div>`,
    trips: `            <div id="trips" class="h-100 w-75 px-2">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"
                aria-selected="true">In progress</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane"
                aria-selected="false">History</button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
            tabindex="0">...</div>
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
            tabindex="0">...</div>
        <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
            tabindex="0">...</div>
    </div>
</div>` ,
    payment: `<div id="payment" class="h-100 w-75 px-2">PAYMENT</div>`,
    notifications: `<div id="notifications" class="h-100 w-75 px-2">NOTIFICATRIONS</div>`,
    suggestions: `<div class="contact-form h-100 w-100">
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
            <input type="submit" name="btnSubmit" class="btnContact" value="Send Message" />
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
</div>`,
    chat: `<div id="chat" class="h-100 w-75 px-2">chat</div>`
}

menu.addEventListener("click", (event) => {
    event.preventDefault()
    if (event.target.id == "home") window.location.href = '../index.html'
    console.log(event.target.id)
    info.innerHTML = divs[event.target.id]
})

