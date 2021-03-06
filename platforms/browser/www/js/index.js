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
        app.recupID();
        app.recupInfoArtist();
        app.afficherFilter();
        app.clearBox();
        app.goAccueil();
        app.mapFilter();
        app.recupNotif();
        app.afficherPoint();
        app.afficherNotif();
        app.fermerNotif();

        window.plugins.PushbotsPlugin.initialize("5ca248580540a366b83faf22", {"android":{"sender_id":"1085324559565"}});
        // Only with First time registration
        window.plugins.PushbotsPlugin.on("registered", function(token){
            console.log("Registration Id:" + token);
        });

        //Get user registrationId/token and userId on PushBots, with evey launch of the app even launching with notification
        window.plugins.PushbotsPlugin.on("user:ids", function(data){
            console.log("user:ids" + JSON.stringify(data));
        });

        /* FONCTION POUR NOTIFICATION PUSH */
        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          };
        
          window.plugins.OneSignal
            .startInit("53609973-906a-4364-b3a4-e80e535a6844")
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
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
    recupID: function() {
        if ((window.location.href).indexOf('?') != -1) {
            var queryString = (window.location.href).substr((window.location.href).indexOf('?') + 1);
    
            // "queryString" will now contain id=/article.id/
    
            var value = (queryString.split('='))[1];
    
            // "value" will now contain /article.id/
    
            console.log(value);
            recupInfoArtist(value);
        }
    },

    recupInfoArtist:function(data) {
        let url = "https://antonin-piroth.fr/wp-json/wp/v2/posts/" + data;
    
        fetch(url)
            .then(res => res.json())
            .then((out) => remplitDocumentArtist(out))
            .catch(err => { throw err });
        console.log('Json Done');
    },

    afficherFilter:function(resultat) {
        app.clearBox('contenu');
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
                    nouveauDiv.classList.add('affichageArtiste1');

                    var nouveauDiv2 = document.createElement('div');
                    nouveauDiv2.classList.add('hello');

                    var artistDiv = document.createElement('a');
                    artistDiv.classList.add('aClass');

                    var bannerDiv = document.createElement('img');
                    bannerDiv.classList.add('banner');

                    var bannerUrl = resultat[i].acf.banniere.sizes.large;
                    bannerDiv.src = bannerUrl;
                    var artistID = resultat[i].id;
                    artistDiv.href = "artist.html?id=" + artistID + "";
                    nouveauDiv2.appendChild(artistDiv);
                    artistDiv.appendChild(bannerDiv)
                    nouveauDiv.appendChild(nouveauDiv2);
                    leContenu.appendChild(nouveauDiv);

                }
            }
        }
    },

    recupChoix:function() {
        let url = 'http://antonin-piroth.fr/wp-json/wp/v2/posts/?per_page=100';
    
        fetch(url)
            .then(res => res.json())
            .then((out) => app.afficherFilter(out))
            .catch(err => { throw err });
        console.log('Json Done');
    },

    clearBox:function(elementID) {
        document.getElementById(elementID).innerHTML = "";
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
    },

    goAccueil: function() {
        {
        var dirPath = dirname(location.href);
        fullPath = dirPath + "/index.html";
        window.location=fullPath;
        }
        function dirname(path)
        {
        return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
        }
    },

    mapFilter: function(){
        if(document.getElementById('STbox').checked){
            document.getElementById('ST1').style.display = 'block';
            document.getElementById('ST2').style.display = 'block';
            document.getElementById('ST3').style.display = 'block';
        } else {
            document.getElementById('ST1').style.display = 'none';
            document.getElementById('ST2').style.display = 'none';
            document.getElementById('ST3').style.display = 'none';
        }
    },

    recupNotif: function() {
        let url = 'http://antonin-piroth.fr/wp-json/wp/v2/posts/?per_page=100';
    
        fetch(url)
            .then(res => res.json())
            .then((out) => afficherPoint(out))
            .catch(err => { throw err });
    },
    
    afficherPoint: function(resultat) {
        var compteur = 0;
        for (i = 0; i < resultat.length; i++) {
            if (resultat[i].categories[0] == '5') {
                var compteur = compteur + 1;
    
                var buttonDiv = document.getElementById('push');
                buttonDiv.innerHTML = compteur;
                var parentDiv = document.getElementById('notification');
                var titlenews = document.createElement('p');
                titlenews.innerHTML = resultat[i].title.rendered;
                var contentnews = document.createElement('p');
                contentnews.innerHTML = resultat[i].content.rendered;
                parentDiv.appendChild(titlenews);
                parentDiv.appendChild(contentnews);
            }
        }
    },
    
    afficherNotif: function(){
        document.getElementById('notification').style.display = "block";
    },
    
    fermerNotif: function(){
        document.getElementById('notification').style.display = "none";
    },
};
// // function recupInfo(data) {
// //     let url = data;

