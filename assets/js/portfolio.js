// ============================================================
// TAHA ZEESHAN — Portfolio.js
// Renders all sections dynamically from data.js
// ============================================================

/* ── UTILS ──────────────────────────────────────────────────── */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ── SCROLL OBSERVER ────────────────────────────────────────── */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

  $$('.animate').forEach(el => obs.observe(el));
}

/* ── ACTIVE NAV ─────────────────────────────────────────────── */
function initActiveNav() {
  const sections = $$('[data-section]');
  const links    = $$('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.dataset.section;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => obs.observe(s));
}

/* ── SVG ICONS ──────────────────────────────────────────────── */
const ICONS = {
  ext:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  arr:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  mail:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  li:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  gh:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`,
  dash:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  down:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`,
};

/* ── NAV ────────────────────────────────────────────────────── */
/* ── THEME TOGGLE ───────────────────────────────────────────── */
function initTheme() {
  const savedTheme = localStorage.getItem('tz-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Apply theme instantly on script parse
initTheme();

if (!window._themeListenerAdded) {
  window._themeListenerAdded = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-toggle-btn');
    if (!btn) return;
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('tz-theme', current);
  });
}

function renderNav() {
  const nav = $('#nav');
  if (!nav) return;
  nav.innerHTML = `
    <a class="nav-logo" href="#hero">TAHA Z.</a>
    <nav class="nav-pill" aria-label="Site navigation">
      <a class="nav-link" href="#experience">Work</a>
      <a class="nav-link" href="#projects">Projects</a>
      <a class="nav-link" href="#research">Research</a>
      <a class="nav-link" href="#writing">Writing</a>
      <a class="nav-link" href="#about">About</a>
    </nav>
    <div class="nav-actions" style="display:flex; align-items:center; gap:8px; pointer-events:all;">
      <a class="nav-cv-btn" href="images/TahaZeeshan_CV.pdf" target="_blank" rel="noopener" download="TahaZeeshan_CV.pdf" title="Download CV (PDF)">
        <span>Download CV</span>
      </a>
      <a class="nav-dashboard" href="dashboard.html">
        Dashboard ${ICONS.ext}
      </a>
      <button id="theme-toggle-btn" class="nav-theme-toggle" aria-label="Toggle theme" title="Switch Dark/Light Theme">
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      <button id="mobile-nav-toggle" class="nav-hamburger" aria-label="Toggle Navigation Menu" aria-expanded="false">
        <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Drawer Overlay -->
    <div id="mobile-nav-drawer" class="mobile-nav-drawer" aria-hidden="true">
      <div class="mobile-nav-backdrop"></div>
      <div class="mobile-nav-content">
        <nav class="mobile-nav-links">
          <a class="mobile-nav-link" href="#experience">Work</a>
          <a class="mobile-nav-link" href="#projects">Projects</a>
          <a class="mobile-nav-link" href="#research">Research</a>
          <a class="mobile-nav-link" href="#writing">Writing</a>
          <a class="mobile-nav-link" href="#about">About</a>
          <a class="mobile-nav-link" href="#certifications">Certifications</a>
          <a class="mobile-nav-link" href="#contact">Contact</a>
        </nav>
        <div class="mobile-nav-footer">
          <a class="mobile-nav-btn mobile-cv-btn" href="images/TahaZeeshan_CV.pdf" target="_blank" rel="noopener" download="TahaZeeshan_CV.pdf">
            <span>📄 Download CV (PDF)</span>
          </a>
          <a class="mobile-nav-btn mobile-dash-btn" href="dashboard.html">
            <span>📊 Analytics Dashboard ↗</span>
          </a>
        </div>
      </div>
    </div>
  `;
  initTheme();
  initMobileNav();
}

function initMobileNav() {
  const toggleBtn = $('#mobile-nav-toggle');
  const drawer = $('#mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  const backdrop = drawer.querySelector('.mobile-nav-backdrop');
  const hamburgerIcon = toggleBtn.querySelector('.hamburger-icon');
  const closeIcon = toggleBtn.querySelector('.close-icon');
  const links = drawer.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (hamburgerIcon) hamburgerIcon.style.display = 'none';
    if (closeIcon) closeIcon.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (hamburgerIcon) hamburgerIcon.style.display = 'block';
    if (closeIcon) closeIcon.style.display = 'none';
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('active')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}


/* ── HERO ───────────────────────────────────────────────────── */
function renderHero() {
  const el = $('#hero-content');
  if (!el) return;
  const p = DATA.profile;
  el.innerHTML = `
    <div class="hero-layout-grid">
      <div class="hero-text-col">
        <div class="hero-eyebrow animate ad1">
          <span class="hero-eyebrow-pill">
            <span class="hero-eyebrow-dot"></span>
            Autonomous Systems · Computer Vision · Software Engineering
          </span>
        </div>
        <h1 class="hero-name animate ad2">
          Hi, I'm <span class="text-gradient-shimmer">${p.name}</span>
        </h1>
        <p class="hero-statement animate ad3">
          Software Engineer specializing in <strong>Autonomous Systems & Computer Vision</strong> — from ROS2 navigation pipelines for Mars Rovers to YOLOv8 models for real-time edge monitoring.
        </p>
        <div class="hero-meta animate ad4">
          <div class="status-badge">
            <span class="status-dot"></span>
            ${p.statusLabel}
          </div>
          <div class="location-badge">📍 ${p.location}</div>
        </div>
        <div class="hero-actions animate ad5">
          <a class="hero-cv-btn" href="images/TahaZeeshan_CV.pdf" target="_blank" rel="noopener" download="TahaZeeshan_CV.pdf">
            <span>Download CV</span>
          </a>
          <a class="hero-contact-btn" href="#contact">
            <span>Get in Touch</span>
          </a>
        </div>
      </div>

      <div class="hero-character-col animate ad2">
        <div class="interactive-chroma-card" id="hero-interactive-character" role="button" tabindex="0" aria-label="Interactive Taha Character — Click or hover to interact">
          <div class="character-speech-bubble" id="char-speech-bubble">Hi, I'm Taha! 👋</div>
          <div class="chroma-standing-frame">
            <!-- Hidden native video element (no loop attribute - holds pose on finish) -->
            <video id="hero-chroma-video" src="assets/images/hero_walk_greenscreen.mp4" autoplay muted playsinline crossorigin="anonymous" style="display:none;"></video>
            <!-- Real-time Chroma Key Canvas rendering transparent character without green screen background -->
            <canvas id="hero-chroma-canvas" class="chroma-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;

  initChromaKeyCharacter();

  // Trigger hero animations
  requestAnimationFrame(() => {
    setTimeout(() => {
      $$('#hero-content .animate').forEach(e => e.classList.add('visible'));
    }, 120);
  });
}

/* Real-Time Ultra-Smooth Anti-Aliased Chroma Key Character Logic */
function initChromaKeyCharacter() {
  const card = $('#hero-interactive-character');
  const speech = $('#char-speech-bubble');
  const video = $('#hero-chroma-video');
  const canvas = $('#hero-chroma-canvas');
  if (!card || !video || !canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  video.loop = false; // Hold final pose when animation completes!
  video.muted = true;
  video.play().catch(() => {});

  let animFrameId = null;

  function processChromaFrame() {
    if (video.videoWidth > 0) {
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.drawImage(video, 0, 0, w, h);
      const frame = ctx.getImageData(0, 0, w, h);
      const data = frame.data;
      const len = data.length;

      // Ultra-smooth high-precision green screen removal & green despill
      for (let i = 0; i < len; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green Screen Key Color distance & difference
        const maxRB = Math.max(r, b);
        const gDiff = g - maxRB;

        if (gDiff > 10 && g > 75) {
          // Smoothstep alpha matte calculation for anti-aliased 3D edges
          const alphaVal = 1.0 - Math.min(Math.max((gDiff - 10.0) / 32.0, 0.0), 1.0);
          data[i + 3] = Math.floor(alphaVal * 255);

          // Green Spill Suppression to eliminate green outline & produce clean 3D look
          if (g > maxRB) {
            data[i + 1] = Math.floor(maxRB + (g - maxRB) * alphaVal);
          }
        }
      }

      ctx.putImageData(frame, 0, 0);
    }

    animFrameId = requestAnimationFrame(processChromaFrame);
  }

  animFrameId = requestAnimationFrame(processChromaFrame);

  const quotes = [
    "Hi, I'm Taha! 👋",
    "Welcome to my portfolio! ✨",
    "Building Autonomous & Vision AI 🤖",
    "ROS2 & Edge ML Engineer 🚀",
    "Wink! 😉"
  ];
  let quoteIndex = 0;

  function playAnimation() {
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }

  // Hover triggers animation replay & card scale
  card.addEventListener('mouseenter', () => {
    card.classList.add('is-hovered');
    playAnimation();
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-hovered');
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  });

  // Parallax 3D tilt on mouse move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`;
  });

  // Click handler: play animation, cycle quotes, trigger pop bounce
  card.addEventListener('click', () => {
    playAnimation();
    quoteIndex = (quoteIndex + 1) % quotes.length;
    if (speech) {
      speech.textContent = quotes[quoteIndex];
      speech.classList.remove('pop-anim');
      void speech.offsetWidth;
      speech.classList.add('pop-anim');
    }

    card.classList.remove('card-click-anim');
    void card.offsetWidth;
    card.classList.add('card-click-anim');
    setTimeout(() => {
      card.classList.remove('card-click-anim');
    }, 450);
  });

  // Keyboard accessibility
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
}

