import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {Countermeasures} from "../classes/Countermeasure";

function performAction(id, action: (sys: Countermeasures) => void) {
  const sys: Countermeasures = App.systems.find(s => s.id === id);
  if (!sys) return;
  action(sys);
  pubsub.publish("countermeasuresUpdate", sys);
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
    sys.launchCountermeasure(slot);
  });
});
App.on("countermeasuresLaunchUnlockedCountermeasures", ({id}) => {
  performAction(id, sys => {
    Object.entries(sys.slots).forEach(([key, s]) => {
      if (s && !s.locked) {
        sys.launchCountermeasure(key);
      }
    });
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
