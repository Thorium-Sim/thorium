export coolant from './coolant';
export power from './power';
export shields from './shields';
export engine from './engine';
export thrusters from './thrusters';
export assets from './assets';
export transporters from './transporters';
export coreLayout from './coreLayout';
export sensors from './sensors';
export clients from './clients';
export flightStructure from './flightStructure';
export timeline from './timeline';
export shipStructure from './shipStructure';
export lrComm from './lrComm';
export internalComm from './internalComm';
export damage from './damage';
export system from './system';
export ship from './ship';
export navigation from './navigation';
export shortRangeComm from './shortRangeComm';
export reactor from './reactor';
export phasers from './phasers';
export torpedos from './torpedos';
export targeting from './targeting';
export probes from './probes';
export stealthField from './stealthField';
export actions from './actions';
export tractorBeam from './tractorBeam';

export crew from './crew';
export teams from './teams';
export set from './set';

export const role = `
type role {
  id: ID
  userId: String
  name: String
}
`;

export const user = `
type user {
  id: ID
  email: String
  token: String
  tokenexpire: Int
  roles: [role]
}
`;
