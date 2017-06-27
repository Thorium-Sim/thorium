import uuid from 'uuid';

export default class Crew {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = 'Crew';
    this.simulatorId = params.simulatorId || 'test';
    this.firstName = params.firstName || 'John';
    this.lastName = params.lastName || 'Doe';
    this.gender = params.gender || 'm';
    this.age = params.age || '27';
    this.rank = params.rank || 'Ensign';
    this.position = params.position || 'Crewmember';
    this.workRoom = params.workRoom || null;
    this.restRoom = params.restRoom || null;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  get officialName() {
    return `${this.lastName}, ${this.firstName}`;
  }
  update({firstName, lastName, gender, age, rank, position}) {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (gender) this.gender = gender;
    if (age) this.age = age;
    if (rank) this.rank = rank;
    if (position) this.position = position;
  }
}
