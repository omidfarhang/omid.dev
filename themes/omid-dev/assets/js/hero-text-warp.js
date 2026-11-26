/**
 * Interactive WebGL2 liquid/warp text for the homepage hero tagline.
 * Progressive enhancement: desktop + fine pointer + WebGL2 only.
 */

const ENABLE_MQ =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const REDUCE_MQ = "(prefers-reduced-motion: reduce)";
const PAD = 24;
const LENS = { bulge: 0, pinch: 1, swirl: 2 };

const VERT = `#version 300 es
in vec2 aPosition;
in vec2 aUv;
out vec2 vUv;
void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform sampler2D uTextTexture;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uTime;
uniform float uWarpStrength;
uniform float uWarpScale;
uniform float uSpeed;
uniform float uPointerInfluence;
uniform float uPointerStrength;
uniform float uRefraction;
uniform float uChromatic;
uniform float uRipple;
uniform float uMotion;
uniform float uLens;
uniform float uIntro;
uniform float uReveal;
uniform float uBackdrop;
uniform vec4 uClicks[4];

in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

vec4 sampleText(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  return texture(uTextTexture, uv);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  float time = uTime * uSpeed;
  float scale = max(uWarpScale, 0.001);

  vec2 drift = vec2(time * 0.055, -time * 0.045);
  float n1 = fbm(uv * scale * 3.1 + drift);
  float n2 = fbm((uv + 19.17) * scale * 3.4 - drift.yx);
  vec2 ambient = (vec2(n1, n2) - 0.5) * (uWarpStrength * 0.045 * uMotion + uIntro * 0.18);

  vec2 pointerDelta = uv - uPointer;
  vec2 aspectDelta = vec2(pointerDelta.x * aspect, pointerDelta.y);
  float dist = length(aspectDelta);
  float radius = max(uPointerInfluence, 0.001);
  float t = clamp(dist / radius, 0.0, 1.0);
  float lens = smoothstep(radius, 0.0, dist) * uPointerActive;
  float bulge = t * (1.0 - t) * (1.0 - t) * 6.75 * uPointerActive;
  vec2 dir = dist > 0.0001 ? vec2(aspectDelta.x / aspect, aspectDelta.y) / dist : vec2(0.0);

  float rippleWave = sin(dist * 28.0 - time * 4.2) * 0.5 + 0.5;
  float rippleRing = (rippleWave - 0.5) * uRipple;
  vec2 pointerWarp = dir * rippleRing * bulge * uPointerStrength * 0.016;

  if (uLens > 1.5) {
    float twist = (1.0 - t) * (1.0 - t) * uPointerActive * uPointerStrength * 2.4;
    float s = sin(twist);
    float c = cos(twist);
    vec2 turned = vec2(
      aspectDelta.x * c - aspectDelta.y * s,
      aspectDelta.x * s + aspectDelta.y * c
    );
    pointerWarp += vec2(turned.x / aspect, turned.y) - pointerDelta;
  } else {
    float side = uLens > 0.5 ? -1.0 : 1.0;
    pointerWarp -= dir * side * bulge * uPointerStrength * 0.045;
  }

  vec2 shock = vec2(0.0);
  float shockLight = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 click = uClicks[i];
    if (click.w <= 0.0) continue;
    vec2 clickDelta = uv - click.xy;
    vec2 clickAspect = vec2(clickDelta.x * aspect, clickDelta.y);
    float clickDist = length(clickAspect);
    float age = click.z;
    float offset = (clickDist - age * 0.9) / (0.06 + age * 0.06);
    float fade = 1.0 - smoothstep(0.0, 1.6, age);
    float energy = exp(-offset * offset) * fade * smoothstep(0.0, 0.08, age) * click.w;
    vec2 clickDir = clickDist > 0.0001
      ? vec2(clickAspect.x / aspect, clickAspect.y) / clickDist
      : vec2(0.0);
    shock -= clickDir * offset * energy * 0.09;
    shockLight += energy;
  }

  vec2 bend = pointerWarp + shock;
  vec2 rest = uv + ambient;
  vec2 splitDir = ambient + bend;
  float splitLen = length(splitDir);
  splitDir = splitLen > 0.00001 ? splitDir / splitLen : vec2(0.7071, 0.7071);
  vec2 split = splitDir * uRefraction * 0.16 * (0.35 + lens * 1.65 + uIntro * 3.0);
  float dispersion = uChromatic * 0.5;

  vec3 ink = vec3(0.0);
  vec3 cover = vec3(0.0);
  vec3 weight = vec3(0.0);
  for (int i = 0; i < 7; i++) {
    float k = 1.0 - float(i) / 3.0;
    vec4 tap = sampleText(rest + bend * (1.0 + dispersion * k) + split * k);
    vec3 band = vec3(max(k, 0.0), 1.0 - abs(k), max(-k, 0.0));
    ink += tap.rgb * band;
    cover += tap.a * band;
    weight += band;
  }
  ink /= weight;
  cover /= weight;
  float a = max(max(cover.r, cover.g), cover.b);
  vec3 color = ink + (a - cover) * uBackdrop;
  color = min(color + (lens + shockLight * 0.5) * cover.g * 0.055, vec3(a));
  fragColor = vec4(color, a) * uReveal;
}`;

