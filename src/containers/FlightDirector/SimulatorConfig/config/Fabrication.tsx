import React from "react";
import {Container, Row, Col, Button, Input, Label} from "helpers/reactstrap";
import {
  useFabricationInventoryQuery,
  useFabricationRecipesSubscription,
  useFabricationSettingsSubscription,
  useAddFabricationRecipeMutation,
  useUpdateFabricationRecipeMutation,
  useRemoveFabricationRecipeMutation,
  useSetFabricationEnabledMutation,
  useSetFabricationJobLimitMutation,
  useFabricationAddInventoryMutation,
  useFabricationUpdateRoomRolesMutation,
  FabricationRecipeInput,
  RoomRoles,
} from "generated/graphql";
import RecipeEditor, {
  blankRecipe,
  EditableRecipe,
  toRecipeInput,
} from "components/views/Fabrication/RecipeEditor";
import {categoryLabels} from "components/views/Fabrication/shared";
import {
  recipeTemplatePacks,
  RecipeTemplatePack,
} from "components/views/Fabrication/recipeTemplates";
import "components/views/Fabrication/style.scss";

interface FabricationConfigProps {
  selectedSimulator: {id: string; name?: string};
}

const EXPORT_MARKER = "thorium-fabrication-recipes";

// Simulator config panel for fabrication recipes. Recipes configured here
// live on the simulator template and are copied onto every flight, so secret
// recipes reset to undiscovered each time a new flight starts.
const Fabrication: React.FC<FabricationConfigProps> = ({selectedSimulator}) => {
  const {data: layoutData, refetch} = useFabricationInventoryQuery({
    variables: {simulatorId: selectedSimulator.id},
    fetchPolicy: "cache-and-network",
  });
  const {data: recipeData} = useFabricationRecipesSubscription({
    variables: {simulatorId: selectedSimulator.id},
  });
  const {data: settingsData} = useFabricationSettingsSubscription({
    variables: {simulatorId: selectedSimulator.id},
  });
  const [addRecipe] = useAddFabricationRecipeMutation();
  const [updateRecipe] = useUpdateFabricationRecipeMutation();
  const [removeRecipe] = useRemoveFabricationRecipeMutation();
  const [setEnabled] = useSetFabricationEnabledMutation();
  const [setJobLimit] = useSetFabricationJobLimitMutation();
  const [addInventory] = useFabricationAddInventoryMutation();
  const [updateRoomRoles] = useFabricationUpdateRoomRolesMutation();

  const [editing, setEditing] = React.useState<EditableRecipe | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [templatePackId, setTemplatePackId] = React.useState("");
  const [templateRoomId, setTemplateRoomId] = React.useState("");
  const [status, setStatus] = React.useState("");
  const fileInput = React.useRef<HTMLInputElement>(null);

  const recipes = React.useMemo(
    () => recipeData?.fabricationRecipesUpdate || [],
    [recipeData],
  );
  const decks = React.useMemo(() => {
    const list = layoutData?.decks || [];
    return list
      .filter(Boolean)
      .concat()
      .sort((a, b) => (a?.number || 0) - (b?.number || 0));
  }, [layoutData]);
  const inventory = layoutData?.inventory || [];
  const inventoryNames = Array.from(
    new Set(inventory.map(i => i?.name || "").filter(Boolean)),
  );
  const hasItem = (name: string) =>
    inventoryNames.some(n => n.toLowerCase() === name.trim().toLowerCase());
  const hasRecipe = (name: string) =>
    recipes.some(r => r.name.trim().toLowerCase() === name.trim().toLowerCase());

  const missing = (recipe: {inputs: {name: string}[]}) =>
    recipe.inputs.filter(i => !hasItem(i.name)).map(i => i.name);

  const selectedPack: RecipeTemplatePack | undefined = recipeTemplatePacks.find(
    p => p.id === templatePackId,
  );

  const startEdit = (recipeId?: string) => {
    setTemplatePackId("");
    const recipe = recipes.find(r => r.id === recipeId);
    setEditingId(recipe?.id || null);
    setEditing(
      recipe
        ? {
            name: recipe.name,
            description: recipe.description,
            category: recipe.category,
            inputs: recipe.inputs.map(i => ({
              name: i.name,
              count: i.count,
              consumed: i.consumed !== false,
            })),
            output: {
              name: recipe.output.name,
              count: recipe.output.count,
              type: recipe.output.metadata?.type || "",
              description: recipe.output.metadata?.description || "",
              warheadType: recipe.output.metadata?.warheadType || "",
            },
            duration: recipe.duration,
            secret: recipe.secret,
            hint: recipe.hint,
            nearMiss: recipe.nearMiss,
          }
        : blankRecipe(),
    );
  };

  const saveEdit = async () => {
    if (!editing) return;
    const recipe = toRecipeInput(editing);
    if (editingId) {
      await updateRecipe({variables: {id: editingId, recipe}});
    } else {
      await addRecipe({
        variables: {simulatorId: selectedSimulator.id, recipe},
      });
    }
    setEditing(null);
    setEditingId(null);
  };

  const applyTemplate = async () => {
    if (!selectedPack || !templateRoomId) return;
    for (const cargo of selectedPack.cargo) {
      await addInventory({
        variables: {
          simulatorId: selectedSimulator.id,
          name: cargo.name,
          metadata: cargo.metadata || {},
          roomCount: [{room: templateRoomId, count: cargo.count}],
        },
      });
    }
    let added = 0;
    let skipped = 0;
    for (const recipe of selectedPack.recipes) {
      if (hasRecipe(recipe.name)) {
        skipped += 1;
        continue;
      }
      await addRecipe({
        variables: {
          simulatorId: selectedSimulator.id,
          recipe: {
            name: recipe.name,
            description: recipe.description,
            category: recipe.category,
            inputs: recipe.inputs.map(i => ({
              name: i.name,
              count: i.count,
              consumed: i.consumed !== false,
            })),
            output: recipe.output,
            duration: recipe.duration,
            secret: Boolean(recipe.secret),
            hint: recipe.hint || "",
            nearMiss: Boolean(recipe.nearMiss),
          },
        },
      });
      added += 1;
    }
    await refetch();
    const room = decks
      .flatMap(d => d?.rooms || [])
      .find(r => r?.id === templateRoomId);
    setStatus(
      `${selectedPack.name}: added ${added} recipe${added === 1 ? "" : "s"}${
        skipped ? ` (${skipped} already existed)` : ""
      } and seeded ${selectedPack.cargo.length} cargo types into ${
        room?.name || "the selected room"
      }.`,
    );
    setTemplatePackId("");
    setTemplateRoomId("");
  };

  const exportRecipes = () => {
    const payload = {
      source: EXPORT_MARKER,
      version: 1,
      exportedAt: new Date().toISOString(),
      recipes: recipes.map(r => ({
        name: r.name,
        description: r.description,
        category: r.category,
        inputs: r.inputs.map(i => ({
          name: i.name,
          count: i.count,
          consumed: i.consumed !== false,
        })),
        output: {
          name: r.output.name,
          count: r.output.count,
          metadata: {
            type: r.output.metadata?.type || undefined,
            description: r.output.metadata?.description || undefined,
            science: r.output.metadata?.science || undefined,
            defense: r.output.metadata?.defense || undefined,
            warheadType: r.output.metadata?.warheadType || undefined,
          },
        },
        duration: r.duration,
        secret: r.secret,
        hint: r.hint,
        nearMiss: r.nearMiss,
      })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fabrication-recipes-${
      selectedSimulator.name || selectedSimulator.id
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importRecipes = async (file: File) => {
    let payload: any;
    try {
      payload = JSON.parse(await file.text());
    } catch {
      setStatus("Import failed: that file is not valid JSON.");
      return;
    }
    if (payload?.source !== EXPORT_MARKER || !Array.isArray(payload.recipes)) {
      setStatus("Import failed: not a fabrication recipe export file.");
      return;
    }
    let added = 0;
    let skipped = 0;
    for (const r of payload.recipes) {
      if (!r?.name || !Array.isArray(r.inputs) || !r.output?.name) {
        skipped += 1;
        continue;
      }
      if (hasRecipe(r.name)) {
        skipped += 1;
        continue;
      }
      const recipe: FabricationRecipeInput = {
        name: r.name,
        description: r.description || "",
        category: r.category || undefined,
        inputs: r.inputs
          .filter((i: any) => i?.name)
          .map((i: any) => ({
            name: i.name,
            count: i.count || 1,
            consumed: i.consumed !== false,
          })),
        output: {
          name: r.output.name,
          count: r.output.count || 1,
          metadata: r.output.metadata || {},
        },
        duration: r.duration || 60,
        secret: Boolean(r.secret),
        hint: r.hint || "",
        nearMiss: Boolean(r.nearMiss),
      };
      await addRecipe({
        variables: {simulatorId: selectedSimulator.id, recipe},
      });
      added += 1;
    }
    setStatus(
      `Imported ${added} recipe${added === 1 ? "" : "s"}${
        skipped ? `, skipped ${skipped} (duplicates or invalid)` : ""
      }.`,
    );
  };

  const toggleFabricationRoom = async (
    roomId: string,
    roles: (RoomRoles | null)[] | null | undefined,
    tagged: boolean,
  ) => {
    const current = (roles || []).filter(Boolean) as RoomRoles[];
    const next = tagged
      ? current.filter(r => r !== RoomRoles.Fabrication)
      : current.concat(RoomRoles.Fabrication);
    await updateRoomRoles({variables: {roomId, roles: next}});
    await refetch();
  };

  const fabricationRoomCount = decks
    .flatMap(d => d?.rooms || [])
    .filter(r => r?.roles?.includes(RoomRoles.Fabrication)).length;

  return (
    <Container fluid className="fabrication-config">
      <p className="config-intro">
        Fabrication recipes let the crew combine cargo into new items. Recipes
        reference cargo by name — make sure the inventory this simulator
        carries matches the component names used here. Secret recipes stay
        hidden from the crew until they discover the combination, or you
        reveal them (or their hint) from the core or a timeline macro.
      </p>
      <div className="config-toolbar">
        <Label check className="toolbar-item">
          <Input
            type="checkbox"
            checked={settingsData?.fabricationSettingsUpdate?.enabled ?? true}
            onChange={e =>
              setEnabled({
                variables: {
                  simulatorId: selectedSimulator.id,
                  enabled: e.target.checked,
                },
              })
            }
          />{" "}
          Fabricator starts online
        </Label>
        <Label
          className="toolbar-item"
          title="Maximum simultaneous jobs. 0 = unlimited."
        >
          Job limit{" "}
          <Input
            type="number"
            min={0}
            bsSize="sm"
            className="job-limit-input"
            value={settingsData?.fabricationSettingsUpdate?.jobLimit ?? 0}
            onChange={e =>
              setJobLimit({
                variables: {
                  simulatorId: selectedSimulator.id,
                  limit: parseInt(e.target.value, 10) || 0,
                },
              })
            }
          />
        </Label>
        <div className="toolbar-spacer" />
        <Button color="info" size="sm" onClick={() => startEdit()}>
          Add Recipe
        </Button>
        <Input
          type="select"
          bsSize="sm"
          className="template-select"
          value={templatePackId}
          onChange={e => {
            setTemplatePackId(e.target.value);
            setEditing(null);
            setEditingId(null);
          }}
        >
          <option value="">Load a template pack...</option>
          {recipeTemplatePacks.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Input>
        <Button
          color="secondary"
          size="sm"
          onClick={() => fileInput.current?.click()}
        >
          Import JSON
        </Button>
        <Button
          color="secondary"
          size="sm"
          disabled={recipes.length === 0}
          onClick={exportRecipes}
        >
          Export JSON
        </Button>
        <input
          type="file"
          accept=".json,application/json"
          hidden
          ref={fileInput}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) importRecipes(file);
            e.target.value = "";
          }}
        />
      </div>
      {status && <p className="config-status text-info">{status}</p>}
      <Row className="config-body">
        <Col sm={4}>
          <h5>Recipes ({recipes.length})</h5>
          <div className="config-recipe-list">
            {recipes.length === 0 && (
              <p className="config-empty">
                No recipes yet. Add one by hand, load a template pack, or
                import a JSON export.
              </p>
            )}
            {recipes.map(recipe => {
              const missingItems = missing(recipe);
              return (
                <div
                  key={recipe.id}
                  className={`config-recipe ${
                    editingId === recipe.id ? "selected" : ""
                  }`}
                  onClick={() => startEdit(recipe.id)}
                >
                  <div className="config-recipe-title">
                    <strong>{recipe.name}</strong>
                    <small>
                      {categoryLabels[recipe.category] || recipe.category}
                      {recipe.secret ? " · secret" : ""}
                    </small>
                  </div>
                  <small className="config-recipe-io">
                    {recipe.inputs
                      .map(
                        i =>
                          `${i.count}x ${i.name}${
                            i.consumed === false ? " (tool)" : ""
                          }`,
                      )
                      .join(" + ")}{" "}
                    → {recipe.output.count}x {recipe.output.name}
                  </small>
                  {missingItems.length > 0 && (
                    <small className="text-warning d-block">
                      Not in ship cargo: {missingItems.join(", ")}
                    </small>
                  )}
                </div>
              );
            })}
          </div>
          <h5 className="rooms-header">
            Fabrication Rooms{" "}
            <small>
              {fabricationRoomCount === 0
                ? "(none tagged — the fabricator draws from every cargo room on the ship)"
                : `(${fabricationRoomCount} tagged — fabrication is restricted to these rooms, and the first is preselected for the crew)`}
            </small>
          </h5>
          <div className="config-room-list">
            {decks.map(deck => (
              <div key={deck?.id || ""}>
                <strong>Deck {deck?.number}</strong>
                {(deck?.rooms || []).map(room => {
                  const tagged = Boolean(
                    room?.roles?.includes(RoomRoles.Fabrication),
                  );
                  return (
                    <label key={room?.id || ""} className="config-room">
                      <input
                        type="checkbox"
                        checked={tagged}
                        onChange={() =>
                          room &&
                          toggleFabricationRoom(room.id!, room.roles, tagged)
                        }
                      />{" "}
                      {room?.name}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </Col>
        <Col sm={8}>
          {selectedPack ? (
            <div className="template-preview">
              <h5>{selectedPack.name}</h5>
              <p>{selectedPack.description}</p>
              <div className="template-columns">
                <div>
                  <strong>Recipes</strong>
                  <ul>
                    {selectedPack.recipes.map(r => (
                      <li key={r.name}>
                        {r.name}
                        {r.secret ? " (secret)" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Cargo to seed</strong>
                  <ul>
                    {selectedPack.cargo.map(c => (
                      <li key={c.name}>
                        {c.count}x {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Label>Put the cargo in this room:</Label>
              <Input
                type="select"
                className="template-room-select"
                value={templateRoomId}
                onChange={e => setTemplateRoomId(e.target.value)}
              >
                <option value="">Pick a room...</option>
                {decks.map(deck => (
                  <optgroup key={deck?.id || ""} label={`Deck ${deck?.number}`}>
                    {(deck?.rooms || []).map(room => (
                      <option key={room?.id || ""} value={room?.id || ""}>
                        {room?.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Input>
              <div className="template-actions">
                <Button
                  color="success"
                  disabled={!templateRoomId}
                  onClick={applyTemplate}
                >
                  Add Recipes &amp; Cargo
                </Button>
                <Button color="secondary" onClick={() => setTemplatePackId("")}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : editing ? (
            <>
              <RecipeEditor
                recipe={editing}
                inventoryNames={inventoryNames}
                onChange={setEditing}
                onSave={saveEdit}
                onCancel={() => {
                  setEditing(null);
                  setEditingId(null);
                }}
              />
              {editingId && (
                <Button
                  color="danger"
                  className="remove-recipe"
                  onClick={() => {
                    removeRecipe({variables: {id: editingId}});
                    setEditing(null);
                    setEditingId(null);
                  }}
                >
                  Remove Recipe
                </Button>
              )}
            </>
          ) : (
            <p className="config-empty">
              Select a recipe to edit it, or use the buttons above to add one.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Fabrication;
