// ── Copy buttons on all code blocks ──────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.doc-content pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', 'Copy code');

    btn.addEventListener('click', () => {
      const text = code.innerText;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const range = document.createRange();
        range.selectNode(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });

    pre.appendChild(btn);
  });
}

// ── Mobile nav ────────────────────────────────────────────────────────────────
function initMobileNav() {
  // Build the overlay and panel HTML
  const currentPath = window.location.pathname;

  const navHTML = `
    <div class="mobile-nav-overlay" id="mob-overlay"></div>
    <div class="mobile-nav-panel" id="mob-panel">
      <div class="mobile-nav-header">
        <a href="https://switchman.dev" class="mobile-nav-logo">
          <img src="/switchman-logo.svg" width="18" height="18" alt="Switchman">
          switchman docs
        </a>
        <button class="mobile-nav-close" id="mob-close" aria-label="Close menu">&#x2715;</button>
      </div>
      <div class="mobile-nav-section">
        <span class="mobile-nav-label">Start here</span>
        <ul class="mobile-nav-links">
          <li><a href="/getting-started/" class="${currentPath.includes('getting-started') ? 'active' : ''}">Getting started</a></li>
          <li><a href="/claude-code/" class="${currentPath.includes('claude-code') ? 'active' : ''}">Claude Code setup</a></li>
          <li><a href="/cursor/" class="${currentPath.includes('cursor') ? 'active' : ''}">Cursor setup</a></li>
        </ul>
      </div>
      <div class="mobile-nav-section">
        <span class="mobile-nav-label">Core concepts</span>
        <ul class="mobile-nav-links">
          <li><a href="/file-locking/" class="${currentPath.includes('file-locking') ? 'active' : ''}">How file locking works</a></li>
        </ul>
      </div>
      <div class="mobile-nav-section">
        <span class="mobile-nav-label">Reference</span>
        <ul class="mobile-nav-links">
          <li><a href="/command-reference/" class="${currentPath.includes('command-reference') ? 'active' : ''}">Command reference</a></li>
        </ul>
      </div>
      <div class="mobile-nav-section">
        <span class="mobile-nav-label">Pro</span>
        <ul class="mobile-nav-links">
          <li><a href="/pro/" class="${currentPath.includes('/pro/') ? 'active' : ''}">Pro &amp; login guide</a></li>
        </ul>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', navHTML);

  const overlay  = document.getElementById('mob-overlay');
  const panel    = document.getElementById('mob-panel');
  const toggle   = document.getElementById('mob-toggle');
  const closeBtn = document.getElementById('mob-close');

  function openNav() {
    overlay.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  // Close when a nav link is tapped
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeNav);
  });
}

// ── Init on DOM ready ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initMobileNav();
});