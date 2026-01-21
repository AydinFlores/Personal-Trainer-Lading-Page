const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
const links = document.querySelectorAll('.nav-menu a');

if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

links.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.section, .feature, .program, .testimonial, .price-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => {
  item.classList.add('reveal');
  observer.observe(item);
});

const serviceCards = document.querySelectorAll('.service-card');

const openServiceCard = (card) => {
  const content = card.querySelector('.service-details');
  if (!content) return;
  card.setAttribute('open', '');
  content.style.height = '0px';
  content.style.opacity = '0';
  requestAnimationFrame(() => {
    content.style.height = `${content.scrollHeight}px`;
    content.style.opacity = '1';
  });
  const onEnd = (event) => {
    if (event.propertyName !== 'height') return;
    content.style.height = 'auto';
    content.removeEventListener('transitionend', onEnd);
  };
  content.addEventListener('transitionend', onEnd);
};

const closeServiceCard = (card) => {
  const content = card.querySelector('.service-details');
  if (!content || !card.hasAttribute('open')) return;
  content.style.height = `${content.scrollHeight}px`;
  content.style.opacity = '1';
  requestAnimationFrame(() => {
    content.style.height = '0px';
    content.style.opacity = '0';
  });
  const onEnd = (event) => {
    if (event.propertyName !== 'height') return;
    card.removeAttribute('open');
    content.removeEventListener('transitionend', onEnd);
  };
  content.addEventListener('transitionend', onEnd);
};

serviceCards.forEach((card) => {
  const summary = card.querySelector('summary');
  if (!summary) return;
  summary.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = card.hasAttribute('open');
    serviceCards.forEach((other) => {
      if (other !== card) {
        closeServiceCard(other);
      }
    });
    if (isOpen) {
      closeServiceCard(card);
    } else {
      openServiceCard(card);
    }
  });
  card.addEventListener('click', (event) => {
    if (event.target.closest('summary')) return;
    const isOpen = card.hasAttribute('open');
    serviceCards.forEach((other) => {
      if (other !== card) {
        closeServiceCard(other);
      }
    });
    if (isOpen) {
      closeServiceCard(card);
    } else {
      openServiceCard(card);
    }
  });
});