// //     fetch(url)
// //         .then(res => res.json())
// //         .then((out) => remplitDocument(out))
// //         .catch(err => { throw err });
// //     console.log('Json Done');
// // }

// // function remplitDocument(resultat) {

// //     //console.log('Checkout this JSON! ', resultat);

// //     var leContenu = document.getElementById('contenu');
// //     for (let article of resultat) {
// //         var nouveauDiv = document.createElement('div');
// //         nouveauDiv.classList.add('container', 'text-center');

// //         var nouveauDiv2 = document.createElement('div');
// //         nouveauDiv2.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'col-xs-12', 'container_foto');

// //         var nouveauDiv3 = document.createElement('article');
// //         nouveauDiv3.classList.add('text-left');

// //         var nouveauDiv4 = document.createElement('h2');
// //         nouveauDiv4.classList.add('nomdesartistes');

// //         var artistDiv = document.createElement('a');
// //         artistDiv.classList.add('aClass');

// //         var bannerDiv = document.createElement('img');
// //         bannerDiv.classList.add('banner');

// //         var bannerUrl = article.acf.banniere.sizes.thumbnail;
// //         bannerDiv.src = bannerUrl;

// //         var artistID = article.id;
// //         artistDiv.innerHTML = article.acf.nom_artiste;
// //         artistDiv.href = "artist.html?id=" + artistID + "";
// //         nouveauDiv2.appendChild(bannerDiv);
// //         nouveauDiv4.appendChild(artistDiv);
// //         nouveauDiv3.appendChild(nouveauDiv4);
// //         nouveauDiv2.appendChild(nouveauDiv3);
// //         nouveauDiv.appendChild(nouveauDiv2);
// //         leContenu.appendChild(nouveauDiv);
// //     }
// // }

// // //Trouver comment passer en argument le lien article._links.self pour accéder aux données de l'artiste sur lequel on clique

// // function remplitDocumentArtist(resultat) {

// //     console.log('Checkout this JSON! ', resultat);

// //     var leContenu = document.getElementById('contenu');
// //     var nouveauDiv = document.createElement('div');
// //     nouveauDiv.classList.add('divClass');
// //     var bannerDiv = document.createElement('img');
// //     bannerDiv.classList.add('banner');
// //     var artistDiv = document.createElement('h2');
// //     artistDiv.classList.add('h2Class');
// //     var infoDiv = document.createElement('p');
// //     infoDiv.classList.add('pClass');
// //     var bannerUrl = resultat.acf.banniere.sizes.thumbnail;
// //     bannerDiv.src = bannerUrl;
// //     artistDiv.innerHTML = resultat.acf.nom_artiste;
// //     infoDiv.innerHTML = "Date du concert : " +resultat.acf.date_concert+ ", heure du concert : " +resultat.acf.heure_concert+ ", scène : " +resultat.acf.scene+"";
// //     nouveauDiv.appendChild(bannerDiv);
// //     nouveauDiv.appendChild(artistDiv);
// //     nouveauDiv.appendChild(infoDiv);
// //     leContenu.appendChild(nouveauDiv);
// // }

// /* function remplitDocument(resultat) {

//     //console.log('Checkout this JSON! ', resultat);

//     var leContenu = document.getElementById('contenu');
//     for (let article of resultat) {
//         var nouveauDiv = document.createElement('div');
//         nouveauDiv.classList.add('divClass');
//         var bannerDiv = document.createElement('img');
//         bannerDiv.classList.add('banner');
//         var artistDiv = document.createElement('a');
//         artistDiv.classList.add('aClass');
//         var bannerUrl = article.acf.banniere.sizes.thumbnail;
//         bannerDiv.src = bannerUrl;
//         var artistID = article.id;
//         artistDiv.innerHTML = article.acf.nom_artiste;
//         artistDiv.href = "artist.html?id=" + artistID + "";
//         nouveauDiv.appendChild(bannerDiv);
//         nouveauDiv.appendChild(artistDiv);
//         leContenu.appendChild(nouveauDiv);
//     }
// } */


