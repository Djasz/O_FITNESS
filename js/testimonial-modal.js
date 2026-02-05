/**
 * ════════════════════════════════════════════════════════════════════════════
 * TESTIMONIAL MODAL - Gestion du modal (CSP Compliant)
 * ════════════════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {

    // === ÉLÉMENTS DOM ===
    const modal = document.getElementById('testimonialModal');
    const closeBtn = document.getElementById('closeTestimonialBtn');
    const modalContent = document.querySelector('.testimonial-modal');

    // Éléments à remplir dynamiquement
    const modalAvatar = document.getElementById('modalAvatar');
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalText = document.getElementById('modalText');

    // === LOGIQUE ===

    function openModal(card) {
        if (!modal) return;

        // Récupérer les données de la carte
        const avatar = card.querySelector('.testimonial-card-avatar').textContent;
        const name = card.querySelector('.testimonial-card-author strong').textContent;
        const role = card.querySelector('.testimonial-card-author span').textContent;
        const fullText = card.getAttribute('data-full-text');

        // Remplir le modal
        if (modalAvatar) modalAvatar.textContent = avatar;
        if (modalName) modalName.textContent = name;
        if (modalRole) modalRole.textContent = role;
        if (modalText) modalText.textContent = fullText;

        // Afficher le modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquer le scroll
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
    }

    // === EVENT LISTENERS ===

    // 1. Boutons "Lire plus"
    document.querySelectorAll('.testimonial-read-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remonter au parent .testimonial-card
            const card = e.target.closest('.testimonial-card');
            if (card) {
                openModal(card);
            }
        });
    });

    // 2. Bouton Fermer (Croix)
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // 3. Clic sur l'overlay (Fermer si on clique dehors)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // 4. Empêcher la fermeture si on clique sur le contenu du modal (optionnel mais sûr)
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 5. Touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // === EFFET TILT (Déformation 3D au survol) ===
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Inclinaison légère
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = ''; // Reset
        });
    });
});
