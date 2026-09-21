/* ==========================================================================
   Portfolio Stan Dragt
   Onderdelen: menu (mobiel), projectcarrousel, lightbox, contactformulier.
   ========================================================================== */

/* ---- Instellingen: vul deze twee in ---------------------------------- */

const CONFIG = {
  // Je e-mailadres. Wordt getoond in de contactsectie en gebruikt als
  // terugvaloptie (mailto) zolang er geen formulierdienst is gekoppeld.
  contactEmail: 'standragt68@gmail.com',

  // Endpoint van een formulierdienst, bijvoorbeeld Formspree:
  // 'https://formspree.io/f/xxxxxxxx'. Leeg = mailto-terugval.
  formEndpoint: 'https://formspree.io/f/mvkggwpz',

  // Pad naar je cv als PDF, bijvoorbeeld 'cv/stan-dragt-cv.pdf'.
  // Leeg = de downloadknoppen (hero en contact) blijven verborgen.
  cv: '',

  // Extra links onder het e-mailadres. Voeg toe wat je hebt.
  links: [
    { label: 'GitHub', href: 'https://github.com/StanDeManOnoMan' }
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' }
  ]
};

/* ---- Projecten -------------------------------------------------------- */

// Filterknoppen boven de carrousel. De sleutel (links) gebruik je bij
// `category` per project, de tekst (rechts) staat op de knop.
const CATEGORY_LABELS = {
  stage: 'Stage',
  school: 'School',
  eigen: 'Eigen werk'
};

// Per project:
//   category  sleutel uit CATEGORY_LABELS
//   url       live adres van de pagina. Leeg = geen "Bekijk live"-knop in de lightbox.

const PROJECTS = [
  {
    title: 'Kabelmanagement',
    meta: 'Landingspagina · Ergowerken · 2026',
    description: 'Dienstpagina met een keuzehulp, een overzicht van alle kabelmanagement-diensten, een kaart van het werkgebied en veelgestelde vragen. Gebouwd tijdens mijn stage bij Ergowerken.',
    thumb: 'images/projects/kabelmanagement.jpg',
    full: 'images/projects/kabelmanagement-full.jpg',
    alt: 'Kabelmanagement-pagina van Ergowerken',
    category: 'stage',
    url: ''
  },
  {
    title: 'Projectinrichting',
    meta: 'Landingspagina · Ergowerken · 2026',
    description: 'Tweede dienstpagina in dezelfde huisstijl, met vier situaties waaruit een bezoeker kiest en een knop voor een intake.',
    thumb: 'images/projects/projectinrichting.jpg',
    full: 'images/projects/projectinrichting-full.jpg',
    alt: 'Projectinrichting-pagina van Ergowerken',
    category: 'stage',
    url: ''
  },
  {
    title: 'Quick Scan',
    meta: 'Landingspagina · Ergowerken · 2026',
    description: 'Pagina voor HR en medewerkers met een gratis DIY quick scan en de optie voor een scan op locatie.',
    thumb: 'images/projects/quickscan.jpg',
    full: 'images/projects/quickscan-full.jpg',
    alt: 'Quick Scan-pagina van Ergowerken',
    category: 'stage',
    url: ''
  },
  {
    title: 'Wijkraad Heusdenhout',
    meta: 'Website · schoolopdracht · 2025',
    description: 'Website voor een wijkraad met home, nieuws, over ons, meldpunt en contact. Eigen structuur en navigatie over vijf pagina’s.',
    thumb: 'images/projects/wijkraad.jpg',
    full: 'images/projects/wijkraad-full.jpg',
    alt: 'Homepagina van de website voor Wijkraad Heusdenhout',
    category: 'school',
    url: ''
  },
  {
    title: 'Steam Deck',
    meta: 'Productpagina · schoolopdracht · 2025',
    description: 'Productpagina met een grote video-hero, specificaties en een bestelknop.',
    thumb: 'images/projects/steamdeck.jpg',
    full: 'images/projects/steamdeck-full.jpg',
    alt: 'Steam Deck productpagina',
    category: 'school',
    url: ''
  },
  {
    title: 'Xbox controller',
    meta: 'Productpagina · schoolopdracht · 2025',
    description: 'Productpagina met galerij, technische specificaties en een light/dark-toggle.',
    thumb: 'images/projects/xbox.jpg',
    full: 'images/projects/xbox-full.jpg',
    alt: 'Xbox controller productpagina',
    category: 'school',
    url: ''
  }
];

