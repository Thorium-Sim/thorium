import React from "react";
import { Row, Col } from "reactstrap";
import { withApollo } from "react-apollo";

import * as Macros from "components/macros";

const MacroConfig = ({ action, updateAction, client }) => {
  if (!action) return null;
  const args = JSON.parse(action.args);

  const EventMacro = Macros[action.event];
  return (
    <Row>
      <Col sm="12">
        {EventMacro ? (
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
        ) : (
          "No config for this macro."
        )}
      </Col>
    </Row>
  );
};

export default withApollo(MacroConfig);
