// Shared helpers for the line illustrations in this folder.
// Every illustration is a decorative inline SVG: stroke="currentColor" pencil lines with optional
// soft "wash" fills (classes .ill-wash--* in global.css, which adapt to dark mode).

// 'cat' = the colour of the surrounding tag (var(--cat)), for tags with one of the extra colours.
export type Tone = 'sage' | 'hen' | 'yolk' | 'sky' | 'blossom' | 'cat';
export type Size = number | string | undefined;

/** Width/height attributes for an SVG of the given viewBox size. Numbers are px; strings are CSS widths. */
export function sizeAttrs(size: Size, vbW: number, vbH: number, fallback: number) {
  const s = size ?? fallback;
  if (typeof s === 'number') {
    return { width: s, height: Math.round(((s * vbH) / vbW) * 100) / 100 };
  }
  return { style: `width:${s};height:auto` };
}

const r = (n: number) => Math.round(n * 100) / 100;

/**
 * A single leaf in local coordinates: base at 0,0, pointing along +x, length L, half-width W.
 * `bend` curls the tip sideways; the slight asymmetry keeps it from looking stamped.
 */
export function leafPath(L: number, W: number, bend = 0) {
  return (
    `M0 0C${r(L * 0.22)} ${r(-W * 1.05)} ${r(L * 0.68)} ${r(-W * 0.95 + bend)} ${r(L)} ${r(bend)}` +
    `C${r(L * 0.74)} ${r(W * 0.7 + bend)} ${r(L * 0.3)} ${r(W * 0.95)} 0 0`
  );
}

/** The midrib of leafPath(L, W, bend): stops short of the tip like a quick pencil stroke. */
export function midribPath(L: number, bend = 0) {
  return `M${r(L * 0.06)} 0Q${r(L * 0.5)} ${r(bend * 0.35)} ${r(L * 0.8)} ${r(bend * 0.7)}`;
}

/** Point and tangent angle (degrees) on a quadratic Bezier at t. */
export function quadAt(p0: number[], p1: number[], p2: number[], t: number) {
  const mt = 1 - t;
  const x = mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0];
  const y = mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1];
  const dx = 2 * mt * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * mt * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  return { x: r(x), y: r(y), angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** Deterministic small wobble so repeated shapes (petals, leaflets) differ a little. */
export function wobble(i: number, amount: number) {
  return r(Math.sin(i * 12.9898 + 4.1) * amount);
}

export { r as round };
