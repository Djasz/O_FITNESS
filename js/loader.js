/**
 * ════════════════════════════════════════════════════════════════════════════
 * O'FITNESS - PAGE LOADER
 * Gestion de l'affichage/masquage du loader avec animation
 * ════════════════════════════════════════════════════════════════════════════
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        minLoadTime: 800,        // Temps minimum d'affichage (ms)
        maxLoadTime: 3000,       // Temps maximum d'affichage (ms)
        fadeOutDuration: 600     // Durée du fade-out (ms)
    };

    // Variables
    let startTime = Date.now();
    let loader = null;
    let progressBar = null;

    /**
     * Initialiser le loader
     */
    function init() {
        loader = document.getElementById('page-loader');
        progressBar = document.querySelector('.loader-progress-bar');

        if (!loader) {
            console.warn('Loader element not found');
            return;
        }

        // Démarrer l'animation de la barre de progression
        if (progressBar) {
            progressBar.classList.add('loading');
        }

        // Écouter l'événement de chargement complet
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Fallback : masquer après maxLoadTime
        setTimeout(() => {
            if (loader && !loader.classList.contains('loaded')) {
                hideLoader();
            }
        }, CONFIG.maxLoadTime);
    }

    /**
     * Gérer le chargement complet de la page
     */
    function handleLoad() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, CONFIG.minLoadTime - elapsedTime);

        // Attendre le temps minimum avant de masquer
        setTimeout(() => {
            hideLoader();
        }, remainingTime);
    }

    /**
     * Masquer le loader avec animation
     */
    function hideLoader() {
        if (!loader) return;

        // Compléter la barre de progression
        if (progressBar) {
            progressBar.style.width = '100%';
        }

        // Attendre un court instant pour montrer 100%
        setTimeout(() => {
            // Ajouter la classe pour déclencher l'animation de sortie
            loader.classList.add('loaded');

            // Supprimer l'élément du DOM après l'animation
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, CONFIG.fadeOutDuration);
        }, 200);
    }

    /**
     * Mettre à jour manuellement la progression (optionnel)
     * Peut être appelé depuis d'autres scripts si nécessaire
     */
    window.updateLoaderProgress = function (percentage) {
        if (progressBar && percentage >= 0 && percentage <= 100) {
            progressBar.style.width = percentage + '%';
        }
    };

    // Démarrer au chargement du script
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
