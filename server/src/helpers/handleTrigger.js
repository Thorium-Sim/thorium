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
  console.log(eventName, processedArgs);
  if (!processedArgs || !processedArgs.simulatorId) return;
  const triggerActions = App.triggerGroups
    .filter(t => t.simulatorId === processedArgs.simulatorId)
    .map(t => t.getTriggerActions(eventName, processedArgs))
    .filter(Boolean)
    .reduce((prev, next) => prev.concat(next), [])
    .reduce((prev, next) => prev.concat(next.macros), []);
  const simulator = App.simulators.find(
    s => s.id === processedArgs.simulatorId
  );
  if (triggerActions.length === 0 || simulator.triggersPaused) return;
  App.handleEvent(
    { simulatorId: processedArgs.simulatorId, macros: triggerActions },
    "triggerMacros"
  );
}
