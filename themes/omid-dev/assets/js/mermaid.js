const SOURCE_ATTR = "data-mermaid-source";
const QUERY = ".mermaid-diagram .mermaid";

function token(styles, name) {
  return styles.getPropertyValue(name).trim();
}

function isDark() {
  return document.body.classList.contains("dark");
}

function mermaidConfig() {
  const styles = getComputedStyle(document.body);
  const dark = isDark();
  const fontBody = token(styles, "--font-body") || "AtkinsonHyperlegible, ui-sans-serif, sans-serif";

  return {
    startOnLoad: false,
    securityLevel: "strict",
    fontFamily: fontBody,
    theme: "base",
    flowchart: {
      htmlLabels: false,
      useMaxWidth: true,
    },
    sequence: {
      useMaxWidth: true,
    },
    themeVariables: {
      darkMode: dark,
      background: token(styles, "--theme"),
      fontFamily: fontBody,
      primaryColor: token(styles, "--accent-light"),
      primaryTextColor: token(styles, "--primary"),
      primaryBorderColor: token(styles, "--accent-border-strong"),
      secondaryColor: token(styles, "--quaternary"),
      tertiaryColor: token(styles, "--surface-panel"),
      lineColor: token(styles, "--content"),
      textColor: token(styles, "--content"),
      mainBkg: token(styles, "--entry"),
      nodeBorder: token(styles, "--accent-border-strong"),
      clusterBkg: token(styles, "--surface-panel"),
      clusterBorder: token(styles, "--border"),
      titleColor: token(styles, "--primary"),
      edgeLabelBackground: token(styles, "--theme"),
      actorBkg: token(styles, "--entry"),
      actorBorder: token(styles, "--accent-border"),
      actorTextColor: token(styles, "--primary"),
      signalColor: token(styles, "--primary"),
      signalTextColor: token(styles, "--primary"),
      labelBoxBkgColor: token(styles, "--entry"),
      labelBoxBorderColor: token(styles, "--border"),
      labelTextColor: token(styles, "--primary"),
      noteBkgColor: token(styles, "--accent-light"),
      noteTextColor: token(styles, "--primary"),
      noteBorderColor: token(styles, "--accent-border"),
    },
  };
}

function nodes() {
  return Array.from(document.querySelectorAll(QUERY));
}

function wraps() {
  return Array.from(document.querySelectorAll(".mermaid-diagram"));
}

function rememberSources() {
  wraps().forEach((wrap) => {
    const el = wrap.querySelector(".mermaid");
    const source = wrap.getAttribute(SOURCE_ATTR) || el?.getAttribute(SOURCE_ATTR) || el?.textContent;
    if (source == null) return;
    wrap.setAttribute(SOURCE_ATTR, source);
    el?.setAttribute(SOURCE_ATTR, source);
  });
}

function restoreSources() {
  wraps().forEach((wrap) => {
    const source = wrap.getAttribute(SOURCE_ATTR);
    if (source == null) return;
    let el = wrap.querySelector(".mermaid");
    if (!el) {
      el = document.createElement("pre");
      el.className = "mermaid";
      wrap.replaceChildren(el);
    }
    el.removeAttribute("data-processed");
    el.textContent = source;
    el.setAttribute(SOURCE_ATTR, source);
    el.classList.remove("mermaid-diagram--error");
  });
}

function markErrors(errorMessage) {
  nodes().forEach((el) => {
    if (el.getAttribute("data-processed") === "true") return;
    if (el.querySelector("svg")) return;
    el.classList.add("mermaid-diagram--error");
    if (errorMessage && !el.parentElement?.querySelector(".mermaid-error-msg")) {
      const msg = document.createElement("p");
      msg.className = "mermaid-error-msg";
      msg.textContent = errorMessage;
      el.insertAdjacentElement("afterend", msg);
    }
  });
}

function clearErrorMessages() {
  document.querySelectorAll(".mermaid-error-msg").forEach((el) => el.remove());
}

export async function boot(mermaid, errorMessage) {
  if (!nodes().length) return;

  mermaid.initialize(mermaidConfig());
  rememberSources();

  let renderGen = 0;

  async function render(reset) {
    const gen = ++renderGen;
    clearErrorMessages();
    if (reset) restoreSources();
    mermaid.initialize(mermaidConfig());
    try {
      await mermaid.run({
        querySelector: QUERY,
        suppressErrors: false,
      });
    } catch (err) {
      console.error(err);
    }
    if (gen !== renderGen) return;
    markErrors(errorMessage);
  }

  await render(false);

  const themeRoot = document.body;
  let theme = themeRoot.classList.contains("dark");
  new MutationObserver(() => {
    const next = themeRoot.classList.contains("dark");
    if (next === theme) return;
    theme = next;
    render(true);
  }).observe(themeRoot, { attributes: true, attributeFilter: ["class"] });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (themeRoot.classList.contains("theme-system")) {
      render(true);
    }
  });
}