// De projecten die op dit moment in de carrousel staan (na filteren).
let activeProjects = PROJECTS.slice();

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
        <img src="${project.thumb}" alt="${project.alt}" loading="lazy" width="1280" height="800" draggable="false">
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

  const SPEED = 36;            // pixels per seconde
  const SNAP_DURATION = 450;   // ms voor een klik op een pijl

  let step = 0;                // breedte van één kaart plus tussenruimte
  let cycle = 0;               // breedte van één volledige reeks kaarten
  let offset = 0;              // huidige verschuiving in pixels
  let paused = false;
  let snap = null;             // { from, to, start } tijdens een pijl-animatie
  let lastTime = null;
  let drag = null;             // { id, startX, startOffset, moved } tijdens swipen
  let holdUntil = 0;           // na een swipe even stil blijven staan
  let justDragged = false;     // voorkomt dat een swipe als klik telt

  const total = () => activeProjects.length;

  // Kaarten renderen en zo vaak herhalen dat de rij naadloos kan doorlopen.
  function render() {
    track.innerHTML = '';
    activeProjects.forEach((p, i) => track.appendChild(buildCard(p, i)));
    measure();
    const needed = viewport.clientWidth + cycle;
    let copies = 1;
    while (cycle > 0 && copies * cycle < needed && copies < 8) {
      activeProjects.forEach((p, i) => track.appendChild(buildCard(p, i)));
      copies += 1;
    }
  }

  function measure() {
    const first = track.children[0];
    if (!first) { step = 0; cycle = 0; return; }
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    step = first.getBoundingClientRect().width + gap;
    cycle = step * total();
    if (cycle > 0) offset = ((offset % cycle) + cycle) % cycle;
  }

  function apply() {
    track.style.transform = `translateX(${-offset}px)`;
    if (counter) {
      const n = total();
      const current = step > 0 && n > 0 ? Math.floor((offset + step / 2) / step) % n : 0;
      counter.textContent = `${pad(n ? current + 1 : 0)} / ${pad(n)}`;
    }
  }

  // Na een filterwissel: opnieuw opbouwen en vooraan beginnen.
  function refresh() {
    snap = null;
    offset = 0;
    render();
    apply();
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
    } else if (!paused && !drag && now >= holdUntil && !reducedMotion) {
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

  // Swipen met een vinger (of slepen met de muis). Verticaal scrollen blijft
  // van de browser dankzij touch-action: pan-y in de CSS.
  const HOLD_AFTER_SWIPE = 3000;   // ms stilstaan na een swipe
  const DRAG_THRESHOLD = 8;        // pixels voordat een tik een swipe wordt

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag = { id: event.pointerId, startX: event.clientX, startOffset: snap ? snap.to : offset, moved: false };
    snap = null;
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.moved = true;
      viewport.classList.add('is-dragging');
      try { viewport.setPointerCapture(event.pointerId); } catch (e) { /* niet ondersteund */ }
    }
    offset = drag.startOffset - dx;
    if (cycle > 0) offset = ((offset % cycle) + cycle) % cycle;
  });

  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    const moved = drag.moved;
    drag = null;
    viewport.classList.remove('is-dragging');
    if (!moved) return;
    // Naar de dichtstbijzijnde kaart glijden en daarna even wachten.
    if (step > 0) snapTo(Math.round(offset / step) * step);
    holdUntil = performance.now() + HOLD_AFTER_SWIPE;
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 100);
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  // Kaart aanklikken opent de lightbox (niet na een swipe).
  track.addEventListener('click', (event) => {
    if (justDragged) { event.preventDefault(); return; }
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

  return refresh;
}

/* ---- Filter boven de carrousel --------------------------------------- */

function initFilters(refreshCarousel) {
  const holder = document.getElementById('filters');
  if (!holder) return;

  // Categorieën in de volgorde waarin ze in PROJECTS voorkomen.
  const keys = [];
  PROJECTS.forEach((p) => {
    if (p.category && !keys.includes(p.category)) keys.push(p.category);
  });
  // Met maar één soort werk heeft filteren geen zin.
  if (keys.length < 2) { holder.hidden = true; return; }

  const options = [{ key: 'alles', label: 'Alles' }]
    .concat(keys.map((key) => ({ key, label: CATEGORY_LABELS[key] || key })));

  options.forEach((option, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter';
    button.dataset.filter = option.key;
    button.setAttribute('aria-pressed', String(i === 0));
    button.textContent = option.label;
    holder.appendChild(button);
  });

  holder.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    holder.querySelectorAll('.filter').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    const key = button.dataset.filter;
    activeProjects = key === 'alles' ? PROJECTS.slice() : PROJECTS.filter((p) => p.category === key);
    refreshCarousel();
  });
}

