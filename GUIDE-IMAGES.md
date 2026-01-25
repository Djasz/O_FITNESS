# GUIDE DES IMAGES PROFESSIONNELLES - O'FITNESS

Ce document liste toutes les zones du site ou vous devez ajouter vos propres images professionnelles.

---

## RESUME DES ZONES D'IMAGES

| Zone | Fichier | Type | Dimensions recommandees |
|------|---------|------|------------------------|
| Hero | index.html | Video ou Image | 1920x1080 px |
| Vision | index.html | Photo equipe | 800x600 px |
| Solutions | index.html | 4 photos services | 600x400 px chaque |
| Temoignages | index.html | Portraits clients | 100x100 px |
| Actions | actions.html | 3 photos activites | 600x400 px |

---

## 1. HERO - Arriere-plan principal

### Localisation dans le code
```html
<!-- Fichier : index.html, ligne ~67 -->
<div class="hero-bg">
    <video poster="VOTRE_IMAGE_ICI" ...>
        <source src="VOTRE_VIDEO_ICI" ...>
    </video>
</div>
```

### Recommandations
- **Type** : Video MP4 (optimal) ou Image JPG
- **Dimensions** : 1920x1080 pixels minimum
- **Contenu suggere** :
  - Session de coaching en entreprise
  - Equipe faisant du sport ensemble
  - Seance de yoga/stretching en groupe
  - Team building sportif

### Comment remplacer
1. Deposez votre fichier dans le dossier `images/`
2. Nommez-le : `hero-ofitness.mp4` ou `hero-ofitness.jpg`
3. Modifiez les lignes :
   ```html
   poster="images/hero-ofitness.jpg"
   src="images/hero-ofitness.mp4"
   ```

---

## 2. VISION - Photo d'equipe

### Localisation dans le code
```html
<!-- Fichier : index.html, ligne ~267 -->
<div class="vision-image">
    <img src="VOTRE_IMAGE_ICI" alt="Equipe O'Fitness" ...>
</div>
```

### Recommandations
- **Type** : Image JPG
- **Dimensions** : 800x600 pixels minimum
- **Contenu suggere** :
  - Photo de groupe de l'equipe O'Fitness
  - Coach en action avec des participants
  - Moment de cohesion d'equipe

### Comment remplacer
1. Deposez votre fichier : `images/equipe-ofitness.jpg`
2. Modifiez :
   ```html
   src="images/equipe-ofitness.jpg"
   ```

---

## 3. SOLUTIONS - Photos des 4 services

### Localisation dans le code
```html
<!-- Fichier : index.html, section Solutions -->
<!-- Il y a 4 cartes, chacune peut avoir une image -->
```

### Recommandations pour chaque service

| Service | Contenu image | Nom fichier suggere |
|---------|---------------|---------------------|
| Sport en entreprise | Seance fitness en salle | `solution-sport.jpg` |
| Programmes personnalises | Coach avec tablette | `solution-programme.jpg` |
| Team building | Activite de groupe | `solution-teambuilding.jpg` |
| Suivi et reporting | Dashboard ou reunion | `solution-suivi.jpg` |

- **Dimensions** : 600x400 pixels
- **Style** : Professionnel, dynamique, humain

---

## 4. TEMOIGNAGES - Portraits clients

### Localisation dans le code
```html
<!-- Fichier : index.html, section Confiance -->
<div class="testimonial-avatar">
    <!-- Actuellement : initiales, remplacer par photo -->
</div>
```

### Recommandations
- **Type** : Photos portrait (avec autorisation)
- **Dimensions** : 100x100 pixels
- **Format** : Carre, recadre sur le visage
- **Style** : Professionnel, souriant

### Alternative si pas de photos
Conserver le systeme actuel avec initiales (plus sur juridiquement).

---

## 5. ACTIONS - Photos des activites

### Localisation dans le code
```html
<!-- Fichier : actions.html -->
<!-- 3 zones d'images pour les activites -->
```

### Recommandations

| Activite | Contenu | Nom fichier |
|----------|---------|-------------|
| Fitness | Cours collectif | `action-fitness.jpg` |
| Yoga | Seance relaxation | `action-yoga.jpg` |
| Team building | Activite outdoor | `action-team.jpg` |

- **Dimensions** : 600x400 pixels
- **Style** : Action, mouvement, energie

---

## CONSEILS GENERAUX

### Format des fichiers
- **Photos** : JPG (compression 80%)
- **Videos** : MP4 (codec H.264)
- **Logos clients** : PNG avec transparence

### Optimisation
- Compressez vos images avec [TinyPNG](https://tinypng.com/)
- Compressez vos videos avec [HandBrake](https://handbrake.fr/)
- Taille max par image : 200 Ko
- Taille max video hero : 10 Mo

### Nommage
- Tout en minuscules
- Tirets a la place des espaces
- Pas d'accents ni caracteres speciaux
- Exemples : `equipe-ofitness.jpg`, `hero-coaching.mp4`

### Accessibilite
- Renseignez toujours l'attribut `alt` avec une description
- Exemple : `alt="Equipe O'Fitness lors d'une session de coaching"`

---

## ARBORESCENCE RECOMMANDEE

```
images/
├── hero-ofitness.mp4          # Video hero
├── hero-ofitness.jpg          # Fallback image hero
├── equipe-ofitness.jpg        # Photo equipe (Vision)
├── solution-sport.jpg         # Service 1
├── solution-programme.jpg     # Service 2
├── solution-teambuilding.jpg  # Service 3
├── solution-suivi.jpg         # Service 4
├── action-fitness.jpg         # Activite 1
├── action-yoga.jpg            # Activite 2
├── action-team.jpg            # Activite 3
├── logo-client-1.png          # Logo partenaire
├── logo-client-2.png          # Logo partenaire
└── ...
```

---

## CHECKLIST AVANT MISE EN LIGNE

- [ ] Hero : Video ou image de qualite
- [ ] Vision : Photo d'equipe authentique
- [ ] Solutions : 4 photos illustrant chaque service
- [ ] Confiance : Logos clients reels (avec autorisation)
- [ ] Actions : Photos des activites proposees
- [ ] Toutes les images sont compressees
- [ ] Tous les `alt` sont renseignes

---

*Document genere le 21/01/2026 - O'Fitness*
