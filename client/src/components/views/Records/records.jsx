import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  ButtonGroup,
} from "reactstrap";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {capitalCase} from "change-case";
import Tour from "helpers/tourHelper";
import {stardate} from "../OfficerLog";

const CREATE_RECORDS = gql`
  mutation CreateRecord($simulatorId: ID!, $name: String!, $recordIds: [ID!]!) {
    recordsCreateSnippet(
      simulatorId: $simulatorId
      name: $name
      recordIds: $recordIds
    )
  }
`;

const SEND_MESSAGE = gql`
  mutation SendLRMessage($id: ID, $message: String!, $sender: String) {
    sendLongRangeMessage(
      simulatorId: $id
      crew: false
      message: $message
      decoded: true
      sender: $sender
    )
  }
`;

const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "This screen allows you to view and audit the records of all the things happening on the ship at any time. You can use this to monitor the ship status or detect clandestine activities. ",
  },
  {
    selector: ".all-records",
    content:
      "This area shows the records in a list, as they come in. You can see the stardate timestamp which indicates when the record was generated, as well as record category and message. You can click on multiple records to select them.",
  },
  {
    selector: ".record-categories",
    content:
      "Click on these toggles to filter the record list by category. This can help you track down specific records.",
  },
  {
    selector: ".select-all-records",
    content: "Click this button to select all of the visible records.",
  },
  {
    selector: ".create-snippet",
    content:
      "Once you have selected several records, click this button to create a snippet of those records. This allows you to categorize records as you look for patterns.",
  },
  {
    selector: ".snippet-selector",
    content:
      "Click here to switch between all of your records and the snippets that you have assembled.",
  },
  {
    selector: ".send-message",
    content:
      "One you have selected several records, click this button to compose them into a long range message. The message can then be sent by the officer in charge of long range message transmission.",
  },
];

