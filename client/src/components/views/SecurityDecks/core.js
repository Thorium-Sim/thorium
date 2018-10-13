import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";

const DECK_SUB = gql`
  subscription DeckSubscribe($simulatorId: ID!) {
    decksUpdate(simulatorId: $simulatorId) {
      id
      evac
      doors
      crewCount
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
    if (this.props.data.loading || !this.props.data.decks) return null;
    const decks = this.props.data.decks;
    return (
      <div className="core-securityDecks">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: DECK_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              }
            })
          }
        />
        <table>
          <thead>
            <tr>
              <th>Deck</th>
              <th title="Evacuation">Evac</th>
              <th title="Doors">Door</th>
              <th title="Tranzine">Tranzine</th>
              <th title="Crew Count">Crew Count</th>
            </tr>
          </thead>
          <tbody>
            {decks
              .concat()
              .sort((a, b) => {
                if (a.number > b.number) return 1;
                if (a.number < b.number) return -1;
                return 0;
              })
              .map(d => (
                <tr key={d.id}>
                  <td>Deck {d.number}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={d.evac}
                      onChange={evt =>
                        this._toggleEvac(d.id, evt.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={d.doors}
                      onChange={evt =>
                        this._toggleDoors(d.id, evt.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <TranzineSelect deck={d} />
                  </td>
                  <td style={{ textAlign: "center" }}>{d.crewCount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const TranzineSelect = ({ deck }) => {
  const tRooms = deck.rooms.filter(r => r.gas);
  return (
    <select value="tranzine">
      <option value="tranzine" disabled>
        {tRooms.length === 0 ? "No Gas" : "Tranzine Active"}
      </option>
      {tRooms.map(r => (
        <option key={r.id}>{r.name}</option>
      ))}
    </select>
  );
};

const DECK_QUERY = gql`
  query SimulatorDecks($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      id
      number
      evac
      doors
      crewCount
      rooms {
        id
        name
        gas
      }
    }
  }
`;

export default graphql(DECK_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: { simulatorId: ownProps.simulator.id }
  })
})(withApollo(SecurityTeams));
