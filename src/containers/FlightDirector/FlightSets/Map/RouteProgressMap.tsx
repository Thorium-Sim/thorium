import React, {useEffect, useRef, useState} from "react";
import {BasicCoordinate, FullCoordinate} from "./ImageCanvas";

export type RouteProgressMapProps = {
  imageUrl: string;
  // [origin, ...stops, target], as generated for the active flight path.
  coordinates: FullCoordinate[];
  shipLocation: BasicCoordinate;
  // Index in `coordinates` of the last point the ship has passed.
  passedIndex: number;
};

const TRAVELED_ALPHA = 0.35;

/**
 * Read-only map for the FD core: the whole route, split into the part already
 * flown (dimmed) and the part still to go, with the ship on top. This is its own
 * component because ImageCanvas' line mode repaints the background over anything
 * drawn before it, which would hide the ship marker.
 */
export const RouteProgressMap: React.FC<RouteProgressMapProps> = ({
  imageUrl,
  coordinates,
  shipLocation,
  passedIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({width: 0, height: 0});
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () =>
      setSize({width: el.offsetWidth, height: el.offsetHeight});
    update();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !image || !size.width || !size.height) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.width, size.height);

    const scale = Math.min(
      size.width / image.width,
      size.height / image.height,
    );
    const offsetX = (size.width - image.width * scale) / 2;
    const offsetY = (size.height - image.height * scale) / 2;
    const px = (p: BasicCoordinate) => ({
      x: p.x * scale + offsetX,
      y: p.y * scale + offsetY,
    });

    ctx.drawImage(
      image,
      offsetX,
      offsetY,
      image.width * scale,
      image.height * scale,
    );

    const segment = (
      from: BasicCoordinate,
      to: BasicCoordinate,
      color: string,
      alpha: number,
    ) => {
      const a = px(from);
      const b = px(to);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    if (coordinates.length > 1) {
      // Each segment takes the color of the point it leaves, same as ImageCanvas.
      const last = coordinates.length - 1;
      const passed = Math.min(Math.max(passedIndex, 0), last - 1);
      for (let i = 0; i < last; i++) {
        if (i < passed) {
          segment(
            coordinates[i],
            coordinates[i + 1],
            coordinates[i].color,
            TRAVELED_ALPHA,
          );
        } else if (i === passed) {
          segment(
            coordinates[i],
            shipLocation,
            coordinates[i].color,
            TRAVELED_ALPHA,
          );
          segment(shipLocation, coordinates[i + 1], coordinates[i].color, 1);
        } else {
          segment(coordinates[i], coordinates[i + 1], coordinates[i].color, 1);
        }
      }
      ctx.globalAlpha = 1;

      // Stops are rings; the target gets a crosshair.
      for (let i = 1; i < last; i++) {
        const p = px(coordinates[i]);
        ctx.globalAlpha = i <= passedIndex ? TRAVELED_ALPHA : 1;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const t = px(coordinates[last]);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 9, 0, 2 * Math.PI);
      ctx.moveTo(t.x - 13, t.y);
      ctx.lineTo(t.x - 6, t.y);
      ctx.moveTo(t.x + 6, t.y);
      ctx.lineTo(t.x + 13, t.y);
      ctx.moveTo(t.x, t.y - 13);
      ctx.lineTo(t.x, t.y - 6);
      ctx.moveTo(t.x, t.y + 6);
      ctx.lineTo(t.x, t.y + 13);
      ctx.stroke();
    }

    // Ship: solid dot with a soft halo so it stays visible over busy backgrounds.
    const ship = px(shipLocation);
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, 12, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ship.x, ship.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }, [image, size, coordinates, shipLocation, passedIndex]);

  return (
    <div
      ref={containerRef}
      className="route-progress-map"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "10rem",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}
      />
    </div>
  );
};
