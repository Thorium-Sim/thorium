import uuid from "uuid";
import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";
import {
  FabricationJob,
  FabricationRecipe,
  FabricationRecipeItem,
  MAX_RECIPE_INPUTS,
} from "../classes/fabrication";
import {getFabricationSettings} from "../typeDefs/fabrication";
import type Simulator from "../classes/simulator";

// Cap on how many batches a single job can run, to keep durations sane
const MAX_BATCHES = 10;

// After this many close attempts at the same secret recipe, alert the FD
// so they can decide whether to show the hint
const NEAR_MISS_ALERT_THRESHOLD = 3;

function publishRecipes() {
  pubsub.publish("fabricationRecipesUpdate", App.fabricationRecipes);
}
function publishJobs() {
  pubsub.publish("fabricationJobsUpdate", App.fabricationJobs);
}
function publishSettings(simulatorId: string) {
  pubsub.publish("fabricationSettingsUpdate", getFabricationSettings(simulatorId));
}

function findInventory(simulatorId: string, name: string) {
  const compare = name.trim().toLowerCase();
  return App.inventory.find(
    i => i.simulatorId === simulatorId && i.name.trim().toLowerCase() === compare,
  );
}

function findRecipe(simulatorId: string, recipe: string) {
  const compare = (recipe || "").trim().toLowerCase();
  return App.fabricationRecipes.find(
    r =>
      r.simulatorId === simulatorId &&
      (r.id === recipe || r.name.trim().toLowerCase() === compare),
  );
}

// Rooms tagged with the fabrication role. When any exist, fabrication is
// restricted to them; otherwise any room works.
function fabricationRooms(simulatorId: string) {
  return App.rooms.filter(
    r =>
      r.simulatorId === simulatorId &&
      (r.roles || []).indexOf("fabrication") > -1,
  );
}

function notifyCore(simulatorId: string, title: string, color: string) {
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId,
    type: "Fabrication",
    station: "Core",
    title,
    body: "",
    color,
  });
  App.handleEvent(
    {simulatorId, component: "FabricationCore", title, body: null, color},
    "addCoreFeed",
  );
}

// Notify every station that carries the Fabrication card
function notifyCrew(simulatorId: string, title: string, body = "") {
  const simulator: Simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) return;
  simulator.stations
    .filter(s => s.cards.find(c => c.component === "Fabrication"))
    .forEach(s => {
      pubsub.publish("notify", {
        id: uuid.v4(),
        simulatorId,
        type: "Fabrication",
        station: s.name,
        title,
        body,
        color: "info",
        relevantCards: ["Fabrication"],
      });
    });
}

const COUNTERMEASURE_MATERIALS = [
  "copper",
  "titanium",
  "carbon",
  "plastic",
  "plasma",
];

// Each fabricated coolant unit refills this fraction of the coolant tank
const COOLANT_PER_UNIT = 0.1;

// Each fabricated shield booster restores this fraction of shield integrity
const SHIELD_BOOST_PER_UNIT = 0.1;

