export cooland from './coolant';
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
