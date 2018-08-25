import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tour from "../../../../helpers/tourHelper";

import Info from "./info";
import Vitals from "./vitals";
import Body from "./body";
import Scanning from "./scanning";
import Symptoms from "./symptoms";

class BunkDetail extends Component {
  state = { selectedAction: "scanning" };
  trainingSteps = [
    {
      selector: ".nothing",
      content: (
        <span>
          This is the screen you will use to treat your patients. Here, you can
          enter their vitals (useful for checkups), show their pain points, scan
          the patient, and enter in any symptoms.
        </span>
      )
    },
    {
      selector: ".patient-info",
      content: (
        <span>
          This is the patient information. It is provided for your information.
        </span>
      )
    },
    {
      selector: ".patient-vitals",
      content: (
        <span>
          This is the patients vitals. This information can help you determine
          symptoms which your patient might be experiencing. Either use the
          tools in your sickbay to collect the vitals yourself, or use the
          scanner to scan the patient for their vitals.
        </span>
      )
    },
    {
      selector: ".body-container",
      content: (
        <span>
          You can enter any pain which your patient is experiencing with this
          diagram. Just click on the diagram to add pain points. Click multiple
          times for intense pain.
        </span>
      )
    },
    {
      selector: ".sideActions",
      content: (
        <span>
          There are two sets of controls over here: scanning, and diagnosis. Be
          sure to click the buttons at the top to switch between both screens so
          you can learn how to do both.
        </span>
      )
    }
  ];
  render() {
    const { selectedAction } = this.state;
    const {
      sickbayId,
      simulator,
      id,
      scanning,
      patient,
      backToMain,
      clientObj
    } = this.props;
    const { id: crewId, charts } = patient;
    const chart = charts.concat().sort((a, b) => {
      if (new Date(a.admitTime) > new Date(b.admitTime)) return -1;
      if (new Date(a.admitTime) < new Date(b.admitTime)) return 1;
      return 0;
    })[0];
    return (
      <Mutation
        mutation={gql`
          mutation UpdatePatientChart(
            $simulatorId: ID
            $crewId: ID!
            $chart: ChartInput!
          ) {
            updatePatientChart(
              simulatorId: $simulatorId
              crewId: $crewId
              chart: $chart
            )
          }
        `}
      >
        {action => {
          const update = (key, value) => {
            action({
              variables: {
                simulatorId: simulator.id,
                crewId: crewId,
                chart: { [key]: value }
              }
            });
          };
          return (
            <Container className="card-sickbay-bunk" fluid>
              <Row>
                <Col sm={4}>
                  <h5>
                    <Button onClick={backToMain}>Back to Bunk Selection</Button>
                  </h5>
                  <Info {...patient} />
                  <Vitals {...chart} update={update} />
                </Col>

                <Col sm={4}>
                  <Body
                    update={update}
                    painPoints={chart.painPoints}
                    scanning={scanning}
                  />
                </Col>

                <Col sm={4} className="sideActions">
                  <Row>
                    <Col sm={6}>
                      <Button
                        active={selectedAction === "scanning"}
                        onClick={() =>
                          this.setState({ selectedAction: "scanning" })
                        }
                        block
                        color="info"
                      >
                        Scanning
                      </Button>
                    </Col>
                    <Col sm={6}>
                      <Button
                        active={selectedAction === "diagnosis"}
                        onClick={() =>
                          this.setState({ selectedAction: "diagnosis" })
                        }
                        block
                        color="warning"
                      >
                        Diagnosis
                      </Button>
                    </Col>
                  </Row>
                  {selectedAction === "scanning" ? (
                    <Scanning {...this.props} />
                  ) : (
                    <Symptoms {...chart} update={update} />
                  )}
                  <Mutation
                    mutation={gql`
                      mutation DischargePatient($id: ID!, $bunkId: ID!) {
                        dischargePatient(id: $id, bunkId: $bunkId)
                      }
                    `}
                    variables={{ bunkId: id, id: sickbayId }}
                  >
                    {discharge => (
                      <Button
                        color="warning"
                        block
                        onClick={() => {
                          backToMain();
                          discharge();
                        }}
                        className="discharge"
                      >
                        Discharge Patient
                      </Button>
                    )}
                  </Mutation>
                </Col>
              </Row>
              <Tour
                steps={this.trainingSteps.concat(
                  this.state.selectedAction === "scanning"
                    ? {
                        selector: ".scanning",
                        content: (
                          <span>
                            You can use this area to scan the patient with the
                            bunk's personal scanners. Make sure the patient is
                            laying in the bunk. Then type what you want to scan
                            in the top box. This could include specific vitals,
                            like heart rate or blood pressure; conditions, such
                            as any bacteria or viruses which are infecting the
                            patient; or other information about the patient. The
                            result appears in the box below.
                          </span>
                        )
                      }
                    : {
                        selector: ".symptoms",
                        content: (
                          <span>
                            This is where you enter in the patient's symptoms.
                            Click on the symptoms dropdown box to choose a
                            symptom from the list. The computer will
                            automatically calculate what possible diagnoses the
                            patient has. In other words, it will tell you what
                            is wrong with the patient. You can then use that
                            diagnosis to request treatment instructions. Once
                            the treatment instructions are compiled, they will
                            appear in the treatment box. You can then follow the
                            instructions to hopefully heal your patient.
                          </span>
                        )
                      }
                )}
                client={clientObj}
              />
            </Container>
          );
        }}
      </Mutation>
    );
  }
}

export default BunkDetail;
