/* ==========================================================================
   Portfolio Stan Dragt
   Onderdelen: menu (mobiel), projectcarrousel, lightbox, contactformulier.
   ========================================================================== */

/* ---- Instellingen: vul deze twee in ---------------------------------- */

const CONFIG = {
  // Je e-mailadres. Wordt getoond in de contactsectie en gebruikt als
  // terugvaloptie (mailto) zolang er geen formulierdienst is gekoppeld.
  contactEmail: 'standragt71@gmail.com',

  // Endpoint van een formulierdienst, bijvoorbeeld Formspree:
  // 'https://formspree.io/f/xxxxxxxx'. Leeg = mailto-terugval.
  formEndpoint: '',

  // Extra links onder het e-mailadres, bijvoorbeeld:
  // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' }
  links: []
};

/* ---- Projecten -------------------------------------------------------- */

const PROJECTS = [
  {
    title: 'Kabelmanagement',
    meta: 'Landingspagina · Ergowerken · 2026',
    description: 'Dienstpagina met een keuzehulp, een overzicht van alle kabelmanagement-diensten, een kaart van het werkgebied en veelgestelde vragen. Gebouwd tijdens mijn stage bij Ergowerken.',
    thumb: 'images/projects/kabelmanagement.jpg',
    full: 'images/projects/kabelmanagement-full.jpg',
    alt: 'Kabelmanagement-pagina van Ergowerken'
  },
  {
    title: 'Projectinrichting',
    meta: 'Landingspagina · Ergowerken · 2026',
    description: 'Tweede dienstpagina in dezelfde huisstijl, met vier situaties waaruit een bezoeker kiest en een knop voor een intake.',
    thumb: 'images/projects/projectinrichting.jpg',
    full: 'images/projects/projectinrichting-full.jpg',
    alt: 'Projectinrichting-pagina van Ergowerken'
  },
  {
    title: 'Quick Scan',
    meta: 'Landingspagina · Ergowerken · 2026',
    description: 'Pagina voor HR en medewerkers met een gratis DIY quick scan en de optie voor een scan op locatie.',
    thumb: 'images/projects/quickscan.jpg',
    full: 'images/projects/quickscan-full.jpg',
    alt: 'Quick Scan-pagina van Ergowerken'
  },
  {
    title: 'Wijkraad Heusdenhout',
    meta: 'Website · schoolopdracht · 2025',
    description: 'Website voor een wijkraad met home, nieuws, over ons, meldpunt en contact. Eigen structuur en navigatie over vijf pagina’s.',
    thumb: 'images/projects/wijkraad.jpg',
    full: 'images/projects/wijkraad-full.jpg',
    alt: 'Homepagina van de website voor Wijkraad Heusdenhout'
  },
  {
    title: 'Steam Deck',
    meta: 'Productpagina · schoolopdracht · 2025',
    description: 'Productpagina met een grote video-hero, specificaties en een bestelknop.',
    thumb: 'images/projects/steamdeck.jpg',
    full: 'images/projects/steamdeck-full.jpg',
    alt: 'Steam Deck productpagina'
  },
  {
    title: 'Xbox controller',
    meta: 'Productpagina · schoolopdracht · 2025',
    description: 'Productpagina met galerij, technische specificaties en een light/dark-toggle.',
    thumb: 'images/projects/xbox.jpg',
    full: 'images/projects/xbox-full.jpg',
    alt: 'Xbox controller productpagina'
  }
];

const pad = (n) => String(n).padStart(2, '0');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Menu (mobiel) ---------------------------------------------------- */

function initNav() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');

  // De hero vult het scherm minus de vaste header; geef de CSS de echte hoogte.
  function setHeaderHeight() {
    if (header) document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('is-open', !open);
  });

  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }
  });
}

/* ---- Carrousel -------------------------------------------------------- */

function buildCard(project, index) {
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `
    <button class="card-button" type="button" data-index="${index}" aria-label="Bekijk ${project.title} op volledige grootte">
      <span class="card-media">
        <img src="${project.thumb}" alt="${project.alt}" loading="lazy" width="1280" height="800">
        <span class="card-zoom" aria-hidden="true">
          <svg class="icon" width="16" height="16" viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </span>
      </span>
      <span class="card-head">
        <span class="card-title">${project.title}</span>
        <span class="card-index">${pad(index + 1)}</span>
      </span>
      <span class="card-meta">${project.meta}</span>
    </button>`;
  return li;
}

