import React from "react";
import {
  NavigationRoute,
  NavigationStartOptions,
  NavigationSpeedOptions,
  NavigationExitOptions,
} from "containers/FlightDirector/FlightSets/types";
import {RiskIndex} from "../../RatingBar/risk-index";
import {SpeedIndex} from "../../RatingBar/speed-index";
import {getRiskLabel, RouteStop} from "../../../helpers/flightSummary";
import "./flight-summary.scss";

const RiskChip: React.FC<{modifier: number}> = ({modifier}) =>
  modifier > 0 ? (
    <span className="text-warning" title="Risk modifier">
      +{modifier}
    </span>
  ) : null;

const OptionRow: React.FC<{
  label: string;
  option:
    | NavigationStartOptions
    | NavigationSpeedOptions
    | NavigationExitOptions;
  stat?: React.ReactNode;
}> = ({label, option, stat}) => (
  <div className="core-adv-nav-option">
    <span className="core-adv-nav-option-label">{label}</span>
    {option.imgUrl && <img src={option.imgUrl} alt="" />}
    <span className="core-adv-nav-option-name" title={option.name}>
      {option.name}
    </span>
    {stat}
    <RiskChip modifier={option.riskModifier} />
  </div>
);

export const FlightSummaryPanel: React.FC<{
  route?: NavigationRoute | null;
  stops: RouteStop[];
  stopsPassed: number;
  risk: number;
  speedRating: number;
  lastLocationName?: string | null;
  extraStartupDelay?: number;
  heading?: string;
}> = ({
  route,
  stops,
  stopsPassed,
  risk,
  speedRating,
  lastLocationName,
  extraStartupDelay = 0,
  heading = "Route",
}) => {
  if (!route) {
    return (
      <div className="core-adv-nav-summary">
        <p className="core-adv-nav-heading">Route</p>
        <p>
          No active route
          {lastLocationName ? (
            <>
              {" "}
              — last at <em>{lastLocationName}</em>
            </>
          ) : null}
        </p>
      </div>
    );
  }
  // The ship is heading for the first stop it hasn't passed yet.
  const nextIndex = Math.min(stopsPassed, stops.length - 1);
  return (
    <div className="core-adv-nav-summary">
      <p className="core-adv-nav-heading">{heading}</p>
      <div className="core-adv-nav-route">
        {stops.map((stop, i) => {
          const passed = i < stopsPassed;
          const next = i === nextIndex;
          const marker = passed
            ? "✓ "
            : stop.kind === "target"
            ? "◎ "
            : next
            ? "▶ "
            : "";
          return (
            <React.Fragment key={`${stop.id}-${i}`}>
              {i > 0 && <span>›</span>}
              <span
                className={[
                  "core-adv-nav-stop",
                  passed && "passed",
                  next && !passed && "next",
                  stop.kind === "target" && "target",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {marker}
                {stop.name}
                {stop.isBorder ? " (border)" : ""}
              </span>
            </React.Fragment>
          );
        })}
      </div>
      <OptionRow
        label="Launch"
        option={route.startOption}
        stat={
          <span>
            {route.startOption.secondsForStartup + extraStartupDelay}s
            {extraStartupDelay > 0 && ` (+${extraStartupDelay})`}
          </span>
        }
      />
      <OptionRow
        label="Speed"
        option={route.speedOption}
        stat={
          <span>
            ×{route.speedOption.speedModifier}
            {route.speedOption.requiresMaxEngines && (
              <span className="badge badge-warning ml-1">MAX ENG</span>
            )}
          </span>
        }
      />
      <OptionRow label="Exit" option={route.exitOption} />
      <RiskIndex
        width="100%"
        rating={risk}
        txtOverride={
          <span>
            Risk: {getRiskLabel(risk)} ({risk.toFixed(1)})
          </span>
        }
      />
      <SpeedIndex width="100%" rating={speedRating} />
    </div>
  );
};