/* ---- Lightbox --------------------------------------------------------- */

function initLightbox() {
  const dialog = document.getElementById('lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') {
    return (index) => { window.open(activeProjects[index].full, '_blank'); };
  }

  const title = document.getElementById('lightbox-title');
  const meta = document.getElementById('lightbox-meta');
  const counter = document.getElementById('lightbox-counter');
  const description = document.getElementById('lightbox-description');
  const image = document.getElementById('lightbox-image');
  const scroller = document.getElementById('lightbox-scroll');
  const live = document.getElementById('lightbox-live');
  let current = 0;
  let lastTrigger = null;

  function show(index) {
    const total = activeProjects.length;
    current = ((index % total) + total) % total;
    const p = activeProjects[current];
    title.textContent = p.title;
    meta.textContent = `${p.meta} · scroll om de hele pagina te zien`;
    counter.textContent = `${pad(current + 1)} / ${pad(total)}`;
    description.textContent = p.description;
    image.src = p.full;
    image.alt = `Volledige pagina: ${p.alt}`;
    scroller.scrollTop = 0;
    // Knop naar de echte pagina, alleen als er een adres is ingevuld.
    if (live) {
      live.hidden = !p.url;
      live.href = p.url || '#';
    }
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
    const extra = CONFIG.links.slice();
    if (CONFIG.cv) extra.push({ label: 'Download cv (PDF)', href: CONFIG.cv, download: true });
    extra.forEach((link) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      if (link.download) {
        a.setAttribute('download', '');
      } else {
        a.rel = 'noopener';
        a.target = '_blank';
      }
      li.appendChild(a);
      linkList.appendChild(li);
    });
  }

  // Cv-knop in de hero: alleen tonen als er een bestand is ingesteld.
  const cvButton = document.querySelector('[data-cv]');
  if (cvButton && CONFIG.cv) {
    cvButton.href = CONFIG.cv;
    cvButton.hidden = false;
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
    const blocks = section.querySelectorAll('.two-col > *, .filters, .carousel, .werk .note');
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

    // Achtergrond: al bij ongeveer 25 procent in beeld.
    once(0.25, () => over.classList.add('is-visible'));
    // Foto en tekst: bij ongeveer 50 procent in beeld.
    once(0.5, () => parts.forEach((part) => part.classList.add('is-visible')));
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

/* ---- Licht / donker ---------------------------------------------------- */

// De eerste keuze (systeem of onthouden) maakt het scriptje in de <head> van
// index.html, vóór het tekenen. Hier alleen de knop en het onthouden.
function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const heroSource = document.getElementById('hero-dark-source');
  const meta = document.getElementById('theme-color');
  const system = window.matchMedia('(prefers-color-scheme: dark)');

  function apply(theme) {
    root.dataset.theme = theme;
    if (heroSource) heroSource.media = theme === 'dark' ? 'all' : 'not all';
    if (meta) meta.content = theme === 'dark' ? '#12141a' : '#f7f7f8';
    if (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Schakel naar lichte weergave' : 'Schakel naar donkere weergave');
    }
  }

  apply(root.dataset.theme || (system.matches ? 'dark' : 'light'));

  // Wisselen zonder dat kleurovergangen (zoals de trage achtergrond van de
  // Over-sectie) meelopen: overgangen twee frames uitzetten en dan weer aan.
  function switchTo(theme) {
    root.classList.add('theme-switching');
    apply(theme);
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
  }

  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    switchTo(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* privémodus: niet onthouden */ }
  });

  // Zolang er geen eigen keuze is gemaakt, volgt de site het systeem live mee.
  system.addEventListener('change', (event) => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (!saved) switchTo(event.matches ? 'dark' : 'light');
  });
}

/* ---- Terug naar boven ------------------------------------------------- */

function initToTop() {
  const button = document.getElementById('to-top');
  if (!button) return;

  let ticking = false;
  function update() {
    ticking = false;
    // Verschijnt zodra de hero grotendeels uit beeld is.
    button.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
}

/* ---- Start ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  const openLightbox = initLightbox();
  const refreshCarousel = initCarousel(openLightbox);
  initFilters(refreshCarousel);
  initContact();
  initReveal();
  initParallax();
  initToTop();
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
