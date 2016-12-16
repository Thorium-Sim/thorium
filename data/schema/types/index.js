export cooland from './coolant';
export power from './power';
export shields from './shields';
export engine from './engine';
export thrusters from './thrusters';
export assets from './assets';
export transporters from './transporters';
export coreLayout from './coreLayout';
export sensors from './sensors';

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

// TODO: Change this to have the nested objects
export const session = `
type session {
  id: ID
  flight: String
  simulator: String
  station: String
}
`;

export const client = `
type client {
  id: ID
  flight: ID
  simulators: ID
  station: String
  loginName: String
  loginState: Boolean
  lockedOutState: Boolean
}
`;

export const mission = `
type mission {
  id: ID
  name: String
  simulators: [simulator]
}
`;

export const flight = `
type flight {
  id: ID
  name: String
  date: Float
  simulators: [simulator]
}
`;

export const simulator = `
type simulator {
  id: ID
  name: String
  alertlevel: String
  layout: String
  template: Boolean
  timeline: [timelinestep]
}
`;

export const timelinestep = `
type timelinestep {
  name: String
  description: String
  order: Int
  timelineitems: [timelineitem]
}`;

export const timelineitem = `
type timelineitem {
  name: String
  type: String
  command: String
  args: String
  delay: Int
}
`;

export const stationset = `
type stationset {
  id: ID
  name: String
  stations: [station]
}
`;

export const station = `
type station {
  name: String
  cards: [card]
}
`;

export const card = `
type card {
  name: String
  component: String
  icon: String
}
`;