function canEnable() {
  if (!window.matchMedia(ENABLE_MQ).matches) return false;
  if (window.matchMedia(REDUCE_MQ).matches) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

function parseCssColor(color) {
  const el = document.createElement("canvas").getContext("2d");
  if (!el) return { r: 0, g: 0, b: 0, a: 1, css: color };
  el.fillStyle = color;
  const computed = el.fillStyle;
  const m = String(computed).match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i
  );
  if (!m) return { r: 0, g: 0, b: 0, a: 1, css: color };
  return {
    r: Number(m[1]) / 255,
    g: Number(m[2]) / 255,
    b: Number(m[3]) / 255,
    a: m[4] == null ? 1 : Number(m[4]),
    css: computed,
  };
}

function luminance({ r, g, b }) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function wrapWords(root) {
  if (root.dataset.warpWrapped === "1") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    const text = node.nodeValue;
    if (!text || !/\S/.test(text)) continue;
    const frag = document.createDocumentFragment();
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
        continue;
      }
      const span = document.createElement("span");
      span.dataset.warpWord = "true";
      span.textContent = part;
      frag.appendChild(span);
    }
    node.parentNode.replaceChild(frag, node);
  }
  root.dataset.warpWrapped = "1";
}

function rasterize(target, width, height, pad, dpr) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  const ctx = canvas.getContext("2d");
  const styles = getComputedStyle(target);
  if (!ctx) return { canvas, ink: styles.color };

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.clearRect(0, 0, width, height);

  const hostRect = target.getBoundingClientRect();
  const originX = hostRect.left - pad;
  const originY = hostRect.top - pad;
  const highlight =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--highlight")
      .trim() || "rgb(250, 224, 90)";

  for (const word of target.querySelectorAll("[data-warp-word]")) {
    const rect = word.getClientRects()[0];
    if (!rect || rect.width <= 0 || rect.height <= 0) continue;

    const wordStyles = getComputedStyle(word);
    const x = rect.left - originX;
    const y = rect.top - originY;

    if (word.closest("em, mark, [data-warp-highlight]")) {
      ctx.fillStyle = highlight;
      ctx.fillRect(
        x,
        y + rect.height * 0.58,
        rect.width,
        rect.height * 0.42
      );
    }

    const weight = wordStyles.fontWeight || styles.fontWeight;
    const sizePx = parseFloat(wordStyles.fontSize) || parseFloat(styles.fontSize) || 16;
    const family = wordStyles.fontFamily || styles.fontFamily;
    ctx.font = `${weight} ${sizePx}px ${family}`;
    ctx.fillStyle = wordStyles.color || styles.color;
    const spacing = wordStyles.letterSpacing;
    if ("letterSpacing" in ctx) {
      ctx.letterSpacing = spacing === "normal" ? "0px" : spacing || "0px";
    }

    const metrics = ctx.measureText(word.textContent || "");
    const ascent = metrics.fontBoundingBoxAscent || sizePx * 0.8;
    ctx.fillText((word.textContent || "").trim(), x, y + ascent);
  }

  return { canvas, ink: styles.color };
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "shader compile failed");
  }
  return shader;
}

function createProgram(gl, vertSrc, fragSrc) {
  const program = gl.createProgram();
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(info || "program link failed");
  }
  return program;
}

