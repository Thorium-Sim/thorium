import React from "react";
import TimeCared from "../timeCared";

const Patient = ({ patient, chart }) => {
  return (
    <div className="scroll-container">
      <p>
        <strong>Name:</strong> {patient.name}
      </p>
      <p>
        <strong>Position:</strong> {patient.position}
      </p>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
      <p>
        <strong>Rank:</strong> {patient.rank}
      </p>
      <p>
        <strong>Time in Bunk:</strong> <TimeCared admitTime={chart.admitTime} />
      </p>
      <p>
        <strong>Vitals</strong>
      </p>
      <p>
        <strong>Heart Rate:</strong> {chart.heartRate}
      </p>
      <p>
        <strong>Temperature:</strong> {chart.temperature}
      </p>
      <p>
        <strong>Blood Pressure:</strong> {chart.bloodPressure}
      </p>
      <p>
        <strong>
          O<sup>2</sup> Levels:
        </strong>{" "}
        {chart.o2levels}
      </p>
    </div>
  );
};
export default Patient;
