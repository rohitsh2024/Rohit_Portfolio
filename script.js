// ============================================
// ROHIT SHARMA – PREMIUM PORTFOLIO JS v2.0
// ============================================

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover states for interactive elements
document.querySelectorAll('a, button, .project-card, .cert-card, .achievement-card, .badge, .social-icon').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorDot.style.background = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorDot.style.background = 'var(--primary-light)';
  });
});

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger section-line animation for the hero when loaded
    document.querySelectorAll('.section-header').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 1700);
});

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const NUM_PARTICLES = 60;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < NUM_PARTICLES; i++) {
  particles.push(new Particle());
}

// Connect nearby particles
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Mouse-repel particles
let mousePX = -9999, mousePY = -9999;
document.getElementById('home').addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mousePX = e.clientX - rect.left;
  mousePY = e.clientY - rect.top;
});

// ===== NAVBAR SCROLL + ACTIVE LINK =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== NAV PILL INDICATOR =====
const navPill = document.getElementById('navPill');
function updatePill(target) {
  if (!target || !navPill) return;
  const rect = target.getBoundingClientRect();
  const parentRect = target.closest('ul').getBoundingClientRect();
  navPill.style.width = rect.width + 'px';
  navPill.style.height = rect.height + 'px';
  navPill.style.left = (rect.left - parentRect.left) + 'px';
  navPill.style.top = (rect.top - parentRect.top) + 'px';
  navPill.style.opacity = '1';
}

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => updatePill(link));
  link.addEventListener('mouseleave', () => { navPill.style.opacity = '0'; });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

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
  'Hackathon Enthusiast 🚀',
  'Tech Explorer ⚡'
];

let roleIndex = 0, charIndex = 0, isDeleting = false;
const dynamicText = document.getElementById('dynamicText');

function typeWriter() {
  const current = roles[roleIndex];
  dynamicText.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  isDeleting ? charIndex-- : charIndex++;

  let speed = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === current.length) {
    speed = 2200; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 350;
  }
  setTimeout(typeWriter, speed);
}
setTimeout(typeWriter, 2000);

// ===== SCROLL ANIMATIONS =====
const allFadeEls = document.querySelectorAll('.fade-in, .fade-left, .fade-right');
const sectionHeaders = document.querySelectorAll('.section-header');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

allFadeEls.forEach(el => observer.observe(el));

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

sectionHeaders.forEach(el => headerObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
let skillsAnimated = false;
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillFills.forEach((fill, i) => {
        setTimeout(() => fill.classList.add('animated'), i * 120);
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('h3[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statObserver.observe(aboutStats);

// ===== 3D CARD TILT =====
document.querySelectorAll('.project-card, .cert-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.15s ease, border-color 0.3s, box-shadow 0.3s';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
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
    const btn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');

    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #047857)';
      btn.style.opacity = '1';
      successMsg.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
        successMsg.classList.remove('show');
      }, 4000);
    }, 1600);
  });
}

// ===== PARALLAX ON HERO IMAGE =====
const heroSection = document.getElementById('home');
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
  heroSection.addEventListener('mousemove', e => {
    const rect = heroSection.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    heroImage.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroImage.style.transform = '';
    heroImage.style.transition = 'transform 0.6s ease';
  });
  heroSection.addEventListener('mouseenter', () => {
    heroImage.style.transition = 'transform 0.1s ease';
  });
}

// ===== BADGE HOVER RIPPLE =====
document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('click', e => {
    const ripple = document.createElement('span');
    const rect = badge.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:0; height:0;
      background:rgba(167,139,250,0.3);
      left:${e.clientX - rect.left}px;
      top:${e.clientY - rect.top}px;
      transform:translate(-50%,-50%);
      animation:rippleOut 0.5s ease forwards;
      pointer-events:none;
    `;
    badge.style.position = 'relative';
    badge.style.overflow = 'hidden';
    badge.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleOut {
    to { width:120px; height:120px; opacity:0; }
  }
`;
document.head.appendChild(style);

// ===== SECTION PROGRESS INDICATOR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position:fixed; top:0; left:0; height:2px; z-index:9999;
  background: linear-gradient(90deg, #7c3aed, #06b6d4, #ec4899);
  width:0%; transition:width 0.1s linear;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / maxScroll * 100) + '%';
});

// ===== EASTER EGG CONSOLE =====
console.log(
  '%c ██████╗  ███████╗\n' +
  '%c ██╔══██╗ ██╔════╝\n' +
  '%c ██████╔╝ ███████╗\n' +
  '%c ██╔══██╗ ╚════██║\n' +
  '%c ██║  ██║ ███████║\n' +
  '%c ╚═╝  ╚═╝ ╚══════╝',
  'color:#7c3aed', 'color:#7c3aed', 'color:#a78bfa',
  'color:#06b6d4', 'color:#06b6d4', 'color:#06b6d4'
);
console.log('%c👋 Hey Explorer! Built by Rohit Sharma',
  'color:#a78bfa; font-size:16px; font-weight:bold; padding:4px');
console.log('%c🎓 B.Tech CSE | ICFAI University | 2024–2028',
  'color:#06b6d4; font-size:12px; padding:2px');
console.log('%c💼 github.com/rohitsh2024',
  'color:#ec4899; font-size:12px; padding:2px');
