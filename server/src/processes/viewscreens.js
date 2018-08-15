import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

const viewscreenCache = [];
function viewscreenMachine() {
  // Loop through each viewscreen on a simulator
  App.viewscreens.forEach(viewscreen => {
    if (!viewscreen.auto) return;
    let cache = viewscreenCache.find(v => v.id === viewscreen.id);
    if (!cache) {
      cache = { id: viewscreen.id };
      viewscreenCache.push(cache);
    }

    // First, calculate the priority of all of the screens
    // Red Alert
    const simulator = App.simulators.find(
      sim => sim.id === viewscreen.simulatorId
    );
    cache.RedAlert = { priority: simulator.alertlevel === "1" ? 0.21 : 0 };

    // Forward Scans - this is the default
    cache.ForwardScans = { priority: 0.2 };

    // Overheating
    const engines = App.systems.filter(
      s => s.simulatorId === viewscreen.simulatorId && s.type === "Engine"
    );
    cache.Overheating = {
      priority: engines.filter(e => e.heat >= 0.8).length > 0 ? 0.8 : 0
    };

    // Shield Monitoring
    const shields = App.systems.filter(
      s => s.simulatorId === viewscreen.simulatorId && s.type === "Shield"
    );
    // Keep track of the state of the shields
    cache.ShieldMonitoring = cache.ShieldMonitoring || {};
    // Loop through the shields and check to see if they are raised.
    // If one of the shields is suddenly raised or lowered, spike the priority.
    shields.forEach(shield => {
      if (!cache.ShieldMonitoring[shield.id]) {
        cache.ShieldMonitoring.priority = 0;
      } else if (shield.state !== cache.ShieldMonitoring[shield.id]) {
        cache.ShieldMonitoring.priority = 0.75;
      }
      cache.ShieldMonitoring[shield.id] = shield.state;
    });

    // Stealth Monitoring
    // Same idea as Shields
    const stealth = App.systems.filter(
      s => s.simulatorId === viewscreen.simulatorId && s.type === "StealthField"
    );
    cache.StealthMonitoring = cache.StealthMonitoring || {};
    stealth.forEach(s => {
      if (!cache.StealthMonitoring[s.id]) {
        cache.StealthMonitoring.priority = 0;
      } else if (s.state !== cache.StealthMonitoring[s.id]) {
        cache.StealthMonitoring.priority = 0.75;
      }
      cache.StealthMonitoring[s.id] = s.state;
    });
    // Course Calculation
    const nav = App.systems.filter(
      s => s.simulatorId === viewscreen.simulatorId && s.type === "Navigation"
    );
    cache.CourseCalculation = cache.CourseCalculation || {};
    // Loop through nav
    nav.forEach(n => {
      if (n.calculate && n.scanning) {
        cache.CourseCalculation.priority = 0.77;
      }
      cache.CourseCalculation[n.id] = n.scanning;
    });

    // Communications
    // Override most anything (except Overheating)
    const comm = App.systems.filter(
      s =>
        s.simulatorId === viewscreen.simulatorId && s.type === "ShortRangeComm"
    );
    cache.Communications = cache.Communications || {};
    comm.forEach(c => {
      // Check for if the comm is hailing or if it has any arrows.
      if (c.arrows.length > 0 || c.state === "hailing") {
        cache.Communications.priority = 0.76;
      }
    });
    // Stars
    cache.Stars = cache.Stars || {};
    cache.Stars = {
      priority:
        engines.filter(e => e.on === true).length > 0
          ? 0.5
          : cache.Stars.priority || 0
    };

    // Next, set the viewscreen to the screen with the highest priority
    const component = Object.keys(cache).reduce((prev, next) => {
      if (next === "id") return prev;
      if (!prev) return next;
      if (cache[next].priority > cache[prev].priority) {
        return next;
      }
      return prev;
    }, null);
    if (component) viewscreen.updateComponent(component, { reactive: true });
    // Finally, decriment all of the viewscreen's priority
    Object.keys(cache).forEach(c => {
      if (c !== "id") {
        cache[c].priority = Math.max(cache[c].priority - 0.02, 0);
      }
    });
  });

  pubsub.publish("viewscreensUpdate", App.viewscreens);
  setTimeout(viewscreenMachine, 500);
}

viewscreenMachine();