/* ── ABOUT (Screen Shade Bento Grid with Portfolio Summary & Hobbies) ── */
function renderAbout() {
  const el = $('#about-content');
  if (!el) return;
  const p = DATA.profile;

  el.innerHTML = `
    <div class="geo-bento-wrapper">

      <!-- TOP ROW: Executive Portfolio Summary & Highlights -->
      <div class="geo-bento-row geo-top-row">

        <!-- Card 1: Executive Summary -->
        <div class="geo-card geo-card-name tilt-card animate">
          <div class="geo-card-shine"></div>
          <div class="geo-card-inner">
            <span class="geo-eyebrow">PORTFOLIO SUMMARY</span>
            <h2 class="geo-name-title" style="font-size: 1.5rem; margin-bottom: 10px;">COMPUTER ENGINEERING & AI/ML</h2>
            <p class="geo-body-text" style="font-size: 0.88rem; line-height: 1.6; margin-bottom: 14px;">
              B.S. Software Engineering student at <strong>Hochschule Heilbronn (HHN), Germany</strong> (Erasmus+ Exchange) and <strong>Türkiye Bursları Full Scholar</strong>. Specialized in <strong>Computer Vision, Deep Learning, and Autonomous Robotics</strong>.
            </p>
            <div class="geo-pill-row">
              <span class="geo-badge-pill">📍 Heilbronn, DE</span>
              <span class="geo-badge-pill accent-pill">YTB Scholar 🏆</span>
              <span class="geo-badge-pill">Erasmus+ Exchange</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Core Portfolio Highlights Stack -->
        <div class="geo-card geo-card-carousel tilt-card animate ad1">
          <div class="geo-card-header">
            <span class="geo-header-lbl">CAREER & MILESTONES</span>
            <span class="geo-hover-hint">Key Accomplishments</span>
          </div>

          <div class="geo-stack-container">
            
            <div class="geo-stack-card item-1">
              <div class="geo-stack-hdr">
                <span class="geo-stack-title">AI WEARABLE — ITECH</span>
                <span class="geo-chip-award">3rd Place Winner 🏆</span>
              </div>
              <p class="geo-stack-desc">Engineered iGlasses AI smart wearable with PyTorch & INT8 quantization for blind obstacle detection.</p>
            </div>

            <div class="geo-stack-card item-2">
              <div class="geo-stack-hdr">
                <span class="geo-stack-title">MARS ROVER — ULUROVER</span>
                <span class="geo-chip-award">ARC Finalist</span>
              </div>
              <p class="geo-stack-desc">Led autonomous navigation with ORB-SLAM3 visual odometry & ROS2 sensor fusion.</p>
            </div>

            <div class="geo-stack-card item-3">
              <div class="geo-stack-hdr">
                <span class="geo-stack-title">ENGINEERING INTERNSHIPS</span>
                <span class="geo-chip-award">ProcessTurk & BVCS</span>
              </div>
              <p class="geo-stack-desc">Engineered AI lead ingestion & NLP/LLMs at BVCS, and Paandaa n8n/OCR document automation engines at ProcessTurk.</p>
            </div>

          </div>
        </div>

      </div>

      <!-- MAIN 3-COLUMN ROW: Hobbies & Passions, Team Photo, Craft & Tech Stack -->
      <div class="geo-bento-row geo-main-row">

        <!-- Card 3: Personal Hobbies & Creative Life -->
        <div class="geo-card geo-card-mindset tilt-card animate ad1">
          <div class="geo-card-inner">
            <div class="geo-heading-group">
              <h2 class="geo-card-title">Hobbies & Creative Life</h2>
              <div class="geo-title-accent-bar"></div>
            </div>

            <p class="geo-body-text" style="margin-bottom: 14px;">
              <strong>Beyond engineering.</strong> Staying active, capturing stories, and pursuing creative passions drive my discipline and focus.
            </p>

            <!-- Hobbies Tags & Highlights Grid -->
            <div class="geo-tech-grid" style="margin-bottom: 16px;">
              <span class="geo-tech-tag" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-color: rgba(59, 130, 246, 0.25);">⚽ FOOTBALL</span>
              <span class="geo-tech-tag" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.25);">✈️ TRAVEL</span>
              <span class="geo-tech-tag" style="background: rgba(168, 85, 247, 0.1); color: #a855f7; border-color: rgba(168, 85, 247, 0.25);">🎬 VIDEO EDITING</span>
              <span class="geo-tech-tag" style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; border-color: rgba(79, 70, 229, 0.25);">📹 VLOGGING</span>
              <span class="geo-tech-tag" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-color: rgba(245, 158, 11, 0.25);">🥊 KICKBOXING</span>
              <span class="geo-tech-tag" style="background: rgba(99, 102, 241, 0.1); color: #6366f1; border-color: rgba(99, 102, 241, 0.25);">♟️ CHESS</span>
            </div>

            <p class="geo-footer-quote">
              <em>"Creative storytelling & physical discipline keep the mind sharp."</em>
            </p>
          </div>
        </div>

        <!-- CENTER COLUMN: Personal Portrait & Location Radar -->
        <div class="geo-center-col">
          
          <!-- Card 4: Personal Portrait -->
          <div class="geo-card geo-card-team tilt-card animate ad2">
            <div class="geo-photo-overlay">
              <span class="geo-photo-tag">TAHA ZEESHAN</span>
            </div>
            <img src="assets/images/about_portrait.jpg" alt="${p.name}" class="geo-team-img" style="object-fit: cover; object-position: center 20%;"
                 onerror="this.src='assets/images/portrait_headshot.png'">
          </div>

          <!-- Card 5: Geographic Location Radar -->
          <div class="geo-card geo-card-location tilt-card animate ad3">
            <div class="geo-radar-line-anim"></div>
            <div class="geo-loc-content">
              <div class="geo-loc-badge">CURRENT LOCATION</div>
              <h3 class="geo-loc-city">HEILBRONN, GERMANY</h3>
              <div class="geo-loc-coords">49.1427° N, 9.2109° E</div>
              <div class="geo-loc-gmt">- Central European Time (CET)</div>
            </div>
          </div>

        </div>

        <!-- Card 6: Craft & Tech Stack Summary -->
        <div class="geo-card geo-card-craft tilt-card animate ad2">
          <div class="geo-card-shine"></div>
          <div class="geo-card-inner">
            <div class="geo-heading-group">
              <h2 class="geo-card-title">Craft & Stack</h2>
              <div class="geo-title-accent-bar green-bar"></div>
            </div>

            <p class="geo-body-text" style="margin-bottom: 12px;">
              <strong>Engineering real-world AI systems.</strong> Bridging deep neural networks with edge deployment hardware.
            </p>

            <div class="geo-status-indicator" style="margin-bottom: 14px;">
              <span class="geo-status-pulse"></span>
              <span class="geo-status-text">Open to AI & Engineering Roles</span>
            </div>

            <!-- Tech Stack Horizontal Marquee Scroll WITH REAL LOGOS at the END of card -->
            <div class="skills-marquee-container" style="margin-top: auto;">
              <div class="skills-marquee-track">
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="tech-icon-img"> Python</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" class="tech-icon-img"> PyTorch</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg" alt="ROS2" class="tech-icon-img"> ROS2 / ROS</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" class="tech-icon-img"> OpenCV</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" class="tech-icon-img"> C++</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" class="tech-icon-img"> C#</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" class="tech-icon-img"> JavaScript</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" class="tech-icon-img"> TensorFlow</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" class="tech-icon-img"> Docker</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" class="tech-icon-img"> Linux</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" class="tech-icon-img"> Git</span>

                <!-- Duplicate set for seamless continuous marquee loop -->
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="tech-icon-img"> Python</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" class="tech-icon-img"> PyTorch</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg" alt="ROS2" class="tech-icon-img"> ROS2 / ROS</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" class="tech-icon-img"> OpenCV</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" class="tech-icon-img"> C++</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" class="tech-icon-img"> C#</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" class="tech-icon-img"> JavaScript</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" class="tech-icon-img"> TensorFlow</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" class="tech-icon-img"> Docker</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" class="tech-icon-img"> Linux</span>
                <span class="skill-scroll-chip"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" class="tech-icon-img"> Git</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  // Attach 3D Cursor Tilt Interaction
  init3dCardTilt();
}

/* ── 3D ROTATABLE TECH FOOTBALL SPHERE CANVAS ─────────────────── */
function init3dTechFootball() {
  const canvas = document.getElementById('tech-football-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 280;
  let height = canvas.height = 200;

  const techList = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'ROS2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
    { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
    { name: 'JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'YOLOv8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
  ];

  const nodes = [];
  const N = techList.length;
  const radius = Math.min(width, height) * 0.38;

  // Fibonacci spiral distribution over 3D sphere surface
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < N; i++) {
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / N);

    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = techList[i].icon;

    nodes.push({
      name: techList[i].name,
      img: img,
      x: x * radius,
      y: y * radius,
      z: z * radius
    });
  }

  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velX = 0.005;
  let velY = 0.007;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      canvas.style.cursor = 'grab';
    }
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMouseX;
    const dy = e.touches[0].clientY - prevMouseY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  function rotateX(node, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = node.y * cos - node.z * sin;
    const z = node.y * sin + node.z * cos;
    node.y = y;
    node.z = z;
  }

  function rotateY(node, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = node.x * cos + node.z * sin;
    const z = -node.x * sin + node.z * cos;
    node.x = x;
    node.z = z;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;

    if (!isDragging) {
      velX *= 0.98;
      velY *= 0.98;
      if (Math.abs(velX) < 0.002) velX = 0.003;
      if (Math.abs(velY) < 0.002) velY = 0.004;
    }

    nodes.forEach(n => {
      rotateX(n, velX);
      rotateY(n, velY);
    });

    // Draw football wireframe geodesic connecting lines between adjacent 3D vertices
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.15) {
          const avgZ = (nodes[i].z + nodes[j].z) / (2 * radius);
          const alpha = Math.max(0.05, (avgZ + 1) / 2 * 0.35);
          ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(cx + nodes[i].x, cy + nodes[i].y);
          ctx.lineTo(cx + nodes[j].x, cy + nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Sort nodes by Z depth for 3D perspective ordering
    const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

    // Draw 3D Tech Logo Badges over Football
    sortedNodes.forEach(n => {
      const scale = (n.z + radius * 1.5) / (radius * 2.5);
      const alpha = Math.max(0.25, (n.z + radius) / (radius * 2));
      const size = Math.max(16, 28 * scale);

      const px = cx + n.x;
      const py = cy + n.y;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Pentagon / Circle football patch background for tech logo
      ctx.beginPath();
      ctx.arc(px, py, size / 1.5, 0, Math.PI * 2);
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(14, 14, 22, 0.9)' : 'rgba(255, 255, 255, 0.95)';
      ctx.fill();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = `rgba(124, 58, 237, ${alpha * 0.7})`;
      ctx.stroke();

      // Render Devicon Logo Image
      if (n.img.complete && n.img.naturalWidth !== 0) {
        ctx.drawImage(n.img, px - size / 2, py - size / 2, size, size);
      } else {
        ctx.fillStyle = '#C084FC';
        ctx.font = '700 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.name.substring(0, 3), px, py + 3);
      }

      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* 3D Cursor Tilt Effect Handler */
function init3dCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg)';
    });
  });
}

/* ── TAB SWITCHING LOGIC ────────────────────────────────────── */
window.switchBentoTab = function(tabName) {
  const card = document.querySelector('.tangram-bottom-left');
  if (!card) return;
  card.querySelectorAll('.bento-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${tabName}'`));
  });
  card.querySelectorAll('.bento-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `bento-tab-${tabName}`);
  });
};

