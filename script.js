// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMobile.classList.toggle('open');
});

function closeMobileNav() {
  hamburger.classList.remove('active');
  navMobile.classList.remove('open');
}

// ── PARTICLES ──
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    particlesContainer.appendChild(p);
  }
}

// ── LOGIKA HITUNG MUNDUR (COUNTDOWN) ──
function startCountdown() {
  // Atur tanggal target: 12 Agustus 2026 jam 08:00 pagi
  const targetDate = new Date("August 12, 2026 08:00:00").getTime();

  // Update setiap 1 detik
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Perhitungan waktu untuk hari, jam, menit, dan detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Masukkan hasil ke elemen HTML
    const dEl = document.getElementById("cd-days");
    const hEl = document.getElementById("cd-hours");
    const mEl = document.getElementById("cd-mins");
    const sEl = document.getElementById("cd-secs");

    if (dEl) dEl.innerText = days.toString().padStart(2, '0');
    if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
    if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
    if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');

    // Jika waktu habis
    if (distance < 0) {
      clearInterval(timer);
      const container = document.querySelector('.countdown-section');
      if (container) container.innerHTML = "<h2 style='color:var(--yellow); font-family:\"Playfair Display\", serif;'>ACARA SEDANG BERLANGSUNG!</h2>";
    }
  }, 1000);
}

function openPopup() {
  const popup = document.getElementById('openingPopup');
  if (!popup) return;
  popup.classList.add('active');
  document.body.classList.add('popup-open');
}

function closePopup() {
  const popup = document.getElementById('openingPopup');
  if (!popup) return;
  popup.classList.remove('active');
  document.body.classList.remove('popup-open');
}

// Jalankan fungsi setelah semua elemen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  openPopup();
  const closeBtn = document.getElementById('popupClose');
  const popup = document.getElementById('openingPopup');

  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }

  if (popup) {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  });
});

// ── AGENDA TABS ──
function switchTab(id, btn) {
  document.querySelectorAll('.agenda-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.agenda-tab').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// ── PORTFOLIO FILTER ──
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
      item.style.pointerEvents = 'auto';
    } else {
      item.style.opacity = '0.2';
      item.style.transform = 'scale(0.95)';
      item.style.pointerEvents = 'none';
    }
  });
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── FORM SUBMIT ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) {
    btn.textContent = '✅ Terkirim! Tim kami akan menghubungi Anda';
    btn.style.background = '#22c55e';
    btn.style.color = '#fff';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Kirim Pendaftaran →';
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      e.target.reset();
    }, 4000);
  }
}

// ── SMOOTH ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--yellow)' : '';
  });
});

// ── BACK TO TOP ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }
});
