import React, { Component } from "react";
import Patient from "./patient";
import Scan from "./scan";
import Treatment from "./treatment";

import { ButtonGroup, Button } from "reactstrap";

class PatientControls extends Component {
  state = {
    currentScreen: "patient"
  };
  render() {
    const {
      patient,
      scanning,
      scanRequest,
      sickbayId,
      id,
      simulator
    } = this.props;
    const { currentScreen } = this.state;
    const chart = patient
      ? patient.charts.concat().sort((a, b) => {
          if (new Date(a.admitTime) > new Date(b.admitTime)) return -1;
          if (new Date(a.admitTime) < new Date(b.admitTime)) return 1;
          return 0;
        })[0]
      : {};
    return (
      <div className="patient-control">
        <div>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              active={currentScreen === "patient"}
              onClick={() => this.setState({ currentScreen: "patient" })}
            >
              Patient
            </Button>
            <Button
              size="sm"
              color={scanning ? "danger" : "info"}
              active={currentScreen === "scan"}
              onClick={() => this.setState({ currentScreen: "scan" })}
            >
              Scans
            </Button>
            <Button
              size="sm"
              color="warning"
              active={currentScreen === "treatment"}
              onClick={() => this.setState({ currentScreen: "treatment" })}
            >
              Treatment
            </Button>
          </ButtonGroup>
        </div>
        <div className="patient-controls">
          {(() => {
            if (!patient) return <p>No Patient</p>;
            if (currentScreen === "patient") {
              return <Patient patient={patient} chart={chart} />;
            }
            if (currentScreen === "scan") {
              return (
                <Scan
                  scanning={scanning}
                  scanRequest={scanRequest}
                  id={id}
                  sickbayId={sickbayId}
                />
              );
            }
            if (currentScreen === "treatment") {
              return (
                <Treatment
                  patient={patient}
                  chart={chart}
                  simulator={simulator}
                />
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

export default PatientControls;
