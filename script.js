var IP_address = document.getElementById('IP');
var locate = document.getElementById('location');
var time = document.getElementById('Timezone');
var InternetserviceProvider = document.getElementById('ISP');
const btn = document.querySelector('#icon');

var marker;


var map= map = L.map('map').setView([18.52, 73.86], 13);
function updateMyMap(newLat, newLong){
  map.setView([newLat,newLong])
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  marker = L.marker([newLat, newLong]).addTo(map);
}
var fetchlocation = () => {
  fetch('https://ipapi.co/json')
    .then(response => response.json())
    .then(data => {
      let newLat = data.latitude;
      let newLong = data.longitude;
      let address = data.ip;
      let timeZone = data.utc_offset;
      let ISP = data.org;
      Citylocation = data.city;
      datamap(address, timeZone, ISP, Citylocation);
      updateMyMap(newLat, newLong)
    });
}

fetchlocation();

function datamap(address, timeZone, ISP, location) {
  IP_address.innerHTML = address;
  locate.innerHTML = location;
  time.innerHTML = timeZone;
  InternetserviceProvider.innerHTML = ISP;
}

btn.addEventListener('click', (e) => {
  const input = document.getElementById('find').value;
  e.preventDefault();
  const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipAddressRegex.test(input)) {
    fetch(`https://ipapi.co/${input}/json`)
      .then(response => response.json())
      .then(data => {
        let newLat = data.latitude;
        let newLong = data.longitude;
        let address = data.ip;
        let timeZone = data.utc_offset;
        let ISP = data.org;
        Citylocation = data.city;
        datamap(address, timeZone, ISP, Citylocation);

        // Update map view and marker
        updateMyMap(newLat, newLong)
      });
  }
});


