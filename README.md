# Merphy - Mademba | Portfolio

<div align="center">

<svg width="100%" height="70" viewBox="0 0 750 70" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Dégradé de couleur fluide et moderne -->
    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8">
        <animate attributeName="stop-color" values="#38BDF8;#818CF8;#C084FC;#38BDF8" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" stop-color="#818CF8">
        <animate attributeName="stop-color" values="#818CF8;#C084FC;#38BDF8;#818CF8" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#C084FC">
        <animate attributeName="stop-color" values="#C084FC;#38BDF8;#818CF8;#C084FC" dur="6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    
    <!-- Ombre portée lumineuse -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Texte centré avec animation subtile de pulsation -->
  <text x="50%" y="45" 
        text-anchor="middle" 
        fill="url(#textGradient)" 
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
        font-size="16.5" 
        font-weight="700" 
        letter-spacing="0.5"
        filter="url(#glow)">
    Ingénieur Data &amp; Database &bull; Développeur Full-Stack Python &bull; Analyste Python &amp; Power BI &bull; IA
    <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
  </text>
</svg>

</div>

### Ingénieur Data & Database · Développeur Full-Stack Python · Analyste Python & Power BI · IA

> Je conçois des pipelines de données et des applications fiables, documentés et prêts pour la production, du stockage jusqu'à l'interface.

