/* ══════════════════════════════════════
   REAPER EDUCATION — script.js
══════════════════════════════════════ */

/* ── YEAR ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── SMOOTH SCROLL ── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    scrollToSection(id);
  });
});

/* ── STICKY NAV ── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── CURRICULUM TRACKS ── */
const tracks = {
  web: [
    {
      icon: '⚛',
      name: 'React Mastery',
      level: 'Intermediate',
      desc: 'Component architecture, state management, performance profiling, and hooks deep-dive.'
    },
    {
      icon: 'JS',
      name: 'Core JavaScript',
      level: 'Beginner',
      desc: 'Event loop, closures, prototypes, async/await, and the DOM.'
    },
    {
      icon: 'TS',
      name: 'TypeScript',
      level: 'Intermediate',
      desc: 'Generics, utility types, strict configuration, and type-safe APIs.'
    }
  ],
  systems: [
    {
      icon: 'Rs',
      name: 'Systems Programming',
      level: 'Advanced',
      desc: 'Memory safety, concurrency, ownership model, and low-level system design.'
    },
    {
      icon: 'Go',
      name: 'Backend with Go',
      level: 'Advanced',
      desc: 'Goroutines, channels, microservices, REST, and gRPC architecture.'
    },
    {
      icon: '🐳',
      name: 'DevOps Foundations',
      level: 'Intermediate',
      desc: 'Containerization, CI/CD pipelines, cloud deployment, and orchestration.'
    }
  ],
  data: [
    {
      icon: 'Py',
      name: 'Python Foundations',
      level: 'Beginner',
      desc: 'Data structures, algorithms, functional patterns, and scripting.'
    },
    {
      icon: 'PG',
      name: 'Databases with PostgreSQL',
      level: 'Intermediate',
      desc: 'Query optimization, indexing, relational design, and normalization.'
    },
    {
      icon: 'GQL',
      name: 'Data APIs & GraphQL',
      level: 'Intermediate',
      desc: 'Schema design, resolvers, federation, and API integration.'
    }
  ]
};

function renderTracks(tab) {
  const container = document.getElementById('tracks-container');
  const list = tracks[tab] || [];
  container.innerHTML = '';
  list.forEach((track, i) => {
    const card = document.createElement('div');
    card.className = 'track-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="track-top">
        <div class="track-icon" style="font-family:monospace;font-weight:700;font-size:28px;color:#aaa">${track.icon}</div>
        <span class="track-level">${track.level}</span>
      </div>
      <div class="track-name">${track.name}</div>
      <div class="track-desc">${track.desc}</div>
      <div class="track-link">Enroll Free &rarr;</div>
    `;
    card.addEventListener('click', () => scrollToSection('enroll'));
    // Animate in
    card.style.opacity = '0';
    card.style.transform = 'scale(0.94)';
    container.appendChild(card);
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, i * 60);
    });
  });
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTracks(btn.dataset.tab);
  });
});

// Footer tab switching + scroll
function switchTabAndScroll(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
  renderTracks(tab);
  scrollToSection('curriculum');
}

// Initial render
renderTracks('web');

/* ── ENROLL FORM ── */
document.getElementById('enroll-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('enroll-email').value.trim();
  if (!email) return;
  this.style.display = 'none';
  const success = document.getElementById('enroll-success');
  success.classList.add('visible');
});

/* ── SCHOOL FORM ── */
document.getElementById('school-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('school-name').value.trim();
  const email = document.getElementById('school-email').value.trim();
  if (!name || !email) return;
  this.style.display = 'none';
  document.getElementById('school-success').classList.add('visible');
});