const RecordsList = ({
  selectedSnippet,
  recordSnippets,
  simulator,
  setSelected,
  recordFilter,
  selectedRecords,
  setSelectedRecords,
}) => {
  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle block caret className="snippet-selector">
          {selectedSnippet?.name || "None Selected"}
        </DropdownToggle>
        <DropdownMenu style={{maxHeight: "200px", overflowY: "scroll"}}>
          {recordSnippets
            .concat()
            .sort((a, b) => {
              if (a.id === `current-${simulator.id}`) return -1;
              if (b.id === `current-${simulator.id}`) return 1;
              return 0;
            })
            .map(r => (
              <DropdownItem key={r.id} onClick={() => setSelected(r.id)}>
                {r.name}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
      <ListGroup className="all-records">
        {selectedSnippet?.records
          .concat()
          .filter(r => !recordFilter.includes(r.category))
          .sort((a, b) => {
            if (a.timestamp > b.timestamp) return -1;
            if (a.timestamp < b.timestamp) return 1;
            return 0;
          })
          .map(r => (
            <ListGroupItem
              active={selectedRecords.includes(r.id)}
              onClick={() =>
                setSelectedRecords(records =>
                  records.includes(r.id)
                    ? records.filter(rr => rr !== r.id)
                    : records.concat(r.id),
                )
              }
            >
              Logged: {stardate(r.timestamp)}
              <br />
              <strong>{r.category}</strong>: {r.contents}
            </ListGroupItem>
          ))}
      </ListGroup>
    </>
  );
};
const Records = ({recordSnippets, simulator, station, clientObj}) => {
  const [intExt, setIntExt] = React.useState("internal");
  const [selected, setSelected] = React.useState(`current-${simulator.id}`);
  const selectedSnippet = recordSnippets.find(s => s.id === selected);
  const [selectedRecords, setSelectedRecords] = React.useState([]);
  const [name, setName] = React.useState("Untitled Snippet");
  const [naming, setNaming] = React.useState(false);
  const [destination, setDestination] = React.useState("");
  const current = recordSnippets.find(r => r.id === `current-${simulator.id}`);
  const filterOptions = current
    ? Object.keys(
        current.records.reduce((acc, r) => ({...acc, [r.category]: true}), {}),
      )
    : [];
  const [recordFilter, setRecordFilter] = React.useState([]);
  const [createRecord] = useMutation(CREATE_RECORDS);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  function toggleFilter(c) {
    setRecordFilter(f =>
      f.includes(c) ? f.filter(cc => cc !== c) : f.concat(c),
    );
  }
  return (
    <Container className="card-records">
      <Row className="main-container">
        <Col sm={3} className="record-category">
          <h3>Filter By Category</h3>
          <ListGroup className="record-categories">
            {filterOptions.map(c => (
              <ListGroupItem
                key={c}
                active={!recordFilter.includes(c)}
                onClick={() => toggleFilter(c)}
              >
                {capitalCase(c)}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col sm={5} className="record-list">
          {recordSnippets.filter(c => c.type === "external").length > 0 ? (
            <ButtonGroup>
              <Button
                active={intExt === "internal"}
                onClick={() => {
                  setIntExt("internal");
                  setSelected(`current-${simulator.id}`);
                  setSelectedRecords([]);
                }}
              >
                Ship Records
              </Button>
              <Button
                active={intExt === "external"}
                onClick={() => {
                  setIntExt("external");
                  setSelected(null);
                  setSelectedRecords([]);
                }}
              >
                External Records
              </Button>
            </ButtonGroup>
          ) : (
            <h3>Ship Records</h3>
          )}
          <RecordsList
            selectedSnippet={selectedSnippet}
            recordSnippets={recordSnippets.filter(
              c =>
                (c.type === "normal" && intExt === "internal") ||
                (c.type === "external" && intExt === "external"),
            )}
            simulator={simulator}
            setSelected={setSelected}
            recordFilter={recordFilter}
            selectedRecords={selectedRecords}
            setSelectedRecords={setSelectedRecords}
          />
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Row>
        {naming || destination ? (
          <>
            <Col sm={2}>{naming ? "Name" : "Destination"}:</Col>
            <Col sm={2}>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                block
              />
            </Col>
            <Col sm={2}>
              <Button
                color="success"
                block
                onClick={() => {
                  if (naming) {
                    return createRecord({
                      variables: {
                        simulatorId: simulator.id,
                        name: name,
                        recordIds: selectedRecords,
                      },
                    }).then(({data: {recordsCreateSnippet}}) => {
                      setSelected(recordsCreateSnippet);
                      setName("Untitled Snippet");
                      setNaming(false);
                      setSelectedRecords([]);
                    });
                  }
                  if (destination) {
                    setDestination(false);

                    return sendMessage({
                      variables: {
                        id: simulator.id,
                        sender: station.name,
                        message: `To: ${name}
Records Digest:

${selectedSnippet?.records
  .filter(r => selectedRecords.includes(r.id))
  .map(r => `Logged: ${stardate(r.timestamp)} - ${r.category}: ${r.contents}`)
  .join("\n")}`,
                      },
                    });
                  }
                }}
              >
                Save
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                color="danger"
                block
                onClick={() => {
                  setName("Untitled Snippet");
                  setNaming(false);
                  setDestination(false);
                }}
              >
                Cancel
              </Button>
            </Col>
          </>
        ) : (
          <>
            <Col sm={3}>
              {selected === `current-${simulator.id}` && (
                <Button
                  disabled={selectedRecords.length === 0}
                  block
                  className="create-snippet"
                  onClick={() => {
                    setNaming(true);
                    setName("Untitled Snippet");
                  }}
                >
                  Save As Snippet
                </Button>
              )}
            </Col>
            <Col sm={3}>
              <Button
                disabled={selectedRecords.length === 0}
                block
                className="send-message"
                onClick={() => {
                  setDestination(true);
                  setName("");
                }}
              >
                Send As Message
              </Button>
            </Col>
            <Col sm={2}>
              {selectedSnippet?.records.filter(
                r => !recordFilter.includes(r.category),
              ).length === selectedRecords.length ? (
                <Button
                  color="info"
                  block
                  className="select-all-records"
                  onClick={() => setSelectedRecords([])}
                >
                  Select None
                </Button>
              ) : (
                <Button
                  className="select-all-records"
                  color="info"
                  block
                  onClick={() =>
                    setSelectedRecords(
                      selectedSnippet?.records
                        .filter(r => !recordFilter.includes(r.category))
                        .map(r => r.id),
                    )
                  }
                >
                  Select All
                </Button>
              )}
            </Col>
          </>
        )}
      </Row>
      <Tour steps={trainingSteps} client={clientObj} />
    </Container>
  );
};
export default Records;
