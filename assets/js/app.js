// ============================================================
// TAHA ZEESHAN — Soft Pop Light Dashboard
// Dashboard renderers for all panels
// ============================================================

/* ── UTILS ───────────────────────────────────────────────── */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ── INLINE SVG ICONS ────────────────────────────────────── */
const I = {
  pin:      `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  github:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`,
  star:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  git:      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>`,
  pr:       `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`,
  issue:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  repo:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3zM3 9h18M9 21V9"/></svg>`,
  brain:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 013.32-3.97A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-3.32-3.97A2.5 2.5 0 0014.5 2z"/></svg>`,
  flask:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M9 3v7l-5 9a2 2 0 001.8 3h10.4a2 2 0 001.8-3L15 10V3"/></svg>`,
  pencil:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trophy:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  chart:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  code:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  school:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  briefcase:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>`,
  edit:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  ext:      `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  chev:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  cal:      `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  link:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  search:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
};

/* ── SKILL PROFICIENCY DATA ──────────────────────────────── */
const SKILL_GROUPS = [
  {
    label: 'AI / ML',
    primary: 'PyTorch',
    skills: [
      { name: 'Python',    pct: 93, color: '#3b82f6' },
      { name: 'PyTorch',   pct: 86, color: '#f97316' },
      { name: 'Scikit-learn', pct: 80, color: '#8b5cf6' },
      { name: 'OpenCV',    pct: 88, color: '#ec4899' },
    ],
  },
  {
    label: 'Systems',
    primary: 'C++',
    skills: [
      { name: 'C++',       pct: 74, color: '#6366f1' },
      { name: 'ROS2',      pct: 82, color: '#22c55e' },
      { name: 'Linux',     pct: 78, color: '#eab308' },
      { name: 'Docker',    pct: 60, color: '#14b8a6' },
    ],
  },
  {
    label: 'Data',
    primary: 'Pandas',
    skills: [
      { name: 'Pandas',    pct: 84, color: '#3b82f6' },
      { name: 'SQL',       pct: 65, color: '#8b5cf6' },
      { name: 'Matplotlib',pct: 76, color: '#f97316' },
      { name: 'JavaScript',pct: 58, color: '#eab308' },
    ],
  },
];

/* ── ML METRICS DATA ─────────────────────────────────────── */
const ML_METRICS = {
  dots: [
    { cls: 'dot-completed', n: 3, label: 'Completed' },
    { cls: 'dot-active',    n: 2, label: 'Active'    },
    { cls: 'dot-research',  n: 1, label: 'Research'  },
  ],
  stats: [
    { label: 'Projects Built',    val: '5',     col: 'val-blue',   icon: 'code'  },
    { label: 'Models Deployed',   val: '3',     col: 'val-purple', icon: 'brain' },
    { label: 'Best AUROC',        val: '0.923', col: 'val-green',  icon: 'chart' },
    { label: 'Best mAP@0.5',      val: '91.4%', col: 'val-orange', icon: 'chart' },
    { label: 'Best Recall',       val: '97.3%', col: 'val-pink',   icon: 'chart' },
    { label: 'Inference FPS',     val: '12',    col: 'val-teal',   icon: 'chart' },
  ],
};

/* ── RESEARCH / WRITING METRICS ──────────────────────────── */
const RESEARCH_METRICS = [
  { label: 'Articles Written',     val: '5',     col: 'val-blue'   },
  { label: 'Avg Read Time',        val: '8 min', col: 'val-green'  },
  { label: 'Experiments Run',      val: '3',     col: 'val-orange' },
  { label: 'Active Experiments',   val: '2',     col: 'val-purple' },
  { label: 'Research Areas',       val: '5',     col: 'val-pink'   },
  { label: 'Active Since',         val: '2023',  col: 'val-muted'  },
];

/* ── AWARDS METRICS ──────────────────────────────────────── */
const AWARD_METRICS = [
  { label: 'Competitions',   val: '2',       col: 'val-purple' },
  { label: 'Awards',         val: '4',       col: 'val-orange' },
  { label: 'Prize Won',      val: '30k ₺',   col: 'val-green'  },
  { label: 'Sponsorship',    val: '250k ₺',  col: 'val-blue'   },
  { label: 'National Rank',  val: 'Top 3',   col: 'val-pink'   },
  { label: 'Board Score',    val: '100%',    col: 'val-teal'   },
];

/* ── ACTIVITY CHART DATA ─────────────────────────────────── */
const CHART_DATA = [
  { month: 'Jan', val: 15 }, { month: 'Feb', val: 22 }, { month: 'Mar', val: 18 },
  { month: 'Apr', val: 35 }, { month: 'May', val: 52 }, { month: 'Jun', val: 45 },
  { month: 'Jul', val: 60 }, { month: 'Aug', val: 78 }, { month: 'Sep', val: 65 },
  { month: 'Oct', val: 48 }, { month: 'Nov', val: 38 }, { month: 'Dec', val: 30 },
];

/* ── GITHUB STATS DEFAULTS ───────────────────────────────── */
let ghData = null;

/* ────────────────────────────────────────────────────────── */
/* ── RENDERERS ───────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────── */

/* ── LEFT: PROFILE SIDEBAR ───────────────────────────────── */
function renderProfileSidebar() {
  const p = DATA.profile;
  const sidebar = $('#profile-sidebar');

  sidebar.innerHTML = `
    <!-- Profile card -->
    <div class="profile-card">
      <div class="profile-avatar-row">
        <div class="profile-avatar">
          ${p.avatar
            ? `<img src="${p.avatar}" alt="${p.name}" onerror="this.style.display='none'">`
            : 'TZ'}
        </div>
        <button class="profile-edit-btn" title="GitHub"
          onclick="window.open('${p.github}','_blank')">${I.ext}</button>
      </div>
      <div class="profile-name">${p.name}</div>
      <div class="profile-location">${I.pin} ${p.location}</div>
      <p class="profile-bio">${p.bio}</p>
    </div>

    <!-- Education -->
    <div class="sidebar-section">
      <div class="sidebar-section-header">
        <div class="sidebar-section-icon" style="background:#ede9fe;color:#8b5cf6;">${I.school}</div>
        Education
      </div>
      ${DATA.education.map(e => `
        <div class="sidebar-item">
          <div class="sidebar-item-icon" style="background:#ede9fe;color:#8b5cf6;">${I.school}</div>
          <div class="sidebar-item-main">
            <div class="sidebar-item-title">${e.institution.split(' ').slice(0,3).join(' ')}</div>
            <div class="sidebar-item-sub">${e.degree.split(' ').slice(0,4).join(' ')}</div>
            <div class="sidebar-item-date">${e.dates}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Experience -->
    <div class="sidebar-section">
      <div class="sidebar-section-header">
        <div class="sidebar-section-icon" style="background:#dbeafe;color:#3b82f6;">${I.briefcase}</div>
        Experience
      </div>
      ${DATA.experience.map(e => `
        <div class="sidebar-item">
          <div class="sidebar-item-icon" style="background:#dbeafe;color:#3b82f6;">${I.briefcase}</div>
          <div class="sidebar-item-main">
            <div class="sidebar-item-title">${e.org.split(' ').slice(0,2).join(' ')}</div>
            <div class="sidebar-item-sub">${e.role}</div>
            <div class="sidebar-item-date">${e.dates}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ── CENTER: GITHUB STATS PANEL ──────────────────────────── */
function renderGithubPanel() {
  const stats = ghData?.profile || { public_repos: 8, followers: 0, following: 0 };
  const repos = ghData?.repos || [];
  const live = ghData?.live ?? false;

  return `
    <div class="panel" id="github-panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="panel-title-icon" style="background:#f0fdf4;color:#22c55e;">${I.github}</div>
          GitHub Stats
        </div>
        <div class="panel-action" style="display:flex;align-items:center;gap:4px;">
          ${live ? `<span class="status-dot-live"></span> Live` : `<span style="color:var(--t4);font-size:0.7rem;">Cached</span>`}
        </div>
      </div>
      <div class="panel-body">
        <div class="stats-table">
          <div class="stat-row">
            <span class="stat-row-label">${I.star} Total Stars</span>
            <span class="stat-row-value val-yellow">${repos.reduce((a, r) => a + (r.stars||0), 0) || 0}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">${I.git} Public Repos</span>
            <span class="stat-row-value val-blue">${stats.public_repos}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">${I.pr} Followers</span>
            <span class="stat-row-value val-green">${stats.followers}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">${I.repo} Following</span>
            <span class="stat-row-value val-purple">${stats.following}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">${I.code} Languages</span>
            <span class="stat-row-value val-orange">${[...new Set(repos.map(r=>r.language).filter(Boolean))].length || '3+'}</span>
          </div>
          <div class="stat-row">
            <span class="stat-row-label">${I.cal} Joined</span>
            <span class="stat-row-value val-muted">2022</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── CENTER: ML METRICS PANEL ────────────────────────────── */
function renderMLPanel() {
  const totalDots = ML_METRICS.dots.reduce((a, d) => a + d.n, 0);
  const dotsHtml = ML_METRICS.dots.map(d =>
    Array.from({ length: d.n }, () => `<span class="metric-dot ${d.cls}"></span>`).join('')
  ).join('');

  return `
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="panel-title-icon" style="background:#faf5ff;color:#8b5cf6;">${I.brain}</div>
          ML Project Metrics
        </div>
        <div class="panel-action">${totalDots} projects</div>
      </div>
      <div class="panel-body">
        <div class="dots-row">${dotsHtml}</div>
        <div class="dots-legend">
          ${ML_METRICS.dots.map(d => `
            <div class="dots-legend-item">
              <span class="dots-legend-dot" style="background:${
                d.cls==='dot-completed'?'var(--purple)':d.cls==='dot-active'?'var(--green)':'var(--orange)'
              }"></span>
              ${d.label}
            </div>
          `).join('')}
        </div>
        <div class="stats-table">
          ${ML_METRICS.stats.map(s => `
            <div class="stat-row">
              <span class="stat-row-label">${I[s.icon] || ''} ${s.label}</span>
              <span class="stat-row-value ${s.col}">${s.val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ── CENTER: RESEARCH & WRITING PANEL ────────────────────── */
function renderResearchPanel() {
  return `
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="panel-title-icon" style="background:#fff7ed;color:#f97316;">${I.pencil}</div>
          Research & Writing
        </div>
        <div class="panel-action">Active since 2023</div>
      </div>
      <div class="panel-body">
        <div class="stats-table">
          ${RESEARCH_METRICS.map(r => `
            <div class="stat-row">
              <span class="stat-row-label">${r.label}</span>
              <span class="stat-row-value ${r.col}">${r.val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ── CENTER: AWARDS & COMPETITIONS PANEL ─────────────────── */
function renderAwardsPanel() {
  return `
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="panel-title-icon" style="background:#fefce8;color:#eab308;">${I.trophy}</div>
          Awards & Competitions
        </div>
      </div>
      <div class="panel-body">
        <div class="awards-highlight">
          <div class="awards-trophy">🏆</div>
          <div class="awards-rank">3rd Place</div>
          <div class="awards-event">Youth Tech Innovators 2025</div>
        </div>
        <div class="stats-table">
          ${AWARD_METRICS.map(a => `
            <div class="stat-row">
              <span class="stat-row-label">${a.label}</span>
              <span class="stat-row-value ${a.col}">${a.val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ── CENTER: ACTIVITY CHART ──────────────────────────────── */
function renderChartPanel() {
  const total = CHART_DATA.reduce((a, d) => a + d.val, 0);
  const year = new Date().getFullYear();

  return `
    <div class="panel">
      <div class="chart-header-row">
        <div class="chart-title">
          ${I.chart} Project Activity
        </div>
        <div class="chart-total">${year} Total: ${total}</div>
      </div>
      <div class="chart-area">
        <canvas class="chart-canvas" id="activity-chart" width="600" height="100"></canvas>
        <div class="chart-months">
          ${CHART_DATA.map(d => `<span class="chart-month-lbl">${d.month}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ── CENTER: CONTRIBUTION HEATMAP ────────────────────────── */
function renderHeatmapPanel() {
  const year = new Date().getFullYear();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return `
    <div class="panel heatmap-panel">
      <div class="panel-header">
        <div class="panel-title">
          ${I.cal} Contribution Activity
        </div>
        <div class="heatmap-controls">
          <div class="heatmap-year-badge">${year} ${I.chev}</div>
        </div>
      </div>
      <div class="heatmap-outer">
        <div class="heatmap-months">
          ${months.map(m => `<span class="heatmap-month-lbl">${m}</span>`).join('')}
        </div>
        <div class="heatmap-grid" id="heatmap-grid"></div>
        <div class="heatmap-legend" style="margin-top:6px;">
          <span class="hm-legend-label">Less</span>
          <span class="hm-legend-swatch hm-0"></span>
          <span class="hm-legend-swatch hm-1"></span>
          <span class="hm-legend-swatch hm-2"></span>
          <span class="hm-legend-swatch hm-3"></span>
          <span class="hm-legend-swatch hm-4"></span>
          <span class="hm-legend-label">More</span>
        </div>
      </div>
    </div>
  `;
}

/* ── CENTER: SKILL SET PANEL ─────────────────────────────── */
function renderSkillPanel() {
  const totalLangs = SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0);

  return `
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <div class="panel-title-icon" style="background:#f0fdf4;color:#22c55e;">${I.code}</div>
          Skill Set
        </div>
        <div class="panel-action">
          <span class="skills-count-badge">${totalLangs} technologies</span>
        </div>
      </div>
      <div class="panel-body">
        <p class="skills-desc">Core technologies and framework proficiency</p>
        ${SKILL_GROUPS.map(g => `
          <div class="skill-group-header">
            ${g.label}
            <span class="skill-group-primary">Primary · ${g.primary}</span>
          </div>
          ${g.skills.map(s => `
            <div class="skill-bar-item">
              <span class="skill-name">${s.name}</span>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" style="width:0%;background:${s.color};" data-pct="${s.pct}"></div>
              </div>
              <span class="skill-pct">${s.pct}%</span>
            </div>
          `).join('')}
        `).join('')}
      </div>
    </div>
  `;
}

/* ── RIGHT: PROJECTS RAIL ────────────────────────────────── */
function renderProjectsRail() {
  const rail = $('#projects-rail');

  const PROJ_COLORS = [
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
  ];

  const badgeMap = {
    active:    { text: 'Active',    cls: 'proj-badge-active'    },
    completed: { text: 'Completed', cls: 'proj-badge-completed' },
    paused:    { text: 'Research',  cls: 'proj-badge-research'  },
  };

  const projs = DATA.projects.slice(0, 4);

  rail.innerHTML = `
    <div class="projects-rail-header">
      <div class="rail-header-row">
        <div class="rail-title">Projects</div>
        <button class="rail-edit-btn" title="All projects">${I.ext}</button>
      </div>
    </div>

    ${projs.map((pr, i) => {
      const badge = badgeMap[pr.status] || badgeMap.paused;
      const metric = pr.results?.metrics?.[0];
      return `
        <div class="proj-card" onclick="openProjectModal('${pr.id}')">
          <div class="proj-card-top">
            <div>
              <div class="proj-card-name">${pr.title}</div>
              <div class="proj-card-metric">${metric ? `${metric.value} ${metric.label}` : pr.year}</div>
            </div>
            <span class="proj-badge ${badge.cls}">${badge.text}</span>
          </div>
          <p class="proj-card-desc">${pr.description}</p>
          <div class="proj-card-preview">
            <div class="proj-preview-bg" style="background:${PROJ_COLORS[i % PROJ_COLORS.length]}">
              <div class="proj-preview-label">${pr.title}</div>
            </div>
          </div>
          <div class="proj-card-stack">
            ${pr.technologies.slice(0, 3).map(t => `<span class="proj-chip">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

/* ── MAIN PANELS ASSEMBLY ────────────────────────────────── */
function renderMainPanels() {
  const center = $('#main-panels');

  center.innerHTML = `
    <!-- Row 1: 3 stats panels -->
    <div class="panels-row panels-row-3">
      ${renderGithubPanel()}
      ${renderMLPanel()}
      ${renderResearchPanel()}
    </div>

    <!-- Row 2: Awards + Growth Chart -->
    <div class="panels-row panels-row-2">
      ${renderAwardsPanel()}
      ${renderChartPanel()}
    </div>

    <!-- Row 3: Heatmap -->
    ${renderHeatmapPanel()}

    <!-- Row 4: Skills -->
    ${renderSkillPanel()}
  `;

  // Draw chart
  requestAnimationFrame(() => {
    drawActivityChart();
    renderHeatmapGrid();
    animateSkillBars();
  });
}

/* ── DRAW ACTIVITY CHART (SVG) ───────────────────────────── */
function drawActivityChart() {
  const canvas = $('#activity-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 560;
  const H = 100;
  canvas.width = W;
  canvas.height = H;

  const vals = CHART_DATA.map(d => d.val);
  const maxV = Math.max(...vals);
  const minV = 0;
  const padL = 4, padR = 4, padT = 8, padB = 4;
  const drawW = W - padL - padR;
  const drawH = H - padT - padB;

  const pts = vals.map((v, i) => ({
    x: padL + (i / (vals.length - 1)) * drawW,
    y: padT + (1 - (v - minV) / (maxV - minV)) * drawH,
  }));

  // Area fill
  const grad = ctx.createLinearGradient(0, padT, 0, H);
  grad.addColorStop(0, 'rgba(99,102,241,0.18)');
  grad.addColorStop(1, 'rgba(99,102,241,0.01)');

  ctx.beginPath();
  ctx.moveTo(pts[0].x, H);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length - 1].x, H);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i - 1].x + pts[i].x) / 2;
    const cp1y = pts[i - 1].y;
    const cp2x = cp1x;
    const cp2y = pts[i].y;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Dots
  pts.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });
}

/* ── RENDER HEATMAP GRID ─────────────────────────────────── */
function renderHeatmapGrid() {
  const grid = $('#heatmap-grid');
  if (!grid) return;

  const weeks = 52;
  const now = new Date();
  let html = '';

  for (let w = 0; w < weeks; w++) {
    html += `<div class="heatmap-col">`;
    for (let d = 0; d < 7; d++) {
      const dayOffset = (weeks - 1 - w) * 7 + (6 - d);
      const date = new Date(now);
      date.setDate(date.getDate() - dayOffset);
      const isWeekend = d === 0 || d === 6;
      const rng = Math.random();
      const base = isWeekend ? 0.55 : 0.3;
      let level = 0;
      if (rng > base)          level = 1;
      if (rng > base + 0.25)   level = 2;
      if (rng > base + 0.45)   level = 3;
      if (rng > base + 0.6)    level = 4;
      const ds = date.toISOString().split('T')[0];
      html += `<div class="hm-cell hm-${level}" title="${ds}"></div>`;
    }
    html += `</div>`;
  }

  grid.innerHTML = html;
}

/* ── ANIMATE SKILL BARS ──────────────────────────────────── */
function animateSkillBars() {
  $$('.skill-bar-fill').forEach(bar => {
    const pct = bar.dataset.pct;
    requestAnimationFrame(() => {
      bar.style.width = pct + '%';
    });
  });
}

/* ── PROJECT DETAIL MODAL ────────────────────────────────── */
function openProjectModal(id) {
  const pr = DATA.projects.find(p => p.id === id);
  if (!pr) return;

  let modal = $('#proj-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'proj-modal-overlay';
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(18,16,50,0.4);z-index:400;
      display:flex;align-items:center;justify-content:center;
      padding:24px;backdrop-filter:blur(4px);
    `;
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  }

  const BADGE = { active:'proj-badge-active', completed:'proj-badge-completed', paused:'proj-badge-research' };

  modal.innerHTML = `
    <div style="background:var(--card);border-radius:14px;max-width:600px;width:100%;
      border:1px solid var(--border);box-shadow:var(--shadow-lg);overflow:hidden;max-height:90vh;overflow-y:auto;">
      <div style="padding:20px 22px 16px;border-bottom:1px solid var(--border-2);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
          <div>
            <div style="font-family:var(--mono);font-size:0.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">${pr.category} · ${pr.org}</div>
            <div style="font-size:1.1rem;font-weight:700;color:var(--t1);margin-bottom:4px;letter-spacing:-0.01em;">${pr.title}</div>
            <div style="font-size:0.8rem;color:var(--purple);font-weight:500;">${pr.role}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">
            <span class="proj-badge ${BADGE[pr.status]}">${pr.status}</span>
            <button onclick="document.getElementById('proj-modal-overlay').remove()"
              style="width:26px;height:26px;display:flex;align-items:center;justify-content:center;
                border-radius:6px;border:1px solid var(--border);color:var(--t3);font-size:1rem;
                cursor:pointer;background:transparent;line-height:1;">×</button>
          </div>
        </div>
      </div>
      <div style="padding:18px 22px;">
        ${[
          ['Overview', pr.longDescription],
          ['Problem', pr.problem],
          ['Approach', pr.approach],
        ].map(([h, t]) => `
          <div style="font-family:var(--mono);font-size:0.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:0.06em;margin:16px 0 5px;">${h}</div>
          <p style="font-size:0.83rem;color:var(--t2);line-height:1.6;">${t}</p>
        `).join('')}

        ${pr.results?.metrics?.length ? `
          <div style="font-family:var(--mono);font-size:0.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:0.06em;margin:16px 0 8px;">Results</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;margin-bottom:6px;">
            ${pr.results.metrics.map(m => `
              <div class="mini-metric">
                <div class="mini-metric-val">${m.value}</div>
                <div class="mini-metric-lbl">${m.label}</div>
              </div>
            `).join('')}
          </div>
          <p style="font-size:0.8rem;color:var(--t3);">${pr.results.summary}</p>
        ` : ''}

        ${pr.challenges ? `
          <div style="font-family:var(--mono);font-size:0.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:0.06em;margin:16px 0 5px;">Challenges</div>
          <p style="font-size:0.83rem;color:var(--t2);line-height:1.6;">${pr.challenges}</p>
        ` : ''}

        <div style="font-family:var(--mono);font-size:0.68rem;color:var(--t3);text-transform:uppercase;letter-spacing:0.06em;margin:16px 0 8px;">Stack</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${pr.technologies.map(t => `<span class="proj-chip" style="font-size:0.72rem;padding:3px 8px;">${t}</span>`).join('')}
        </div>

        ${pr.award ? `<div style="margin-top:14px;"><span class="proj-badge proj-badge-research">🏆 ${pr.award}</span></div>` : ''}
      </div>
      ${pr.github ? `
        <div style="padding:12px 22px;border-top:1px solid var(--border-2);background:var(--card-2);">
          <a href="${pr.github}" target="_blank" rel="noopener"
            style="display:inline-flex;align-items:center;gap:6px;font-size:0.8rem;font-weight:600;
              color:var(--purple);padding:6px 14px;border-radius:8px;border:1px solid var(--border);
              background:var(--card);transition:all 0.15s;">
            ${I.github} View on GitHub ${I.ext}
          </a>
        </div>
      ` : ''}
    </div>
  `;
}

/* ── COMMAND PALETTE ─────────────────────────────────────── */
let cmdOpen = false;
let cmdIdx  = -1;

const CMD_INDEX = (() => {
  const idx = [];
  if (typeof DATA !== 'undefined') {
    DATA.projects.forEach(p => idx.push({ type: 'Project', name: p.title, desc: p.category, icon: 'code', action: () => openProjectModal(p.id) }));
    DATA.posts?.forEach(p => idx.push({ type: 'Article', name: p.title, desc: p.category, icon: 'pencil', action: () => window.open(`/posts/${p.slug}/`, '_blank') }));
    DATA.experience?.forEach(e => idx.push({ type: 'Experience', name: e.org, desc: e.role, icon: 'briefcase', action: () => {} }));
    DATA.research?.forEach(r => idx.push({ type: 'Research', name: r.title, desc: r.category, icon: 'flask', action: () => {} }));
  }
  return idx;
})();

function openCmd() {
  cmdOpen = true;
  $('#cmd-overlay').classList.add('open');
  $('#cmd-input').value = '';
  $('#cmd-input').focus();
  renderCmdResults('');
  cmdIdx = -1;
}

function closeCmd() {
  cmdOpen = false;
  $('#cmd-overlay').classList.remove('open');
}

function renderCmdResults(q) {
  const el = $('#cmd-results');
  if (!el) return;
  const qLow = q.trim().toLowerCase();
  const items = qLow
    ? CMD_INDEX.filter(i => i.name.toLowerCase().includes(qLow) || (i.desc||'').toLowerCase().includes(qLow))
    : CMD_INDEX.slice(0, 9);

  if (!items.length) { el.innerHTML = `<div class="cmd-empty">No results for "${q}"</div>`; return; }

  const groups = {};
  items.forEach(i => { (groups[i.type] = groups[i.type] || []).push(i); });

  el.innerHTML = Object.entries(groups).map(([type, gItems]) => `
    <div class="cmd-group-label">${type}</div>
    ${gItems.map(item => `
      <div class="cmd-result-item" data-name="${item.name}">
        <div class="cmd-result-icon">${I[item.icon] || ''}</div>
        <div>
          <div class="cmd-result-name">${item.name}</div>
          <div class="cmd-result-type">${item.desc || ''}</div>
        </div>
      </div>
    `).join('')}
  `).join('');

  $$('.cmd-result-item', el).forEach((el, idx) => {
    const name = el.dataset.name;
    const found = items.find(i => i.name === name);
    el.addEventListener('click', () => { found?.action(); closeCmd(); });
  });
}

/* ── EVENT WIRING ────────────────────────────────────────── */
function initEvents() {
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); cmdOpen ? closeCmd() : openCmd(); }
    if (e.key === 'Escape') { if (cmdOpen) closeCmd(); }
    if (cmdOpen) {
      const items = $$('.cmd-result-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        cmdIdx = Math.min(cmdIdx + 1, items.length - 1);
        items.forEach((it, i) => it.classList.toggle('focused', i === cmdIdx));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        cmdIdx = Math.max(cmdIdx - 1, 0);
        items.forEach((it, i) => it.classList.toggle('focused', i === cmdIdx));
      } else if (e.key === 'Enter' && cmdIdx >= 0) {
        items[cmdIdx]?.click();
      }
    }
  });

  $('#cmd-input')?.addEventListener('input', e => renderCmdResults(e.target.value));
  $('#cmd-overlay')?.addEventListener('click', e => { if (e.target.id === 'cmd-overlay') closeCmd(); });
  $('#cmd-trigger')?.addEventListener('click', openCmd);

  // Topbar buttons
  $('#btn-preview')?.addEventListener('click', () => window.open('https://tahazee.github.io', '_blank'));
}

/* ── MOBILE DASHBOARD TABS ───────────────────────────────── */
function initMobileDashboardTabs() {
  const tabs = $$('.dash-nav-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (target === 'overview') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target === 'projects') {
        const rail = $('#projects-rail');
        if (rail) {
          rail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (target === 'activity') {
        const panel = $('#panel-chart') || $('#github-panel');
        if (panel) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (target === 'profile') {
        const sidebar = $('#profile-sidebar');
        if (sidebar) {
          sidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ── GITHUB ASYNC UPDATE ─────────────────────────────────── */
async function loadGitHub() {
  try {
    ghData = await GITHUB.load();
    const panel = $('#github-panel');
    if (panel) panel.outerHTML = renderGithubPanel();
  } catch (e) {
    console.warn('[GitHub] load failed:', e);
  }
}

/* ── DASHBOARD THEME TOGGLE ──────────────────────────────── */
function initThemeToggle() {
  const toggleBtn = $('#theme-toggle-dash');
  const iconSpan = $('#theme-icon-dash');
  
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (iconSpan) iconSpan.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (iconSpan) iconSpan.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  });
}

/* ── INIT ────────────────────────────────────────────────── */
function init() {
  const steps = [
    ['profile sidebar',       renderProfileSidebar],
    ['main panels',           renderMainPanels],
    ['projects rail',         renderProjectsRail],
    ['events',                initEvents],
    ['mobile dashboard tabs', initMobileDashboardTabs],
    ['theme toggle',          initThemeToggle],
  ];


  for (const [name, fn] of steps) {
    try {
      fn();
    } catch (err) {
      console.error(`[init] Failed at "${name}":`, err);
      // Show error on page so the user can report it
      document.body.insertAdjacentHTML('afterbegin', `
        <div style="background:#fee2e2;color:#991b1b;font-family:monospace;
          padding:12px 18px;font-size:12px;border-bottom:2px solid #fca5a5;">
          <strong>JS Error in "${name}":</strong> ${err.message}
        </div>
      `);
    }
  }

  loadGitHub().catch(() => {});
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
