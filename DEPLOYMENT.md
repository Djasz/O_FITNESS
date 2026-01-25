# 🚀 Guide de Déploiement O'Fitness

## Étapes de déploiement sur GitHub et Vercel

### 1️⃣ Préparation du projet

✅ Structure du projet vérifiée
✅ `.gitignore` créé
✅ `README.md` professionnel créé
✅ `vercel.json` configuré
✅ Code optimisé pour la production

---

### 2️⃣ Initialisation Git et Push vers GitHub

#### A. Créer un nouveau repository sur GitHub

1. Aller sur [github.com](https://github.com)
2. Cliquer sur **"New repository"**
3. Nommer le repo : `ofitness` ou `ofitness-website`
4. Laisser **Public** ou choisir **Private**
5. **Ne pas** initialiser avec README (on a déjà un README.md)
6. Cliquer sur **"Create repository"**

#### B. Commandes Git à exécuter

Ouvrir le terminal dans le dossier du projet et exécuter :

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit - O'Fitness website ready for deployment"

# 4. Renommer la branche en 'main'
git branch -M main

# 5. Ajouter l'origine GitHub (REMPLACER par votre URL)
git remote add origin https://github.com/VOTRE-USERNAME/ofitness.git

# 6. Pousser vers GitHub
git push -u origin main
```

**⚠️ Important** : Remplacer `VOTRE-USERNAME` par votre nom d'utilisateur GitHub réel.

---

### 3️⃣ Déploiement sur Vercel

#### Option A - Import depuis GitHub (Recommandé)

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur **"New Project"**
4. Importer le repository `ofitness`
5. Configuration :
   - **Project Name**: `ofitness`
   - **Framework Preset**: Other (ou None)
   - **Root Directory**: `./`
   - **Build Command**: (laisser vide)
   - **Output Directory**: `./`
   - **Install Command**: (laisser vide)
6. Cliquer sur **"Deploy"**
7. Attendre 30-60 secondes ✨
8. **C'est en ligne !** 🎉

#### Option B - Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

---

### 4️⃣ Configuration du domaine personnalisé (Optionnel)

1. Dans Vercel, aller dans **Settings > Domains**
2. Ajouter votre domaine : `ofitness.tg` ou `www.ofitness.tg`
3. Suivre les instructions pour configurer les DNS
4. Attendre la propagation DNS (10 min - 48h)

---

### 5️⃣ Déploiement continu

Chaque fois que vous push vers GitHub :

```bash
git add .
git commit -m "Update: description des changements"
git push origin main
```

Vercel redéploiera automatiquement ! 🚀

---

## ✅ Checklist finale

- [ ] Repository GitHub créé
- [ ] Code pushé vers GitHub
- [ ] Projet importé sur Vercel
- [ ] Déploiement réussi
- [ ] URL de production testée
- [ ] Responsive vérifié (mobile, tablet, desktop)
- [ ] Performance vérifiée (Google PageSpeed)
- [ ] SEO de base vérifié
- [ ] Liens WhatsApp et contact fonctionnels
- [ ] Domaine personnalisé configuré (si applicable)

---

## 🔧 Commandes utiles

### Git

```bash
# Voir le statut
git status

# Voir l'historique
git log --oneline

# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Revenir à main
git checkout main

# Mettre à jour depuis GitHub
git pull origin main
```

### Vercel

```bash
# Voir les déploiements
vercel list

# Voir les logs
vercel logs

# Supprimer un déploiement
vercel remove [deployment-url]
```

---

## 🆘 Résolution de problèmes

### Erreur : "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/VOTRE-USERNAME/ofitness.git
```

### Erreur : "Updates were rejected"

```bash
git pull origin main --rebase
git push origin main
```

### Le site ne se charge pas sur Vercel

1. Vérifier les logs dans Vercel Dashboard
2. S'assurer que `index.html` est à la racine
3. Vérifier `vercel.json` pour les erreurs

---

## 📞 Support

En cas de problème, consulter :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Git](https://git-scm.com/doc)
- [Stack Overflow](https://stackoverflow.com)

---

**Bon déploiement ! 🚀**
