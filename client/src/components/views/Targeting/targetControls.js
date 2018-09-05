import React from "react";
import { Row, Col, Media, Button, Input, Label, FormGroup } from "reactstrap";
import { Asset } from "helpers/assets";

export default ({ targetedContact, untargetContact, targetSystem }) => {
  return (
    <Row>
      <Col sm={5}>
        {targetedContact && (
          <div>
            <h4>Targeted Contact</h4>
            <Media>
              <Media left href="#">
                <Asset asset={targetedContact.picture}>
                  {({ src }) => (
                    <Media object src={src} alt="Targeted Contact Image" />
                  )}
                </Asset>
              </Media>
              <Media body>
                <Media heading>{targetedContact.name}</Media>
              </Media>
            </Media>
            <Button
              block
              color="warning"
              onClick={() => untargetContact(targetedContact.id)}
            >
              Unlock Target
            </Button>
          </div>
        )}
      </Col>
      <Col sm={7}>
        {targetedContact && (
          <Row>
            <Col sm={12}>
              <h4>Systems Targeting</h4>
            </Col>
            {[
              "General",
              "Engines",
              "Sensors",
              "Tractor Beam",
              "Communications",
              "Weapons",
              "Shields"
            ].map(s => {
              return (
                <Col key={`system-${s}`} sm={6}>
                  <FormGroup check>
                    <Label
                      check
                      className={
                        targetedContact.system === s ? "text-danger" : ""
                      }
                    >
                      <Input
                        type="radio"
                        checked={targetedContact.system === s}
                        onChange={() => targetSystem(targetedContact.id, s)}
                      />
                      {s}
                    </Label>
                  </FormGroup>
                </Col>
              );
            })}

            {/* Uncomment for other targeting
<Col sm={6}>
<label className="custom-control custom-radio">
<input id="radio1" name="system" type="radio" className="custom-control-input" />
<span className="custom-control-indicator"></span>
<span className="custom-control-description"><Input size="sm" /></span>
</label>
</Col>*/}
          </Row>
        )}
      </Col>
    </Row>
  );
};
