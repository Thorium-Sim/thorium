import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import Motu from "motu-control";

App.on("motuAdd", ({address}) => {
  const motu = new Motu(address);
  App.motus.push(motu);
  motu.on("changed", () => {
    App.handleEvent(motu, "motuChange");
  });
  pubsub.publish("motu", motu);
  pubsub.publish("motus", App.motus);
});

App.on("motuRemove", ({id}) => {
  App.motus = App.motus.filter(m => m.address !== id);
  pubsub.publish("motus", App.motus);
});

// An event for when the Motu's event emitter fires off.
App.on("motuChange", motu => {
  pubsub.publish("motu", motu);
  pubsub.publish("motus", App.motus);
});

App.on("motuUpdateChannel", ({id, channelId, channel}) => {
  const motu = App.motus.find(m => m.address === id);

  const [, chan, type] = channelId.split("-");

  let mixer;
  if (type === "aux" || type === "group") {
    mixer = motu.mixerOutputChannels.find(
      c => c.type === type && c.chan === parseInt(chan, 10),
    );
  } else if (type === "chan") {
    mixer = motu.mixerInputChannels.find(
      c => c.type === type && c.chan === parseInt(chan, 10),
    );
  }
  if (mixer) {
    if (channel.fader || channel.fader === 0)
      mixer.mix.matrix.fader = channel.fader;
    if (channel.mute || channel.mute === 0)
      mixer.mix.matrix.mute = channel.mute;
  }

  pubsub.publish("motu", motu);
  pubsub.publish("motus", App.motus);
});

App.on("motuSetSendMute", ({id, inputId, outputId, mute}) => {
  const motu = App.motus.find(m => m.address === id);

  const [, chan, type] = inputId.split("-");
  const [, outputChan, outputType] = outputId.split("-");

  const mixer = motu.mixerInputChannels.find(
    c => c.type === type && c.chan === parseInt(chan),
  );

  if (mixer?.mix?.matrix?.[outputType]?.[outputChan]) {
    mixer.mix.matrix[outputType][outputChan].send = mute ? 0 : 1;
  }

  pubsub.publish("motu", motu);
  pubsub.publish("motus", App.motus);
});
