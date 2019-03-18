import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { Input, Button } from "reactstrap";
import { InputField } from "../../generic/core";

const ARMORY_QUERY = gql`
  query Crew($simulatorId: ID!) {
    teams(simulatorId: $simulatorId) {
      id
      name
      type
      officers {
        id
        name
        inventory {
          id
        }
      }
    }
    crew(simulatorId: $simulatorId) {
      id
      name
      inventory {
        id
        name
        count
      }
    }
  }
`;

const CREW_SUB = gql`
  subscription CrewUpdate($simulatorId: ID) {
    crewUpdate(simulatorId: $simulatorId, killed: false) {
      id
      name
      inventory {
        id
        name
        count
      }
    }
  }
`;

const TEAM_SUB = gql`
  subscription TeamsUpdate($simulatorId: ID) {
    teamsUpdate(simulatorId: $simulatorId) {
      id
      name
      type
      officers {
        id
        name
        inventory {
          id
        }
      }
    }
  }
`;

const CrewChoice = ({ crew, teams, selectedCrew, updateSelectedCrew }) => {
  const teamCrew = teams
    .reduce((prev, next) => prev.concat(next.officers), [])
    .map(t => t.id);
  const sorter = (a, b) => {
    if (a.inventory.length > b.inventory.length) return -1;
    if (a.inventory.length < b.inventory.length) return 1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  };
  // Remove crew that are on a team
  const filteredCrew = crew.filter(c => teamCrew.indexOf(c.id) === -1);
  return (
    <Input
      type="select"
      bsSize="sm"
      value={selectedCrew || "nothing"}
      onChange={updateSelectedCrew}
    >
      <option value="nothing" disabled>
        Select a Crew Member
      </option>
      {teams.map(t => (
        <optgroup key={t.id} label={`${t.type} - ${t.name}`}>
          {t.officers
            .concat()
            .sort(sorter)
            .map(c => (
              <option key={c.id} value={c.id}>
                {c.inventory.length > 0 ? "*" : ""} {c.name}
              </option>
            ))}
        </optgroup>
      ))}
      <optgroup label={`Unassigned`}>
        {filteredCrew
          .concat()
          .sort(sorter)
          .map(c => (
            <option key={c.id} value={c.id}>
              {c.inventory.length > 0 ? "*" : ""} {c.name}
            </option>
          ))}
      </optgroup>
    </Input>
  );
};

const ADD_INVENTORY = gql`
  mutation AddInventory($inventory: InventoryItemInput) {
    addInventory(inventory: $inventory)
  }
`;

const UPDATE_INVENTORY = gql`
  mutation UpdateCrewInventory($crewId: ID!, $inventory: [InventoryCount]!) {
    updateCrewInventory(crewId: $crewId, inventory: $inventory)
  }
`;

const CrewCargo = ({ simulatorId, crew: { id, name, inventory } }) => {
  const addInventory = mutate => {
    const iName = prompt("What is the name of the inventory?");
    if (!iName) return;
    const count = prompt("How many do you want to add?");
    if (!count || isNaN(parseInt(count, 10))) return;
    const variables = {
      inventory: {
        simulatorId,
        name: iName,
        metadata: {},
        crewCount: [{ crew: id, count: parseInt(count, 10) }]
      }
    };
    mutate({ variables });
  };
  const updateInventoryQuantity = (update, invId, count) => {
    const variables = {
      crewId: id,
      inventory: [
        {
          inventory: invId,
          count: parseInt(count, 10)
        }
      ]
    };
    update({ variables });
  };
  return (
    <div>
      <p>{name}</p>{" "}
      <Mutation mutation={ADD_INVENTORY}>
        {mutate => (
          <Button
            size="sm"
            color="primary"
            onClick={() => addInventory(mutate)}
          >
            Add Inventory
          </Button>
        )}
      </Mutation>
      {inventory.map(i => (
        <p key={`to-${i.id}`}>
          {i.name}{" "}
          <Mutation mutation={UPDATE_INVENTORY}>
            {update => (
              <InputField
                style={{
                  display: "inline-block",
                  minWidth: "20px"
                }}
                prompt={`What is the new quantity of ${i.name}?`}
                onClick={val => updateInventoryQuantity(update, i.id, val)}
              >
                {i.count}
              </InputField>
            )}
          </Mutation>
        </p>
      ))}
    </div>
  );
};
const ArmoryCoreData = ({ simulator }) => (
  <Query query={ARMORY_QUERY} variables={{ simulatorId: simulator.id }}>
    {({ subscribeToMore, loading, data: { crew, teams } }) =>
      !loading &&
      crew &&
      teams && (
        <ArmoryCore
          crew={crew}
          teams={teams}
          simulator={simulator}
          subscribe={() => {
            return {
              teams: subscribeToMore({
                document: TEAM_SUB,
                variables: { simulatorId: simulator.id },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    teams: subscriptionData.data.teamsUpdate
                  });
                }
              }),
              crew: subscribeToMore({
                document: CREW_SUB,
                variables: { simulatorId: simulator.id },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    crew: subscriptionData.data.crewUpdate
                  });
                }
              })
            };
          }}
        />
      )
    }
  </Query>
);

class ArmoryCore extends Component {
  state = { selectedCrew: null };
  componentDidMount() {
    const { teams, crew } = this.props.subscribe();
    this.teamsSub = teams;
    this.crewSub = crew;
  }
  componentWillUnmount() {
    this.teamsSub && this.teamsSub();
    this.crewSub && this.crewSub();
  }
  render() {
    const { selectedCrew } = this.state;
    const { crew, teams, simulator } = this.props;
    return (
      <div className="armory-core">
        <CrewChoice
          crew={crew}
          teams={teams}
          selectedCrew={selectedCrew}
          updateSelectedCrew={e =>
            this.setState({ selectedCrew: e.target.value })
          }
        />
        {selectedCrew && (
          <CrewCargo
            simulatorId={simulator.id}
            crew={crew.find(c => c.id === selectedCrew)}
          />
        )}
      </div>
    );
  }
}

export default ArmoryCoreData;
