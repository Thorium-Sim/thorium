/**

Triggers are additional event listeners attached to events which perform actions. 
These actions are defined in trigger groups and can potentially attach any event to a timeline action.
However, to make sure that triggers can provide the proper data for performing their 
function, we define them outside of the usual event handler in the `events` folder. 
Triggers should correspond with a configuration component defined in 
`/client/src/containers/FlightDirector/Triggers/components/triggers`

Functions in the `/server/src/triggers` folder are for transforming the 
arguments of the event into useful data for the trigger. 
It should include the simulator ID so the correct trigger
config can be discovered. The args are passed
via the outputs on the component in the configuration.

 */
import App from "../app";
import * as triggers from "../triggers";

export default function handleTrigger(eventName, args) {
  const processedArgs = triggers[eventName] ? triggers[eventName](args) : args;
  if (!processedArgs.simulatorId) return;
  const usedTriggers = App.triggerGroups
    .filter(t => t.simulatorId === processedArgs.simulatorId)
    .map(t => t.getTrigger(eventName))
    .filter(Boolean)
    .reduce((prev, next) => prev.concat(next), []);
  console.log(usedTriggers);
  // console.log(eventName, args);
}
