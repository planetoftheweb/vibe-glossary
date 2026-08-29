import { useEffect, useRef } from 'react';

// Fixed full-viewport WebGL dot field behind the welcome landing. Formations morph with the welcome scroller: breathing wave (hero) → UI glyph constellation (components) → rising helix (literacy) → V glyph (cta). Renders nothing when WebGL is missing or the user prefers reduced motion. The page never depends on it.

const SCENE_IDS = ['hero', 'components', 'literacy', 'cta'];
const COLOR_VIOLET = '#8b5cf6';
const COLOR_INDIGO = '#6366f1';
const FOV_DEG = 55;
const VIEW_Z = -3.1;

const VERT = `
attribute vec3 aPosA;
attribute vec3 aPosB;
attribute float aSeed;
uniform float uMix;
uniform float uTime;
uniform float uAmp;
uniform vec2 uTilt;
uniform float uSettle;
uniform float uAspect;
uniform float uFov;
uniform float uViewZ;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  float t = smoothstep(0.0, 1.0, uMix);
  vec3 pos = mix(aPosA, aPosB, t);
  pos.y += sin(uTime * 0.65 + aSeed * 6.28318) * uAmp;
  pos.x += sin(uTime * 0.23 + aSeed * 11.0) * 0.018;
  pos.z += cos(uTime * 0.19 + aSeed * 8.0) * 0.018;
  float tilt = 1.0 - uSettle;
  float rx = uTilt.y * tilt;
  float ry = uTilt.x * tilt;
  float cx = cos(rx);
  float sx = sin(rx);
  float cy = cos(ry);
  float sy = sin(ry);
  float y = pos.y * cx - pos.z * sx;
  float z = pos.y * sx + pos.z * cx;
  pos.y = y;
  pos.z = z;
  float x = pos.x * cy + pos.z * sy;
  z = -pos.x * sy + pos.z * cy;
  pos.x = x;
  pos.z = z + uViewZ;
  float f = 1.0 / tan(uFov * 0.5);
  gl_Position = vec4(pos.x * f / max(uAspect, 0.001), pos.y * f, 0.0, -pos.z);
  gl_PointSize = 1.8 + 1.4 * fract(aSeed * 7.3);
  vColor = mix(uColorA, uColorB, fract(aSeed * 3.71));
  vTwinkle = 0.62 + 0.38 * sin(uTime * 2.1 + aSeed * 40.0);
}
`;

const FRAG = `
precision mediump float;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float r = dot(uv, uv);
  if (r > 1.0) discard;
  float alpha = smoothstep(1.0, 0.18, r) * vTwinkle * 0.88;
  gl_FragColor = vec4(vColor, alpha);
}
`;

export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  let h = hex.trim();
  if (h.startsWith('#')) h = h.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null;
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
}

function parseCssColor(raw) {
  if (!raw) return null;
  const hex = hexToRgb(raw);
  if (hex) return hex;
  const m = raw.trim().match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (m) return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
  return null;
}

export function segmentProgress(scroll, a, b) {
  const span = b - a;
  if (!Number.isFinite(span) || Math.abs(span) < 1e-4) return 1;
  const t = (scroll - a) / span;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

export function measureTimeline(scroller) {
  const fallback = { hero: 0, components: 400, literacy: 800, cta: 1200, max: 1200 };
  if (!scroller || typeof scroller.querySelector !== 'function') return fallback;
  const sRect = scroller.getBoundingClientRect();
  const max = Math.max(1, (scroller.scrollHeight || 0) - (scroller.clientHeight || 0));
  const tops = {};
  for (let i = 0; i < SCENE_IDS.length; i++) {
    const name = SCENE_IDS[i];
    const el = scroller.querySelector('[data-scene="' + name + '"]');
    if (!el) continue;
    tops[name] = el.getBoundingClientRect().top - sRect.top + (scroller.scrollTop || 0);
  }
  return {
    hero: tops.hero ?? 0,
    components: tops.components ?? max * 0.33,
    literacy: tops.literacy ?? max * 0.66,
    cta: tops.cta ?? max,
    max,
  };
}

function particleCount() {
  if (typeof window === 'undefined') return 3200;
  return window.innerWidth < 768 ? 3200 : 6400;
}

function jitter(i, mul, span) {
  return ((((i * mul) % 1000) / 1000) - 0.5) * span;
}

export function makeWave(count) {
  const out = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt(count * 1.55));
  const rows = Math.ceil(count / cols);
  const denC = Math.max(1, cols - 1);
  const denR = Math.max(1, rows - 1);
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    out[i * 3] = (c / denC - 0.5) * 2.55 + jitter(i, 17, 0.045);
    out[i * 3 + 1] = (r / denR - 0.5) * 1.55 + jitter(i, 31, 0.045);
    out[i * 3 + 2] = jitter(i, 13, 0.14);
  }
  return out;
}

