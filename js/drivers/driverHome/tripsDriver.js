const info = document.querySelector("#info")

export async function trips(driverData) {
    async function getAvailableServices() {
        const truckData = await getTruck()
        const URLbase = `http://localhost:8080/api/v1/service/available-service/${driverData.truck[0]["body"]}/5`;
        const response = await fetch(`${URLbase}`);
        const service = await response.json();
        const serviceData = await service;
        return serviceData;
    }
    async function getPendingServices() {
        const truckData = await getTruck()
        const URLbase = `http://localhost:8080/api/v1/service/pending-service/${driverData.truck[0]["body"]}/5`;
        const response = await fetch(`${URLbase}`);
        const service = await response.json();
        const serviceData = await service;
        return serviceData;
    }
    async function getTruck() {
        const URLtruck = "http://localhost:8080/api/v1/truck"
        const response = await fetch(`${URLtruck}`)
        const truck = await response.json()
        const truckData = await truck
        return truckData
      }
      
    async function getInactivesServices() {
        const URLbase = `http://localhost:8080/api/v1/service/driver/${driverData.id_driver}/inactive-service`;
        const response = await fetch(`${URLbase}`);

        const service = await response.json();
        const serviceData = await service;
        console.log(serviceData);
        return serviceData;
    }
    getPendingServices()
    getInactivesServices()
    getAvailableServices()
    info.innerHTML = `            
    <div id="trips" class="h-100 w-75 px-2">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="service" data-bs-toggle="tab"
            data-bs-target="#service-tab" type="button" role="tab" aria-controls="service"
            aria-selected="false">Services</button>
    </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="in-progress" data-bs-toggle="tab"
                data-bs-target="#in-progress-tab" type="button" role="tab" aria-controls="in-progress"
                aria-selected="false">In Progress</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"
                aria-selected="true">My Agenda</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane"
                aria-selected="false">History</button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
            tabindex="0">
            <div class="d-flex flex-column h-100 w-100">
                <div class ="d-flex flex-column h-100 w-100">
                    <div id="pendingServices" class="w-100 h-100 d-flex flex-column justify-content-around p-4"></div>
                    <div class="w-100 h-10 d-flex justify-content-center  bottom-0">
                        <nav class="pagination-outer" aria-label="Page navigation">
                            <div id="paginationContainerPending">
                                <ul id="paginationControlsPending" class="pagination"></ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
            tabindex="0">
            <div class="d-flex flex-column h-100 w-100">
                <div class ="d-flex flex-column h-100 w-100">
                    <div id="inactiveServices" class="w-100 h-100 d-flex flex-column justify-content-around p-4"></div>
                    <div class="w-100 h-10 d-flex justify-content-center  bottom-0">
                        <nav class="pagination-outer" aria-label="Page navigation">
                            <div id="paginationContainerInactive">
                                <ul id="paginationControlsInactive" class="pagination"></ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane fade" id="in-progress-tab" role="tabpanel" aria-labelledby="in-progress"
            tabindex="0">
            <div>
                <h1 class="sizeFont" >No services in progress</h1>
            </div>
        </div>
        <div class="tab-pane fade" id="service-tab" role="tabpanel" aria-labelledby="service"
            tabindex="0"><div class="d-flex flex-column h-100 w-100">
            <div class ="d-flex flex-column h-100 w-100">
                <div id="activeServices" class="w-100 h-100 d-flex flex-column justify-content-around p-4"></div>
                <div class="w-100 h-10 d-flex justify-content-center  bottom-0">
                    <nav class="pagination-outer" aria-label="Page navigation">
                        <div id="paginationContainer">
                            <ul id="paginationControls" class="pagination"></ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>`

    const availableService = await getAvailableServices();
    console.log(availableService);
    displayAvailableService(availableService)
    function displayAvailableService(activeService) {
        const page = 0;
        const size = 3;
        const activeServiceList = activeService.content
        console.log(activeServiceList);
        const currentPage = activeService.number
        const activeServices = document.querySelector("#activeServices")
        activeServices.innerHTML = ""

        activeServiceList.forEach(service => {
            activeServices.innerHTML += `
                <div id="inactiveCard" class="card w-100 mb-3 p-1">  
                    <div class="card-body">
                        <div id="inactiveCardInfo" class="d-flex flex-column gap-2 align-content-around inactiveServiceCard">
                            <div class="d-flex justify-content-between">
                                <div class ="typeColor inactiveServiceCard">${service.typeService}</div><div class ="priceColor">$ ${service.price}</div>
                            </div>
                            <div class="inactiveServiceCard"><i class="bi bi-clock"></i> ${service.date} / ${service.time}</div>
                            <div id="ubicationsServiceLarge" class="d-none">
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:green"></i> ${service.startPoint}</div>
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:#2dbaed"></i> ${service.finalPoint}</div>
                            </div>
                            <div id="ubicationsServiceMedium" class="d-flex gap-1">
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:green"></i> ${service.startPoint}</div>
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:#2dbaed"></i> ${service.finalPoint}</div>
                            </div>
                            <div style="color: #4cff34;" ><i class="bi bi-truck" style="color: #f87538"></i> <span>Service: </span>${service.statusService}</div>
                            </div>
                    </div>
                </div>
            `
        });
        updatePaginationControls(activeService.totalPages, currentPage, activeService.size)
    }

    const pendingService = await getPendingServices();
    displayPendingService(pendingService)
    function displayPendingService(pendingService) {
        const page = 0;
        const size = 3;
        const pendingServiceList = pendingService.content
        const currentPage = pendingService.number
        const pendingServices = document.querySelector("#pendingServices")
        pendingServices.innerHTML = ""

        pendingServiceList.forEach(service => {
            pendingServices.innerHTML += `
                <div id="inactiveCard" class="card w-100 mb-3 p-1">  
                    <div class="card-body">
                        <div id="inactiveCardInfo" class="d-flex flex-column gap-2 align-content-around inactiveServiceCard">
                            <div class="d-flex justify-content-between">
                                <div class ="typeColor inactiveServiceCard">${service.typeService}</div><div class ="priceColor">$ ${service.price}</div>
                            </div>
                            <div class="inactiveServiceCard"><i class="bi bi-clock"></i> ${service.date} / ${service.time}</div>
                            <div id="ubicationsServiceLarge" class="d-none">
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:green"></i> ${service.startPoint}</div>
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:#2dbaed"></i> ${service.finalPoint}</div>
                            </div>
                            <div id="ubicationsServiceMedium" class="d-flex gap-1">
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:green"></i> ${service.startPoint}</div>
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:#2dbaed"></i> ${service.finalPoint}</div>
                            </div>
                            <div style="color: #008ad4;" ><i class="bi bi-truck" style="color: #f87538"></i> <span>Service: </span>${service.statusService}</div>
                            </div>
                    </div>
                </div>
            `
        });
        updatePaginationControlsPending(pendingService.totalPages, currentPage, pendingService.size)
    }

    const inactiveService = await getInactivesServices()
    displayInactiveService(inactiveService, driverData)
    function displayInactiveService(inactiveService, driverData) {
        const page = 0;
        const size = 3;
        const inactiveServiceList = inactiveService.content
        const currentPage = inactiveService.number
        const inactiveServices = document.querySelector("#inactiveServices")
        inactiveServices.innerHTML = ""

        inactiveServiceList.forEach(service => {
            inactiveServices.innerHTML += `
                <div id="inactiveCard" class="card w-50 mb-3 p-1">  
                    <div class="card-body">
                        <div id="inactiveCardInfo" class="d-flex flex-column gap-2 align-content-around inactiveServiceCard">
                            <div class="d-flex justify-content-between">
                                <div class ="typeColor inactiveServiceCard">${service.typeService}</div><div class ="priceColor">$ ${service.price}</div>
                            </div>
                            <div class="inactiveServiceCard"><i class="bi bi-clock"></i> ${service.date} / ${service.time}</div>
                            <div id="ubicationsServiceLarge" class="d-none">
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:green"></i> ${service.startPoint}</div>
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:#2dbaed"></i> ${service.finalPoint}</div>
                            </div>
                            <div id="ubicationsServiceMedium" class="d-flex gap-1">
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:green"></i> ${service.startPoint}</div>
                            <div class="inactiveServiceCard"><i class="bi bi-geo-alt-fill" style="color:#2dbaed"></i> ${service.finalPoint}</div>
                            </div>
                            <div style="color: #f41414;" ><i class="bi bi-truck" style="color: #f87538"></i> <span>Service: </span>${service.statusService}</div>
                            </div>
                    </div>
                </div>
            `
        });
        updatePaginationControlsInactive(inactiveService.totalPages, currentPage, inactiveService.size, driverData)
    }

    function updatePaginationControlsInactive(totalPages, currentPage, size, driverData) {

        const paginationControls = document.querySelector("#paginationControlsInactive")
        paginationControls.innerHTML = `                                    <li class="page-item">
        <a id="previus" href="" class="page-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </a>
    </li>`
        for (let i = 1; i <= totalPages; i++) {
            paginationControls.innerHTML += `<li id="page${i}" class="page-item currentPage"><a class="page-link" href="">${i}</a></li`
        }
        paginationControls.innerHTML += ` <li class="page-item">
        <a id="next" href="" class="page-link" aria-label="Next">
            <span aria-hidden="true">»</span>
        </a>
        </li>`
        const prevButton = document.querySelector("#previus");
        const nextButton = document.querySelector("#next");
        const currentDiplayPage = document.querySelector("#paginationContainerInactive")
        const activePage = document.querySelector(`#page${currentPage + 1}`)

        activePage.classList.add("active")

        currentPage === 0 ? prevButton.classList.add("disabled") : "prev";

        currentPage === totalPages - 1 ? nextButton.classList.add("disabled") : "next";

        prevButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetchPaginatedDataforInactive(currentPage - 1, size, driverData)
        });
        nextButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetchPaginatedDataforInactive(currentPage + 1, size, driverData)
        });

        currentDiplayPage.addEventListener("click", (event) => {
            event.preventDefault()
            if (event.target.classList.contains("page-link")) {
                fetchPaginatedDataforInactive(event.target.textContent - 1, size, driverData)
            }
        })
    }


    function updatePaginationControls(totalPages, currentPage, size) {
        const paginationControls = document.querySelector("#paginationControls")
        paginationControls.innerHTML = `                                    <li class="page-item">
        <a id="previus" href="" class="page-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </a>
    </li>`
        for (let i = 1; i <= totalPages; i++) {
            paginationControls.innerHTML += `<li id="page${i}" class="page-item currentPage"><a class="page-link" href="">${i}</a></li`
        }
        paginationControls.innerHTML += ` <li class="page-item">
        <a id="next" href="" class="page-link" aria-label="Next">
            <span aria-hidden="true">»</span>
        </a>
        </li>`
        const prevButton = document.querySelector("#previus");
        const nextButton = document.querySelector("#next");
        const currentDiplayPage = document.querySelector("#paginationContainer")
        const activePage = document.querySelector(`#page${currentPage + 1}`)

        activePage.classList.add("active")

        currentPage === 0 ? prevButton.classList.add("disabled") : "prev";

        currentPage === totalPages - 1 ? nextButton.classList.add("disabled") : "next";

        prevButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetchPaginatedData(currentPage - 1, size)
        });
        nextButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetchPaginatedData(currentPage + 1, size)
        });

        currentDiplayPage.addEventListener("click", (event) => {
            event.preventDefault()
            if (event.target.classList.contains("page-link")) {
                fetchPaginatedData(event.target.textContent - 1, size)
            }
        })
    }
    function updatePaginationControlsPending(totalPages, currentPage, size) {
        const paginationControls = document.querySelector("#paginationControlsPending")
        paginationControls.innerHTML = `                                    <li class="page-item">
        <a id="previus" href="" class="page-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </a>
    </li>`
        for (let i = 1; i <= totalPages; i++) {
            paginationControls.innerHTML += `<li id="page${i}" class="page-item currentPage"><a class="page-link" href="">${i}</a></li`
        }
        paginationControls.innerHTML += ` <li class="page-item">
        <a id="next" href="" class="page-link" aria-label="Next">
            <span aria-hidden="true">»</span>
        </a>
        </li>`
        const prevButton = document.querySelector("#previus");
        const nextButton = document.querySelector("#next");
        const currentDiplayPage = document.querySelector("#paginationContainerPending")
        const activePage = document.querySelector(`#page${currentPage + 1}`)

        activePage.classList.add("active")

        currentPage === 0 ? prevButton.classList.add("disabled") : "prev";

        currentPage === totalPages - 1 ? nextButton.classList.add("disabled") : "next";

        prevButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetchPaginatedDataPending(currentPage - 1, size)
        });
        nextButton.addEventListener('click', (event) => {
            event.preventDefault()
            fetchPaginatedDataPending(currentPage + 1, size)
        });

        currentDiplayPage.addEventListener("click", (event) => {
            event.preventDefault()
            if (event.target.classList.contains("page-link")) {
                fetchPaginatedDataPending(event.target.textContent - 1, size)
            }
        })
    }
    

    async function fetchPaginatedData(newPage, pageSize) {
        const URLbase = `http://localhost:8080/api/v1/service/available-service/${driverData.truck[0]["body"]}/5?page=${newPage}&size=${pageSize}`;
        // const URLbaseDriver = `http://localhost:8080/api/v1/service/driver/${driver.id_driver}/inactive-service?page=${newPage}&size=${pageSize}`
        const response = await fetch(`${URLbase}`);
        if (response.status === 404) {
            notFound();
        }
        const activeService = await response.json();
        const activeServiceData = await activeService;
        console.log(activeService);
        displayAvailableService(activeServiceData)
    }

    async function fetchPaginatedDataPending(newPage, pageSize) {
        const URLbase = `http://localhost:8080/api/v1/service/pending-service/${driverData.truck[0]["body"]}/5?page=${newPage}&size=${pageSize}`;
        // const URLbaseDriver = `http://localhost:8080/api/v1/service/driver/${driver.id_driver}/inactive-service?page=${newPage}&size=${pageSize}`
        const response = await fetch(`${URLbase}`);
        if (response.status === 404) {
            notFound();
        }
        const activeService = await response.json();
        const activeServiceData = await activeService;
        console.log(activeService);
        getPendingServices(activeServiceData)
    }

    async function fetchPaginatedDataforInactive(newPage, pageSize, driverData) {
        const URLbase = `http://localhost:8080/api/v1/service/driver/${driverData.id_driver}/inactive-service?page=${newPage}&size=${pageSize}`
        const response = await fetch(`${URLbase}`);
        if (response.status === 404) {
            notFound();
        }
        const inactiveService = await response.json();
        const inactiveServiceData = await inactiveService;
        displayInactiveService(inactiveServiceData, driverData)
    }

    function notFound() {
        info.innerHTML = `            
        <div id="trips" class="h-100 w-75 px-2">
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
            <div class="tab-pane fade show active h-100 w-100" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                tabindex="0">
                <div class = "d-flex w-100 h-100 justify-content-center align-items-center flex-column my-5">
                   <div class="clamp1"> You have no active services at this time </div>
                   <div class="my-5"> <img id="userPhoto" width="300px" height="300px" src="../assets/img/imgUsers/UniversalUpscaler_7a916b19-aef7-424f-9206-cf8e51fe1352.jpg" alt="profile" class="rounded-circle"></div>
                   <div class="mb-2">
                        <div class="clamp1">Order your service </div>
                        <div class="clamp1 d-flex justify-content-center my-2"><button  id="editButton" class="btn btn-outline-warning"><a href="../index.html">MUVIT!</a></button></div>
                   </div>
               </div> 
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                tabindex="0">...</div>
    
             </div>
        </div>`;
    }
}
