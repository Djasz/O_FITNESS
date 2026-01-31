/**
 * ════════════════════════════════════════════════════════════════════════════
 * SCRIPT AUTOMATIQUE - AJOUT LAZY LOADING
 * Ajoute loading="lazy" à toutes les images sauf logo et hero
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * UTILISATION :
 * 1. Ouvrir la console du navigateur (F12)
 * 2. Copier-coller ce script
 * 3. Appuyer sur Entrée
 * 
 * Le script affichera un rapport des modifications
 * ════════════════════════════════════════════════════════════════════════════
 */

(function addLazyLoading() {
    'use strict';

    // Images à EXCLURE du lazy loading (chargement immédiat)
    const EAGER_IMAGES = [
        'Ofitness_name.svg',        // Logo header
        'OfitnessLogo.svg',         // Favicon (si utilisé comme img)
        'hero-background',          // Image hero (tout nom contenant ça)
        'hero-bg'                   // Alternative hero bg
    ];

    // Fonction pour vérifier si une image doit être chargée immédiatement
    function shouldBeEager(img) {
        const src = img.getAttribute('src') || '';
        const className = img.className || '';

        // Vérifier si l'image correspond aux exclusions
        return EAGER_IMAGES.some(pattern =>
            src.includes(pattern) || className.includes('hero-bg')
        );
    }

    // Parcourir toutes les images
    const allImages = document.querySelectorAll('img');
    let eagerCount = 0;
    let lazyCount = 0;
    let alreadyLazyCount = 0;

    console.log('🔍 Analyse des images...\n');
    console.log(`Total d'images trouvées : ${allImages.length}\n`);

    allImages.forEach((img, index) => {
        const src = img.getAttribute('src') || 'N/A';
        const hasLoading = img.hasAttribute('loading');
        const currentLoading = img.getAttribute('loading');

        if (shouldBeEager(img)) {
            // Image critique - Force eager loading
            if (currentLoading !== 'eager') {
                img.setAttribute('loading', 'eager');
                console.log(`✅ [${index + 1}] EAGER (critique) : ${src}`);
                eagerCount++;
            } else {
                console.log(`✔️  [${index + 1}] EAGER (déjà défini) : ${src}`);
            }
        } else {
            // Image non-critique - Lazy loading
            if (currentLoading === 'lazy') {
                console.log(`⏭️  [${index + 1}] LAZY (déjà défini) : ${src}`);
                alreadyLazyCount++;
            } else {
                img.setAttribute('loading', 'lazy');
                console.log(`⚡ [${index + 1}] LAZY (ajouté) : ${src}`);
                lazyCount++;
            }
        }
    });

    // Rapport final
    console.log('\n═══════════════════════════════════════════');
    console.log('📊 RAPPORT FINAL');
    console.log('═══════════════════════════════════════════');
    console.log(`Images mises en EAGER (chargement immédiat) : ${eagerCount}`);
    console.log(`Images mises en LAZY (chargement différé)   : ${lazyCount}`);
    console.log(`Images déjà en LAZY                          : ${alreadyLazyCount}`);
    console.log(`TOTAL                                        : ${allImages.length}`);
    console.log('═══════════════════════════════════════════\n');

    if (lazyCount > 0 || eagerCount > 0) {
        console.log('✅ Modifications appliquées avec succès !');
        console.log('⚠️  IMPORTANT : Ces modifications sont temporaires.');
        console.log('📝 Pour les rendre permanentes :');
        console.log('   1. Ouvrir l\'inspecteur (clic droit sur <html>)');
        console.log('   2. Copier le HTML complet (Copy outerHTML)');
        console.log('   3. Remplacer dans votre fichier index.html');
    } else {
        console.log('ℹ️  Toutes les images ont déjà les bons attributs loading.');
    }

    // Retourner les stats pour inspection
    return {
        total: allImages.length,
        eager: eagerCount,
        lazy: lazyCount,
        alreadyLazy: alreadyLazyCount
    };
})();
