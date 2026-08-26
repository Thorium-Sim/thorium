import React from "react";
import {Button, Progress} from "helpers/reactstrap";
import {
  Simulator,
  useFabricationInventoryQuery,
  useFabricationInventorySubSubscription,
  useFabricationRecipesSubscription,
  useFabricationJobsSubscription,
  useFabricationSettingsSubscription,
  useRevealFabricationRecipeMutation,
  useShowFabricationRecipeHintMutation,
  useSetFabricationEnabledMutation,
  useSetFabricationJobLimitMutation,
  useCancelFabricationJobMutation,
  useCompleteFabricationJobMutation,
  useClearFabricationJobsMutation,
  useAddFabricationRecipeMutation,
  useUpdateFabricationRecipeMutation,
  useRemoveFabricationRecipeMutation,
  useFabricationAddInventoryMutation,
  Fabrication_Job_Status,
} from "generated/graphql";
import RecipeEditor, {
  blankRecipe,
  EditableRecipe,
  toRecipeInput,
} from "./RecipeEditor";
import {categoryLabels} from "./shared";
import "./style.scss";

interface FabricationCoreProps {
  children?: React.ReactNode;
  simulator: Simulator;
}

// Flight Director core: watch and steer the crew's fabrication. Reveal secret
// schematics, finish or cancel jobs, patch recipes mid-flight, and fix
// missing cargo without leaving the core.
const FabricationCore: React.FC<FabricationCoreProps> = ({simulator}) => {
  const {data: layoutData} = useFabricationInventoryQuery({
    variables: {simulatorId: simulator.id},
    fetchPolicy: "cache-and-network",
  });
  const {data: inventorySubData} = useFabricationInventorySubSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: recipeData} = useFabricationRecipesSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: jobData} = useFabricationJobsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: settingsData} = useFabricationSettingsSubscription({
    variables: {simulatorId: simulator.id},
  });
  const [reveal] = useRevealFabricationRecipeMutation();
  const [showHint] = useShowFabricationRecipeHintMutation();
  const [setEnabled] = useSetFabricationEnabledMutation();
  const [setJobLimit] = useSetFabricationJobLimitMutation();
  const [cancelJob] = useCancelFabricationJobMutation();
  const [completeJob] = useCompleteFabricationJobMutation();
  const [clearJobs] = useClearFabricationJobsMutation();
  const [addRecipe] = useAddFabricationRecipeMutation();
  const [updateRecipe] = useUpdateFabricationRecipeMutation();
  const [removeRecipe] = useRemoveFabricationRecipeMutation();
  const [addInventory] = useFabricationAddInventoryMutation();

  const [editing, setEditing] = React.useState<EditableRecipe | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const recipes = recipeData?.fabricationRecipesUpdate || [];
  const jobs = jobData?.fabricationJobsUpdate || [];
  const settings = settingsData?.fabricationSettingsUpdate;
  const enabled = settings ? settings.enabled : true;
  const jobLimit = settings?.jobLimit || 0;
  const inventory = React.useMemo(
    () => inventorySubData?.inventoryUpdate || layoutData?.inventory || [],
    [inventorySubData, layoutData],
  );
  const decks = layoutData?.decks || [];

  const inventoryNames = React.useMemo(
    () =>
      Array.from(new Set(inventory.map(i => i?.name || "").filter(Boolean))),
    [inventory],
  );
  const hasItem = (name: string) =>
    inventoryNames.some(n => n.toLowerCase() === name.trim().toLowerCase());

  // Recipe inputs that reference cargo the ship doesn't carry at all —
  // usually a simulator that wasn't set up for a recipe. One click seeds the
  // item into the first room so the crew isn't dead-ended.
  const missingItems = Array.from(
    new Set(
      recipes
        .flatMap(r => r.inputs.map(i => i.name))
        .filter(name => !hasItem(name)),
    ),
  );
  const firstRoom = decks
    .concat()
    .sort((a, b) => (a?.number || 0) - (b?.number || 0))
    .flatMap(d => d?.rooms || [])[0];

  const seedItem = (name: string) => {
    if (!firstRoom) return;
    addInventory({
      variables: {
        simulatorId: simulator.id,
        name,
        metadata: {},
        roomCount: [{room: firstRoom.id, count: 5}],
      },
    });
  };

  const startEdit = (recipeId?: string) => {
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
      await addRecipe({variables: {simulatorId: simulator.id, recipe}});
    }
    setEditing(null);
    setEditingId(null);
  };

  const activeJobs = jobs.filter(j => j.status === Fabrication_Job_Status.Active);
  const finishedJobs = jobs.filter(
    j => j.status !== Fabrication_Job_Status.Active,
  );

  if (editing) {
    return (
      <div className="core-fabrication">
        <div className="core-section-header">
          <strong>{editingId ? "Edit Recipe" : "New Recipe"}</strong>
          {editingId && (
            <Button
              size="sm"
              color="danger"
              onClick={() => {
                removeRecipe({variables: {id: editingId}});
                setEditing(null);
                setEditingId(null);
              }}
            >
              Delete
            </Button>
          )}
        </div>
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
      </div>
    );
  }

  return (
    <div className="core-fabrication">
      <div className="core-settings">
        <label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={e =>
              setEnabled({
                variables: {simulatorId: simulator.id, enabled: e.target.checked},
              })
            }
          />{" "}
          Fabricator online
        </label>
        <label title="Maximum simultaneous jobs. 0 = unlimited.">
          Job limit:{" "}
          <input
            type="number"
            min={0}
            className="core-job-limit"
            value={jobLimit}
            onChange={e =>
              setJobLimit({
                variables: {
                  simulatorId: simulator.id,
                  limit: parseInt(e.target.value, 10) || 0,
                },
              })
            }
          />
        </label>
      </div>
      {missingItems.length > 0 && (
        <div className="core-missing">
          <strong>Missing cargo for recipes:</strong>
          {missingItems.map(name => (
            <div key={name} className="core-missing-item">
              <span>{name}</span>
              <Button
                size="sm"
                color="warning"
                disabled={!firstRoom}
                title={
                  firstRoom
                    ? `Add 5 to ${firstRoom.name}`
                    : "No rooms configured"
                }
                onClick={() => seedItem(name)}
              >
                Seed 5
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="core-section-header">
        <strong>Jobs</strong>
        {finishedJobs.length > 0 && (
          <Button
            size="sm"
            color="secondary"
            onClick={() => clearJobs({variables: {simulatorId: simulator.id}})}
          >
            Clear Finished
          </Button>
        )}
      </div>
      {jobs.length === 0 && <p className="core-hint">No fabrication jobs.</p>}
      {activeJobs.map(job => (
        <div key={job.id} className="core-job">
          <span className="core-job-name">
            {job.output.count}x {job.output.name}
            {job.room ? ` — ${job.room.name}` : ""}
          </span>
          <Progress value={job.progress * 100} />
          <Button
            size="sm"
            color="success"
            title="Complete now"
            onClick={() => completeJob({variables: {id: job.id}})}
          >
            ✓
          </Button>
          <Button
            size="sm"
            color="danger"
            title="Cancel and refund components"
            onClick={() => cancelJob({variables: {id: job.id}})}
          >
            ✕
          </Button>
        </div>
      ))}
      {finishedJobs.map(job => (
        <div key={job.id} className="core-job finished">
          <span className="core-job-name">
            {job.output.count}x {job.output.name} —{" "}
            {job.status === Fabrication_Job_Status.Complete
              ? "delivered"
              : "cancelled"}
          </span>
        </div>
      ))}
      <div className="core-section-header">
        <strong>Recipes</strong>
        <Button size="sm" color="info" onClick={() => startEdit()}>
          New Recipe
        </Button>
      </div>
      {recipes.length === 0 && (
        <p className="core-hint">
          No recipes attached to this simulator. Add one here, or configure
          them permanently in Simulator Config → Fabrication.
        </p>
      )}
      {recipes.map(recipe => (
        <div key={recipe.id} className="core-recipe">
          <div className="core-recipe-name">
            <span onClick={() => startEdit(recipe.id)} className="editable">
              {recipe.name}
            </span>
            <span className="core-recipe-category">
              {categoryLabels[recipe.category] || recipe.category}
            </span>
          </div>
          <div className="core-recipe-io">
            {recipe.inputs
              .map(
                i =>
                  `${i.count}x ${i.name}${i.consumed === false ? " (tool)" : ""}`,
              )
              .join(" + ")}
            {" → "}
            {recipe.output.count}x {recipe.output.name}
          </div>
          {recipe.secret &&
            (recipe.discovered ? (
              <span className="core-recipe-secret discovered">
                Secret — discovered
              </span>
            ) : (
              <span className="core-recipe-secret">
                Secret — hidden{" "}
                {recipe.nearMissCount > 0 && (
                  <span
                    className={`core-near-miss ${
                      recipe.nearMissCount >= 3 ? "hot" : ""
                    }`}
                    title="Failed attempts that came close to this recipe"
                  >
                    {recipe.nearMissCount} close attempt
                    {recipe.nearMissCount === 1 ? "" : "s"}{" "}
                  </span>
                )}
                <Button
                  size="sm"
                  color="info"
                  onClick={() =>
                    reveal({
                      variables: {
                        simulatorId: simulator.id,
                        recipe: recipe.id,
                      },
                    })
                  }
                >
                  Reveal
                </Button>
                {recipe.hint &&
                  (recipe.hintVisible ? (
                    <span className="core-hint-shown"> Hint shown</span>
                  ) : (
                    <Button
                      size="sm"
                      color="warning"
                      title={`Show the crew this hint: ${recipe.hint}`}
                      onClick={() =>
                        showHint({
                          variables: {
                            simulatorId: simulator.id,
                            recipe: recipe.id,
                          },
                        })
                      }
                    >
                      Show Hint
                    </Button>
                  ))}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
};

export default FabricationCore;
