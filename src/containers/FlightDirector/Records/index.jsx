import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import "./style.scss";
import {useMutation} from "react-apollo";
import {stardate} from "components/views/OfficerLog";

const fragment = gql`
  fragment RecordTemplate on RecordSnippet {
    id
    name
    templateRecords: records {
      id
      contents
      original
      timestamp
      category
      modified
    }
  }
`;

const QUERY = gql`
  query RecordTemplates {
    recordTemplates {
      ...RecordTemplate
    }
  }
  ${fragment}
`;

const SUBSCRIPTION = gql`
  subscription RecordTemplateSub {
    recordTemplatesUpdate {
      ...RecordTemplate
    }
  }
  ${fragment}
`;

const ADD_TEMPLATE = gql`
  mutation AddTemplate($name: String!) {
    recordTemplateCreateSnippet(name: $name)
  }
`;
const REMOVE_TEMPLATE = gql`
  mutation RemoveTemplate($id: ID!) {
    recordTemplateDeleteSnippet(snippetId: $id)
  }
`;
const RENAME_TEMPLATE = gql`
  mutation RemoveTemplate($id: ID!, $name: String!) {
    recordTemplateRename(snippetId: $id, name: $name)
  }
`;

const Records = () => {
  const {data, loading} = useQueryAndSubscription(
    {query: QUERY},
    {query: SUBSCRIPTION},
  );
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  const [addTemplate] = useMutation(ADD_TEMPLATE);
  const [removeTemplate] = useMutation(REMOVE_TEMPLATE, {
    variables: {id: selectedTemplate},
  });
  const [renameTemplate] = useMutation(RENAME_TEMPLATE);
  if (loading || !data) return <p>Loading...</p>;
  const {recordTemplates} = data;

  const templateObj = recordTemplates.find(r => r.id === selectedTemplate);
  const recordObj =
    templateObj && templateObj.records.find(r => r.id === selectedRecord);

  function updateRecord(id, values) {}
  return (
    <Container className="records-container" fluid>
      <h3>Record Snippet Templates</h3>
      <div className="records-row">
        <div className="records-list">
          <ListGroup>
            {recordTemplates.map(r => (
              <ListGroupItem
                key={r.id}
                active={r.id === selectedTemplate}
                onClick={() => setSelectedTemplate(r.id)}
              >
                {r.name}
              </ListGroupItem>
            ))}
          </ListGroup>
          <Button
            color="success"
            size="sm"
            block
            onClick={() => {
              const name = window.prompt(
                "What is the name of the new record template?",
              );
              if (!name) return;
              addTemplate({variables: {name}});
            }}
          >
            Add Record Template
          </Button>
          {selectedTemplate && (
            <>
              <Button
                color="danger"
                size="sm"
                block
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to remove this record template?",
                    )
                  ) {
                    removeTemplate();
                    setSelectedTemplate(null);
                  }
                }}
              >
                Remove Record Template
              </Button>
              <Button
                color="warning"
                size="sm"
                block
                onClick={() => {
                  const name = window.prompt(
                    "What is the new name of the interface?",
                    recordObj.name,
                  );
                  if (!name) return;
                  renameTemplate({
                    variables: {id: selectedTemplate, name},
                  });
                }}
              >
                Rename Record Template
              </Button>
            </>
          )}
        </div>
        <div className="records">
          {templateObj && (
            <>
              <h3>Records</h3>
              <ListGroup>
                {templateObj.records.map(r => (
                  <ListGroupItem
                    key={r.id}
                    active={r.id === selectedRecord}
                    onClick={() => setSelectedRecord(r.id)}
                  >
                    {r.category} - {stardate(r.timestamp)}
                  </ListGroupItem>
                ))}
              </ListGroup>
              <select className="btn btn-primary btn-block" value="first">
                <option value="first" disabled>
                  Create New...
                </option>
                <option value="nothing2" disabled>
                  Choose a category:
                </option>
                <option value="Engines">Engines</option>
                <option value="Navigation">Navigation</option>
                <option value="Weapons">Weapons</option>
                <option value="Systems">Systems</option>
                <option value="Probes">Probes</option>
                <option value="Shields">Shields</option>
                <option value="Docking">Docking</option>
                <option value="Alert Condition">Alert Condition</option>
                <option value="Transporters">Transporters</option>
                <option value="Generic">Generic</option>
                <option value="add">Create one...</option>
              </select>
            </>
          )}
        </div>
        <div className="records-config">
          {recordObj && (
            <>
              <h3>Config</h3>
              <div>
                <label>
                  Category
                  <select
                    className="btn btn-primary btn-block"
                    value={recordObj.category}
                    onChange={e =>
                      updateRecord(recordObj.id, {category: e.target.value})
                    }
                  >
                    <option value="Engines">Engines</option>
                    <option value="Navigation">Navigation</option>
                    <option value="Weapons">Weapons</option>
                    <option value="Systems">Systems</option>
                    <option value="Probes">Probes</option>
                    <option value="Shields">Shields</option>
                    <option value="Docking">Docking</option>
                    <option value="Alert Condition">Alert Condition</option>
                    <option value="Transporters">Transporters</option>
                    <option value="Generic">Generic</option>
                    <option value="add">Create one...</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Contents
                  <textarea
                    value={recordObj.contents}
                    onChange={e =>
                      updateRecord(recordObj.id, {contents: e.target.value})
                    }
                  ></textarea>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={recordObj.modified}
                    onChange={e =>
                      updateRecord(recordObj.id, {modified: e.target.checked})
                    }
                  />{" "}
                  Modified
                  <small>
                    Indicates if a record was modified. This can be detected by
                    the crew via slight discrepancies
                  </small>
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Records;
