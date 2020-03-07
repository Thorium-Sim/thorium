import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {Countermeasures} from "../classes/Countermeasure";
import uuid from "uuid";
function performAction(id, action: (sys: Countermeasures) => void) {
  const sys: Countermeasures = App.systems.find(s => s.id === id);
  if (!sys) return;
  action(sys);
  pubsub.publish("countermeasuresUpdate", sys);
}

function doNotify({simulatorId, title, body}) {
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId,
    type: "Countermeasures",
    station: "Core",
    title,
    body,
    color: "info",
  });
  App.handleEvent(
    {
      simulatorId,
      title,
      component: "CountermeasuresCore",
      body,
      color: "info",
    },
    "addCoreFeed",
  );
}

App.on("countermeasuresCreateCountermeasure", ({id, slot, name, cb}) => {
  performAction(id, sys => {
    const countermeasure = sys.createCountermeasure(slot, name);
    cb(countermeasure);
  });
});
App.on("countermeasuresRemoveCountermeasure", ({id, slot}) => {
  performAction(id, sys => {
    sys.removeCountermeasure(slot);
  });
});
App.on("countermeasuresLaunchCountermeasure", ({id, slot}) => {
  performAction(id, sys => {
    doNotify({
      simulatorId: sys.simulatorId,
      title: "Countermeasure Launched",
      body: sys.slots[slot].name,
    });
    sys.launchCountermeasure(slot);
  });
});
App.on("countermeasuresActivateCountermeasure", ({id, slot}) => {
  performAction(id, sys => {
    sys.setSlotActivation(slot, true);
  });
});
App.on("countermeasuresDeactivateCountermeasure", ({id, slot}) => {
  performAction(id, sys => {
    sys.setSlotActivation(slot, false);
  });
});
App.on("countermeasuresSetFDNote", ({id, countermeasureId, note}) => {
  performAction(id, sys => {
    sys.setFDNote(countermeasureId, note);
  });
});

App.on("countermeasuresLaunchUnlockedCountermeasures", ({id}) => {
  performAction(id, sys => {
    let count = 0;
    Object.entries(sys.slots).forEach(([key, s]) => {
      if (s && !s.locked) {
        count++;
        sys.launchCountermeasure(key);
      }
    });
    if (count > 0) {
      doNotify({
        simulatorId: sys.simulatorId,
        title: "Countermeasures Launched",
        body: `${count} countermeasures`,
      });
    }
  });
});
App.on("countermeasuresBuildCountermeasure", ({id, slot}) => {
  performAction(id, sys => {
    sys.buildCountermeasure(slot);
  });
});
App.on("countermeasuresAddModule", ({id, slot, moduleType, cb}) => {
  performAction(id, sys => {
    const countermeasure = sys.addCountermeasureModule(slot, moduleType);
    cb(countermeasure);
  });
});
App.on("countermeasuresRemoveModule", ({id, slot, moduleId}) => {
  performAction(id, sys => {
    sys.removeCountermeasureModule(slot, moduleId);
  });
});
App.on("countermeasuresConfigureModule", ({id, slot, moduleId, config}) => {
  performAction(id, sys => {
    sys.configureCountermeasureModule(slot, moduleId, config);
  });
});
App.on("countermeasuresSetResource", ({id, resource, value}) => {
  performAction(id, sys => {
    sys.setResource(resource, value);
  });
});
