const http = require('http');
const url = require('url');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Création de la base de données SQLite
const db = new sqlite3.Database('etapes.db');

// Création de la table pour stocker les paramètres
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS parametres (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, valeur TEXT)");
});

// Mot de passe pour les routes d'administration
const ADMIN_PASSWORD = 'Azertysio-01';



const server = http.createServer((req, res) => {
    const userAgent = req.headers['user-agent'];

    if (userAgent === 'FenelonBTSSIO-UserAgent-LaRochelle v1.0') {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;
        const method = req.method;

        // Vérification du mot de passe pour les routes d'administration
        if (path.startsWith('/admin') && !checkAdminPassword(req)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized. Incorrect admin password.' }));
            return;
        }

        // Traitement des différentes étapes du jeu de piste
        switch (path) {
            case '/etape1':
                handleEtape1(res);
                break;
            case '/etape2':
                handleEtape2(res, parsedUrl.query);
                break;
            case '/etape3':
                handleEtape3(res, method);
                break;
            case '/etape4':
                handleEtape4(res, method);
                break;
            case '/etape5':
                handleEtape5(res, req.headers['content-type']);
                break;
            case '/etape6':
                handleEtape6(res, req.headers['content-type']);
                break;
            case '/etape7':
                handleEtape7(res, method, parsedUrl.query);
                break;
            case '/etape8':
                handleEtape8(res, method, req.headers['content-type']);
                break;
            case '/etape9':
                handleEtape9(res, method, req.headers['content-type']);
                break;
            case '/etape10':
                handleEtape10(res, method, req.headers['content-type']);
                break;
            case '/etape11':
                handleEtape11(res, parsedUrl.query);
                break;
            case '/etape12':
                handleEtape12(res);
                break;
            case '/etape13':
                handleEtape13(res);
                break;
            // Ajoutez d'autres étapes du jeu de piste ici...


            case '/admin/parametres':
                handleAdminParametres(res);
                break;
            case '/admin/reset':
                handleAdminReset(res);
                break;

            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Page not found' }));
        }
    } else {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Access forbidden. Invalid User-Agent header.' }));
    }
});

// Middleware pour vérifier le mot de passe d'administration
function checkAdminPassword(req) {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
        const encodedCredentials = authorizationHeader.split(' ')[1];
        const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');

        return password === ADMIN_PASSWORD;
    }

    return false;
}

// Route d'administration: Liste des paramètres
function handleAdminParametres(res) {
    db.all("SELECT * FROM parametres", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        const response = {
            admin_etape: 'Liste des paramètres (route d\'administration)',
            parametres: rows
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    });
}

