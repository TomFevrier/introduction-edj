// On importe la bibliothèque fs ("file system")
const fs = require('fs');

/* On lit le fichier :
- le premier paramètre est le nom du fichier
- le deuxième est la fonction de callback (la fonction que l'on veut exécuter une fois le fichier lu)
*/
fs.readFile('message.json', function(error, data) {

  // On convertit le contenu de notre fichier en JSON, et on en extrait les messages
  var messages = JSON.parse(data).messages;
  console.log("Nombre de messages dans la conversation : " + messages.length);

  // On filtre les messages : la méthode filter() prend comme paramètre une fonction qui, pour chaque élément e, précise si on le garde ou pas
  var messagesAvecReactions = messages.filter(function(e) {
     return e.reactions; // On ne garde e que si e.reactions existe (en gros si le message a des réactions)
  });
  console.log("Nombre de messages avec des réactions : " + messagesAvecReactions.length);

  // On trie les messages : la méthode sort() prend comme paramètre une fonction qui, pour une paire d'éléments a et b, précise comment on doit les comparer
  messagesAvecReactions = messagesAvecReactions.sort(function(a, b) {
    // On renvoie B - A pour l'ordre décroissant, et A - B pour l'ordre croissant
    return b.reactions.length - a.reactions.length;
  });
  console.log("Message avec le plus de réactions :");
  console.log(messagesAvecReactions[0]);

  // La méthode includes() indique si la chaîne contient un texte donné
  var funFacts = messages.filter(function(e) {
    /*
    On renvoie une EXPRESSION BOOLEENNE : il faut que le message ait un contenu ET que ce contenu contienne "FUN FACT DU JOUR"
    ET = &&
    OU = ||
    NON = !
    */
    return e.content && e.content.includes("FUN FACT DU JOUR");
  });
  console.log("Fun facts de Tom:");
  console.log(funFacts);

  var participants = JSON.parse(data).participants; // On récupère le tableau des participants dans le fichier JSON
  for (var participant of participants) {
      // Pour chaque participant, on récupère tous les messages qu'il a écrits avec filter()
      var interventions = messages.filter(function(e) {
          return e.sender_name == participant.name;
      });
      console.log(`${participant.name} a écrit ${interventions.length} message(s)`);
  }

});
