import React from "react";
import {
  AdvancedNavigationAndAstrometrics,
  Simulator,
  useGetBasicFlightSetsQuery,
  useHandleAddFlightSetToNavigationMutation,
  useHandleEmergencyStopMutation,
  useHandleEngineFluxMutation,
  useHandleOverrideLocationMutation,
  useHandleApprovePathMutation,
  useHandleDenyPathMutation,
  useHandleResumePathMutation,
  useHandleSetExtraStartupDelayMutation,
  useHandleSetRequireApprovalMutation,
  useHandleSetCoolantLevelMutation,
  useHandleSetHeatLevelMutation,
  useHandleShowEtaMutation,
  useHandleShowFlightSetMutation,
  useHandleUpdateAdvNavFlightSetDataMutation,
  useHandleUpdateAdvNavFlightSetMutation,
  useHandleUpdateCurrentFlightPathMutation,
  useHandleUpdateCurrentFlightSetMutation,
  useHandleUpdateEtaMutation,
  useUpdateFlightSetMutation,
} from "generated/graphql";
import {Button, Container, Modal} from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {
  ADVANCED_NAV_AND_ASTROMETRICS_QUERY,
  ADVANCED_NAV_AND_ASTROMETRICS_SUB,
} from "./core-queries";
import {graphql, withApollo} from "react-apollo";
import {CoreAdvancedNavigation as CoreAdvancedNavigationModal} from "./components/CoreComponents/advanced-flight";
import parseAdvancedNavData from "./helpers/parseAdvancedNavData";
import {EngineStatus} from "./types";
import {
  FlightSet,
  NavigationRoute,
} from "containers/FlightDirector/FlightSets/types";
import "./styles.css";
import {RouteProgressMap} from "containers/FlightDirector/FlightSets/Map/RouteProgressMap";
import {FullCoordinate} from "containers/FlightDirector/FlightSets/Map/ImageCanvas";
import {formatSecondsToTime} from "containers/FlightDirector/FlightSets/Time";
import {InputField} from "components/generic/core";
import {StatusStrip} from "./components/CoreComponents/flight-summary/status-strip";
import {FlightSummaryPanel} from "./components/CoreComponents/flight-summary";
import {Telemetry} from "./components/CoreComponents/flight-summary/telemetry";
import {generateBorderIdMap, generateLocationIdMap} from "./components/helpers";
import {
  getNearestPoi,
  getRouteRisk,
  getRouteSpeed,
  getRouteStops,
  getStopsPassed,
  getTravelProgress,
  partsToSeconds,
} from "./helpers/flightSummary";

interface CoreAdvancedNavigationProps {
  children: React.ReactNode;
  simulator: Simulator;
  data?: {
    loading?: any;
    advancedNavAndAstrometrics?: AdvancedNavigationAndAstrometrics[];
  };
  client: any;
}

