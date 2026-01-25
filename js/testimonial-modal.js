/**
 * ════════════════════════════════════════════════════════════════════════════
 * TESTIMONIAL MODAL - Gestion du modal pour les témoignages
 * ════════════════════════════════════════════════════════════════════════════
 */

// Ouvrir le modal avec les infos du témoignage
function openTestimonialModal(card) {
    const modal = document.getElementById('testimonialModal');

    // Récupérer les données de la carte
    const avatar = card.querySelector('.testimonial-card-avatar').textContent;
    const name = card.querySelector('.testimonial-card-author strong').textContent;
    const role = card.querySelector('.testimonial-card-author span').textContent;
    const fullText = card.getAttribute('data-full-text');

    // Remplir le modal
    document.getElementById('modalAvatar').textContent = avatar;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalRole').textContent = role;
    document.getElementById('modalText').textContent = fullText;

    // Afficher le modal
    modal.classList.add('active');

    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
}

// Fermer le modal
function closeTestimonialModal(event) {
    // Si on clique sur l'overlay (pas sur le modal lui-même)
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('testimonialModal');
    modal.classList.remove('active');

    // Réactiver le scroll
    document.body.style.overflow = '';
}

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTestimonialModal();
    }
});

// Effet de tilt sur les cartes au hover (mouse movement)
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Calcul de la position de la souris par rapport à la carte
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Centre de la carte
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calcul de l'inclinaison (max 5 degrés)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            // Appliquer la transformation
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            // Retour à la normale
            card.style.transform = '';
        });
    });
});
