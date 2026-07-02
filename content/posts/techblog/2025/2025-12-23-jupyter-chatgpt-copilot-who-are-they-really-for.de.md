---
title: "Jupyter, ChatGPT, Copilot (Teil 1): Der strategische Wert des Denkens in Notebooks"
date: 2025-12-23T01:09:51+03:30
description: "Untersuche die konzeptionelle und strategische Rolle von Project Jupyter neben ChatGPT und Copilot in modernen Entwicklungs-Workflows."
layout: single
author_profile: true
url: 2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/
relatedNote: notes/178199000262829204/
shortlink: https://g.omid.dev/I84gYZ4
x_link: https://x.com/OmidFarhangEn/status/2003242150402883883
mastodon_link: https://mastodon.social/@omidfarhang/115765736961111842
bluesky_link: https://bsky.app/profile/omid.dev/post/3mamecnjink2j
hn_link: https://news.ycombinator.com/item?id=46360419
linkedin_link: https://www.linkedin.com/posts/omidfarhang_jupyter-chatgpt-copilot-part-1-the-strategic-activity-7409007700174483456-e0Ww
tags:
  - Jupyter
  - ChatGPT
  - Copilot
  - Engineering Culture
  - Decision Making
  - Data Science
  - Data & AI

categories:
  - TechBlog
series:
  id: jupyter-copilot
  title: "Jupyter, ChatGPT, Copilot"
  order: 0
  label: "Teil 1: Der strategische Wert des Denkens in Notebooks"
  role: anchor
---

Wenn Sie aus einem traditionellen Software-Engineering-Hintergrund kommen (Frontend, Backend, Systeme), haben Sie **Project Jupyter** wahrscheinlich schon überall gesehen, von Notebooks und Erweiterungen bis hin zu Cloud-Plattformen, und sich gedacht:

> „Das sieht riesig aus… aber ich sehe nicht wirklich, wo *ich* da reinpasse.“

Ich hatte die gleiche Verwirrung.
Schauen wir uns das ganz klar an, indem wir Rollen verwenden, keine Schlagworte.

---

## Erstens: Was Jupyter *nicht* ist

Jupyter ist **nicht**:

* Eine Programmiersprache (im Gegensatz zu R oder Python)
* Ein Ersatz für IDEs wie VS Code
* Eine Produktionsentwicklungsumgebung
* Ein Konkurrent zu ChatGPT oder Copilot

Wenn Sie versuchen, es als eines dieser Dinge zu verwenden, wird es sich *unbequem* anfühlen.

---

## Wenn Sie aus dem Software-Engineering kommen

Wenn man ein neues Tool sieht, lautet die unbewusste Frage:

> „Was kann ich damit nicht schon mit VS Code und einem Python-Skript?“

Wenn die Antwort nicht offensichtlich ist, wirkt das Tool überflüssig. Genau diese Lücke schließen die meisten Jupyter-Artikel nicht — sie setzen voraus, dass Sie den ganzen Tag Daten erkunden.

### Skript vs. Notebook

Ein Skript sieht so aus:

```text
bearbeiten → speichern → ausführen → Terminal scrollen → bearbeiten → speichern → erneut ausführen
```

Ein Notebook sieht so aus:

```text
Zelle 1 ausführen → Ausgabe erscheint
Zelle 2 ausführen → Diagramm erscheint
Zelle 3 bearbeiten → nur Zelle 3 ausführen → weitermachen
```

Sie führen ein Gespräch mit Ihrem Programm, statt das ganze Experiment immer wieder neu aufzubauen.

### Entdecken vs. Ausführen

> **Ein Python-Skript ist zum Ausführen eines bekannten Prozesses da.**
>
> **Ein Jupyter-Notebook ist zum Entdecken des Prozesses da.**

Oder noch kürzer:

> **In Jupyter finden Sie heraus, was der Code sein sollte. In VS Code schreiben Sie den Code, den Sie behalten.**

### Ein Bildeditor, keine Cropper-App

Sie würden keine React-App mit Cropper.js aufsetzen, nur um drei Bilder für eine schnelle Prüfung zuzuschneiden. Sie würden einen Bildeditor öffnen, Dinge ausprobieren, das Ergebnis sofort sehen und weitermachen.

Jupyter ist diese Art von Arbeitsbereich — nur für Code. Wenn das Ziel ist, etwas zu *verstehen* (eine API-Struktur, einen Latenz-Spike, einen Datensatz), nutzen Sie ein Notebook. Wenn das Ziel ist, etwas zu *liefern*, wechseln Sie in Ihre IDE.

### Nacheinander, nicht parallel

Für die Erkundung brauchen Sie oft keine zweite IDE. Das Notebook *ist* der Ort, an dem Sie explorativen Code schreiben.