function initCarousel(openLightbox) {
  const viewport = document.getElementById('carousel');
  const track = document.getElementById('carousel-track');
  const counter = document.getElementById('carousel-counter');
  const prevButton = document.getElementById('carousel-prev');
  const nextButton = document.getElementById('carousel-next');
  if (!viewport || !track) return;

  const total = PROJECTS.length;
  const SPEED = 36;            // pixels per seconde
  const SNAP_DURATION = 450;   // ms voor een klik op een pijl

  let step = 0;                // breedte van één kaart plus tussenruimte
  let cycle = 0;               // breedte van één volledige reeks kaarten
  let offset = 0;              // huidige verschuiving in pixels
  let paused = false;
  let snap = null;             // { from, to, start } tijdens een pijl-animatie
  let lastTime = null;

  // Kaarten renderen en zo vaak herhalen dat de rij naadloos kan doorlopen.
  function render() {
    track.innerHTML = '';
    PROJECTS.forEach((p, i) => track.appendChild(buildCard(p, i)));
    measure();
    const needed = viewport.clientWidth + cycle;
    let copies = 1;
    while (copies * cycle < needed && copies < 6) {
      PROJECTS.forEach((p, i) => track.appendChild(buildCard(p, i)));
      copies += 1;
    }
  }

  function measure() {
    const first = track.children[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    step = first.getBoundingClientRect().width + gap;
    cycle = step * total;
    if (cycle > 0) offset = ((offset % cycle) + cycle) % cycle;
  }

  function apply() {
    track.style.transform = `translateX(${-offset}px)`;
    if (counter) {
      const current = step > 0 ? Math.floor((offset + step / 2) / step) % total : 0;
      counter.textContent = `${pad(current + 1)} / ${pad(total)}`;
    }
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function frame(now) {
    if (lastTime === null) lastTime = now;
    const dt = Math.min(now - lastTime, 100);
    lastTime = now;

    if (snap) {
      const t = Math.min((now - snap.start) / SNAP_DURATION, 1);
      offset = snap.from + (snap.to - snap.from) * easeOut(t);
      if (t >= 1) { snap = null; offset = ((offset % cycle) + cycle) % cycle; }
    } else if (!paused && !reducedMotion) {
      offset += SPEED * dt / 1000;
      if (offset >= cycle) offset -= cycle;
    }
    apply();
    requestAnimationFrame(frame);
  }

  function snapTo(target) {
    snap = { from: offset, to: target, start: performance.now() };
  }

  prevButton?.addEventListener('click', () => {
    const base = snap ? snap.to : offset;
    snapTo(Math.ceil(base / step - 0.001) * step - step);
  });
  nextButton?.addEventListener('click', () => {
    const base = snap ? snap.to : offset;
    snapTo(Math.floor(base / step + 0.001) * step + step);
  });

  // Pauzeren zodra de muis erboven staat of een kaart focus heeft.
  viewport.addEventListener('mouseenter', () => { paused = true; });
  viewport.addEventListener('mouseleave', () => { paused = false; });
  viewport.addEventListener('focusin', () => { paused = true; });
  viewport.addEventListener('focusout', () => { paused = false; });
  document.addEventListener('visibilitychange', () => { lastTime = null; });

  // Kaart aanklikken opent de lightbox.
  track.addEventListener('click', (event) => {
    const button = event.target.closest('.card-button');
    if (button) openLightbox(Number(button.dataset.index));
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });

  render();
  apply();
  requestAnimationFrame(frame);
}

/* ---- Lightbox --------------------------------------------------------- */

function initLightbox() {
  const dialog = document.getElementById('lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') {
    return (index) => { window.open(PROJECTS[index].full, '_blank'); };
  }

  const title = document.getElementById('lightbox-title');
  const meta = document.getElementById('lightbox-meta');
  const counter = document.getElementById('lightbox-counter');
  const description = document.getElementById('lightbox-description');
  const image = document.getElementById('lightbox-image');
  const scroller = document.getElementById('lightbox-scroll');
  const total = PROJECTS.length;
  let current = 0;
  let lastTrigger = null;

  function show(index) {
    current = ((index % total) + total) % total;
    const p = PROJECTS[current];
    title.textContent = p.title;
    meta.textContent = `${p.meta} · scroll om de hele pagina te zien`;
    counter.textContent = `${pad(current + 1)} / ${pad(total)}`;
    description.textContent = p.description;
    image.src = p.full;
    image.alt = `Volledige pagina: ${p.alt}`;
    scroller.scrollTop = 0;
  }

  function open(index) {
    lastTrigger = document.activeElement;
    show(index);
    dialog.showModal();
    scroller.focus();
  }

  dialog.addEventListener('close', () => {
    image.src = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
  });

  document.getElementById('lightbox-close').addEventListener('click', () => dialog.close());
  document.getElementById('lightbox-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => show(current + 1));

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // Klik op de donkere achtergrond sluit de lightbox.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  return open;
}

/* ---- Contact ---------------------------------------------------------- */

function initContact() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const emailLink = document.querySelector('[data-contact-email]');
  const linkList = document.getElementById('contact-links');
  if (!form) return;

  if (emailLink && CONFIG.contactEmail) {
    emailLink.textContent = CONFIG.contactEmail;
    emailLink.href = `mailto:${CONFIG.contactEmail}`;
  }
  if (linkList) {
    CONFIG.links.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.rel = 'noopener';
      a.target = '_blank';
      li.appendChild(a);
      linkList.appendChild(li);
    });
  }

  function setStatus(text, type) {
    status.textContent = text;
    status.classList.remove('is-success', 'is-error');
    if (type) status.classList.add(type);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    if (CONFIG.formEndpoint) {
      setStatus('Bezig met versturen…');
      try {
        const response = await fetch(CONFIG.formEndpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`Status ${response.status}`);
        form.reset();
        setStatus('Bedankt, je bericht is verstuurd.', 'is-success');
      } catch (error) {
        setStatus('Versturen is niet gelukt. Probeer het later opnieuw of mail direct.', 'is-error');
      }
      return;
    }

    if (CONFIG.contactEmail) {
      const subject = encodeURIComponent(data.get('onderwerp') || 'Bericht via portfolio');
      const body = encodeURIComponent(`${data.get('bericht')}\n\n${data.get('naam')}\n${data.get('email')}`);
      window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
      setStatus('Je mailprogramma wordt geopend met het bericht.', 'is-success');
      return;
    }

    setStatus('Het formulier is nog niet gekoppeld aan een e-mailadres.', 'is-error');
  });
}

