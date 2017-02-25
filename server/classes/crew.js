import uuid from 'uuid';

export default class Crew {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || 'test';
    this.firstName = params.firstName || 'John';
    this.lastName = params.lastName || 'Doe';
    this.gender = params.gender || 'm';
    this.age = params.age || '27';
    this.rank = params.rank || 'Ensign';
    this.position = params.position || 'Crewmember';
  }
}
