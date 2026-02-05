/**
 * ════════════════════════════════════════════════════════════════════════════
 * O'FITNESS - HIGH ENERGY EXPERIENCE (JavaScript)
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * DESCRIPTION :
 * Module JavaScript qui gère toutes les interactions et animations premium
 * du site O'Fitness en mode "High Energy".
 * 
 * FONCTIONNALITÉS :
 * 1. Préloader animé
 * 2. Curseur personnalisé magnétique
 * 3. Barre de progression du scroll
 * 4. Animations d'apparition au scroll (Reveal)
 * 5. Effet de décalage pour les grilles (Stagger)
 * 6. Boutons magnétiques (attraction au survol)
 * 7. Parallaxe sur le hero
 * 8. Effet de déformation au scroll (Skew)
 * 
 * COMPATIBILITÉ :
 * - Desktop : Toutes les fonctionnalités actives
 * - Mobile : Désactivation des effets liés au curseur (tactile)
 * 
 * AUTEUR : O'Fitness
 * VERSION : 2.0
 * ════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════════
     OBJET PRINCIPAL - HE (High Energy)
     ══════════════════════════════════════════════════════════════════════════
     
     Cet objet contient toutes les méthodes et propriétés du module.
     Il est encapsulé dans une IIFE (Immediately Invoked Function Expression)
     pour éviter de polluer le scope global.
     
     PROPRIÉTÉS :
     - isTouch : true si l'appareil est tactile
     - isMobile : true si l'écran est < 1024px
     - scrollY : Position actuelle du scroll
     - mouseX/mouseY : Position de la souris
     
     ══════════════════════════════════════════════════════════════════════════ */

  const HE = {
    // Détection des appareils tactiles
    isTouch: 'ontouchstart' in window,

    // Détection mobile (différent de tactile - certains laptops sont tactiles)
    isMobile: window.innerWidth < 1024,

    // Variables de suivi
    scrollY: 0,
    lastScrollY: 0,
    scrollDirection: 'down',
    mouseX: 0,
    mouseY: 0,

    /* ────────────────────────────────────────────────────────────────────────
       MÉTHODE INIT - Point d'entrée principal
       ────────────────────────────────────────────────────────────────────────
       
       Cette méthode est appelée au chargement du DOM.
       Elle active le mode High Energy et initialise tous les modules.
       
       ORDRE D'INITIALISATION :
       1. Preloader (doit être le premier pour masquer le chargement)
       2. Curseur (doit être prêt avant les interactions)
       3. Scroll Progress (barre en haut)
       4. Scroll Reveal (animations apparition)
       5. Boutons magnétiques
       6. Parallaxe
       7. Skew on Scroll
       8. Smooth Scroll (navigation fluide)
       
       ──────────────────────────────────────────────────────────────────────── */
    init() {
      // 0. Toujours forcer le scroll en haut au rechargement
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);

      // Activer le mode High Energy en ajoutant la classe au body
      // Cette classe active tous les styles CSS du fichier high-energy.css
      document.body.classList.add('high-energy');

      // Initialiser tous les modules dans l'ordre
      this.initPreloader();      // 1. Écran de chargement
      // this.initCustomCursor();   // 2. Curseur magnétique (DÉSACTIVÉ)
      this.initScrollProgress(); // 3. Barre de progression
      this.initScrollReveal();   // 4. Animations d'apparition
      this.initMagneticButtons();// 5. Effet d'attraction sur boutons
      this.initParallax();       // 6. Effet de profondeur sur images
      this.initSkewOnScroll();   // 7. Déformation selon vitesse de scroll
      this.initSmoothScroll();   // 8. Défilement fluide vers les ancres

      // Message de confirmation dans la console (utile pour debug)
      console.log('O\'FITNESS High-Energy Mode - Version 2.0 (White Mode)');
    }
  };


  /* ══════════════════════════════════════════════════════════════════════════
     1. PRELOADER - Écran de chargement
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Afficher un écran de chargement pendant que le site se charge.
     Masque les "sauts" visuels pendant le chargement des ressources.
     
     FONCTIONNEMENT :
     1. Crée dynamiquement l'élément HTML du preloader
     2. L'insère au début du body
     3. Attend que la page soit complètement chargée (window.load)
     4. Ajoute la classe .hidden pour déclencher la transition CSS
     5. Supprime l'élément après la transition
     
     DURÉE : 1.5 secondes minimum (animation CSS de la barre de progression)
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initPreloader = function () {
    // Sélectionner l'élément du preloader existant (inséré en HTML)
    const preloader = document.querySelector('.he-preloader');

    // Si pas de preloader trouvé, on arrête
    if (!preloader) return;

    // Attendre le chargement complet de la page
    window.addEventListener('load', () => {
      // Délai minimum pour que l'animation de la barre se termine
      setTimeout(() => {
        // Ajouter la classe qui déclenche le fade-out du loader (CSS)
        preloader.classList.add('hidden');

        // DÉCLENCHEUR ANIMATION HERO : Ajouter la classe .loaded au body
        document.body.classList.add('loaded');

        // Supprimer l'élément du DOM après la transition
        setTimeout(() => preloader.remove(), 500);
      }, 1500);
    });
  };


  /* ══════════════════════════════════════════════════════════════════════════
     2. CURSEUR PERSONNALISÉ - Effet magnétique
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Remplacer le curseur par défaut par un curseur custom qui :
     - Suit la souris avec fluidité
     - S'agrandit au survol d'éléments cliquables
     - Crée un effet "haut de gamme"
     
     ÉLÉMENTS :
     - cursor-dot : Point central (8px) - suit instantanément
     - cursor-ring : Cercle (40px) - suit avec un léger délai
     
     DÉSACTIVATION :
     Ne s'initialise pas sur :
     - Appareils tactiles (pas de curseur)
     - Mobiles (écran < 1024px)
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initCustomCursor = function () {
    // Ne pas initialiser sur mobile ou tactile
    if (this.isTouch || this.isMobile) return;

    // Créer les éléments du curseur
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';

    // Ajouter au body
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    // Variables pour le suivi de position
    let cursorX = 0, cursorY = 0; // Position cible
    let ringX = 0, ringY = 0;     // Position actuelle du ring (interpolée)

    /* ────────────────────────────────────────────────────────────────────────
       SUIVI DE LA SOURIS
       Le point suit instantanément, le ring suit avec interpolation.
       ──────────────────────────────────────────────────────────────────────── */
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;

      // Stocker pour d'autres modules (parallaxe)
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Le point suit instantanément
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });

    /* ────────────────────────────────────────────────────────────────────────
       ANIMATION DU RING
       Utilise requestAnimationFrame pour une animation fluide à 60fps.
       L'interpolation (0.15) crée l'effet de "retard" fluide.
       ──────────────────────────────────────────────────────────────────────── */
    function animateCursor() {
      // Interpolation linéaire : position += (cible - position) * vitesse
      ringX += (cursorX - ringX) * 0.15;
      ringY += (cursorY - ringY) * 0.15;

      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';

      // Boucle d'animation continue
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* ────────────────────────────────────────────────────────────────────────
       EFFET HOVER SUR ÉLÉMENTS INTERACTIFS
       Agrandit le ring quand on survole des éléments cliquables.
       ──────────────────────────────────────────────────────────────────────── */
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .solution-card, .difference-item, .step-item, .benefit-item'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hover');
      });

      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hover');
      });
    });
  };


  /* ══════════════════════════════════════════════════════════════════════════
     3. BARRE DE PROGRESSION DU SCROLL
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Afficher une barre en haut de l'écran qui indique le pourcentage
     de la page déjà scrollé.
     
     CALCUL :
     pourcentage = (scrollY / (hauteurTotale - hauteurViewport)) * 100
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initScrollProgress = function () {
    // Créer le conteneur de la barre
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress';
    progressContainer.innerHTML = '<div class="scroll-progress-bar"></div>';

    // Insérer au début du body (sera en position fixed via CSS)
    document.body.prepend(progressContainer);

    const progressBar = progressContainer.querySelector('.scroll-progress-bar');

    // Mettre à jour à chaque scroll
    window.addEventListener('scroll', () => {
      // Hauteur totale scrollable = hauteur document - hauteur viewport
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Pourcentage scrollé
      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      // Appliquer à la barre
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true }); // passive: true améliore les performances
  };


  /* ══════════════════════════════════════════════════════════════════════════
     4. SCROLL REVEAL - Animations d'apparition
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Déclencher des animations quand les éléments entrent dans le viewport.
     Utilise Intersection Observer (performant, natif).
     
     CLASSES AJOUTÉES :
     - .he-reveal : Apparition en fade-up
     - .he-stagger : Animation décalée pour les enfants
     
     FONCTIONNEMENT :
     1. Ajoute les classes aux éléments ciblés
     2. Crée un Intersection Observer
     3. Quand un élément entre dans le viewport → ajoute .revealed
     4. Le CSS fait la transition
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initScrollReveal = function () {
    /* ────────────────────────────────────────────────────────────────────────
       SÉLECTEURS DES ÉLÉMENTS À ANIMER
       Liste des éléments qui auront l'animation de révélation.
       ──────────────────────────────────────────────────────────────────────── */
    const revealSelectors = [
      '.section-label',
      '.section-title',
      '.vision-content',
      '.vision-image',
      '.solutions-grid',
      '.difference-grid',
      '.steps-grid',
      '.benefits-grid',
      '.testimonial',
      '.contact-form',
      '.contact-aside',
      'p.vision-text',
      '.contact-intro'
    ];

    // Ajouter la classe .he-reveal à tous ces éléments
    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('he-reveal')) {
          el.classList.add('he-reveal');
        }
      });
    });

    // Ajouter .he-stagger aux grilles (animation décalée des enfants)
    const staggerGrids = document.querySelectorAll(
      '.solutions-grid, .difference-grid, .steps-grid, .benefits-grid'
    );
    staggerGrids.forEach(grid => {
      grid.classList.add('he-stagger');
    });

    /* ────────────────────────────────────────────────────────────────────────
       INTERSECTION OBSERVER
       API native performante pour détecter la visibilité des éléments.
       ──────────────────────────────────────────────────────────────────────── */
    const observerOptions = {
      root: null,           // Viewport comme référence
      rootMargin: '0px 0px -100px 0px', // Déclencher 100px avant le bas
      threshold: 0.1        // Déclencher quand 10% est visible
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ajouter la classe qui déclenche l'animation CSS
          entry.target.classList.add('revealed');

          // Arrêter d'observer (l'animation ne se joue qu'une fois)
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec ces classes
    document.querySelectorAll(
      '.he-reveal, .he-stagger, .he-slide-left, .he-slide-right, .he-scale'
    ).forEach(el => {
      revealObserver.observe(el);
    });
  };


  /* ══════════════════════════════════════════════════════════════════════════
     5. BOUTONS MAGNÉTIQUES
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Créer un effet où les boutons semblent "attirés" par le curseur
     quand celui-ci est à proximité.
     
     FONCTIONNEMENT :
     1. Calcule la position du curseur par rapport au centre du bouton
     2. Applique un transform: translate qui "tire" le bouton vers le curseur
     3. Au mouseleave, le bouton revient en position normale
     
     DÉSACTIVATION : Mobile et tactile
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initMagneticButtons = function () {
    if (this.isTouch || this.isMobile) return;

    // Sélectionner tous les boutons
    const magneticElements = document.querySelectorAll('.btn, .nav-cta .btn, .hero-cta .btn');

    magneticElements.forEach(btn => {
      btn.classList.add('magnetic-btn');

      btn.addEventListener('mousemove', (e) => {
        // Récupérer les dimensions et position du bouton
        const rect = btn.getBoundingClientRect();

        // Distance du curseur au centre du bouton
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Appliquer un déplacement proportionnel (0.3 = force de l'attraction)
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        // Retour à la position normale
        btn.style.transform = 'translate(0, 0)';
      });
    });
  };


  /* ══════════════════════════════════════════════════════════════════════════
     6. PARALLAXE
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Créer un effet de profondeur où les éléments bougent à des vitesses
     différentes au scroll et au mouvement de souris.
     
     EFFETS :
     - Hero image : Se déplace légèrement au scroll (effet de profondeur)
     - Hero content : Bouge légèrement avec la souris
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initParallax = function () {
    const heroImage = document.querySelector('.hero-bg video, .hero-bg img');

    /* ────────────────────────────────────────────────────────────────────────
       PARALLAXE AU SCROLL
       L'image du hero se déplace plus lentement que le scroll.
       ──────────────────────────────────────────────────────────────────────── */
    if (heroImage && !this.isMobile) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // 0.3 = vitesse relative (30% de la vitesse du scroll)
        const rate = scrolled * 0.3;
        heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
      }, { passive: true });
    }

    /* ────────────────────────────────────────────────────────────────────────
       PARALLAXE À LA SOURIS
       Le contenu du hero bouge légèrement selon la position de la souris.
       ──────────────────────────────────────────────────────────────────────── */
    const heroContent = document.querySelector('.hero-content');

    /*if (heroContent && !this.isMobile) {
      document.addEventListener('mousemove', (e) => {
        // Calculer le déplacement depuis le centre de l'écran
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }*/
  };


  /* ══════════════════════════════════════════════════════════════════════════
     7. SKEW ON SCROLL - Déformation selon la vitesse
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Les cartes se déforment légèrement (skew) selon la direction du scroll.
     Crée une sensation de vitesse et de dynamisme.
     
     FONCTIONNEMENT :
     - Scroll vers le bas → skewY négatif
     - Scroll vers le haut → skewY positif
     - Scroll lent ou arrêt → retour à la normale
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initSkewOnScroll = function () {
    if (this.isMobile) return;

    // Sélectionner les éléments qui auront l'effet
    const skewElements = document.querySelectorAll(
      '.solution-card, .difference-item, .step-item, .benefit-item'
    );

    skewElements.forEach(el => {
      el.classList.add('skew-on-scroll');
    });

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        // requestAnimationFrame pour performances optimales
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY;

          skewElements.forEach(el => {
            // Seuil de 5px pour éviter les micro-mouvements
            if (Math.abs(scrollDelta) > 5) {
              if (scrollDelta > 0) {
                // Scroll vers le bas
                el.classList.add('skewing-down');
                el.classList.remove('skewing-up');
              } else {
                // Scroll vers le haut
                el.classList.add('skewing-up');
                el.classList.remove('skewing-down');
              }
            } else {
              // Scroll lent ou stop → retour normal
              el.classList.remove('skewing-down', 'skewing-up');
            }
          });

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  };


  /* ══════════════════════════════════════════════════════════════════════════
     8. SMOOTH SCROLL - Navigation fluide
     ══════════════════════════════════════════════════════════════════════════
     
     RÔLE :
     Remplacer le comportement par défaut des ancres (#section)
     par un défilement fluide et animé.
     
     FONCTIONNEMENT :
     1. Intercepte les clics sur les liens avec href="#..."
     2. Calcule la position cible (moins la hauteur du header)
     3. Utilise window.scrollTo avec behavior: 'smooth'
     
     ══════════════════════════════════════════════════════════════════════════ */

  HE.initSmoothScroll = function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Ignorer les liens vides (#)
        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          // Récupérer la hauteur du header (pour ne pas le cacher)
          const headerHeight = document.querySelector('.header').offsetHeight;

          // Calculer la position finale
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

          // Défilement fluide
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };


  /* ══════════════════════════════════════════════════════════════════════════
     INITIALISATION
     ══════════════════════════════════════════════════════════════════════════
     
     Démarre le module quand le DOM est prêt.
     
     ══════════════════════════════════════════════════════════════════════════ */

  if (document.readyState === 'loading') {
    // DOM pas encore prêt → attendre l'événement
    document.addEventListener('DOMContentLoaded', () => HE.init());
  } else {
    // DOM déjà prêt → initialiser immédiatement
    HE.init();
  }

})();