export function makeHelix(count) {
  const out = new Float32Array(count * 3);
  const turns = 4.5;
  const den = Math.max(1, count - 1);
  for (let i = 0; i < count; i++) {
    const t = i / den;
    const a = t * turns * Math.PI * 2;
    const radius = 0.44 + 0.07 * Math.sin(t * Math.PI);
    out[i * 3] = Math.cos(a) * radius;
    out[i * 3 + 1] = (t - 0.5) * 2.15;
    out[i * 3 + 2] = Math.sin(a) * radius;
  }
  return out;
}

export function makeLooseSphere(count) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = (i * 0.6180339887) % 1;
    const v = (i * 0.3819660113) % 1;
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const radius = 0.72 + jitter(i, 41, 0.28);
    out[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    out[i * 3 + 1] = Math.cos(phi) * radius;
    out[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
  }
  return out;
}

function roundRect(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function strokeSetup(ctx) {
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 7;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

export function paintModal(ctx, x, y, w, h) {
  strokeSetup(ctx);
  roundRect(ctx, x, y, w, h, Math.min(w, h) * 0.12);
  ctx.stroke();
}

export function paintButton(ctx, x, y, w, h) {
  strokeSetup(ctx);
  const bh = h * 0.38;
  roundRect(ctx, x + w * 0.08, y + (h - bh) / 2, w * 0.84, bh, bh / 2);
  ctx.stroke();
}

export function paintCard(ctx, x, y, w, h) {
  strokeSetup(ctx);
  ctx.strokeRect(x, y, w, h);
  ctx.beginPath();
  ctx.moveTo(x + w * 0.12, y + h * 0.22);
  ctx.lineTo(x + w * 0.78, y + h * 0.22);
  ctx.stroke();
}

export function paintTable(ctx, x, y, w, h) {
  strokeSetup(ctx);
  ctx.strokeRect(x, y, w, h);
  const rows = 3;
  const cols = 3;
  for (let i = 1; i < rows; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y + (h * i) / rows);
    ctx.lineTo(x + w, y + (h * i) / rows);
    ctx.stroke();
  }
  for (let i = 1; i < cols; i++) {
    ctx.beginPath();
    ctx.moveTo(x + (w * i) / cols, y);
    ctx.lineTo(x + (w * i) / cols, y + h);
    ctx.stroke();
  }
}

export function paintTabs(ctx, x, y, w, h) {
  strokeSetup(ctx);
  const tw = w / 3.5;
  const th = h * 0.28;
  const gap = (w - tw * 3) / 2;
  for (let i = 0; i < 3; i++) {
    roundRect(ctx, x + i * (tw + gap), y, tw, th, 7);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x, y + th);
  ctx.lineTo(x + w, y + th);
  ctx.stroke();
}

export function paintToast(ctx, x, y, w, h) {
  strokeSetup(ctx);
  const bh = h * 0.26;
  roundRect(ctx, x + w * 0.08, y + (h - bh) / 2, w * 0.84, bh, bh / 2);
  ctx.stroke();
}

export const ICON_PAINTERS = {
  modal: paintModal,
  button: paintButton,
  card: paintCard,
  table: paintTable,
  tabs: paintTabs,
  toast: paintToast,
};

function sampleCanvas(canvas, count, zSpan) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return makeLooseSphere(count);
  const width = canvas.width;
  const height = canvas.height;
  const img = ctx.getImageData(0, 0, width, height).data;
  const pts = [];
  const step = width > 400 ? 2 : 1;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (img[(y * width + x) * 4 + 3] > 36) pts.push(x, y);
    }
  }
  if (pts.length < 2) return makeLooseSphere(count);
  const nPts = pts.length / 2;
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const idx = (i * 17 + (i * i) % 97) % nPts;
    const px = pts[idx * 2];
    const py = pts[idx * 2 + 1];
    out[i * 3] = (px / width) * 2.4 - 1.2;
    out[i * 3 + 1] = -((py / height) * 2.0 - 1.0);
    out[i * 3 + 2] = jitter(i, 23, zSpan);
  }
  return out;
}

