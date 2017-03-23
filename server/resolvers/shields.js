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
   App.handleEvent(args, 'createShield')
 },
 shieldRaised(root, args) {
   App.handleEvent(args, 'shieldRaised')
 },
 shieldLowered(root, args) {
   App.handleEvent(args, 'shieldLowered')
 },
 shieldIntegritySet(root, args) {
   App.handleEvent(args, 'shieldIntegritySet')
 },
 shieldFrequencySet(root, args) {
   App.handleEvent(args, 'shieldFrequencySet')
 },
};

export const ShieldSubscriptions = {
  shieldsUpdate(rootValue) {
    return rootValue;
  },
};
