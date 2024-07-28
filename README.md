# Boilerplate

## Introduction

Bienvenue dans ce boilerplate ! Ce projet est conçu pour vous offrir une base solide pour démarrer un développement full-stack avec un front-end basé sur Next.js et un back-end utilisant Firebase Functions et Fastify. Ce README vous guidera à travers les étapes nécessaires pour configurer et démarrer le projet.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js (version 20.11.0 ou supérieure)
- npm ou yarn
- Firebase CLI (`npm install -g firebase-tools`)

## Configuration

### Front-end

1. **Installez les dépendances :**

    ```bash
    npm install
    # ou
    yarn install
    ```

2. **Configurez Firebase :**

    Créez un fichier `firebase.js` dans le répertoire `client` et ajoutez votre configuration Firebase obtenue depuis la section "Vos applications" de la console Firebase

3. **Variables d'environnement :**

    Créez un fichier `.env` à la racine du répertoire `client` et ajoutez les variables d'environnement nécessaires :

    ```plaintext
    NEXT_PUBLIC_SERVER_URL=http://localhost:5001/boilerplate-4e22b/europe-west1/api
    ```

### Back-end

1. **Installez les dépendances :**

    ```bash
    npm install
    # ou
    yarn install
    ```

2. **Variables d'environnement :**

    Créez un fichier `.env` à la racine du répertoire `server` et ajoutez les variables d'environnement nécessaires :

    ```plaintext
    GCP_PROJECT_ID=VOTRE_PROJECT_ID_FIREBASE
    ```

3. **Service Account Key :**

    Créez un fichier `.serviceAccountKey.json` à la racine du répertoire `functions` et ajoutez la clé privée Firebase

## Démarrage

### Front-end

Pour démarrer le front-end en mode développement :

```bash
npm run dev
# ou
yarn dev
```
