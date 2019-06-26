import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { Query } from "react-apollo";
class DestinationSelect extends Component {
  state = { dropdownOpen: false };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  render() {
    const { destination, select, simulatorId } = this.props;
    const query = gql`
      query Systems($simulatorId: ID!) {
        systems(simulatorId: $simulatorId, extra: true) {
          id
          name
          type
          displayName
          damage {
            damaged
          }
        }
      }
    `;
    return (
      <Query
        query={query}
        variables={{ simulatorId: simulatorId }}
        pollInterval={1000}
      >
        {({ data: { systems = [] } }) => {
          const selectedSystem = systems.find(s => s.id === destination);
          return (
            <ButtonDropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle}
            >
              <DropdownToggle caret>
                {selectedSystem
                  ? selectedSystem.displayName
                  : "Select a System"}
              </DropdownToggle>
              <DropdownMenu>
                {systems
                  .concat()
                  .sort((a, b) => {
                    if (a.displayName > b.displayName) return 1;
                    if (a.displayName < b.displayName) return -1;
                    return 0;
                  })
                  .map(s => (
                    <DropdownItem key={s.id} onClick={() => select(s.id)}>
                      {s.displayName}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </ButtonDropdown>
          );
        }}
      </Query>
    );
  }
}

export default DestinationSelect;
