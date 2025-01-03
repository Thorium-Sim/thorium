import React, { useMemo } from "react";
import { AdvancedNavigationAndAstrometrics, Simulator, useHandleOnAssignProbeMutation } from "generated/graphql";
import { ADVANCED_NAV_AND_ASTROMETRICS_QUERY, ADVANCED_NAV_AND_ASTROMETRICS_SUB } from "./core-queries";
import { Container, } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { graphql, withApollo } from "react-apollo";
import { FlightSet, Probe } from "containers/FlightDirector/FlightSets/types";
import { Astrometrics } from "./Astrometrics";

interface AstrometricsCardProps {
    children: React.ReactNode;
    simulator: Simulator;
    data?: { loading?: any; advancedNavAndAstrometrics?: AdvancedNavigationAndAstrometrics[], probes?: { probes: Probe[] }[] };
    client?: any;
}

const AstrometricsCard: React.FC<AstrometricsCardProps> = ({ data, simulator }) => {
    const [AssignProbe] = useHandleOnAssignProbeMutation();
    let parsedData = undefined;
    const { assets } = simulator;


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
    if (!data || data.loading || !advancedNav || !assets) {
        return <React.Fragment />
    }
    const usedProbes: Record<string, boolean> = {};
    const flightSetIds = Object.keys(advancedNav.probeAssignments);
    for (let i = 0; i < flightSetIds.length; i++) {
        if (flightSetIds[i] !== advancedNav.currentFlightSet?.id) {
            const flightSetProbeAssignments = advancedNav.probeAssignments[flightSetIds[i]];
            for (let j = 0; j < flightSetProbeAssignments.length; j++) {
                usedProbes[flightSetProbeAssignments[j].probeId] = true;
            }
        }

    }
    const availableProbes = advancedNav.probes.filter(probe => !usedProbes[probe.id])
        .filter(probe => !probe.equipment.some(equipment => equipment.id === 'probe-network-package'))
        .filter((probe) => !(Number(probe.name) < 9));

    return (
        <Container fluid className="card-astrometrics" style={{ height: '100%' }}>
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
            <Astrometrics
                currentFlightSet={advancedNav.currentFlightSet as FlightSet || undefined}
                showFlightSet={advancedNav.showFlightSet}
                selfIcon={`/assets/${assets.logo}`}
                currentLocation={advancedNav.currentLocation}
                availableProbes={availableProbes as Probe[]}
                probeAssignments={advancedNav.probeAssignments[advancedNav.currentFlightSet?.id || ''] || []}
                onAssignProbe={(probeId, poiId) => {
                    AssignProbe({
                        variables: {
                            id: advancedNav.id || '',
                            probeId,
                            poiId
                        }
                    })
                }}
            />

        </Container>

    )
}

export default graphql(ADVANCED_NAV_AND_ASTROMETRICS_QUERY, {
    options: ownProps => ({
        fetchPolicy: "cache-and-network",
        variables: { simulatorId: (ownProps as any).simulator.id },
    }),
})(withApollo(AstrometricsCard as any));