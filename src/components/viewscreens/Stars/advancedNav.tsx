import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import Stars from "./stars";


const QUERY = gql`
  query AdvancedNavStars($simulatorId: ID!) {
    advancedNavStars(simulatorId: $simulatorId) {
      velocity
      activating
    }
  }
`;
const SUBSCRIPTION = gql`
  subscription EngineUpdate($simulatorId: ID!) {
    advancedNavStarsUpdate(simulatorId: $simulatorId) {
      velocity
      activating
    }
  }
`;

function transformRatio(input: number): number {
    const inputMin = 0.008;
    const inputMax = 1;
    const outputMin = 1;
    const outputMax = 50;

    if (input <= inputMin) {
        return outputMin;
    }
    if (input >= inputMax) {
        return outputMax;
    }

    // Linear transformation formula
    const scale = (outputMax - outputMin) / (inputMax - inputMin);
    return outputMin + (input - inputMin) * scale;
}

let prevSpeed = 0;

class TemplateData extends Component<any, any> {
    state = {};
    render() {
        return (
            <Query query={QUERY} variables={{ simulatorId: this.props.simulator.id }}>
                {({ loading, data, subscribeToMore }: any) => {

                    if (loading || !data) return <div />;
                    const { advancedNavStars } = data;
                    if (!advancedNavStars) return null;
                    const { velocity, activating } = advancedNavStars;
                    console.log(velocity);
                    return (
                        <SubscriptionHelper
                            subscribe={() =>
                                subscribeToMore({
                                    document: SUBSCRIPTION,
                                    variables: { simulatorId: this.props.simulator.id },
                                    updateQuery: (previousResult: any, { subscriptionData }: any) => {
                                        return {
                                            ...previousResult,
                                            advancedNavStars: subscriptionData.data.advancedNavStarsUpdate
                                        };
                                    },
                                })
                            }
                        >
                            <Stars
                                {...this.props}
                                velocity={velocity === 0 ? 0 : transformRatio(velocity)}
                                activating={false}
                            />
                        </SubscriptionHelper>
                    );
                }}
            </Query>
        );
    }
}
export default TemplateData;
