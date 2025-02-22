import React from "react";
import { AdvancedNavigationAndAstrometrics, Simulator, useHandleUpdateProbeAssignmentsMutation } from "generated/graphql";
import { ADVANCED_NAV_AND_ASTROMETRICS_QUERY, ADVANCED_NAV_AND_ASTROMETRICS_SUB } from "./core-queries";
import "./styles.css"
import { graphql, withApollo } from "react-apollo";
import { FormattedMessage } from "react-intl";
import { Container } from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import { AstrometricsCoreComponent } from "./CoreAstrometricsBase";
import { Probe } from "containers/FlightDirector/FlightSets/types";

interface CoreAstrometricsProps {
    children: React.ReactNode;
    simulator: Simulator;
    data?: { loading?: any; advancedNavAndAstrometrics?: AdvancedNavigationAndAstrometrics[] };
    client: any;
}

const CoreAstrometrics: React.FC<CoreAstrometricsProps> = ({ children, simulator, data, client }) => {
    const [HandleAssignments] = useHandleUpdateProbeAssignmentsMutation();
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
    if (!data || data.loading || !parsedData) {
        return (
            <div>
                <FormattedMessage
                    id="astro-no-values"
                    defaultMessage="No Values"
                />{" "}
            </div>
        );
    }


    if (!advancedNav) {
        return (
            <div>
                <FormattedMessage
                    id="astro-no-template"
                    defaultMessage="No System detected"
                />
            </div>
        );
    }

    return (
        <Container fluid className="flex-column card-astrometrics">
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
            <AstrometricsCoreComponent
                probes={advancedNav.probes as Probe[]}
                probeAssignments={advancedNav.probeAssignments[advancedNav.currentFlightSet?.id || ''] || []}
                onUpdateProbeAssignments={(probeAssignments) => {
                    const fullAssignments = { ...advancedNav.probeAssignments };
                    if (advancedNav.currentFlightSet) {
                        fullAssignments[advancedNav.currentFlightSet.id] = probeAssignments;
                    }
                    HandleAssignments({
                        variables: {
                            id: advancedNav.id || '',
                            probeAssignments: JSON.stringify(fullAssignments)
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
})(withApollo(CoreAstrometrics as any));