/* ── EXPERIENCE (Interactive Horizon Spotlight Rail) ── */
function renderExperience() {
  const el = $('#experience-content');
  if (!el) return;

  const imagesMap = {
    'processturk': 'images/processturk-favicon.svg',
    'bvcs': 'images/bvcscert-logo.jpg'
  };

  const metricsMap = {
    'processturk': 'Process Automation & Telemetry',
    'bvcs': 'Software QA & Vision Verification'
  };

  el.innerHTML = `
    <div class="exp-spotlight-rail">
      ${DATA.experience.map((e, idx) => `
        <div class="exp-spotlight-item animate ad${idx + 1}">
          
          <!-- LEFT: SHOWCASE PANEL -->
          <div class="exp-spotlight-logo-panel">
            <div class="exp-spotlight-logo-wrap">
              <img src="${e.image || imagesMap[e.id]}" alt="${e.org}"
                   onerror="this.src='assets/images/portrait_headshot.png'">
            </div>
            <h3 class="exp-spotlight-org">${e.org}</h3>
            <div class="exp-spotlight-meta">
              <span>📍 ${e.location}</span>
              <span>${e.type}</span>
            </div>
            <span class="exp-spotlight-chip">${metricsMap[e.id] || 'Field Deployed'}</span>
            ${e.website ? `
              <a class="exp-website-link-btn" href="${e.website}" target="_blank" rel="noopener noreferrer" title="Visit ${e.websiteLabel || e.website}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>${e.websiteLabel || 'Website'} ↗</span>
              </a>
            ` : ''}
          </div>

          <!-- RIGHT: DETAILS PANEL -->
          <div class="exp-spotlight-details-panel">
            <div class="exp-spotlight-hdr">
              <h2 class="exp-spotlight-role">${e.role}</h2>
              <span class="exp-spotlight-dates">${e.dates}</span>
            </div>

            <p class="exp-spotlight-desc">${e.description}</p>

            <!-- ACHIEVEMENTS LIST -->
            <div class="exp-spotlight-bullets">
              ${e.achievements.map(ach => `
                <div class="exp-spotlight-bullet-row">
                  <span class="exp-spotlight-bullet-icon">✦</span>
                  <span class="exp-spotlight-bullet-txt">${ach}</span>
                </div>
              `).join('')}
            </div>

            <!-- TECH STACK TAGS & MODAL BUTTON -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 14px;">
              <div class="exp-spotlight-tags">
                ${e.technologies.map(t => `
                  <span class="exp-spotlight-tag">${t}</span>
                `).join('')}
              </div>

              <button class="exp-contrib-btn" onclick="openContributionsModal('${e.id}')">
                <span>⚡ Technical Breakdown & Impact</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

          </div>

        </div>
      `).join('')}
    </div>
  `;

  if (!$('#contrib-modal-backdrop')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="contrib-modal-backdrop" class="contrib-modal-backdrop" onclick="closeContributionsModal(event)">
        <div class="contrib-modal-container" onclick="event.stopPropagation()">
          <button class="contrib-close-btn" onclick="closeContributionsModal(event)">&times;</button>
          <div id="contrib-modal-body"></div>
        </div>
      </div>
    `);
  }
}

/* Contributions Modal Handler */
window.openContributionsModal = function(expId) {
  const exp = DATA.experience.find(item => item.id === expId);
  if (!exp) return;

  const modalBody = $('#contrib-modal-body');
  const backdrop = $('#contrib-modal-backdrop');
  if (!modalBody || !backdrop) return;

  modalBody.innerHTML = `
    <div class="contrib-hdr">
      <span class="contrib-org-pill">${exp.org}</span>
      <h2 class="contrib-title">${exp.role}</h2>
      <div class="contrib-meta font-mono">📍 ${exp.location} · ${exp.dates}</div>
    </div>

    <div class="contrib-section">
      <h3 class="contrib-sec-title">🎯 Core Technical Contributions</h3>
      <div class="contrib-grid">
        ${exp.achievements.map(ach => `
          <div class="contrib-card">
            <div class="contrib-card-icon">⚡</div>
            <div class="contrib-card-txt">${ach}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="contrib-section">
      <h3 class="contrib-sec-title">🛠️ Technologies & Infrastructure Built</h3>
      <div class="contrib-tech-row">
        ${exp.technologies.map(t => `<span class="contrib-tech-chip">${t}</span>`).join('')}
      </div>
    </div>
  `;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeContributionsModal = function(e) {
  const backdrop = $('#contrib-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* Slower Multi-Stage Scroll Reveal Observer */
function initSlowExpScroll() {
  const items = document.querySelectorAll('.exp-slow-step');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stage 1: Card comes upwards slowly
        entry.target.classList.add('entering');

        // Stage 2: On stop, shift image left & slide in floating text slowly
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, 250);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px'
  });

  items.forEach(item => observer.observe(item));
}

/* ── PROJECTS ───────────────────────────────────────────────── */
/* ── PROJECTS (Vibrant Unique Themes + GitHub & Website Links + 3D Tilt) ── */
function renderProjects() {
  const el = $('#projects-content');
  if (!el) return;

  const statusMap = {
    completed: 'proj-badge-completed',
    active:    'proj-badge-active',
    paused:    'proj-badge-paused',
  };

  const themeMap = {
    'iglasses':          'theme-violet',
    'ulurover':          'theme-emerald',
    'tarimtek':          'theme-amber',
    'anomaly-detection': 'theme-cyan',
    'ros2-nav2':         'theme-cobalt'
  };

  const leadMetric = {
    'iglasses':          { val: '97.3%', lbl: 'Recall' },
    'ulurover':          { val: '<2.5%', lbl: 'Drift' },
    'tarimtek':          { val: '91.4%', lbl: 'mAP@0.5' },
    'anomaly-detection': { val: '0.923', lbl: 'AUROC' },
    'ros2-nav2':         { val: '1.5 m/s', lbl: 'Speed' },
  };

  el.innerHTML = `
    <div class="projects-grid-vibrant">
      ${DATA.projects.map((pr, i) => {
        const metric = leadMetric[pr.id];
        const badgeCls = statusMap[pr.status] || 'proj-badge-paused';
        const isFeatured = pr.id === 'iglasses' || i === 0;
        const cardCls = isFeatured ? 'proj-v-card proj-featured' : 'proj-v-card';
        const githubUrl = pr.github || 'https://github.com/Tahazee';
        const websiteUrl = pr.website || pr.demo;

        return `
          <div class="${cardCls} tilt-card animate" style="transition-delay:${(i % 2) * 0.08}s">
            <div class="proj-v-shine"></div>

            <div class="proj-v-header">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="proj-v-cat font-mono">${pr.category}</span>
                ${isFeatured ? `<span class="proj-featured-badge font-mono">★ FEATURED AI</span>` : ''}
              </div>
              <span class="proj-v-badge ${badgeCls}">${pr.status}</span>
            </div>

            <div class="proj-v-body">
              <h3 class="proj-v-title">${pr.title}</h3>

              
              ${metric ? `
                <div class="proj-v-metric">
                  <span class="proj-v-metric-val">${metric.val}</span>
                  <span class="proj-v-metric-lbl">${metric.lbl}</span>
                </div>` : ''}

              <p class="proj-v-desc">${pr.description}</p>
            </div>

            <!-- TECH TAGS ROW -->
            <div class="proj-v-tags-row">
              ${pr.technologies.slice(0, 4).map(t => `<span class="proj-v-chip">${t}</span>`).join('')}
            </div>

            <!-- ACTION BUTTONS ROW: GITHUB, WEBSITE, LINKEDIN & DETAILS -->
            <div class="proj-v-actions">
              <a href="${githubUrl}" target="_blank" rel="noopener" class="proj-v-btn btn-github" title="View Source on GitHub">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>

              ${pr.linkedinPost ? `
                <a href="${pr.linkedinPost}" target="_blank" rel="noopener" class="proj-v-btn btn-linkedin" title="View Official LinkedIn Post & Proof">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                  </svg>
                  <span>LinkedIn Post</span>
                </a>
              ` : ''}

              ${websiteUrl ? `
                <a href="${websiteUrl}" target="_blank" rel="noopener" class="proj-v-btn btn-website" title="Visit Official Website">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span>Website</span>
                </a>
              ` : ''}

              <a href="projects/${pr.id}/" class="proj-v-btn btn-details" title="View Full Project Case Study">
                <span>Details →</span>
              </a>
            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach 3D Cursor Tilt
  init3dCardTilt();
}

/* ── RESEARCH ───────────────────────────────────────────────── */
function renderResearch() {
  const el = $('#research-content');
  if (!el) return;

  const statusColor = { active: '#16a34a', completed: '#6366f1' };

  el.innerHTML = `
    <div class="research-grid">
      ${DATA.research.map((r, i) => `
        <div class="research-card animate" style="transition-delay:${i * 0.1}s">
          <div class="research-num" style="color:${statusColor[r.status] || '#ABABB2'}">
            <span class="research-sdot" style="background:${statusColor[r.status] || '#ABABB2'}"></span>
            ${r.number}
          </div>
          <div class="research-title">${r.title}</div>
          <div class="research-body">${r.approach.slice(0, 130)}…</div>
          <div class="research-tags">
            <span class="research-tag">${r.category}</span>
            <span class="research-tag">${r.dataset}</span>
            <span class="research-tag">${r.status}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="questions-box animate">
      <div class="questions-lbl">Questions I'm exploring</div>
      ${[
        'How can unsupervised anomaly detection models generalize across manufacturing conditions without domain-specific retraining?',
        'What is the practical accuracy-latency frontier for quantized vision models on Jetson hardware at the edge?',
        'How does visual SLAM degrade in featureless environments, and what fusion strategies maintain robust localization?',
      ].map((q, i) => `
        <div class="question-row">
          <span class="question-n">0${i + 1}</span>
          <p class="question-t">${q}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/* ── EDUCATION (With Curved Silhouette Cards) ─────────────────────── */
function renderEducation() {
  const el = $('#education-content');
  if (!el) return;

  const badges = ['edu-badge-blue', 'edu-badge-blue', 'edu-badge-gold'];
  const curveClasses = ['edu-card-curved-1', 'edu-card-curved-2', 'edu-card-curved-3'];

  el.innerHTML = `
    <div class="education-grid">
      ${DATA.education.map((e, i) => `
        <div class="edu-card ${curveClasses[i] || ''} animate" style="transition-delay:${i * 0.1}s">
          <div class="edu-institution">${e.institution}</div>
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-meta">
            <div class="edu-meta-row">📍 ${e.location}</div>
            <div class="edu-meta-row">📅 ${e.dates}</div>
          </div>
          ${e.note ? `<span class="edu-badge ${badges[i]}">${e.note}</span>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

/* ── ACHIEVEMENTS & HONOURS (With Image Cards & Full Details) ── */
function renderAchievements() {
  const el = $('#achievements-content');
  if (!el) return;

  const items = DATA.achievements || [];

  el.innerHTML = `
    <!-- NUMERICAL SUMMARY METRICS -->
    <div class="achievements-numbers" style="margin-bottom: 36px;">
      ${[
        { n: '3rd',   l: 'Place · Youth Tech Innovators 2025' },
        { n: '30k ₺', l: 'Prize Won at National Competition' },
        { n: '250k ₺',l: 'Corporate Sponsorship Secured' },
        { n: 'Top 3', l: 'ARC National Robotics Competition' },
      ].map((a, i) => `
        <div class="ach-num-card animate" style="transition-delay:${i * 0.08}s">
          <div class="ach-number">${a.n}</div>
          <div class="ach-label">${a.l}</div>
        </div>
      `).join('')}
    </div>

    <!-- HONOURS & AWARDS IMAGE CARDS GRID -->
    <div class="honours-cards-grid">
      ${items.map((ach, idx) => {
        const itemLink = ach.link || ach.linkedinPost || 'https://www.linkedin.com/in/tahazeeshan12';
        const isInstagram = ach.platform === 'instagram' || itemLink.includes('instagram.com');
        const isWebsite = ach.platform === 'website' || (!itemLink.includes('linkedin.com') && !itemLink.includes('instagram.com'));
        
        let iconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.77a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/></svg>`;
        let labelTxt = 'LinkedIn Post ↗';
        let btnTxt = 'View LinkedIn 🔗';

        if (isInstagram) {
          iconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
          labelTxt = 'Instagram Post ↗';
          btnTxt = 'View Instagram 🔗';
        } else if (isWebsite) {
          iconSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
          labelTxt = 'Official Website ↗';
          btnTxt = 'Visit Website 🌐';
        }

        return `
          <div class="honour-img-card tilt-card animate" style="transition-delay:${idx * 0.1}s">
            <a href="${itemLink}" target="_blank" rel="noopener" class="honour-card-media" title="Open Link">
              <img src="${ach.image}" alt="${ach.title}" class="honour-card-img"
                   onerror="this.src='assets/images/portrait_headshot.png'">
              <div class="honour-media-scrim"></div>
              <span class="honour-year-pill font-mono">${ach.year}</span>
              <span class="honour-award-pill font-mono">${ach.award}</span>

              <span class="honour-img-linkedin-badge font-mono" style="${isInstagram ? 'background:linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);' : isWebsite ? 'background:#059669;' : ''}">
                ${iconSvg}
                <span>${labelTxt}</span>
              </span>
            </a>

            <div class="honour-card-info">
              <span class="honour-org-lbl font-mono">${ach.organization}</span>
              <h3 class="honour-card-title">${ach.title}</h3>
              <p class="honour-card-desc">${ach.description}</p>
              
              <div class="honour-tags-row">
                ${ach.tags.map(t => `<span class="honour-tag-chip">${t}</span>`).join('')}
              </div>

              <div class="honour-card-footer">
                <a href="${itemLink}" target="_blank" rel="noopener" class="honour-linkedin-btn font-mono" style="${isInstagram ? 'border-color:#e6683c; color:#dc2743;' : isWebsite ? 'border-color:#059669; color:#059669;' : ''}">
                  ${iconSvg}
                  <span>${btnTxt}</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  init3dCardTilt();
}

/* ── PURE FLOATING 3D TECH FOOTBALL SPHERE ─────────────────────── */
function renderTechFootball() {
  const el = $('#tech-football-content');
  if (!el) return;

  el.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; padding: 20px 0;">
      <canvas id="tech-football-canvas" width="560" height="460" style="cursor: grab; display: block; touch-action: none; margin: 0 auto; background: transparent;"></canvas>
    </div>
  `;

  requestAnimationFrame(init3dTechFootball);
}

/* ── 3D REALISTIC FOOTBALL GEOMETRY & RENDERER ───────────────── */
function init3dTechFootball() {
  const canvas = document.getElementById('tech-football-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function getCanvasBounds() {
    const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const w = Math.min(parentW, 540);
    const h = w < 420 ? 340 : 440;
    return { w, h };
  }

  let bounds = getCanvasBounds();
  let width = canvas.width = bounds.w;
  let height = canvas.height = bounds.h;

  const techList = [
    { name: 'Python', short: 'PY', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'PyTorch', short: 'TORCH', color: '#EE4C2C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' },
    { name: 'ROS2', short: 'ROS', color: '#222222', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ros/ros-original.svg' },
    { name: 'OpenCV', short: 'CV', color: '#5C3EE8', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg' },
    { name: 'C++', short: 'C++', color: '#00599C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { name: 'C#', short: 'C#', color: '#239120', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
    { name: 'JavaScript', short: 'JS', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TensorFlow', short: 'TF', color: '#FF6F00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Docker', short: 'DOC', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Linux', short: 'LNX', color: '#FCC624', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    { name: 'Git', short: 'GIT', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'YOLOv8', short: 'YOLO', color: '#00FFFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'n8n', short: 'N8N', color: '#FF6D5A', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'PostgreSQL', short: 'SQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' }
  ];

  const nodes = [];
  const N = techList.length;
  let radius = Math.min(width, height) * 0.36;

  // Fibonacci golden ratio distribution over 3D sphere
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < N; i++) {
    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / N);

    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);

    const img = new Image();
    img.src = techList[i].icon;

    nodes.push({
      name: techList[i].name,
      short: techList[i].short,
      color: techList[i].color,
      img: img,
      x: x * radius,
      y: y * radius,
      z: z * radius,
      isPentagon: i % 3 === 0
    });
  }

  window.addEventListener('resize', () => {
    const b = getCanvasBounds();
    width = canvas.width = b.w;
    height = canvas.height = b.h;
    const oldRadius = radius;
    radius = Math.min(width, height) * 0.36;
    if (oldRadius > 0) {
      const scale = radius / oldRadius;
      nodes.forEach(n => {
        n.x *= scale;
        n.y *= scale;
        n.z *= scale;
      });
    }
  }, { passive: true });


  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let velX = 0.006;
  let velY = 0.008;

  let mouseCanvasX = -1000;
  let mouseCanvasY = -1000;
  let hoveredNode = null;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseCanvasX = e.clientX - rect.left;
    mouseCanvasY = e.clientY - rect.top;

    if (isDragging) {
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      velY = dx * 0.005;
      velX = dy * 0.005;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    }
  });

  canvas.addEventListener('mouseleave', () => {
    mouseCanvasX = -1000;
    mouseCanvasY = -1000;
    hoveredNode = null;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      canvas.style.cursor = 'grab';
    }
  });

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      const rect = canvas.getBoundingClientRect();
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
      mouseCanvasX = prevMouseX - rect.left;
      mouseCanvasY = prevMouseY - rect.top;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const rect = canvas.getBoundingClientRect();
    const dx = e.touches[0].clientX - prevMouseX;
    const dy = e.touches[0].clientY - prevMouseY;
    velY = dx * 0.005;
    velX = dy * 0.005;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
    mouseCanvasX = prevMouseX - rect.left;
    mouseCanvasY = prevMouseY - rect.top;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
    hoveredNode = null;
  });

  function rotateX(node, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = node.y * cos - node.z * sin;
    const z = node.y * sin + node.z * cos;
    node.y = y;
    node.z = z;
  }

  function rotateY(node, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = node.x * cos + node.z * sin;
    const z = -node.x * sin + node.z * cos;
    node.x = x;
    node.z = z;
  }

  function drawPolygon(cx, cy, r, sides, startAngle, fillStyle, strokeStyle, strokeWidth) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const a = startAngle + (i * 2 * Math.PI / sides);
      const px = cx + r * Math.cos(a);
      const py = cy + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;

    // Slow down rotation slightly if a node is currently hovered
    const speedMult = hoveredNode ? 0.2 : 1.0;

    if (!isDragging) {
      velX *= 0.985;
      velY *= 0.985;
      if (Math.abs(velX) < 0.002) velX = 0.003;
      if (Math.abs(velY) < 0.002) velY = 0.004;
    }

    nodes.forEach(n => {
      rotateX(n, velX * speedMult);
      rotateY(n, velY * speedMult);
    });

    // Hover Detection across front-facing nodes
    let closestNode = null;
    let minHoverDist = 9999;
    nodes.forEach(n => {
      if (n.z > -radius * 0.1) {
        const px = cx + n.x;
        const py = cy + n.y;
        const dist = Math.hypot(px - mouseCanvasX, py - mouseCanvasY);
        const scale = (n.z + radius * 1.5) / (radius * 2.5);
        const patchRadius = Math.max(20, 36 * scale);
        if (dist < patchRadius * 1.3 && dist < minHoverDist) {
          minHoverDist = dist;
          closestNode = n;
        }
      }
    });

    hoveredNode = closestNode;
    if (!isDragging) {
      canvas.style.cursor = hoveredNode ? 'pointer' : 'grab';
    }

    // 1. Draw Football Soft Ground Contact Shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy + radius + 24, radius * 0.75, radius * 0.18, 0, 0, Math.PI * 2);
    const shadowGrad = ctx.createRadialGradient(cx, cy + radius + 24, 0, cx, cy + radius + 24, radius * 0.75);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.fill();
    ctx.restore();

    // 2. Draw Football Outer Spherical Glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
    const ballGlow = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.2, cx, cy, radius * 1.05);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ballGlow.addColorStop(0, isDark ? 'rgba(124, 58, 237, 0.12)' : 'rgba(255, 255, 255, 0.4)');
    ballGlow.addColorStop(1, isDark ? 'rgba(10, 10, 18, 0.85)' : 'rgba(240, 240, 245, 0.95)');
    ctx.fillStyle = ballGlow;
    ctx.fill();
    ctx.strokeStyle = isDark ? 'rgba(167, 139, 250, 0.3)' : 'rgba(124, 58, 237, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 3. Draw Football Seam Lines & Stitching Mesh
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.1) {
          const avgZ = (nodes[i].z + nodes[j].z) / (2 * radius);
          const alpha = Math.max(0.08, (avgZ + 1) / 2 * 0.4);
          ctx.strokeStyle = isDark ? `rgba(167, 139, 250, ${alpha})` : `rgba(30, 27, 75, ${alpha})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(cx + nodes[i].x, cy + nodes[i].y);
          ctx.lineTo(cx + nodes[j].x, cy + nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // 4. Sort Nodes by 3D Z-Depth
    const sortedNodes = [...nodes].sort((a, b) => a.z - b.z);

    // 5. Render Football Pentagon & Hexagon Tech Patches & Tooltips
    sortedNodes.forEach(n => {
      const scale = (n.z + radius * 1.5) / (radius * 2.5);
      const alpha = Math.max(0.2, (n.z + radius) / (radius * 2));
      const isHovered = n === hoveredNode;
      const patchRadius = (Math.max(20, 36 * scale)) * (isHovered ? 1.22 : 1.0);

      const px = cx + n.x;
      const py = cy + n.y;

      ctx.save();
      ctx.globalAlpha = isHovered ? 1.0 : alpha;

      // Pentagon patch (dark classic football patch) vs Hexagon patch (bright contrast patch)
      const sides = n.isPentagon ? 5 : 6;
      const patchFill = isHovered
        ? (isDark ? 'rgba(124, 58, 237, 0.45)' : 'rgba(124, 58, 237, 0.25)')
        : (n.isPentagon
            ? (isDark ? 'rgba(30, 27, 75, 0.95)' : 'rgba(15, 23, 42, 0.92)')
            : (isDark ? 'rgba(20, 20, 32, 0.92)' : 'rgba(255, 255, 255, 0.96)'));

      const patchBorder = isHovered
        ? '#A78BFA'
        : (n.isPentagon
            ? 'rgba(192, 132, 252, 0.8)'
            : (isDark ? 'rgba(124, 58, 237, 0.5)' : 'rgba(203, 213, 225, 0.8)'));

      drawPolygon(px, py, patchRadius, sides, n.isPentagon ? -Math.PI / 2 : 0, patchFill, patchBorder, isHovered ? 3.0 : 1.8);

      // Render Tech Brand Logo in the Center of Football Patch
      const logoSize = patchRadius * 1.1;
      let drawn = false;
      try {
        if (n.img && n.img.complete && n.img.naturalWidth > 0 && n.img.naturalHeight > 0) {
          ctx.drawImage(n.img, px - logoSize / 2, py - logoSize / 2, logoSize, logoSize);
          drawn = true;
        }
      } catch (e) {
        drawn = false;
      }

      if (!drawn) {
        ctx.fillStyle = n.isPentagon ? '#FFFFFF' : (isDark ? '#C084FC' : '#7C3AED');
        ctx.font = '800 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.short || n.name.substring(0, 3), px, py);
      }

      // RENDER HOVER TECH NAME TOOLTIP PILL DIRECTLY ABOVE HOVERED LOGO
      if (isHovered) {
        const text = n.name;
        ctx.font = '700 12px "JetBrains Mono", Inter, monospace';
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const badgePaddingX = 12;
        const badgeHeight = 24;
        const badgeX = px - (textWidth + badgePaddingX * 2) / 2;
        const badgeY = py - patchRadius - 28;

        // Tooltip pill background
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(badgeX, badgeY, textWidth + badgePaddingX * 2, badgeHeight, 99);
        } else {
          ctx.rect(badgeX, badgeY, textWidth + badgePaddingX * 2, badgeHeight);
        }
        ctx.fillStyle = isDark ? '#7C3AED' : '#1E1B4B';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Tooltip text
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, px, badgeY + badgeHeight / 2);
      }

      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ── COURSES & CERTIFICATIONS (With Certificate Image Preview) ── */
function renderCertifications() {
  const el = $('#certifications-content');
  if (!el) return;

  const certs = DATA.certifications || [];

  el.innerHTML = `
    <div class="certs-cards-grid">
      ${certs.map((c, i) => `
        <div class="cert-img-card tilt-card animate" style="transition-delay:${i * 0.08}s">
          
          <a href="${c.credentialUrl}" target="_blank" rel="noopener" class="cert-media-zone" title="Click to open official Certificate">
            <img src="${c.image}" alt="${c.name}" class="cert-media-img"
                 onerror="this.src='images/iglasses_3rdplace_ytb.jpg'">
            <div class="cert-media-overlay"></div>
            <span class="cert-issuer-badge font-mono">${c.issuer}</span>
          </a>

          <div class="cert-info-zone">
            <h3 class="cert-card-name">${c.name}</h3>
            <div class="cert-instructor font-mono">👨‍🏫 Instructor: ${c.instructor}</div>
            <p class="cert-card-desc">${c.description}</p>
            
            <div class="cert-card-footer">
              <a href="${c.credentialUrl}" target="_blank" rel="noopener" class="cert-verify-btn font-mono">
                <span>Verify Credential 🎓</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      `).join('')}
    </div>
  `;

  init3dCardTilt();
}

/* ── WRITING ────────────────────────────────────────────────── */
function renderWriting() {
  const el = $('#writing-content');
  if (!el) return;

  el.innerHTML = `
    <div class="writing-list">
      ${DATA.posts.slice(0, 5).map((p, i) => `
        <a class="writing-item animate"
           href="/posts/${p.slug}/"
           style="transition-delay:${i * 0.07}s">
          <div>
            <div class="writing-cat">${p.category}</div>
            <div class="writing-title">${p.title}</div>
          </div>
          <div class="writing-right">
            <span class="writing-time">${p.readingTime} min read</span>
            <span class="writing-arrow">→</span>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}

/* ── CONTACT ────────────────────────────────────────────────── */
function renderContact() {
  const el = $('#contact-inner');
  if (!el) return;
  const p = DATA.profile;

  el.innerHTML = `
    <div>
      <div class="contact-headline animate">Let's build<br>something useful.</div>
      <p class="contact-sub animate ad1">Open to opportunities, collaborations, and interesting problems in AI, ML, and autonomous systems.</p>
    </div>
    <div class="contact-links">
      <a class="contact-link animate ad1" href="mailto:${p.email}">
        ${ICONS.mail} ${p.email}
      </a>
      <a class="contact-link animate ad2" href="${p.linkedin}" target="_blank" rel="noopener noreferrer">
        ${ICONS.li} linkedin/tahazeeshan12
      </a>
      <a class="contact-link animate ad3" href="${p.github}" target="_blank" rel="noopener noreferrer">
        ${ICONS.gh} github/Tahazee
      </a>
      <a class="contact-link animate ad4" href="dashboard.html">
        ${ICONS.dash} View Analytics Dashboard
      </a>
    </div>
  `;
}

/* ── PSZOSTAK.PL CURSOR-REACTIVE PURPLE ATMOSPHERIC CANVAS & BRIGHT WHITE DOTS ───────── */
function initCursorCanvas() {
  let canvas = $('#bg-cursor-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-cursor-canvas';
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouseX = width / 2;
  let mouseY = height / 2;
  let glowX = width / 2;
  let glowY = height / 2;
  let targetAlpha = 0;
  let currentAlpha = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    targetAlpha = 1;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    targetAlpha = 0;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth inertia / lerp tracking
    glowX += (mouseX - glowX) * 0.06;
    glowY += (mouseY - glowY) * 0.06;
    currentAlpha += (targetAlpha - currentAlpha) * 0.05;

    if (currentAlpha > 0.01) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const radius = 960;
      const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius);

      if (isDark) {
        // Deep Violet / Purple Ambient Light Pool for Dark Mode
        grad.addColorStop(0, `rgba(167, 139, 250, ${0.11 * currentAlpha})`);
        grad.addColorStop(0.35, `rgba(139, 92, 246, ${0.08 * currentAlpha})`);
        grad.addColorStop(0.65, `rgba(124, 58, 237, ${0.04 * currentAlpha})`);
        grad.addColorStop(0.85, `rgba(79, 70, 229, ${0.015 * currentAlpha})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        // Soft Atmospheric Pink / Rose Light Pool for Light Mode
        grad.addColorStop(0, `rgba(244, 114, 182, ${0.14 * currentAlpha})`);
        grad.addColorStop(0.35, `rgba(236, 72, 153, ${0.09 * currentAlpha})`);
        grad.addColorStop(0.65, `rgba(219, 39, 119, ${0.045 * currentAlpha})`);
        grad.addColorStop(0.85, `rgba(244, 63, 94, ${0.018 * currentAlpha})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. 1.75x Spaced Soft Grid Dot Illumination (42px spacing)
      const dotSpacing = 42;
      const lightRadius = 450;

      const startX = Math.floor((glowX - lightRadius) / dotSpacing) * dotSpacing;
      const endX = Math.ceil((glowX + lightRadius) / dotSpacing) * dotSpacing;
      const startY = Math.floor((glowY - lightRadius) / dotSpacing) * dotSpacing;
      const endY = Math.ceil((glowY + lightRadius) / dotSpacing) * dotSpacing;

      for (let dx = startX; dx <= endX; dx += dotSpacing) {
        for (let dy = startY; dy <= endY; dy += dotSpacing) {
          const distSq = (dx - glowX) * (dx - glowX) + (dy - glowY) * (dy - glowY);
          if (distSq < lightRadius * lightRadius) {
            const dist = Math.sqrt(distSq);
            const intensity = Math.pow(1 - dist / lightRadius, 1.8);
            const dotAlpha = (intensity * 0.24) * currentAlpha;

            if (dotAlpha > 0.01) {
              ctx.fillStyle = isDark
                ? `rgba(255, 255, 255, ${dotAlpha})`
                : `rgba(219, 39, 119, ${dotAlpha * 1.3})`;
              ctx.beginPath();
              ctx.arc(dx + 1, dy + 1, 1.15, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── INIT ───────────────────────────────────────────────────── */
function init() {
  try { renderNav(); } catch(e) { console.error('nav:', e); }
  try { renderHero(); } catch(e) { console.error('hero:', e); }
  try { renderAbout(); } catch(e) { console.error('about:', e); }
  try { renderExperience(); } catch(e) { console.error('experience:', e); }
  try { renderProjects(); } catch(e) { console.error('projects:', e); }
  try { renderResearch(); } catch(e) { console.error('research:', e); }
  try { renderEducation(); } catch(e) { console.error('education:', e); }
  try { renderAchievements(); } catch(e) { console.error('achievements:', e); }
  try { renderTechFootball(); } catch(e) { console.error('tech-football:', e); }
  try { renderCertifications(); } catch(e) { console.error('certifications:', e); }
  try { renderWriting(); } catch(e) { console.error('writing:', e); }
  try { renderContact(); } catch(e) { console.error('contact:', e); }

  requestAnimationFrame(() => {
    initCursorCanvas();
    initScrollAnimations();
    initActiveNav();
    initSmoothScroll();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