[![Portfolio](https://img.shields.io/badge/portfolio-merph--dev.vercel.app-000000?logo=vercel&logoColor=white)](https://merphy-data-architect.vercel.app)
![TanStack Start](https://img.shields.io/badge/TanStack%20Start-FF4154)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

**Site en ligne :** [merphy-data-architect.vercel.app](https://merphy-data-architect.vercel.app)

---

## Table des matières
1. [À propos](#à-propos)
2. [Expertise](#expertise)
3. [Projets sélectionnés](#projets-sélectionnés)
4. [Parcours et formation](#parcours-et-formation)
5. [Stack technique](#stack-technique)
6. [Architecture du portfolio](#architecture-du-portfolio)
7. [Développement local](#développement-local)
8. [Déploiement](#déploiement)
9. [Contact](#contact)

---

## À propos

Étudiant en **Master MIAGE** basé à **Dakar (Sénégal)**, je me spécialise en **ingénierie de données et architecture de bases de données**, avec une solide pratique du développement **Full-Stack (Python, TypeScript, React)** et de l'intégration d'outils **IA / Machine Learning**.

Depuis **août 2026**, j'effectue un stage de six mois en entreprise, où j'interviens en tant que **Database & Data Engineer** sur le développement d'une plateforme de Business Intelligence : modélisation de bases, pipelines d'ingestion et de transformation, architecture multi-couches.

Autodidacte et rigoureux, j'aime les systèmes bien documentés, testés et maintenables.

Ce dépôt contient le code source de mon portfolio personnel.

---

## Expertise

### Ingénierie de données
- Conception de pipelines **ETL / ELT** de bout en bout
- Architecture **Bronze / Silver / Gold** (médaillon)
- Orchestration de flux avec **Apache Airflow**
- Modélisation relationnelle et dimensionnelle, optimisation de requêtes SQL
- Contrôles de qualité des données et traçabilité

### Bases de données
- **PostgreSQL** : conception de schémas, administration, gestion des rôles et des accès, indexation et optimisation de requêtes
- **MySQL** : modélisation relationnelle, requêtes SQL avancées, import/export de données, sauvegarde et restauration
- **SQL Server** : conception de bases, procédures stockées, vues, administration des accès, intégration avec les outils BI
- **Snowflake** : entrepôt de données cloud, gestion des bases, schémas, warehouses et rôles, chargement et transformation de données Bronze / Silver / Gold
- **Docker** : environnements de bases de données reproductibles et isolés, déployés avec Docker Compose
- Entrepôts de données cloud (**Snowflake**)
- Environnements reproductibles avec **Docker**

### Développement Full-Stack
- Back-end **Python** (Flask, APIs REST, tests `pytest`, CI avec GitHub Actions)
- Front-end **TypeScript / React**, **TanStack Start**, **Tailwind CSS**

### Data Science & IA
- Analyse et nettoyage de données : **Pandas, NumPy, Statsmodels**
- Modélisation : **Scikit-learn**
- Intégration de LLM : **Ollama, OpenRouter**, protocole **MCP** (Model Context Protocol)

---

## Projets sélectionnés

| Projet | Description | Technologies |
|---|---|---|
| **Pipeline de données Bronze / Silver / Gold** | Plateforme analytique multi-couches, de la génération de données à la production d'indicateurs métier | Python, PostgreSQL, Airflow, Docker |
| **ArtéNova Shop** | Plateforme e-commerce full-stack | React, TypeScript, Tailwind CSS |
| **Passerelle LLM multi-modèles** | Point d'accès unifié pour interroger plusieurs modèles de langage | Python, OpenRouter, Ollama |
| **Modèle de détection de fraude** | Classification de transactions suspectes | Python, Pandas, Scikit-learn |
| **Scanner de vulnérabilités réseau** | Outil d'analyse de la surface d'exposition d'un réseau | Python |
| **Serveur MCP + base de connaissances locale** | Serveur Python adossé à SQLite, utilisable avec un assistant IA | Python, SQLite, MCP |
| **python-email-manager** | API Flask structurée, avec suite de tests et intégration continue | Python, Flask, pytest, GitHub Actions |

> Les détails et liens vers les dépôts sont disponibles sur [mon portfolio](https://merph-dev.vercel.app) et sur mon profil GitHub.

---

## Parcours et formation

- **Master MIAGE** (Méthodes Informatiques Appliquées à la Gestion des Entreprises), en cours
- **Stage Database & Data Engineer**, 6 mois, depuis août 2026
- **Certifications et parcours en cours**
  - Microsoft Python Developer (Coursera)
  - Meta Back-End Developer (Coursera)
  - IBM Full-Stack JavaScript (Coursera)
  - Apprentissage continu : DataCamp, Kaggle, DeepLearning.AI

---

## Stack technique

| Domaine | Technologies |
| :--- | :--- |
| **Data & bases de données** | PostgreSQL, Snowflake, Apache Airflow, Docker, ETL/ELT, modélisation Bronze/Silver/Gold |
| **Back-end** | Python, Flask, APIs REST, pytest |
| **Front-end** | TypeScript, React, TanStack Start, Tailwind CSS |
| **Data Science & IA** | Pandas, NumPy, Scikit-learn, Statsmodels, Ollama, OpenRouter, MCP |
| **DevOps & outillage** | Git, GitHub Actions, Docker Desktop, WSL, VS Code, Vercel |

---

## Architecture du portfolio

Application web construite avec :

- **TanStack Start** : framework React full-stack
- **TypeScript** : typage strict
- **React** : interface utilisateur
- **Tailwind CSS** : mise en forme

```text
portfolio-architect/
├── src/            # Code source de l'application
├── public/         # Ressources statiques
├── package.json
└── README.md
```

> Adapte cette arborescence à celle de ton dépôt.

---

## Développement local

### Prérequis

- **Node.js** (version LTS recommandée), installable via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (ou `pnpm` / `bun`)

### Installation et lancement

```bash
git clone https://github.com/FullStackFlow-dev/portfolio-architect.git
cd portfolio-architect
npm install
npm run dev
```

L'application est alors disponible en local (l'adresse exacte s'affiche dans le terminal).

### Commandes utiles

| Commande | Action |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |

---

## Déploiement

Le portfolio est déployé sur **Vercel** : [merph-dev.vercel.app](https://merph-dev.vercel.app).

---

## Contact

- **Portfolio :** [merph-dev.vercel.app](https://merph-dev.vercel.app)
- **GitHub :** [FullStackFlow-dev](https://github.com/FullStackFlow-dev)
- **Localisation :** Dakar, Sénégal
- **Disponibilité :** ouvert aux opportunités en ingénierie de données, bases de données et développement Full-Stack

---

<sub>Conçu et développé par Merphy.</sub>
