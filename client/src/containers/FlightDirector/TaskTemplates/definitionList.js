import React, { Fragment } from "react";
import { ListGroupItem, ListGroup, Badge } from "helpers/reactstrap";

const DefinitionList = ({
  taskDefinitions,
  selectedDef,
  setSelectedDef,
  taskTemplates
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
    <Fragment>
      <h3>Definitions</h3>
      <ListGroup
        style={{ maxHeight: "100%", height: "80vh", overflowY: "auto" }}
      >
        {Object.entries(definitionGroups).map(([key, value]) => (
          <Fragment key={key}>
            <ListGroupItem
              style={{
                paddingBottom: 0,
                paddingLeft: "10px",
                borderTop: "rgba(255,255,255,0.5) solid 1px"
              }}
            >
              <strong>{key}</strong>
            </ListGroupItem>
            {value.map(v => (
              <ListGroupItem
                key={v.name}
                active={v.name === selectedDef}
                onClick={() => setSelectedDef(v.name)}
              >
                {v.name}{" "}
                <Badge title="Templates Available">
                  {taskTemplates.filter(t => t.definition === v.name).length}
                </Badge>
                {taskTemplates.filter(
                  t => t.definition === v.name && t.assigned
                ).length > 0 && (
                  <Badge color="warning" title="Templates Assigned">
                    {
                      taskTemplates.filter(
                        t => t.definition === v.name && t.assigned
                      ).length
                    }
                  </Badge>
                )}
              </ListGroupItem>
            ))}
          </Fragment>
        ))}
      </ListGroup>
    </Fragment>
  );
};
export default DefinitionList;
