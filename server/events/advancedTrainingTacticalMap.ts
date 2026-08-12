import App from "../app";
import * as Classes from "../classes";
import uuid from "uuid";
import {pubsub} from "../helpers/subscriptionManager";
import {AdvancedTrainingProgress} from "../classes/advancedTrainingProgress";
import {publishProgress} from "./advancedTrainingHelpers";

// Lifecycle for the live, per-client tactical map instance backing a
// chapter's tactical-map training exercise. Kept separate from
// advancedTraining.ts / advancedTrainingHelpers.ts so those files don't grow
// unwieldy.
//
// Mirrors the template -> flight-instance duplication pattern used by
// showViewscreenTactical (server/events/tacticalMap.js), but scoped to a
// single client rather than shared across a flight: two trainees on the same
// simulator each get their own private copy of the map, both driven by that
// simulator's single shared Thrusters system (see the mapIds filter added to
// server/processes/thrusters.js).

// Delete this client's existing live tactical map instance, if any.
export function teardownTrainingTacticalMap(
  progress: AdvancedTrainingProgress,
) {
  if (!progress.activeTacticalMapId) {
    return;
  }
  const mapId = progress.activeTacticalMapId;
  App.tacticalMaps = App.tacticalMaps.filter((t: any) => t.id !== mapId);
  progress.setActiveTacticalMapId(null);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
}

// Duplicate `chapter`'s template tactical map into a fresh instance owned by
// this client, tearing down any prior instance first so re-entering a
// chapter (or replaying it) always starts from the template's original
// positions. Safe to call unconditionally on every chapter activation —
// it's a no-op (aside from the teardown) when the chapter has no
// tacticalMapId configured.
export function provisionTrainingTacticalMap(
  progress: AdvancedTrainingProgress,
  chapter: any,
  clientId: string,
) {
  teardownTrainingTacticalMap(progress);

  if (!chapter?.tacticalMapId) {
    return;
  }

  const template = App.tacticalMaps.find(
    (t: any) => t.id === chapter.tacticalMapId,
  );
  if (!template) {
    return;
  }

  const client = App.clients.find((c: any) => c.id === clientId);
  if (!client || !client.simulatorId) {
    return;
  }

  const flight = App.flights.find((f: any) =>
    f.simulators.includes(client.simulatorId),
  );
  if (!flight) {
    return;
  }

  const instance = new (Classes as any).TacticalMap(
    Object.assign({}, template, {
      id: uuid.v4(),
      dup: true,
      flightId: flight.id,
      template: false,
      templateId: chapter.tacticalMapId,
      trainingClientId: clientId,
    }),
  );
  App.tacticalMaps.push(instance);
  progress.setActiveTacticalMapId(instance.id);
  pubsub.publish("tacticalMapsUpdate", App.tacticalMaps);
}

// --- UI state event ---

App.on("advancedTrainingToggleTacticalMapViewer", ({clientId, open}: any) => {
  const progress = (App.advancedTrainingProgress || []).find(
    (p: any) => p.clientId === clientId,
  );
  if (!progress) {
    return;
  }
  progress.setTacticalMapViewerOpen(open);
  publishProgress();
});