export function makeIcons(count, wide) {
  const isWide = wide == null
    ? (typeof window === 'undefined' ? true : window.innerWidth >= 768)
    : !!wide;
  if (typeof document === 'undefined') return makeLooseSphere(count);
  const canvas = document.createElement('canvas');
  canvas.width = isWide ? 900 : 640;
  canvas.height = isWide ? 620 : 900;
  const ctx = canvas.getContext('2d');
  if (!ctx) return makeLooseSphere(count);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cols = isWide ? 3 : 2;
  const rows = isWide ? 2 : 3;
  const names = ['modal', 'button', 'card', 'table', 'tabs', 'toast'];
  const padX = canvas.width * 0.08;
  const padY = canvas.height * 0.08;
  const cellW = (canvas.width - padX * 2) / cols;
  const cellH = (canvas.height - padY * 2) / rows;
  const inset = 0.18;
  for (let i = 0; i < names.length; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = padX + c * cellW + cellW * inset;
    const y = padY + r * cellH + cellH * inset;
    const w = cellW * (1 - inset * 2);
    const h = cellH * (1 - inset * 2);
    ICON_PAINTERS[names[i]](ctx, x, y, w, h);
  }
  return sampleCanvas(canvas, count, 0.1);
}

export function makeGlyph(count) {
  if (typeof document === 'undefined') return makeLooseSphere(count);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return makeLooseSphere(count);
  ctx.clearRect(0, 0, 512, 512);
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 420px ui-sans-serif, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('V', 256, 280);
  return sampleCanvas(canvas, count, 0.1);
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    return false;
  }
}

