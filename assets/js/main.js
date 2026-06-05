const btn = document.getElementById('themeBtn');
const icon = document.getElementById('themeIcon');
const label = document.getElementById('themeLabel');
const html = document.documentElement;
const siteNav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-links a');

const saved = localStorage.getItem('theme');
if (saved === 'light') {
  html.classList.add('light');
  icon.textContent = '☾';
  label.textContent = 'dark';
}

btn.addEventListener('click', () => {
  const isLight = html.classList.toggle('light');
  icon.textContent = isLight ? '☾' : '☀';
  label.textContent = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const sections = document.querySelectorAll('#hero, section[id]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      if (id === 'hero') {
        navLinks.forEach((link) => link.classList.remove('active'));
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));
