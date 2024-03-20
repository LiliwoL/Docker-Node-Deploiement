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
  node-server:
    image: node:14
    container_name: node-server-container
    working_dir: /app
    volumes:
      - ./app:/app
    ports:
      - "800:80"
    environment:
      NODE_ENV: production
    command: "npm start"
```

## Déploiement

```bash
docker-compose up -d
```

## Vérification

```bash
docker ps
```

## Accès

```bash
http://localhost:800
```
