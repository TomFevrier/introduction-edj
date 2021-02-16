// On importe la bibliothèque fs ("file system", pour écrire des fichiers)
const fs = require('fs');
// On importe la bibliothèque node-fetch (qui permet de récupérer le contenu d'une page web)
const fetch = require('node-fetch');
// On importe la bibliothèque cheerio (qui permet d'extraire le contenu qui nous intéresse)
const cheerio = require('cheerio');


const getMovies = async () => {
	// On fait une requête vers notre page pour récupérer son contenu
	const response = await fetch('https://www.imdb.com/search/title/?year=2019&title_type=feature&sort=boxoffice_gross_us,desc');
	// On récupère le résultat de notre requête sous forme de texte
	const html = await response.text();
	// On charge le HTML dans Cheerio pour le manipuler
	const $ = cheerio.load(html);

	const movies = [];

	$('.lister-item-content').each((index, element) => {
        /*
        On extrait les informations dont on a besoin à l'aide de sélecteurs (classes, balises, attributs, etc.) :
        - la méthode find() renvoie le ou les éléments correspondant au sélecteur fourni dans la sélection actuelle
        - la méthode text() renvoie le texte de l'élément sélectionné (sans les balises HTML)
        - la méthode attr() renvoie la valeur de l'attribut fourni dans l'élément sélectionné
        Voir la documentation de Cheerio pour plus d'informations : https://cheerio.js.org/

		On nettoie les données avec la méthode replace(), qui permet de remplacer un morceau d'une chaîne par un autre.
        Elle prend deux paramètres :
        - la chaîne à remplacer, sous forme d'une chaîne de caractères ou d'une expression régulière (RegEx)
        - la chaîne par laquelle remplacer (pour supprimer, une chaîne vide "")

		Le "+" devant une variable permet de convertir la valeur d'une chaîne de caractères vers un nombre
        */

        const title = $(element).find('.lister-item-header a').text();
        const runtime = +$(element).find('.runtime').text().replace(" min", "");
        const rating = +$(element).find('.ratings-imdb-rating').attr('data-value');
        const boxOffice = +$(element).find('.sort-num_votes-visible span').last().attr('data-value').replace(/,/g, "");

        // On ajoute nos données dans notre tableau movies
        movies.push({ title, runtime, rating, boxOffice });
    });

	// On exporte notre tableau dans un fichier JSON
	fs.writeFileSync('movies.json', JSON.stringify(movies, null, '\t'));
}

getMovies();

/*
A toi de jouer ! Essaye de...
- ne récupérer que les dix plus gros succès de l'année (indice : utilise le paramètre "index")
- récupérer les plus gros succès de toutes les années entre 1997 et 2019 (indice : regarde comment est construite l'URL et utilise une boucle for)
*/
