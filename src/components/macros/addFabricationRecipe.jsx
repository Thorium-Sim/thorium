import React from "react";
import {FormGroup} from "helpers/reactstrap";
import RecipeEditor, {
  blankRecipe,
  toRecipeInput,
} from "components/views/Fabrication/RecipeEditor";
import "components/views/Fabrication/style.scss";

// Builds a FabricationRecipeInput in the macro args. The editor state is
// kept locally; every change is flushed into the args as the input object
// the mutation expects.
export default ({updateArgs, args}) => {
  const [recipe, setRecipe] = React.useState(() => {
    const existing = args.recipe;
    if (!existing) return blankRecipe();
    return {
      name: existing.name || "",
      description: existing.description || "",
      category: existing.category || "misc",
      inputs: (existing.inputs || []).map(i => ({
        name: i.name || "",
        count: i.count || 1,
        consumed: i.consumed !== false,
      })) || [{name: "", count: 1, consumed: true}],
      output: {
        name: existing.output?.name || "",
        count: existing.output?.count || 1,
        type: existing.output?.metadata?.type || "",
        description: existing.output?.metadata?.description || "",
        warheadType: existing.output?.metadata?.warheadType || "",
      },
      duration: existing.duration || 60,
      secret: Boolean(existing.secret),
      hint: existing.hint || "",
      nearMiss: Boolean(existing.nearMiss),
    };
  });
  return (
    <FormGroup className="macro-addFabricationRecipe">
      <p>
        Add a fabrication recipe to the simulator mid-mission — for example
        when the crew receives schematics from an away team or an alien
        transmission. Component and output names must match the ship's cargo
        item names.
      </p>
      <RecipeEditor
        recipe={recipe}
        inventoryNames={[]}
        hideActions
        onChange={next => {
          setRecipe(next);
          updateArgs("recipe", toRecipeInput(next));
        }}
      />
    </FormGroup>
  );
};
