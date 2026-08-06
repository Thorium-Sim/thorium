import App from "../app";
import {withinGoalRadius} from "../helpers/trainingGoalDistance";

// Checks each active advanced-training tactical map exercise for whether a
// player-controlled item has reached a `trainingGoal` item, firing the
// synthetic __tacticalMapGoal__ action (consumed by
// server/events/advancedTraining.ts's clientAdvancedTrainingAction handler,
// same as __videoComplete__) the first time it happens.
//
// Kept as its own process (rather than folded into server/processes/thrusters.js)
// so that file only needed the small mapIds addition to also drive these maps.

const TICK_INTERVAL = 200;
const GOAL_EVENT = "__tacticalMapGoal__";

// A "player" object is any objects-layer item the FD has wired up to
// respond to thruster input — the same criterion that already makes
// server/processes/thrusters.js move it. No separate "this is the player
// ship" flag is needed.
function hasThrusterControls(item: any): boolean {
  const tc = item.thrusterControls;
  return !!(tc && (tc.up || tc.down || tc.left || tc.right || tc.rotation));
}

function checkTrainingGoals() {
  const progressList = App.advancedTrainingProgress || [];

  for (const progress of progressList) {
    if (!progress.activeTacticalMapId || !progress.activeSubChapterId) {
      continue;
    }

    // Skip once already recorded for the active sub-chapter. Re-emitting is
    // harmless (recordAction/completeSubChapter are idempotent) but would
    // still trigger a publishProgress() broadcast every tick for nothing.
    const observed =
      progress.observedActions?.[progress.activeSubChapterId] || [];
    if (observed.includes(GOAL_EVENT)) {
      continue;
    }

    const map = App.tacticalMaps.find(
      (t: any) => t.id === progress.activeTacticalMapId,
    );
    if (!map) {
      continue;
    }

    const players: any[] = [];
    const goals: any[] = [];
    for (const layer of map.layers) {
      if (layer.type !== "objects") {
        continue;
      }
      for (const item of layer.items) {
        if (item.trainingGoal) {
          goals.push(item);
        } else if (hasThrusterControls(item)) {
          players.push(item);
        }
      }
    }
    if (players.length === 0 || goals.length === 0) {
      continue;
    }

    const reached = players.some(player =>
      goals.some(goal =>
        withinGoalRadius(
          player.location,
          goal.location,
          goal.trainingGoalRadius,
        ),
      ),
    );

    if (reached) {
      App.emit("clientAdvancedTrainingAction", {
        clientId: progress.clientId,
        eventName: GOAL_EVENT,
        args: null,
      });
    }
  }

  setTimeout(checkTrainingGoals, TICK_INTERVAL);
}

checkTrainingGoals();
