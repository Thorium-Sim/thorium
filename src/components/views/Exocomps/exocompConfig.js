import React, { Component } from "react";
import { Row, Col, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import DestinationSelect from "./destinationSelect";

const partsList = [
  "CASM Generator",
  "Coaxial Servo",
  "Computer Interface",
  "Digital Sequencer",
  "EPS Power Node",
  "EPS Step-Down Conduit",
  "Fiberoptic Wire Linkage",
  "Field Emitter",
  "Field Generator",
  "Fusion Generator",
  "Fusion Welder",
  "Gravity Generator",
  "Holographic Servo Display",
  "IDC Power Cable",
  "Integrated Fluid Sensor",
  "Isolinear Programs",
  "Isolinear Rod",
  "Magnetic Bolt Fastener",
  "Magnetic Coil",
  "Network Adapter",
  "Power Coupling",
  "Power Splitter",
  "Prefire Chamber",
  "Residual Power Store",
  "Sensor Grid",
  "Subspace Transceiver"
];

class ExocompConfig extends Component {
  state = {};
  render() {
    const { number, systems, id, cancel, deploy } = this.props || {};
    const { destination, parts = [] } = this.state;
    return (
      <Card>
        <CardBody>
          <h2>Exocomp Config: #{number}</h2>
          <FormGroup>
            <div>
              <Label>Destination</Label>
            </div>
            <DestinationSelect
              systems={systems}
              destination={destination}
              select={dest => this.setState({ destination: dest })}
            />
          </FormGroup>
          <FormGroup>
            <Label>Parts</Label>
            <div className="parts-holder">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={`part-config-${id}-${i}`}
                    className="exocomp-part"
                    style={{ backgroundImage: `url('/parts/${parts[i]}.svg')` }}
                    onClick={() =>
                      this.setState({
                        parts: parts.filter((__, idx) => idx !== i)
                      })
                    }
                  />
                ))}
            </div>
          </FormGroup>
          <div className="parts-container">
            {partsList.map(p => (
              <div key={`part-list-${p}`} className="part-label">
                <div
                  className="exocomp-part"
                  style={{ backgroundImage: `url('/parts/${p}.svg')` }}
                  onClick={() => {
                    if (parts.length < 2) {
                      this.setState({
                        parts: parts.concat(p)
                      });
                    }
                  }}
                />
                <p>{p}</p>
              </div>
            ))}
          </div>
          <Row>
            <Col sm={{ size: 4, offset: 2 }}>
              <Button block color="danger" onClick={cancel}>
                Cancel
              </Button>
            </Col>
            <Col sm={{ size: 4 }}>
              <Button
                block
                color="success"
                disabled={!destination}
                onClick={() => deploy(id, destination, parts)}
              >
                Deploy
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ExocompConfig;
