import App from '../../app.js';

export const ShieldQueries = {
  shields(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Shield' && system.simulatorId === simulatorId;
    });
  },
};

export const ShieldMutations = {
  createShield(root, args) {
   App.handleEvent(args, 'createShield', 'createdShield')
 },
 shieldRaised(root, args) {
   App.handleEvent(args, 'shieldRaised', 'shieldRaiseded')
 },
 shieldLowered(root, args) {
   App.handleEvent(args, 'shieldLowered', 'shieldLowereded')
 },
 shieldIntegritySet(root, args) {
   App.handleEvent(args, 'shieldIntegritySet', 'shieldIntegritySetted')
 },
 shieldFrequencySet(root, args) {
   App.handleEvent(args, 'shieldFrequencySet', 'shieldFrequencySetted')
 },
};

export const ShieldSubscriptions = {
  shieldsUpdate(rootValue) {
    return rootValue;
  },
};
