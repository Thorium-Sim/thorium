import React from "react";
import { Row, Col } from "reactstrap";
import { withApollo } from "react-apollo";

import * as Macros from "../../../components/macros";

const MacroConfig = ({ client, selectedAction, selectedKey, updateAction }) => {
  if (!selectedAction) return null;
  const action = (selectedKey.actions || []).find(a => a.id === selectedAction);
  if (!action) return null;
  const args = JSON.parse(action.args);

  const EventMacro =
    Macros[action.event] ||
    (() => {
      return null;
    });
  return (
    <Row>
      <Col sm="12">
        {/* <FormGroup>
          <Label>Item Event</Label>
          <EventPicker
            event={action.event}
            handleChange={e => {
              updateAction({ ...action, event: e.target.value });
            }}
          />
        </FormGroup> */}
        {EventMacro && (
          <EventMacro
            updateArgs={(argName, value) => {
              updateAction({
                ...action,
                args: JSON.stringify({ ...args, [argName]: value })
              });
            }}
            args={args || {}}
            client={client}
          />
        )}
      </Col>
    </Row>
  );
};

export default withApollo(MacroConfig);
