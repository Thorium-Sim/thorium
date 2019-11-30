import React from "react";
import gql from "graphql-tag.macro";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import {Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import "./style.scss";
import {useMutation} from "react-apollo";

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

  const [addTemplate] = useMutation(ADD_TEMPLATE);
  const [removeTemplate] = useMutation(REMOVE_TEMPLATE, {
    variables: {id: selectedTemplate},
  });
  const [renameTemplate] = useMutation(RENAME_TEMPLATE);
  if (loading || !data) return "Loading...";
  const {recordTemplates} = data;

  const recordObj = recordTemplates.find(r => r.id === selectedTemplate);
  return (
    <Container className="records-container" fluid>
      <h3>Record Snippet Templates</h3>
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
    </Container>
  );
};

export default Records;
