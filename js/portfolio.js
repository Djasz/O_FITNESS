/**
 * ════════════════════════════════════════════════════════════════════════════
 * PORTFOLIO - Système de filtrage et galerie (Optimisé & Swipe Mobile)
 * ════════════════════════════════════════════════════════════════════════════
 */

// Base de données des projets avec leurs galeries d'images
const portfolioProjects = {
    project1: {
        title: "Team Building VitalCorp",
        category: "Entreprise",
        date: "Janvier 2026",
        description: "Une journée de team building intensive pour les 50 collaborateurs de VitalCorp.",
        images: [
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
            "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
        ]
    },
    project2: {
        title: "Programme Bien-être ONG Développement",
        category: "ONG",
        date: "Décembre 2025",
        description: "Programme mensuel de bien-être pour l'ONG Développement.",
        images: [
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80"
        ]
    },
    project3: {
        title: "Séminaire Fitness Banque Internationale",
        category: "Entreprise",
        date: "Novembre 2025",
        description: "Séminaire de 3 jours combinant formation professionnelle et activités fitness pour la Banque Internationale. Un programme sur mesure alliant productivité et bien-être.",
        images: [
            "images/Project_3/AssoColibrsi_Ofitness_OctobreRose_Campaign_Apothéose.jpg",

            "images/Project_3_Optimized/Photo_01.webp",
            "images/Project_3_Optimized/Photo_03.webp",
            "images/Project_3_Optimized/Photo_04.webp",
            "images/Project_3_Optimized/Photo_05.webp",
            "images/Project_3_Optimized/Photo_06.webp",
            "images/Project_3_Optimized/Photo_07.webp",
            "images/Project_3_Optimized/Photo_08.webp",
            "images/Project_3_Optimized/Photo_010.webp",
            "images/Project_3_Optimized/Photo_011.webp",
            "images/Project_3_Optimized/Photo_09.webp",
            "images/Project_3_Optimized/Photo_012.webp",
            "images/Project_3_Optimized/Photo_013.webp",
            "images/Project_3_Optimized/Photo_014.webp",
            "images/Project_3_Optimized/Photo_015.webp",
            "images/Project_3_Optimized/Photo_016.webp",
            "images/Project_3_Optimized/Photo_017.webp",
            "images/Project_3_Optimized/Photo_018.webp",
            "images/Project_3_Optimized/Photo_019.webp",
            "images/Project_3_Optimized/Photo_02.webp",
            "images/Project_3_Optimized/Photo_020.webp",
            "images/Project_3_Optimized/Photo_021.webp",
            "images/Project_3_Optimized/Photo_022.webp",
            "images/Project_3_Optimized/Photo_023.webp",
            "images/Project_3_Optimized/Photo_024.webp",
            "images/Project_3_Optimized/Photo_025.webp",

            "images/Project_3/AssoColibrsi_Ofitness_OctRose_Campaign_Merci_2.jpg",
        ]
    },
    project4: {
        title: "Course Solidaire 5km",
        category: "Public",
        date: "Octobre 2025",
        description: "Organisation d'une course solidaire de 5km réunissant plus de 200 participants.",
        images: [
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
            "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80"
        ]
    }
};

// Variables globales
let currentProject = null;
let currentImageIndex = 0;

// GESTION DU SWIPE MOBILE
let touchStartX = 0;
let touchEndX = 0;

// ========================================
// FILTRAGE DES PROJETS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Gestion des filtres
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Mettre à jour les boutons actifs
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrer les cartes
            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });

    // Gestion du clic sur les cartes pour ouvrir la galerie
    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openPortfolioModal(projectId);
        });
    });

    // Initialiser les écouteurs de swipe sur l'image principale
    const modalImageContainer = document.querySelector('.portfolio-modal-body');
    if (modalImageContainer) {
        modalImageContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modalImageContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
});

// LOGIQUE SWIPE
function handleSwipe() {
    const threshold = 50; // Distance min pour swipe
    if (touchEndX < touchStartX - threshold) {
        navigatePortfolioImage(1); // Suivant (Swipe Gauche)
    }
    if (touchEndX > touchStartX + threshold) {
        navigatePortfolioImage(-1); // Précédent (Swipe Droite)
    }
}

// ========================================
// MODAL / GALERIE
// ========================================

function openPortfolioModal(projectId) {
    const project = portfolioProjects[projectId];
    if (!project) return;

    currentProject = project;
    currentImageIndex = 0;

    // Remplir les informations
    document.getElementById('portfolioModalCategory').textContent = project.category;
    document.getElementById('portfolioModalTitle').textContent = project.title;
    document.getElementById('portfolioModalDate').textContent = project.date;
    document.getElementById('portfolioModalDescription').textContent = project.description;

    // Charger l'image principale
    updateMainImage();

    // Générer les miniatures
    generateThumbnails();

    // Afficher le modal
    const modal = document.getElementById('portfolioModal');
    modal.classList.add('active');

    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');

    // Réactiver le scroll
    document.body.style.overflow = '';

    currentProject = null;
    currentImageIndex = 0;
}

function updateMainImage() {
    if (!currentProject) return;

    const mainImage = document.getElementById('portfolioMainImage');
    mainImage.src = currentProject.images[currentImageIndex];
    mainImage.alt = `${currentProject.title} - Image ${currentImageIndex + 1}`;

    // Mettre à jour l'état actif des miniatures
    updateActiveThumbnail();
}

function generateThumbnails() {
    if (!currentProject) return;

    const thumbnailsContainer = document.getElementById('portfolioThumbnails');
    thumbnailsContainer.innerHTML = '';

    currentProject.images.forEach((imageUrl, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'portfolio-thumbnail';
        if (index === 0) thumbnail.classList.add('active');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Miniature ${index + 1}`;
        img.loading = 'lazy';

        thumbnail.appendChild(img);
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateMainImage();
        });

        thumbnailsContainer.appendChild(thumbnail);
    });
}

function updateActiveThumbnail() {
    const thumbnails = document.querySelectorAll('.portfolio-thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function navigatePortfolioImage(direction) {
    if (!currentProject) return;

    currentImageIndex += direction;

    // Boucle circulaire
    if (currentImageIndex < 0) {
        currentImageIndex = currentProject.images.length - 1;
    } else if (currentImageIndex >= currentProject.images.length) {
        currentImageIndex = 0;
    }

    updateMainImage();
}

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePortfolioModal();
    }
});

// Navigation avec les flèches du clavier
document.addEventListener('keydown', (e) => {
    if (!currentProject) return;

    if (e.key === 'ArrowLeft') {
        navigatePortfolioImage(-1);
    } else if (e.key === 'ArrowRight') {
        navigatePortfolioImage(1);
    }
});
