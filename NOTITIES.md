# Portfolio Stan Dragt · notities voor later

Korte handleiding om de site zelf bij te werken.

## Nog invullen

1. **E-mailadres en links** · `script.js`, bovenin het blok `CONFIG`
   - `contactEmail`: je e-mailadres. Verschijnt in de contactsectie. Het formulier opent
     dan het mailprogramma van de bezoeker met het bericht ingevuld.
   - `formEndpoint`: wil je berichten direct in je mailbox zonder mailprogramma? Maak een
     gratis account op formspree.io, maak een formulier en plak hier de URL
     (`https://formspree.io/f/xxxxxxxx`).
   - `links`: bijvoorbeeld `{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' }`.

2. **Deelvoorbeeld** · `index.html`, in de `<head>`
   Na publicatie: vervang `images/hero.jpg` in de `og:image`-regel door de volledige URL,
   bijvoorbeeld `https://jouwdomein.nl/images/hero.jpg`. Anders tonen WhatsApp en LinkedIn
   geen afbeelding bij je link.

3. **Teksten controleren**
   - Hero-intro en Over-tekst: `index.html`.
   - Tekst bij vaardigheden: `index.html`, klasse `skills-intro`.
   - Projecttoelichtingen: `script.js`, lijst `PROJECTS`, veld `description`.

## Project toevoegen

1. Maak twee screenshots van de pagina op 1280 pixels breed:
   - bovenkant (voor de kaart): `images/projects/naam.jpg`
   - volledige pagina (voor de lightbox): `images/projects/naam-full.jpg`
2. Voeg in `script.js` een blok toe aan de lijst `PROJECTS` (kopieer een bestaand blok).
3. Wil je het project ook in de hero-collage? Voeg het toe in `images/hero-src/hero.html`
   en maak een nieuwe screenshot van dat bestand op 1600 × 1200 als `images/hero.jpg`.

## Cache

Achter `style.css`, `script.js` en de afbeeldingen in `index.html` staat `?v=…`.
Hoog dat nummer op na een wijziging, dan laadt de browser van bezoekers de nieuwe versie.

## Kleuren en lettertypes

Alles staat bovenin `style.css` in `:root`. Accentkleur: `--accent` (#2f5bff).
Koppen: Bricolage Grotesque. Tekst: Instrument Sans. Beide via Google Fonts in `index.html`.

## Animaties

- Hero-intro, infaden per sectie, vullende balken en parallax staan in `style.css` onder
  "Animaties" en in `script.js` bij `initReveal` en `initParallax`.
- De Over-sectie kleurt in bij ongeveer 40% in beeld, de inhoud verschijnt bij 80%.
  Percentages en snelheden: `script.js` (`once(0.4, …)`, `once(0.8, …)`) en `style.css`
  (`.js .over`, `.js .over .reveal.is-visible`).
- Alles staat uit voor bezoekers met "minder beweging" in hun systeeminstellingen.
