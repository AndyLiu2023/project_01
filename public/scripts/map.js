// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru

  const position = { lat: 23.2078884, lng: 120.3633866};
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: position,
    mapId: '72a7d3bf40f939ae'
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "CampSite",
  });
}

initMap();


