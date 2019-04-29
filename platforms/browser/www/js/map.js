function recupPins() {
    let url = 'http://antonin-piroth.fr/wp-json/wp/v2/posts/?per_page=100';

    fetch(url)
        .then(res => res.json())
        .then((out) => initMap(out))
        .catch(err => { throw err });
}

// tableau exterieur pour utiliser dans d'autres fonctions
var tab = [];
var map;
var maPosition;
var dest;

// Initialize and add the map
function initMap(resultats) {
    /* // initialiser 4 tableaux vide
    var tab_coor = [];
    var tab_nom = [];
    var tab_type = []; */


    // The location of Paris - La Villette
    var center = { lat: 48.893937, lng: 2.390411 };
    // The map, centered at Paris - La Villette
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 16, center: center, styles: [
                {
                    featureType: 'poi.business',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
    getLocation();
    for (let pins of resultats) {
        if (pins.categories == '7') {
            /* // ajouter au tableau des objets de type tab_coor[pins] = {lat: 'number', lng: 'number'}
            tab_coor.push({ lat: parseFloat(pins.acf.latitude), lng: parseFloat(pins.acf.longitude) });
            // ajouter au tableau des objets de type tab_nom[pins] = {'nom'}
            tab_nom.push(pins.acf.name);
            // aujouter au tableau des objets sur le type du pins
            tab_type.push(pins.acf.categorie); */

            var coord = { lat: parseFloat(pins.acf.latitude), lng: parseFloat(pins.acf.longitude) };
            var img = pins.acf.img;
            
            dest = new google.maps.LatLng(parseFloat(pins.acf.latitude), parseFloat(pins.acf.longitude));

            let contentString = "<div>" + pins.acf.name + "</div>" + "<button onclick=\"calculateRoute(" + dest + ")\">Itinéraire</button>";
            let infowindow = new google.maps.InfoWindow({ content: contentString });

            let lemarker = new google.maps.Marker({ position: coord, map: map, tag: pins.acf.categorie, /*label: {text: pins.acf.name, color: "#000000"},*/ icon: img });
            tab.push(lemarker);


            lemarker.addListener('click', (function () {
                let marqueurActuel = lemarker;
                return function () { infowindow.open(map, lemarker); }
            })());
        }
    }
    console.log(tab);
    // For each post with marker
    /* var i;
    for (i = 0; i < tab_nom.length; i++) {
        tab.push(new google.maps.Marker({ position: tab_coor[i], map: map, tag: tab_type[i], label: tab_nom[i] }));
    } */

    var items = document.getElementsByName('chk');
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox')
            items[i].checked = true;
    }

}

function hideshow(type) {
    if (document.getElementById(type).checked) {
        for (i = 0; i < tab.length; i++) {
            if (tab[i].tag == document.getElementById(type).value) {
                tab[i].setVisible(true);
            }
        }
    }
    else {
        for (i = 0; i < tab.length; i++) {
            if (tab[i].tag == document.getElementById(type).value) {
                tab[i].setVisible(false);
            }
        }
    }
}


////// GEOLOC //////

function getLocation() {
    /* navigator.geolocation.getCurrentPosition(onSuccess, onError); */
    var watchID;

    if (navigator.geolocation) {
        var optn = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
        };
        var watchID = navigator.geolocation.watchPosition(succes, onError, optn);
    } else {
        console.log('erreur1');
    }
}

function succes(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    maPosition = new google.maps.LatLng(latitude, longitude);
    /* 
        var mapOptions = {
            center: maPosition,
            zoom: 16,
        };
        console.log('map vide:', map);
    
        map = new google.maps.Map(document.getElementById("maploc"), mapOptions);
    
        console.log('map après init', map); */

    var marker = new google.maps.Marker({
        position: maPosition,
        map: map,
        title: 'my location'
    });

}

function onError(error) {
    alert("the code is " + error.code + ". \n" + "message: " + error.message);
}

function calculateRoute() {

    var epsi = new google.maps.LatLng(43.643149, 3.839611);
    var bk = new google.maps.LatLng(43.648025, 3.841799);

    var request = {
        origin: maPosition,
        destination: dest,
        travelMode: 'WALKING'
    };

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);
    console.log('la carte', map);
    directionsService.route(request, function (result, status) {

        if (status == "OK") {
            directionsDisplay.setDirections(result);
        }

    });
}








/* var longitudeOrgn;
var latitudeOrgn;


function isok(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    console.log('postion', latitude, longitude);
    longitudeOrgn = position.coords.longitude;
    latitudeOrgn = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        center: latLong,
        zoom: 13,
    };

    var maploc = new google.maps.Map(document.getElementById("maploc"), mapOptions);

    var marker = new google.maps.Marker({
        position: latLong,
        map: maploc,
        title: 'my location'
    });
}

function calculateRoute() {
    console.log(latitudeOrgn, longitudeOrgn);
    var position = new google.maps.LatLng(latitudeOrgn, longitudeOrgn);
    var test = new google.maps.LatLng(43.6318145, 3.9085518);
    var epsi = new google.maps.LatLng(43.643211, 3.838969);
    console.log(epsi);
    console.log(test);

    var request = {
        origin: test,
        destination: epsi,
        travelMode: 'DRIVING'
    };

    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    directionsDisplay.setMap(document.getElementById("maploc"));

    directionsService.route(request, function (result, status) {

        if (status == "OK") {
            directionsDisplay.setDirections(result);
        }

    });
} */










/////////SIDE MENU/////////////

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