// Some outputs skip the cargo hold and integrate straight into the system
// that uses them: torpedo warheads load into the launcher, railgun ammo into
// the magazine, coolant into the tank, shield boosters into the emitters,
// and countermeasure materials into the fabricator's stores.
// Returns the delivery-destination text, or null when the output isn't an
// integrated type (or the ship lacks the system — then it falls back to
// cargo delivery so nothing is lost).
function deliverToSystem(job: FabricationJob): string | null {
  const metadata = job.output.metadata || {};
  if (metadata.type === "torpedo") {
    const launcher = App.systems.find(
      s => s.simulatorId === job.simulatorId && s.class === "Torpedo",
    );
    if (!launcher) return null;
    for (let i = 0; i < job.output.count; i++) {
      launcher.addWarhead({type: metadata.warheadType || "photon"});
    }
    pubsub.publish(
      "torpedosUpdate",
      App.systems.filter(s => s.type === "Torpedo"),
    );
    return `loaded into ${launcher.displayName || launcher.name}`;
  }
  if (metadata.type === "railgunAmmo") {
    const railgun = App.systems.find(
      s => s.simulatorId === job.simulatorId && s.class === "Railgun",
    );
    if (!railgun) return null;
    railgun.availableAmmo += job.output.count;
    pubsub.publish(
      "railgunUpdate",
      App.systems.filter(s => s.id === railgun.id),
    );
    return `added to the railgun magazine`;
  }
  if (metadata.type === "coolant") {
    const tank = App.systems.find(
      s => s.simulatorId === job.simulatorId && s.class === "Coolant",
    );
    // A full tank falls back to cargo so the canisters aren't wasted
    if (!tank || tank.coolant >= 1) return null;
    tank.setCoolant(tank.coolant + job.output.count * COOLANT_PER_UNIT);
    pubsub.publish(
      "coolantUpdate",
      App.systems.filter(s => s.type === "Coolant"),
    );
    return `added to the coolant tank (now ${Math.round(
      tank.coolant * 100,
    )}%)`;
  }
  if (metadata.type === "shieldBoost") {
    const damagedShields = () =>
      App.systems
        .filter(
          s =>
            s.simulatorId === job.simulatorId &&
            s.type === "Shield" &&
            s.integrity < 1,
        )
        .sort((a, b) => a.integrity - b.integrity);
    // All shields at full integrity falls back to cargo, like a full
    // coolant tank does
    if (damagedShields().length === 0) return null;
    // Each unit reinforces whichever shield is weakest at that moment
    for (let i = 0; i < job.output.count; i++) {
      const weakest = damagedShields()[0];
      if (!weakest) break;
      weakest.setIntegrity(weakest.integrity + SHIELD_BOOST_PER_UNIT);
    }
    pubsub.publish(
      "shieldsUpdate",
      App.systems.filter(s => s.type === "Shield"),
    );
    return "channeled into the shield emitters";
  }
  if (metadata.type === "countermeasureMaterial") {
    const material = job.output.name.trim().toLowerCase();
    if (!COUNTERMEASURE_MATERIALS.includes(material)) return null;
    const countermeasures = App.systems.find(
      s => s.simulatorId === job.simulatorId && s.class === "Countermeasures",
    );
    if (!countermeasures) return null;
    countermeasures.storedMaterials[material] =
      (countermeasures.storedMaterials[material] || 0) + job.output.count;
    pubsub.publish("countermeasuresUpdate", countermeasures);
    return `added to countermeasure material stores`;
  }
  return null;
}

// Deposit a finished job's output into its room, creating the inventory item
// if the ship doesn't carry it yet. Shared by the process loop and the
// "complete now" mutation.
export function deliverFabricationJob(job: FabricationJob) {
  if (job.status !== "active") return;
  let destination = deliverToSystem(job);
  if (!destination) {
    const existing = findInventory(job.simulatorId, job.output.name);
    if (existing) {
      existing.updateCount(
        job.roomId,
        (existing.roomCount[job.roomId] || 0) + job.output.count,
      );
    } else {
      App.inventory.push(
        new Classes.InventoryItem({
          simulatorId: job.simulatorId,
          name: job.output.name,
          metadata: job.output.metadata || {},
          roomCount: {[job.roomId]: job.output.count},
        }),
      );
    }
    const room = App.rooms.find(r => r.id === job.roomId);
    destination = room ? `delivered (${room.name})` : "delivered";
    pubsub.publish("inventoryUpdate", App.inventory);
  }
  job.complete();
  notifyCore(
    job.simulatorId,
    `Fabrication Complete: ${job.output.count} x ${job.output.name} — ${destination}`,
    "success",
  );
  notifyCrew(
    job.simulatorId,
    "Fabrication Complete",
    `${job.output.count} x ${job.output.name} ${destination}`,
  );
  publishJobs();
}

App.on("addFabricationRecipe", ({simulatorId, recipe}) => {
  App.fabricationRecipes.push(
    new FabricationRecipe({...recipe, simulatorId}),
  );
  publishRecipes();
});

App.on("updateFabricationRecipe", ({id, recipe}) => {
  const existing = App.fabricationRecipes.find(r => r.id === id);
  if (!existing) return;
  existing.update(recipe);
  publishRecipes();
});

App.on("removeFabricationRecipe", ({id}) => {
  App.fabricationRecipes = App.fabricationRecipes.filter(r => r.id !== id);
  publishRecipes();
});

// `recipe` can be an id or a recipe name so timeline macros keep working
// across flights, where recipe ids differ from the template's.
App.on("revealFabricationRecipe", ({simulatorId, recipe}) => {
  const found = findRecipe(simulatorId, recipe);
  if (!found || found.discovered || !found.secret) return;
  found.reveal();
  notifyCore(simulatorId, `Schematic Unlocked: ${found.name}`, "info");
  notifyCrew(
    simulatorId,
    "Schematic Unlocked",
    `${found.name} has been added to the schematic database.`,
  );
  publishRecipes();
});

