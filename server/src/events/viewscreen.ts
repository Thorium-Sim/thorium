import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";

App.on("updateViewscreenName", ({id, name}) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  viewscreen?.updateName(name);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on(
  "updateViewscreenComponent",
  ({id, simulatorId, component, data, secondary = false, context}) => {
    const viewscreens = App.viewscreens.filter(
      v =>
        v.id === id ||
        (v.simulatorId === simulatorId &&
          (id === "all" ||
            (id === "primary" && !v.secondary) ||
            (id === "secondary" && v.secondary))) ||
        (!id && v.simulatorId === simulatorId && v.secondary === secondary),
    );
    if (viewscreens.length === 0) return;
    const client = App.clients.find(c => c.id === viewscreens[0].id);
    // First de-auto the viewscreen, since we want to force this component;
    const simulator = App.simulators.find(s => s.id === client?.simulatorId) ||
      context.simulator || {id: simulatorId};
    viewscreens.forEach(viewscreen => {
      viewscreen.updateAuto(false);
      viewscreen.updateComponent(
        component,
        data ? data.replace(/#SIM/gi, simulator ? simulator.name : "") : data,
      );
    });
    pubsub.publish("viewscreensUpdate", App.viewscreens);
  },
);
App.on("updateViewscreenData", ({id, data}) => {
  const viewscreen = App.viewscreens.find(
    v =>
      v.id === id ||
      (v.simulatorId === id &&
        (id === "all" ||
          (id === "primary" && !v.secondary) ||
          (id === "secondary" && v.secondary))),
  );
  viewscreen?.updateData(data);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenAuto", ({id, simulatorId, auto}) => {
  const viewscreen = App.viewscreens.find(
    v => v.id === id || v.simulatorId === simulatorId,
  );
  viewscreen?.updateAuto(auto);
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("setViewscreenToAuto", ({id, simulatorId, secondary = false}) => {
  const viewscreen = App.viewscreens.filter(
    v =>
      v.id === id ||
      (v.simulatorId === simulatorId &&
        (id === "all" ||
          (id === "primary" && !v.secondary) ||
          (id === "secondary" && v.secondary))) ||
      (!id && v.simulatorId === simulatorId && v.secondary === secondary),
  );
  viewscreen.forEach(v => {
    v.updateAuto(true);
  });
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});
App.on("updateViewscreenSecondary", ({id, secondary}) => {
  const viewscreen = App.viewscreens.find(v => v.id === id);
  if (!viewscreen) return;
  viewscreen.secondary = secondary;
  pubsub.publish("viewscreensUpdate", App.viewscreens);
});

App.on("toggleViewscreenVideo", ({simulatorId, viewscreenId}) => {
  pubsub.publish("viewscreenVideoToggle", {simulatorId, viewscreenId});
});
App.on(
  "setViewscreenPictureInPicture",
  ({simulatorId, id, secondary = false, component, data, size, position}) => {
    const viewscreens = App.viewscreens.filter(
      v =>
        v.id === id ||
        (v.simulatorId === simulatorId &&
          (id === "all" ||
            (id === "primary" && !v.secondary) ||
            (id === "secondary" && v.secondary))) ||
        (!id && v.simulatorId === simulatorId && v.secondary === secondary),
    );
    viewscreens.forEach(viewscreen => {
      viewscreen.setPictureInPicture(component, data, position, size);
    });
    pubsub.publish("viewscreensUpdate", App.viewscreens);
  },
);
App.on(
  "removeViewscreenPictureInPicture",
  ({simulatorId, id, secondary = false}) => {
    const viewscreens = App.viewscreens.filter(
      v =>
        v.id === id ||
        (v.simulatorId === simulatorId &&
          (id === "all" ||
            (id === "primary" && !v.secondary) ||
            (id === "secondary" && v.secondary))) ||
        (!id && v.simulatorId === simulatorId && v.secondary === secondary),
    );
    viewscreens.forEach(viewscreen => {
      viewscreen && viewscreen.clearPictureInPicture();
    });
    pubsub.publish("viewscreensUpdate", App.viewscreens);
  },
);
