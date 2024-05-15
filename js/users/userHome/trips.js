
const info = document.querySelector("#info");

export function trips(userData) {
  console.log(userData);
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
            <div class = "d-flex w-100 h-100">
                <div id="mapaTrip" class = "w-50 h-100">
                </div> 
                <div class = "w-50 h-100">
                    <div class ="d-flex w-100 justify-content-around align-items-center mb-3 my-3 text-center clamp1">
                        <p id="driver_name" class="d-flex text-center">Driver</p>
                        <img id="userPhoto" width="100px" height="100px" src="https://placehold.co/200x200/EEE/31343C?font=oswald&text=AM" alt="profile" class="rounded-circle">
                    </div>
                    <ul class="list-group list-group-flush clamp1">
                        <li class="list-group-item d-flex justify-content-between">Model<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">License plate<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">Assitants<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">Distancia<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">Service<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">Price<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">Payment method<span>Item1</span></li>
                    </ul>
                    <div class="d-flex my-3 justify-content-between">
                    <div class="d-flex gap-3 clamp1">
                        <button type="button" class="btn btn-outline-primary clamp1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="+57 3106410560">Call <i class="bi bi-telephone"></i></button>
                        <a href="https://wa.me/573106410560" target="_blank" type="button" class="btn btn-outline-success clamp1">WhatsApp <i class="bi bi-whatsapp"></i></a>
                    </div>
                    <button id="cancel_service" type="button" class="btn btn-outline-danger clamp1">Cancel service</button>
                    </div>
                </div> 
           </div> 
        </div>
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
            tabindex="0">...</div>

         </div>
    </div>`

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    const cancelService = document.querySelector("#cancel_service")

    cancelService.addEventListener("click", () =>{
        showAlertDelete()
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
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your service has been deleted.",
                    timer: 3000,
                    icon: "success"
                });
                deleteService()
                window.location.href = 'index.html'
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your service is safe :)",
                    icon: "error"
                });
            }
        });
    }

    async function deleteService(){
        const URLbase = "http://localhost:8080/api/v1/"
        try {
            responseRol = await fetch(`${URLbase}service/${userData.id}`, {
                method: 'DELETE',
            })
            console.log("eliminado");

        } catch (error) {
            console.log(error)
        }
    }

    if (!'geolocation' in navigator) {
        console.error('Geolocalización no disponible')
    } else {
        navigator.geolocation.getCurrentPosition(
            //Creamos el mapa
            position => {
                console.log(position)
                mapboxgl.accessToken =
                    'pk.eyJ1Ijoia3dtZWppYSIsImEiOiJjbGl2eWk4eWwxb3dhM3Bxdm5kNGtpOXRrIn0.RaBQJtXzaW3dBHodhcQg2Q'
                let map = new mapboxgl.Map({
                    //Configuramos el mapa segun lo que necesitamos
                    container: 'mapaTrip',
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 15,
                    pitch: 45,
                    bearing: -17.6,
                })
                //Introducimos una capa donde se muestran los edificos en 3D
                map.on('load', function () {
                    map.addLayer({
                        id: '3d-buildings',
                        source: 'composite',
                        'source-layer': 'building',
                        filter: ['==', 'extrude', 'true'],
                        type: 'fill-extrusion',
                        minzoom: 15,
                        paint: {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': {
                                type: 'identity',
                                property: 'height',
                            },
                            'fill-extrusion-base': {
                                type: 'identity',
                                property: 'min_height',
                            },
                            'fill-extrusion-opacity': 0.6,
                        },
                    })
                })
            },
            error => {
                console.error(error)
            }
        )
    }

}
