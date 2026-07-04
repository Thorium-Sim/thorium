// Helpers that derive drawing data from the ship's "top" sprite: a radial
// hull-extent profile (so drone paths trace the real silhouette) and a
// solid-red tint copy (so the hull can redden as integrity drops).

// Number of angular buckets in the hull profile (one every 5 degrees)
export const PROFILE_BUCKETS = 72;
// Hull extent used before the ship image's profile is available
export const FALLBACK_HULL = 0.5;

// Reads the ship PNG's alpha channel and returns, for each angle around the
// image center, how far the hull's opaque pixels extend — normalized so 1.0
// is half the image's larger dimension, the same scale the ship is drawn at.
// This lets drone paths trace long or wide hulls instead of a fixed circle.
export function buildHullProfile(image: HTMLImageElement): number[] | null {
  try {
    const maxDim = Math.max(image.naturalWidth, image.naturalHeight);
    if (!maxDim) {
      return null;
    }
    // Downscale large sprites — 160px is plenty for a 72-bucket profile
    const scale = Math.min(1, 160 / maxDim);
    const w = Math.max(1, Math.round(image.naturalWidth * scale));
    const h = Math.max(1, Math.round(image.naturalHeight * scale));
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      return null;
    }
    ctx.drawImage(image, 0, 0, w, h);
    const {data} = ctx.getImageData(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const norm = Math.max(w, h) / 2;
    const profile: number[] = new Array(PROFILE_BUCKETS).fill(0);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        // Skip near-transparent pixels — they aren't part of the hull
        if (data[(y * w + x) * 4 + 3] < 64) {
          continue;
        }
        const dx = x + 0.5 - cx;
        const dy = y + 0.5 - cy;
        const bucket =
          ((Math.round((Math.atan2(dy, dx) / (Math.PI * 2)) * PROFILE_BUCKETS) %
            PROFILE_BUCKETS) +
            PROFILE_BUCKETS) %
          PROFILE_BUCKETS;
        const dist = Math.sqrt(dx * dx + dy * dy) / norm;
        // Keep the farthest opaque pixel for each angular bucket
        if (dist > profile[bucket]) {
          profile[bucket] = dist;
        }
      }
    }
    const filled = profile.filter(v => v > 0);
    if (filled.length === 0) {
      return null;
    }
    // Angles with no opaque pixels get the mean so smoothing blends them in
    const mean = filled.reduce((a, b) => a + b, 0) / filled.length;
    let result = profile.map(v => (v > 0 ? v : mean));
    // Circular moving average so the swarm path is smooth, not pixel-jagged
    for (let pass = 0; pass < 2; pass++) {
      const src = result;
      result = src.map((_, i) => {
        let sum = 0;
        for (let k = -2; k <= 2; k++) {
          sum += src[(i + k + PROFILE_BUCKETS) % PROFILE_BUCKETS];
        }
        return sum / 5;
      });
    }
    return result.map(v => Math.max(0.12, v));
  } catch {
    // Tainted canvas (cross-origin asset) — fall back to circular paths
    return null;
  }
}

// Linearly interpolated hull extent at an arbitrary screen angle
export function sampleProfile(profile: number[], angle: number) {
  const t = (angle / (Math.PI * 2)) * PROFILE_BUCKETS;
  const i0 =
    ((Math.floor(t) % PROFILE_BUCKETS) + PROFILE_BUCKETS) % PROFILE_BUCKETS;
  const i1 = (i0 + 1) % PROFILE_BUCKETS;
  const frac = t - Math.floor(t);
  return profile[i0] * (1 - frac) + profile[i1] * frac;
}

// Builds a solid-red copy of the sprite (red only where the ship is opaque)
// that the draw loop composites over the hull at an integrity-driven alpha.
export function buildTintCanvas(
  image: HTMLImageElement,
): HTMLCanvasElement | null {
  const tint = document.createElement("canvas");
  tint.width = image.naturalWidth;
  tint.height = image.naturalHeight;
  const ctx = tint.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.drawImage(image, 0, 0);
  // source-atop paints the fill only over existing (opaque) pixels, so the
  // red follows the silhouette instead of filling a rectangle
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillStyle = "rgb(255, 45, 30)";
  ctx.fillRect(0, 0, tint.width, tint.height);
  return tint;
}
