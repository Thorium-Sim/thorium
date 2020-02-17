import React from "react";
import gql from "graphql-tag.macro";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/client";
import {Duration} from "luxon";

const fragment = gql`
  fragment TaskData on Task {
    id
    instructions
    verified
    dismissed
    values
    definition
    verifyRequested
    timeElapsedInMS
    station
  }
`;

const QUERY = gql`
  query Tasks($simulatorId: ID!, $station: String) {
    tasks(simulatorId: $simulatorId, station: $station) {
      ...TaskData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription TasksUpdate($simulatorId: ID!, $station: String) {
    tasksUpdate(simulatorId: $simulatorId, station: $station) {
      ...TaskData
    }
  }
  ${fragment}
`;

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

const TasksData = props => {
  const {loading, data, subscribeToMore} = useQuery(QUERY, {
    variables: {
      simulatorId: props.simulator.id,
    },
  });
  const config = React.useMemo(
    () => ({
      variables: {
        simulatorId: props.simulator.id,
      },
      updateQuery: (previousResult, {subscriptionData}) => {
        return Object.assign({}, previousResult, {
          tasks: subscriptionData.data.tasksUpdate,
        });
      },
    }),
    [props.simulator.id],
  );
  useSubscribeToMore(subscribeToMore, SUBSCRIPTION, config);
  if (loading || !data) return null;
  const {tasks} = data;
  const crewTasks = Object.entries(
    tasks
      .filter(t => !t.verified)
      .reduce((acc, t) => {
        acc[t.station] = acc[t.station] ? acc[t.station].concat(t) : [t];
        return acc;
      }, {}),
  )
    .map(([station, tasks]) => [
      station,
      tasks.filter(t => !t.verified).sort(tasksSort),
    ])
    .filter(([_, tasks]) => tasks.length > 0)
    .filter((_, i) => i < 7)
    .sort((a, b) => {
      if (a[1].timeElapsedInMS > b[1].timeElapsedInMS) return -1;
      if (a[1].timeElapsedInMS < b[1].timeElapsedInMS) return 1;
      return 0;
    });
  return (
    <div style={{marginTop: "10vh"}}>
      <h1 style={{textAlign: "center", fontSize: "3em"}}>Tasks</h1>
      <div
        style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}
      >
        {crewTasks.map(([station, tasks]) => (
          <div
            style={{
              margin: "30px",
              padding: "20px",
              width: "25%",
              backgroundColor: "rgba(128,128,128,0.2)",
              border: `solid 1px rgba(255,255,255,0.5)`,
              borderRadius: "10px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                borderBottom: `solid 1px rgba(255,255,255,0.5)`,
              }}
            >
              {station}
            </h2>
            {tasks
              .filter((_, i) => i < 2)
              .map(({values, definition, timeElapsedInMS}) => (
                <div style={{margin: "30px"}}>
                  <h3>{values.name || definition}</h3>
                  <h4
                    style={{
                      color: `hsl(${timeHue(timeElapsedInMS)},100%,50%)`,
                    }}
                  >
                    Time Elapsed: {getElapsed(timeElapsedInMS)}
                  </h4>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TasksData;
