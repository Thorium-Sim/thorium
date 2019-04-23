import React from "react";
import DiagramContext from "../helpers/diagramContext";

const Config = () => {
  return (
    <DiagramContext.Consumer>
      {({
        selectedComponent,
        components,
        config,
        setConfig,
        registeredComponents
      }) => {
        const comp = components.find(s => s.id === selectedComponent);
        const compDef = registeredComponents.find(
          c =>
            c.objectKey === comp.component.name ||
            c.name === comp.component.name
        );
        const compConfig = config[comp.id] || {};
        return (
          <div className="config">
            <h2>Config</h2>
            {compDef.config.map(c => {
              const val = compConfig[c.id];
              if (c.component) {
                return (
                  <div key={c.id}>
                    <label>{c.title}</label>
                    <c.component
                      {...c.props}
                      value={val}
                      onChange={value => setConfig(comp.id, c.id, value)}
                    />
                  </div>
                );
              }
              const inputProps = {
                [c.props.type === "checkbox" ? "checked" : "value"]: val
              };
              return (
                <div key={c.id}>
                  <label>
                    {c.title}
                    <div>
                      <input
                        {...c.props}
                        {...inputProps}
                        onChange={e =>
                          setConfig(
                            comp.id,
                            c.id,
                            c.props.type === "checkbox"
                              ? e.target.checked
                              : e.target.value
                          )
                        }
                      />
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        );
      }}
    </DiagramContext.Consumer>
  );
};

export default Config;
