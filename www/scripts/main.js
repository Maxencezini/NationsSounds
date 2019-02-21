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

    var leContenu = document.getElementById('contenu');
    var nouveauDiv = document.createElement('div');
    nouveauDiv.classList.add('divClass');
    var bannerDiv = document.createElement('img');
    bannerDiv.classList.add('banner');
    var artistDiv = document.createElement('h2');
    artistDiv.classList.add('h2Class');
    var infoDiv = document.createElement('p');
    infoDiv.classList.add('pClass');
    var bannerUrl = resultat.acf.banniere.sizes.thumbnail;
    bannerDiv.src = bannerUrl;
    artistDiv.innerHTML = resultat.acf.nom_artiste;
    infoDiv.innerHTML = "Date du concert : " +resultat.acf.date_concert+ ", heure du concert : " +resultat.acf.heure_concert+ ", scène : " +resultat.acf.scene+"";
    nouveauDiv.appendChild(bannerDiv);
    nouveauDiv.appendChild(artistDiv);
    nouveauDiv.appendChild(infoDiv);
    leContenu.appendChild(nouveauDiv);
}