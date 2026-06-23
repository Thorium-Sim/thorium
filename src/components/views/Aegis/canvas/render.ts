import {
  ActivePing,
  Geometry,
  Renderable,
  PING_COLORS,
  RING_PING_DURATION,
} from "./types";

// Twinkling starfield drawn behind the swarm each frame.
export function drawStarfield(
  ctx: CanvasRenderingContext2D,
  geometry: Geometry,
  t: number,
  seeded: (i: number, salt: number) => number,
) {
  const {width, height} = geometry;
  for (let i = 0; i < 60; i++) {
    const sx = seeded(i, 21) * width;
    const sy = seeded(i, 22) * height;
    const twinkle = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.5 + i));
    ctx.globalAlpha = twinkle;
    ctx.fillStyle = "#cfe8ff";
    ctx.fillRect(sx, sy, seeded(i, 23) > 0.8 ? 2 : 1, 1);
  }
  ctx.globalAlpha = 1;
}

// Expanding rings for visible ship actions (comms, scans, sonar). Impact
// pings are handled through the swarm, not here, so they're skipped.
export function drawPings(
  ctx: CanvasRenderingContext2D,
  pings: ActivePing[],
  now: number,
  geometry: Geometry,
) {
  const {cx, cy, width, height, shipRadius} = geometry;
  const maxRing = Math.hypot(width, height) / 2;
  pings.forEach(ping => {
    if (ping.pingType === "impact") {
      return;
    }
    const age = (now - ping.start) / 1000 / RING_PING_DURATION;
    const color = PING_COLORS[ping.pingType] || PING_COLORS.scan;
    const boost = Math.min(2, ping.strength);
    const drawRing = (ringAge: number) => {
      if (ringAge < 0 || ringAge >= 1) {
        return;
      }
      const radius = shipRadius * 0.5 + (maxRing - shipRadius * 0.5) * ringAge;
      ctx.strokeStyle = `rgba(${color}, ${(1 - ringAge) * 0.35 * boost})`;
      ctx.lineWidth = 1 + boost;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    };
    drawRing(age);
    // Amplified signals trail a second ring
    if (ping.strength > 1.05) {
      drawRing(age - 0.18);
    }
  });
}

// Draw a single drone as a translucent halo, a solid core, and a bright
// center. Flaring drones shift from cyan toward hot orange. (Canvas
// shadowBlur is far too slow for a 120-drone swarm, so glow is faked.)
export function drawDrone(
  ctx: CanvasRenderingContext2D,
  d: Renderable,
  droneSize: number,
) {
  const alpha = Math.max(0, Math.min(1, d.alpha));
  const heat = Math.min(1, d.flare);
  ctx.fillStyle =
    heat > 0.01
      ? `rgb(${Math.round(92 + 163 * heat)}, ${Math.round(
          217 - 47 * heat,
        )}, ${Math.round(255 - 165 * heat)})`
      : "#5cd9ff";
  ctx.globalAlpha = alpha * 0.3;
  ctx.beginPath();
  ctx.arc(d.x, d.y, droneSize * d.scale * 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(d.x, d.y, droneSize * d.scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e8fbff";
  ctx.beginPath();
  ctx.arc(d.x, d.y, droneSize * d.scale * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// Draw the ship sprite, then composite the red tint over it. Tint alpha grows
// as structural integrity drops (colorless at 100%) and flashes brighter for
// a moment when a hit lands.
export function drawShip(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement | null,
  tint: HTMLCanvasElement | null,
  geometry: Geometry,
  integrity: number,
  impactPulse: number,
) {
  if (!image || !image.complete || image.naturalWidth === 0) {
    return;
  }
  const {cx, cy, shipRadius} = geometry;
  const fit =
    (shipRadius * 2) / Math.max(image.naturalWidth, image.naturalHeight);
  const drawWidth = image.naturalWidth * fit;
  const drawHeight = image.naturalHeight * fit;
  const left = cx - drawWidth / 2;
  const top = cy - drawHeight / 2;
  ctx.drawImage(image, left, top, drawWidth, drawHeight);

  const tintAlpha = Math.min(0.85, (1 - integrity) * 0.3 + impactPulse * 0.3);
  if (tint && tintAlpha > 0.01) {
    ctx.globalAlpha = tintAlpha;
    ctx.drawImage(tint, left, top, drawWidth, drawHeight);
    ctx.globalAlpha = 1;
  }
}
