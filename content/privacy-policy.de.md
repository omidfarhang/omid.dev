---
title: Datenschutzrichtlinie
layout: page
description: "Wie omid.dev mit Analytics, dem Kontaktformular, Webmentions und anderen Datenschutzthemen umgeht."
author_profile: true
---

**Zuletzt aktualisiert:** 17. Juni 2026

Diese Richtlinie beschreibt, wie **omid.dev** (betrieben von **Omid Farhang**) mit Informationen umgeht, wenn Sie die Website besuchen, das Kontaktformular nutzen oder Blog-Funktionen verwenden.

Es gibt **keine Registrierung**, **keinen Newsletter** und **keinen Online-Shop** auf dieser Website.

## Verantwortlicher

**Verantwortlich:** Omid Farhang  
**Website:** [https://omid.dev/de/](https://omid.dev/de/)  
**Kontakt:** [hi@omid.dev](mailto:hi@omid.dev)

## Welche Daten erhoben werden

### 1. Web-Analyse (Matomo)

omid.dev nutzt **Matomo**, selbst gehostet unter [analytics.omid.dev](https://analytics.omid.dev/), um aggregierten Traffic zu verstehen (aufgerufene Seiten, Referrer, allgemeine Geräte-/Browser-Informationen).

- Die Analyse läuft auf einer First-Party-Subdomain (`*.omid.dev`).
- Matomo ist so konfiguriert, dass **Do Not Track** respektiert wird, wenn Ihr Browser dieses Signal sendet.
- Matomo kann Cookies oder ähnliche Speicher verwenden, um wiederkehrende Besuche zu unterscheiden. Sie können Cookies in Ihren Browser-Einstellungen blockieren.

Matomo-Datenschutz: [https://matomo.org/privacy-policy/](https://matomo.org/privacy-policy/)

### 2. Kontaktformular

Wenn Sie das [Kontaktformular](/de/contact-me/) nutzen, können Sie übermitteln:

- **Name**
- **E-Mail-Adresse**
- **Nachricht**

Das Formular verwendet außerdem:

- **Cloudflare Turnstile** — ein Challenge-Widget von Cloudflare gegen Spam. Cloudflare kann technische Daten (z. B. IP-Adresse und Browser-Signale) gemäß der [Cloudflare-Datenschutzrichtlinie](https://www.cloudflare.com/privacypolicy/) verarbeiten.
- Ein **Honeypot-Feld** — für Menschen unsichtbar; wird es ausgefüllt, wird die Nachricht ignoriert.

Nachrichten werden an einen Backend-Endpunkt (`/api/contact`) gesendet, damit ich antworten kann. Ich nutze diese Angaben **nur zur Beantwortung** und für eine angemessene Korrespondenz-Dokumentation. Kontaktdaten werden nicht verkauft oder für Marketinglisten verwendet.

### 3. Theme-Einstellung

Wenn Sie Hell/Dunkel/System wählen, kann die Einstellung im **localStorage** Ihres Browsers gespeichert werden (`pref-theme`). Sie bleibt auf Ihrem Gerät und wird nicht an einen Server gesendet.

### 4. Suche auf der Website

Die Suche lädt einen statischen JSON-Index von dieser Website und läuft **vollständig in Ihrem Browser**. Suchanfragen werden nicht an einen Drittanbieter gesendet.

### 5. Diskussion und Webmentions

Bei vielen Beiträgen verlinkt ein **Diskussions**-Bereich auf Gespräche bei Drittanbietern (z. B. X, Mastodon, Bluesky, Reddit oder Hacker News). Was Sie dort posten, unterliegt den **Richtlinien dieser Plattform**.

Einige Beiträge zeigen **Webmentions** von [webmention.io](https://webmention.io/) — öffentliche Interaktionen (Likes, Reposts, Antworten), die auf die Beitrags-URL verweisen.

### 6. Eingebettete Inhalte und externe Links

Artikel können Medien einbetten (z. B. YouTube oder Vimeo) oder auf externe Seiten wie [playground.omid.dev](https://playground.omid.dev/) oder GitHub verlinken. Diese Dienste können bei Interaktion eigene Daten erheben.

## Was nicht erhoben wird

- Kein Kontosystem oder Passwort-Speicher auf omid.dev
- Keine Newsletter-Anmeldung oder Marketing-Automation
- Kein Verkauf personenbezogener Daten an Werbetreibende

## Speicherdauer

- **Analytics:** gemäß Matomo-Einstellungen auf analytics.omid.dev (aggregierte Statistiken).
- **Kontaktnachrichten:** so lange wie für Antwort und angemessene Dokumentation nötig, danach Löschung.
- **Webmentions:** werden live von webmention.io angezeigt; keine separate Speicherung auf diesem Server.

## Ihre Wahlmöglichkeiten

- Cookies blockieren oder Do Not Track im Browser aktivieren.
- localStorage löschen, um die Theme-Einstellung zurückzusetzen.
- Mich kontaktieren, wenn Sie Fragen zu übermittelten Kontaktdaten haben.

## Kinder

Diese Website richtet sich nicht an Kinder unter 13 Jahren; ich erhebe wissentlich keine Daten von Kindern.

## Änderungen

Diese Richtlinie kann aktualisiert werden. Das Datum „Zuletzt aktualisiert“ oben ändert sich entsprechend.

## Fragen

E-Mail an [hi@omid.dev](mailto:hi@omid.dev) oder [Kontaktformular](/de/contact-me/).
