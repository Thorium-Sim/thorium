import React from "react";
import { AdvancedNavigationAndAstrometrics, Simulator, useGetBasicFlightSetsQuery, useHandleAddFlightSetToNavigationMutation, useHandleEmergencyStopMutation, useHandleEngineFluxMutation, useHandleOverrideLocationMutation, useHandleSetCoolantLevelMutation, useHandleSetHeatLevelMutation, useHandleShowEtaMutation, useHandleShowFlightSetMutation, useHandleUpdateCurrentFlightPathMutation, useHandleUpdateCurrentFlightSetMutation, useHandleUpdateEtaMutation, useUpdateFlightSetMutation } from "generated/graphql";
import { Button, Container, Modal } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { FormattedMessage } from "react-intl";
import { ADVANCED_NAV_AND_ASTROMETRICS_QUERY, ADVANCED_NAV_AND_ASTROMETRICS_SUB } from "./core-queries";
import { graphql, withApollo } from "react-apollo";
import { CoreAdvancedNavigation as CoreAdvancedNavigationModal } from './components/CoreComponents/advanced-flight'
import { EngineStatus } from "./types";
import { FlightSet } from "containers/FlightDirector/FlightSets/types";
import "./styles.css"


interface CoreAdvancedNavigationProps {
    children: React.ReactNode;
    simulator: Simulator;
    data?: { loading?: any; advancedNavAndAstrometrics?: AdvancedNavigationAndAstrometrics[] };
    client: any;
}

