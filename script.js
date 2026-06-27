/* ==========================================================================
   PORTFOLIO SCRIPT
   Small, dependency-free interactions only:
   1. Mobile navigation toggle
   2. Active link highlighting while scrolling
   3. Footer year
   4. Contact form (frontend-only demo handler — see notes below)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MOBILE NAVIGATION ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });

  // Close the mobile menu after tapping a link
  nav.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- 2. ACTIVE LINK HIGHLIGHTING ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- 3. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 4. CONTACT FORM ----------
     This is a frontend-only demo: it validates the fields and shows a
     status message, but it does NOT send an email anywhere yet.

     To make it actually deliver messages, pick ONE option below:

     OPTION A — Formspree (easiest):
       1. Create a free form at https://formspree.io and copy your endpoint,
          e.g. https://formspree.io/f/yourFormId
       2. Paste that URL into FORM_ENDPOINT below. That's it — the fetch()
          handler already sends JSON with an Accept: application/json header,
          which Formspree understands.

     OPTION B — EmailJS (send straight from the browser):
       1. Add the EmailJS SDK script tag in index.html.
       2. Replace the fetch() call below with:
          emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')

     OPTION C — Your own backend API:
       1. Replace the FORM_ENDPOINT constant below with your API URL.
       2. Make sure your server accepts a POST with JSON { name, email, message }
          and responds with a 2xx status on success.
  -------------------------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // EDIT: set this once you have a real endpoint (Formspree/EmailJS/your API)
  const FORM_ENDPOINT = ''; // e.g. 'https://formspree.io/f/yourFormId'

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please fill in every field before sending.';
        return;
      }

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };

      if (!FORM_ENDPOINT) {
        // Demo mode: no endpoint configured yet.
        status.textContent = `Thanks, ${data.name}! Connect a form service (see script.js comments) to actually deliver this message.`;
        form.reset();
        return;
      }

      try {
        status.textContent = 'Sending...';
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          status.textContent = 'Message sent — thank you! I will get back to you soon.';
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please try emailing me directly.';
        }
      } catch (err) {
        status.textContent = 'Network error. Please try emailing me directly.';
      }
    });
  }

});
