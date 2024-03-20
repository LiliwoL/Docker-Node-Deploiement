# Déploiement d'une application Node.js

## Objectif

On souhaite placer une application Node.js sur un serveur distant en utilisant un container Docker.

## Prérequis

- Dans un dossier nommé **app**, placez votre application Node.js.

## Containerisation

Créez un fichier **docker-compose.yml** qui contiendra le service de votre application Node.js.

```yml
version: '3'
services:  
  node-pokedex:
  # Nom du container
  container_name: node-pokedex

  # Ports
  ports:
    - "800:5001"

  # Image à charger dans le container
  # https://hub.docker.com/_/node
  image: node:latest

  # Volumes
  volumes:
    - ./app:/app

  # Répertoire de travail
  working_dir: /app

  # Commande à lancer
  command: sh -c "npm install && node index.js"
```

## Déploiement

Soit en ligne de commande,
```bash
docker-compose up -d
```

Soit au sein de WebStorm, clic droit sur **docker-compose.yml**:

![](readme_docs/cbdee324.png)


## Accès

```bash
http://localhost:800
```
