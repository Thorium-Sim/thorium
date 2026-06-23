import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  Badge,
} from "helpers/reactstrap";
import {useQuery, useMutation, useSubscription} from "react-apollo";
import gql from "graphql-tag.macro";
import {
  ADVANCED_TRAINING_PROGRESS_SUB,
  FD_ADVANCE_CHAPTER,
  FD_COMPLETE_SUBCHAPTER,
  FD_RESET_PROGRESS,
} from "components/training/queries";
import {getActionLabel, getCardLabel} from "components/training/actionRegistry";
import "./AdvancedTrainingDashboard.scss";

const CLIENTS_QUERY = gql`
  query AdvancedTrainingClients {
    clients(all: true) {
      id
      label
      connected
      simulatorId
      station
      training
      simulator {
        id
        name
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
  }
`;

const CLIENTS_SUB = gql`
  subscription AdvancedTrainingClientsSub {
    clientChanged {
      id
      label
      connected
      simulatorId
      station
      training
    }
  }
`;

const AdvancedTrainingDashboard: React.FC = () => {
  const {data: clientsData} = useQuery(CLIENTS_QUERY, {
    fetchPolicy: "network-only",
  });
  useSubscription(CLIENTS_SUB);

  const {data: progressData} = useSubscription(ADVANCED_TRAINING_PROGRESS_SUB, {
    variables: {},
  });

  const [advanceChapter] = useMutation(FD_ADVANCE_CHAPTER);
  const [completeSubChapter] = useMutation(FD_COMPLETE_SUBCHAPTER);
  const [resetProgress] = useMutation(FD_RESET_PROGRESS);

  const progressList = progressData?.advancedTrainingProgressUpdate || [];

  const clients = clientsData?.clients || [];

  // Find clients that have advanced training configured
  const trainingClients = clients.filter((client: any) => {
    if (!client.connected || !client.station || !client.simulatorId) {
      return false;
    }
    const progress = progressList.find((p: any) => p.clientId === client.id);
    return !!progress;
  });

  const getClientConfig = (client: any) => {
    const sim = client.simulator;
    if (!sim) {
      return null;
    }
    for (const ss of sim.stationSets || []) {
      const station = ss.stations?.find((s: any) => s.name === client.station);
      if (station?.advancedTraining?.enabled) {
        return station.advancedTraining;
      }
    }
    return null;
  };

  return (
    <Container className="advanced-training-dashboard" fluid>
      <h4 className="dashboard-title">Advanced Training Dashboard</h4>

      {trainingClients.length === 0 && (
        <div className="no-clients">
          <p>No crew members are currently in advanced training.</p>
          <small style={{color: "#78909c"}}>
            Crew members can start advanced training from their login screen
            when it is configured for their station.
          </small>
        </div>
      )}

      <Row>
        {trainingClients.map((client: any) => {
          const progress = progressList.find(
            (p: any) => p.clientId === client.id,
          );
          const config = getClientConfig(client);
          if (!progress || !config) {
            return null;
          }

          const chapters = config.chapters || [];
          const activeChapter = chapters.find(
            (c: any) => c.id === progress.activeChapterId,
          );

          const totalSubChapters = chapters.reduce(
            (sum: number, ch: any) => sum + (ch.subChapters?.length || 0),
            0,
          );
          const completedSubChapters =
            progress.completedSubChapterIds?.length || 0;
          const overallPercent =
            totalSubChapters > 0
              ? Math.round((completedSubChapters / totalSubChapters) * 100)
              : 0;

          return (
            <Col key={client.id} lg={6} xl={4} style={{marginBottom: "16px"}}>
              <Card className="client-training-card">
                <CardHeader className="client-header">
                  <div className="client-info">
                    <span className="client-label">
                      {client.label || client.id}
                    </span>
                    <span className="client-station">{client.station}</span>
                  </div>
                  <Badge
                    color={overallPercent === 100 ? "success" : "info"}
                    pill
                  >
                    {overallPercent}%
                  </Badge>
                </CardHeader>
                <CardBody className="client-body">
                  {/* Overall progress */}
                  <div className="progress-section">
                    <small className="progress-label">
                      Overall: {completedSubChapters}/{totalSubChapters}{" "}
                      sub-tasks
                    </small>
                    <Progress
                      value={overallPercent}
                      color={overallPercent === 100 ? "success" : "info"}
                      style={{height: "6px"}}
                    />
                  </div>

                  {/* Active chapter */}
                  {activeChapter && (
                    <div className="active-chapter">
                      <small className="section-label">Active Chapter:</small>
                      <div className="chapter-name">{activeChapter.name}</div>
                      <div className="chapter-card">
                        {getCardLabel(activeChapter.cardComponent)}
                      </div>
                    </div>
                  )}

                  {/* Chapter list */}
                  <div className="chapter-list">
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
                          className={`chapter-row ${isActive ? "active" : ""} ${
                            isCompleted ? "completed" : ""
                          }`}
                        >
                          <span className="chapter-index">{idx + 1}</span>
                          <span className="chapter-name-text">{ch.name}</span>
                          <span className="chapter-progress-text">
                            {chCompleted}/{chSubCount}
                          </span>
                          {!isActive && !isCompleted && (
                            <Button
                              size="sm"
                              color="info"
                              outline
                              className="chapter-action-btn"
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

                          {/* Sub-chapters for active chapter */}
                          {isActive &&
                            ch.subChapters?.map((sc: any) => {
                              const scCompleted =
                                progress.completedSubChapterIds?.includes(
                                  sc.id,
                                );
                              return (
                                <div
                                  key={sc.id}
                                  className={`sub-chapter-row ${
                                    scCompleted ? "completed" : ""
                                  }`}
                                >
                                  <span className="sub-check">
                                    {scCompleted ? "\u2713" : "\u25CB"}
                                  </span>
                                  <span className="sub-name">{sc.name}</span>
                                  {!scCompleted && (
                                    <Button
                                      size="sm"
                                      color="success"
                                      outline
                                      className="sub-action-btn"
                                      onClick={() =>
                                        completeSubChapter({
                                          variables: {
                                            clientId: client.id,
                                            subChapterId: sc.id,
                                          },
                                        })
                                      }
                                    >
                                      Complete
                                    </Button>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="intervention-actions">
                    <Button
                      size="sm"
                      color="warning"
                      outline
                      onClick={() =>
                        resetProgress({
                          variables: {clientId: client.id},
                        })
                      }
                    >
                      Reset Progress
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AdvancedTrainingDashboard;
