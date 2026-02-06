/**
 * ════════════════════════════════════════════════════════════════════════════
 * PORTFOLIO - Système de filtrage et galerie
 * ════════════════════════════════════════════════════════════════════════════
 */

// Base de données des projets avec leurs galeries d'images
const portfolioProjects = {
    project1: {
        title: "Team Building VitalCorp",
        category: "Entreprise",
        date: "Janvier 2026",
        description: "Une journée de team building intensive pour les 50 collaborateurs de VitalCorp. Au programme : course d'orientation, yoga matinal et ateliers nutrition. L'événement a permis de renforcer la cohésion d'équipe et de sensibiliser aux bienfaits d'un mode de vie actif.",
        images: [
            "images/Project_1/IMG_6915.jpg",
            "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80"
        ]
    },
    project2: {
        title: "Programme Bien-être ONG Développement",
        category: "ONG",
        date: "Décembre 2025",
        description: "Programme mensuel de bien-être pour l'ONG Développement. Sessions de sport adaptées, ateliers de gestion du stress et conseils nutrition personnalisés pour les 30 membres de l'équipe.",
        images: [
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&q=80",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80"
        ]
    },
    project3: {
        title: "Séminaire Fitness Banque Internationale",
        category: "Entreprise",
        date: "Novembre 2025",
        description: "Séminaire de 3 jours combinant formation professionnelle et activités fitness pour la Banque Internationale. Un programme sur mesure alliant productivité et bien-être.",
        images: [
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
        ]
    },
    project4: {
        title: "Campagne de sensibilisation contre le cancer du sein",
        category: "Public",
        date: "Octobre 2025",
        description: "Le 18 octobre, O'Fitness a organisé une session Zumba Fitness solidaire réunissant 400 participants pour sensibiliser au cancer du sein. Ouverte à tous, cette expérience unique a transformé l'énergie collective en un puissant message d'espoir. Chaque mouvement comptait.",
        images: [
            "images/Project_4/IMG_6915.jpg",
            "images/Project_4/IMG_6907.jpg",
            "images/Project_4/IMG_7167.jpg",
            "images/Project_4/IMG_7070.jpg"
        ]
    },
    project5: {
        title: "Sessions Yoga Startup FinTech",
        category: "Entreprise",
        date: "Septembre 2025",
        description: "Programme hebdomadaire de yoga adapté au rythme intense d'une startup FinTech. Sessions de 45 minutes le matin pour bien démarrer la journée.",
        images: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80",
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80"
        ]
    },
    project6: {
        title: "Coaching Groupe ONG Santé",
        category: "ONG",
        date: "Août 2025",
        description: "Programme de coaching sportif collectif pour l'ONG Santé. Renforcement musculaire, cardio et cohésion d'équipe au rendez-vous.",
        images: [
            "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
        ]
    }
};

// Variables globales
let currentProject = null;
let currentImageIndex = 0;

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
});

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