```text
Frage
    ↓
Jupyter (Experiment)
    ↓
Antwort
    ↓
VS Code (Feature bauen)
```

Sie arbeiten nacheinander, nicht parallel.

---

## Was Jupyter tatsächlich ist

Jupyter ist eine **Denk- und Ausführungsumgebung** — interaktives Rechnen für den Fall, dass Sie die Antwort noch nicht kennen.

Es ermöglicht Ihnen:

* Echten Code auszuführen (Python, R, Julia, etc.)
* Ihn Schritt für Schritt auszuführen
* Ausgaben direkt im Dokument zu sehen (Tabellen, Diagramme, Zahlen)
* **Erklärung + Annahmen + Ergebnisse** in einem Dokument zu mischen

Es ist im Grunde:

> **Ein Labortagebuch, in dem Argumentation ausführbar ist**

---

## Warum die Verwirrung besteht

Weil Jupyter, ChatGPT und Copilot alle:

* Interaktiv sind
* Ergebnisse direkt anzeigen
* Ihnen beim „Denken“ helfen

Aber sie arbeiten auf **unterschiedlichen kogniven Ebenen**.

---

## Die entscheidende Unterscheidung (Das ist der Schlüssel)

### ChatGPT vs. Jupyter vs. Copilot

| Tool        | Was es wirklich tut                            |
| ----------- | ---------------------------------------------- |
| **ChatGPT** | Denkt *mit* Ihnen (Sprache, Argumentation, Ideen) |
| **Jupyter** | Lässt *Sie denken*, unter Verwendung von echtem Code |
| **Copilot** | Führt bekannte Absichten schneller aus         |

Einfach ausgedrückt:

* ChatGPT = **Berater**
* Jupyter = **Werkbank**
* Copilot = **Elektrowerkzeug**

Sie ersetzen einander nicht; sie **greifen ineinander**.

---

## Ist Jupyter wie R?

Kurze Antwort: **Nein.**

* **R** ist eine Programmiersprache
* **Jupyter** ist eine Umgebung, die R (und viele andere) *ausführen* kann

Eine bessere Analogie:

> **Jupyter : R :: VS Code : TypeScript**

Jupyter konkurriert nicht mit Sprachen — es **beherbergt sie**.

---

## Wer nutzt Jupyter eigentlich in einem Team?

Hier liegen viele Leute falsch.

Es geht nicht um **PM vs. Entwickler**.
Es geht um **Entscheidungsfindung vs. Ausführung**.

### Die tatsächliche Rollenverteilung

| Arbeitsebene                     | Wer es normalerweise tut      | Tool              |
| --------------------------------- | ------------------------ | ----------------- |
| Strategische Entscheidungen       | PM, Tech Lead, Architekt | **Jupyter**       |
| System- & Architektur-Exploration | Senior Devs / Architekten | **Jupyter**       |
| Prototyping & Spikes              | Senior Devs              | **Jupyter**       |
| Implementierung                    | Entwickler               | **IDE + Copilot** |
| Produktionscode                   | Entwickler               | **IDE**           |

Also ja — **PMs *können* Jupyter nutzen**, aber das tun auch:

* Tech Leads
* Architekten
* Senior Engineers
* Jeder, der für Entscheidungen unter Unsicherheit verantwortlich ist

---

## Warum Senior-Entwickler Jupyter nutzen (nicht Junioren)

Junior-Entwickler:

* Erhalten klare Aufgaben
* Konzentrieren sich auf die Implementierung
* Profitieren am meisten von Copilot

Senior-Entwickler:

* Sind mit Mehrdeutigkeit konfrontiert
* Müssen Kompromisse rechtfertigen
* Müssen das *Warum* erklären, nicht nur das *Wie*

Genau dort glänzt Jupyter.

---

## Ein realistischer Team-Workflow

1. **ChatGPT**

   * Ideen erkunden
   * Konzepte klären
   * Variablen und Risiken identifizieren

2. **Jupyter**

   * Annahmen in Zahlen umwandeln
   * Szenarien vergleichen
   * Kompromisse visualisieren
   * Argumentation bewahren

3. **IDE + Copilot**

   * Implementieren, was bereits entschieden wurde
   * Schnell und sicher vorankommen

Dieser Kreislauf ist unglaublich kraftvoll — und sehr bewusst gewählt.

---

## Praxisbeispiele: Wann man zu Jupyter greift

Um dies konkret zu machen, hier sind vier Szenarien, in denen ein Senior Engineer oder Lead Jupyter anstelle einer IDE verwenden würde:

