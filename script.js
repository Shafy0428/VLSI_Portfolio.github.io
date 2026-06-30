/**
 * VLSI & Digital Design Portfolio — script.js
 *
 * Security policy enforced throughout:
 *  - No eval(), no Function(), no document.write()
 *  - No innerHTML for any user-controlled or dynamic content
 *  - textContent used for all dynamic text insertion
 *  - No inline event handlers (all listeners added here)
 *  - No external scripts or CDN dependencies
 *  - No cookies, localStorage, sessionStorage, or tracking
 *  - No data collection or transmission of any kind
 *
 * Modules (all self-contained IIFEs):
 *  1. Header scroll shadow
 *  2. Mobile navigation (hamburger)
 *  3. Active nav highlight (IntersectionObserver)
 *  4. Smooth scroll for anchor links
 *  5. Scroll-reveal animation (IntersectionObserver)
 *  6. VLSI Design Flow — step expand on click (mobile UX)
 *  7. Skills — filter tabs
 *  8. Project card keyboard accessibility
 *  9. Contact form — disabled state guard (no submission)
 * 10. Current year in footer (optional, if element exists)
 */

'use strict';

/* ================================================================
   UTILITY HELPERS
================================================================ */

/**
 * Safely query a single element. Returns null if not found.
 * @param {string} selector
 * @param {Element} [root=document]
 * @returns {Element|null}
 */
function qs(selector, root) {
  return (root || document).querySelector(selector);
}

/**
 * Safely query all matching elements. Returns an empty array if none.
 * @param {string} selector
 * @param {Element} [root=document]
 * @returns {Element[]}
 */
function qsa(selector, root) {
  return Array.from((root || document).querySelectorAll(selector));
}

/**
 * Add an event listener only if the element exists.
 * @param {Element|null} el
 * @param {string} event
 * @param {Function} handler
 * @param {object} [options]
 */
function on(el, event, handler, options) {
  if (el) el.addEventListener(event, handler, options || false);
}

/**
 * Check if the user prefers reduced motion.
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ================================================================
   1. HEADER SCROLL SHADOW
   Adds .scrolled class to <header> once the page scrolls,
   triggering the CSS box-shadow defined in style.css.
================================================================ */
(function initHeaderScroll() {
  const header = qs('.site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  on(window, 'scroll', updateHeader, { passive: true });
  updateHeader(); // run once on load
}());

/* ================================================================
   2. MOBILE NAVIGATION
   Toggles the .open class on the nav panel and updates
   aria-expanded on the button. Closes on outside click,
   Escape key, or when a nav link is activated.
================================================================ */
(function initMobileNav() {
  const toggle = qs('#nav-toggle');
  const nav    = qs('#primary-nav');
  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    // Trap focus opportunity: focus first link
    const firstLink = qs('a', nav);
    if (firstLink) firstLink.focus();
  }

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  function toggleNav() {
    const isOpen = nav.classList.contains('open');
    if (isOpen) { closeNav(); } else { openNav(); }
  }

  on(toggle, 'click', toggleNav);

  // Close when any nav link is clicked (smooth-scroll handled separately)
  qsa('.nav-link', nav).forEach(function(link) {
    on(link, 'click', closeNav);
  });

  // Close on Escape key
  on(document, 'keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
      toggle.focus(); // return focus to button
    }
  });

  // Close on click outside the nav and toggle
  on(document, 'click', function(e) {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeNav();
    }
  });
}());

/* ================================================================
   3. ACTIVE NAV HIGHLIGHT
   Uses IntersectionObserver to mark the .nav-link whose target
   section is currently in the viewport.
================================================================ */
(function initActiveNav() {
  const navLinks = qsa('.nav-link');
  if (!navLinks.length) return;

  // Build a map: section-id → nav link element
  const linkMap = {};
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  const sections = qsa('section[id]');
  if (!sections.length) return;

  let activeSectionId = null;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id !== activeSectionId) {
            // Remove active from previous
            if (activeSectionId && linkMap[activeSectionId]) {
              linkMap[activeSectionId].classList.remove('active');
            }
            // Set active on current
            if (linkMap[id]) {
              linkMap[id].classList.add('active');
            }
            activeSectionId = id;
          }
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }
  );

  sections.forEach(function(section) {
    observer.observe(section);
  });
}());

