import React from "react";
import {Button, Input, Label} from "helpers/reactstrap";
import {
  Fabrication_Category,
  FabricationRecipeInput,
} from "generated/graphql";
import {categoryLabels, MAX_SLOTS} from "./shared";

interface EditableItem {
  name: string;
  count: number;
  consumed: boolean;
}

export interface EditableRecipe {
  name: string;
  description: string;
  category: Fabrication_Category;
  inputs: EditableItem[];
  output: {
    name: string;
    count: number;
    type: string;
    description: string;
    warheadType: string;
  };
  duration: number;
  secret: boolean;
  hint: string;
  nearMiss: boolean;
}

export const countermeasureMaterials = [
  "Copper",
  "Titanium",
  "Carbon",
  "Plastic",
  "Plasma",
];

export const blankRecipe = (): EditableRecipe => ({
  name: "",
  description: "",
  category: Fabrication_Category.Misc,
  inputs: [{name: "", count: 1, consumed: true}],
  output: {name: "", count: 1, type: "", description: "", warheadType: ""},
  duration: 60,
  secret: false,
  hint: "",
  nearMiss: false,
});

export function toRecipeInput(recipe: EditableRecipe): FabricationRecipeInput {
  return {
    name: recipe.name,
    description: recipe.description,
    category: recipe.category,
    inputs: recipe.inputs
      .filter(i => i.name.trim())
      .map(i => ({
        name: i.name.trim(),
        count: i.count || 1,
        consumed: i.consumed !== false,
      })),
    output: {
      name: recipe.output.name.trim(),
      count: recipe.output.count || 1,
      metadata: {
        type: recipe.output.type || undefined,
        description: recipe.output.description || undefined,
        warheadType:
          recipe.output.type === "torpedo"
            ? recipe.output.warheadType || "photon"
            : undefined,
      },
    },
    duration: recipe.duration,
    secret: recipe.secret,
    hint: recipe.hint,
    nearMiss: recipe.nearMiss,
  };
}

