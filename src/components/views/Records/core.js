import React from "react";
import gql from "graphql-tag.macro";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {titleCase} from "change-case";
import {DateTime} from "luxon";
import {Button} from "reactstrap";
import "./style.scss";

const fragment = gql`
  fragment RecordData on RecordSnippet {
    id
    name
    type
    launched
    records {
      id
      contents
      timestamp
      category
      modified
    }
  }
`;

const QUERY = gql`
  query Records($simulatorId: ID!) {
    recordSnippets(simulatorId: $simulatorId) {
      ...RecordData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    recordSnippetsUpdate(simulatorId: $simulatorId) {
      ...RecordData
    }
  }
  ${fragment}
`;

const CREATE_RECORD = gql`
  mutation CreateRecord(
    $simulatorId: ID!
    $contents: String!
    $category: String!
  ) {
    recordsCreate(
      simulatorId: $simulatorId
      contents: $contents
      category: $category
    )
  }
`;

const DELETE_RECORD = gql`
  mutation DeleteRecord($simulatorId: ID!, $recordId: ID!) {
    recordsDeleteRecord(simulatorId: $simulatorId, recordId: $recordId)
  }
`;

const RecordsCore = ({recordSnippets, simulator}) => {
  const [selected, setSelected] = React.useState(`current-${simulator.id}`);
  const selectedSnippet = recordSnippets.find(s => s.id === selected);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [createRecord] = useMutation(CREATE_RECORD);
  const [deleteRecord] = useMutation(DELETE_RECORD, {
    variables: {simulatorId: simulator.id, recordId: selectedRecord},
  });

  function addRecord(e) {
    let category = e.target.value;
    if (category === "add") {
      category = window.prompt("What is the name of the new category?");
      if (!category) return;
    }
    const contents = window.prompt(
      'What is the record contents. The category will automatically be included. Ex. "Docking clamps detached"',
    );
    createRecord({
      variables: {category, contents, simulatorId: simulator.id},
    });
  }

  return (
    <div className="records-core">
      <div className="records">
        <select value={selected} onChange={e => setSelected(e.target.value)}>
          {recordSnippets.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="record-list">
          {selectedSnippet.records
            .concat()
            .sort((a, b) => {
              if (a.timestamp > b.timestamp) return -1;
              if (a.timestamp < b.timestamp) return 1;
              return 0;
            })
            .map(r => (
              <p
                key={r.id}
                className={selectedRecord === r.id ? "selected" : ""}
                onClick={() => setSelectedRecord(r.id)}
              >
                {new DateTime.fromISO(r.timestamp).toLocaleString(
                  DateTime.TIME_SIMPLE,
                )}{" "}
                - {titleCase(r.category)}: {r.contents}
              </p>
            ))}
        </div>
      </div>
      <div className="actions">
        <select
          className="btn btn-block btn-sm btn-info"
          value="nothing"
          onChange={addRecord}
        >
          <option value="nothing" disabled>
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
        <Button
          color="danger"
          block
          size="sm"
          disabled={!selectedRecord}
          onClick={() => deleteRecord().then(() => setSelectedRecord(null))}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
const RecordsCoreData = props => {
  const {simulator} = props;
  const {loading, data = {}, subscribeToMore} = useQuery(QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const subConfig = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        recordSnippets: subscriptionData.data.recordSnippetsUpdate,
      }),
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, SUBSCRIPTION, subConfig);
  const {recordSnippets} = data;
  if (loading || !recordSnippets) return null;
  return <RecordsCore {...props} recordSnippets={recordSnippets} />;
};

export default RecordsCoreData;
