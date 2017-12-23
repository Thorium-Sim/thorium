import uuid from "uuid";

export default class Crew {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Crew";
    this.simulatorId = params.simulatorId || "test";
    this.firstName = params.firstName || "John";
    this.lastName = params.lastName || "Doe";
    this.gender = params.gender || "m";
    this.age = params.age || "27";
    this.rank = params.rank || "Ensign";
    this.position = params.position || "Crewmember";
    this.killed = params.killed || false;
    this.workRoom = params.workRoom || null;
    this.restRoom = params.restRoom || null;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  get officialName() {
    return `${this.lastName}, ${this.firstName}`;
  }
  update({ firstName, lastName, gender, age, rank, position, killed }) {
    if (firstName || firstName === "" || firstName === 0)
      this.firstName = firstName;
    if (lastName || lastName === "" || lastName === 0) this.lastName = lastName;
    if (gender || gender === "" || gender === 0) this.gender = gender;
    if (age || age === "" || age === 0) this.age = age;
    if (rank || rank === "" || rank === 0) this.rank = rank;
    if (position || position === "" || position === 0) this.position = position;
    if (killed || killed === false) this.killed = killed;
  }
}
