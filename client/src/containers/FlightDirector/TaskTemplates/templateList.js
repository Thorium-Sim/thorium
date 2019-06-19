import React, { Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const TemplateList = ({
  taskTemplates,
  selectedDef,
  selectedTemplate,
  setSelectedTemplate
}) => (
  <Fragment>
    <h3>Templates</h3>

    <ListGroup style={{ flex: 1, overflowY: "auto", maxHeight: "70vh" }}>
      {taskTemplates
        .filter(t => t.definition === selectedDef)
        .map(t => (
          <ListGroupItem
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            active={t.id === selectedTemplate}
          >
            {t.name}
          </ListGroupItem>
        ))}
    </ListGroup>
  </Fragment>
);
export default TemplateList;