function readColors() {
  const fallbackA = hexToRgb(COLOR_VIOLET);
  const fallbackB = hexToRgb(COLOR_INDIGO);
  if (typeof document === 'undefined') return { a: fallbackA, b: fallbackB };
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const parsed = parseCssColor(raw);
    if (parsed) return { a: parsed, b: fallbackB };
  } catch (err) {
    // stay with defaults
  }
  return { a: fallbackA, b: fallbackB };
}

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function linkProgram(gl, vertSrc, fragSrc) {
  const vs = compile(gl, gl.VERTEX_SHADER, vertSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

function getScroller(scrollerRef) {
  if (scrollerRef && scrollerRef.current) return scrollerRef.current;
  if (typeof document !== 'undefined') {
    return document.querySelector('[data-welcome-scroller]');
  }
  return null;
}

export function ParticleField({ scrollerRef }) {
  const canvasRef = useRef(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return undefined;

    let gl = null;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (err) {
      return undefined;
    }
    if (!gl) return undefined;

    const prog = linkProgram(gl, VERT, FRAG);
    if (!prog) return undefined;

    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    const locA = gl.getAttribLocation(prog, 'aPosA');
    const locB = gl.getAttribLocation(prog, 'aPosB');
    const locSeed = gl.getAttribLocation(prog, 'aSeed');
    const uMix = gl.getUniformLocation(prog, 'uMix');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uAmp = gl.getUniformLocation(prog, 'uAmp');
    const uTilt = gl.getUniformLocation(prog, 'uTilt');
    const uSettle = gl.getUniformLocation(prog, 'uSettle');
    const uAspect = gl.getUniformLocation(prog, 'uAspect');
    const uFov = gl.getUniformLocation(prog, 'uFov');
    const uViewZ = gl.getUniformLocation(prog, 'uViewZ');
    const uColorA = gl.getUniformLocation(prog, 'uColorA');
    const uColorB = gl.getUniformLocation(prog, 'uColorB');

    const bufA = gl.createBuffer();
    const bufB = gl.createBuffer();
    const bufSeed = gl.createBuffer();

    const colors = readColors();
    gl.uniform3f(uColorA, colors.a[0], colors.a[1], colors.a[2]);
    gl.uniform3f(uColorB, colors.b[0], colors.b[1], colors.b[2]);
    gl.uniform1f(uFov, (FOV_DEG * Math.PI) / 180);
    gl.uniform1f(uViewZ, VIEW_Z);

    let count = 0;
    let wave;
    let helix;
    let icons;
    let glyph;
    let seg = -1;
    let timeline = measureTimeline(getScroller(scrollerRef));
    let smooth = 0;
    const mouse = { x: 0, y: 0 };
    const follow = { x: 0, y: 0 };
    let last = (typeof performance !== 'undefined' ? performance.now() : 0);
    let raf = 0;

    function bindAttrib(buf, loc, size, data) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      if (data) gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    }

    function rebuild(nextCount) {
      count = nextCount;
      wave = makeWave(count);
      helix = makeHelix(count);
      icons = makeIcons(count);
      glyph = makeGlyph(count);
      const seeds = new Float32Array(count);
      for (let i = 0; i < count; i++) seeds[i] = (i * 0.6180339887) % 1;
      bindAttrib(bufSeed, locSeed, 1, seeds);
      seg = -1;
    }

    function uploadPair(a, b) {
      bindAttrib(bufA, locA, 3, a);
      bindAttrib(bufB, locB, 3, b);
    }

    function resize() {
      const dpr = Math.min((typeof window !== 'undefined' && window.devicePixelRatio) || 1, 2);
      const w = (typeof window !== 'undefined' ? window.innerWidth : 1024) || 1;
      const h = (typeof window !== 'undefined' ? window.innerHeight : 768) || 1;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, w / h);
      const next = particleCount();
      if (next !== count) rebuild(next);
    }

    function onPointer(e) {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      mouse.x = (e.clientX / w) * 2 - 1;
      mouse.y = (e.clientY / h) * 2 - 1;
    }

    function onScroll() {
      timeline = measureTimeline(getScroller(scrollerRef));
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const scroller = getScroller(scrollerRef);
      const target = scroller ? (scroller.scrollTop || 0) : 0;
      const followK = 1 - Math.exp(-dt * 6.2);
      smooth += (target - smooth) * followK;
      follow.x += (mouse.x - follow.x) * (1 - Math.exp(-dt * 4.2));
      follow.y += (mouse.y - follow.y) * (1 - Math.exp(-dt * 4.2));

      let mix = 0;
      let amp = 0.028;
      let settle = 0;
      if (smooth < timeline.components) {
        if (seg !== 0) {
          uploadPair(wave, icons);
          seg = 0;
        }
        mix = segmentProgress(smooth, timeline.hero, timeline.components);
        amp = 0.075 * (1 - mix * 0.65);
      } else if (smooth < timeline.literacy) {
        if (seg !== 1) {
          uploadPair(icons, helix);
          seg = 1;
        }
        mix = segmentProgress(smooth, timeline.components, timeline.literacy);
        amp = 0.03;
      } else {
        if (seg !== 2) {
          uploadPair(helix, glyph);
          seg = 2;
        }
        mix = segmentProgress(smooth, timeline.literacy, timeline.cta);
        amp = 0.018 * (1 - mix);
        settle = mix;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uMix, mix);
      gl.uniform1f(uTime, now * 0.001);
      gl.uniform1f(uAmp, amp);
      gl.uniform2f(uTilt, follow.x * 0.16, follow.y * 0.1);
      gl.uniform1f(uSettle, settle);
      gl.drawArrays(gl.POINTS, 0, count);
      raf = requestAnimationFrame(frame);
    }

    resize();
    if (seg < 0) uploadPair(wave, icons);
    timeline = measureTimeline(getScroller(scrollerRef));

    const scroller = getScroller(scrollerRef);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    if (scroller) scroller.addEventListener('scroll', onScroll, { passive: true });
    const settleTimer = setTimeout(() => {
      timeline = measureTimeline(getScroller(scrollerRef));
    }, 1200);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      if (scroller) scroller.removeEventListener('scroll', onScroll);
    };
  }, [reduced, scrollerRef]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
