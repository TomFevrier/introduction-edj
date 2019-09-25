// On importe la bibliothèque fs ("file system")
const fs = require('fs');
// On importe la bibliothèque request-promise (qui permet de récupérer le contenu d'une page web)
const rp = require('request-promise');
// On importe la bibliothèque cheerio (qui permet d'extraire le contenu qui nous intéresse)
const cheerio = require('cheerio');

// On crée un fichier CSV avec le header (noms des colonnes)
fs.writeFileSync("data.csv", "title,runtime,rating,boxOffice\n");

/*
On définit les options pour que request-promise retourne le contenu de la page web :
- uri : l'URL de la page que l'on veut scraper
- transform : comment le contenu de la page doit être utilisé (ici, il doit être chargé dans Cheerio)
*/
const options = {
    uri: "https://www.imdb.com/search/title?title_type=feature&year=2018-01-01,2018-12-31&sort=boxoffice_gross_us,desc",
    transform: function(body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(function($) {
        $('.lister-item-content').each(function(index, element) {
            /*
            On extrait les informations dont on a besoin à l'aide de sélecteurs (classes, balises, attributs, etc.) :
            - la méthode find() renvoie le ou les éléments correspondant au sélecteur fourni dans la sélection actuelle
            - la méthode text() renvoie le texte de l'élément sélectionné (sans les balises HTML)
            - la méthode attr() renvoie la valeur de l'attribut fourni dans l'élément sélectionné
            Voir la documentation de Cheerio pour plus d'informations : https://cheerio.js.org/
            */
            var title = $(element).find('.lister-item-header a').text();
            var runtime = $(element).find('.runtime').text();
            var rating = $(element).find('.ratings-imdb-rating').attr('data-value');
            var boxOffice = $(element).find('.sort-num_votes-visible span').last().attr('data-value');

            /*
            On nettoie les données avec la méthode replace(), qui permet de remplacer un morceau d'une chaîne par un autre.
            Elle prend deux paramètres :
            - la chaîne à remplacer, sous forme d'une chaîne de caractère ou d'une expression régulière (RegEx)
            - la chaîne par laquelle remplacer (pour supprimer, une chaîne vide "")
            */
            runtime = runtime.replace(" min", "");
            boxOffice = boxOffice.replace(/,/g, ""); // le g (global) indique que l'on souhaite supprimer toutes les virgules, pas simplement la première

            // On écrit la ligne dans notre fichier CSV
            fs.appendFileSync("data.csv", `${title},${runtime},${rating},${boxOffice}\n`);
            // "Template strings" : le `texte` est entre backticks et les ${variables} insérées avec un signe $ et entre accolades
        })
    });

/*
A toi de jouer ! Essaye de...
- ne récupérer que les dix plus gros succès de l'année (indice : utilise le paramètre "index")
- récupérer les plus gros succès de toutes les années entre 1997 et 2018 (indice : regarde comment est construite l'URL et utilise une boucle for)
*/
