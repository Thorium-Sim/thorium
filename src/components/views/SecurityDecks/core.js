import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import "./style.scss";

const DECK_SUB = gql`
  subscription DeckSubscribe($simulatorId: ID!) {
    decksUpdate(simulatorId: $simulatorId) {
      id
      evac
      doors
      rooms {
        name
        id
        gas
      }
    }
  }
`;

class SecurityTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDeck: null,
      selectedRoom: null
    };
    this.deckSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.deckSubscription && !nextProps.data.loading) {
      this.deckSubscription = nextProps.data.subscribeToMore({
        document: DECK_SUB,
        variables: {
          simulatorId: this.props.simulator.id
        }
      });
    }
  }
  _toggleDoors = (deckId, doors) => {
    const mutation = gql`
      mutation ToggleDoors($deckId: ID!, $doors: Boolean!) {
        deckDoors(deckId: $deckId, doors: $doors)
      }
    `;
    const variables = {
      deckId,
      doors
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _toggleEvac = (deckId, evac) => {
    const mutation = gql`
      mutation ToggleEvac($deckId: ID!, $evac: Boolean!) {
        deckEvac(deckId: $deckId, evac: $evac)
      }
    `;
    const variables = {
      deckId,
      evac
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  _toggleGas() {
    const mutation = gql`
      mutation ToggleGas($roomId: ID!, $gas: Boolean!) {
        roomGas(roomId: $roomId, gas: $gas)
      }
    `;
    const deck = this.props.data.decks.find(
      d => d.id === this.state.selectedDeck
    );
    const variables = {
      roomId: this.state.selectedRoom,
      gas: !deck.rooms.find(r => r.id === this.state.selectedRoom).gas
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading) return null;
    const decks = this.props.data.decks;
    return (
      <div className="core-securityDecks">
        <table>
          <thead>
            <tr>
              <th>Deck</th>
              <th title="Evacuation">E</th>
              <th title="Doors">D</th>
              <th title="Gas">G</th>
            </tr>
          </thead>
          <tbody>
            {decks.map(d =>
              <tr key={d.id}>
                <td>
                  Deck {d.number}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.evac}
                    onChange={evt => this._toggleEvac(d.id, evt.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={d.doors}
                    onChange={evt =>
                      this._toggleDoors(d.id, evt.target.checked)}
                  />
                </td>
                <td>
                  <input type="checkbox" disabled />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const DECK_QUERY = gql`
  query SimulatorDecks($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      id
      number
      evac
      doors
      rooms {
        id
        name
        gas
      }
    }
  }
`;

export default graphql(DECK_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(SecurityTeams));
