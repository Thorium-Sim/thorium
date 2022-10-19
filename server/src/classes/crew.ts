import uuid from "uuid";
import {diagnoses} from "./medical/symptoms";
import processReport from "./generic/processReport";
class Chart {
  id: string;
  class: string;
  admitTime: Date;
  dischargeTime: Date | null;
  bloodPressure: string | null;
  heartRate: number | null;
  temperature: number | null;
  o2levels: number | null;
  symptoms: string[];
  diagnosis: string[];
  treatment: string | undefined;
  treatmentRequest: boolean;
  painPoints: unknown[];
  constructor(params: Partial<Chart> = {}) {
    this.id = params.id || uuid.v4();
    this.class = "Chart";
    this.admitTime = params.admitTime || new Date();
    this.dischargeTime = params.dischargeTime || null;
    this.bloodPressure = params.bloodPressure || null;
    this.heartRate = params.heartRate || null;
    this.temperature = params.temperature || null;
    this.o2levels = params.o2levels || null;
    this.symptoms = params.symptoms || [];
    this.diagnosis = params.diagnosis || [];
    this.treatment = params.treatment || "";
    this.treatmentRequest = params.treatmentRequest || false;
    this.painPoints = params.painPoints || [];
  }
  discharge() {
    this.dischargeTime = new Date();
  }
  update({
    bloodPressure,
    heartRate,
    temperature,
    o2levels,
    symptoms,
    diagnosis,
    treatment,
    painPoints,
    treatmentRequest,
  }) {
    if (bloodPressure || bloodPressure === "")
      this.bloodPressure = bloodPressure;
    if (heartRate || heartRate === 0) this.heartRate = heartRate;
    if (temperature || temperature === 0) this.temperature = temperature;
    if (o2levels || o2levels === 0) this.o2levels = o2levels;
    if (symptoms) {
      this.symptoms = symptoms;
      // Add diagnoses symptoms
      if (symptoms.length === 0) {
        this.diagnosis = ["No Diagnosis."];
      } else {
        const results = Object.keys(diagnoses).filter(d => {
          const dSympt = diagnoses[d];
          return symptoms.filter(s => dSympt.indexOf(s) === -1).length === 0;
        });
        this.diagnosis = results.length > 0 ? results : ["No Diagnosis."];
      }
    }
    if (diagnosis || diagnosis === "") this.diagnosis = diagnosis;
    if (treatment || treatment === "") {
      this.treatment = processReport(treatment);
      this.treatmentRequest = false;
    }
    if (treatmentRequest || treatmentRequest === false) {
      this.treatmentRequest = treatmentRequest;
    }
    if (painPoints) this.painPoints = painPoints;
  }
}

export default class Crew {
  id: string;
  class: string;
  simulatorId: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  rank: string;
  position: string;
  location: string | null;
  killed: boolean;
  workRoom: string | null;
  restRoom: string | null;
  charts: Chart[];
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Crew";
    this.simulatorId = params.simulatorId || "test";
    this.firstName = params.firstName || "John";
    this.lastName = params.lastName || "Doe";
    this.gender = params.gender || "m";
    this.age = params.age || 27;
    this.rank = params.rank || "Ensign";
    this.position = params.position || "Crewmember";

    // A deck ID
    this.location = params.location || null;

    this.killed = params.killed || false;
    this.workRoom = params.workRoom || null;
    this.restRoom = params.restRoom || null;
    // Used for Medical
    this.charts = (params.charts || []).map(c => new Chart(c));
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  get officialName() {
    return `${this.lastName}, ${this.firstName}`;
  }
  addChart() {
    this.charts.push(new Chart());
  }
  dischargeChart() {
    const chart = this.charts.find(c => !c.dischargeTime);
    chart && chart.discharge();
  }
  updateChart(data) {
    const chart = this.charts.find(c => !c.dischargeTime);
    chart && chart.update(data);
  }
  update({firstName, lastName, gender, age, rank, position, killed, notes}) {
    if (firstName || firstName === "" || firstName === 0) {
      this.firstName = firstName;
    }
    if (lastName || lastName === "" || lastName === 0) this.lastName = lastName;
    if (gender || gender === "" || gender === 0) this.gender = gender;
    if (age || age === "" || age === 0) this.age = parseInt(age, 10);
    if (rank || rank === "" || rank === 0) this.rank = rank;
    if (position || position === "" || position === 0) this.position = position;
    if (killed || killed === false) this.killed = killed;
  }
}
