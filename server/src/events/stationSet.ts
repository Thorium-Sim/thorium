import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";

// StationSet
App.on("createStationSet", ({id, name, simulatorId}) => {
  const station = new Classes.StationSet({id, name, simulatorId});
  App.stationSets.push(station);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("removeStationSet", ({stationSetID}) => {
  App.stationSets = App.stationSets.filter(s => s.id !== stationSetID);
  // Also update sets
  App.sets.forEach(s =>
    s.clients.forEach(c => {
      if (c.stationSet === stationSetID) {
        s.removeClient(c.id);
      }
    }),
  );
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("renameStationSet", ({stationSetID, name}) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  if (!stationSet) return;
  stationSet.rename(name);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("duplicateStationSet", ({stationSetID, name, cb}) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  const newStationSet = new Classes.StationSet({
    ...stationSet,
    name,
    id: undefined,
  });
  App.stationSets.push(newStationSet);
  pubsub.publish("stationSetUpdate", App.stationSets);
  cb && cb(newStationSet.id);
});
App.on("setStationSetCrewCount", ({stationSetID, crewCount}) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  if (!stationSet) return;
  stationSet.setCrewCount(crewCount);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("addStationToStationSet", ({stationSetID, stationName}) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  if (!stationSet) return;
  stationSet.addStation({name: stationName});
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("removeStationFromStationSet", ({stationSetID, stationName}) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  if (!stationSet) return;
  stationSet.removeStation(stationName);
  // Also update sets
  App.sets.forEach(s =>
    s.clients.forEach(c => {
      if (c.stationSet === stationSetID && c.station === stationName) {
        s.removeClient(c.id);
      }
    }),
  );
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on(
  "editStationInStationSet",
  ({stationSetID, stationName, newStationName}) => {
    const stationSet = App.stationSets.find(ss => ss.id === stationSetID);

    if (!stationSet) return;
    stationSet.renameStation(stationName, newStationName);
    // Update any sets as well.
    App.sets = App.sets.map(s => {
      return new Classes.Set({
        ...s,
        clients: s.clients.map(c => {
          if (c.stationSet === stationSet.id && c.station === stationName) {
            return new Classes.SetClient({...c, station: newStationName});
          }
          return c;
        }),
      });
    });
    pubsub.publish("stationSetUpdate", App.stationSets);
  },
);
App.on(
  "addCardToStation",
  ({stationSetID, stationName, cardName, cardComponent, cardIcon}) => {
    const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
    if (!stationSet) return;
    stationSet.addStationCard(
      stationName,
      new Classes.Card({
        name: cardName,
        icon: cardIcon,
        component: cardComponent,
      }),
    );
    pubsub.publish("stationSetUpdate", App.stationSets);
  },
);
App.on("removeCardFromStation", ({stationSetID, stationName, cardName}) => {
  const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
  if (!stationSet) return;
  stationSet.removeStationCard(stationName, cardName);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on(
  "editCardInStationSet",
  ({
    stationSetID,
    stationName,
    cardName,
    newCardName,
    cardComponent,
    cardIcon,
    ...rest
  }) => {
    const stationSet = App.stationSets.find(ss => ss.id === stationSetID);
    if (!stationSet) return;
    stationSet.editStationCard(stationName, cardName, {
      name: newCardName,
      component: cardComponent,
      icon: cardIcon,
    });
    pubsub.publish("stationSetUpdate", App.stationSets);
  },
);
App.on("setStationLogin", ({stationSetID, stationName, login}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setStationLogin(stationName, login);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("setStationExecutive", ({stationSetID, stationName, exec}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setStationExecutive(stationName, exec);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("toggleStationWidgets", ({stationSetID, stationName, widget, state}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setStationWidget(stationName, widget, state);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("setStationDescription", ({stationSetID, stationName, description}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setDescription(stationName, description);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("setStationLayout", ({stationSetID, stationName, layout}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setStationLayout(stationName, layout);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("setStationTraining", ({stationSetID, stationName, training}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setTraining(stationName, training);
  pubsub.publish("stationSetUpdate", App.stationSets);
});
App.on("setStationTags", ({stationSetID, stationName, tags}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setTags(stationName, tags);
  pubsub.publish("stationSetUpdate", App.stationSets);
});

App.on("setStationAmbiance", ({stationSetID, stationName, ambiance}) => {
  const stationSet = App.stationSets.find(s => s.id === stationSetID);
  if (!stationSet) return;
  stationSet.setAmbiance(stationName, ambiance);
  pubsub.publish("stationSetUpdate", App.stationSets);
});

App.on(
  "reorderStationWidgets",
  ({stationSetId, stationName, widget, order}) => {
    const stationSet = App.stationSets.find(s => s.id === stationSetId);
    if (!stationSet) return;
    stationSet.reorderWidgets(stationName, widget, order);
    pubsub.publish("stationSetUpdate", App.stationSets);
  },
);
