---
title: "Jupyter, ChatGPT, Copilot (Teil 3): Praxisbeispiele aus der echten Welt"
date: 2025-12-23T02:26:48+03:30
description: "Konkrete Szenarien, in denen Jupyter-Notebooks traditionelle IDEs für Senior Engineers übertreffen, einschließlich API-Exploration und Performance-Audits."
layout: single
author_profile: true
url: 2025/12/23/jupyter-real-world-examples/
shortlink: https://g.omid.dev/3hHJLd7
tags:
  - Jupyter
  - Python
  - Data Analysis
  - API
  - DevOps
lang: de
categories: 
  - TechBlog
---
*Dies ist Teil 3 einer Serie über moderne Entwicklungs-Workflows. [Teil 1: Der strategische Wert des Denkens in Notebooks](/de/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/) und [Teil 2: Der technische Leitfaden zur Jupyter-Einrichtung](/de/2025/12/23/jupyter-technical-setup-guide/) haben die Grundlage geschaffen. Schauen wir uns nun konkreten Code an.*

In den vorangegangenen Teilen haben wir besprochen, warum Jupyter eine „Denkumgebung“ ist. In diesem abschließenden Teil werden wir vier konkrete Szenarien durchgehen, in denen ein Notebook für einen Senior Engineer besser abschneidet als eine traditionelle IDE.

---

## 1. API-Archäologie: Das Unbekannte kartieren

Wenn Sie es mit einer komplexen API zu tun haben, möchten Sie nicht erst einen vollständigen Client bauen, nur um zu sehen, wie die Daten aussehen.

```python
import requests
import pandas as pd

# 1. Die Anfrage senden
response = requests.get("https://api.example.com/v1/complex-endpoint", 
                        headers={"Authorization": "Bearer IHR_TOKEN"})
data = response.json()

# 2. Anstatt print(data), nutzen Sie Jupyters Fähigkeit zur Exploration
# Schauen wir uns die Schlüssel der obersten Ebene an
print(f"Keys: {data.keys()}")

# 3. Verschachtelte Strukturen flach klopfen, um das Schema zu verstehen
df = pd.json_normalize(data['items'])
df.head() # Zeigt eine schöne interaktive Tabelle
```

**Der Vorteil:** Sie können die Header anpassen, die Query-Parameter ändern und *nur* die Zelle mit der Anfrage erneut ausführen, ohne Ihre gesamte Anwendung neu starten zu müssen.

---

## 2. Performance-Audit: Den Engpass finden

Wenn Ihre Logs einen Anstieg der Latenz zeigen, können Sie eine Stichprobe der Logs ziehen und diese sofort analysieren.

```python
import json
import matplotlib.pyplot as plt

# Eine Stichprobe Ihrer Produktions-Logs laden
with open('logs_sample.json') as f:
    logs = [json.loads(line) for line in f]

# Antwortzeiten extrahieren
latencies = [log['duration_ms'] for log in logs if 'duration_ms' in log]

# Die Verteilung visualisieren
plt.hist(latencies, bins=50, color='skyblue', edgecolor='black')
plt.title('Verteilung der Antwortzeiten')
plt.xlabel('ms')
plt.ylabel('Häufigkeit')
plt.axvline(x=500, color='red', linestyle='--', label='SLA-Schwellenwert')
plt.legend()
plt.show()
```

**Warum das gewinnt:** Sie raten nicht nur. Sie haben einen visuellen Beweis für den „Long Tail“ der Latenzen, den Sie als Slack-Nachricht oder in einem PR mit Ihrem Team teilen können.

---

## 3. Algorithmus-Prototyping: Die „Sandbox“

Bevor Sie einen Ranking-Algorithmus in Go oder Java implementieren, testen Sie die Logik in Python.

```python
def calculate_score(likes, views, age_hours):
    # Ein einfacher Decay-basierter Ranking-Algorithmus
    return (likes * 0.8 + views * 0.2) / (age_hours + 2)**1.5

# Mit verschiedenen Szenarien testen
scenarios = [
    {"likes": 100, "views": 1000, "age": 1},   # Neu & Beliebt
    {"likes": 500, "views": 5000, "age": 24},  # Alt & Sehr Beliebt
    {"likes": 10, "views": 50, "age": 0.5}     # Brandneu
]

for s in scenarios:
    score = calculate_score(s['likes'], s['views'], s['age'])
    print(f"Szenario: {s}, Score: {score:.4f}")
```

**Warum das gewinnt:** Sie können an der Formel iterieren (z. B. `1.5` in `1.8` ändern) und die Ergebnisse sofort über alle Szenarien hinweg sehen.

---

## 4. Interaktive Runbooks: Sichere Migrationen

Anstatt einer `README.md` mit Befehlen zum Kopieren und Einfügen stellen Sie ein Notebook zur Verfügung.

```python
# SCHRITT 1: Aktuellen Zustand prüfen
count = db.execute("SELECT COUNT(*) FROM users WHERE status = 'pending'").fetchone()[0]
print(f"{count} ausstehende Benutzer gefunden.")

# SCHRITT 2: Die Migration ausführen (nur wenn die Anzahl angemessen ist)
if count < 1000:
    db.execute("UPDATE users SET status = 'active' WHERE status = 'pending'")
    print("Migration abgeschlossen.")
else:
    print("FEHLER: Zu viele Benutzer, um die Migration sicher in einem Durchgang durchzuführen!")

# SCHRITT 3: Verifizieren
new_count = db.execute("SELECT COUNT(*) FROM users WHERE status = 'pending'").fetchone()[0]
print(f"Verbleibende ausstehende Benutzer: {new_count}")
```

**Warum das gewinnt:** Es ist „Literate DevOps“. Die Erklärung und die Ausführung leben zusammen, was das Risiko menschlicher Fehler bei riskanten Operationen verringert.

---

## Abschließende Gedanken

Jupyter ist kein Ersatz für Ihre IDE; es ist ein Begleiter. Es ist der Ort, an dem Sie die „unordentliche“ Arbeit des Verstehens erledigen, sodass Sie, wenn Sie schließlich Ihre IDE öffnen, genau wissen, was Sie bauen müssen.

Wenn Sie diese Beispiele umsetzen, denken Sie daran, sie in einer ordentlichen Projekthierarchie zu organisieren (wie in [Teil 2](/de/2025/12/23/jupyter-technical-setup-guide/) besprochen). Die Trennung von Daten, Notebooks und Quellcode ist der Schlüssel zu einem wartbaren Forschungs-Workflow.

Nutzen Sie **ChatGPT**, um die Logik zu brainstormen, **Jupyter**, um zu beweisen, dass sie mit echten Daten funktioniert, und **Copilot**, um Ihnen bei der produktionsreifen Implementierung zu helfen.

---

## Zusammenfassung der Serie

*   **Teil 1:** [Der strategische Wert des Denkens in Notebooks](/de/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/)
*   **Teil 2:** [Der technische Leitfaden zur Jupyter-Einrichtung](/de/2025/12/23/jupyter-technical-setup-guide/)
*   **Teil 3:** Sie sind hier!
