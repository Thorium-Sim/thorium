import React from "react";
import { Row, Col, Button } from "reactstrap";
import { OutputField } from "../../generic/core";
import TargetingContact from "./coreTargetingContact";

const Targets = ({
  targetedContact,
  removeTargetedContact,
  addTargetClass,
  targeting,
  macro,
  updateClass,
  removeClass
}) => {
  return (
    <div className="contact-targeting">
      {!macro && (
        <Row>
          <Col sm={8}>
            <OutputField alert={targetedContact}>
              {targetedContact && targetedContact.system}
            </OutputField>
          </Col>
          <Col sm={4}>
            <Button
              color="danger"
              disabled={!targetedContact}
              size="sm"
              block
              onClick={
                targetedContact
                  ? () => removeTargetedContact(targetedContact.id)
                  : () => {}
              }
            >
              Destroy
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        <Col sm={4}>Count</Col>
        <Col sm={1}>Icon</Col>
        <Col sm={1}>Pic</Col>
        <Col sm={4}>Label</Col>
        <Col sm={1}>Moving</Col>
        <Col sm={1} />
      </Row>
      <div className="targets-container">
        {targeting.classes.map(t => (
          <TargetingContact
            key={t.id}
            {...t}
            macro={macro}
            targetingId={targeting.id}
            contacts={targeting.contacts}
            contactClass={targetedContact && targetedContact.class}
            updateClass={updateClass}
            removeClass={removeClass}
          />
        ))}
      </div>
      <Row>
        <Col sm={12}>
          <Button size={"sm"} block color="success" onClick={addTargetClass}>
            Add Targets
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default Targets;
