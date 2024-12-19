function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const location = `Lat: ${latitude}, Lng: ${longitude}`;
            alert(`Manzilingiz: ${location}`);
            localStorage.setItem('patientLocation', location);
            
            // Bemorning manzilini xaritada yangilash
            updateMap(latitude, longitude);
        }, function () {
            alert("Manzilni aniqlab bo'lmadi");
        });
    } else {
        alert("Brauzer geolokatsiyani qo'llab-quvvatlamaydi");
    }
}

function updateMap(latitude, longitude) {
    // Bemorning manzili bo'yicha xaritani yaratish
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 14
    });

    // Xaritada bemorning manzili joylashgan markerni qo'yish
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Bemorning Manzili"
    });
}

// Google Maps scriptini dinamik ravishda yuklash
function loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
}

function initMap() {
    const defaultLocation = { lat: 40.38331174487879, lng: 71.70705051122658 }; // Farg‘ona
    const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12
    });
    new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: "Fergana"
    });
}

// Sahifa yuklanganda xaritani ishga tushurish
window.onload = loadGoogleMaps;