// /*
// /////////////// Filtrage ///////////////////

// function afficherFilter(resultat) {
//     clearBox('contenu');
//     console.log('Le tableau :');
//     console.log(resultat);
//     console.log('La taille du tableau : ' + resultat.length);

//     var strDate = document.getElementById('date');
//     var strScene = document.getElementById('scene');
//     var strHeure = document.getElementById('heure');
//     var strGenre = document.getElementById('genre');
//     var i;
//     for (i = 0; i < resultat.length; i++) {
//         if ((strDate.value == "default" || strDate.options[strDate.selectedIndex].value == resultat[i].acf.date_concert) &&
//             (strScene.value == "default" || strScene.options[strScene.selectedIndex].value == resultat[i].acf.scene) &&
//             (strHeure.value == "default" || strHeure.options[strHeure.selectedIndex].value == resultat[i].acf.heure_concert) &&
//             (strGenre.value == "default" || strGenre.options[strGenre.selectedIndex].value == resultat[i].acf.type_musique)
//             ) {
//             if (strDate.options[strDate.selectedIndex].value == "default" && 
//             strScene.options[strScene.selectedIndex].value == "default" && 
//             strHeure.options[strHeure.selectedIndex].value == "default" &&
//             strGenre.options[strGenre.selectedIndex].value == "default") {
//                 alert('Remplissez les champs');
//                 break;
//             } else {
//                 var leContenu = document.getElementById('contenu');
//                 var nouveauDiv = document.createElement('div');
//                 nouveauDiv.classList.add('divClass');
//                 var bannerDiv = document.createElement('img');
//                 bannerDiv.classList.add('banner');
//                 var artistDiv = document.createElement('a');
//                 artistDiv.classList.add('aClass');
//                 var bannerUrl = resultat[i].acf.banniere.sizes.thumbnail;
//                 bannerDiv.src = bannerUrl;
//                 var artistID = resultat[i].id;
//                 artistDiv.innerHTML = resultat[i].acf.nom_artiste;
//                 artistDiv.href = "artist.html?id=" + artistID;
//                 nouveauDiv.appendChild(bannerDiv);
//                 nouveauDiv.appendChild(artistDiv);
//                 leContenu.appendChild(nouveauDiv);
//             }
//         }
//     }
// }

// //////// Nettoyage d'une DIV ///////
// function clearBox(elementID) {
//     document.getElementById(elementID).innerHTML = "";
// }


//////// Notifications /////////

///// HTML //////
/* <button id="push" onclick="afficherNotif()"></button>
    <div id="notification" style="display: none">
        <button id="close" onclick="fermerNotif()">X</button>
    </div> */

/////// JS //////

/* function recupNotif() {
    let url = 'http://antonin-piroth.fr/wp-json/wp/v2/posts/?per_page=100';

    fetch(url)
        .then(res => res.json())
        .then((out) => afficherPoint(out))
        .catch(err => { throw err });
}

function afficherPoint(resultat) {
    var compteur = 0;
    for (i = 0; i < resultat.length; i++) {
        if (resultat[i].categories[0] == '5') {
            var compteur = compteur + 1;

            var buttonDiv = document.getElementById('push');
            buttonDiv.innerHTML = compteur;
            var parentDiv = document.getElementById('notification');
            var titlenews = document.createElement('p');
            titlenews.innerHTML = resultat[i].title.rendered;
            var contentnews = document.createElement('p');
            contentnews.innerHTML = resultat[i].content.rendered;
            parentDiv.appendChild(titlenews);
            parentDiv.appendChild(contentnews);
        }
    }
}

function afficherNotif() {
    document.getElementById('notification').style.display = "block";
}

function fermerNotif() {
    document.getElementById('notification').style.display = "none";
} */



////////////// FILTER SUR LA MAP /////////////////
/* function mapFilter(){
    if(document.getElementById('STbox').checked){
        document.getElementById('ST1').style.display = 'block';
        document.getElementById('ST2').style.display = 'block';
        document.getElementById('ST3').style.display = 'block';
    } else {
        document.getElementById('ST1').style.display = 'none';
        document.getElementById('ST2').style.display = 'none';
        document.getElementById('ST3').style.display = 'none';
    }
} */