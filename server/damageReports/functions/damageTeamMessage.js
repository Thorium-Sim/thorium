export default ({ message }, { name, displayName = name }) => {
  return `Send a message to your damage team:
    
Message: ${message ||
    `What is your assessment of the damage to the ${displayName} system?`}
    
Wait for a response and follow the instructions they provide. 
    `;
};
