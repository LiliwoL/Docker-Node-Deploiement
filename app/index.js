/**
 *  Serveur Backend Pokedex
 */

//console.log ("Hello World!");

// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";

// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";


// Définir un port
const PORT = 5001;

// ************************************************

// Lancer un serveur express sur un port défini

const fs = require('fs');

// npm install express
const express = require('express');
const app = express();

// Lancement du serveur et attendre
app.listen(
    PORT, 
    '0.0.0.0',
    () => {
        console.log('Server Pokedex is listening on ' + PORT);
    }
)

// Crée la route / qui renvoie "Tout"
app.get(
    '/',
    findAllPokemon
)

// Fonction qui est appelée par la route /
function findAllPokemon(request, response)
{
    // // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Renvoie tout le json interprété
    response.send(pokedex);
}


// *********************************************

// Find One Randomly
app.get('/hasard', findByIdRandomly);

function findByIdRandomly(request, response)
{
    // 1. Lecture du fichier
    let data = fs.readFileSync(POKEDEX_SRC);

    // 2. Analyse du JSON
    let pokedex = JSON.parse(data);

    // 3. Au hasard
    let nb_pokemon = pokedex.length;
    console.log("Nb de pokemon " + nb_pokemon);
    
    let random = Math.floor(Math.random() * nb_pokemon) + 1;

    // 4. Sélection du pokemon au hasard
    reply = pokedex[random];

    response.send(reply);
}