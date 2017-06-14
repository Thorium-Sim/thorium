import App from '../../app.js';

export const ShieldQueries = {
  shields(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Shield' && system.simulatorId === simulatorId;
    });
  },
};

export const ShieldMutations = {
  createShield(root, args, context) {
   App.handleEvent(args, 'createShield', context.clientId)
 },
 shieldRaised(root, args, context) {
   App.handleEvent(args, 'shieldRaised', context.clientId)
 },
 shieldLowered(root, args, context) {
   App.handleEvent(args, 'shieldLowered', context.clientId)
 },
 shieldIntegritySet(root, args, context) {
   App.handleEvent(args, 'shieldIntegritySet', context.clientId)
 },
 shieldFrequencySet(root, args, context) {
   App.handleEvent(args, 'shieldFrequencySet', context.clientId)
 },
};

export const ShieldSubscriptions = {
  shieldsUpdate(rootValue) {
    return rootValue;
  },
};
