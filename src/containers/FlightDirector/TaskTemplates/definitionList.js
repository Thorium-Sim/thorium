/** @jsx jsx*/
import {css, jsx} from "@emotion/core";
import React from "react";
import {Badge} from "helpers/reactstrap";
import SearchableList from "helpers/SearchableList";

const DefinitionList = ({
  taskDefinitions,
  selectedDef,
  setSelectedDef,
  taskTemplates,
}) => {
  const definitionGroups = taskDefinitions
    .concat()
    .sort((a, b) => {
      if (a.class > b.class) return 1;
      if (a.class < b.class) return -1;
      return 0;
    })
    .reduce((prev, n) => {
      prev[n.class] = prev[n.class] ? prev[n.class].concat(n) : [n];
      return prev;
    }, {});
  return (
    <React.Fragment>
      <h3>Definitions</h3>
      <div
        css={css`
          height: 80vh;
        `}
      >
        <SearchableList
          items={Object.entries(definitionGroups).reduce(
            (prev, [key, next]) =>
              prev.concat(
                next.map(({name}) => ({id: name, label: name, category: key})),
              ),
            [],
          )}
          selectedItem={selectedDef}
          setSelectedItem={id => setSelectedDef(id)}
          renderItem={item => (
            <React.Fragment>
              {item.label}{" "}
              <Badge title="Templates Available">
                {taskTemplates.filter(t => t.definition === item.id).length}
              </Badge>
              {taskTemplates.filter(t => t.definition === item.id && t.assigned)
                .length > 0 && (
                <Badge color="warning" title="Templates Assigned">
                  {
                    taskTemplates.filter(
                      t => t.definition === item.id && t.assigned,
                    ).length
                  }
                </Badge>
              )}
            </React.Fragment>
          )}
        />
      </div>
    </React.Fragment>
  );
};
export default DefinitionList;
