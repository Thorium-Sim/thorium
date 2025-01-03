import React, { useEffect } from "react";
import { AdvancedNavigationAndAstrometrics, Simulator, useHandleResumePathMutation, useHandleSaveFlightPathMutation, useHandleEngageFlightPathMutation, useHandleAdvancedNavCoolantFlushMutation, useHandleEmergencyStopMutation } from "generated/graphql";
import { ADVANCED_NAV_AND_ASTROMETRICS_QUERY, ADVANCED_NAV_AND_ASTROMETRICS_SUB } from "./core-queries";
import { Container, } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { graphql, withApollo } from "react-apollo";
import { AdvancedNavigation } from "./AdvancedNavigation";
import DamageOverlay from "../helpers/DamageOverlay";
import { EngineStatus } from "./types";
import { FlightSet } from "containers/FlightDirector/FlightSets/types";


interface AdvancedNavigationCardProps {
    children: React.ReactNode;
    simulator: Simulator;
    data?: { loading?: any; advancedNavAndAstrometrics?: AdvancedNavigationAndAstrometrics[] };
    client?: any;
}

const AdvancedNavigationCard: React.FC<AdvancedNavigationCardProps> = ({ data, simulator }) => {
    const [EmergencyStop] = useHandleEmergencyStopMutation();
    const [FlushCoolant] = useHandleAdvancedNavCoolantFlushMutation();
    const [EngageFlightPath] = useHandleEngageFlightPathMutation();
    const [SaveFlightPath] = useHandleSaveFlightPathMutation();
    const [ResumePath] = useHandleResumePathMutation();
    let parsedData = undefined;
    const { assets } = simulator;

    if (data && data.advancedNavAndAstrometrics) {
        parsedData = data.advancedNavAndAstrometrics.map((d) => {
            return {
                ...d,
                flightSetPathMap: JSON.parse(d.flightSetPathMap),
                probeAssignments: Object.keys(JSON.parse(d.probeAssignments)).map(k => JSON.parse(d.probeAssignments)[k]),
            }
        })
    }

    const advancedNav = parsedData && parsedData[0];
    if (!data || data.loading || !advancedNav || !assets) {
        return <React.Fragment />
    }


    return (
        <Container fluid className="card-advNavigation" style={{ height: '100%' }}>
            <DamageOverlay
                system={advancedNav}
                message={`${advancedNav.displayName || advancedNav.name} Offline`}
            />
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
            <AdvancedNavigation
                hasEmergencyPower={advancedNav.hasEmergencyPower}
                engineStatus={advancedNav.engineStatus as EngineStatus}
                currentFlightSet={advancedNav.currentFlightSet as FlightSet || undefined}
                currentFlightPath={advancedNav.currentFlightPath || undefined}
                currentETA={advancedNav.remainingEta || undefined}
                currentLocation={advancedNav.currentLocation}
                currentLocationName={advancedNav.currentLocationName || undefined}
                currentLocationUrl={advancedNav.currentLocationUrl || undefined}
                remainingStartupTime={advancedNav.remainingStartupTime || undefined}
                possibleFlightPaths={advancedNav.flightPaths || []}
                selfIcon={`/assets/${assets.logo}`}
                coolantLevel={advancedNav.coolantLevel}
                heatLevel={advancedNav.heatLevel}
                showEta={advancedNav.showEta}
                showFlightSet={advancedNav.showFlightSet}
                onEmergencyStop={() => {
                    EmergencyStop({
                        variables: {
                            id: advancedNav.id || ''
                        }
                    })
                }}
                onCoolantFlush={() => {
                    FlushCoolant({
                        variables: {
                            id: advancedNav.id || ''
                        }
                    })
                }}
                onEngageFlightPath={(flightPath) => {
                    // Update the flight path
                    EngageFlightPath({
                        variables: {
                            id: advancedNav.id || '',
                            path: flightPath
                        }
                    })
                }}
                onResumeFlightPath={() => {
                    ResumePath({
                        variables: {
                            id: advancedNav.id || ''
                        }
                    })
                }}
                onSaveFlightPath={(flightPath) => {
                    SaveFlightPath({
                        variables: {
                            id: advancedNav.id || '',
                            path: flightPath
                        }
                    })
                }} />



        </Container>
    )
}


export default graphql(ADVANCED_NAV_AND_ASTROMETRICS_QUERY, {
    options: ownProps => ({
        fetchPolicy: "cache-and-network",
        variables: { simulatorId: (ownProps as any).simulator.id },
    }),
})(withApollo(AdvancedNavigationCard as any));