const CoreAdvancedNavigation: React.FC<CoreAdvancedNavigationProps> = ({ children, simulator, data, client }) => {
    const [showDetailsModal, setShowDetailsModal] = React.useState(false);
    const [showAddFlightSetModal, setShowAddFlightSetModal] = React.useState(false);
    const [ShowEta] = useHandleShowEtaMutation();
    const [UpdateFlightSet] = useUpdateFlightSetMutation();
    const [ShowFlightSet] = useHandleShowFlightSetMutation();
    const [UpdateEta] = useHandleUpdateEtaMutation();
    const [EmergencyStop] = useHandleEmergencyStopMutation();
    const [EngineFlux] = useHandleEngineFluxMutation();
    const [ChangeCoolantLevel] = useHandleSetCoolantLevelMutation();
    const [ChangeHeatLevel] = useHandleSetHeatLevelMutation();
    const [UpdateCurrentFlightPath] = useHandleUpdateCurrentFlightPathMutation();
    const [OverrideLocation] = useHandleOverrideLocationMutation();
    const [SetCurrentFlightSet] = useHandleUpdateCurrentFlightSetMutation();
    const [AddFlightSet] = useHandleAddFlightSetToNavigationMutation();

    const flightSetQuery = useGetBasicFlightSetsQuery();
    let parsedData = undefined;

    if (data && data.advancedNavAndAstrometrics) {
        parsedData = data.advancedNavAndAstrometrics.map((d) => {
            return {
                ...d,
                flightSetPathMap: JSON.parse(d.flightSetPathMap),
                probeAssignments: JSON.parse(d.probeAssignments),
            }
        })
    }

    const advancedNav = parsedData && parsedData[0];

    const notIncludedFlightSets = React.useMemo(() => {
        return flightSetQuery.data?.getAllFlightSets?.filter(f => !advancedNav?.flightSets.find(af => af.id === f?.id)) || [];
    }, [flightSetQuery.data, advancedNav]);

    console.log("data", data);
    console.log("advancedNav", advancedNav);
    console.log("notIncludedFlightSets", notIncludedFlightSets);

    if (!data || data.loading || !parsedData) {
        return (
            <div>
                <FormattedMessage
                    id="adv-nav-no-values"
                    defaultMessage="No Values"
                />{" "}
            </div>
        );
    }


    if (!advancedNav) {
        return (
            <div>
                <FormattedMessage
                    id="adv-nav-no-template"
                    defaultMessage="No System detected"
                />
            </div>
        );
    }

    const locationIdMap = advancedNav.flightSets.reduce((prev, next) => {
        next.pointsOfInterest.forEach(p => {
            prev[p.id] = p.name;
        })
        return prev;
    }, {} as Record<string, string>);



    return (
        <Container fluid className="flex-column card-advancedNavigation">
            <SubscriptionHelper
                subscribe={() =>
                    (data as any).subscribeToMore({
                        document: ADVANCED_NAV_AND_ASTROMETRICS_SUB,
                        variables: { simulatorId: simulator.id },
                        updateQuery: (previousResult: any, { subscriptionData }: any) => {
                            return Object.assign({}, previousResult, {
                                advancedNavAndAstrometrics: subscriptionData.data?.advancedNavAndAstrometricsUpdate,
                            });
                        },
                    })
                }
            />
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        onClick={() => {
                            setShowDetailsModal(true);
                        }}
                    >
                        Open Panel
                    </Button>
                    <br />
                    Target Location: {advancedNav.currentFlightPath?.targetLocationId ? locationIdMap[advancedNav.currentFlightPath?.targetLocationId] : "None"}
                    <br />
                    Current ETA: {advancedNav.remainingEta}
                    <br />
                    Show ETA: {advancedNav.showEta ? "Yes" : "No"}
                    <br />
                    <Button
                        onClick={() => {
                            setShowAddFlightSetModal(true);
                        }}
                    >
                        Show available flight sets
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                </div>

            </div>
            <Modal size="lg" isOpen={showAddFlightSetModal} toggle={() => setShowAddFlightSetModal(false)}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3>Available Flight Sets</h3>
                            {notIncludedFlightSets.map((each) => {
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} key={each?.id}>
                                        <div>{each?.label || "No Label"} - {each?.name}</div>
                                        <Button
                                            color="primary"
                                            onClick={() => {
                                                console.log("Adding flight set", each?.id, advancedNav.id);
                                                AddFlightSet({
                                                    variables: {
                                                        id: advancedNav.id || '',
                                                        flightSetId: each?.id || ''
                                                    }
                                                })
                                            }}
                                        >
                                            Add Flight Set
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3>Included Flight Sets</h3>
                        {advancedNav.flightSets.map((each) => {
                            return (
                                <div key={each.id}>
                                    <div>{each.label || "No Label"} - {each.name}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal>
            <Modal className="fullscreen-modal" isOpen={showDetailsModal} toggle={() => setShowDetailsModal(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ flexGrow: 1, margin: '1rem' }}>
                        <CoreAdvancedNavigationModal
                            engineStatus={advancedNav.engineStatus as EngineStatus}
                            currentLocation={advancedNav.currentLocation}
                            flightSets={advancedNav.flightSets as FlightSet[]}
                            possibleFlightPaths={advancedNav.currentFlightSet ? advancedNav.flightSetPathMap[advancedNav.currentFlightSet.id] : []}
                            currentFlightPath={advancedNav.currentFlightPath || undefined}
                            showEta={advancedNav.showEta}
                            coolantLevel={advancedNav.coolantLevel}
                            heatLevel={advancedNav.heatLevel}
                            currentETA={advancedNav.remainingEta}
                            currentFlightSet={advancedNav.currentFlightSet as FlightSet || undefined}
                            showFlightSet={advancedNav.showFlightSet}
                            colorScheme="light"
                            onUpdateFlightSet={(flightSet) => {
                                UpdateFlightSet({
                                    variables: {
                                        id: advancedNav.id || '',
                                        flightSet: flightSet
                                    }
                                })
                            }}
                            onShowFlightSet={(show) => {
                                ShowFlightSet({
                                    variables: {
                                        id: advancedNav.id || '',
                                        show
                                    }
                                })
                            }}
                            onUpdateEta={(eta) => {
                                UpdateEta({
                                    variables: {
                                        id: advancedNav.id || '',
                                        eta
                                    }
                                })
                            }}
                            onShowEta={(show) => {
                                ShowEta({
                                    variables: {
                                        id: advancedNav.id || '',
                                        show
                                    }
                                })
                            }}
                            onEmergencyStop={() => {
                                EmergencyStop({
                                    variables: {
                                        id: advancedNav.id || ''
                                    }
                                })
                            }}
                            onEngineFlux={() => {
                                EngineFlux({
                                    variables: {
                                        id: advancedNav.id || ''
                                    }
                                })
                            }}
                            onCoolantLevelChange={(level) => {
                                ChangeCoolantLevel({
                                    variables: {
                                        id: advancedNav.id || '',
                                        level
                                    }
                                })
                            }}
                            onHeatLevelChange={(level) => {
                                ChangeHeatLevel({
                                    variables: {
                                        id: advancedNav.id || '',
                                        level
                                    }
                                })
                            }}
                            onUpdateCurrentFlightPath={(path) => {
                                UpdateCurrentFlightPath({
                                    variables: {
                                        id: advancedNav.id || '',
                                        route: path
                                    }
                                })
                            }}
                            onOverrideLocation={(location, currentLocationUrl, currentLocationName) => {
                                OverrideLocation({
                                    variables: {
                                        id: advancedNav.id || '',
                                        location,
                                        currentLocationUrl,
                                        currentLocationName
                                    }
                                })
                            }}
                            onUpdateCurrentFlightSet={(flightSet) => {
                                SetCurrentFlightSet({
                                    variables: {
                                        id: advancedNav.id || '',
                                        flightSetId: flightSet.id
                                    }
                                })
                            }}

                        />
                    </div>
                </div>

            </Modal>
        </Container>
    )

}

export default graphql(ADVANCED_NAV_AND_ASTROMETRICS_QUERY, {
    options: ownProps => ({
        fetchPolicy: "cache-and-network",
        variables: { simulatorId: (ownProps as any).simulator.id },
    }),
})(withApollo(CoreAdvancedNavigation as any));