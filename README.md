# My Humble Website

Landing page voor My Humble, gebouwd met React, Vite en Tailwind.

## Lokaal starten

```bash
pnpm install
pnpm dev
```

## Productiebuild

```bash
pnpm build
pnpm preview
```

## 1 klik publiceren

Gebruik hiervoor:

- [Publish My Humble.command](/Users/larskeijzer/Documents/Codex/2026-04-17-kan-je-hier-verder-werken-aan/Publish%20My%20Humble.command)

Dubbelklik op dit bestand in Finder. Dan gebeurt automatisch:

1. Een buildcontrole
2. `git add`
3. Een commit met tijdstempel
4. Een push naar GitHub
5. Daarna pakt Vercel de nieuwe versie automatisch op

## Live zetten via Vercel

1. Maak een GitHub repository aan.
2. Push deze projectmap naar GitHub.
3. Maak in Vercel een nieuw project aan en importeer de repository.
4. Controleer de build-instellingen:
   - Build command: `pnpm build`
   - Output directory: `dist`
5. Deploy het project.

## Inzicht in gebruik

De site ondersteunt:

- Google Tag Manager `GTM-W5C7LXT8`, met GA4 via de GTM-container
- Microsoft Clarity-project `wlu4ohzqir`
- UTM-tracking
- event-tracking op quiz, pakketten en contactaanvragen
- Google Consent Mode en Clarity ConsentV2 via dezelfde cookiebanner

Er zijn voor deze integraties geen client-side environment variables nodig. De publieke
container- en project-ID's staan bewust in `index.html`; geheime waarden horen nooit in
een `VITE_`-variabele.

De toestemmingsstatus wordt vóór GTM en Clarity ingesteld door
`public/consent-default.js`. Pas de volgorde van deze scripts niet aan: de
toestemmingsinitialisatie moet als eerste worden uitgevoerd.

Gebruik voor campagnes links zoals:

```text
https://jouwdomein.nl/?utm_source=instagram&utm_medium=social&utm_campaign=launch
```
