mapboxgl.accessToken = mapToken;
console.log(campground);
const camp = JSON.parse(campground);
console.log(camp);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: camp.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker().setLngLat(camp.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                 `<h3>${camp.title}</h3><p>${camp.location}</p>`
            )
    )
    .addTo(map);