import React, { Fragment, Component } from "react";
import styles from "./style.module.css";
import compStyles from "../compStyles.module.css";
import propTypes from "prop-types";
import DiagramContext from "../helpers/diagramContext";

function renderComponent(c, startDragging) {
  const Comp = c.component;
  return (
    <div
      key={c.objectKey || c.name}
      className={`${styles.comp} ${compStyles.comp}`}
      data-component={c.objectKey || c.name}
      onMouseDown={startDragging}
    >
      <p>{c.label || c.name}</p>
      {c.showInLibrary && <Comp inputs={[]} updateValue={() => {}} />}
    </div>
  );
}

const sorter = (a, b) => {
  const aKey = a.objectKey || a.name;
  const bKey = b.objectKey || b.name;
  if (aKey > bKey) return 1;
  if (bKey > aKey) return -1;
  return 0;
};

class Library extends Component {
  state = { search: "" };
  render() {
    const { renderButtons } = this.props;
    const { search } = this.state;
    return (
      <DiagramContext.Consumer>
        {({
          resetCanvas,
          clearCanvas,
          startLibraryDrag,
          registeredComponents
        }) => {
          const categories = registeredComponents
            .map(c => c.category)
            // Remove Duplicates
            .filter((c, i, a) => a.indexOf(c) === i)
            // Filter out nulls
            .filter(Boolean);
          return (
            <div className={styles["component-inner-container"]}>
              <h2>Components</h2>
              <input
                type="search"
                placeholder="Search..."
                value={search}
                onChange={e => this.setState({ search: e.target.value })}
              />
              {search ? (
                <div className={styles["component-holder"]}>
                  <div className={styles["grid"]}>
                    {registeredComponents
                      .filter(
                        c =>
                          !c.hiddenInLibrary &&
                          (c.name.match(new RegExp(search, "gi")) ||
                            (c.label &&
                              c.label.match(new RegExp(search, "gi"))))
                      )
                      .sort(sorter)
                      .map(c => renderComponent(c, startLibraryDrag))}
                  </div>
                </div>
              ) : (
                <div className={styles["component-holder"]}>
                  {categories.map(cat => (
                    <details key={`category-${cat}`}>
                      <summary>{cat}</summary>
                      <div className={styles["grid"]}>
                        {registeredComponents
                          .filter(c => c.category === cat && !c.hiddenInLibrary)
                          .sort(sorter)
                          .map(c => renderComponent(c, startLibraryDrag))}
                      </div>
                    </details>
                  ))}
                  <details>
                    <summary>Misc.</summary>
                    <div className={styles["grid"]}>
                      {registeredComponents
                        .filter(c => !c.category && !c.hiddenInLibrary)
                        .sort(sorter)
                        .map(c => renderComponent(c, startLibraryDrag))}
                    </div>
                  </details>
                </div>
              )}
              {renderButtons ? (
                renderButtons(clearCanvas, resetCanvas)
              ) : (
                <Fragment>
                  <button
                    onClick={clearCanvas}
                    style={{ marginBottom: "10px" }}
                  >
                    Clear Canvas
                  </button>
                  <button onClick={resetCanvas}>Reset Pan</button>
                </Fragment>
              )}
            </div>
          );
        }}
      </DiagramContext.Consumer>
    );
  }
}

Library.propTypes = {
  renderButtons: propTypes.func
};
export default Library;
