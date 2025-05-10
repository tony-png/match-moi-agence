# Brief Frontend pour "Hoche Café Connect" (Site Web Responsive / PWA)

**Framework CSS Ciblé :** Tailwind CSS

**Objectif :** Créer une interface utilisateur (UI) web moderne, intuitive et **entièrement responsive** pour la plateforme de rencontre "Hoche Café Connect". L'application devra offrir une expérience utilisateur (UX) optimale sur une large gamme d'appareils, des smartphones aux ordinateurs de bureau. L'accent sera mis sur une UX fluide, encourageant l'interaction authentique et préservant l'anonymat jusqu'aux étapes finales. Le site web pourra être packagé comme une application mobile (type PWA ou via des wrappers) tout en fonctionnant nativement dans un navigateur web sur ordinateur.

---

## Lignes Directrices Générales UI/UX avec Tailwind CSS :

*   **Responsive Design (Mobile-First) :** Concevoir toutes les interfaces en priorité pour les écrans mobiles. Utiliser intensivement les breakpoints de Tailwind (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) pour assurer une adaptation fluide et une expérience utilisateur optimale sur tablettes et ordinateurs de bureau. La disposition, la taille des polices, et l'organisation du contenu devront s'ajuster intelligemment.
*   **Cohérence Visuelle :** Utiliser la configuration de Tailwind ( `tailwind.config.js` ) pour définir une palette de couleurs, une typographie, des espacements et des tailles de bordure cohérents à travers toute l'application, inspirés par l'ambiance "Hoche Café" (chaleureux, moderne, accueillant). Cette cohérence doit se maintenir sur toutes les tailles d'écran.
*   **Composants Réutilisables et Adaptatifs :** Identifier et construire des composants UI réutilisables (boutons, cartes, champs de formulaire, modales, indicateurs de chargement) en utilisant les classes utilitaires de Tailwind. Ces composants devront être conçus pour être intrinsèquement responsives. Penser en termes de `@apply` pour regrouper des ensembles de classes utilitaires pour des composants spécifiques si cela simplifie la maintenance.
*   **Navigation Adaptative :** Mettre en place une navigation principale qui s'adapte aux différentes tailles d'écran (ex: menu burger sur mobile, barre de navigation plus complète sur desktop).
*   **Accessibilité (a11y) :** Garder à l'esprit les bonnes pratiques d'accessibilité. Utiliser des classes Tailwind pour assurer un contraste suffisant, des états de focus clairs pour les éléments interactifs (`focus:ring`, `focus:outline-none`), et une sémantique HTML appropriée, y compris pour la navigation au clavier.
*   **Transitions et Micro-interactions :** Utiliser les utilitaires de transition et d'animation de Tailwind (`transition`, `duration`, `ease-in-out`, `hover:scale`, etc.) pour ajouter des retours visuels subtils et améliorer l'UX sans surcharger l'interface, en s'assurant qu'ils restent performants sur mobile.
*   **États des Éléments :** Prévoir et styliser les différents états des éléments interactifs : normal, hover, focus, actif, désactivé, chargement, erreur, sur tous les types d'appareils.

---

## Écrans et Flux Utilisateur Clés (Description Frontend avec Focus Responsive) :

### 1. Onboarding (Création de Compte & Profil Initial)

*   **Page d'accueil / Splash (optionnel) :** Design adaptatif avec un message clair et un appel à l'action principal.
*   **Formulaires d'Inscription/Connexion :**
    *   Champs de saisie clairs et bien espacés, s'adaptant à la largeur de l'écran. Sur desktop, envisager des mises en page multi-colonnes pour les formulaires plus longs si pertinent.
    *   Labels distincts et messages d'erreur/validation contextuels.
    *   Boutons d'action principaux proéminents, facilement cliquables/tappables.
*   **Page des CGU / Politique de Confidentialité :**
    *   Contenu textuel scrollable, lisible sur toutes les tailles d'écran.
    *   Case à cocher claire pour l'acceptation.

### 2. Entretien Vocal avec l'IA ("Dis-nous qui tu es")

*   **Interface d'Interaction Vocale :**
    *   Un bouton microphone central, visuellement distinct, pour démarrer/arrêter l'enregistrement. Le design doit être adapté pour un usage tactile sur mobile et cliquable sur desktop.
    *   Affichage textuel clair des questions posées par l'IA, avec une bonne lisibilité.
    *   Potentiellement un indicateur visuel simple (onde, icône animée) pendant l'enregistrement.
    *   Instructions concises, adaptées à l'espace disponible.

### 3. Vidéo de Présentation (Anonyme)

*   **Interface d'Enregistrement/Téléversement Vidéo :**
    *   Prévisualisation de la caméra (si enregistrement direct depuis le site) ou interface de téléversement de fichier.
    *   Boutons clairs pour enregistrer/téléverser, arrêter, revoir la vidéo.
    *   Rappel des consignes d'anonymat.
    *   Indicateur de progression.

### 4. Découverte et Sélection ("Avec quels humains te verrais-tu...")

*   **Vue Catalogue/Grille de Profils :**
    *   Présentation des profils sous forme de cartes (`rounded-lg shadow-md overflow-hidden`). La disposition des cartes s'adaptera (ex: 1 colonne sur mobile, 2-3 colonnes sur tablette, 3-4+ sur desktop).
    *   Chaque carte affichera la vidéo (ou un aperçu cliquable), et des bribes d'informations anonymisées.
    *   Interface de swipe sur mobile (si pertinent) ou boutons clairs pour "aimer" / "passer" sur tous les appareils.
*   **Interface de Filtres :**
    *   Contrôles intuitifs. Sur mobile, les filtres pourraient être dans un panneau coulissant ou une modale. Sur desktop, ils pourraient être dans une barre latérale persistante ou un menu déroulant plus large.
    *   Application des filtres de manière réactive.

### 5. Match et Notification

*   **Notification de Match :**
    *   Modale ou section dédiée de la page, visuellement engageante.
    *   Potentiellement une petite animation de célébration subtile.
*   **Liste des Matches :**
    *   Si une section "Mes Matches" existe, présenter chaque match de manière concise, avec une mise en page adaptée à l'écran.

### 6. Planification de la Rencontre et Révélation (Payant)

*   **Interface de Planification (Type Doodle) :**
    *   Affichage clair des disponibilités (calendrier, slots horaires), avec une interaction optimisée pour le tactile et la souris.
    *   Interface de sélection de lieu.
    *   Utiliser des composants de date/heure natifs ou des bibliothèques JS stylisées avec Tailwind, assurant leur responsivité.
*   **Interface de Paiement :**
    *   Formulaire sécurisé et d'apparence professionnelle.
    *   Bouton de confirmation de paiement clair.
*   **Page de Confirmation de Rencontre / Révélation du Profil :**
    *   Affichage des détails du match et du rendez-vous confirmé, avec une présentation soignée sur tous les appareils.

---

**Notes pour le Développeur Frontend :**

*   La logique métier et la communication avec le backend (API) ne sont pas l'objet de ce brief, mais l'UI devra prévoir des états de chargement, d'erreur, et des états vides, gérés de manière responsive.
*   L'objectif est de créer une expérience utilisateur cohérente et de haute qualité, que l'utilisateur accède à "Hoche Café Connect" via un navigateur mobile, une application packagée, ou un navigateur de bureau. La maîtrise des classes responsives de Tailwind CSS sera essentielle.
*   Tester régulièrement sur différents appareils et tailles d'écran tout au long du développement.

---