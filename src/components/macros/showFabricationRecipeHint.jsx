import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";

export default ({updateArgs, args}) => {
  return (
    <FormGroup className="macro-showFabricationRecipeHint">
      <p>
        Show the crew the hint for a secret fabrication recipe. A "partial
        schematic" entry appears in the fabricator database with the hint text
        configured on the recipe. Use the recipe's name exactly as it is
        configured on the simulator.
      </p>
      <Label>Recipe Name</Label>
      <Input
        type="text"
        value={args.recipe || ""}
        onChange={evt => updateArgs("recipe", evt.target.value)}
      />
    </FormGroup>
  );
};