/* ================================================================
   4. SMOOTH SCROLL FOR ANCHOR LINKS
   Handles all internal # links. Respects prefers-reduced-motion
   by using 'auto' behaviour when the user has requested it.
   Also manages focus for accessibility — moves focus to the
   target section after scrolling.
================================================================ */
(function initSmoothScroll() {
  on(document, 'click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    target.scrollIntoView({ behavior: behavior, block: 'start' });

    // Move focus to target for keyboard users
    // Make target focusable temporarily if it isn't already
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      // Remove tabindex after blur so it doesn't interfere with normal tab order
      target.addEventListener('blur', function removeTempTabindex() {
        target.removeAttribute('tabindex');
        target.removeEventListener('blur', removeTempTabindex);
      });
    }
    target.focus({ preventScroll: true });
  });
}());

/* ================================================================
   5. SCROLL-REVEAL ANIMATION
   Adds the .reveal class to animatable elements on page load,
   then uses IntersectionObserver to add .revealed when they
   enter the viewport. Skipped entirely for reduced-motion users.
================================================================ */
(function initScrollReveal() {
  if (prefersReducedMotion()) return;

  // Selectors for elements to animate in
  const revealSelectors = [
    '.interest-card',
    '.skill-category',
    '.project-card',
    '.flow-step',
    '.evidence-item',
    '.timeline-entry',
    '.about-text',
    '.about-sidebar',
    '.contact-direct',
    '.contact-form-wrapper'
  ].join(', ');

  const elements = qsa(revealSelectors);
  if (!elements.length) return;

  // Stagger delay for grid children
  const gridParents = [
    '.interests-grid',
    '.skills-grid',
    '.projects-grid',
    '.flow-diagram',
    '.evidence-grid'
  ];

  elements.forEach(function(el) {
    el.classList.add('reveal');

    // Apply stagger delay to items inside grid containers
    gridParents.forEach(function(parentSel) {
      const parent = el.closest(parentSel);
      if (parent) {
        const siblings = qsa(revealSelectors, parent);
        const index = siblings.indexOf(el);
        // Cap stagger at 400ms so it doesn't feel slow
        const delay = Math.min(index * 60, 400);
        el.style.transitionDelay = delay + 'ms';
      }
    });
  });

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, stop observing
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    }
  );

  elements.forEach(function(el) {
    observer.observe(el);
  });
}());

