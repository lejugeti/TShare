# TShare

Salut les gars dans ce ReadMe je vous fais un guide d'installation pour tout ce dont on aura besoin normalement pour le site web.

## I - La doc utile

Je vous mets au tout début du ReadMe toute la doc utile à aller mater, c'est cadeau :

* la doc **vue.js** de base : https://vuejs.org/v2/guide/ ;
* **vue router** pour les chemins de l'application : https://router.vuejs.org/guide/#html ;
* des cours vidéos sur **vue router** ça prend 1h à mater on en aura sûrement besoin : https://vueschool.io/courses/vue-router-for-everyone?friend=vuejs

Et sinon je vous apprends rien vous savez taper sur google des erreurs et autres.

## II - node.js

Okay la première étape ça va être d'installer node.js parce que c'est ce qui va nous permettre de générer le site et de pouvoir l'afficher. Il contient d'ailleurs plein de choses utiles pour créer et manager le site pour la production c'est pas mal.

Lien : https://nodejs.org/en/

Après l'avoir installé il va vous falloir utiliser la console node.js "Node.js command prompt", vous mettre dans le dossier du site "./TShare/site" et effectuer quelques commandes. Pour installer des trucs avec node on utilise "npm". Du coup on va déjà installer vue-cli qui nous passe pas mal de fonctionnalités `npm install -g vue-cli --save`. 

Comme on va utiliser une bdd de type SQL on va avoir besoin d'un package mysql `npm install -g mysql --save`.

Ensuite on va installer axios pour envoyer des données à notre API et pour en recevoir `npm install -g axios --save`. 

Puis on installe body-parser qui va normalement nous faciliter la tâche pour envoyer des informations à notre bdd `npm install -g body-parser --save`.

Enfin on va installer Express qui est un framework si j'ai bien compris pour coder avec node.js. Je sais pas si on en aura besoin mais vu que beaucoup d'exemples sur internet l'utilise dans le doute on le prend et on l'utilisera peut-être pas mais balec. Donc : `npm install -g express --save`

## III - run le site

Normalement si tout se passe bien, lorsque vous avez récupéré tout ce qui est sur le github vous devriez pouvoir exécuter `npm run dev` dans le dossier "./site" pour que le serveur se mette en marche. Essayez d'aller voir le site sur "localhost:8080" normalement c'est pas mal. Si jamais vous avez un soucis à ce moment là faut vite qu'on règle la situation.

Maintenant que le site fonctionne normalement dès qu'on fait un changement dans les cripts on a une recompilation du code et tout s'actualise automatiquement sur le site c'est beau.

## IV - L'arborescence du site

Comme vous avez pu le remarque c'est un bordel ce truc haha. Donc en fait dans l'arborescence on se tape plein de scripts qui sont là pour compiler le code et qui font en sorte que vue.js fonctionne donc juste on n'y touche pas et tout va bien se passer. Ce qui nous intéresse principalement c'est :

* "./site/index.html" (qu'on ne va sûrement pas toucher) 
* "./site/src/App.vue" qui est le composant principal de l'application
* "./site/src/main.js", qui est le script le plus haut niveau pour gérer comment le site s'organise
* "./site/src/components" où on va stocker tous nos composants vue.js
* "./site/src/assets" où on stocke toutes nos images et autres clowneries
* "./site/src/router" où on a tous les chemins de renvoi de l'application

On va de plus créer un dossier API qui va répertorier ben notre API yes.

## V - Problèmes à résoudre du site

Le plus gros problème qu'on a pour l'instant c'est de créer la bdd, faire une API pour communiquer avec elle et surtout que ça fonctionne. Déjà quand ça ça sera fait on sera pas mal. 

Ensuite il va falloir absolument qu'on trouve le moyen de transmettre les données des form à la bdd donc encore une fois ça va être marrant ça mais on pourra pas y couper sinon notre site sera naze. Mais ça devrait le faire on y croit.