App.on("showFabricationRecipeHint", ({simulatorId, recipe}) => {
  const found = findRecipe(simulatorId, recipe);
  if (!found || !found.secret || found.discovered || found.hintVisible) return;
  found.showHint();
  notifyCore(simulatorId, `Schematic Hint Shown: ${found.name}`, "info");
  notifyCrew(
    simulatorId,
    "Schematic Fragment Detected",
    "A partial schematic has appeared in the fabricator database.",
  );
  publishRecipes();
});

App.on("setFabricationEnabled", ({simulatorId, enabled}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) return;
  simulator.fabricationEnabled = Boolean(enabled);
  notifyCore(
    simulatorId,
    `Fabricator ${enabled ? "Online" : "Offline"}`,
    enabled ? "success" : "danger",
  );
  notifyCrew(
    simulatorId,
    `Fabricator ${enabled ? "Online" : "Offline"}`,
    enabled
      ? "The fabricator is accepting jobs again."
      : "The fabricator is not responding.",
  );
  publishSettings(simulatorId);
});

App.on("setFabricationJobLimit", ({simulatorId, limit}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) return;
  simulator.fabricationJobLimit = Math.max(0, Math.round(limit) || 0);
  publishSettings(simulatorId);
});

App.on("startFabrication", ({simulatorId, roomId, inputs, count, cb}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (simulator && simulator.fabricationEnabled === false) {
    return cb("ERROR:The fabricator is offline.");
  }
  const stacks: FabricationRecipeItem[] = (inputs || [])
    .map(i => ({name: (i.name || "").trim(), count: Math.round(i.count) || 0}))
    .filter(i => i.name && i.count > 0);
  if (stacks.length === 0 || stacks.length > MAX_RECIPE_INPUTS) {
    return cb(
      `ERROR:The fabricator requires between 1 and ${MAX_RECIPE_INPUTS} component stacks.`,
    );
  }
  const batches = Math.min(MAX_BATCHES, Math.max(1, Math.round(count) || 1));

  // If the FD designated fabrication rooms, only those rooms will do, and
  // the first one is the default when no room is specified. With no
  // designated rooms and no room chosen, the fabricator runs ship-wide:
  // components can come from any cargo room aboard.
  const designated = fabricationRooms(simulatorId);
  let deliveryRoomId: string | null = roomId || null;
  if (designated.length > 0) {
    if (!deliveryRoomId) {
      deliveryRoomId = designated[0].id;
    } else if (!designated.find(r => r.id === deliveryRoomId)) {
      return cb(
        `ERROR:This room has no fabricator. Available in: ${designated
          .map(r => r.name)
          .join(", ")}.`,
      );
    }
  }
  const shipWide = !deliveryRoomId;

  const recipe = App.fabricationRecipes.find(
    r => r.simulatorId === simulatorId && r.matches(stacks),
  );
  if (!recipe || !recipe.output.name) {
    // Two tiers of feedback for FD-opted-in secret recipes: exactly the
    // right component names with wrong quantities, or a strict subset of
    // the components. Either counts as a close attempt, and the FD is
    // alerted once the crew is clearly circling a recipe.
    const secrets = App.fabricationRecipes.filter(
      r => r.simulatorId === simulatorId && r.secret,
    );
    const proportion = secrets.find(r => r.isProportionMiss(stacks));
    const almost = proportion || secrets.find(r => r.isNearMiss(stacks));
    if (almost) {
      const attempts = almost.recordNearMiss();
      if (attempts === NEAR_MISS_ALERT_THRESHOLD) {
        notifyCore(
          simulatorId,
          `Crew Is Close: ${almost.name} — ${attempts} near-miss attempts. Consider showing the hint.`,
          "warning",
        );
      }
      // Keeps the close-attempt count live on the FD core
      publishRecipes();
    }
    return cb(
      proportion
        ? "ERROR:The fabricator stutters — the component mixture is right, but the proportions are off."
        : almost
        ? "ERROR:The fabricator hums for a moment — this mixture is almost viable, but the sequence cannot complete."
        : "ERROR:The fabricator cannot synthesize anything from that combination of components.",
    );
  }

  const jobLimit = simulator?.fabricationJobLimit || 0;
  if (jobLimit > 0) {
    const active = App.fabricationJobs.filter(
      j => j.simulatorId === simulatorId && j.status === "active",
    ).length;
    if (active >= jobLimit) {
      return cb(
        `ERROR:The fabricator is already running at capacity (${jobLimit} concurrent jobs).`,
      );
    }
  }

  // Every component must be present in the fabrication room before any of
  // them are consumed. Consumed components scale with the batch count;
  // catalysts only need to be present once.
  const requirements = recipe.inputs.map(input => ({
    ...input,
    required: input.consumed !== false ? input.count * batches : input.count,
  }));
  const stockOf = (name: string) => {
    const item = findInventory(simulatorId, name);
    if (!item) return 0;
    if (!shipWide) return item.roomCount[deliveryRoomId] || 0;
    return Object.values(item.roomCount).reduce(
      (prev: number, next) => prev + (Number(next) || 0),
      0,
    );
  };
  const shortage = requirements.find(req => stockOf(req.name) < req.required);
  if (shortage) {
    return cb(
      `ERROR:There is not enough ${shortage.name} ${
        shipWide ? "aboard the ship" : "in this room"
      } to fabricate that${batches > 1 ? ` x${batches}` : ""}.`,
    );
  }
  const consumedStacks = requirements
    .filter(req => req.consumed !== false)
    .map(req => ({name: req.name, count: req.required, consumed: true}));
  // Ship-wide jobs draw from every room that has stock; the room that
  // supplies the most components receives the finished output.
  const roomContribution: {[contributingRoomId: string]: number} = {};
  consumedStacks.forEach(stack => {
    const item = findInventory(simulatorId, stack.name);
    if (!shipWide) {
      item.updateCount(
        deliveryRoomId,
        item.roomCount[deliveryRoomId] - stack.count,
      );
      return;
    }
    let remaining = stack.count;
    Object.entries(item.roomCount).forEach(([rid, available]) => {
      const take = Math.min(Number(available) || 0, remaining);
      if (take <= 0) return;
      item.updateCount(rid, item.roomCount[rid] - take);
      remaining -= take;
      roomContribution[rid] = (roomContribution[rid] || 0) + take;
    });
  });
  if (shipWide) {
    const topRoom = Object.entries(roomContribution).sort(
      (a, b) => b[1] - a[1],
    )[0];
    deliveryRoomId =
      topRoom?.[0] ||
      // All-catalyst recipes consume nothing: deliver wherever the first
      // catalyst sits, or failing that the first room aboard
      requirements
        .map(req => {
          const item = findInventory(simulatorId, req.name);
          return (
            item &&
            Object.keys(item.roomCount).find(rid => item.roomCount[rid] > 0)
          );
        })
        .find(Boolean) ||
      App.rooms.find(r => r.simulatorId === simulatorId)?.id ||
      null;
  }
  if (recipe.secret && !recipe.discovered) {
    recipe.reveal();
    notifyCore(
      simulatorId,
      `Secret Schematic Discovered: ${recipe.name}`,
      "info",
    );
    notifyCrew(
      simulatorId,
      "Secret Schematic Discovered",
      `${recipe.name} has been added to the schematic database.`,
    );
    publishRecipes();
  }
  const job = new FabricationJob({
    simulatorId,
    recipeId: recipe.id,
    recipeName: recipe.name,
    roomId: deliveryRoomId,
    inputs: consumedStacks,
    output: {
      ...recipe.output,
      count: recipe.output.count * batches,
    },
    duration: recipe.duration * batches,
  });
  App.fabricationJobs.push(job);
  notifyCore(
    simulatorId,
    `Fabrication Started: ${recipe.name}${batches > 1 ? ` x${batches}` : ""}`,
    "info",
  );
  pubsub.publish("inventoryUpdate", App.inventory);
  publishJobs();
  return cb(job.id);
});

App.on("cancelFabricationJob", ({id}) => {
  const job = App.fabricationJobs.find(j => j.id === id);
  if (!job || job.status !== "active") return;
  // Refund the consumed components to the fabrication room
  job.inputs.forEach(stack => {
    const item = findInventory(job.simulatorId, stack.name);
    if (item) {
      item.updateCount(
        job.roomId,
        (item.roomCount[job.roomId] || 0) + stack.count,
      );
    } else {
      App.inventory.push(
        new Classes.InventoryItem({
          simulatorId: job.simulatorId,
          name: stack.name,
          roomCount: {[job.roomId]: stack.count},
        }),
      );
    }
  });
  job.cancel();
  pubsub.publish("inventoryUpdate", App.inventory);
  publishJobs();
});

App.on("completeFabricationJob", ({id}) => {
  const job = App.fabricationJobs.find(j => j.id === id);
  if (!job) return;
  deliverFabricationJob(job);
});

App.on("clearFabricationJobs", ({simulatorId}) => {
  App.fabricationJobs = App.fabricationJobs.filter(
    j => j.simulatorId !== simulatorId || j.status === "active",
  );
  publishJobs();
});
