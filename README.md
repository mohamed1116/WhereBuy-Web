# WhereBuy-Web
Application web full‑stack permettant de rechercher des produits et de trouver les magasins locaux à Taroudant. (React + Express)

## Fonctionnalites

- Rechercher un produit par nom
- Lister les magasins avec adresse, telephone et note
- Noter les magasins (1 a 5 etoiles)
- Ajouter des magasins aux favoris
- Ajouter un nouveau magasin pour un produit existant
- Voir une carte simple de Taroudant (OpenStreetMap)

## Technologies utilisees

| Partie       | Technologie                          |
|--------------|--------------------------------------|
| Frontend     | React (Vite) + React Router DOM      |
| Backend      | Node.js + Express                    |
| Communication| Axios                                |
| Stockage     | Tableaux JavaScript en memoire       |
| Style        | CSS pur (aucun framework externe)    |

## Lancer le projet en local

### 1. Demarrer le backend

```bash
cd backend
npm install
node server.js
Le serveur tourne sur http://localhost:3000.

2. Demarrer le frontend
Ouvrez un nouveau terminal :

bash
cd frontend
npm install
npm run dev
L application est accessible sur http://localhost:5173.

Identifiants de test
Champ	Valeur
username	admin
password	1234
Structure du projet
text
WhereBuy-Web/
├── backend/
│   ├── server.js          # API Express (routes, donnees en memoire)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── Auth.jsx
    │   ├── Home.jsx
    │   ├── Stores.jsx
    │   ├── AddStore.jsx
    │   ├── Favorites.jsx
    │   └── Map.jsx
    ├── package.json
    └── vite.config.js
Remarques
Les donnees sont stockees dans des tableaux JavaScript simples (pas de base de donnees persistante).

Le projet a ete realise dans le cadre d un cours de programmation full-stack.

Auteur
Mohamed – GitHub: github.com/mohamed1116