const CoreAdvancedNavigation: React.FC<CoreAdvancedNavigationProps> = ({
  children,
  simulator,
  data,
  client,
}) => {
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [showAddFlightSetModal, setShowAddFlightSetModal] =
    React.useState(false);
  const [ShowEta] = useHandleShowEtaMutation();
  const [ShowFlightSet] = useHandleShowFlightSetMutation();
  const [UpdateEta] = useHandleUpdateEtaMutation();
  const [EmergencyStop] = useHandleEmergencyStopMutation();
  const [ResumePath] = useHandleResumePathMutation();
  const [ApprovePath] = useHandleApprovePathMutation();
  const [DenyPath] = useHandleDenyPathMutation();
  const [SetRequireApproval] = useHandleSetRequireApprovalMutation();
  const [SetExtraStartupDelay] = useHandleSetExtraStartupDelayMutation();
  const [EngineFlux] = useHandleEngineFluxMutation();
  const [ChangeCoolantLevel] = useHandleSetCoolantLevelMutation();
  const [ChangeHeatLevel] = useHandleSetHeatLevelMutation();
  const [UpdateCurrentFlightPath] = useHandleUpdateCurrentFlightPathMutation();
  const [OverrideLocation] = useHandleOverrideLocationMutation();
  const [SetCurrentFlightSet] = useHandleUpdateCurrentFlightSetMutation();
  const [AddFlightSet] = useHandleAddFlightSetToNavigationMutation();
  const [UpdateFlightSetData] = useHandleUpdateAdvNavFlightSetDataMutation();

  const flightSetQuery = useGetBasicFlightSetsQuery();

  const parsedData = parseAdvancedNavData(data?.advancedNavAndAstrometrics);
  const advancedNav = parsedData[0];

  const notIncludedFlightSets = React.useMemo(() => {
    return (
      flightSetQuery.data?.getAllFlightSets?.filter(
        f => !advancedNav?.flightSets.find(af => af.id === f?.id),
      ) || []
    );
  }, [flightSetQuery.data, advancedNav]);

  if (!data || data.loading || !parsedData.length) {
    return <div>No Values</div>;
  }

  if (!advancedNav) {
    return <div>No System detected</div>;
  }
  // Same chained prompts as the Flight Director timer core.
  const handleEtaClick = () => {
    const seconds = prompt("Enter the number of seconds:", "0");
    if (!seconds && seconds !== "0") return;
    const minutes = prompt("Enter the number of minutes:", "0");
    if (!minutes && minutes !== "0") return;
    const hours = prompt("Enter the number of hours:", "0");
    if (!hours && hours !== "0") return;
    const eta = partsToSeconds(hours, minutes, seconds);
    if (eta === null) return;
    UpdateEta({
      variables: {
        id: advancedNav.id || "",
        eta,
      },
    });
  };

  const flightSet = advancedNav.currentFlightSet as unknown as
    | FlightSet
    | null
    | undefined;
  const route = advancedNav.currentFlightPath as unknown as
    | NavigationRoute
    | null
    | undefined;
  const coords = (advancedNav.flightPathCoords || []) as FullCoordinate[];
  const engineStatus = advancedNav.engineStatus as EngineStatus;
  const stopped = engineStatus === EngineStatus.STOPPED;
  const starting = engineStatus === EngineStatus.STARTUP;
  const moving = !stopped && !starting;
  const stops =
    route && flightSet
      ? getRouteStops(
          route,
          generateLocationIdMap(flightSet.pointsOfInterest),
          generateBorderIdMap(flightSet.borders),
        )
      : [];
  const stopsPassed = getStopsPassed(
    coords,
    advancedNav.totalEta || 0,
    advancedNav.remainingEta || 0,
  );
  const pending = advancedNav.pendingFlightPath as unknown as
    | NavigationRoute
    | null
    | undefined;
  const extraDelay = advancedNav.extraStartupDelay || 0;
  const pendingStops =
    pending && flightSet
      ? getRouteStops(
          pending,
          generateLocationIdMap(flightSet.pointsOfInterest),
          generateBorderIdMap(flightSet.borders),
        )
      : [];
  const risk = route && flightSet ? getRouteRisk(route, flightSet) : 0;
  const speedRating =
    route && flightSet
      ? getRouteSpeed(
          route,
          coords[0] || advancedNav.currentLocation,
          flightSet,
        )
      : 1;
  const nearest = flightSet
    ? getNearestPoi(
        advancedNav.currentLocation,
        flightSet.pointsOfInterest,
        flightSet.pixelDistanceModifier || 1,
      )
    : null;

  return (
    <Container
      fluid
      className="flex-column card-advancedNavigation core-adv-nav"
    >
      <SubscriptionHelper
        subscribe={() =>
          (data as any).subscribeToMore({
            document: ADVANCED_NAV_AND_ASTROMETRICS_SUB,
            variables: {simulatorId: simulator.id},
            updateQuery: (previousResult: any, {subscriptionData}: any) => {
              return Object.assign({}, previousResult, {
                advancedNavAndAstrometrics:
                  subscriptionData.data?.advancedNavAndAstrometricsUpdate,
              });
            },
          })
        }
      />
      <StatusStrip
        engineStatus={engineStatus}
        flightSetName={flightSet?.name}
        awaitingApproval={!!pending}
      >
        <Button size="sm" onClick={() => setShowDetailsModal(true)}>
          Open Panel
        </Button>
        <Button size="sm" onClick={() => setShowAddFlightSetModal(true)}>
          Sets
        </Button>
      </StatusStrip>
      {flightSet ? (
        <>
          {pending && flightSet && (
            <div className="core-adv-nav-approval">
              <FlightSummaryPanel
                route={pending}
                stops={pendingStops}
                stopsPassed={0}
                risk={getRouteRisk(pending, flightSet)}
                speedRating={getRouteSpeed(
                  pending,
                  advancedNav.currentLocation,
                  flightSet,
                )}
                extraStartupDelay={extraDelay}
                heading="Crew requests this flight path"
              />
              <div className="core-adv-nav-controls">
                <Button
                  size="sm"
                  color="success"
                  onClick={() =>
                    ApprovePath({variables: {id: advancedNav.id || ""}})
                  }
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() =>
                    DenyPath({variables: {id: advancedNav.id || ""}})
                  }
                >
                  Deny
                </Button>
              </div>
            </div>
          )}
          <div className="core-adv-nav-main">
            <div className="core-adv-nav-map">
              <RouteProgressMap
                imageUrl={flightSet.backgroundImg || ""}
                coordinates={route ? coords : []}
                shipLocation={advancedNav.currentLocation}
                passedIndex={stopsPassed}
              />
            </div>
            <FlightSummaryPanel
              route={route}
              stops={stops}
              stopsPassed={stopsPassed}
              risk={risk}
              speedRating={speedRating}
              lastLocationName={advancedNav.currentLocationName}
              extraStartupDelay={extraDelay}
            />
          </div>
          <Telemetry
            simulatorId={simulator.id}
            speedName={route?.speedOption.name}
            nearest={nearest}
            progress={getTravelProgress(
              advancedNav.totalEta || 0,
              advancedNav.remainingEta || 0,
            )}
            starting={starting}
            startupRemaining={advancedNav.remainingStartupTime}
            startupTotal={
              route
                ? route.startOption.secondsForStartup + extraDelay
                : undefined
            }
            moving={moving}
          />
          <div className="core-adv-nav-controls">
            <Button
              size="sm"
              disabled={stopped || starting}
              onClick={() =>
                EngineFlux({variables: {id: advancedNav.id || ""}})
              }
            >
              {engineStatus === EngineStatus.FLUX ? "Cancel Flux" : "Flux"}
            </Button>
            <Button
              size="sm"
              color="danger"
              disabled={stopped || starting}
              onClick={() =>
                EmergencyStop({variables: {id: advancedNav.id || ""}})
              }
            >
              Stop
            </Button>
            <Button
              size="sm"
              disabled={!stopped || !route}
              onClick={() =>
                ResumePath({variables: {id: advancedNav.id || ""}})
              }
            >
              Resume
            </Button>
            <span style={{flex: 1}} />
            <label className="mb-0">ETA</label>
            <div
              className="input-field"
              title="Click to set ETA"
              onClick={handleEtaClick}
              style={{
                backgroundColor: "#FBFE3D",
                border: "solid 1px #D2CB43",
                color: "black",
                height: "16px",
                fontSize: "12px",
                whiteSpace: "pre",
                textAlign: "center",
              }}
            >
              {advancedNav.remainingEta
                ? formatSecondsToTime(advancedNav.remainingEta)
                : "None"}
            </div>
            <label className="mb-0" htmlFor="show-eta">
              Show ETA
            </label>
            <input
              disabled={stopped}
              type="checkbox"
              id="show-eta"
              checked={advancedNav.showEta}
              onChange={event => {
                ShowEta({
                  variables: {
                    id: advancedNav.id || "",
                    show: event.target.checked,
                  },
                });
              }}
            />
          </div>
          <div className="core-adv-nav-controls">
            <label className="mb-0" htmlFor="require-approval">
              Require approval
            </label>
            <input
              type="checkbox"
              id="require-approval"
              title="Unchecked: crew flight paths start automatically"
              checked={advancedNav.requireApproval}
              onChange={event =>
                SetRequireApproval({
                  variables: {
                    id: advancedNav.id || "",
                    require: event.target.checked,
                  },
                })
              }
            />
            <span style={{flex: 1}} />
            <label className="mb-0">Extra startup delay</label>
            <InputField
              prompt="Extra startup delay (seconds)"
              promptValue={extraDelay}
              onClick={value => {
                const seconds = Number(value);
                if (!Number.isFinite(seconds) || seconds < 0) return;
                SetExtraStartupDelay({
                  variables: {id: advancedNav.id || "", seconds},
                });
              }}
            >
              {`${extraDelay}s`}
            </InputField>
          </div>
        </>
      ) : (
        <p>No flight set selected</p>
      )}
      <Modal
        size="lg"
        isOpen={showAddFlightSetModal}
        toggle={() => setShowAddFlightSetModal(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h3>Available Flight Sets</h3>
              {notIncludedFlightSets.map(each => {
                return (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    key={each?.id}
                  >
                    <div>
                      {each?.label || "No Label"} - {each?.name}
                    </div>
                    <Button
                      color="primary"
                      onClick={() => {
                        AddFlightSet({
                          variables: {
                            id: advancedNav.id || "",
                            flightSetId: each?.id || "",
                          },
                        });
                      }}
                    >
                      Add Flight Set
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <h3>Included Flight Sets</h3>
            {advancedNav.flightSets.map(each => {
              return (
                <div key={each.id}>
                  <div>
                    {each.label || "No Label"} - {each.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
      <Modal
        className="fullscreen-modal"
        isOpen={showDetailsModal}
        toggle={() => setShowDetailsModal(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgray",
          }}
        >
          <div style={{flexGrow: 1, margin: "1rem"}}>
            <CoreAdvancedNavigationModal
              engineStatus={advancedNav.engineStatus as EngineStatus}
              currentLocation={advancedNav.currentLocation}
              flightSets={advancedNav.flightSets as FlightSet[]}
              possibleFlightPaths={
                advancedNav.currentFlightSet ? advancedNav.flightPaths : []
              }
              currentFlightPath={advancedNav.currentFlightPath || undefined}
              showEta={advancedNav.showEta}
              coolantLevel={advancedNav.coolantLevel}
              heatLevel={advancedNav.heatLevel}
              currentETA={advancedNav.remainingEta}
              currentFlightSet={
                (advancedNav.currentFlightSet as FlightSet) || undefined
              }
              showFlightSet={advancedNav.showFlightSet}
              colorScheme="light"
              onUpdateFlightSet={flightSet => {
                UpdateFlightSetData({
                  variables: {
                    id: advancedNav.id || "",
                    flightSet: flightSet,
                  },
                });
              }}
              onShowFlightSet={show => {
                ShowFlightSet({
                  variables: {
                    id: advancedNav.id || "",
                    show,
                  },
                });
              }}
              onUpdateEta={eta => {
                UpdateEta({
                  variables: {
                    id: advancedNav.id || "",
                    eta,
                  },
                });
              }}
              onShowEta={show => {
                ShowEta({
                  variables: {
                    id: advancedNav.id || "",
                    show,
                  },
                });
              }}
              onEmergencyStop={() => {
                EmergencyStop({
                  variables: {
                    id: advancedNav.id || "",
                  },
                });
              }}
              onEngineFlux={() => {
                EngineFlux({
                  variables: {
                    id: advancedNav.id || "",
                  },
                });
              }}
              onCoolantLevelChange={level => {
                ChangeCoolantLevel({
                  variables: {
                    id: advancedNav.id || "",
                    level,
                  },
                });
              }}
              onHeatLevelChange={level => {
                ChangeHeatLevel({
                  variables: {
                    id: advancedNav.id || "",
                    level,
                  },
                });
              }}
              onUpdateCurrentFlightPath={path => {
                UpdateCurrentFlightPath({
                  variables: {
                    id: advancedNav.id || "",
                    route: path,
                  },
                });
              }}
              onOverrideLocation={(
                location,
                currentLocationUrl,
                currentLocationName,
              ) => {
                OverrideLocation({
                  variables: {
                    id: advancedNav.id || "",
                    location,
                    currentLocationUrl,
                    currentLocationName,
                  },
                });
              }}
              onUpdateCurrentFlightSet={flightSet => {
                SetCurrentFlightSet({
                  variables: {
                    id: advancedNav.id || "",
                    flightSetId: flightSet.id,
                  },
                });
              }}
            />
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default graphql(ADVANCED_NAV_AND_ASTROMETRICS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: (ownProps as any).simulator.id},
  }),
})(withApollo(CoreAdvancedNavigation as any));
