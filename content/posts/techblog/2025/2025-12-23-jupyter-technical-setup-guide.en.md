---
title: "Jupyter, ChatGPT, Copilot (Part 2): The Technical Guide to Jupyter Setup"
date: 2025-12-23T02:00:00+03:30
layout: single
author_profile: true
url: 2025/12/23/jupyter-technical-setup-guide/
shortlink: https://g.omid.dev/FpT0kTO
tags:
  - Jupyter
  - Python
  - DevOps
  - Setup
  - VS Code
lang: en
categories: 
  - TechBlog
---

*This is Part 2 of a three-part series. In [Part 1: The Strategic Value of Thinking in Notebooks](/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/), we discussed why and when to use Jupyter. Here, we dive into the technical implementation. [Part 3: Real-World Code Examples](/2025/12/23/jupyter-real-world-examples/) covers practical use cases.*

---

## The Modern Jupyter Stack

For a software engineer, the "standard" way of installing Jupyter (global pip install) is often the wrong way. It leads to dependency hell and "it works on my machine" syndrome.

Here is how to set it up like a pro.

---

## 1. Installation & Environment Management

### The "UV" Way (Recommended)
If you haven't tried [uv](https://github.com/astral-sh/uv) yet, it's a lightning-fast Python package manager. It makes managing Jupyter environments trivial.

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create a new project and add jupyter
uv init my-notebooks
cd my-notebooks
uv add jupyterlab ipywidgets pandas matplotlib
```

### The Traditional Virtualenv Way
If you prefer standard tools:

```bash
python -m venv .venv
source .venv/bin/activate
pip install jupyterlab
```

---

## 2. Choosing Your Interface

### JupyterLab (The Browser Experience)
JupyterLab is the next-generation web-based user interface. It supports tabs, file browsers, and terminal access.
*   **Run it:** `jupyter lab`
*   **Best for:** Deep data exploration and when you want a dedicated workspace.

### VS Code (The Engineer's Choice)
Most software engineers should use the **VS Code Jupyter Extension**.
*   **Why:** You get your familiar keybindings, themes, and Copilot integration directly inside the notebook.
*   **Setup:** Install the "Jupyter" extension from the Marketplace. Open any `.ipynb` file, and VS Code will prompt you to select a kernel (point it to your `.venv`).

---

## 3. Managing Kernels

A **Kernel** is the engine that runs your code. You can have different kernels for different projects (e.g., one for Python 3.10, one for R, one for a specific project with heavy dependencies).

To make your virtual environment available as a kernel:
```bash
pip install ipykernel
python -m ipykernel install --user --name=my-project-kernel --display-name "Python (My Project)"
```

---

## 4. Version Control: The "Notebook Problem"

Standard `.ipynb` files are JSON blobs containing code, metadata, and **outputs** (like large images or dataframes). This makes Git diffs unreadable.

### Solution: Jupytext
[Jupytext](https://github.com/mwouts/jupytext) allows you to pair your notebooks with plain `.py` files.
*   You edit the `.ipynb` in the UI.
*   Jupytext automatically saves a `.py` version.
*   You commit the `.py` file to Git.
*   **Result:** Clean, readable code reviews.

### Solution: nbstripout
Use `nbstripout` as a git filter to automatically remove output cells before committing.
```bash
pip install nbstripout
nbstripout --install
```

---

## 5. Storage & Remote Execution

*   **Local:** Keep your notebooks in a dedicated `/notebooks` folder in your repo.
*   **Cloud (Google Colab / Kaggle):** Great for quick tests or when you need a free GPU.
*   **Self-Hosted (JupyterHub):** If your team needs a shared environment with access to internal databases.

---

## Conclusion

Setting up Jupyter correctly is the difference between a messy experiment and a professional research tool. By using modern package managers like `uv`, integrating with VS Code, and handling version control with `Jupytext`, you turn Jupyter into a first-class citizen of your development workflow.

Remember: Jupyter isn't where you write your app; it's where you **understand** the problems your app is trying to solve.

## Further Reading & Resources

*   **Official Docs:** [JupyterLab Documentation](https://jupyterlab.readthedocs.io/)
*   **Package Management:** [uv: An extremely fast Python package manager](https://github.com/astral-sh/uv)
*   **VS Code Integration:** [Working with Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)
*   **Version Control:** [Jupytext: Jupyter Notebooks as Markdown or Python Scripts](https://github.com/mwouts/jupytext)
*   **Clean Diffs:** [nbstripout: Strip output from Jupyter and IPython notebooks](https://github.com/kynan/nbstripout)
*   **Practical Examples:** [Part 3: Real-World Code Examples](/2025/12/23/jupyter-real-world-examples/)
