import React from "react";
import useMeasure from "helpers/hooks/useMeasure";
import {Aegis_Mode, Aegis_Relay_Target} from "generated/graphql";
import {buildHullProfile, buildTintCanvas} from "./canvas/shipImage";
import {seeded} from "./canvas/modeParams";
import {
  buildRenderables,
  growDronePool,
  resolveImpact,
  updateFocusOffset,
} from "./canvas/simulation";
import {drawDrone, drawPings, drawShip, drawStarfield} from "./canvas/render";
import {
  ActivePing,
  AegisCanvasHandle,
  Drone,
  Geometry,
  IMPACT_PING_DURATION,
  RING_PING_DURATION,
} from "./canvas/types";

export type {AegisCanvasHandle, AegisPingEvent} from "./canvas/types";

interface AegisCanvasProps {
  mode: Aegis_Mode;
  droneCount: number;
  maxDrones: number;
  deployed: boolean;
  assetPath: string;
  screenFocusX: number;
  screenFocusY: number;
  ecmIntensity: number;
  relayTarget: Aegis_Relay_Target;
  repairEffort: number;
  structuralIntegrity: number;
}

// Pseudo-3D drone swarm animation. The component owns three things — the ship
// image data, the drone pool, and the active pings — and the draw loop reads
// the rest of its inputs from a ref so it never restarts mid-flight. All the
// heavy lifting lives in ./canvas/*.
const AegisCanvas = React.forwardRef<AegisCanvasHandle, AegisCanvasProps>(
  (props, ref) => {
    const {
      mode,
      droneCount,
      maxDrones,
      deployed,
      assetPath,
      screenFocusX,
      screenFocusY,
      ecmIntensity,
      relayTarget,
      repairEffort,
      structuralIntegrity,
    } = props;
    const [dimRef, dimensions, canvas] = useMeasure<HTMLCanvasElement>();
    const shipImage = React.useRef<HTMLImageElement | null>(null);
    // Solid-red copy of the ship sprite, drawn over the ship with an alpha
    // proportional to lost integrity so the hull reddens as it weakens
    const tintCanvas = React.useRef<HTMLCanvasElement | null>(null);
    const hullProfile = React.useRef<{profile: number[]; avg: number} | null>(
      null,
    );
    const drones = React.useRef<Drone[]>([]);
    const pings = React.useRef<ActivePing[]>([]);
    // Lerped offset that shifts the screen formation toward the focus side
    const focusOffset = React.useRef({x: 0, y: 0});

    // Mirror props into a ref so the animation loop sees fresh values without
    // being torn down and recreated on every prop change.
    const stateRef = React.useRef({
      mode,
      droneCount,
      maxDrones,
      deployed,
      structuralIntegrity,
      controls: {
        focusX: screenFocusX,
        focusY: screenFocusY,
        ecmIntensity,
        relayTarget,
        repairEffort,
      },
    });
    stateRef.current = {
      mode,
      droneCount,
      maxDrones,
      deployed,
      structuralIntegrity,
      controls: {
        focusX: screenFocusX,
        focusY: screenFocusY,
        ecmIntensity,
        relayTarget,
        repairEffort,
      },
    };

    React.useImperativeHandle(ref, () => ({
      addPing: ping => {
        pings.current.push({...ping, start: performance.now()});
      },
    }));

    // Load the ship sprite and derive its hull profile + red tint once.
    React.useEffect(() => {
      const image = new Image();
      shipImage.current = image;
      hullProfile.current = null;
      tintCanvas.current = null;
      const handleLoad = () => {
        const profile = buildHullProfile(image);
        if (profile) {
          hullProfile.current = {
            profile,
            avg: profile.reduce((a, b) => a + b, 0) / profile.length,
          };
        }
        tintCanvas.current = buildTintCanvas(image);
      };
      image.addEventListener("load", handleLoad);
      image.src = assetPath;
      return () => image.removeEventListener("load", handleLoad);
    }, [assetPath]);

    React.useEffect(() => {
      let animation: number;
      let lastTime = performance.now();
      const context = canvas?.getContext("2d");

      const draw = (now: number) => {
        animation = requestAnimationFrame(draw);
        if (!canvas || !context) {
          return;
        }
        const dt = Math.min(0.1, (now - lastTime) / 1000);
        lastTime = now;
        const t = now / 1000;

        const {width, height} = dimensions;
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        context.clearRect(0, 0, width, height);
        if (width === 0 || height === 0) {
          return;
        }

        const geometry: Geometry = {
          cx: width / 2,
          cy: height / 2,
          shipRadius: Math.min(width, height) * 0.22,
          width,
          height,
        };
        const state = stateRef.current;

        drawStarfield(context, geometry, t, seeded);

        // Drop expired pings, then draw the surviving action rings
        pings.current = pings.current.filter(ping => {
          const duration =
            ping.pingType === "impact"
              ? IMPACT_PING_DURATION
              : RING_PING_DURATION;
          return (now - ping.start) / 1000 < duration;
        });
        drawPings(context, pings.current, now, geometry);

        // Per-frame easing rates (exponential approach, frame-rate safe)
        const rates = {
          param: 1 - Math.exp(-dt * 1.2),
          deploy: 1 - Math.exp(-dt * 0.9),
          life: 1 - Math.exp(-dt * 3),
        };

        growDronePool(drones.current, state);
        updateFocusOffset(focusOffset.current, state, rates.param);
        const impact = resolveImpact(pings.current, now);

        const renderable = buildRenderables({
          drones: drones.current,
          state,
          hullProfile: hullProfile.current,
          focusOffset: focusOffset.current,
          impact,
          geometry,
          rates,
          dt,
          t,
        });

        // Z-sort so the ship sits between the far and near halves of the swarm
        renderable.sort((a, b) => a.depth - b.depth);
        const droneSize = Math.max(1.2, geometry.shipRadius * 0.02);
        renderable
          .filter(d => d.depth < 0)
          .forEach(d => drawDrone(context, d, droneSize));
        drawShip(
          context,
          shipImage.current,
          tintCanvas.current,
          geometry,
          state.structuralIntegrity,
          impact.pulse,
        );
        renderable
          .filter(d => d.depth >= 0)
          .forEach(d => drawDrone(context, d, droneSize));
      };
      animation = requestAnimationFrame(draw);
      return () => {
        cancelAnimationFrame(animation);
      };
    }, [canvas, dimensions]);

    return <canvas ref={dimRef} className="aegis-canvas-element" />;
  },
);

AegisCanvas.displayName = "AegisCanvas";

export default AegisCanvas;
