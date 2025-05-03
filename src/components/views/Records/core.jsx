import React from "react";
import gql from "graphql-tag.macro";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery, useMutation} from "@apollo/client";
import {capitalCase} from "change-case";
import {DateTime} from "luxon";
import {Button, ButtonGroup} from "reactstrap";
import "./style.scss";
import useFlightLocalStorage from "helpers/hooks/useFlightLocalStorage";

const fragment = gql`
  fragment RecordDataCore on RecordSnippet {
    id
    name
    type
    launched
    visible
    records {
      id
      contents
      timestamp
      category
      modified
    }
  }
`;

export const RECORDS_CORE_QUERY = gql`
  query Records($simulatorId: ID!) {
    recordSnippets(simulatorId: $simulatorId, visible: true) {
      ...RecordDataCore
    }
  }
  ${fragment}
`;
export const RECORDS_CORE_SUB = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    recordSnippetsUpdate(simulatorId: $simulatorId, visible: true) {
      ...RecordDataCore
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

const GENERATE_RECORDS = gql`
  mutation Generate($simulatorId: ID!, $name: String!) {
    recordsGenerateRecords(simulatorId: $simulatorId, name: $name) {
      id
    }
  }
`;

const SHOW_RECORDS = gql`
  mutation Show($simulatorId: ID!, $snippetId: ID!) {
    recordsShowSnippet(simulatorId: $simulatorId, snippetId: $snippetId) {
      id
    }
  }
`;
const HIDE_RECORDS = gql`
  mutation Show($simulatorId: ID!, $snippetId: ID!) {
    recordsHideSnippet(simulatorId: $simulatorId, snippetId: $snippetId) {
      id
    }
  }
`;

const RecordsCore = ({recordSnippets, simulator, flight: {id: flightId}}) => {
  const [intExt, setIntExt] = useFlightLocalStorage(
    flightId,
    "selected-records-intExt",
    `internal`,
  );
  const [selected, setSelected] = useFlightLocalStorage(
    flightId,
    "selected-records-snippet",
    `current-${simulator.id}`,
  );
  const selectedSnippet = recordSnippets.find(s => s.id === selected);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [createRecord] = useMutation(CREATE_RECORD);
  const [deleteRecord] = useMutation(DELETE_RECORD, {
    variables: {simulatorId: simulator.id, recordId: selectedRecord},
  });
  const [generateSnippet] = useMutation(GENERATE_RECORDS);
  const [showSnippet] = useMutation(SHOW_RECORDS, {
    variables: {simulatorId: simulator.id, snippetId: selectedSnippet?.id},
  });
  const [hideSnippet] = useMutation(HIDE_RECORDS, {
    variables: {simulatorId: simulator.id, snippetId: selectedSnippet?.id},
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
      <ButtonGroup>
        <Button
          size="sm"
          color="primary"
          active={intExt === "internal"}
          onClick={() => {
            setIntExt("internal");
            setSelected(`current-${simulator.id}`);
            setSelectedRecord(null);
          }}
        >
          Ship Records
        </Button>
        <Button
          size="sm"
          active={intExt === "external"}
          onClick={() => {
            setIntExt("external");
            setSelected(
              recordSnippets.filter(s => s.type === "external")[0]?.id,
            );
            setSelectedRecord(null);
          }}
        >
          External Records
        </Button>
      </ButtonGroup>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {recordSnippets
          .filter(
            s =>
              (s.type === "normal" && intExt === "internal") ||
              (s.type === "external" && intExt === "external"),
          )
          .map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
      </select>
      {intExt === "external" && (
        <label>
          Visible to crew:{" "}
          <input
            type="checkbox"
            checked={selectedSnippet?.visible}
            onClick={e => {
              if (e.target.checked) {
                showSnippet();
              } else {
                hideSnippet();
              }
            }}
          />
        </label>
      )}
      <div className="record-list">
        {selectedSnippet?.records
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
              - {capitalCase(r.category)}: {r.contents}
            </p>
          ))}
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
        {intExt === "external" && (
          <Button
            color="success"
            size="sm"
            onClick={() => {
              const name = window.prompt(
                'What is the name of the external snippet? (eg. "USS Paxton Ship Logs" or "USS Seward Records Log")',
              );
              if (!name) return;
              generateSnippet({
                variables: {simulatorId: simulator.id, name},
              }).then(res => {
                const id = res?.data?.recordsGenerateRecords?.id;
                setSelected(id);
              });
            }}
          >
            Generate External Snippet
          </Button>
        )}
      </div>
    </div>
  );
};
const RecordsCoreData = props => {
  const {simulator} = props;
  const {loading, data = {}, subscribeToMore} = useQuery(RECORDS_CORE_QUERY, {
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
  useSubscribeToMore(subscribeToMore, RECORDS_CORE_SUB, subConfig);
  if (loading || !data) return null;
  const {recordSnippets} = data;
  return <RecordsCore {...props} recordSnippets={recordSnippets} />;
};

export default RecordsCoreData;
