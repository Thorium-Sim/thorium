import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";
import {} from "change-case";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import {cypherMap} from "components/views/CodeCyphers";
import {FaBan} from "react-icons/fa";

export default ({updateArgs, args: {entry = {}}}) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <Label>Title</Label>
      <Input
        type="text"
        defaultValue={entry.title}
        onBlur={evt =>
          updateArgs(
            "entry",
            Object.assign({}, entry, {title: evt.target.value}),
          )
        }
      />
      <Label>
        Type <small>What stations does this entry show up on?</small>
      </Label>
      <Input
        type="select"
        value={entry.type || ""}
        onChange={evt =>
          updateArgs(
            "entry",
            Object.assign({}, entry, {type: evt.target.value}),
          )
        }
      >
        <option value={"general"}>General</option>
        <option value={"command"}>Command</option>
        <option value={"legal"}>Legal</option>
        <option value={"medical"}>Medical</option>
        <option value={"security"}>Security</option>
        <option value={"damage"}>Damage</option>
      </Input>
      <Label>Categories</Label>
      <Input
        type="select"
        value={"select"}
        onChange={e => {
          let {value} = e.target;
          if (value === "Other...") {
            value = prompt("What is the name of the custom category?");
            if (!value) return;
          }
          updateArgs(
            "entry",
            Object.assign({}, entry, {
              categories: (entry.categories || [])
                .concat(value)
                .filter((c, i, a) => a.indexOf(c) === i),
            }),
          );
        }}
      >
        <option value="select" disabled>
          Choose a Category
        </option>
        <option>Biographies</option>
        <option>Creatures</option>
        <option>History</option>
        <option>Races</option>
        <option>Misc</option>
        <option>Planets</option>
        <option>Procedures</option>
        <option>Starships</option>
        <option>Stellar Cartography</option>
        <option>Technology</option>
        <option>Other...</option>
      </Input>
      {(entry.categories || []).map(s => (
        <div key={`categories-list-${entry.id}-${s}`}>
          {s}{" "}
          <FaBan
            className="text-danger"
            onClick={() =>
              updateArgs(
                "entry",
                Object.assign({}, entry, {
                  categories: entry.categories.filter(a => a !== s),
                }),
              )
            }
          />
        </div>
      ))}
      <FormGroup>
        <Label>Font</Label>
        <Input
          type="select"
          value={entry.font}
          onChange={e => updateArgs("font", e.target.value)}
        >
          <option value="">Normal Font</option>
          {Object.keys(cypherMap).map(c => (
            <option value={cypherMap[c]} key={c}>
              {cypherMap[c]}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Label>Body</Label>
      <Input
        rows={10}
        type="textarea"
        defaultValue={entry.body || ""}
        onBlur={e =>
          updateArgs("entry", Object.assign({}, entry, {body: e.target.value}))
        }
      />
      <Label>Image</Label>
      <FileExplorer
        directory="/Library Images"
        selectedFiles={[entry.image]}
        onClick={(evt, container) =>
          updateArgs(
            "entry",
            Object.assign({}, entry, {image: container.fullPath}),
          )
        }
      />
    </FormGroup>
  );
};
