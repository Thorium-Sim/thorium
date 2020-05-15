import React, {Fragment} from "react";
import {ListGroup, ListGroupItem} from "helpers/reactstrap";
import {TaskTemplate} from "generated/graphql";
import {useNavigate, useParams, useMatch} from "react-router-dom";

const TemplateList: React.FC<{taskTemplates: TaskTemplate[]}> = ({
  taskTemplates,
}) => {
  const {selectedDef: unparsedDef} = useParams();
  const match = useMatch(
    "/config/tasks/taskTemplates/:selectedDef/:selectedTemplate",
  );
  const selectedDef = decodeURI(unparsedDef || "nothing");
  const selectedTemplate = match?.params.selectedTemplate;
  const navigate = useNavigate();
  return (
    <Fragment>
      <h3>Templates</h3>

      <ListGroup style={{flex: 1, overflowY: "auto", maxHeight: "70vh"}}>
        {taskTemplates
          .filter(t => t.definition === selectedDef)
          .sort((a, b) => {
            if ((a?.name || "") > (b?.name || "")) return 1;
            if ((a?.name || "") < (b?.name || "")) return -1;
            return 0;
          })
          .map(t => (
            <ListGroupItem
              key={t.id || ""}
              onClick={() => navigate(t.id)}
              active={t.id === selectedTemplate}
            >
              {t.name}
            </ListGroupItem>
          ))}
      </ListGroup>
    </Fragment>
  );
};
export default TemplateList;
