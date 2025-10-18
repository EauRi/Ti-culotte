/* ============================================ */
/* SCRIPT JAVASCRIPT POUR TI-CULOTTÉ */
/* ============================================ */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================ */
    /* NAVIGATION SMOOTH SCROLL */
    /* ============================================ */
    
    // Sélectionner tous les liens qui commencent par #
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Vérifier si le lien pointe vers un élément de la page
            const targetId = this.getAttribute('href');
            
            // Ignorer les liens qui sont juste "#"
            if (targetId === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculer la position avec un offset pour le header fixe
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Scroll smooth vers la section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    /* ============================================ */
    /* GESTION DU FORMULAIRE DE CONTACT */
    /* ============================================ */
    
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs du formulaire.');
                return;
            }
            
            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simuler l'envoi du formulaire
            // Dans un vrai site, vous enverriez les données à un serveur
            console.log('Formulaire soumis:', {
                name,
                email,
                subject,
                message
            });
            
            // Afficher un message de succès
            alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
            
            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
    
    
    /* ============================================ */
    /* ANIMATION AU SCROLL */
    /* ============================================ */
    
    // Observer pour détecter quand les éléments entrent dans la vue
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Appliquer l'animation aux cartes
    const animatedElements = document.querySelectorAll('.step-card, .pricing-card, .advantage-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    
    /* ============================================ */
    /* GESTION DES BOUTONS D'ABONNEMENT */
    /* ============================================ */
    
    const subscribeButtons = document.querySelectorAll('.btn-subscribe');
    
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.pricing-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            
            // Simuler la sélection d'un plan
            // Dans un vrai site, cela redirigerait vers une page de paiement
            alert(`Vous avez choisi le plan "${planName}". Redirection vers la page de paiement...`);
            
            console.log('Plan sélectionné:', planName);
        });
    });
    
    
    /* ============================================ */
    /* HIGHLIGHT DE LA SECTION ACTIVE DANS LA NAVIGATION */
    /* ============================================ */
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Écouter le scroll
    window.addEventListener('scroll', highlightNavigation);
    
    
    /* ============================================ */
    /* EFFET DE PARALLAXE LÉGER SUR LE HERO */
    /* ============================================ */
    
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrollPosition < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
            }
        });
    }
    
    
    /* ============================================ */
    /* COMPTEUR ANIMÉ (optionnel - pour statistiques) */
    /* ============================================ */
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Exemple d'utilisation (à activer si vous ajoutez des statistiques)
    // const statElements = document.querySelectorAll('.stat-number');
    // statElements.forEach(stat => {
    //     const target = parseInt(stat.getAttribute('data-target'));
    //     animateCounter(stat, target, 2000);
    // });
    
    
    /* ============================================ */
    /* MENU MOBILE (HAMBURGER) */
    /* ============================================ */
    
    // Créer le bouton hamburger pour mobile
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Créer le bouton hamburger
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        hamburger.style.fontSize = '28px';
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.cursor = 'pointer';
        hamburger.style.color = '#333';
        
        // Insérer le bouton avant les liens
        nav.insertBefore(hamburger, navLinks);
        
        // Toggle menu mobile
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
        
        // Afficher/masquer le hamburger selon la taille de l'écran
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
            } else {
                hamburger.style.display = 'none';
                navLinks.classList.remove('active');
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }
    
    createMobileMenu();
    
    
    /* ============================================ */
    /* CONSOLE LOG - MESSAGE DE BIENVENUE */
    /* ============================================ */
    
    console.log('%c👶 Bienvenue sur Ti-culotté!', 'font-size: 20px; color: #E8A87C; font-weight: bold;');
    console.log('%cLocation de vêtements pour enfants - Simple, pratique et écologique', 'font-size: 14px; color: #666;');
    
});


/* ============================================ */
/* FONCTION UTILITAIRE - DEBOUNCE */
/* ============================================ */

// Fonction pour limiter le nombre d'exécutions d'une fonction
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exemple d'utilisation pour optimiser le scroll
// window.addEventListener('scroll', debounce(function() {
//     console.log('Scroll event optimisé');
// }, 100));