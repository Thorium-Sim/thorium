import React from "react";
import {Row, Col} from "helpers/reactstrap";
import {withApollo} from "react-apollo";

import * as Macros from "components/macros";

const MacroConfig = ({
  simulatorId,
  action,
  updateAction,
  client,
  stations,
  clients,
}) => {
  if (!action) return null;
  const args =
    typeof action.args === "string" ? JSON.parse(action.args) : action.args;

  const EventMacro = Macros[action.event];
  return (
    <Row>
      <Col sm="12">
        {EventMacro ? (
          <EventMacro
            simulatorId={simulatorId}
            updateArgs={(argName, value) => {
              updateAction({
                ...action,
                args:
                  typeof action.args === "string"
                    ? JSON.stringify({...args, [argName]: value})
                    : {...args, [argName]: value},
              });
            }}
            args={args || {}}
            client={client}
            stations={stations}
            clients={clients}
          />
        ) : (
          "No config for this macro."
        )}
      </Col>
    </Row>
  );
};

export default withApollo(MacroConfig);
