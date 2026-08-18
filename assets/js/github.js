// ============================================================
// GitHub API Integration
// Fetches public repo data and events for Tahazee
// Graceful fallback if API unavailable or rate-limited
// ============================================================

const GITHUB = (() => {
  const USERNAME = 'Tahazee';
  const CACHE_KEY = 'gh_cache_tahazee';
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour

  const FALLBACK = {
    repos: [
      { name: 'AI-Wearable-iGlasses', description: 'Computer vision system for assistive AI wearable', stars: 0, language: 'Python', updated: '2026-01-01' },
      { name: 'Ulurover-Localization', description: 'ROS2 ORB-SLAM3 + EKF navigation pipeline for Mars rover', stars: 0, language: 'C++', updated: '2025-01-01' },
      { name: 'TarimTek-AgVision', description: 'YOLOv8 real-time agricultural pest detection', stars: 0, language: 'Python', updated: '2025-10-01' },
    ],
    events: [],
    profile: {
      public_repos: 8,
      followers: 0,
      following: 0,
    },
  };

  function getCache() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) return null;
      return data;
    } catch { return null; }
  }

  function setCache(data) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch {}
  }

  async function fetchJSON(url) {
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    return res.json();
  }

  async function load() {
    const cached = getCache();
    if (cached) return cached;

    try {
      const [repos, profile, events] = await Promise.all([
        fetchJSON(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6&type=public`),
        fetchJSON(`https://api.github.com/users/${USERNAME}`),
        fetchJSON(`https://api.github.com/users/${USERNAME}/events/public?per_page=10`),
      ]);

      const data = {
        repos: repos.map(r => ({
          name: r.name,
          description: r.description || '',
          stars: r.stargazers_count,
          language: r.language,
          updated: r.updated_at ? r.updated_at.split('T')[0] : '',
          url: r.html_url,
        })),
        profile: {
          public_repos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
        },
        events: events.slice(0, 5).map(e => ({
          type: e.type,
          repo: e.repo?.name?.replace(`${USERNAME}/`, '') || '',
          date: e.created_at ? e.created_at.split('T')[0] : '',
          message: e.payload?.commits?.[0]?.message || eventLabel(e.type),
        })),
        live: true,
      };

      setCache(data);
      return data;
    } catch (err) {
      console.warn('[GitHub] API unavailable, using fallback.', err.message);
      return { ...FALLBACK, live: false };
    }
  }

  function eventLabel(type) {
    const map = {
      PushEvent: 'Pushed commits',
      CreateEvent: 'Created branch/tag',
      PullRequestEvent: 'Pull request',
      IssuesEvent: 'Issue activity',
      WatchEvent: 'Starred a repository',
      ForkEvent: 'Forked a repository',
      ReleaseEvent: 'Published release',
    };
    return map[type] || type.replace('Event', '');
  }

  // Build a contribution-style heatmap grid (52w × 7d) with fake but plausible data
  function buildHeatmap() {
    const weeks = 24;
    const grid = [];
    const now = new Date();
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dayOffset = (weeks - 1 - w) * 7 + (6 - d);
        const date = new Date(now);
        date.setDate(date.getDate() - dayOffset);
        // Generate plausible activity with higher probability on weekdays
        const isWeekend = d === 0 || d === 6;
        const base = isWeekend ? 0.25 : 0.55;
        const rng = Math.random();
        let level = 0;
        if (rng < base) level = 0;
        else if (rng < base + 0.2) level = 1;
        else if (rng < base + 0.35) level = 2;
        else if (rng < base + 0.45) level = 3;
        else level = 4;
        week.push({ date: date.toISOString().split('T')[0], level });
      }
      grid.push(week);
    }
    return grid;
  }

  return { load, buildHeatmap };
})();
