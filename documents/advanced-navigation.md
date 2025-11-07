# Advanced Navigation & Astrometrics – System Overview

This document summarizes the Advanced Navigation & Astrometrics system’s layout, technologies, and interaction patterns to inform future work.

## What it is

- **Purpose**: Plan, execute, and monitor ship flight paths across a 2D flight set map; manage heat/coolant; display ETA and current motion; handle probes.
- **Core model**: A flight path is a `NavigationRoute` with a `startOption`, `speedOption`, `exitOption`, a destination (`targetLocationId`), and optional `secondaryRouteOptions`.

## Tech stack

- **Frontend**: React (TypeScript/JSX), Apollo GraphQL hooks (generated), Reactstrap for UI, app-level theme/styles in `styles.css` and shared components.
- **Backend**: Node/TypeScript GraphQL server, class-based system `AdvancedNavigationAndAstrometrics`, schema and resolvers in `server/typeDefs/flightSets.ts`, event handlers in `server/events/advancedNavigationAndAstrometrics.ts`. Live updates via `advancedNavAndAstrometricsUpdate` and starfield velocity via `advancedNavStarsUpdate`.

## Code layout

- Frontend UI (cards and core view):
  - `src/components/views/AdvancedNavAndAstrometrics/AdvancedNavigationCard.tsx` – Card container (wires queries, subscriptions, and common mutations; passes props to the view).
  - `src/components/views/AdvancedNavAndAstrometrics/AdvancedNavigation.tsx` – Main view; provides map, sidebars, and workflow to create/engage routes.
  - `src/components/views/AdvancedNavAndAstrometrics/components/` – Subcomponents:
    - `FlightPathDecision/` – Multi-step flow to plan routes (destination, start, speed, exit, secondary stops) and summary.
    - `Sidebars/Overview.tsx` and `Sidebars/Location.tsx` – Action shortcuts and details.
    - Context providers for map/flight sets.
  - Queries and mutations in `queries/` (e.g., `getAdvNavAndAstro.graphql`, `handleEngageFlightPath.graphql`, `handleUpdateCurrentFlightPath.graphql`).
  - Core controls/UI: `CoreAdvancedNavigation.tsx` and `components/CoreComponents/advanced-flight.tsx` expose ETA, engine flux, stop/resume, change location override, and show/hide toggles.

- Backend system:
  - Class: `server/classes/advancedNavigationAndAstrometrics.ts` – Holds state (flight sets, current location, engine status, ETA, paths, probes); drives time-based updates and state transitions.
  - Schema/resolvers: `server/typeDefs/flightSets.ts` – GraphQL types, queries, mutations (e.g., `handleEngageFlightPath`, `handleUpdateCurrentFlightPath`, `handleUpdateEta`, `handleResumePath`, `handleShowEta`).
  - Events: `server/events/advancedNavigationAndAstrometrics.ts` – Wires mutations to class methods and publishes updates (`advancedNavAndAstrometricsUpdate`).

## Data flow (typical)

1. Client subscribes to `advancedNavAndAstrometricsUpdate` and queries `advancedNavAndAstrometrics(simulatorId)`.
2. Creating or engaging a flight path calls `handleEngageFlightPath(id, path)`.
3. The system transitions `engineStatus` (STARTUP → ENGAGED/FULL_POWER) after startup, generates `flightPathCoords`, and computes `remainingEta`/`totalEta`.
4. On each tick (`executeLoopInterval`), it advances `currentLocation`, decrements ETA, and stops upon arrival (publishing a notify event).
5. Speed and ETA can be affected via:
   - `handleUpdateCurrentFlightPath(id, route)`: replace the current route (e.g., change `speedOption`).
   - `handleUpdateEta(id, eta)`: directly reset ETA based on last visited coordinate.
6. Starfield speed rendering subscribes to `advancedNavStarsUpdate(simulatorId)` for `{ velocity, activating }` derived from the current route and engine state.

## Key types (frontend schema highlights)

