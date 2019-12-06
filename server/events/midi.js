import App from "../app";
import {pubsub} from "../helpers/subscriptionManager.js";
import {MidiSet} from "../classes/midi";

App.on("midiSetCreate", ({name, deviceName}) => {
  App.midiSets.push(new MidiSet({name, deviceName}));
  pubsub.publish("midiSets", App.midiSets);
});
App.on("midiSetRemove", ({id}) => {
  App.midiSets = App.midiSets.filter(r => r.id !== id);
  pubsub.publish("midiSets", App.midiSets);
});
App.on("midiSetRename", ({id, name}) => {
  const midiSet = App.midiSets.find(r => r.id === id);
  if (!midiSet) return;
  midiSet.rename(name);
  pubsub.publish("midiSets", App.midiSets);
});
