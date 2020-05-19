import React from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  Button,
} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {FormattedMessage} from "react-intl";
import {Duration} from "luxon";
import {FaSyncAlt} from "react-icons/fa";

function timeHue(time) {
  const redTime = 1000 * 60 * 20; // 20 minutes
  const calcTime = Math.min(redTime, time);
  const hue = (Math.abs(redTime - calcTime) / redTime) * 120;

  return Math.round(hue);
}
function getElapsed(time) {
  return Object.entries(
    Duration.fromObject({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: Math.round(time),
    })
      .normalize()
      .toObject(),
  )
    .filter(t => t[0] !== "milliseconds")
    .map(t => t[1].toString().padStart(2, 0))
    .join(":");
}

const tasksSort = (a, b) => {
  if (a.verified > b.verified) return 1;
  if (b.verified > a.verified) return -1;
  if (a.timeElapsedInMS < b.timeElapsedInMS) return 1;
  if (a.timeElapsedInMS > b.timeElapsedInMS) return -1;
  return 0;
};

const TaskItem = ({
  verifyRequested,
  verified,
  values,
  definition,
  timeElapsedInMS,
  instructions,
  selected,
  setSelectedTask,
}) => (
  <ListGroupItem active={selected} onClick={setSelectedTask}>
    <div>
      <strong
        className={`${verifyRequested ? "text-info" : ""} ${
          verified ? "text-success" : ""
        }`}
      >
        {values.name || definition}
      </strong>{" "}
      {verifyRequested && <FaSyncAlt className="fa-spin" />}
    </div>
    <div
      style={{
        color: `hsl(${timeHue(timeElapsedInMS)},100%,50%)`,
      }}
    >
      Time Elapsed:{getElapsed(timeElapsedInMS)}
    </div>
    <div className="truncated-instructions">{instructions}</div>
  </ListGroupItem>
);

const Tasks = ({tasks, station: {name: stationName, executive}}) => {
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [showDismissed, setShowDismissed] = React.useState(false);
  const myTasks = tasks
    .concat()
    .filter(t => {
      if (t.station !== stationName) return false;
      if (!showDismissed && t.verified) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.verified > b.verified) return 1;
      if (a.verified < b.verified) return -1;
      if (a.timeElapsedInMS > b.timeElapsedInMS) return -1;
      if (a.timeElapsedInMS < b.timeElapsedInMS) return 1;
      return 0;
    });

  const crewTasks = Object.entries(
    tasks
      .filter(t => t.station !== stationName)
      .reduce((acc, t) => {
        acc[t.station] = acc[t.station] ? acc[t.station].concat(t) : [t];
        return acc;
      }, {}),
  )
    .map(([station, tasks]) => [
      station,
      tasks.filter(t => !t.verified).sort(tasksSort),
    ])
    .filter(([station, tasks]) => tasks.length > 0)
    .sort((a, b) => {
      if (a[1].verified > b[1].verified) return 1;
      if (a[1].verified < b[1].verified) return -1;
      if (a[1].timeElapsedInMS > b[1].timeElapsedInMS) return -1;
      if (a[1].timeElapsedInMS < b[1].timeElapsedInMS) return 1;
      return 0;
    });
  const task = tasks.find(t => t.id === selectedTask);
  return (
    <Container className="card-tasks">
      <Row>
        <Col sm={4}>
          <h3>
            <FormattedMessage id="tasks-list" defaultMessage="Tasks List" />
          </h3>
          <ListGroup>
            {executive && (
              <ListGroupItem
                style={{
                  borderBottom: `solid 2px rgba(255,255,255,0.5)`,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <strong>My Tasks</strong>
              </ListGroupItem>
            )}
            {myTasks.length === 0 ? (
              <ListGroupItem>No Tasks</ListGroupItem>
            ) : (
              myTasks.map(t => (
                <TaskItem
                  key={t.id}
                  {...t}
                  selected={selectedTask === t.id}
                  setSelectedTask={() => setSelectedTask(t.id)}
                />
              ))
            )}
            {executive && (
              <>
                <ListGroupItem
                  style={{
                    borderTop: `solid 2px rgba(255,255,255,0.5)`,
                    borderBottom: `solid 2px rgba(255,255,255,0.5)`,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                >
                  <strong>Crew Tasks</strong>
                </ListGroupItem>

                {crewTasks.length === 0 ? (
                  <ListGroupItem>No Tasks</ListGroupItem>
                ) : (
                  crewTasks.map(([station, tasks]) => (
                    <>
                      <ListGroupItem
                        style={{
                          borderTop: `solid 2px rgba(255,255,255,0.5)`,
                          borderBottom: `solid 1px rgba(255,255,255,0.1)`,
                        }}
                      >
                        {station}
                      </ListGroupItem>
                      {tasks.map(t => (
                        <TaskItem
                          key={t.id}
                          {...t}
                          instructions={""}
                          setSelectedTask={() => {}}
                        />
                      ))}
                    </>
                  ))
                )}
              </>
            )}
          </ListGroup>
          {showDismissed ? (
            <Button block onClick={() => setShowDismissed(false)}>
              Hide Completed
            </Button>
          ) : (
            <Button block onClick={() => setShowDismissed(true)}>
              Show Completed
            </Button>
          )}
        </Col>
        <Col sm={8} style={{display: "flex", flexDirection: "column"}}>
          <h3>
            <FormattedMessage
              id="tasks-instructions"
              defaultMessage="Task Instructions"
            />
          </h3>
          <Card>
            <CardBody style={{whiteSpace: "pre-line"}}>
              {task && task.instructions}
            </CardBody>
          </Card>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Mutation
              mutation={gql`
                mutation RequestVerify($id: ID!) {
                  requestTaskVerify(id: $id)
                }
              `}
              variables={{id: task && task.id}}
            >
              {action => (
                <Button
                  size="lg"
                  color="success"
                  disabled={
                    !task || (task && (task.verifyRequested || task.verified))
                  }
                  onClick={action}
                >
                  {task ? (
                    task.verifyRequested ? (
                      <FormattedMessage
                        id="tasks-verify-in-progress"
                        defaultMessage="Verification In Progress..."
                      />
                    ) : task.verified ? (
                      <FormattedMessage
                        id="tasks-completed"
                        defaultMessage="Task Completed"
                      />
                    ) : (
                      <FormattedMessage
                        id="tasks-verify-button"
                        defaultMessage="Verify Task Completion"
                      />
                    )
                  ) : (
                    <FormattedMessage
                      id="tasks-verify-button"
                      defaultMessage="Verify Task Completion"
                    />
                  )}
                </Button>
              )}
            </Mutation>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