- `FlightSet`: defines background image, `startOptions`, `speedOptions`, `exitOptions`, POIs, borders, and map dimensions. Additional fields: `label`, `probeLaunchRangeRadius`, `addOnTraining`, `pixelDistanceModifier`, optional `probeSpeedModifier`.
- `NavigationRoute`: `{ targetLocationId, isBorder, startOption, speedOption, exitOption, secondaryRouteOptions }`.
- `NavigationSpeedOptions`: `{ id, name, speedModifier, riskModifier, requiresMaxEngines, imgUrl }` – `requiresMaxEngines` escalates engine mode to FULL_POWER while moving.
- `PointOfInterest`: `{ id, name, location, isVisible, isFogOfWar, speedIndex, riskIndex, type, information, iconUrl, fullImageUrl, transitOptions, showName, arrivalMacros, leaveMacros, transitMacros }`.
- `AdvancedNavigationAndAstrometrics`: includes flight sets, `currentFlightSet`, `currentFlightPath`, `engineStatus`, `remainingEta`, `flightPathCoords`, heat/coolant, probes, and stringified maps: `flightSetPathMap`, `probeAssignments`.
- `AdvancedNavStarsData`: `{ velocity, activating }` used for starfield animation.

## Engine modes, heat, and coolant

- Engine modes: STOPPED, STARTUP, ENGAGED, FULL_POWER, FLUX.
- Startup honors `startOption.secondsForStartup` before movement; on engage, engine auto-sets to FULL_POWER if `speedOption.requiresMaxEngines` else ENGAGED.
- `handleEngineFlux(id)` toggles FLUX while moving; exiting FLUX returns to FULL_POWER/ENGAGED based on current `speedOption`.
- Heat increases with mode (ENGAGED < FULL_POWER < FLUX). `handleSetHeatLevel(id, level)` and `handleCoolantFlush(id)`/`handleSetCoolantLevel(id, level)` control thermal state.

## Theming & UX

- Uses shared list and status components (SelectableListView, index bars), and consistent spacing/panels from `styles.css`.
- Sidebars present actions; main canvas shows the map and path.
- Buttons are Reactstrap `<Button>` with consistent 100% width in sidebars for primary actions.

## Operations you’ll likely use

- Engage path: `handleEngageFlightPath(id, path)`
- Update current path (e.g., speed): `handleUpdateCurrentFlightPath(id, route)`
- Toggle ETA display: `handleShowEta(id, show)`
- Emergency stop / resume: `handleEmergencyStop(id)` / `handleResumePath(id)`
- Adjust ETA: `handleUpdateEta(id, eta)`
- Toggle engine flux: `handleEngineFlux(id)`
- Show/hide current flight set: `handleShowFlightSet(id, show)`
- Override current location (admin/testing): `handleOverrideLocation(id, location, currentLocationUrl?, currentLocationName?)`
- Save and reuse routes: `handleSaveFlightPath(id, path)`; access via `flightSetPathMap`
- Manage flight sets: `handleAddFlightSetToNavigation(id, flightSetId)`, `handleUpdateCurrentFlightSet(id, flightSetId)`, macros `addFlightSetToNavigation`, `selectCurrentFlightSet(simulatorId, flightSetId, show)`
- Probes & POIs: `handleAddProbeAssignment(id, probeId, poiId)`, `handleUpdateProbeAssignments(id, probeAssignments)`; macros `showPoiOnCurrentFlightSet(simulatorId, flightSetId, poiId, showName)`, `showPoiInformationOnCurrentFlightSet(simulatorId, poiId, infoType)`
- Starfield velocity: query/sub `advancedNavStars(simulatorId)` / `advancedNavStarsUpdate(simulatorId)`

## Notes for future changes

- To change speed mid-flight, construct a new `NavigationRoute` using the same `targetLocationId`, `startOption`, `exitOption`, and `secondaryRouteOptions`, but swap the `speedOption`. Send via `handleUpdateCurrentFlightPath`.
- The class recalculates `flightPathCoords` and ETA upon route updates, preserving progress from the last visited coordinate.
- Updating the route mid-flight may transition engine mode between ENGAGED and FULL_POWER based on `speedOption.requiresMaxEngines`.
- Speed changes emit a triggerable event (`advancedNavSpeedChange`) with `{ simulatorId, speedName }` and publish a user-facing notification.
- Use `advancedNavStarsUpdate` to reflect speed/state changes in visuals without polling full system state.
- Admin/testing can quickly reposition using `handleOverrideLocation` which also stops engines and updates current location metadata.
