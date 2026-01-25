/**
 * O'FITNESS - Main JavaScript
 * Mobile-first interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // ============ MOBILE NAVIGATION ============
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ============ HEADER SCROLL EFFECT ============
  const header = document.querySelector('.header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============ SCROLL REVEAL ANIMATIONS ============
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal(); // Check on load

  // ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Stagger animation for grid items
        const children = entry.target.querySelectorAll('.solution-card, .difference-item, .action-card');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('fade-in-up');
        });
        
        observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);
  
  document.querySelectorAll('.solutions-grid, .difference-grid, .actions-scroll, .trust-logos').forEach(section => {
    scrollObserver.observe(section);
  });

  // ============ FORM HANDLING ============
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Validate form
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          field.addEventListener('input', function() {
            this.classList.remove('error');
          }, { once: true });
        }
      });
      
      if (!isValid) {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
      }
      
      // Email validation
      const emailField = this.querySelector('[type="email"]');
      if (emailField && !isValidEmail(emailField.value)) {
        emailField.classList.add('error');
        showNotification('Veuillez entrer une adresse email valide.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Envoi en cours...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        this.reset();
        showNotification('Merci ! Nous vous recontacterons très bientôt.', 'success');
      }, 1500);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${type === 'success' 
            ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
            : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
          }
        </svg>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Fermer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 16px;
      right: 16px;
      max-width: 400px;
      margin: 0 auto;
      padding: 16px;
      background: ${type === 'success' ? '#22C55E' : '#EF4444'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      z-index: 10000;
      animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.style.animation = 'slideDown 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    });

    // Auto close
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Add notification animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideDown {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }
    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .notification-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
    .notification-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .notification-close:hover {
      opacity: 1;
    }
    .notification-close svg {
      width: 20px;
      height: 20px;
    }
    .fade-in-up {
      animation: fadeInUp 0.6s ease forwards;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .form-group input.error,
    .form-group textarea.error {
      border-color: #EF4444;
      background-color: #FEF2F2;
    }
    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // ============ COUNTER ANIMATION ============
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);
      
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  // ============ LAZY LOADING IMAGES ============
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback with Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ============ ACTIVE NAV LINK ON SCROLL ============
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ============ TOUCH GESTURES FOR GALLERY ============
  const actionsScroll = document.querySelector('.actions-scroll');
  
  if (actionsScroll) {
    let isDown = false;
    let startX;
    let scrollLeft;

    actionsScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      actionsScroll.classList.add('grabbing');
      startX = e.pageX - actionsScroll.offsetLeft;
      scrollLeft = actionsScroll.scrollLeft;
    });

    actionsScroll.addEventListener('mouseleave', () => {
      isDown = false;
      actionsScroll.classList.remove('grabbing');
    });

    actionsScroll.addEventListener('mouseup', () => {
      isDown = false;
      actionsScroll.classList.remove('grabbing');
    });

    actionsScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - actionsScroll.offsetLeft;
      const walk = (x - startX) * 2;
      actionsScroll.scrollLeft = scrollLeft - walk;
    });
  }

  // ============ WHATSAPP BUTTON VISIBILITY ============
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const heroSection = document.querySelector('.hero');
  
  if (whatsappFloat && heroSection) {
    function toggleWhatsappButton() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      
      if (window.pageYOffset > heroBottom - 200) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.pointerEvents = 'auto';
      } else {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.pointerEvents = 'none';
      }
    }

    whatsappFloat.style.transition = 'opacity 0.3s ease';
    window.addEventListener('scroll', toggleWhatsappButton, { passive: true });
    toggleWhatsappButton();
  }

  // ============ PRELOADER ============
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 500);
    }
    
    // Trigger hero animations
    document.querySelector('.hero')?.classList.add('loaded');
  });

  console.log('O\'FITNESS - Site chargé avec succès ✓');
});
