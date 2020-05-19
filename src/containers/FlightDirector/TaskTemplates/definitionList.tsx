import React from "react";
import {css} from "@emotion/core";
import {Badge} from "helpers/reactstrap";
import SearchableList from "helpers/SearchableList";
import {
  TaskDefinition,
  TaskTemplate,
  useTaskDefinitionsQuery,
} from "generated/graphql";
import {useNavigate, useMatch} from "react-router-dom";

const DefinitionList: React.FC<{
  taskTemplates: TaskTemplate[];
}> = ({taskTemplates}) => {
  const {data: definitionsData} = useTaskDefinitionsQuery();
  const match = useMatch("/config/tasks/taskTemplates/:selectedDef/*");
  const unparsedDef = match?.params?.selectedDef;
  const selectedDef = decodeURI(unparsedDef || "nothing");

  const taskDefinitions = definitionsData?.taskDefinitions || [];
  const navigate = useNavigate();
  const definitionGroups = taskDefinitions
    .concat()
    .sort((a, b) => {
      if (a.class > b.class) return 1;
      if (a.class < b.class) return -1;
      return 0;
    })
    .reduce((prev: {[key: string]: TaskDefinition[]}, n) => {
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
            (
              prev: {id: string; label: string; category: string}[],
              [key, next],
            ) =>
              prev.concat(
                next.map(({name}) => ({id: name, label: name, category: key})),
              ),
            [],
          )}
          selectedItem={selectedDef}
          setSelectedItem={id => typeof id === "string" && navigate(id)}
          renderItem={item => (
            <React.Fragment>
              {item.label}{" "}
              <Badge title="Templates Available">
                {taskTemplates.filter(t => t.definition === item.id).length}
              </Badge>
              {taskTemplates.filter(t => t.definition === item.id).length >
                0 && (
                <Badge color="warning" title="Templates Assigned">
                  {taskTemplates.filter(t => t.definition === item.id).length}
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
