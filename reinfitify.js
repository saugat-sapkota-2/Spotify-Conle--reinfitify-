const tracks = [
    { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', emoji: '🌃', bg: '#2a0a1a', dur: '3:20' },
    { title: 'As It Was', artist: 'Harry Styles', album: "Harry's House", emoji: '🌸', bg: '#1a2e1a', dur: '2:37' },
    { title: 'Anti-Hero', artist: 'Taylor Swift', album: 'Midnights', emoji: '💎', bg: '#1a1a2e', dur: '3:20' },
    { title: 'Espresso', artist: 'Sabrina Carpenter', album: "Short n' Sweet", emoji: '☕', bg: '#2e1e0a', dur: '2:55' },
    { title: 'HUMBLE.', artist: 'Kendrick Lamar', album: 'DAMN.', emoji: '👑', bg: '#1e1a0a', dur: '2:57' },
    { title: 'Vampire', artist: 'Olivia Rodrigo', album: 'GUTS', emoji: '🦇', bg: '#1a0a2e', dur: '3:39' },
    { title: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer…', emoji: '🌼', bg: '#1a2e2e', dur: '3:21' },
  ];

  let currentIdx = 0;
  let isPlaying = false;
  let elapsed = 0;
  let totalSecs = 200;
  let timer = null;
  let likedNow = false;
  let shuffleOn = false;
  let repeatOn = false;
  const likedTracks = new Set();

  function renderTracklist() {
    const body = document.getElementById('tracklist-body');
    body.innerHTML = tracks.map((t, i) => `
      <div class="track-row${i === currentIdx ? ' playing' : ''}" id="track-row-${i}" onclick="playByIdx(${i})">
        <div class="track-num">${i === currentIdx && isPlaying ? `<div class="bars playing" style="margin:auto"><span></span><span></span><span></span></div>` : (i + 1)}</div>
        <div class="track-main">
          <div class="track-mini-art" style="background:${t.bg};">${t.emoji}</div>
          <div>
            <div class="track-title">${t.title}</div>
            <div class="track-artist-name">${t.artist}</div>
          </div>
        </div>
        <div class="track-album-name">${t.album}</div>
        <div class="track-dur">${t.dur}</div>
        <div class="track-like${likedTracks.has(i) ? ' liked' : ''}" onclick="event.stopPropagation(); toggleLike(${i})" id="like-${i}">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>
    `).join('');
  }

  function updatePlayer() {
    const t = tracks[currentIdx];
    document.getElementById('now-art').textContent = t.emoji;
    document.getElementById('now-art').style.background = t.bg;
    document.getElementById('now-title').textContent = t.title;
    document.getElementById('now-artist').textContent = t.artist;
    document.getElementById('like-now-btn').className = 'like-now' + (likedTracks.has(currentIdx) ? ' liked' : '');
    renderTracklist();
  }

  function playByIdx(idx) {
    currentIdx = idx;
    elapsed = 0;
    isPlaying = true;
    updatePlayer();
    updatePlayIcon();
    startTimer();
    document.getElementById('prog-fill').style.width = '0%';
    document.getElementById('cur-time').textContent = '0:00';
    document.getElementById('bars').className = 'bars playing';
  }

  function playTrack(title, artist, emoji, bg) {
    const idx = tracks.findIndex(t => t.title === title && t.artist === artist);
    if (idx !== -1) { playByIdx(idx); return; }
    document.getElementById('now-art').textContent = emoji;
    document.getElementById('now-art').style.background = bg;
    document.getElementById('now-title').textContent = title;
    document.getElementById('now-artist').textContent = artist;
    elapsed = 0; isPlaying = true;
    updatePlayIcon();
    startTimer();
    document.getElementById('prog-fill').style.width = '0%';
    document.getElementById('cur-time').textContent = '0:00';
    document.getElementById('bars').className = 'bars playing';
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) startTimer(); else clearInterval(timer);
    updatePlayIcon();
    document.getElementById('bars').className = 'bars' + (isPlaying ? ' playing' : '');
  }

  function updatePlayIcon() {
    document.getElementById('pp-icon').innerHTML = isPlaying
      ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
      : '<path d="M8 5v14l11-7z"/>';
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!isPlaying) return;
      elapsed++;
      if (elapsed > totalSecs) {
        if (repeatOn) { elapsed = 0; } else { nextTrack(); return; }
      }
      const pct = (elapsed / totalSecs * 100).toFixed(2);
      document.getElementById('prog-fill').style.width = pct + '%';
      const m = Math.floor(elapsed / 60);
      const s = elapsed % 60;
      document.getElementById('cur-time').textContent = m + ':' + String(s).padStart(2, '0');
    }, 1000);
  }

  function seek(e) {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    elapsed = Math.round(pct * totalSecs);
    document.getElementById('prog-fill').style.width = (pct * 100).toFixed(2) + '%';
    const m = Math.floor(elapsed / 60), s = elapsed % 60;
    document.getElementById('cur-time').textContent = m + ':' + String(s).padStart(2, '0');
  }

  function nextTrack() {
    let idx = shuffleOn
      ? Math.floor(Math.random() * tracks.length)
      : (currentIdx + 1) % tracks.length;
    playByIdx(idx);
  }

  function prevTrack() {
    if (elapsed > 4) { elapsed = 0; document.getElementById('prog-fill').style.width = '0%'; return; }
    playByIdx((currentIdx - 1 + tracks.length) % tracks.length);
  }

  function toggleShuffle() {
    shuffleOn = !shuffleOn;
    document.getElementById('shuffle-btn').classList.toggle('active', shuffleOn);
  }

  function toggleRepeat() {
    repeatOn = !repeatOn;
    document.getElementById('repeat-btn').classList.toggle('active', repeatOn);
  }

  function toggleLike(idx) {
    if (likedTracks.has(idx)) likedTracks.delete(idx);
    else likedTracks.add(idx);
    const el = document.getElementById('like-' + idx);
    if (el) el.className = 'track-like' + (likedTracks.has(idx) ? ' liked' : '');
    if (idx === currentIdx) {
      document.getElementById('like-now-btn').className = 'like-now' + (likedTracks.has(idx) ? ' liked' : '');
    }
  }

  function toggleLikeNow() {
    toggleLike(currentIdx);
  }

  function selectPlaylist(el) {
    document.querySelectorAll('.playlist-item').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
  }

    function toggleProfileMenu(event) {
      event.stopPropagation();
      const menu = document.getElementById('profile-menu');
      const btn = document.getElementById('profile-btn');
      if (!menu || !btn) return;
      const isOpen = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    }

    function closeProfileMenu() {
      const menu = document.getElementById('profile-menu');
      const btn = document.getElementById('profile-btn');
      if (!menu || !btn) return;
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function handleProfileAction(action) {
      closeProfileMenu();
      if (action === 'profile') {
        alert('Opening profile...');
        return;
      }
      if (action === 'settings') {
        alert('Opening settings...');
        return;
      }
      if (action === 'logout') {
        alert('You are now logged out.');
      }
    }

    function handleNavClick(event) {
      event.preventDefault();
      const item = event.currentTarget;
      document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');

      const navType = item.dataset.nav;
      if (navType === 'home') {
        document.querySelector('.main').scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (navType === 'search') {
        const searchInput = document.querySelector('.search-input');
        searchInput.focus();
        searchInput.select();
        return;
      }
      if (navType === 'library') {
        document.getElementById('library-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (navType === 'liked') {
        document.getElementById('liked-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', handleNavClick);
    });

    document.addEventListener('click', event => {
      const profileWrap = document.querySelector('.profile-wrap');
      if (!profileWrap || profileWrap.contains(event.target)) return;
      closeProfileMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeProfileMenu();
      }
    });

    renderTracklist();


