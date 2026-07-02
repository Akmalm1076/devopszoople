/* ======================================
   Portfolio JavaScript
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      navToggle.setAttribute(
        'aria-expanded',
        navMobile.classList.contains('open')
      );
    });

    // Close mobile nav on link click
    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Fade-in on scroll (Intersection Observer) ----
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    // Fallback: show all immediately
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ---- Contact form handling ----
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple client-side validation feedback
      const name = form.querySelector('#form-name').value.trim();
      const email = form.querySelector('#form-email').value.trim();
      const message = form.querySelector('#form-message').value.trim();

      if (!name || !email || !message) {
        return;
      }

      // Simulate form submission
      formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      formStatus.classList.add('success');
      form.reset();

      setTimeout(() => {
        formStatus.classList.remove('success');
        formStatus.style.display = 'none';
      }, 5000);
    });
  }
});
