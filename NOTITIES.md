# Portfolio Stan Dragt · notities voor later

Korte handleiding om de site zelf bij te werken.

## Online zetten (GitHub Pages)

- Live adres: https://standemanonoman.github.io/portfolio-2026/
- Repository: https://github.com/StanDeManOnoMan/portfolio-2026
- Elke push naar de branch `main` wordt binnen een paar minuten automatisch gepubliceerd.

Wijzigingen publiceren vanuit deze map (Git zit bij Laragon, open de Laragon-terminal
of voeg `C:\laragon\bin\git\cmd` toe aan je PATH):

```
git add -A
git commit -m "Korte omschrijving van wat je veranderde"
git push
```

Wil je liever klikken dan typen: GitHub Desktop (desktop.github.com) kan deze map
openen via "Add local repository" en doet hetzelfde met knoppen.

Het oude portfolio staat nog op https://standemanonoman.github.io/portfolio/ in de
repository `portfolio`. Die kun je op GitHub archiveren of verwijderen als je hem niet
meer nodig hebt.

## Nog invullen

1. **Contact** · `script.js`, bovenin het blok `CONFIG`
   - `contactEmail`: standragt68@gmail.com, staat ingevuld. Verschijnt in de contactsectie.
   - `formEndpoint`: het Formspree-formulier staat ingevuld. Berichten komen direct in je
     Gmail. Beheer (limiet, spamfilter, ontvanger wijzigen): https://formspree.io, inloggen
     met standragt68@gmail.com. Gratis tot 50 berichten per maand.
   - `links`: nog leeg. Bijvoorbeeld `{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/...' }`.

2. **Deelvoorbeeld** · `index.html`, in de `<head>`
   Na publicatie: vervang `images/hero.jpg` in de `og:image`-regel door de volledige URL,
   bijvoorbeeld `https://jouwdomein.nl/images/hero.jpg`. Anders tonen WhatsApp en LinkedIn
   geen afbeelding bij je link.

3. **Foto in de Over-sectie** · `index.html`, blok `portrait`
   Staat nu tijdelijk op "Foto volgt". Zet je nieuwe foto als `images/portret.jpg`
   (verhouding 660 × 780, staand) en zet de `<img>`-regel terug die in het commentaar
   in `index.html` staat. Het oude bestand `portret.jpg` staat nog in `images/`.

4. **Teksten controleren**
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
