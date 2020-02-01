import React from "react";
import {capitalCase} from "change-case";
import {Button} from "helpers/reactstrap";
import {MosaicContext} from "react-mosaic-component";
import categories from "../../categories";

const Picker = ({components, path}) => {
  const {mosaicActions} = React.useContext(MosaicContext);
  const update = e => {
    mosaicActions.replaceWith(path, e);
  };
  return (
    <div className="core-picker">
      <h3>Pick a core:</h3>
      <div className="categories">
        {categories.map(c => (
          <div key={c.name} className="category">
            <strong>{c.name}</strong>
            {c.components.map(n => (
              <div key={n}>
                <Button
                  disabled={components.indexOf(n) > -1}
                  size="sm"
                  onClick={() => update(n)}
                >
                  {capitalCase(n.replace("Core", ""))}
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Picker;
