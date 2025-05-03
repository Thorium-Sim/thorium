import React, {Fragment} from "react";
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "helpers/reactstrap";
import {capitalCase} from "change-case";

const ProbeEquipment = ({
  selectedProbeType,
  probes,
  equipment,
  cancelProbe,
  prepareProbe,
}) => {
  const [shownDescription, setShownDescription] = React.useState(null);
  const [savedEquipment, setSavedEquipment] = React.useState(equipment || []);
  const [selectedEquipment, setSelectedEquipment] = React.useState(null);
  const [selectedLoadedEquipment, setSelectedLoadedEquipment] = React.useState(
    null,
  );
  const [selectedScienceType, setSelectedScienceType] = React.useState(null);
  const addToProbe = () => {
    let slicedEquipment = savedEquipment.slice(0);
    const e = selectedEquipment;
    const type = probes.types.find(p => p.id === selectedProbeType);
    const used = slicedEquipment.reduce((prev, next) => {
      return prev + next.count * next.size;
    }, 0);
    let eq = slicedEquipment.find(eq => eq.id === e.id);
    if (eq) {
      //Update the equipment
      if (used + eq.size < type.size) {
        eq.count += 1;
      }
    } else {
      //Add the equipment to the list
      if (used + e.size <= type.size) {
        slicedEquipment.push({
          id: e.id,
          name: e.name,
          description: e.description,
          size: e.size,
          count: 1,
        });
      }
    }
    setSavedEquipment(slicedEquipment);
  };
  const removeFromProbe = () => {
    const e = selectedLoadedEquipment;

    setSavedEquipment(equipment => {
      return equipment
        .map(eq => {
          if (eq.id === e.id) {
            return {...eq, count: eq.count - 1};
          }
          return eq;
        })
        .filter(eq => eq.count > 0);
    });
  };

  const type = probes.types.find(p => p.id === selectedProbeType);
  const used = savedEquipment.reduce((prev, next) => {
    return prev + next.count * next.size;
  }, 0);

  return (
    <Fragment>
      <Row className="probeEquipment">
        {selectedProbeType === "science" && (
          <Col sm={3} className="science-probe">
            <h3>Configuration Options</h3>
            <ListGroup style={{height: "20vh", overflowY: "auto"}}>
              {probes.scienceTypes
                .concat()
                .sort((a, b) => {
                  if (a.id > b.id) return 1;
                  if (b.id > a.id) return -1;
                  return 0;
                })
                .map(s => (
                  <ListGroupItem
                    key={s.id}
                    active={selectedScienceType === s.id}
                    onClick={() => setSelectedScienceType(s.id)}
                  >
                    {capitalCase(`${s.name} ${s.type}`)}
                  </ListGroupItem>
                ))}
            </ListGroup>
            <h3>Description</h3>
            <Card style={{height: "15vh", marginTop: "5px", overflowY: "auto"}}>
              <CardBody>
                {selectedScienceType &&
                  probes.scienceTypes.find(c => c.id === selectedScienceType)
                    .description}
              </CardBody>
            </Card>
            <h3>Required Equipment</h3>
            <Card style={{height: "16vh", marginTop: "5px", overflowY: "auto"}}>
              <CardBody style={{whiteSpace: "pre-line"}}>
                {selectedScienceType &&
                  probes.scienceTypes
                    .find(c => c.id === selectedScienceType)
                    .equipment.map(
                      e =>
                        probes.types
                          .find(t => t.id === "science")
                          .availableEquipment.find(q => q.id === e).name,
                    )
                    .join("\n")}
              </CardBody>
            </Card>
          </Col>
        )}
        <Col sm={selectedProbeType === "science" ? 5 : 8}>
          <Row>
            <Col sm="12">
              <h2>Available Equipment:</h2>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="8">
                      <strong>Name</strong>
                    </Col>
                    <Col sm="2">
                      <strong>Size</strong>
                    </Col>
                    <Col sm="2">
                      <strong>Qty</strong>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody className="equipmentList">
                  {type.availableEquipment.map(e => {
                    const used = equipment.find(eq => eq.id === e.id) || {
                      count: 0,
                    };
                    return (
                      <Row
                        key={e.id}
                        onClick={() => {
                          setSelectedEquipment(e);
                          setShownDescription(e.description);
                        }}
                        className="equipmentItem"
                        style={{
                          backgroundColor:
                            selectedEquipment && e.id === selectedEquipment.id
                              ? "rgba(255,255,0,0.3)"
                              : null,
                        }}
                      >
                        <Col sm="8">
                          <p>{e.name}</p>
                        </Col>
                        <Col sm="2">
                          <p>{e.size}</p>
                        </Col>
                        <Col sm="2">
                          <p>{e.count - used.count}</p>
                        </Col>
                      </Row>
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row style={{marginTop: "10px"}}>
            <Col sm={6}>
              <Button
                color="danger"
                block
                disabled={!selectedLoadedEquipment}
                onClick={removeFromProbe}
              >
                Remove Equipment
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                color="success"
                block
                disabled={!selectedEquipment}
                onClick={addToProbe}
              >
                Add Equipment
              </Button>
            </Col>
          </Row>
          <Row style={{marginTop: "20px"}}>
            <Col sm="12">
              <h2>Loaded Equipment:</h2>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="6">
                      <strong>Name</strong>
                    </Col>
                    <Col sm="3">
                      <strong>Size</strong>
                    </Col>
                    <Col sm="3">
                      <strong>Qty</strong>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody className="equipmentList">
                  {savedEquipment.map(e => (
                    <Row
                      key={e.id}
                      onClick={() => {
                        setSelectedLoadedEquipment(e);
                        setShownDescription(e.description);
                      }}
                      className="equipmentItem"
                      style={{
                        backgroundColor:
                          selectedLoadedEquipment &&
                          e.id === selectedLoadedEquipment.id
                            ? "rgba(255,255,0,0.3)"
                            : null,
                      }}
                    >
                      <Col sm="8">
                        <p>{e.name}</p>
                      </Col>
                      <Col sm="2">
                        <p>{e.size}</p>
                      </Col>
                      <Col sm="2">
                        <p>{e.count}</p>
                      </Col>
                    </Row>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm="4" className="probe-control-buttons">
          <p>
            <strong>Total Space: {type.size}</strong>
          </p>
          <p>
            <strong>Space Used: {used}</strong>
          </p>
          <p>
            <strong>Space Remaining: {type.size - used}</strong>
          </p>
          <Button
            block
            color="primary"
            onClick={() => prepareProbe(savedEquipment)}
          >
            Prepare Probe
          </Button>
          <Button block color="danger" onClick={cancelProbe}>
            Cancel Probe
          </Button>
          {shownDescription && (
            <p className="description">{shownDescription}</p>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProbeEquipment;
