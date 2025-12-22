---
title: "Jupyter, ChatGPT, Copilot (Part 3): Real-World Code Examples"
date: 2025-12-23T02:26:48+03:30
layout: single
author_profile: true
url: 2025/12/23/jupyter-real-world-examples/
shortlink: https://g.omid.dev/tyBMsXq
tags:
  - Jupyter
  - Python
  - Data Analysis
  - API
  - DevOps
lang: en
categories: 
  - TechBlog
---

*This is Part 3 of a series on modern development workflows. [Part 1: The Strategic Value of Thinking in Notebooks](/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/) and [Part 2: The Technical Guide to Jupyter Setup](/2025/12/23/jupyter-technical-setup-guide/) set the stage. Now, let's look at actual code.*

In the previous parts, we discussed why Jupyter is a "thinking environment." In this final part, we'll walk through four concrete scenarios where a notebook outperforms a traditional IDE for a senior engineer.

---

## 1. API Archaeology: Mapping the Unknown

When you're dealing with a complex API, you don't want to build a full client just to see what the data looks like.

```python
import requests
import pandas as pd

# 1. Fire the request
response = requests.get("https://api.example.com/v1/complex-endpoint", 
                        headers={"Authorization": "Bearer YOUR_TOKEN"})
data = response.json()

# 2. Instead of print(data), use Jupyter's ability to explore
# Let's see the top-level keys
print(f"Keys: {data.keys()}")

# 3. Flatten nested structures to understand the schema
df = pd.json_normalize(data['items'])
df.head() # Shows a beautiful interactive table
```

**Why this wins:** You can tweak the headers, change the query params, and re-run *only* the request cell without restarting your entire application.

---

## 2. Performance Audit: Finding the Bottleneck

Imagine your logs show a spike in latency. You can pull a sample of logs and analyze them instantly.

```python
import json
import matplotlib.pyplot as plt

# Load a sample of your production logs
with open('logs_sample.json') as f:
    logs = [json.loads(line) for line in f]

# Extract response times
latencies = [log['duration_ms'] for log in logs if 'duration_ms' in log]

# Visualize the distribution
plt.hist(latencies, bins=50, color='skyblue', edgecolor='black')
plt.title('Distribution of Response Times')
plt.xlabel('ms')
plt.ylabel('Frequency')
plt.axvline(x=500, color='red', linestyle='--', label='SLA Threshold')
plt.legend()
plt.show()
```

**Why this wins:** You aren't just guessing. You have a visual proof of the "long tail" of latencies that you can share with your team in a Slack message or a PR.

---

## 3. Algorithm Prototyping: The "Sandbox"

Before you implement a ranking algorithm in Go or Java, you test the logic in Python.

```python
def calculate_score(likes, views, age_hours):
    # A simple decay-based ranking algorithm
    return (likes * 0.8 + views * 0.2) / (age_hours + 2)**1.5

# Test with different scenarios
scenarios = [
    {"likes": 100, "views": 1000, "age": 1},   # New & Popular
    {"likes": 500, "views": 5000, "age": 24},  # Old & Very Popular
    {"likes": 10, "views": 50, "age": 0.5}     # Brand New
]

for s in scenarios:
    score = calculate_score(s['likes'], s['views'], s['age'])
    print(f"Scenario: {s}, Score: {score:.4f}")
```

**Why this wins:** You can iterate on the formula (e.g., changing `1.5` to `1.8`) and see the results instantly across all scenarios.

---

## 4. Interactive Runbooks: Safe Migrations

Instead of a `README.md` with commands to copy-paste, you provide a notebook.

```python
# STEP 1: Check current state
count = db.execute("SELECT COUNT(*) FROM users WHERE status = 'pending'").fetchone()[0]
print(f"Found {count} pending users.")

# STEP 2: Run the migration (only if count is reasonable)
if count < 1000:
    db.execute("UPDATE users SET status = 'active' WHERE status = 'pending'")
    print("Migration complete.")
else:
    print("ERROR: Too many users to migrate safely in one go!")

# STEP 3: Verify
new_count = db.execute("SELECT COUNT(*) FROM users WHERE status = 'pending'").fetchone()[0]
print(f"Remaining pending users: {new_count}")
```

**Why this wins:** It's "Literate DevOps." The explanation and the execution live together, reducing the risk of human error during high-stakes operations.

---

## Final Thoughts

Jupyter isn't a replacement for your IDE; it's a companion. It's where you do the "messy" work of understanding, so that when you finally open your IDE, you know exactly what to build.

When implementing these examples, remember to keep them organized in a proper project hierarchy (as discussed in [Part 2](/2025/12/23/jupyter-technical-setup-guide/)). Keeping your data, notebooks, and source code separated is the key to a maintainable research workflow.

Use **ChatGPT** to brainstorm the logic, **Jupyter** to prove it works with real data, and **Copilot** to help you write the production-grade implementation.

---

## Series Wrap-up

*   **Part 1:** [The Strategic Value of Thinking in Notebooks](/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/)
*   **Part 2:** [The Technical Guide to Jupyter Setup](/2025/12/23/jupyter-technical-setup-guide/)
*   **Part 3:** You are here!
