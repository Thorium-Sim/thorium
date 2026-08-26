import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";

export default ({updateArgs, args}) => {
  return (
    <FormGroup className="macro-revealFabricationRecipe">
      <p>
        Reveal a secret fabrication recipe to the crew. The recipe appears in
        the schematic database as if it had been discovered. Use the recipe's
        name exactly as it is configured on the simulator.
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