/* ---- Animaties bij scrollen ------------------------------------------ */

function initReveal() {
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  // Alles wat moet infaden: per sectie eerst de kop, dan de inhoud.
  document.querySelectorAll('main .section:not(.over)').forEach((section) => {
    const head = section.querySelector('.section-head');
    const blocks = section.querySelectorAll('.two-col > *, .carousel, .werk .note');
    if (head) { head.classList.add('reveal'); }
    blocks.forEach((block, i) => {
      block.classList.add('reveal');
      block.style.setProperty('--delay', `${0.12 + i * 0.12}s`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Ligt het element al boven het scherm (bijvoorbeeld na een sprong via
      // het menu), toon het dan direct zonder animatie.
      if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
        entry.target.classList.add('is-visible', 'reveal--instant');
        observer.unobserve(entry.target);
        return;
      }
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Vangnet bij scrollen: alles wat boven het scherm ligt wordt direct zichtbaar.
  let revealTick = false;
  window.addEventListener('scroll', () => {
    if (revealTick) return;
    revealTick = true;
    requestAnimationFrame(() => {
      revealTick = false;
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-visible', 'reveal--instant');
      });
      document.querySelectorAll('.over:not(.is-visible), .skills:not(.is-visible)').forEach((section) => {
        if (section.getBoundingClientRect().bottom < 0) {
          section.classList.add('is-visible', 'reveal--instant');
          section.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible', 'reveal--instant'));
        }
      });
    });
  }, { passive: true });

  // De vaardigheidsbalken vullen zich als de sectie in beeld komt.
  const skills = document.querySelector('.skills');
  if (skills) observer.observe(skills);

  // De Over-sectie: achtergrond, foto en tekst verschijnen allemaal tegelijk,
  // pas als de sectie volledig in beeld is. Is de sectie hoger dan het scherm
  // (telefoon), dan geldt: zoveel als past.
  const over = document.querySelector('.over');
  if (over) {
    const parts = over.querySelectorAll('.over-grid > *');
    parts.forEach((part) => part.classList.add('reveal'));

    const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
    const fits = (window.innerHeight - headerH) / over.offsetHeight;
    const rootMargin = `-${headerH}px 0px 0px 0px`;

    // Eén keer omslaan zodra een deel van de sectie in beeld is.
    function once(threshold, action) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          action();
          io.disconnect();
        });
      }, { threshold: Math.min(threshold, Math.max(0.15, fits * threshold)), rootMargin });
      io.observe(over);
    }

    // Achtergrond: al bij ongeveer 40 procent in beeld.
    once(0.4, () => over.classList.add('is-visible'));
    // Foto en tekst: pas bij ongeveer 80 procent in beeld.
    once(0.8, () => parts.forEach((part) => part.classList.add('is-visible')));
  }
}

/* ---- Parallax op de hero-collage ------------------------------------- */

function initParallax() {
  const visual = document.querySelector('.hero-visual');
  if (!visual || reducedMotion) return;

  const desktop = window.matchMedia('(min-width: 801px)');
  let ticking = false;

  function update() {
    ticking = false;
    if (!desktop.matches) {
      visual.classList.remove('has-parallax');
      visual.style.removeProperty('--parallax');
      return;
    }
    const rect = visual.getBoundingClientRect();
    if (rect.bottom < 0) return;
    visual.classList.add('has-parallax');
    // Het beeld beweegt op ongeveer een vijfde van de scrollsnelheid mee,
    // begrensd zodat er geen rand van het kader zichtbaar wordt.
    const shift = Math.min(window.scrollY * 0.18, rect.height * 0.16);
    visual.style.setProperty('--parallax', `${shift}px`);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ---- Start ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  const openLightbox = initLightbox();
  initCarousel(openLightbox);
  initContact();
  initReveal();
  initParallax();
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
