import React from "react";
import { titleCase } from "change-case";
import { Button } from "reactstrap";
import { MosaicWindowContext } from "react-mosaic-component";
import categories from "../../categories";

class Picker extends React.PureComponent {
  static contextTypes = MosaicWindowContext;
  context;
  update = e => {
    this.context.mosaicActions.replaceWith(
      this.context.mosaicWindowActions
        ? this.context.mosaicWindowActions.getPath()
        : [],
      e
    );
  };
  render() {
    const { components } = this.props;
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
                    onClick={() => this.update(n)}
                  >
                    {titleCase(n.replace("Core", ""))}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Picker;
