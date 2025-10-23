// Menu hamburger
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Fermer le menu lors du clic sur un lien
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (e) => {
  if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});


// animations de la nav bar
// Animation de la navigation active
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li');
  const activeElement = document.querySelector('.active-element');
  
  function setActiveElement(element) {
    const rect = element.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    
    activeElement.style.width = rect.width + 'px';
    activeElement.style.left = (rect.left - navRect.left) + 'px';
  }
  
  // Initialiser la position au chargement
  const activeLink = document.querySelector('nav ul li.active');
  if (activeLink) {
    setActiveElement(activeLink);
  }
  
  // Animer au survol
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      setActiveElement(this);
    });
  });
  
  // Retour à l'élément actif quand on sort de la nav
  nav.addEventListener('mouseleave', function() {
    const activeLink = document.querySelector('nav ul li.active');
    if (activeLink) {
      setActiveElement(activeLink);
    }
  });
  
  // Gérer le clic pour changer l'élément actif
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
