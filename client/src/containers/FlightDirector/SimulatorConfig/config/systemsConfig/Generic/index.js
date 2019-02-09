import React, { Fragment, Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { titleCase } from "change-case";
import Basic from "./basic";
import Power from "./power";
import Locations from "./location";
import Heat from "./heat";
import DamageTasks from "../../Simulator/damageTasks";

export const GENERIC_QUERY = gql`
  query System($simulatorId: ID!, $id: ID!) {
    system(id: $id) {
      id
      name
      displayName
      type
      heatRate
      power {
        powerLevels
        defaultLevel
      }
      locations {
        id
        name
        deck {
          number
        }
      }
      damageTasks {
        id
        taskTemplate {
          id
          name
          definition
          reportTypes
        }
        required
        nextSteps {
          id
          name
          definition
        }
      }
    }
    decks(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
      }
    }
  }
`;

class GenericConfig extends Component {
  state = {
    selected: "Basic"
  };
  render() {
    const { simulatorId, id } = this.props;
    const { selected } = this.state;
    return (
      <Query query={GENERIC_QUERY} variables={{ simulatorId, id }}>
        {({ loading, data }) => {
          if (loading) return null;
          const { type } = data.system;
          return (
            <div>
              <h4>{titleCase(type)}</h4>
              <ButtonGroup>
                <Button
                  size="sm"
                  active={selected === "Basic"}
                  onClick={() => this.setState({ selected: "Basic" })}
                >
                  Basic
                </Button>
                <Button
                  size="sm"
                  active={selected === "Power"}
                  onClick={() => this.setState({ selected: "Power" })}
                >
                  Power
                </Button>
                <Button
                  size="sm"
                  active={selected === "Heat"}
                  onClick={() => this.setState({ selected: "Heat" })}
                >
                  Heat
                </Button>
                <Button
                  size="sm"
                  active={selected === "Locations"}
                  onClick={() => this.setState({ selected: "Locations" })}
                >
                  Locations
                </Button>
                <Button
                  size="sm"
                  active={selected === "Damage Report"}
                  onClick={() => this.setState({ selected: "Damage Report" })}
                >
                  Damage Report
                </Button>
                {(this.props.children || this.props.render) && (
                  <Button
                    size="sm"
                    active={selected === "System Specific"}
                    onClick={() =>
                      this.setState({ selected: "System Specific" })
                    }
                  >
                    System Specific
                  </Button>
                )}
              </ButtonGroup>
              <div className="scroll" style={{ minHeight: "80vh" }}>
                {selected === "Basic" && (
                  <Basic {...this.props} {...data.system} />
                )}
                {selected === "Power" && (
                  <Power {...this.props} {...data.system} />
                )}
                {selected === "Locations" && (
                  <Locations
                    {...this.props}
                    {...data.system}
                    decks={data.decks}
                  />
                )}
                {selected === "Heat" && (
                  <Heat {...this.props} {...data.system} />
                )}
                {selected === "System Specific" && (
                  <Fragment>
                    {this.props.children}
                    {this.props.render && this.props.render(this.props)}
                  </Fragment>
                )}
                {selected === "Damage Report" && (
                  <DamageTasks {...data.system} type="system" />
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default GenericConfig;
