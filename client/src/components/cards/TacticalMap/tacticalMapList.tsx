import React, {Fragment} from "react";
import {Button, Label, Input} from "helpers/reactstrap";
import {
  useTacticalMapListSubscription,
  useNewTacticalMutation,
  useDuplicateTacticalMutation,
  useRemoveMapMutation,
} from "generated/graphql";

const importTacticalMap = (evt: React.ChangeEvent<HTMLInputElement>) => {
  if (evt.target.files?.[0]) {
    const data = new FormData();
    Array.from(evt.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f),
    );
    fetch(`/importTacticalMap`, {
      method: "POST",
      body: data,
    }).then(() => {
      window.location.reload();
    });
  }
};

interface TacticalMapListProps {
  flightId?: string;
  tacticalMapId?: string;
  selectTactical: Function;
  deselectTactical: Function;
  dedicated: boolean;
}

const TacticalMapList: React.FC<TacticalMapListProps> = ({
  flightId,
  tacticalMapId,
  selectTactical,
  deselectTactical,
  dedicated,
}) => {
  const [newTacticalMutation] = useNewTacticalMutation();
  const [duplicateTacticalMutation] = useDuplicateTacticalMutation();
  const [removeTacticalMutation] = useRemoveMapMutation();
  const addTactical = () => {
    const name = prompt("What is the name of the new tactical map?");
    if (name) {
      newTacticalMutation({variables: {name}}).then(res =>
        setTimeout(() => selectTactical(res.data?.newTacticalMap), 300),
      );
    }
  };
  const duplicateTactical = () => {
    const name = prompt("What is the name for the duplicated tactical map?");
    if (name && tacticalMapId) {
      duplicateTacticalMutation({variables: {name, id: tacticalMapId}});
    }
  };
  const removeTactical = () => {
    if (!tacticalMapId) return;
    if (window.confirm("Are you sure you want to delete this tactical?")) {
      removeTacticalMutation({variables: {id: tacticalMapId}});
      deselectTactical();
    }
  };

  const {data, loading} = useTacticalMapListSubscription();

  if (loading || !data) return null;
  const tacticalMaps = data.tacticalMapsUpdate;
  const maps = tacticalMaps
    ? tacticalMaps.filter(t =>
        flightId ? !t?.flight || t.flight.id === flightId : !t?.flight,
      )
    : [];
  return dedicated ? (
    <Fragment>
      <p>Saved Maps</p>
      <ul className="saved-list">
        {maps
          .filter(t => t?.template)
          .map(t => (
            <li
              key={t?.id || ""}
              className={t?.id === tacticalMapId ? "selected" : ""}
              onClick={() => selectTactical(t?.id)}
            >
              {t?.name}
            </li>
          ))}
      </ul>
      <div>
        <Button color="success" size="sm" onClick={addTactical}>
          New
        </Button>
        <Button
          color="info"
          size="sm"
          disabled={!tacticalMapId}
          onClick={duplicateTactical}
        >
          Duplicate
        </Button>
        <Button
          color="danger"
          size="sm"
          disabled={!tacticalMapId}
          onClick={removeTactical}
        >
          Remove
        </Button>
        <Button
          as="a"
          size="sm"
          disabled={!tacticalMapId}
          href={`/exportTacticalMap/${tacticalMapId}`}
        >
          Export
        </Button>
        <Label>
          <div className="btn btn-sm btn-info btn-block">Import</div>
          <Input hidden type="file" onChange={importTacticalMap} />
        </Label>
      </div>
    </Fragment>
  ) : (
    <div>
      <p>Flight Maps</p>
      <ul className="saved-list">
        {maps
          .filter(t => !t?.template)
          .map(t => (
            <li
              key={t?.id || ""}
              className={t?.id === tacticalMapId ? "selected" : ""}
              onClick={() => selectTactical(t?.id)}
            >
              {t?.name}
            </li>
          ))}
      </ul>
      <Button color="success" size="sm">
        Save as Template Map
      </Button>
    </div>
  );
};

export default TacticalMapList;