function createWarp(host, target, options = {}) {
  const {
    warpStrength = 0.08,
    warpScale = 1.7,
    speed = 0.55,
    lens = "bulge",
    pointerInfluence = 0.42,
    pointerStrength = 0.38,
    refraction = 0.018,
    chromatic = 0.35,
    ripple = true,
    clickRipple = true,
    onReady = null,
    onFail = null,
  } = options;

  const overlay = document.createElement("div");
  overlay.className = "home-hero-tagline-warp__gl";
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.inset = `-${PAD}px`;
  host.appendChild(overlay);

  const canvas = document.createElement("canvas");
  canvas.className = "home-hero-tagline-warp__canvas";
  overlay.appendChild(canvas);

  const gl = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: false,
    stencil: false,
  });
  if (!gl) {
    overlay.remove();
    onFail?.();
    return null;
  }

  let program;
  try {
    program = createProgram(gl, VERT, FRAG);
  } catch {
    overlay.remove();
    onFail?.();
    return null;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const aPosition = gl.getAttribLocation(program, "aPosition");
  const aUv = gl.getAttribLocation(program, "aUv");
  const uniforms = {
    uTextTexture: gl.getUniformLocation(program, "uTextTexture"),
    uResolution: gl.getUniformLocation(program, "uResolution"),
    uPointer: gl.getUniformLocation(program, "uPointer"),
    uPointerActive: gl.getUniformLocation(program, "uPointerActive"),
    uTime: gl.getUniformLocation(program, "uTime"),
    uWarpStrength: gl.getUniformLocation(program, "uWarpStrength"),
    uWarpScale: gl.getUniformLocation(program, "uWarpScale"),
    uSpeed: gl.getUniformLocation(program, "uSpeed"),
    uPointerInfluence: gl.getUniformLocation(program, "uPointerInfluence"),
    uPointerStrength: gl.getUniformLocation(program, "uPointerStrength"),
    uRefraction: gl.getUniformLocation(program, "uRefraction"),
    uChromatic: gl.getUniformLocation(program, "uChromatic"),
    uRipple: gl.getUniformLocation(program, "uRipple"),
    uMotion: gl.getUniformLocation(program, "uMotion"),
    uLens: gl.getUniformLocation(program, "uLens"),
    uIntro: gl.getUniformLocation(program, "uIntro"),
    uReveal: gl.getUniformLocation(program, "uReveal"),
    uBackdrop: gl.getUniformLocation(program, "uBackdrop"),
    uClicks: gl.getUniformLocation(program, "uClicks"),
  };

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  const clicks = Array.from({ length: 4 }, () => new Float32Array([0.5, 0.5, 0, 0]));
  const clicksData = new Float32Array(16);
  let clickIndex = 0;
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0, activeTarget: 0 };
  let backdrop = 0;
  let raf = 0;
  let start = performance.now();
  let destroyed = false;
  let ready = false;
  let visible = !document.hidden;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const uploadTexture = () => {
    const rect = overlay.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const baked = rasterize(target, rect.width, rect.height, PAD, dpr);
    backdrop = luminance(parseCssColor(baked.ink)) < 0.5 ? 1 : 0;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, baked.canvas);
    return true;
  };

  const draw = (now) => {
    if (destroyed) return;
    raf = requestAnimationFrame(draw);
    if (!visible || !ready) return;

    const t = (now - start) / 1000;
    const intro = Math.max(0, 1 - t / 1.1);
    const reveal = Math.min(1, t / 0.45);

    pointer.x += (pointer.tx - pointer.x) * 0.18;
    pointer.y += (pointer.ty - pointer.y) * 0.18;
    pointer.active += (pointer.activeTarget - pointer.active) * 0.16;

    for (const click of clicks) {
      if (click[3] > 0) click[2] += 0.016;
      if (click[2] > 1.7) click[3] = 0;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(uniforms.uTextTexture, 0);
    gl.uniform2f(uniforms.uResolution, canvas.width / dpr, canvas.height / dpr);
    gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
    gl.uniform1f(uniforms.uPointerActive, pointer.active);
    gl.uniform1f(uniforms.uTime, t);
    gl.uniform1f(uniforms.uWarpStrength, warpStrength);
    gl.uniform1f(uniforms.uWarpScale, warpScale);
    gl.uniform1f(uniforms.uSpeed, speed);
    gl.uniform1f(uniforms.uPointerInfluence, pointerInfluence);
    gl.uniform1f(uniforms.uPointerStrength, pointerStrength);
    gl.uniform1f(uniforms.uRefraction, refraction);
    gl.uniform1f(uniforms.uChromatic, chromatic);
    gl.uniform1f(uniforms.uRipple, ripple ? 1 : 0);
    gl.uniform1f(uniforms.uMotion, 1);
    gl.uniform1f(uniforms.uLens, LENS[lens] ?? 0);
    gl.uniform1f(uniforms.uIntro, intro);
    gl.uniform1f(uniforms.uReveal, reveal);
    gl.uniform1f(uniforms.uBackdrop, backdrop);
    for (let i = 0; i < 4; i++) clicksData.set(clicks[i], i * 4);
    gl.uniform4fv(uniforms.uClicks, clicksData);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const onPointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    pointer.tx = (event.clientX - rect.left) / Math.max(1, rect.width);
    pointer.ty = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
    pointer.activeTarget = 1;
  };

  const onPointerLeave = () => {
    pointer.activeTarget = 0;
  };

  const onPointerDown = (event) => {
    if (!clickRipple || event.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    const click = clicks[clickIndex];
    clickIndex = (clickIndex + 1) % clicks.length;
    click[0] = (event.clientX - rect.left) / Math.max(1, rect.width);
    click[1] = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
    click[2] = 0;
    click[3] = 1;
  };

  const onVisibility = () => {
    visible = document.visibilityState === "visible";
    if (visible) start = performance.now() - 450;
  };

  const onTheme = () => {
    uploadTexture();
  };

  const resizeObserver = new ResizeObserver(() => {
    uploadTexture();
  });

  const themeObserver = new MutationObserver(onTheme);
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });

  wrapWords(target);
  if (!uploadTexture()) {
    overlay.remove();
    onFail?.();
    return null;
  }

  overlay.addEventListener("pointermove", onPointerMove);
  overlay.addEventListener("pointerleave", onPointerLeave);
  overlay.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("visibilitychange", onVisibility);
  resizeObserver.observe(host);
  window.addEventListener("resize", uploadTexture);

  ready = true;
  host.dataset.textWarpReady = "true";
  onReady?.();
  raf = requestAnimationFrame(draw);

  return () => {
    destroyed = true;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    themeObserver.disconnect();
    overlay.removeEventListener("pointermove", onPointerMove);
    overlay.removeEventListener("pointerleave", onPointerLeave);
    overlay.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", uploadTexture);
    gl.deleteTexture(texture);
    gl.deleteBuffer(quad);
    gl.deleteProgram(program);
    overlay.remove();
    delete host.dataset.textWarpReady;
  };
}

