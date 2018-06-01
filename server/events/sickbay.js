import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
function performAction(id, action) {
  const sys = App.systems.find(s => s.id === id);
  if (sys) {
    action(sys);
  }
  pubsub.publish(
    "sickbayUpdate",
    App.systems.filter(s => s.class === "Sickbay")
  );
}

App.on("setSickbayBunks", ({ id, count }) => {
  performAction(id, sys => sys.setBunkCount(count));
});

App.on("addSickbayCrew", ({ id, crew }) => {
  performAction(id, sys => sys.addRoster(crew));
});

App.on("removeSickbayCrew", ({ id, crewId }) => {
  performAction(id, sys => sys.removeRoster(crewId));
});

App.on("updateSickbayCrew", ({ id, crewId, crew }) => {
  performAction(id, sys => sys.updateRoster(crewId, crew));
});

App.on("scanSickbayBunk", ({ id, bunkId, request }) => {
  performAction(id, sys => sys.scanBunk(bunkId, request));
});

App.on("cancelSickbayBunkScan", ({ id, bunkId }) => {
  performAction(id, sys => sys.cancelBunkScan(bunkId));
});

App.on("sickbayBunkScanResponse", ({ id, bunkId, response }) => {
  performAction(id, sys => sys.bunkScanResponse(bunkId, response));
});

App.on("assignPatient", ({ id, bunkId, crewId }) => {
  performAction(id, sys => sys.assignBunk(bunkId, crewId));
});

App.on("dischargePatient", ({ id, bunkId }) => {
  performAction(id, sys => sys.dischargeBunk(bunkId));
});

App.on("startDeconProgram", ({ id, program, location }) => {
  performAction(id, sys => {
    sys.startDeconProgram(program, location);
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      station: "Core",
      title: `New Decon Program`,
      body: `${program}: ${location}`,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `New Decon Program`,
        component: "DecontaminationCore",
        body: `${program}: ${location}`,
        color: "info"
      },
      "addCoreFeed"
    );
    setTimeout(() => {
      if (sys.autoFinishDecon) {
        App.handleEvent({ id }, "completeDeconProgram");
      }
    }, Math.round(Math.random() * 1000 * 15 + 15 * 1000));
  });
});

App.on("updateDeconOffset", ({ id, offset }) => {
  performAction(id, sys => sys.updateDeconOffset(offset));
});

App.on("cancelDeconProgram", ({ id }) => {
  performAction(id, sys => {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      station: "Core",
      title: `Decon Program Cancelled`,
      body: `${sys.deconProgram}: ${sys.deconLocation}`,
      color: "info"
    });
    sys.endDeconProgram();
  });
});

App.on("completeDeconProgram", ({ id }) => {
  performAction(id, sys => {
    const sim = App.simulators.find(s => s.id === sys.simulatorId);
    sim.stations
      .filter(s => s.cards.find(c => c.component === "Decontamination"))
      .map(s => s.name)
      .forEach(s => {
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: sys.simulatorId,
          station: s,
          title: `Decon Program Complete`,
          body: `${sys.deconProgram}: ${sys.deconLocation}`,
          color: "success"
        });
      });
    sys.endDeconProgram();
  });
});

App.on("setDeconAutoFinish", ({ id, finish }) => {
  performAction(id, sys => sys.setDeconAutoFinish(finish));
});
