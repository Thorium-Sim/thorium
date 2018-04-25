import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Input, Button } from "reactstrap";

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

const CrewChoice = ({ crew, teams, selectedCrew, updateSelectedCrew }) => {
  const teamCrew = teams
    .reduce((prev, next) => prev.concat(next.officers), [])
    .map(t => t.id);
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
          {t.officers.map(c => (
            <option key={c.id} value={c.id}>
              {c.inventory.length > 0 ? "*" : ""} {c.name}
            </option>
          ))}
        </optgroup>
      ))}
      <optgroup label={`Unassigned`}>
        {filteredCrew.map(c => (
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
        crewCount: [{ crew: id, count }]
      }
    };
    mutate({ variables });
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
    </div>
  );
};
class ArmoryCore extends Component {
  state = { selectedCrew: null };
  render() {
    const { selectedCrew } = this.state;
    const { simulator } = this.props;
    return (
      <Query query={ARMORY_QUERY} variables={{ simulatorId: simulator.id }}>
        {({ loading, data: { crew, teams } }) =>
          !loading &&
          crew &&
          teams && (
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
          )
        }
      </Query>
    );
  }
}

export default ArmoryCore;
