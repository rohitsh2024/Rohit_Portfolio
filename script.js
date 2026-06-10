// ============================================
// ROHIT SHARMA – PORTFOLIO JAVASCRIPT
// ============================================

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  }, 1600);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky nav
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ===== TYPEWRITER EFFECT =====
const roles = [
  'CSE Student 👨‍💻',
  'Python Developer 🐍',
  'Web Developer 🌐',
  'Problem Solver 🔍',
  'Hackathon Participant 🚀',
  'Tech Enthusiast ⚡'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicText = document.getElementById('dynamicText');

function typeWriter() {
  const current = roles[roleIndex];
  if (isDeleting) {
    dynamicText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeWriter, speed);
}
setTimeout(typeWriter, 1800);

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    skillFills.forEach(fill => {
      fill.classList.add('animated');
    });
  }
}

// ===== FADE IN ON SCROLL =====
const fadeElements = document.querySelectorAll(
  '.skill-category, .project-card, .cert-card, .achievement-card, .timeline-item, .about-grid, .contact-grid'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

function handleScrollAnimations() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
  animateSkills();
}

window.addEventListener('scroll', handleScrollAnimations);
handleScrollAnimations(); // Run once on load

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #047857)';
      successMsg.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        successMsg.classList.remove('show');
      }, 4000);
    }, 1500);
  });
}

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
  position: fixed; pointer-events: none; z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.1s ease, top 0.1s ease;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== COUNTER ANIMATION (stats) =====
function animateCounter(el, target) {
  let count = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = count + (el.dataset.suffix || '');
    }
  }, 40);
}

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card, .cert-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * 4;
    const rotateY = ((x - midX) / midX) * -4;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== SECTION REVEAL WITH STAGGER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

console.log('%c👋 Hey there! Built by Rohit Sharma', 
  'color: #a78bfa; font-size: 16px; font-weight: bold;');
console.log('%cB.Tech CSE | ICFAI University', 
  'color: #06b6d4; font-size: 12px;');
