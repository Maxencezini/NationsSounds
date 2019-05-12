function recupInfo(data) {
    let url = data;

    fetch(url)
        .then(res => res.json())
        .then((out) => remplitDocument(out))
        .catch(err => { throw err });
    console.log('Json Done');
}

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

function remplitDocument(resultat) {

    //console.log('Checkout this JSON! ', resultat);

    var leContenu = document.getElementById('contenu');
    for (let article of resultat) {
        var nouveauDiv = document.createElement('div');
        nouveauDiv.classList.add('container', 'text-center');

        var nouveauDiv2 = document.createElement('div');
        nouveauDiv2.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'col-xs-12', 'container_foto');

        var nouveauDiv3 = document.createElement('article');
        nouveauDiv3.classList.add('text-left');

        var nouveauDiv4 = document.createElement('h2');
        nouveauDiv4.classList.add('nomdesartistes');

        var artistDiv = document.createElement('a');
        artistDiv.classList.add('aClass');

        var bannerDiv = document.createElement('img');
        bannerDiv.classList.add('banner');

        var bannerUrl = article.acf.banniere.sizes.thumbnail;
        bannerDiv.src = bannerUrl;

        var artistID = article.id;
        artistDiv.innerHTML = article.acf.nom_artiste;
        artistDiv.href = "artist.html?id=" + artistID + "";
        nouveauDiv2.appendChild(bannerDiv);
        nouveauDiv4.appendChild(artistDiv);
        nouveauDiv3.appendChild(nouveauDiv4);
        nouveauDiv2.appendChild(nouveauDiv3);
        nouveauDiv.appendChild(nouveauDiv2);
        leContenu.appendChild(nouveauDiv);
    }
}

//Trouver comment passer en argument le lien article._links.self pour accéder aux données de l'artiste sur lequel on clique

function recupID() {
    if ((window.location.href).indexOf('?') != -1) {
        var queryString = (window.location.href).substr((window.location.href).indexOf('?') + 1);

        // "queryString" will now contain id=/article.id/

        var value = (queryString.split('='))[1];

        // "value" will now contain /article.id/

        console.log(value);
        recupInfoArtist(value);
    }
}

function recupInfoArtist(data) {
    let url = "https://antonin-piroth.fr/wp-json/wp/v2/posts/" + data;

    fetch(url)
        .then(res => res.json())
        .then((out) => remplitDocumentArtist(out))
        .catch(err => { throw err });
    console.log('Json Done');
}

function remplitDocumentArtist(resultat) {

    console.log('Checkout this JSON! ', resultat);

    var musiqueDiv = document.createElement('div');
    musiqueDiv.classList.add('spotify');
    musiqueDiv.innerHTML = resultat.content.rendered;
    var leContenu = document.getElementById('contenu');
    var nouveauDiv = document.createElement('div');
    nouveauDiv.classList.add('divClass');
    var bannerDiv = document.createElement('img');
    bannerDiv.classList.add('banner');
    var artistDiv = document.createElement('h2');
    artistDiv.classList.add('h2Class');
    var infoDiv = document.createElement('p');
    infoDiv.classList.add('pClass');
    var descriptionDiv = document.createElement('p');
    descriptionDiv.classList.add('descriptionClass');
    var bannerUrl = resultat.acf.banniere.sizes.large;
    bannerDiv.src = bannerUrl;
    artistDiv.innerHTML = resultat.acf.nom_artiste;
    infoDiv.innerHTML = "Date du concert : " +resultat.acf.date_concert+ '<br>'+
    '<br>'
    +"Heure du concert : " +resultat.acf.heure_concert+'<br>'+
    '<br>'
    + "Scène : " +resultat.acf.scene+'<br>';
    descriptionDiv.innerHTML = "DESCRIPTION : " +resultat.acf.description;
    nouveauDiv.appendChild(bannerDiv);
    nouveauDiv.appendChild(artistDiv);
    nouveauDiv.appendChild(infoDiv);
    nouveauDiv.appendChild(descriptionDiv);
    nouveauDiv.appendChild(musiqueDiv);
    leContenu.appendChild(nouveauDiv);
}

function recupInfosPratiques(data) {
    let url = "https://antonin-piroth.fr/wp-json/wp/v2/pages/?slug=" + data;

    fetch(url)
        .then(res => res.json())
        .then((out) => afficherInfosPratiques(out))
        .catch(err => { throw err });
    console.log('Json Done');
}

function afficherInfosPratiques (page) {
    console.log(page);

   for (let article of page ){
    var infosDiv = document.getElementById('infos');
    infosDiv.innerHTML = article.content.rendered;
   }
}

function recupPartenaires(data) {
    let url = "https://antonin-piroth.fr/wp-json/wp/v2/pages/?slug=" + data;

    fetch(url)
        .then(res => res.json())
        .then((out) => afficherPartenaires(out))
        .catch(err => { throw err });
    console.log('Json Done');
}

function afficherPartenaires (page) {
    console.log(page);

   for (let article of page ){
    var infosDiv = document.getElementById('infos');
    infosDiv.innerHTML = article.content.rendered;
   }
}