function mountRoot(root) {
  const target =
    root.querySelector("[data-text-warp-target]") ||
    root.querySelector("h1, h2, .home-hero-tagline");
  if (!target) return;

  let destroy = null;
  let scheduled = false;

  const stop = () => {
    if (!destroy) return;
    destroy();
    destroy = null;
  };

  const start = () => {
    scheduled = false;
    if (destroy || !canEnable()) return;
    destroy = createWarp(root, target, { chromatic: 0.35 });
  };

  const schedule = () => {
    if (destroy || scheduled || !canEnable()) return;
    scheduled = true;
    const run = () => start();
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 2000 });
    } else {
      window.setTimeout(run, 300);
    }
  };

  const sync = () => {
    if (canEnable()) schedule();
    else stop();
  };

  const enableMq = window.matchMedia(ENABLE_MQ);
  const reduceMq = window.matchMedia(REDUCE_MQ);
  const onChange = () => sync();
  if (typeof enableMq.addEventListener === "function") {
    enableMq.addEventListener("change", onChange);
    reduceMq.addEventListener("change", onChange);
  } else {
    enableMq.addListener(onChange);
    reduceMq.addListener(onChange);
  }

  if (document.readyState === "complete") sync();
  else window.addEventListener("load", sync, { once: true });
}

function init() {
  document.querySelectorAll("[data-text-warp]").forEach(mountRoot);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
