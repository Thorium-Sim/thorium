import React from "react";
import {Button, Badge, Progress} from "helpers/reactstrap";
import {useMutation, useSubscription, useQuery} from "react-apollo";
import gql from "graphql-tag.macro";
import {
  ADVANCED_TRAINING_PROGRESS_SUB,
  FD_ADVANCE_CHAPTER,
  FD_COMPLETE_SUBCHAPTER,
  FD_RESET_PROGRESS,
} from "components/training/queries";
import {getCardLabel} from "components/training/actionRegistry";
import "./core.scss";

const CLIENTS_FOR_SIM_QUERY = gql`
  query AdvancedTrainingCoreClients($simulatorId: ID!) {
    clients(simulatorId: $simulatorId) {
      id
      label
      connected
      station {
        name
      }
    }
  }
`;

const CLIENTS_SUB = gql`
  subscription AdvancedTrainingCoreClientsSub($simulatorId: ID!) {
    clientChanged(simulatorId: $simulatorId) {
      id
      label
      connected
      station {
        name
      }
    }
  }
`;

const SIM_STATIONS_QUERY = gql`
  query AdvancedTrainingCoreStations($simulatorId: ID!) {
    simulators(id: $simulatorId) {
      id
      stationSets {
        id
        stations {
          name
          advancedTraining {
            enabled
            chapters {
              id
              name
              cardComponent
              subChapters {
                id
                name
                requiredActions {
                  id
                  eventName
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface AdvancedTrainingCoreProps {
  simulator: {id: string};
}

const AdvancedTrainingCore: React.FC<AdvancedTrainingCoreProps> = ({
  simulator,
}) => {
  const {data: clientsData} = useQuery(CLIENTS_FOR_SIM_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  useSubscription(CLIENTS_SUB, {
    variables: {simulatorId: simulator.id},
  });

  const {data: simData} = useQuery(SIM_STATIONS_QUERY, {
    variables: {simulatorId: simulator.id},
  });

  const {data: progressData} = useSubscription(ADVANCED_TRAINING_PROGRESS_SUB, {
    variables: {simulatorId: simulator.id},
  });

  const [advanceChapter] = useMutation(FD_ADVANCE_CHAPTER);
  const [completeSubChapter] = useMutation(FD_COMPLETE_SUBCHAPTER);
  const [resetProgress] = useMutation(FD_RESET_PROGRESS);

  const progressList =
    progressData?.advancedTrainingProgressUpdate || [];
  const clients = clientsData?.clients || [];
  const sim = simData?.simulators?.[0];

  const getStationConfig = (stationName: string) => {
    if (!sim) return null;
    for (const ss of sim.stationSets || []) {
      const station = ss.stations?.find((s: any) => s.name === stationName);
      if (station?.advancedTraining?.enabled) {
        return station.advancedTraining;
      }
    }
    return null;
  };

  const trainingClients = clients.filter((client: any) => {
    if (!client.connected || !client.station) return false;
    return progressList.some((p: any) => p.clientId === client.id);
  });

  if (trainingClients.length === 0) {
    return (
      <div className="advanced-training-core">
        <p className="no-clients-msg">No crew in advanced training.</p>
      </div>
    );
  }

  return (
    <div className="advanced-training-core">
      {trainingClients.map((client: any) => {
        const progress = progressList.find(
          (p: any) => p.clientId === client.id,
        );
        const stationName =
          client.station?.name || client.station || "";
        const config = getStationConfig(stationName);
        if (!progress || !config) return null;

        const chapters = config.chapters || [];
        const activeChapter = chapters.find(
          (c: any) => c.id === progress.activeChapterId,
        );

        const totalSub = chapters.reduce(
          (sum: number, ch: any) => sum + (ch.subChapters?.length || 0),
          0,
        );
        const completedSub =
          progress.completedSubChapterIds?.length || 0;
        const pct = totalSub > 0 ? Math.round((completedSub / totalSub) * 100) : 0;

        return (
          <div key={client.id} className="client-block">
            <div className="client-header-row">
              <span className="client-name">
                {client.label || client.id}
              </span>
              <span className="client-station-name">{stationName}</span>
              <Badge color={pct === 100 ? "success" : "info"} pill>
                {pct}%
              </Badge>
            </div>

            <Progress
              value={pct}
              color={pct === 100 ? "success" : "info"}
              style={{height: "4px", marginBottom: "4px"}}
            />

            {activeChapter && (
              <div className="active-info">
                Active: <strong>{activeChapter.name}</strong>
                <span className="card-label">
                  {getCardLabel(activeChapter.cardComponent)}
                </span>
              </div>
            )}

            <div className="chapters-compact">
              {chapters.map((ch: any, idx: number) => {
                const isCompleted =
                  progress.completedChapterIds?.includes(ch.id);
                const isActive = progress.activeChapterId === ch.id;
                const chSubCount = ch.subChapters?.length || 0;
                const chCompleted =
                  ch.subChapters?.filter((sc: any) =>
                    progress.completedSubChapterIds?.includes(sc.id),
                  ).length || 0;

                return (
                  <div
                    key={ch.id}
                    className={`ch-row ${isActive ? "active" : ""} ${
                      isCompleted ? "completed" : ""
                    }`}
                  >
                    <span className="ch-idx">{idx + 1}</span>
                    <span className="ch-name">{ch.name}</span>
                    <span className="ch-prog">
                      {chCompleted}/{chSubCount}
                    </span>
                    {!isActive && !isCompleted && (
                      <Button
                        size="sm"
                        color="info"
                        outline
                        className="ch-btn"
                        onClick={() =>
                          advanceChapter({
                            variables: {
                              clientId: client.id,
                              chapterId: ch.id,
                            },
                          })
                        }
                      >
                        Go
                      </Button>
                    )}

                    {isActive &&
                      ch.subChapters?.map((sc: any) => {
                        const scDone =
                          progress.completedSubChapterIds?.includes(sc.id);
                        return (
                          <div
                            key={sc.id}
                            className={`sc-row ${scDone ? "done" : ""}`}
                          >
                            <span className="sc-check">
                              {scDone ? "\u2713" : "\u25CB"}
                            </span>
                            <span className="sc-name">{sc.name}</span>
                            {!scDone && (
                              <Button
                                size="sm"
                                color="success"
                                outline
                                className="sc-btn"
                                onClick={() =>
                                  completeSubChapter({
                                    variables: {
                                      clientId: client.id,
                                      subChapterId: sc.id,
                                    },
                                  })
                                }
                              >
                                Done
                              </Button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>

            <div className="actions-row">
              <Button
                size="sm"
                color="warning"
                outline
                onClick={() =>
                  resetProgress({variables: {clientId: client.id}})
                }
              >
                Reset
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdvancedTrainingCore;