function headerwithmenu() {
    var html = document.getElementById('jsheader');
    var headerhtml = '<div class="wrapper"><nav id="sidebar"><div id="dismiss"><i class="fas fa-arrow-left"></i></div><div class="sidebar-header"><h3 class="h3burger">Nations Sounds</h3> </div > <ul class="list-unstyled components"> <li class="active"> <i class="fas fa-home"></i><a href="index.html" onClick="app.goAccueil();" data-toggle="collapse" aria-expanded="false">ACCUEIL</a> </li><li> <span class="svg_menu"><i class="fas fa-calendar-alt"></i></span><a href="filter.html"> PROGRAMMATION</a> </li><li> <span class="svg_menu"><i class="fas fa-info-circle"></i></span><a href="infos.html"> INFOS PRATIQUES</a> </li><li> <span class="svg_menu"><i class="fas fa-ticket-alt"></i></span><a href="http://antonin-piroth.fr/product-category/billeterie">BILLETERIE</a> </li><li> <span class="svg_menu"><i class="fas fa-map-marked-alt"></i></span><a href="map.html">PLAN</a> </li><li> <span class="svg_menu"><i class="fas fa-shopping-cart"></i></span><a href="http://antonin-piroth.fr/product-category/boutique">BOUTIQUE</a> </li><li> <span class="svg_menu"><i class="fas fa-handshake"></i></span><a href="partenaires.html">PARTENAIRES</a> </li><li class="lirs"> <a class="lienrs" href="https://twitter.com/"><span class="reseausociaux"><i class="fab fa-twitter"></i></span></a><a class="lienrs" href="https://www.instagram.com/?hl=fr"><span class="reseausociaux"><i class="fab fa-instagram"></i></span></a><a class="lienrs" href="https://www.facebook.com/"><span class="reseausociaux"><i class="fab fa-facebook-f"></i></span></a> </li></ul> </nav ></div > <div class="overlay"></div><header> <div class="burger_top_header"> <a id="sidebarCollapse" href="#"> <span class="icone_burger"> <i class="fas fa-bars"></i> </span> </a> </div><div class="titre_app_header"> <h1 class="header__title">NATIONS SOUNDS</h1> </div><div class="etoile_fav_header"> <a href="#"> <span class="icone_etoile"> <i class="fas fa-star"></i> </span> </a> </div></header>';
    html.innerHTML = headerhtml;
}

function footer() {
    var html = document.getElementById('jsfooter');
    var footerhtml = '<footer> <div class="mobile-app-icon-bar"> <div class="map_bot_footer"> <a href="map.html"> <span class="icone_map"> <i class="fas fa-map-marked-alt"></i> </span> </a> </div><div class="logo_bot_footer"> <div id="carre"></div><a href="#"> <span class="icone_logo"> <img class="img_logo" src="img/logo_ns.svg"> </span> </a> </div><div class="musique_bot_footer"> <a href="filter.html"> <span class="icone_musique"> <i class="fas fa-music"></i> </span> </a> </div></div></footer>';
    html.innerHTML = footerhtml;
}

function headerwitharrow() {
    var html = document.getElementById('jsheaderarrow');
    var headerarrowhtml = ' <div class="wrapper"> <nav id="sidebar"> <div id="dismiss"> <i class="fas fa-arrow-left"></i> </div><div class="sidebar-header"> <h3 class="h3burger">Nations Sounds</h3> </div><ul class="list-unstyled components"> <li class="active"> <i class="fas fa-home"></i><a href="index.html" data-toggle="collapse" aria-expanded="false">ACCUEIL</a> </li><li> <span class="svg_menu"><i class="fas fa-calendar-alt"></i></span><a href="#"> PROGRAMMATION</a> </li><li> <span class="svg_menu"><i class="fas fa-info-circle"></i></span><a href="#"> INFOS PRATIQUES</a> </li><li> <span class="svg_menu"><i class="fas fa-ticket-alt"></i></span><a href="#">BILLETERIE</a> </li><li> <span class="svg_menu"><i class="fas fa-map-marked-alt"></i></span><a href="#">PLAN</a> </li><li> <span class="svg_menu"><i class="fas fa-shopping-cart"></i></span><a href="#">BOUTIQUE</a> </li><li> <span class="svg_menu"><i class="fas fa-handshake"></i></span><a href="#">PARTENAIRES</a> </li><li class="lirs"> <a class="lienrs" href="#"><span class="reseausociaux"><i class="fab fa-twitter"></i></span></a><a class="lienrs" href="#"><span class="reseausociaux"><i class="fab fa-instagram"></i></span></a><a class="lienrs" href="#"><span class="reseausociaux"><i class="fab fa-facebook-f"></i></span></a> </li></ul> </nav> </div><div class="overlay"></div><header> <div class="burger_top_header"> <a id="sidebarCollapse" href="index.html"> <span class="icone_burger"> <i class="fas fa-chevron-left"></i> </span> </a> </div><div class="titre_app_header"> <h1 class="header__title">NATIONS SOUNDS</h1> </div><div class="etoile_fav_header"> <a href="#"> <span class="icone_etoile"> <i class="fas fa-star"></i> </span> </a> </div></header>';
    html.innerHTML = headerarrowhtml;
}