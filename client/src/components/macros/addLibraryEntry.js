import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { paramCase } from "change-case";
import FontAwesome from "react-fontawesome";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

export default ({ updateArgs, args: { entry = {} }, client }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <Label>Title</Label>
      <Input
        type="text"
        defaultValue={entry.title}
        onBlur={evt =>
          updateArgs(
            "entry",
            Object.assign({}, entry, { title: evt.target.value })
          )
        }
      />
      <Label>
        Slug{" "}
        <small>
          Use this identifier to remove the entry with another macro.
        </small>
      </Label>
      <Input type="text" value={paramCase(entry.title)} readOnly />
      <Label>
        Type <small>What stations does this entry show up on?</small>
      </Label>
      <Input
        type="select"
        value={entry.type || ""}
        onChange={evt =>
          updateArgs(
            "entry",
            Object.assign({}, entry, { type: evt.target.value })
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
          let { value } = e.target;
          if (value === "Other...") {
            value = prompt("What is the name of the custom category?");
            if (!value) return;
          }
          updateArgs(
            "entry",
            Object.assign({}, entry, {
              categories: (entry.categories || [])
                .concat(value)
                .filter((c, i, a) => a.indexOf(c) === i)
            })
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
          <FontAwesome
            className="text-danger"
            name="ban"
            onClick={() =>
              updateArgs(
                "entry",
                Object.assign({}, entry, {
                  categories: entry.categories.filter(a => a !== s)
                })
              )
            }
          />
        </div>
      ))}
      <Label>Body</Label>
      <Input
        rows={10}
        type="textarea"
        defaultValue={entry.body || ""}
        onBlur={e =>
          updateArgs(
            "entry",
            Object.assign({}, entry, { body: e.target.value })
          )
        }
      />
      <Label>Image</Label>
      <FileExplorer
        directory="/Library Images"
        selectedFiles={[entry.image]}
        onClick={(evt, container) =>
          updateArgs(
            "entry",
            Object.assign({}, entry, { image: container.fullPath })
          )
        }
      />
    </FormGroup>
  );
};
