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
   - `links`: GitHub staat erin. LinkedIn toevoegen: haal de `//` weg voor de regel en vul
     je adres in.
   - `cv`: pad naar je cv als PDF, bijvoorbeeld `'cv/stan-dragt-cv.pdf'`. Zet het bestand in
     een map `cv/` in deze map. Zodra dit ingevuld is, verschijnen de knop "Download cv" in
     de hero en de link in de contactsectie vanzelf.

1b. **Live-links bij projecten** · `script.js`, lijst `PROJECTS`, veld `url`
   Vul het adres van de echte pagina in (bijvoorbeeld de Ergowerken-pagina's). Dan krijgt de
   lightbox een knop "Bekijk live". Leeg = geen knop.

1c. **Beschikbaarheid in de hero** · `index.html`, de eerste regel in `hero-text`
   Staat nu op "Nu op stage bij Ergowerken · Breda". Pas de tekst aan als je situatie
   verandert, bijvoorbeeld "Beschikbaar voor stage vanaf september 2027 · Breda".

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
   - optioneel een kleine versie van de bovenkant op 640 breed: `images/projects/naam-640.jpg`
     (veld `thumbSmall`; telefoons laden dan minder). Laat het veld weg als je die niet maakt.
2. Voeg in `script.js` een blok toe aan de lijst `PROJECTS` (kopieer een bestaand blok).
   Kies bij `category` een sleutel uit `CATEGORY_LABELS` (`stage`, `school`, `eigen`).
   De filterknoppen boven de carrousel volgen vanzelf: een categorie die niet gebruikt
   wordt, krijgt geen knop.
3. Wil je het project ook in de hero-collage? Voeg het toe in `images/hero-src/hero.html`
   en maak een nieuwe screenshot van dat bestand op 1600 × 1200 als `images/hero.jpg`.
   Er is ook een donkere versie, `images/hero-dark.jpg`, voor bezoekers met donkere modus:
   dezelfde screenshot, maar met de achtergrond op `#0c0e12` en de randen op `#2a2e38`.

## Donkere modus

Bij het eerste bezoek volgt de site de systeeminstelling van de bezoeker (licht of
donker). Met de ronde knop in de header (maan/zon) wissel je zelf; die keuze wordt in de
browser onthouden (`localStorage`, sleutel `theme`).

Alle kleuren staan als variabelen bovenin `style.css`: eerst de lichte set in `:root`,
daaronder de donkere set in `:root[data-theme="dark"]`. Wil je een kleur aanpassen, doe
dat dan in beide sets. Het kiezen van licht of donker gebeurt in het kleine script in de
`<head>` van `index.html` (en van `404.html`), de knop zelf in `initTheme` in `script.js`.
Wil je terug naar "alleen systeem volgen": verwijder de knop uit `index.html`.

## Overige onderdelen

- **404.html**: eigen foutpagina in dezelfde stijl. GitHub Pages pakt hem automatisch op.
  Hij heeft zijn eigen CSS (bewust, zodat hij ook in submappen werkt).
- **Spamval in het formulier**: het verborgen veld `_gotcha`. Mensen zien het niet, bots
  vullen het in; zulke inzendingen worden niet verstuurd (en Formspree negeert ze ook).
- **Gestructureerde gegevens**: het blok `application/ld+json` in de `<head>` van
  `index.html` vertelt Google wie je bent. Pas het aan als je adres of functie verandert.
- **Kleine afbeeldingen voor telefoons**: `images/hero-800.jpg`, `images/hero-dark-800.jpg`
  en `images/projects/*-640.jpg`. Maak je een nieuwe collage, maak dan ook de 800-versie.
- **Swipen in de carrousel**: op telefoon en tablet met een vinger, op desktop door te
  slepen met de muis. Na een swipe glijdt de rij naar de dichtstbijzijnde kaart en wacht
  3 seconden voordat hij weer vanzelf loopt (`HOLD_AFTER_SWIPE` in `script.js`).
- **Terug naar boven**: de ronde knop rechtsonder, verschijnt na ongeveer een halve
  schermhoogte scrollen. Code: `initToTop` in `script.js`, stijl `.to-top` in `style.css`.

## Cache

Achter `style.css`, `script.js` en de afbeeldingen in `index.html` staat `?v=…`.
Hoog dat nummer op na een wijziging, dan laadt de browser van bezoekers de nieuwe versie.

## Schermformaten

- De inhoud is maximaal 1440 pixels breed (`--max` bovenin `style.css`) en staat op grotere
  schermen gecentreerd. De hero-collage loopt wel door tot de rechterrand.
- Op de telefoon (tot 640 pixels) zijn de letters kleiner (onderaan `style.css`, blok
  `@media (max-width: 640px)`) en heeft de hero-collage zijn echte 4:3-verhouding, zodat
  tekst en beeld samen op het eerste scherm passen.
- Omslagpunten: tot 640 pixels telefoon (één kaart), tot 800 pixels tablet staand (twee
  kaarten, menu achter de knop, secties onder elkaar), tot 1100 pixels kleine laptop (twee
  kaarten, smallere kantlijn), daarboven de volledige weergave met drie kaarten.

## Kleuren en lettertypes

Alles staat bovenin `style.css` in `:root`. Accentkleur: `--accent` (#2f5bff).
Koppen: Bricolage Grotesque. Tekst: Instrument Sans. Beide via Google Fonts in `index.html`.

## Animaties

- Hero-intro, infaden per sectie, vullende balken en parallax staan in `style.css` onder
  "Animaties" en in `script.js` bij `initReveal` en `initParallax`.
- De Over-sectie kleurt in bij ongeveer 25% in beeld, de inhoud verschijnt bij 50%.
  Percentages en snelheden: `script.js` (`once(0.25, …)`, `once(0.5, …)`) en `style.css`
  (`.js .over`, `.js .over .reveal.is-visible`).
- De lightbox groeit in 0,7 seconde uit de aangeklikte kaart en krimpt bij het sluiten in
  0,5 seconde terug: `GROW_MS` en `SHRINK_MS` in `script.js` (`initLightbox`).
- De balken bij Vaardigheden vullen zich in 2 seconden, elke volgende balk start 0,2 seconde
  later: `style.css`, regels met `.bar-fill` onder "Animaties".
- Alles staat uit voor bezoekers met "minder beweging" in hun systeeminstellingen.
