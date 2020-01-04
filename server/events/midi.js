import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {MidiSet} from "../classes/midi";

App.on("midiSetCreate", ({name, deviceName, cb}) => {
  const midiSet = new MidiSet({name, deviceName});
  App.midiSets.push(midiSet);
  pubsub.publish("midiSets", App.midiSets);
  cb(midiSet);
});
App.on("midiSetRemove", ({id, cb}) => {
  App.midiSets = App.midiSets.filter(r => r.id !== id);
  pubsub.publish("midiSets", App.midiSets);
  cb(true);
});
App.on("midiSetRename", ({id, name, cb}) => {
  const midiSet = App.midiSets.find(r => r.id === id);
  if (!midiSet) return;
  midiSet.rename(name);
  pubsub.publish("midiSets", App.midiSets);
  cb(midiSet);
});
App.on("midiSetControl", ({id, control, cb}) => {
  const midiSet = App.midiSets.find(r => r.id === id);
  if (!midiSet) return;
  midiSet.setControl(control);
  pubsub.publish("midiSets", App.midiSets);
  cb(midiSet);
});
App.on("simulatorAddMidiSet", ({simulatorId, midiSet, cb}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.midiSets = simulator.midiSets
    .concat(midiSet)
    .filter((a, i, arr) => arr.indexOf(a) === i);
  pubsub.publish("midiSets", App.midiSets);
  pubsub.publish("simulatorsUpdate", App.simulators);

  cb && cb(simulator);
});
App.on("simulatorRemoveMidiSet", ({simulatorId, midiSet, cb}) => {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  simulator.midiSets = simulator.midiSets.filter(m => m !== midiSet);
  pubsub.publish("midiSets", App.midiSets);
  pubsub.publish("simulatorsUpdate", App.simulators);

  cb && cb(simulator);
});