interface RecipeEditorProps {
  recipe: EditableRecipe;
  // Names of inventory already aboard, offered as autocomplete suggestions
  inventoryNames: string[];
  saveLabel?: string;
  // Hide the Save/Cancel row for hosts that persist on every change,
  // like macro configuration
  hideActions?: boolean;
  onChange: (recipe: EditableRecipe) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

// Form for building or editing a fabrication recipe. Shared between the
// simulator config screen and the Flight Director core so mid-flight recipes
// behave exactly like preconfigured ones.
const RecipeEditor: React.FC<RecipeEditorProps> = ({
  recipe,
  inventoryNames,
  saveLabel = "Save Recipe",
  hideActions = false,
  onChange,
  onSave,
  onCancel,
}) => {
  const set = (values: Partial<EditableRecipe>) =>
    onChange({...recipe, ...values});
  const setInput = (index: number, values: Partial<EditableItem>) =>
    set({
      inputs: recipe.inputs.map((item, i) =>
        i === index ? {...item, ...values} : item,
      ),
    });
  const datalistId = "fabrication-inventory-names";
  const valid =
    recipe.name.trim() &&
    recipe.output.name.trim() &&
    recipe.inputs.some(i => i.name.trim());
  return (
    <div className="fabrication-recipe-editor">
      <datalist id={datalistId}>
        {inventoryNames.map(name => (
          <option key={name} value={name} />
        ))}
      </datalist>
      <Label>Recipe Name</Label>
      <Input
        type="text"
        value={recipe.name}
        onChange={e => set({name: e.target.value})}
      />
      <Label>Description</Label>
      <Input
        type="textarea"
        rows={2}
        value={recipe.description}
        onChange={e => set({description: e.target.value})}
      />
      <div className="editor-row">
        <div>
          <Label>Category</Label>
          <Input
            type="select"
            value={recipe.category}
            onChange={e =>
              set({category: e.target.value as Fabrication_Category})
            }
          >
            {Object.values(Fabrication_Category).map(c => (
              <option key={c} value={c}>
                {categoryLabels[c] || c}
              </option>
            ))}
          </Input>
        </div>
        <div>
          <Label>Duration (seconds)</Label>
          <Input
            type="number"
            min={5}
            value={recipe.duration}
            onChange={e => set({duration: parseInt(e.target.value, 10) || 60})}
          />
        </div>
      </div>
      <Label>
        <Input
          type="checkbox"
          checked={recipe.secret}
          onChange={e => set({secret: e.target.checked})}
        />{" "}
        Secret recipe (hidden from the crew until discovered or revealed)
      </Label>
      {recipe.secret && (
        <div className="secret-options">
          <Label>Hint (shown to the crew only when you choose to reveal it)</Label>
          <Input
            type="textarea"
            rows={2}
            placeholder="e.g. Requires two components — one of them volatile."
            value={recipe.hint}
            onChange={e => set({hint: e.target.value})}
          />
          <Label>
            <Input
              type="checkbox"
              checked={recipe.nearMiss}
              onChange={e => set({nearMiss: e.target.checked})}
            />{" "}
            Near-miss feedback (tell the crew when a mix is almost right)
          </Label>
        </div>
      )}
      <Label>Components (up to {MAX_SLOTS})</Label>
      {recipe.inputs.map((item, index) => (
        <div className="editor-row component-row" key={`input-${index}`}>
          <Input
            type="text"
            list={datalistId}
            placeholder="Cargo item name"
            value={item.name}
            onChange={e => setInput(index, {name: e.target.value})}
          />
          <Input
            type="number"
            min={1}
            className="count-input"
            value={item.count}
            onChange={e =>
              setInput(index, {count: parseInt(e.target.value, 10) || 1})
            }
          />
          <Label
            className="consumed-toggle"
            title="Uncheck to make this a tool: it must be present in the room but isn't used up"
          >
            <Input
              type="checkbox"
              checked={item.consumed}
              onChange={e => setInput(index, {consumed: e.target.checked})}
            />{" "}
            Used up
          </Label>
          <Button
            size="sm"
            color="danger"
            onClick={() =>
              set({inputs: recipe.inputs.filter((_, i) => i !== index)})
            }
          >
            ✕
          </Button>
        </div>
      ))}
      {recipe.inputs.length < MAX_SLOTS && (
        <Button
          size="sm"
          color="info"
          onClick={() =>
            set({
              inputs: [...recipe.inputs, {name: "", count: 1, consumed: true}],
            })
          }
        >
          Add Component
        </Button>
      )}
      <Label>Produces</Label>
      <div className="editor-row">
        {recipe.output.type === "countermeasureMaterial" ? (
          <Input
            type="select"
            value={recipe.output.name}
            onChange={e =>
              set({output: {...recipe.output, name: e.target.value}})
            }
          >
            <option value="">Pick a material...</option>
            {countermeasureMaterials.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Input>
        ) : (
          <Input
            type="text"
            list={datalistId}
            placeholder="Output item name"
            value={recipe.output.name}
            onChange={e =>
              set({output: {...recipe.output, name: e.target.value}})
            }
          />
        )}
        <Input
          type="number"
          min={1}
          className="count-input"
          value={recipe.output.count}
          onChange={e =>
            set({
              output: {
                ...recipe.output,
                count: parseInt(e.target.value, 10) || 1,
              },
            })
          }
        />
      </div>
      <div className="editor-row">
        <div>
          <Label>Output Type</Label>
          <Input
            type="select"
            value={recipe.output.type}
            onChange={e =>
              set({output: {...recipe.output, type: e.target.value}})
            }
          >
            <option value="">Generic Cargo</option>
            <option value="repair">Repair</option>
            <option value="coolant">
              Coolant (refills the tank 10% per unit)
            </option>
            <option value="shieldBoost">
              Shield Booster (restores the weakest shield 10% per unit)
            </option>
            <option value="torpedo">Torpedo (loads into the launcher)</option>
            <option value="railgunAmmo">
              Railgun Ammo (loads into the magazine)
            </option>
            <option value="countermeasureMaterial">
              Countermeasure Material (adds to material stores)
            </option>
          </Input>
        </div>
        {recipe.output.type === "torpedo" && (
          <div>
            <Label>Warhead Type</Label>
            <Input
              type="select"
              value={recipe.output.warheadType || "photon"}
              onChange={e =>
                set({output: {...recipe.output, warheadType: e.target.value}})
              }
            >
              <option value="photon">Photon</option>
              <option value="quantum">Quantum</option>
              <option value="other">Other</option>
            </Input>
          </div>
        )}
        <div>
          <Label>Output Description</Label>
          <Input
            type="text"
            value={recipe.output.description}
            onChange={e =>
              set({output: {...recipe.output, description: e.target.value}})
            }
          />
        </div>
      </div>
      {(recipe.output.type === "torpedo" ||
        recipe.output.type === "railgunAmmo" ||
        recipe.output.type === "coolant" ||
        recipe.output.type === "shieldBoost" ||
        recipe.output.type === "countermeasureMaterial") && (
        <p className="integration-note">
          This output is delivered directly into the ship's system instead of
          the cargo room. If the simulator doesn't have that system (or the
          coolant tank / shields are already full), it falls back to cargo.
        </p>
      )}
      {!hideActions && (
        <div className="editor-actions">
          <Button color="success" disabled={!valid} onClick={onSave}>
            {saveLabel}
          </Button>
          <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecipeEditor;
