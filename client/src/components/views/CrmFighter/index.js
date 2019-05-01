import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import FighterData from "./fighterData";
import "./style.scss";

const MOVEMENT_QUERY = gql`
  query CrmMovement($simulatorId: ID!) {
    crm(simulatorId: $simulatorId) {
      id
      fighterImage
      phasers {
        target {
          x
          y
        }
        destination {
          x
          y
        }
      }
      torpedos {
        id
        position {
          x
          y
        }
        destroyed
      }
      enemies {
        id
        icon
        size
        destroyed
        position {
          x
          y
        }
      }
      fighters {
        id
        icon
        size
        destroyed
        docked
        position {
          x
          y
        }
      }
      interval
    }
  }
`;
const MOVEMENT_SUBSCRIPTION = gql`
  subscription CrmMovement($simulatorId: ID!) {
    crmMovementUpdate(simulatorId: $simulatorId) {
      id
      phasers {
        target {
          x
          y
        }
        destination {
          x
          y
        }
      }
      torpedos {
        id
        position {
          x
          y
        }
        destroyed
      }
      enemies {
        id
        position {
          x
          y
        }
        destroyed
      }
      fighters {
        id
        position {
          x
          y
        }
        destroyed
      }
      interval
    }
  }
`;
class CrmData extends Component {
  state = {};
  render() {
    return (
      <Query
        query={MOVEMENT_QUERY}
        variables={{ simulatorId: this.props.simulator.id }}
      >
        {({ loading, data, subscribeToMore }) => {
          const { crm } = data;
          if (loading) return null;
          if (!crm) return <div>No CRM System</div>;
          return (
            <SubscriptionHelper
              subscribe={() =>
                subscribeToMore({
                  document: MOVEMENT_SUBSCRIPTION,
                  variables: { simulatorId: this.props.simulator.id },
                  updateQuery: (previousResult, { subscriptionData }) => {
                    const crm = previousResult.crm;
                    const {
                      enemies,
                      fighters,
                      interval,
                      phasers,
                      torpedos,
                      id
                    } = subscriptionData.data.crmMovementUpdate;
                    if (id !== crm.id) return previousResult;
                    const crmEnemies = crm.enemies.reduce(
                      (acc, e) => ({ ...acc, [e.id]: e }),
                      {}
                    );
                    const crmFighters = crm.fighters.reduce(
                      (acc, e) => ({ ...acc, [e.id]: e }),
                      {}
                    );
                    const newEnemies = enemies.map(e => ({
                      ...crmEnemies[e.id],
                      ...e
                    }));
                    return Object.assign({}, previousResult, {
                      crm: {
                        ...crm,
                        phasers,
                        torpedos,
                        enemies: newEnemies,
                        fighters: fighters.map(e => ({
                          ...crmFighters[e.id],
                          ...e
                        })),
                        interval
                      }
                    });
                  }
                })
              }
            >
              <FighterData {...this.props} crm={crm} />
            </SubscriptionHelper>
          );
        }}
      </Query>
    );
  }
}
export default CrmData;
