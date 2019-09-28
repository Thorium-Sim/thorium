import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
  const sim = App.simulators.find(s => s.id === id);
  if (sim) {
    action(sim);
  }
  pubsub.publish("recordSnippetsUpdate", sim);
}

App.on(
  "recordsCreate",
  ({ simulatorId, contents, timestamp = new Date(), category }) => {
    performAction(simulatorId, sim =>
      sim.createRecord({ contents, timestamp, category })
    );
  }
);
App.on("recordsCreateSnippet", ({ simulatorId, recordIds, name, type }) => {
  performAction(simulatorId, sim =>
    sim.createRecordSnippet({ records: recordIds, name, type })
  );
});
App.on("recordsAddToSnippet", ({ simulatorId, snippetId, recordIds }) => {
  performAction(simulatorId, sim =>
    sim.addRecordToSnippet(snippetId, recordIds)
  );
});
App.on("recordsRemoveFromSnippet", ({ simulatorId, snippetId, recordId }) => {
  performAction(simulatorId, sim =>
    sim.removeRecordFromSnippet(snippetId, recordId)
  );
});

/**
 * Record Generation
 */
// Course Change
App.on("navCourseEntry", ({ id, x, y, z }) => {
  const system = App.systems.find(sys => sys.id === id);
  if (
    system.currentCourse.x === system.calculatedCourse.x &&
    system.currentCourse.y === system.calculatedCourse.y &&
    system.currentCourse.z === system.calculatedCourse.z
  ) {
    App.handleEvent(
      {
        simulatorId: system.simulatorId,
        contents: `${system.destination}`,
        category: "Navigation"
      },
      "recordsCreate"
    );
  }
});
// Speed Change
// - Handled by the main event because it's tough to tell
// - if the engines speed has changed.

// Torpedos Fired
// - Handled by the main event because it's tough to tell
// - Which torpedo type was fired.

const phaserDebouncer = {};
// Phasers Fired
App.on("firePhaserBeam", ({ id, beamId }) => {
  const sys = App.systems.find(s => s.id === id);
  const beam = sys.beams.find(b => b.id === beamId);
  if (!phaserDebouncer[id] || phaserDebouncer[id] < Date.now() - 10 * 1000) {
    if (beam.charge > 0) {
      phaserDebouncer[id] = Date.now();
      App.handleEvent(
        {
          simulatorId: sys.simulatorId,
          contents: `Phaser Fired`,
          category: "Weapons"
        },
        "recordsCreate"
      );
    }
  }
});

// Shields Raised/Lowered
// - Handled by the main event because it's tough to tell
// - if the shields were just raised or if they were already
// - raised

// Short Range Comm Line Connected/Disconnected
App.on("commConnectArrow", ({ id, arrowId }) => {
  const system = App.systems.find(s => s.id === id);

  const arrow = system.arrows.find(a => a.id === arrowId);
  const signal = arrow && system.signals.find(s => s.id === arrow.signalId);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      contents: `Call Connected: ${signal.name} (${Math.round(
        system.frequency * 37700 + 37700
      ) / 100}MHz)`,
      category: "Communication"
    },
    "recordsCreate"
  );
});

App.on("commDisconnectArrow", ({ id, arrowId }) => {
  const system = App.systems.find(s => s.id === id);
  const arrow = system.arrows.find(a => a.id === arrowId);
  const signal = arrow && system.signals.find(s => s.id === arrow.signalId);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      contents: `Call Connected: ${signal.name} (${Math.round(
        system.frequency * 37700 + 37700
      ) / 100}MHz)`,
      category: "Communication"
    },
    "recordsCreate"
  );
});
App.on("commHail", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  const signal = system.signals.reduce((prev, next) => {
    if (
      next.range.lower <= system.frequency &&
      next.range.upper >= system.frequency
    )
      return next;
    return prev;
  }, null);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      contents: `New Hail: ${signal.name} (${Math.round(
        system.frequency * 37700 + 37700
      ) / 100}MHz)`,
      category: "Communication"
    },
    "recordsCreate"
  );
});
App.on("cancelHail", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  const signal = system.signals.reduce((prev, next) => {
    if (
      next.range.lower <= system.frequency &&
      next.range.upper >= system.frequency
    )
      return next;
    return prev;
  }, null);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      contents: `Hail Cancelled: ${signal.name} (${Math.round(
        system.frequency * 37700 + 37700
      ) / 100}MHz)`,
      category: "Communication"
    },
    "recordsCreate"
  );
});
App.on("connectHail", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  const signal = system.signals.reduce((prev, next) => {
    if (
      next.range.lower <= system.frequency &&
      next.range.upper >= system.frequency
    )
      return next;
    return prev;
  }, null);
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      contents: `Hail Connected: ${signal.name} (${Math.round(
        system.frequency * 37700 + 37700
      ) / 100}MHz)`,
      category: "Communication"
    },
    "recordsCreate"
  );
});

// LRM Messages w/ destination, including who wrote it
// - Handled by the main event because it's complicated

// Alert Status Change
// - Handled by the main event because it's tough to tell
// - if the alert status changed from something different

// Transports
// - Handled by the main event because it's tough to tell
// - what was transported

// System damaged & repaired
App.on("damageSystem", ({ systemId, report, destroyed, which = "default" }) => {
  if (which === "default") {
    let sys = App.systems.find(s => s.id === systemId);
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        contents: `${sys.displayName} Damaged`,
        category: "Systems"
      },
      "recordsCreate"
    );
  }
});
// - Repair handled by main event because it's tough to tell
// - what kind of report it is

// Probes launched
App.on("fireProbe", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      contents: `Probe Launched`,
      category: "Probes"
    },
    "recordsCreate"
  );
});

App.on("launchProbe", ({ id, probe }) => {
  const sys = App.systems.find(s => s.id === id);
  if (!sys.torpedo) {
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        contents: `Probe Launched`,
        category: "Probes"
      },
      "recordsCreate"
    );
  }
});