### 1. Die „API-Archäologie“-Phase
Sie integrieren eine komplexe, schlecht dokumentierte Drittanbieter-API. Anstatt einen vollständigen Dienst in Ihrer App zu schreiben, verwenden Sie ein Jupyter-Notebook, um:
*   Anfragen zu senden und die rohen JSON-Antworten zu inspizieren.
*   Die verschachtelten Datenstrukturen abzubilden.
*   Zu testen, wie die API mit Grenzfällen umgeht (Nullwerte, leere Arrays).
*   **Ergebnis:** Sie haben eine dokumentierte „Karte“ der API, bevor Sie eine einzige Zeile Produktionscode schreiben.

### 2. Performance- & Kosten-Audits
Ihre AWS-Rechnung ist sprunghaft angestiegen oder eine Datenbankabfrage ist langsam. Sie verwenden Jupyter, um:
*   Logs oder Metriken über ein CLI/SDK abzurufen.
*   Daten zu gruppieren und zu aggregieren (z. B. „Welche Benutzer-ID greift 10.000 Mal auf diesen Endpunkt zu?“).
*   Ein Histogramm der Antwortzeiten zu erstellen.
*   **Ergebnis:** Sie teilen das Notebook mit dem Team als Beweis für den Engpass.

### 3. Algorithmus-Prototyping
Sie müssen einen neuen Ranking-Algorithmus für Suchergebnisse implementieren.
*   Sie laden einen Beispieldatensatz in ein Notebook.
*   Sie schreiben die Logik in eine einzelne Zelle und optimieren die Gewichtungen.
*   Sie sehen sofort, wie sich das Ranking verändert.
*   **Ergebnis:** Sobald die Logik „bewiesen“ ist, portieren Sie sie in Ihre Produktionssprache (Go, Java, etc.).

### 4. Interaktive Dokumentation (Runbooks)
Eine komplexe Datenbankmigration muss durchgeführt werden. Anstatt einer statischen README stellen Sie ein Jupyter-Notebook zur Verfügung, das:
*   Jeden Schritt erklärt.
*   Den tatsächlichen SQL/Python-Code zur Durchführung der Migration enthält.
*   Die „Vorher“- und „Nachher“-Zahlen direkt im Dokument anzeigt.
*   **Ergebnis:** Die Person, die die Migration durchführt, hat eine sichere Schritt-für-Schritt-Umgebung mit integrierter Validierung.

---

## Warum sich Jupyter für Ingenieure „unordentlich“ anfühlt

Und das ist okay.

Jupyter ist:

* Zustandsbehaftet (stateful)
* Nicht-linear
* Explorativ

Das ist ein Feature, kein Bug.

Es ist gedacht für:

* „Ich weiß es noch nicht“
* „Lassen Sie uns diese Annahme testen“
* „Was passiert, wenn wir X ändern?“

Nicht für:

* Saubere Architektur
* Langlebigen Produktionscode
* Strenge Reproduzierbarkeitspipelines

---

## Der Satz, bei dem es endlich Klick gemacht hat

Wenn Sie sich nur eine Sache merken, dann diese:

> **Jupyter hilft jedem, der für Entscheidungen unter Unsicherheit verantwortlich ist.
> Copilot hilft jedem, der für die Ausführung unter Klarheit verantwortlich ist.**

Titel spielen keine Rolle.
Kognitive Verantwortung schon.

---

## Sollten *Sie* Jupyter lernen?

Wenn Sie sind:

* Ein reiner Umsetzer → wahrscheinlich nein
* Ein Senior Dev / Tech Lead → ja, gelegentlich
* Ein Entscheidungsträger, der mit Mehrdeutigkeit zu tun hat → absolut

Sie „wechseln“ nicht zu Jupyter.
Sie **greifen danach, wenn das Denken Struktur braucht**.

---

## Fazit: Das richtige Werkzeug für die richtige Aufgabe

Jupyter ist nicht groß, weil es trendy ist. Es ist groß, weil es zum **Standardweg geworden ist, wie Menschen mit Computern argumentieren**, wenn die Antworten nicht offensichtlich sind.

Sobald man es als „Denkumgebung“ statt als „Programmierumgebung“ betrachtet, verschwindet der Hype — und der Nutzen wird offensichtlich. Nutzen Sie ChatGPT für das Brainstorming, Jupyter zum Validieren und Erkunden und Ihre IDE mit Copilot zum Bauen. (Und denken Sie daran: Eine Denkumgebung funktioniert nur, wenn sie organisiert ist — schauen Sie sich die Tipps zur Projektstruktur in [Teil 2](/de/2025/12/23/jupyter-technical-setup-guide/) an).

## Weiterführende Literatur

*   **Project Jupyter:** [Offizielle Website](https://jupyter.org/)
*   **Project Jupyter:** [GitHub](https://github.com/jupyter)
*   **Project Jupyter:** [Wikipedia](https://en.wikipedia.org/wiki/Project_Jupyter)
*   **Die Philosophie der Notebooks:** [Literate Programming von Donald Knuth](https://en.wikipedia.org/wiki/Literate_programming)
