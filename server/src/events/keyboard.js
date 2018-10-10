import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("addKeyboard", ({ name }) => {
  if (!App.keyboards.find(k => k.name === name)) {
    App.keyboards.push(new Classes.Keyboard({ name }));
    pubsub.publish("keyboardUpdate", App.keyboards);
  }
});
App.on("removeKeyboard", ({ id }) => {
  App.keyboards = App.keyboards.filter(k => k.id !== id);
  pubsub.publish("keyboardUpdate", App.keyboards);
});
App.on("renameKeyboard", ({ id, name }) => {
  const keyboard = App.keyboards.find(k => k.id === id);
  console.log(name);
  keyboard && keyboard.rename(name);
  pubsub.publish("keyboardUpdate", App.keyboards);
});
App.on("updateKeyboardKey", ({ id, key }) => {
  const keyboard = App.keyboards.find(k => k.id === id);
  keyboard && keyboard.updateKey(key);
  pubsub.publish("keyboardUpdate", App.keyboards);
});

App.on("triggerKeyboardAction", ({ simulatorId, id, key, meta }) => {
  const keyboard = App.keyboards.find(k => k.id === id);
  if (!keyboard) return;
  const keyObj = keyboard.keys.find(
    k =>
      k.key.toLowerCase() === key.toLowerCase() &&
      JSON.stringify(meta.sort()) === JSON.stringify(k.meta.sort())
  );
  if (keyObj) {
    keyObj.actions.forEach(({ event, args, delay = 0 }) => {
      setTimeout(() => {
        App.handleEvent(
          Object.assign({ simulatorId }, JSON.parse(args)),
          event
        );
      }, delay);
    });
  }
});