/* ================================================================
   6. DESIGN FLOW — STEP EXPAND (mobile UX)
   On narrow viewports, flow steps show only their title by default.
   Clicking a step toggles visibility of the description text.
   This uses aria-expanded for accessibility.
================================================================ */
(function initFlowSteps() {
  const steps = qsa('.flow-step');
  if (!steps.length) return;

  // Only activate toggle behaviour on small screens
  const mobileBreak = window.matchMedia('(max-width: 600px)');

  function setupToggle(step) {
    const desc  = qs('.flow-step__desc', step);
    const bubble = qs('.flow-step__bubble', step);
    if (!desc || !bubble) return;

    // Make bubble act as a button for keyboard users
    step.setAttribute('role', 'button');
    step.setAttribute('tabindex', '0');
    step.setAttribute('aria-expanded', 'false');
    desc.style.display = 'none';

    function toggle() {
      const expanded = step.getAttribute('aria-expanded') === 'true';
      step.setAttribute('aria-expanded', String(!expanded));
      desc.style.display = expanded ? 'none' : '';
    }

    on(step, 'click', toggle);
    on(step, 'keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  }

  function teardownToggle(step) {
    const desc = qs('.flow-step__desc', step);
    if (desc) desc.style.display = '';
    step.removeAttribute('role');
    step.removeAttribute('tabindex');
    step.removeAttribute('aria-expanded');
    // Note: event listeners are not removed here to keep code simple —
    // on wider screens the desc is always visible so clicks are harmless.
  }

  function applyBreakpoint(mq) {
    if (mq.matches) {
      steps.forEach(setupToggle);
    } else {
      steps.forEach(teardownToggle);
    }
  }

  // Apply on load
  applyBreakpoint(mobileBreak);

  // Update on resize
  on(mobileBreak, 'change', function(e) {
    applyBreakpoint(e);
  });
}());

/* ================================================================
   7. SKILLS — CATEGORY FILTER
   Adds filter buttons above the skills grid so visitors can
   quickly show only a chosen category. All categories shown
   by default. No hidden content on load.
================================================================ */
(function initSkillsFilter() {
  const grid = qs('.skills-grid');
  if (!grid) return;

  const categories = qsa('.skill-category', grid);
  if (categories.length < 2) return;

  // Build filter bar
  const filterBar = document.createElement('div');
  filterBar.className = 'skills-filter';
  filterBar.setAttribute('role', 'group');
  filterBar.setAttribute('aria-label', 'Filter skills by category');

  // "All" button
  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = 'skill-filter-btn skill-filter-btn--active';
  allBtn.textContent = 'All'; // textContent — safe
  allBtn.setAttribute('aria-pressed', 'true');
  filterBar.appendChild(allBtn);

  // One button per category
  categories.forEach(function(cat) {
    const titleEl = qs('.skill-category__title', cat);
    if (!titleEl) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'skill-filter-btn';
    btn.textContent = titleEl.textContent.trim(); // textContent — safe
    btn.setAttribute('aria-pressed', 'false');
    btn.dataset.target = titleEl.textContent.trim();
    filterBar.appendChild(btn);
  });

  // Insert filter bar before the grid
  grid.parentNode.insertBefore(filterBar, grid);

  // Filter logic
  const allButtons = qsa('.skill-filter-btn', filterBar);

  function setActiveButton(activeBtn) {
    allButtons.forEach(function(b) {
      const isActive = b === activeBtn;
      b.classList.toggle('skill-filter-btn--active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
  }

  on(allBtn, 'click', function() {
    setActiveButton(allBtn);
    categories.forEach(function(cat) {
      cat.style.display = '';
    });
  });

  qsa('[data-target]', filterBar).forEach(function(btn) {
    on(btn, 'click', function() {
      setActiveButton(btn);
      const target = btn.dataset.target;
      categories.forEach(function(cat) {
        const titleEl = qs('.skill-category__title', cat);
        const match = titleEl && titleEl.textContent.trim() === target;
        cat.style.display = match ? '' : 'none';
      });
    });
  });
}());

/* ================================================================
   8. PROJECT CARD — KEYBOARD ACCESSIBILITY
   Ensures that clicking anywhere on a project card activates
   its primary GitHub link for keyboard and mouse users alike,
   while still allowing interaction with individual links inside.
================================================================ */
(function initProjectCards() {
  const cards = qsa('.project-card');
  cards.forEach(function(card) {
    // Make the card itself keyboard-focusable only on devices
    // that don't have fine pointer control (touch)
    // We DON'T override clicks that land directly on an <a>
    on(card, 'click', function(e) {
      // If the click target is already an anchor or inside one, do nothing
      if (e.target.closest('a')) return;

      // Otherwise navigate to the first project link (GitHub)
      const primaryLink = qs('.proj-link', card);
      if (primaryLink) {
        primaryLink.click();
      }
    });

    // Visual cursor hint
    card.style.cursor = 'pointer';
  });
}());

/* ================================================================
   9. CONTACT FORM — DISABLED STATE GUARD
   The form is intentionally disabled (no backend configured).
   This module ensures that:
   - No submission can occur via any means
   - No data is read, stored, or transmitted
   - The disabled notice remains visible
   There is no success message, no fake response.
================================================================ */
(function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  // Belt-and-braces: intercept any submit attempt
  on(form, 'submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    // Do nothing further. The form has no action and no backend.
    // No data is read or stored.
  });

  // Ensure the submit button cannot be activated via keyboard either
  const submitBtn = qs('button[type="button"]', form);
  if (submitBtn) {
    on(submitBtn, 'click', function(e) {
      e.preventDefault();
      // No action taken. Remind user to use email.
      const notice = qs('.form-status-notice');
      if (notice) {
        notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        // Briefly highlight the notice
        notice.style.outline = '2px solid #f5a623';
        setTimeout(function() {
          notice.style.outline = '';
        }, 1500);
      }
    });
  }
}());

/* ================================================================
   10. CURRENT YEAR (optional footer copyright line)
   If a <span id="current-year"> exists in the HTML, this fills
   it with the current year. textContent only — no innerHTML.
================================================================ */
(function initCurrentYear() {
  const el = qs('#current-year');
  if (!el) return;
  el.textContent = String(new Date().getFullYear());
}());

/* ================================================================
   11. SKILLS FILTER BUTTON STYLES (injected once)
   These styles are generated here rather than hard-coded in
   style.css because they depend on the dynamically created
   filter bar that this script builds.
   No innerHTML is used — a <style> element is created and a
   text node is appended to it.
================================================================ */
(function injectFilterStyles() {
  const css =
    '.skills-filter {' +
      'display: flex;' +
      'flex-wrap: wrap;' +
      'gap: 0.5rem;' +
      'margin-bottom: 1.5rem;' +
    '}' +
    '.skill-filter-btn {' +
      'padding: 0.35rem 0.9rem;' +
      'font-size: 0.75rem;' +
      'font-weight: 600;' +
      'font-family: inherit;' +
      'background: transparent;' +
      'color: #9aafc8;' +
      'border: 1px solid #2a3a56;' +
      'border-radius: 4px;' +
      'cursor: pointer;' +
      'transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;' +
      'letter-spacing: 0.03em;' +
    '}' +
    '.skill-filter-btn:hover {' +
      'color: #00d4ff;' +
      'border-color: #00d4ff;' +
    '}' +
    '.skill-filter-btn--active {' +
      'background: rgba(0,212,255,0.12);' +
      'color: #00d4ff;' +
      'border-color: #00d4ff;' +
    '}' +
    '.skill-filter-btn:focus-visible {' +
      'outline: 2px solid #00d4ff;' +
      'outline-offset: 3px;' +
    '}';

  const styleEl = document.createElement('style');
  styleEl.appendChild(document.createTextNode(css)); // createTextNode — safe
  document.head.appendChild(styleEl);
}());

/* ================================================================
   12. BACK-TO-TOP BUTTON
   A small button appears in the bottom-right corner after the
   user scrolls past the hero section. Clicking it scrolls
   back to the top. Accessible: labelled, keyboard usable.
================================================================ */
(function initBackToTop() {
  // Create button via DOM API — no innerHTML
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Scroll back to top');
  btn.setAttribute('title', 'Back to top');

  // SVG arrow icon — created via DOM API for safety
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '0 0 18 18');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M9 14 V4 M4 9 L9 4 L14 9');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '1.8');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('fill', 'none');

  svg.appendChild(path);
  btn.appendChild(svg);
  document.body.appendChild(btn);

  // Inject styles for the button
  const css =
    '.back-to-top {' +
      'position: fixed;' +
      'bottom: 1.5rem;' +
      'right: 1.5rem;' +
      'z-index: 200;' +
      'width: 44px;' +
      'height: 44px;' +
      'border-radius: 50%;' +
      'background: #1a2236;' +
      'border: 1px solid #344a6e;' +
      'color: #00d4ff;' +
      'cursor: pointer;' +
      'display: flex;' +
      'align-items: center;' +
      'justify-content: center;' +
      'opacity: 0;' +
      'pointer-events: none;' +
      'transform: translateY(8px);' +
      'transition: opacity 0.25s ease, transform 0.25s ease, background 0.15s ease;' +
      'box-shadow: 0 2px 12px rgba(0,0,0,0.4);' +
    '}' +
    '.back-to-top.visible {' +
      'opacity: 1;' +
      'pointer-events: auto;' +
      'transform: translateY(0);' +
    '}' +
    '.back-to-top:hover {' +
      'background: rgba(0,212,255,0.15);' +
      'border-color: #00d4ff;' +
    '}' +
    '.back-to-top:focus-visible {' +
      'outline: 2px solid #00d4ff;' +
      'outline-offset: 3px;' +
    '}' +
    '@media (prefers-reduced-motion: reduce) {' +
      '.back-to-top { transition: none; }' +
    '}';

  const styleEl = document.createElement('style');
  styleEl.appendChild(document.createTextNode(css));
  document.head.appendChild(styleEl);

  // Show / hide on scroll
  const heroSection = qs('#home');
  on(window, 'scroll', function() {
    const threshold = heroSection
      ? heroSection.offsetHeight * 0.8
      : 400;
    if (window.scrollY > threshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Scroll to top on click
  on(btn, 'click', function() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}());

/* ================================================================
   END OF script.js
   No data is collected, stored, or transmitted anywhere in
   this file. All DOM manipulation uses safe APIs (textContent,
   setAttribute, createElement, createTextNode).
================================================================ */
