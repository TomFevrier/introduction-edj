# Initiation au code à l'EDJ

***

## Séances du 23/09 et du 24/09

### Programme
- **Introduction au SVG** : groupes, cercles et rectangles
- **Introduction à D3.js** : échelles, axes, notion d'accesseur, nesting, etc.
- **Cas pratiques** :
  - bubble chart : "The wealth and health of nations"
  - diagramme en barres : genres des films les plus populaires de 2018

***

## Séances du 13/09 et du 14/09

### Préparation
- **Jeter un coup d’oeil à [la page suivante](https://www.imdb.com/search/title?title_type=feature&year=2018-01-01,2018-12-31&sort=boxoffice_gross_us,desc)** (pour l’activité du jour)
- **Jouer avec l’inspecteur** :
  - Chrome : Clic droit > Inspecter
  - Firefox : Clic droit > Examiner l’élément
  - Safari/Edge : Laissez tomber pour du code
  - Internet Explorer : …

### Programme
- **Explorer un site avec l’inspecteur** : notions de base de HTML
- **Scraping avec Cheerio** : récupérer le contenu d’une page web
- **Manipuler les chaînes de caractères** : nettoyage des données récupérées
- **Cas pratique** : les 50 films les plus populaires de 2018 sur IMDb (objectif : récupérer un fichier CSV avec les titres, notes IMDb, durées et box offices des 50 films)

### Comment utiliser npm (Node Package Manager)
- Créer un nouveau projet Node.js : `npm init`, puis suivre les étapes
- Installer un paquet : `npm install --save nom-du-paquet`

Si le projet Node.js a déjà un fichier package.json, il suffit de faire `npm install` pour installer tous les paquets nécessaires.


### Notions de HTML abordées
Une page web est en réalité un emboîtement d'élément HTML, délimités par des **balises** ouvrantes et fermantes. Les balises les plus courantes sont :
- `<h1></h1>`, `<h2></h2>`...  : délimitent un titre, du plus grand (H1) au plus petit (H6)
- `<p></p>` : délimitent un paragraphe
- `<a></a>` : délimitent un lien (l'adresse est contenue dans l'attribut `href` (voir ci-dessous)
- `<span></span>` : délimitent un conteneur sur une seule ligne
- `<div></div>` : délimitent un conteneur générique

Un élément HTML peut avoir des **attributs**, permettant de donner des informations supplémentaires ou de l'identifier, et notamment :
- `class` : une classe qui peut être commune à plusieurs éléments
- `id` : un identifiant unique à cet élément

### Cheerio
[Cheerio](https://cheerio.js.org/) est une bibliothèque permettant d'extraire du contenu d'une page web grâce à des **sélecteurs** :
- `$('p')` : sélectionne tous les paragraphes
- `$('.pouet')` : sélectionne tous les éléments de classe "pouet"
- `$('#bip')` : sélectionne l'élément d'identifiant "bip"

```html
<div class="container">
  <p class="text">Ceci est un <span>test</span>.</p>
  <p class="random">Ce <span>paragraphe</span> a peu d'intérêt.</p>
</div>
```
Un sélecteur peut être composé de plusieurs classes, identifiants et/ou balises. Par exemple, si l'on souhaite extraire le mot "test" dans le code HTML ci-dessus, on peut utiliser le sélecteur suivant : `$('.container .text span')`

***

## Séances du lundi 9/09 et du mardi 10/09

### Préparation
- **Installer un éditeur de texte** : je vous conseille [Atom](https://atom.io) (disponible sur Windows/Mac/Linux) mais d’autres sont disponibles (Sublime Text notamment)
- **Installer [Node.js](https://nodejs.org)** : suivre les étapes d’installation
- *Pour les utilisateur.rice.s de Mac : activer le raccourci clavier pour ouvrir un terminal au dossier (Préférences système > Clavier > Raccourcis > Services > cocher “Nouveau terminal au dossier”)*
- **Télécharger vos messages Facebook** (pour l’activité du jour) :
  - Triangle > Paramètres > Vos informations Facebook > Télécharger vos informations
  - Période : sélectionner la période voulue / Format : JSON
  - Ne sélectionner que “Messages”
  - “Créer un fichier”… puis attendre et télécharger le fichier quand il est prêt

### Programme
- **Découverte du terminal** : naviguer, créer des fichiers et exécuter du code
- **Découverte du JavaScript** : affichage, variables, tableaux, boucles et conditions
- **Cas pratique** : statistiques sur une conversation Facebook (nombre de messages, membres les plus actif.ve.s, messages/photos les plus likés, etc.)

### Comment exécuter du code avec Node.js ?
- Ouvrir un terminal :
    - sur Mac : clic droit sur le dossier où on veut exécuter le code > Nouveau terminal au dossier
    - sur Windows : Maj + clic droit sur le dossier où on veut exécuter le code > Ouvrir une fenêtre Powershell ici
- Créer un nouveau fichier JS :
    - sur Mac : taper `touch index.js` dans le terminal, puis entrée
    - sur Windows : clic droit dans le dossier > Nouveau > Document texte, puis l'appeler "index.js"
- Exécuter le code : taper `node index.js` dans le terminal, puis entrée
- Petites astuces :
    - le terminal autocomplète les noms des fichiers : taper "in" puis tabulation autocomplète "index.js"
    - on peut utiliser les flèches haut et bas pour naviguer dans les précédentes commandes exécutées : notamment, il suffit de faire flèche du haut > Entrée pour exécuter de nouveau la dernière commande utilisée

### Notions de JavaScript abordées :
Pour afficher un élément en JavaScript, on utilise `console.log()` :
```javascript
console.log("Hello world!");
// Affiche le terme "Hello world!" (ceci est un commentaire, il n'est pas lu par l'ordinateur)
```

Une variable est un mot qui contient un élément (un nombre, du texte ou autre chose) :
```javascript
var nom = "Tom";
// "nom" est une variable qui contient le texte "Tom"
console.log(nom); // Affiche "Tom"
```

Un nom de variable doit être en un seul mot, sans accent ni caractères spéciaux. Si le nom de variable est en deux mots, on met une majuscule à chaque nouveau mot (comme les hashtags, mais en commençant par une minuscule) : c'est ce qu'on appelle la "camel case". Exemple : `var maSuperVariable = 42;`

Un tableau est une liste d'éléments (nombres, mots, etc.). On peut accéder à un élément avec son indice (le premier élément est d'indice 0) :
```javascript
var listeNoms = ["Clara", "Pauline", "Salomé", "Juliette", "Tom"];
console.log(listeNoms) // Affiche le tableau
console.log(listeNoms.length) // Affiche la taille du tableau (ici 5)
console.log(listeNoms[0]) // Affiche "Clara" (le premier élément de la liste)
console.log(listeNoms[2]) // Affiche "Salomé"
```

La boucle `for` permet de parcourir un tableau :
```javascript
var listeNoms = ["Clara", "Pauline", "Salomé", "Juliette", "Tom"];
for (var nom of listeNoms) {
  console.log("Bonjour " + nom);
}
/* Affiche
Bonjour Clara
Bonjour Pauline
etc. */
```

On peut réaliser une action à une certaine condition :
```javascript
var age = 21;
if (age < 18) {
  console.log("Vous êtes enfant"); // Est exécuté si age est inférieur à 18
}
else {
  console.log("Vous êtes adulte"); // Est exécuté si la première condition est fausse (comme ici)
}
```

Un objet est un élément possédant des propriétés. Les objets peuvent être emboîtés, comme des poupées russes :
```javascript
var message = {
  "sender_name": "Ulysse Bellier",
  "content": "Fais gaffe @Margot le monopole de la vulgarisation scientifique dans cette promo t'\u00c3\u00a9chappe",
  "reactions": [
    {
      "reaction": "\u00f0\u009f\u0091\u008d",
      "actor": "Marilou Therre"
    },
    {
      "reaction": "\u00f0\u009f\u0098\u00a0",
      "actor": "Margot Brunet"
    }
  ]
};

console.log(message.sender_name) // Affiche "Ulysse Bellier"
console.log(message["sender_name"]) // La même chose
console.log(message.reactions.length) // Affiche 2
```
