import React, { Fragment } from "react";
import { Button } from "reactstrap";
import MacroConfig from "../../Macros/macroConfig";

const ConfigureMacro = ({ cancel, macro, update, client }) => {
  return (
    <Fragment>
      <div style={{ flex: 1 }}>
        <label>Macro Config</label>
        <MacroConfig action={macro} updateAction={update} client={client} />
      </div>
      <Button
        size="sm"
        block
        color="success"
        onClick={cancel}
        style={{ marginBottom: "20px" }}
      >
        Done Configuring Macro
      </Button>
    </Fragment>
  );
};

export default ConfigureMacro;