// Route d'administration: Réinitialiser la base de données
function handleAdminReset(res) {
    db.run("DELETE FROM parametres", function (err) {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        const response = {
            admin_etape: 'Réinitialisation de la base de données (route d\'administration)',
            message: 'La base de données a été réinitialisée avec succès.'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    });
}

// Étape 1: Introduction
function handleEtape1(res) {
    const response = {
        etape: 'Introduction',
        message: 'Bienvenue dans le jeu de piste HTTP !',
        cours: 'Le protocole HTTP (Hypertext Transfer Protocol) est utilisé pour la communication sur le web. Dans cette première étape, vous allez apprendre les bases du jeu.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 2: Exemple avec paramètres
function handleEtape2(res, query) {
    const response = {
        etape: 'Paramètres dans l\'URL',
        message: 'Bravo ! Vous avez réussi la première étape. Maintenant, explorons l\'utilisation des paramètres dans l\'URL.',
        cours: 'Les paramètres dans l\'URL permettent de transmettre des informations à travers les requêtes HTTP. Vous pouvez les utiliser pour personnaliser vos requêtes.'
    };

    // Ajout du paramètre nom dans la réponse
    if (query && query.nom) {
        response.nom = query.nom;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 3: Méthodes HTTP - GET
function handleEtape3(res, method) {
    const response = {
        etape: 'Méthodes HTTP - GET',
        message: `Vous avez utilisé la méthode ${method}. Bien joué !`,
        cours: 'La méthode GET est utilisée pour récupérer des données à partir du serveur. Elle est souvent utilisée pour les requêtes de lecture.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 4: Méthodes HTTP - POST
function handleEtape4(res, method) {
    const response = {
        etape: 'Méthodes HTTP - POST',
        message: `Bonne utilisation de la méthode ${method}.`,
        cours: 'La méthode POST est utilisée pour envoyer des données au serveur, souvent utilisée pour les requêtes de création.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 5: Types de contenu - GET
function handleEtape5(res, contentType) {
    const response = {
        etape: 'Types de contenu - GET',
        message: `Vous avez spécifié le type de contenu ${contentType}.`,
        cours: 'Le type de contenu indique au serveur le format des données que vous attendez en réponse. Dans une requête GET, cela peut souvent être "application/json" ou "text/html".'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 6: Types de contenu - POST
function handleEtape6(res, contentType) {
    const response = {
        etape: 'Types de contenu - POST',
        message: `Vous avez spécifié le type de contenu ${contentType} dans votre requête POST.`,
        cours: 'Lors de l\'envoi de données avec la méthode POST, vous devez indiquer au serveur le format des données que vous envoyez. Cela est souvent spécifié avec l\'en-tête "Content-Type".'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 7: Paramètres dans l'URL et méthode - GET
function handleEtape7(res, method, query) {
    const response = {
        etape: 'Paramètres dans l\'URL et méthode - GET',
        message: `Vous avez utilisé la méthode ${method} avec les paramètres ${JSON.stringify(query)}.`,
        cours: 'Combiner la méthode GET avec des paramètres dans l\'URL vous permet de personnaliser davantage vos requêtes. Dans cette étape, vous avez utilisé les deux ensemble.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 8: Méthode et type de contenu - POST
function handleEtape8(res, method, contentType) {
    const response = {
        etape: 'Méthode et type de contenu - POST',
        message: `Vous avez utilisé la méthode ${method} avec le type de contenu ${contentType}.`,
        cours: 'Cette étape combine la méthode POST avec la spécification du type de contenu. Cela est souvent nécessaire lors de l\'envoi de données au serveur.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 9: Méthode et type de contenu - PUT
function handleEtape9(res, method, contentType) {
    const response = {
        etape: 'Méthode et type de contenu - PUT',
        message: `Vous avez utilisé la méthode ${method} avec le type de contenu ${contentType}.`,
        cours: 'La méthode PUT est utilisée pour mettre à jour des données sur le serveur. L\'en-tête "Content-Type" est souvent utilisé pour spécifier le format des données envoyées.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

// Étape 10: Méthode et type de contenu - DELETE
function handleEtape10(res, method, contentType) {
    const response = {
        etape: 'Méthode et type de contenu - DELETE',
        message: `Vous avez utilisé la méthode ${method} avec le type de contenu ${contentType}.`,
        cours: 'La méthode DELETE est utilisée pour supprimer des données sur le serveur. Vous pouvez également spécifier le type de contenu pour indiquer le format des données que vous envoyez.'
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}
// Étape 11: Stockage des paramètres dans la base de données
function handleEtape11(res, query) {
    const nom = query.nom;
    const valeur = query.valeur;

    db.run("INSERT INTO parametres (nom, valeur) VALUES (?, ?)", [nom, valeur], function (err) {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        const response = {
            etape: 'Stockage des paramètres dans la base de données',
            message: 'Les paramètres ont été enregistrés dans la base de données avec succès.',
            cours: 'Dans cette étape, vous avez appris à stocker des paramètres de requête dans une base de données. Ceci est utile pour sauvegarder des informations persistantes.'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    });
}

// Étape 12: Requête SELECT dans la base de données
function handleEtape12(res) {
    db.all("SELECT * FROM parametres", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        const response = {
            etape: 'Requête SELECT dans la base de données',
            message: 'Vous avez effectué une requête SELECT dans la base de données.',
            cours: 'La requête SELECT est utilisée pour récupérer des données de la base de données. Vous avez obtenu la liste des paramètres stockés.'
        };

        response.parametres = rows;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    });
}

// Étape 13: Requête DELETE dans la base de données
function handleEtape13(res) {
    db.run("DELETE FROM parametres", function (err) {
        if (err) {
            console.error(err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        const response = {
            etape: 'Requête DELETE dans la base de données',
            message: 'Vous avez effectué une requête DELETE dans la base de données.',
            cours: 'La requête DELETE est utilisée pour supprimer des données de la base de données. Vous avez supprimé tous les paramètres stockés.'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    });
}

// Ajoutez d'autres étapes du jeu de piste ici...

const PORT = 800;
const IP_ADDRESS = '127.0.0.1';

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Serveur en écoute sur http://${IP_ADDRESS}:${PORT}`);
});
