
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
                
                <div id="mapaTrip" class="w-50 rounded-5 mx-5 my-5"></div>
                
                <div class = "w-50 h-100">
                    <div class ="d-flex w-100 justify-content-around align-items-center mb-2 my-3 text-center clamp1">
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
                        <li class="list-group-item d-flex justify-content-between">Date<span>Item1</span></li>
                        <li class="list-group-item d-flex justify-content-between">Time<span>Item1</span></li>
                    </ul>
                    <div class="d-flex my-3 justify-content-between">
                    <div class="d-flex gap-3 clamp2">
                        <button type="button" class="btn btn-outline-primary clamp2" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="+57 3106410560">Call <i class="bi bi-telephone"></i></button>
                        <a href="https://wa.me/573106410560" target="_blank" type="button" class="btn btn-outline-success clamp2">WhatsApp <i class="bi bi-whatsapp"></i></a>
                    </div>
                    <button id="cancel_service" type="button" class="btn btn-outline-danger clamp2">Cancel service</button>
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

    cancelService.addEventListener("click", () => {
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

    async function deleteService() {
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


    // -------------------------------------------MAP------------------------

    mapboxgl.accessToken =
        'pk.eyJ1Ijoia3dtZWppYSIsImEiOiJjbGl2eWk4eWwxb3dhM3Bxdm5kNGtpOXRrIn0.RaBQJtXzaW3dBHodhcQg2Q'
    let map = new mapboxgl.Map({
        //Configuramos el mapa segun lo que necesitamos
        container: 'mapaTrip',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.662323, 45.523751],
        zoom: 15,
        pitch: 45,
        bearing: -17.6,
    })
    var puntos = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-74.0090, 40.7128]
                },
                'properties': {
                    'title': 'Punto 1'
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-73.9990, 40.7028]
                },
                'properties': {
                    'title': 'Punto 2'
                }
            }
        ]
    };
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
    // an arbitrary start will always be the same
    // only the end or destination will change
    const start = [-122.662323, 45.523751]
    const end = [-122.662323, 45.6]
    getRoute(end)
    // create a function to make a directions request
    async function getRoute(end) {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        console.log(data)
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        }
        // otherwise, we'll make a new request
        else {
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }
        // add turn instructions here at the end
    }

    map.on('load', () => {
        // make an initial directions request that
        // starts and ends at the same location
        getRoute(start);

        // Add starting point to the map
        map.addLayer({
            id: 'point',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Point',
                                coordinates: start
                            }
                        }
                    ]
                }
            },
            paint: {
                'circle-radius': 10,
                'circle-color': '#3887be'
            }
        });
        // this is where the code from the next step will go
    });
}
