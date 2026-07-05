import React from "react";
import {Container, Row, Col, Button, Input, Progress} from "helpers/reactstrap";
import {DeckDropdown, RoomDropdown} from "helpers/shipStructure";
import Tour from "helpers/tourHelper";
import {
  Simulator,
  useFabricationInventoryQuery,
  useFabricationInventorySubSubscription,
  useFabricationRecipesSubscription,
  useFabricationJobsSubscription,
  useFabricationSettingsSubscription,
  useStartFabricationMutation,
  useCancelFabricationJobMutation,
  FabricationRecipesSubscription,
  RoomRoles,
} from "generated/graphql";
import {trainingSteps} from "./trainingSteps";
import {categoryLabels, MAX_SLOTS} from "./shared";
import "./style.scss";

export type FabricationRecipeData = NonNullable<
  FabricationRecipesSubscription["fabricationRecipesUpdate"]
>[0];

interface Slot {
  name: string;
  count: number;
}

interface FabricationProps {
  children?: React.ReactNode;
  simulator: Simulator;
  clientObj?: any;
}

const Fabrication: React.FC<FabricationProps> = ({simulator, clientObj}) => {
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
  const [startFabrication] = useStartFabricationMutation();
  const [cancelJob] = useCancelFabricationJobMutation();

  const [deckId, setDeckId] = React.useState<string | null>(null);
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const [slots, setSlots] = React.useState<Slot[]>([]);
  const [batches, setBatches] = React.useState(1);
  const [selectedRecipe, setSelectedRecipe] = React.useState<string | null>(
    null,
  );
  const [search, setSearch] = React.useState("");
  const [message, setMessage] = React.useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const messageTimeout = React.useRef<number | undefined>(undefined);
  // A short energy surge plays when a job starts; continuous animation
  // would wrongly suggest the fabricator can't take another job. A failed
  // attempt plays a red misfire instead so the rejection is felt, not
  // just read.
  const [surging, setSurging] = React.useState(false);
  const surgeTimeout = React.useRef<number | undefined>(undefined);
  const [misfiring, setMisfiring] = React.useState(false);
  const misfireTimeout = React.useRef<number | undefined>(undefined);
  // During a misfire, slots holding components that belong to the closest
  // secret recipe (with near-miss feedback enabled) glow amber — a wordless
  // "keep these, swap that"
  const [resonantSlots, setResonantSlots] = React.useState<string[]>([]);

  React.useEffect(
    () => () => {
      window.clearTimeout(messageTimeout.current);
      window.clearTimeout(surgeTimeout.current);
      window.clearTimeout(misfireTimeout.current);
    },
    [],
  );

  const allDecks = React.useMemo(() => layoutData?.decks || [], [layoutData]);
  const inventory = React.useMemo(
    () => inventorySubData?.inventoryUpdate || layoutData?.inventory || [],
    [inventorySubData, layoutData],
  );
  const recipes = React.useMemo(
    () => recipeData?.fabricationRecipesUpdate || [],
    [recipeData],
  );
  const jobs = jobData?.fabricationJobsUpdate || [];
  const settings = settingsData?.fabricationSettingsUpdate;
  const fabricatorOnline = settings ? settings.enabled : true;

  // When the FD tags rooms with the fabrication role, only those rooms can
  // fabricate — mirror the server's rule in the room picker. With no tagged
  // rooms the fabricator runs ship-wide and room selection disappears.
  const isFabricationRoom = (r: any) =>
    r?.roles?.includes(RoomRoles.Fabrication);
  const hasFabricationRooms = React.useMemo(
    () => allDecks.some(d => d?.rooms?.some(isFabricationRoom)),
    [allDecks],
  );
  const shipWide = !hasFabricationRooms;
  const decks = React.useMemo(() => {
    if (!hasFabricationRooms) return allDecks;
    return allDecks
      .map(d =>
        d ? {...d, rooms: d.rooms?.filter(isFabricationRoom)} : d,
      )
      .filter(d => d?.rooms && d.rooms.length > 0);
  }, [allDecks, hasFabricationRooms]);

  // Designated fabrication rooms come preselected so the crew can start
  // fabricating without hunting through the ship layout first. Also recovers
  // when the FD re-tags rooms mid-flight and the current selection is no
  // longer a fabrication room.
  React.useEffect(() => {
    if (!hasFabricationRooms) return;
    if (
      roomId &&
      decks.some(d => d?.rooms?.some(r => r?.id === roomId))
    )
      return;
    const deck = decks[0];
    const room = deck?.rooms?.[0];
    if (deck?.id && room?.id) {
      setDeckId(deck.id);
      setRoomId(room.id);
    }
  }, [hasFabricationRooms, decks, roomId]);

  // Single-deck ships skip the deck dropdown, like Cargo Control does
  const effectiveDeckId = decks.length === 1 ? decks[0]?.id : deckId;

  const showMessage = (text: string, error: boolean) => {
    window.clearTimeout(messageTimeout.current);
    setMessage({text, error});
    messageTimeout.current = window.setTimeout(() => setMessage(null), 8000);
  };

  // Crew can only see public schematics and secrets they've discovered
  const knownRecipes = React.useMemo(
    () =>
      recipes
        .filter(r => !r.secret || r.discovered)
        .filter(r =>
          search
            ? r.name.toLowerCase().includes(search.toLowerCase()) ||
              r.output.name.toLowerCase().includes(search.toLowerCase())
            : true,
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [recipes, search],
  );
  const recipe = knownRecipes.find(r => r.id === selectedRecipe) || null;

  // How many of each item the fabricator can reach: the selected room's
  // stock, or the whole ship's when running ship-wide
  const roomStock = React.useMemo(() => {
    const stock: {[name: string]: number} = {};
    if (!shipWide && !roomId) return stock;
    inventory.forEach(item => {
      const count = shipWide
        ? (item?.roomCount || []).reduce(
            (prev, rc) => prev + (rc?.count || 0),
            0,
          )
        : item?.roomCount?.find(rc => rc?.room?.id === roomId)?.count || 0;
      if (count > 0 && item?.name) stock[item.name] = count;
    });
    return stock;
  }, [inventory, roomId, shipWide]);

  // Only cargo that appears in some recipe is worth loading — hiding the
  // rest keeps the component list approachable. Undiscovered secret
  // recipes count too, so their ingredients stay available to experiment
  // with. If no recipes are configured at all, show everything.
  const usableNames = React.useMemo(() => {
    const names = new Set<string>();
    recipes.forEach(r => r.inputs.forEach(i => names.add(i.name.toLowerCase())));
    return names;
  }, [recipes]);
  const visibleStock = React.useMemo(() => {
    const entries = Object.entries(roomStock);
    if (recipes.length === 0) return entries;
    return entries.filter(([name]) => usableNames.has(name.toLowerCase()));
  }, [roomStock, usableNames, recipes.length]);

  const slotted = (name: string) =>
    slots.find(s => s.name.toLowerCase() === name.toLowerCase())?.count || 0;

  const addToSlot = (name: string) => {
    if (slotted(name) >= (roomStock[name] || 0)) return;
    setSelectedRecipe(null);
    setSlots(current => {
      const existing = current.find(
        s => s.name.toLowerCase() === name.toLowerCase(),
      );
      if (existing) {
        return current.map(s => (s === existing ? {...s, count: s.count + 1} : s));
      }
      if (current.length >= MAX_SLOTS) return current;
      return [...current, {name, count: 1}];
    });
  };

  const removeFromSlot = (name: string) => {
    setSelectedRecipe(null);
    setSlots(current =>
      current
        .map(s => (s.name === name ? {...s, count: s.count - 1} : s))
        .filter(s => s.count > 0),
    );
  };

  // Tapping a schematic loads its component list straight into the slots
  const loadRecipe = (r: FabricationRecipeData) => {
    setSelectedRecipe(r.id);
    setSlots(r.inputs.map(i => ({name: i.name, count: i.count})));
  };

  // Recipes match inventory by name case-insensitively, so the availability
  // check must too — otherwise a recipe whose input casing differs from the
  // cargo item dims as unavailable even though it fabricates fine
  const stockByLowerName = React.useMemo(() => {
    const map: {[lower: string]: number} = {};
    Object.entries(roomStock).forEach(([name, count]) => {
      const key = name.toLowerCase();
      map[key] = (map[key] || 0) + count;
    });
    return map;
  }, [roomStock]);
  const recipeAvailable = (r: FabricationRecipeData) =>
    r.inputs.every(
      i => (stockByLowerName[i.name.toLowerCase()] || 0) >= i.count,
    );

  // Which slotted components appear in the best-matching undiscovered
  // secret recipe with near-miss feedback enabled. Requires at least two
  // matches so a single common ingredient can't be used to fish for
  // secrets one item at a time.
  const findResonance = () => {
    let best: string[] = [];
    recipes
      .filter(r => r.secret && !r.discovered && r.nearMiss)
      .forEach(r => {
        const inputNames = r.inputs.map(i => i.name.toLowerCase());
        const matched = slots
          .filter(s => inputNames.includes(s.name.toLowerCase()))
          .map(s => s.name);
        if (matched.length > best.length) best = matched;
      });
    return best.length >= 2 ? best : [];
  };

  const fabricate = async () => {
    if ((!shipWide && !roomId) || slots.length === 0) return;
    const {data} = await startFabrication({
      variables: {
        simulatorId: simulator.id,
        roomId: shipWide ? null : roomId,
        inputs: slots.map(s => ({name: s.name, count: s.count})),
        count: batches,
      },
    });
    const result = data?.startFabrication || "";
    if (result.startsWith("ERROR:")) {
      showMessage(result.replace("ERROR:", ""), true);
      setSurging(false);
      window.clearTimeout(surgeTimeout.current);
      setResonantSlots(findResonance());
      setMisfiring(true);
      window.clearTimeout(misfireTimeout.current);
      misfireTimeout.current = window.setTimeout(() => {
        setMisfiring(false);
        setResonantSlots([]);
      }, 1500);
    } else {
      showMessage("Fabrication in progress. Components consumed.", false);
      setSlots([]);
      setBatches(1);
      setSelectedRecipe(null);
      setMisfiring(false);
      setResonantSlots([]);
      window.clearTimeout(misfireTimeout.current);
      setSurging(true);
      window.clearTimeout(surgeTimeout.current);
      surgeTimeout.current = window.setTimeout(() => setSurging(false), 3000);
    }
  };

  // Secret recipes whose hint the FD has made visible show up as partial
  // schematics — a clue, not a working recipe
  const hintedRecipes = recipes.filter(
    r => r.secret && !r.discovered && r.hintVisible && r.hint,
  );

  const visibleJobs = jobs
    .concat()
    .sort((a, b) => (a.status === "active" ? -1 : 1) - (b.status === "active" ? -1 : 1));

  // Drives the queue badge; ongoing progress is shown by the queue's
  // progress bars rather than a continuous fabricator animation
  const activeJobCount = jobs.filter(j => j.status === "active").length;

  return (
    <Container fluid className="card-fabrication">
      <Row className="fabrication-content">
        <Col sm={4} className="fabrication-cargo">
          <h4>Component Source</h4>
          <div className="room-pickers">
            {shipWide && (
              <p className="hint">
                Drawing components from every cargo room aboard the ship.
              </p>
            )}
            {!shipWide && decks.length > 1 && (
              <DeckDropdown
                allDecks={false}
                selectedDeck={effectiveDeckId}
                decks={decks}
                disabled={false}
                size={undefined}
                setSelected={({deck}: {deck: string}) => {
                  setDeckId(deck);
                  setRoomId(null);
                  setSlots([]);
                }}
              >
                {null}
              </DeckDropdown>
            )}
            {!shipWide && (
              <RoomDropdown
                selectedDeck={effectiveDeckId}
                selectedRoom={roomId}
                otherSelected={null}
                decks={decks}
                disabled={false}
                size={undefined}
                setSelected={({room}: {room: string}) => {
                  setRoomId(room);
                  setSlots([]);
                }}
              />
            )}
          </div>
          <div className="cargo-list">
            {!shipWide && !roomId && (
              <p className="hint">
                Select the room the fabricator should draw components from.
              </p>
            )}
            {(shipWide || roomId) && visibleStock.length === 0 && (
              <p className="hint">
                {shipWide
                  ? "There are no usable components aboard the ship."
                  : "This room has no usable components."}
              </p>
            )}
            {visibleStock.map(([name, count]) => {
              const remaining = count - slotted(name);
              return (
                <div
                  key={name}
                  className={`cargo-item ${remaining <= 0 ? "depleted" : ""}`}
                  onClick={() => addToSlot(name)}
                >
                  <span>{name}</span>
                  <span className="count">{remaining}</span>
                </div>
              );
            })}
          </div>
        </Col>
        <Col sm={4} className="fabrication-bay">
          <h4>Fabricator</h4>
          <div
            className={`fabricator-visual ${surging ? "surging" : ""} ${
              misfiring ? "misfiring" : ""
            } ${slots.length > 0 ? "charged" : ""}`}
          >
          <div className="slots">
            <div className="conduit conduit-h-left" aria-hidden />
            <div className="conduit conduit-h-right" aria-hidden />
            <div className="conduit conduit-v-top" aria-hidden />
            <div className="conduit conduit-v-bottom" aria-hidden />
            <div className="fab-node" aria-hidden />
            {Array.from({length: MAX_SLOTS}).map((_, index) => {
              const slot = slots[index];
              return (
                <div
                  key={`slot-${index}`}
                  className={`slot ${slot ? "filled" : ""} ${
                    slot && resonantSlots.includes(slot.name) ? "resonant" : ""
                  }`}
                  onClick={() => slot && removeFromSlot(slot.name)}
                >
                  {slot ? (
                    <>
                      <span className="slot-remove" aria-hidden>
                        ✕
                      </span>
                      <span className="slot-name">{slot.name}</span>
                      <span className="slot-count">x{slot.count}</span>
                    </>
                  ) : (
                    <span className="slot-empty">Empty Slot</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="conduit-drop" aria-hidden />
          <div className="output-preview">
            {recipe ? (
              <div className="chamber-output">
                <p className="output-label">Projected Output</p>
                <p className="output-name">
                  {recipe.output.count} x {recipe.output.name}
                </p>
                {recipe.description && (
                  <p className="output-description">{recipe.description}</p>
                )}
              </div>
            ) : slots.length > 0 ? (
              <div className="chamber-output">
                <p className="output-unknown">
                  Output unknown — experimental mix
                </p>
              </div>
            ) : null}
            <div className="chamber-queue">
              <p className="queue-label">
                Fabrication Queue
                {activeJobCount > 0 && <span> — {activeJobCount} running</span>}
              </p>
              <div className="job-list">
                {visibleJobs.length === 0 && (
                  <p className="hint">The fabricator is idle.</p>
                )}
                {visibleJobs.map(job => (
                  <div key={job.id} className={`job job-${job.status}`}>
                    <div className="job-info">
                      <span className="job-name">
                        {job.output.count} x {job.output.name}
                      </span>
                      {job.status === "active" ? (
                        <span className="job-room">
                          {job.room
                            ? `${job.room.name}, Deck ${job.room.deck?.number}`
                            : ""}
                        </span>
                      ) : (
                        <span className="job-status">
                          {job.status === "complete" ? "Delivered" : "Cancelled"}
                        </span>
                      )}
                    </div>
                    {job.status === "active" && (
                      <div className="job-progress-row">
                        <Progress animated striped value={job.progress * 100}>
                          {Math.round(job.progress * 100)}%
                        </Progress>
                        <Button
                          size="sm"
                          color="warning"
                          onClick={() => cancelJob({variables: {id: job.id}})}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="batch-row">
            <span className="batch-label">Quantity</span>
            <Button
              size="sm"
              disabled={batches <= 1}
              onClick={() => setBatches(b => Math.max(1, b - 1))}
            >
              −
            </Button>
            <span className="batch-count">{batches}</span>
            <Button
              size="sm"
              disabled={batches >= 10}
              onClick={() => setBatches(b => Math.min(10, b + 1))}
            >
              +
            </Button>
          </div>
          <Button
            block
            size="lg"
            color="primary"
            className="fabricate-button"
            disabled={
              !fabricatorOnline || (!shipWide && !roomId) || slots.length === 0
            }
            onClick={fabricate}
          >
            {fabricatorOnline
              ? `Fabricate${batches > 1 ? ` x${batches}` : ""}`
              : "Fabricator Offline"}
          </Button>
          {message && (
            <p className={`status-message ${message.error ? "text-danger" : "text-success"}`}>
              {message.text}
            </p>
          )}
          </div>
        </Col>
        <Col sm={4} className="fabrication-recipes">
          <h4>Schematic Database</h4>
          <Input
            type="text"
            className="recipe-search"
            placeholder="Search schematics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="recipe-list">
            {knownRecipes.length === 0 && hintedRecipes.length === 0 && (
              <p className="hint">No schematics on file.</p>
            )}
            {knownRecipes.map(r => (
              <div
                key={r.id}
                className={`recipe ${selectedRecipe === r.id ? "selected" : ""} ${
                  (shipWide || roomId) && !recipeAvailable(r)
                    ? "unavailable"
                    : ""
                }`}
                onClick={() => loadRecipe(r)}
              >
                <div className="recipe-title">
                  <span>{r.name}</span>
                  <span className="recipe-category">
                    {categoryLabels[r.category] || r.category}
                  </span>
                </div>
                <div className="recipe-io">
                  {r.inputs
                    .map(
                      i =>
                        `${i.count}x ${i.name}${
                          i.consumed === false ? " (tool)" : ""
                        }`,
                    )
                    .join(" + ")}
                  {" → "}
                  {r.output.count}x {r.output.name}
                </div>
                {r.secret && <div className="recipe-secret">Discovered Schematic</div>}
              </div>
            ))}
            {hintedRecipes.map(r => (
              <div key={r.id} className="recipe partial">
                <div className="recipe-title">
                  <span>Partial Schematic</span>
                  <span className="recipe-category">Unknown</span>
                </div>
                <div className="recipe-io">{r.hint}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Tour steps={trainingSteps} />
    </Container>
  );
};

export default Fabrication;
