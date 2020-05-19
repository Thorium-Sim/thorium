import {DamageStepArgs, DamageStepContext} from "~classes/generic";

export default (
  {message}: DamageStepArgs,
  {name, displayName = name}: DamageStepContext,
) => {
  return `Send a message to your damage team:
    
Message: ${
    message ||
    `What is your assessment of the damage to the ${displayName} system?`
  }
    
Wait for a response and follow the instructions they provide. 
    `;
};
