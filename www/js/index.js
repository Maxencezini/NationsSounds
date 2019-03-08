/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.recupInfo('https://antonin-piroth.fr/wp-json/wp/v2/posts?per_page=100');
        app.burgertop();
    },

    recupInfo: function (data) {
        let url = data;

        // var test1 = document.createElement('div');
        // test1.innerHTML = 'je vais chercher lurl';
        // document.getElementById('debug').appendChild(test1);

        fetch(url)
            .then(res => res.json())
            .then((out) => app.remplitDocument(out))
            .catch(err => { throw err });
        console.log('Json Done');

        // var test2 = document.createElement('div');
        // test2.innerHTML = 'jai lurl';
        // document.getElementById('debug2').appendChild(test2);

    },

    remplitDocument: function (resultat) {

        // var test3 = document.createElement('div');
        // test3.innerHTML = 'je vais chercher lurl';
        // document.getElementById('debug3').appendChild(test3);

        var leContenu = document.getElementById('affichartiste');
        for (let article of resultat) {
            if (article.acf.type_article == 'artiste') {
                var nouveauDiv = document.createElement('div');
                nouveauDiv.classList.add('affichageArtiste1');

                var nouveauDiv2 = document.createElement('div');
                nouveauDiv2.classList.add('hello');

                var artistDiv = document.createElement('a');
                artistDiv.classList.add('aClass');

                var bannerDiv = document.createElement('img');
                bannerDiv.classList.add('banner');

                var bannerUrl = article.acf.banniere.sizes.large;
                bannerDiv.src = bannerUrl;

                var artistID = article.id;
                artistDiv.href = "artist.html?id=" + artistID + "";
                nouveauDiv2.appendChild(artistDiv);
                artistDiv.appendChild(bannerDiv);
                nouveauDiv.appendChild(nouveauDiv2);
                leContenu.appendChild(nouveauDiv);
            }
        }

        // var test4 = document.createElement('div');
        // test4.innerHTML = 'je vais chercher lurl';
        // document.getElementById('debug4').appendChild(test4);


    },

    burgertop: function() {
            $(document).ready(function () {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

            $('#dismiss, .overlay').on('click', function () {
                // hide sidebar
                $('#sidebar').removeClass('active');
                // hide overlay
                $('.overlay').removeClass('active');
            });

            $('#sidebarCollapse').on('click', function () {
                // open sidebar
                $('#sidebar').addClass('active');
                // fade in the overlay
                $('.overlay').addClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });
    }
    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// function recupInfo(data) {
//     let url = data;

//     fetch(url)
//         .then(res => res.json())
//         .then((out) => remplitDocument(out))
//         .catch(err => { throw err });
//     console.log('Json Done');
// }

// function remplitDocument(resultat) {

//     //console.log('Checkout this JSON! ', resultat);

//     var leContenu = document.getElementById('contenu');
//     for (let article of resultat) {
//         var nouveauDiv = document.createElement('div');
//         nouveauDiv.classList.add('container', 'text-center');

//         var nouveauDiv2 = document.createElement('div');
//         nouveauDiv2.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'col-xs-12', 'container_foto');

//         var nouveauDiv3 = document.createElement('article');
//         nouveauDiv3.classList.add('text-left');

//         var nouveauDiv4 = document.createElement('h2');
//         nouveauDiv4.classList.add('nomdesartistes');

//         var artistDiv = document.createElement('a');
//         artistDiv.classList.add('aClass');

//         var bannerDiv = document.createElement('img');
//         bannerDiv.classList.add('banner');

//         var bannerUrl = article.acf.banniere.sizes.thumbnail;
//         bannerDiv.src = bannerUrl;

//         var artistID = article.id;
//         artistDiv.innerHTML = article.acf.nom_artiste;
//         artistDiv.href = "artist.html?id=" + artistID + "";
//         nouveauDiv2.appendChild(bannerDiv);
//         nouveauDiv4.appendChild(artistDiv);
//         nouveauDiv3.appendChild(nouveauDiv4);
//         nouveauDiv2.appendChild(nouveauDiv3);
//         nouveauDiv.appendChild(nouveauDiv2);
//         leContenu.appendChild(nouveauDiv);
//     }
// }

// //Trouver comment passer en argument le lien article._links.self pour accéder aux données de l'artiste sur lequel on clique

// function recupID() {
//     if ((window.location.href).indexOf('?') != -1) {
//         var queryString = (window.location.href).substr((window.location.href).indexOf('?') + 1);

//         // "queryString" will now contain id=/article.id/

//         var value = (queryString.split('='))[1];

//         // "value" will now contain /article.id/

//         console.log(value);
//         recupInfoArtist(value);
//     }
// }

// function recupInfoArtist(data) {
//     let url = "https://antonin-piroth.fr/wp-json/wp/v2/posts/" + data;

//     fetch(url)
//         .then(res => res.json())
//         .then((out) => remplitDocumentArtist(out))
//         .catch(err => { throw err });
//     console.log('Json Done');
// }

// function remplitDocumentArtist(resultat) {

//     console.log('Checkout this JSON! ', resultat);

//     var leContenu = document.getElementById('contenu');
//     var nouveauDiv = document.createElement('div');
//     nouveauDiv.classList.add('divClass');
//     var bannerDiv = document.createElement('img');
//     bannerDiv.classList.add('banner');
//     var artistDiv = document.createElement('h2');
//     artistDiv.classList.add('h2Class');
//     var infoDiv = document.createElement('p');
//     infoDiv.classList.add('pClass');
//     var bannerUrl = resultat.acf.banniere.sizes.thumbnail;
//     bannerDiv.src = bannerUrl;
//     artistDiv.innerHTML = resultat.acf.nom_artiste;
//     infoDiv.innerHTML = "Date du concert : " +resultat.acf.date_concert+ ", heure du concert : " +resultat.acf.heure_concert+ ", scène : " +resultat.acf.scene+"";
//     nouveauDiv.appendChild(bannerDiv);
//     nouveauDiv.appendChild(artistDiv);
//     nouveauDiv.appendChild(infoDiv);
//     leContenu.appendChild(nouveauDiv);
// }

/* function remplitDocument(resultat) {

    //console.log('Checkout this JSON! ', resultat);

    var leContenu = document.getElementById('contenu');
    for (let article of resultat) {
        var nouveauDiv = document.createElement('div');
        nouveauDiv.classList.add('divClass');
        var bannerDiv = document.createElement('img');
        bannerDiv.classList.add('banner');
        var artistDiv = document.createElement('a');
        artistDiv.classList.add('aClass');
        var bannerUrl = article.acf.banniere.sizes.thumbnail;
        bannerDiv.src = bannerUrl;
        var artistID = article.id;
        artistDiv.innerHTML = article.acf.nom_artiste;
        artistDiv.href = "artist.html?id=" + artistID + "";
        nouveauDiv.appendChild(bannerDiv);
        nouveauDiv.appendChild(artistDiv);
        leContenu.appendChild(nouveauDiv);
    }
} */


/*
/////////////// Filtrage ///////////////////

function recupChoix() {
    let url = 'http://antonin-piroth.fr/wp-json/wp/v2/posts/?per_page=100';

    fetch(url)
        .then(res => res.json())
        .then((out) => afficherFilter(out))
        .catch(err => { throw err });
    console.log('Json Done');
}

function afficherFilter(resultat) {
    clearBox('contenu');
    console.log('Le tableau :');
    console.log(resultat);
    console.log('La taille du tableau : ' + resultat.length);

    var strDate = document.getElementById('date');
    var strScene = document.getElementById('scene');
    var strHeure = document.getElementById('heure');
    var strGenre = document.getElementById('genre');
    var i;
    for (i = 0; i < resultat.length; i++) {
        if ((strDate.value == "default" || strDate.options[strDate.selectedIndex].value == resultat[i].acf.date_concert) &&
            (strScene.value == "default" || strScene.options[strScene.selectedIndex].value == resultat[i].acf.scene) &&
            (strHeure.value == "default" || strHeure.options[strHeure.selectedIndex].value == resultat[i].acf.heure_concert) &&
            (strGenre.value == "default" || strGenre.options[strGenre.selectedIndex].value == resultat[i].acf.type_musique)
            ) {
            if (strDate.options[strDate.selectedIndex].value == "default" && 
            strScene.options[strScene.selectedIndex].value == "default" && 
            strHeure.options[strHeure.selectedIndex].value == "default" &&
            strGenre.options[strGenre.selectedIndex].value == "default") {
                alert('Remplissez les champs');
                break;
            } else {
                var leContenu = document.getElementById('contenu');
                var nouveauDiv = document.createElement('div');
                nouveauDiv.classList.add('divClass');
                var bannerDiv = document.createElement('img');
                bannerDiv.classList.add('banner');
                var artistDiv = document.createElement('a');
                artistDiv.classList.add('aClass');
                var bannerUrl = resultat[i].acf.banniere.sizes.thumbnail;
                bannerDiv.src = bannerUrl;
                var artistID = resultat[i].id;
                artistDiv.innerHTML = resultat[i].acf.nom_artiste;
                artistDiv.href = "artist.html?id=" + artistID;
                nouveauDiv.appendChild(bannerDiv);
                nouveauDiv.appendChild(artistDiv);
                leContenu.appendChild(nouveauDiv);
            }
        }
    }
}

//////// Nettoyage d'une DIV ///////
function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
}